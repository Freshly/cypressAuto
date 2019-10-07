import { getRandomPaymentCard } from "../../../helpers/generate-random-data"
import { User } from "../../../support/seeds/users"
import joinNow from "../../../helpers/join-now"
import mealPlans from "../../../fixtures/meal-plans"
const { _ } = Cypress;
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

	it("User is able to change a plan", () => {
		mealPlan.id = 421
		mealPlan.meals = 4
        joinNow.planPicker.chooseMealPlan(mealPlan);
    	joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
	   	joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
	    joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
	    joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
	    joinNow.checkOut.paymentPanel.submitPaymentForm();
		joinNow.subscription.skipBothAttributionForms();
		cy.visitSubscriptionSettingsPage();
		joinNow.subscription.getChangePlan().should("be.visible").click()
        joinNow.subscription.get9MealsPlan().should("be.visible").click({multiple:true})
		joinNow.toastMessage.checkMessage("Weekly default plan successfully updated.");

	})

	it("User is able to cancel subscription with any parameters", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
    	joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
	   	joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
	    joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
	    joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
	    joinNow.checkOut.paymentPanel.submitPaymentForm();
		joinNow.subscription.skipBothAttributionForms();
		cy.visitSubscriptionSettingsPage();
        joinNow.subscription.getCancelSubscriptionButton().should("be.visible").click()
        joinNow.subscription.getPauseSubscriptionButton().should("be.visible").click()
        joinNow.subscription.getFirstDropdown().should("be.visible").click()
        joinNow.subscription.getFirstDropdownDelivery().should("be.visible").click()
        joinNow.subscription.getSecondDropdownDelivery().find("button").click()
        joinNow.subscription.getDeliveryAnswerButton().should("be.visible").click()
        joinNow.cancelSubscription.submitReason()
		joinNow.cancelSubscription.wantToCancel()
		joinNow.subscription.getUnPausedSubscription().should("be.visible")
	})

it("User is able to change subscrition name", () => {
	    let newSubscrName = "New One"
	    let message = "Subscription name successfully updated to " +newSubscrName;
	    joinNow.planPicker.chooseMealPlan(mealPlan);
    	joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
	   	joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
	    joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
	    joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
	    joinNow.checkOut.paymentPanel.submitPaymentForm();
		joinNow.subscription.skipBothAttributionForms();
		cy.visitSubscriptionSettingsPage();
		joinNow.subscription.getChangeSubscriptionName().should("be.visible").click()
	    joinNow.changeSubscritionName.changeName(newSubscrName);
	    joinNow.toastMessage.checkMessage(message);
		joinNow.subscription.getSubscriptionName().should("contain", newSubscrName)

	})

});

