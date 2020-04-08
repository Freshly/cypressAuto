import {getRandomPaymentCard} from "../../../helpers/generate-random-data"
import {User} from "../../../support/seeds/users"
import joinNow from "../../../helpers/join-now"
import mealPlans from "../../../fixtures/meal-plans"
import addresses from "../../../support/data/valid-addresses"
import deliveries from "../../../helpers/deliveries"
import subscription from "../../../helpers/subscription";

const {_} = Cypress;

describe("Join Now Flow - Register new subscription with different parameters ", () => {
    let user;
    let paymentCard;
    let address;
    let mealPlan;


    beforeEach(() => {
        cy.clearSession()
        joinNow.getStarted.visitGetStartedPage()
        user = new User();
        paymentCard = getRandomPaymentCard();
        address = _.sample(addresses)
        mealPlan = _.sample(mealPlans)
    })

    it("User is able to change meals from Delivery page", () => {

        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);// empty parameter leads to selecting different meals
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        deliveries.second_week.firstMealName().invoke('text').then((firstMealBeforeChanging) => {
            deliveries.second_week.changeMeals().should("be.visible").click();
            deliveries.deliveries.selectingNewMeals(mealPlan.meals);
            deliveries.second_week.firstMealName().invoke('text').should((firstMealAfterChanging) => {
                expect(firstMealBeforeChanging).not.to.eq(firstMealAfterChanging)
            })
        })

    })

    it("User is able to change meal plan from Delivery page", () => {

        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);// empty parameter leads to selecting different meals
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        deliveries.second_week.plan().invoke('text').then((planBeforeChanging) => {
            deliveries.second_week.changePlan();
            joinNow.toastMessage.checkMessage("Meal plan successfully updated")
            deliveries.second_week.plan().invoke('text').should((planAfterChanging) => {
                expect(planBeforeChanging.trim()).not.to.eq(planAfterChanging.trim())
            })
        })

    })

    it("User is able to change delivery date from Delivery page", () => {

        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);// empty parameter leads to selecting different meals
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        deliveries.second_week.deliveryDay().invoke('text').then((dayBeforeChanging) => {
            deliveries.second_week.changeDeliveryDay();
            joinNow.toastMessage.checkMessage("Delivery date successfully updated")
            deliveries.second_week.deliveryDay().invoke('text').should((dayAfterChanging) => {
                expect(dayBeforeChanging.trim()).not.to.eq(dayAfterChanging.trim())
            })
        })

    })

    it("User is able to give giftcard from Delivery page", () => {
        var randomNumber
        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);// empty parameter leads to selecting different meals
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        joinNow.navBar.clickOnGift();
        joinNow.gifts.giveGift();
        joinNow.gifts.chooseMealPlanForGift(mealPlan.id);
        randomNumber = (Math.floor(Math.random() * 999) + 1).toString();
        let firstName = 'John';
        let lastName = 'Silver';
        let email = 'Silver' + randomNumber + '@gmail.com';
        let gifterName = user.firstName;
        let gifterLastName = user.lastName;
        joinNow.gifts.fillGiftForm(firstName, lastName, email, gifterName, gifterLastName);
        joinNow.gifts.fillOutGiftPayment(paymentCard, email);
        joinNow.gifts.recipientEmailSuccess().should("be.visible").should("contain", email);
        joinNow.logOut.logOutFromDelivery();
        joinNow.logIn.fillLogInFormWithExistingUser(Cypress.env('administratorEmail'), Cypress.env('administratorPassword'));
        joinNow.gifts.findGiftAsAdmin(email);
        joinNow.gifts.getGift().should("be.visible").invoke('text').then((giftCode) => {
            joinNow.getStarted.visitMainPage();
            joinNow.logOut.logOutFromDelivery();
            joinNow.navBar.clickOnGift();
            joinNow.gifts.reedemGift();
            joinNow.gifts.fillRedeemForm(giftCode, email, address.zip);
        })
        joinNow.gifts.giftSuccessHeader().should("be.visible").should("contain", "Your gift card has been applied");
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.deliveryPanel.totalSumCheckout().should("be.visible").invoke('text').should((totalSum) => {
            expect(totalSum).to.eq("$0.00")
        })
        joinNow.checkOut.paymentPanel.getRemovePromo().should("be.visible");
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        deliveries.deliveries.totalSumAtDelivery().should("be.visible").invoke('text').should((totalSum) => {
            expect(totalSum).to.eq("$0.00")
        })


    })

    it("User is able to skip/uskip a week from Delivery page", () => {

        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);// empty parameter leads to selecting different meals
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        deliveries.second_week.skipWeek().should("be.visible").click();
        deliveries.deliveries.stillWantToSkipNevermind();
        deliveries.second_week.skipWeek().should("be.visible").click();
        deliveries.deliveries.stillWantToSkipDelivery();
        deliveries.second_week.unSkipWeek().should("be.visible").click();
        deliveries.second_week.skipWeek().should("be.visible");


    })


    it.skip("User is able to create subscription with address needed to be verified ", () => {
        //test checks availability to create subscritpion with address needed to be verified,check SMS check-box, change delivery day in drop down and fill billing address

        address.line1 = "10 Tolstogo"
        address.zip = "90603"//incorrect address for delivery
        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        //joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.dayPicker.MostPopularDay().click();
        joinNow.dayPicker.MostPopularDayAfterSelection().invoke('text').then((daySelected) => {
            joinNow.dayPicker.continueToMealSelection();
            joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals, 'true');
            joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
            //check sms check-box is available for checking
            joinNow.checkOut.deliveryPanel.SMSbox().not('[disabled]').check().should('be.checked');
            joinNow.checkOut.deliveryPanel.checkSMSbox();
            joinNow.checkOut.deliveryPanel.SMSbox().not('[enabled]').should('be.not.checked');
            //select another delivery day in dropdown
            joinNow.checkOut.deliveryPanel.selectAnotherDeliveryDate();
            //verify incorrect address
            joinNow.checkOut.deliveryPanel.verifyAddress();
            joinNow.checkOut.deliveryPanel.submitDeliveryForm();
            joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
            //fill billing address form
            joinNow.checkOut.deliveryPanel.billingAddressBox();
            joinNow.checkOut.deliveryPanel.fillBillingAddress();
            joinNow.checkOut.paymentPanel.submitPaymentForm();
            joinNow.subscription.skipBothAttributionForms();
            joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName)
            deliveries.first_week.deliveryDay().invoke('text').then((dayDelivery) => {
                expect(dayDelivery.indexOf(daySelected)).to.equal(-1) //check the new delivery day is not the same with selected day during join now

            })
        })

    })
});

