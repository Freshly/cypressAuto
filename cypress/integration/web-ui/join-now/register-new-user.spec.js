import {getRandomPaymentCard} from "../../../helpers/generate-random-data"
import {User} from "../../../support/seeds/users"
import joinNow from "../../../helpers/join-now"
import mealPlans from "../../../fixtures/meal-plans"
import addresses from "../../../support/data/valid-addresses"

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

    it.skip("User is able to create subscription with correct delivery address", () => {

        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);// empty parameter leads to selecting different meals
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName)

    })

    it.skip("User is able to create subscription using Promo code", () => {

        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals, 'true'); //send true as second parameters leads to selecting single meals to cart
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.addPromoCode(Cypress.env('PromoCode'))
        joinNow.checkOut.paymentPanel.getRemovePromo().should("be.visible");
        joinNow.checkOut.paymentPanel.getPaymentPanel().should("be.visible");
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName)

    })


    it("User is able to create subscription with address needed to be verified", () => {

        address.line1 = "10 Tolstogo"  //incorrect address for delivery
        joinNow.getStarted.fillOutGetStartedForm(user, address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals, 'true');
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.deliveryPanel.verifyAddress();
        joinNow.checkOut.deliveryPanel.submitDeliveryForm();
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName)

    })


});

