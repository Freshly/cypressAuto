import { getRandomPaymentCard } from "../../../helpers/generate-random-data"
import { User } from "../../../support/seeds/users"
import joinNow from "../../../helpers/join-now"
import mealPlans from "../../../fixtures/meal-plans"
import addresses from "../../../support/data/valid-addresses"
const { _ } = Cypress;

describe("Change account information ", () => {
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

	it.skip("Change user's name for registered user", () => {

		let newUserName = "AndreiL"
		joinNow.getStarted.fillOutGetStartedForm(user, address);
		joinNow.planPicker.chooseMealPlan(mealPlan);
		joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
		joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
		joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
		joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
		joinNow.checkOut.paymentPanel.submitPaymentForm();
		joinNow.subscription.skipBothAttributionForms();
		joinNow.subscription.getFirstNameHeader().should("be.visible").click()
        joinNow.accountDetails.getUserAccountPage().first().click()
        joinNow.accountDetails.enterName(newUserName)
        joinNow.accountDetails.saveButtonClick()
		joinNow.toastMessage.checkMessage("Name successfully updated")
		joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", newUserName)

	})

it("user is able to log in with new password", () => {

	    let newPassword = "Cypress123"
		joinNow.getStarted.fillOutGetStartedForm(user, address);
		joinNow.planPicker.chooseMealPlan(mealPlan);
		joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
		joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
		joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
		joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
		joinNow.checkOut.paymentPanel.submitPaymentForm();
		joinNow.subscription.skipBothAttributionForms();
		joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName)
        joinNow.subscription.getFirstNameHeader().should("be.visible").click()
		joinNow.accountDetails.getUserAccountPage().first().click();
	    joinNow.accountDetails.changePassword();
	    joinNow.accountDetails.fillPasswordForm(newPassword,user.password);
	    joinNow.accountDetails.changePasswordClick();
	    joinNow.toastMessage.checkMessage("Password successfully updated");
		joinNow.logOut.logOutFromDelivery();
        joinNow.logIn.fillLogInFormWithExistingUser(user.email,newPassword)
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName)
	})


});

