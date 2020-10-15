import {getRandomPaymentCard} from "../helpers/generate-random-data"
import {User} from "../support/seeds/users"
import joinNow from "../helpers/join-now"
import mealPlans from "../fixtures/meal-plans"
import addresses from "../support/data/valid-addresses"
import deliveries from "../helpers/deliveries"
import subscription from "../helpers/subscription";

const {_} = Cypress;

describe("Some tests connected to others parts of Freshly ", () => {
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


    it("4-User is able to give giftcard from Delivery page", () => {
        var randomNumber
        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealDetailsCard(mealPlan.meals);// empty parameter leads to selecting different meals
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
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
        joinNow.gifts.fillOutGiftPayment(paymentCard, user.email);
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
        joinNow.gifts.giftSuccessHeader().should("be.visible").should("contain", "Your Gift Card has been applied");
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
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        deliveries.deliveries.totalSumAtDelivery().should("be.visible").invoke('text').should((totalSum) => {
            expect(totalSum).to.eq("$0.00")
        })


    })

    it("6-User is able to create subscription with address needed to be verified and others specific parameters", () => {
        //test checks availability to create subscritpion with address needed to be verified,check SMS check-box, change delivery day in drop down and fill billing address
        //with selecting a value at attribution form
        address.line1 = "10 Tolstogo"
        address.zip = "90603"//incorrect address for delivery
        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.MostPopularDay().scrollIntoView().click();
        joinNow.dayPicker.MostPopularDayAfterSelection().should("be.visible").invoke('text').then((daySelected) => {
            joinNow.dayPicker.continueToMealSelection();
            joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals, 'true');
            joinNow.checkOut.fillRegistrationData.fillUserData(user, address);
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
            joinNow.checkOut.paymentPanel.submitPaymentForm(user);
            joinNow.subscription.selectRandomValue();
            joinNow.subscription.dismissSelfAttributionForm2();
            //joinNow.subscription.skipBothAttributionForms();
            joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName)
            deliveries.first_week.deliveryDay().should("be.visible").invoke('text').should((dayDelivery) => {
                expect(dayDelivery.trim().indexOf(daySelected.trim())).to.equal(-1)
            })


        })

    })

    it("18-User is able to select Dietary Preferences", () => {
        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        subscription.dietaryPreferences.moveToDietaryPreferences()
        subscription.dietaryPreferences.launchQuestionnaire()
        var selectedPrefernciesList = [0, 0, 0]
        selectedPrefernciesList = subscription.dietaryPreferences.selectPreferencesFullList()
        cy.log(selectedPrefernciesList)
        subscription.dietaryPreferences.selectedAvoid().then((selectedAvoid) => {
            expect(selectedAvoid).to.have.lengthOf(selectedPrefernciesList[0])

        })
        subscription.dietaryPreferences.selectedNeutral().then((selectedNeutral) => {
            expect(selectedNeutral).to.have.lengthOf(selectedPrefernciesList[1])

        })
        subscription.dietaryPreferences.selectedEnjoy().then((selectedEnjoy) => {
            expect(selectedEnjoy).to.have.lengthOf(selectedPrefernciesList[2])

        })
        //start editing and finish  earlier selected preferencies
        subscription.dietaryPreferences.editDietaryPreferences().click()
        subscription.dietaryPreferences.finishDietaryPreferences().click()
        cy.wait(5000);
        joinNow.navBar.clickOnDeliveries();
        //check avoid mark is presented
        deliveries.second_week.changeMeals().should("be.visible").click();
        deliveries.deliveries.mealAvoidAlert().first().should("be.visible").trigger('mouseover');
        deliveries.deliveries.mealAvoidAlert().should('have.attr', 'alt').and('include', 'Contains ingredients you avoid:')


    })

    it("20-No blackout and others checks", () => {
        //select tha last available day in day picker;
        //add meals from meal details card;
        //check error message when quantity of meals don't fit to selected plan;
        //ckeck button Next is unavailable until quantity of meals don't fit to selected plan;
        //check blackout: user get a first delivery no later than in two weeks;
        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.FirstDeliveryDate().should("be.visible").invoke('text').then((dayDelivery) => {
            //day of order
            var start = Cypress.moment().format("dddd, MMM DD");
            //day of order +15 days
            var end = Cypress.moment().add(15, 'days').format("dddd, MMM DD");
            cy.log("First delivery day:" + dayDelivery, " Order day:" + start, " Blackout day:" + end);
            var daysToStart = Cypress.moment(dayDelivery).diff(start, 'days');
            var daysToEnd = Cypress.moment(dayDelivery).diff(end, 'days');
            cy.log("Days to order date:" + daysToStart, " Days to blackout date:" + daysToEnd);
            //quantity of days from day of order to first delivery day
            expect(daysToStart).to.be.greaterThan(0)
            //quantity of days from the last day(order day+15 days) to first delivery day
            expect(daysToEnd).to.be.lessThan(0)
        })
        joinNow.dayPicker.chooseLastDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealDetailsCard(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        joinNow.subscription.skipBothAttributionForms();
        //joinNow.subscription.dismissSelfAttributionForm();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);

    })


});

