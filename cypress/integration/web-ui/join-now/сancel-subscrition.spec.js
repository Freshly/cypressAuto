import {getRandomPaymentCard} from "../../../helpers/generate-random-data"
import {User} from "../../../support/seeds/users"
import joinNow from "../../../helpers/join-now"
import mealPlans from "../../../fixtures/meal-plans"
import subscription from "../../../helpers/subscription"

const {_} = Cypress;
import addresses from "../../../support/data/valid-addresses"

describe("User is able to change parameters of subscrition ", () => {
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
        joinNow.getStarted.fillOutGetStartedForm(user, address);
    })


    it.skip("User is able to cancel subscription with any parameters", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        subscription.subscription.getCancelSubscriptionButton().should("be.visible").click();
        subscription.subscription.getPauseSubscriptionButton().should("be.visible").click();
        subscription.subscription.getFirstDropdown().should("be.visible").click();
        subscription.subscription.getFirstDropdownDelivery().should("be.visible").click();
        subscription.subscription.getSecondDropdownDelivery().find("button").click();
        subscription.subscription.getDeliveryAnswerButton().should("be.visible").click();
        subscription.cancelSubscription.submitReason();
        subscription.cancelSubscription.wantToCancel();
        subscription.subscription.getUnPausedSubscription().should("be.visible");
        joinNow.navBar.clickOnDeliveries();
        subscription.cancelSubscription.reactivateSubscriptionFromDelivery();
        joinNow.toastMessage.checkMessage("Subscription successfully reactivated");
    })

    it.skip("User is able to cancel subscription registered with Promo code", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.addPromoCode(Cypress.env('PromoCode'))
        joinNow.checkOut.paymentPanel.getRemovePromo().should("be.visible");
        joinNow.checkOut.paymentPanel.getPaymentPanel().should("be.visible");
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        subscription.subscription.getCancelSubscriptionButton().should("be.visible").click();
        subscription.subscription.getPauseSubscriptionButton().should("be.visible").click();
        subscription.cancelSubscription.wantToCancel();
        subscription.subscription.getFirstDropdown().should("be.visible").click();
        subscription.subscription.getFirstDropdownDelivery().should("be.visible").click();
        subscription.subscription.getSecondDropdownDelivery().find("button").click();
        subscription.subscription.getDeliveryAnswerButton().should("be.visible").click();
        subscription.cancelSubscription.submitReason();
        subscription.cancelSubscription.wantToCancel();
        subscription.subscription.getCancelWithPromoFinalText().should("be.visible").contains('Your delivery has been canceled. You will not receive any meals');
        subscription.subscription.getReturnToHomePage().should("be.visible");

    })

    it.skip("User is able to skip up to eight weeks", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        subscription.subscription.getCancelSubscriptionButton().should("be.visible").click();
        subscription.subscription.getPauseSubscriptionButton().should("be.visible").click();
        subscription.subscription.getFirstDropdown().should("be.visible").click();
        subscription.subscription.getFirstDropdownTemporary().should("be.visible").click();
        subscription.subscription.getSecondDropdownTemporary().find("button").click();
        subscription.subscription.getTemporaryAnswerButton().should("be.visible").click();
        subscription.cancelSubscription.submitReason();
        subscription.cancelSubscription.select8WeekForSkipping();
        subscription.cancelSubscription.skip8weeks();
        joinNow.toastMessage.checkMessage("You can resume your deliveries by scrolling to the bottom of the page");

    })

    it.skip("User is able to change a plan at Subscription setting page", () => {
        mealPlan.id = 421
        mealPlan.meals = 4
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        subscription.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        subscription.subscription.getSubscriptionPlan().should("be.visible").should("contain", "Flex 4");
        subscription.subscription.getChangePlan().should("be.visible").click()
        subscription.subscription.get9MealsPlan().should("be.visible").click({multiple: true})
        joinNow.toastMessage.checkMessage("Weekly default plan successfully updated.");
        subscription.subscription.getSubscriptionPlan().should("be.visible").should("contain", "Flex 9");

    })

    it("User is able to change a default delivery day from Subscription setting page", () => {

        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        subscription.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        subscription.calendar.getDefaultDayFromSubscriptionPage().invoke('text').then((dayBeforeChanging) => {
            subscription.calendar.changeDeliveryDay()
            subscription.calendar.selectAnyDayInDropdown()
            subscription.calendar.getDefaultDayFromSubscriptionPage().invoke('text').should((newDay) => {
                expect(dayBeforeChanging).not.to.eq(newDay)
                })
        })

    })

    it.skip("User is able to delete/add Promo code from Subscription setting page", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.addPromoCode(Cypress.env('PromoCode'))
        joinNow.checkOut.paymentPanel.getRemovePromo().should("be.visible");
        joinNow.checkOut.paymentPanel.getPaymentPanel().should("be.visible");
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        cy.visitSubscriptionSettingsPage();
        subscription.subscription.getSubscriptionPromoCode().should("be.visible").should("contain", Cypress.env('PromoCode'));
        //delete promo code
        subscription.subscription.getSubscriptionRemovePromo().should("be.visible").click();
        joinNow.toastMessage.checkMessage("Promo code was removed successfully");
        subscription.subscription.getSubscriptionPromoCode().should("be.visible").should("contain", 'None');
        subscription.subscription.getSubscriptionRemovePromo().should('not.exist');
        //try to add incorrect promo code
        subscription.subscription.getSubscriptionAddPromo().should("be.visible").click();
        subscription.subscription.insertPromoAndApply(Cypress.env('incorrectPromo'));
        joinNow.toastMessage.checkErrorMessage("Promo code does not exist or has expired");
        //add correct promo code
        subscription.subscription.insertPromoAndApply(Cypress.env('PromoCode'));
        joinNow.toastMessage.checkMessage("Promo code was applied successfully");
        subscription.subscription.getSubscriptionPromoCode().should("be.visible").should("contain", Cypress.env('PromoCode'));
        subscription.subscription.getSubscriptionRemovePromo().should('be.visible');
    })

});

