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


    it("12-User is able to cancel subscription and reactivate it", () => {
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
        subscription.cancelSubscription.continueToCancel();
        cy.url().should('contain', 'cancel.freshly.com');
        subscription.brightBack.selectAnyReason();
        //subscription.brightBack.closeModal();
        subscription.brightBack.selectGettingYourMeals();
        subscription.brightBack.selectPoll();
        subscription.brightBack.understandCheckBox();
        subscription.brightBack.cancelSubscriptionBrightback();
        joinNow.toastMessage.checkMessage("Your subscription has been successfully canceled");
        subscription.cancelSubscription.reactivationBanner().should("contain", "Your subscription is cancelled");
        joinNow.mealsPicker.chooseMealsFromReactivationPage(mealPlan.meals);
        subscription.cancelSubscription.confirmReviewButtonActive().click();
        subscription.cancelSubscription.reactivateButton();
        joinNow.toastMessage.checkMessage("Subscription successfully reactivated");
    })


    it("11.1-User is able to get 10% discount for subscription registered with Promo code with Brightback flow", () => {
        mealPlan.id = 425
        mealPlan.meals = 4
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
        subscription.cancelSubscription.continueToCancel();
        cy.url().should('contain', 'cancel.freshly.com');
        subscription.brightBack.selectAnyOf10OFF();
        subscription.brightBack.clickYesAtAnyForm();
        joinNow.toastMessage.checkMessage("Promo code was applied successfully");
        cy.url().should('contain', '/subscriptions/');

    })

    it("11.2-User is able to skip up to three months with Brightback flow", () => {
        mealPlan.id = 426
        mealPlan.meals = 6
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
        subscription.cancelSubscription.continueToCancel();
        cy.url().should('contain', 'cancel.freshly.com');
        subscription.brightBack.selectAnyOfThreeMonthPause();
        subscription.brightBack.clickYesAtAnyForm();
        cy.url().should('contain', '/subscriptions/');
        subscription.cancelSubscription.select8WeekForSkipping();
        subscription.cancelSubscription.skip8weeks();
        joinNow.toastMessage.checkMessage("You’ll still get your delivery on");
        joinNow.navBar.clickOnDeliveries();
        deliveries.second_week.unSkipWeek().should("be.visible");


    })
    it.skip("11.3-User is able to skip up to 4,8,12 weeks with Brightback flow", () => {
        mealPlan.id = 427
        mealPlan.meals = 10
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
        subscription.cancelSubscription.continueToCancel();
        cy.url().should('contain', 'cancel.freshly.com');
        subscription.brightBack.selectAnyOf4_8_12WeeksPause();
        subscription.brightBack.clickYesAtAnyForm();
        cy.url().should('contain', '/subscriptions/');
        subscription.brightBack.select4_8_12weeks();
        subscription.brightBack.pause4_8_12Weeks();
        joinNow.toastMessage.checkMessage("You’ll still get your delivery on");
        joinNow.navBar.clickOnDeliveries();
        deliveries.second_week.unSkipWeek().should("be.visible");

    })

    it("11.4-User is able to change delivery frequency with Brightback flow", () => {

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
        subscription.cancelSubscription.continueToCancel();
        cy.url().should('contain', 'cancel.freshly.com');
        subscription.brightBack.selectBiWeekly();
        subscription.brightBack.changeToBiweekly();
        subscription.brightBack.selectBiWeekly();
        subscription.brightBack.saveBiweekly();
        joinNow.toastMessage.checkMessage("Biweekly frequency has been turned on");
        subscription.brightBack.getSubscriptionBiweekly().should("be.visible").should("contain", "Biweekly");

    })

    it("7-User is able to back to Delivery page and skip next delivery from Brightback page", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        joinNow.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        subscription.subscription.getCancelSubscriptionButton().should("be.visible").click();
        //click never mind button
        subscription.brightBack.neverMind();
        cy.url().should('not.contain', 'cancel.freshly.com');
        cy.url().should('contain', '/subscriptions/');
        //click 'Never mind! Take me back to my deliveries'
        cy.visitSubscriptionSettingsPage();
        subscription.subscription.getCancelSubscriptionButton().should("be.visible").click();
        subscription.brightBack.neverMindAndBackToDelivery();
        cy.url().should('not.contain', 'cancel.freshly.com');
        cy.url().should('contain', '/subscriptions/');

    })
});

