import {getRandomPaymentCard} from "../helpers/generate-random-data"
import {User} from "../support/seeds/users"
import joinNow from "../helpers/join-now"
import mealPlans from "../fixtures/meal-plans"
import subscription from "../helpers/subscription"
import addresses from "../support/data/valid-addresses"
import deliveries from "../helpers/deliveries"

const {_} = Cypress;

describe("User is able to cancel subscrition in different mode ", () => {
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


    it("7-User is able to cancel subscription with any parameters", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
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
        subscription.cancelSubscription.reactivateButton();
        joinNow.toastMessage.checkMessage("Subscription successfully reactivated");
    })


    it("11-User is able to cancel subscription registered with Promo code", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.addPromoCode(Cypress.env('PromoCode'))
        joinNow.checkOut.paymentPanel.getRemovePromo().should("be.visible");
        joinNow.checkOut.paymentPanel.getPaymentPanel().should("be.visible");
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
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
        subscription.subscription.getCancelWithPromoFinalText().should("be.visible").contains('Your account is canceled');

    })

    it("12-User is able to skip up to eight weeks", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
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
        joinNow.toastMessage.checkMessage("You’ll still get your delivery on");
        joinNow.navBar.clickOnDeliveries();
        deliveries.second_week.unSkipWeek().should("be.visible");

    })


});

