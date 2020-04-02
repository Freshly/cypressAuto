import {getRandomPaymentCard} from "../../../helpers/generate-random-data"
import {User} from "../../../support/seeds/users"
import joinNow from "../../../helpers/join-now"
import mealPlans from "../../../fixtures/meal-plans"
import subscription from "../../../helpers/subscription"
//import deliveries from "../../../helpers/deliveries"

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

    it.skip("User is able to change email and log in with new email", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        var randomEmailNumber = (Math.floor(Math.random() * 9999)).toString();
        let newEmail = 'NewUserEmail' + randomEmailNumber + '@gmail.com'
        subscription.changeInfo.getEmail().invoke('text').then((emailBeforeChanging) => {
            subscription.changeInfo.changeEmail(newEmail, user.password)
            joinNow.toastMessage.checkMessage("Email successfully updated")
            subscription.changeInfo.getEmail().invoke('text').should((emailAfterChanging) => {
                expect(emailBeforeChanging).not.to.eq(emailAfterChanging)
            })
        })
        joinNow.logOut.logOutFromDelivery()
        joinNow.logIn.fillLogInFormWithExistingUser(newEmail, user.password)
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);

    })

    it.skip("User is able to change password and log in with new it", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        var randomPasswordNumber = (Math.floor(Math.random() * 9999)).toString();
        let newPassword = 'NewUserPassword' + randomPasswordNumber
        subscription.changeInfo.changePassword(newPassword, user.password)
        joinNow.toastMessage.checkMessage("Password successfully updated")
        joinNow.logOut.logOutFromDelivery()
        joinNow.logIn.fillLogInFormWithExistingUser(user.email, newPassword)
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);

    })

    it("User is able to change first name and last name", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        joinNow.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        let newFirstName = 'NewName'
        let newLastName = 'NewLastName'
        subscription.changeInfo.changePersonalInfo(newFirstName, newLastName)
        joinNow.toastMessage.checkMessage("Settings successfully updated")
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", newFirstName);

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

    it.skip("User is able to change a default delivery day from Subscription setting page", () => {
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

    it.skip("User is able to select available delivery day from Calendar Subscription setting page", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        subscription.subscription.skipBothAttributionForms();
        joinNow.deliveryPage.dayOfSecondWeek().then((dayF) => {
            var day1 = (dayF.split(','))[0]
            cy.log(day1)
            cy.visitSubscriptionSettingsPage();
            subscription.calendar.changeDeliveryDay()
            subscription.calendar.selectAnyAvailableDayInCalendar()
            joinNow.navBar.clickOnDeliveries();
            joinNow.deliveryPage.dayOfSecondWeek().then((dayS) => {
                var day2 = (dayS.split(','))[0]
                cy.log(day2)
                expect(day1).to.not.equal(day2)
            })
        })
    })

    it.skip("User is able to add/select/delete new payment card from Subscription setting page", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        subscription.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        subscription.changePayment.cardEnd().then((cardNumberOld) => {
            subscription.changePayment.changePaymentMethod()
            subscription.changePayment.addNewPaymentMethod()
            subscription.changePayment.fillNewPaymentForm(user, address)
            subscription.changePayment.savePaymentMethod()
            joinNow.toastMessage.checkMessage("Payment method successfully updated");
            subscription.changePayment.cardEnd().then((cardNumberNew) => {
                expect(cardNumberOld.substring(cardNumberOld.length - 4)).to.not.equal(cardNumberNew.substring(cardNumberNew.length - 4))
            })
        })
        //set as default
        subscription.changePayment.cardEnd().then((cardNumberOld) => {
            subscription.changePayment.changePaymentMethod()
            subscription.changePayment.setAsDefault()
            joinNow.toastMessage.checkMessage("Payment method successfully updated");
            subscription.changePayment.cardEnd().then((cardNumberNew) => {
                expect(cardNumberOld.substring(cardNumberOld.length - 4)).to.not.equal(cardNumberNew.substring(cardNumberNew.length - 4))
            })
        })
        // delete default method
        subscription.changePayment.cardEnd().then((cardNumberOld) => {
            subscription.changePayment.changePaymentMethod()
            subscription.changePayment.deleteDefaultMethod()
            subscription.changePayment.yesDeleteButton();
            joinNow.toastMessage.checkMessage("Payment method successfully deleted");
            subscription.changePayment.cardEnd().then((cardNumberNew) => {
                expect(cardNumberOld.substring(cardNumberOld.length - 4)).to.equal(cardNumberNew.substring(cardNumberNew.length - 4))
            })
        })
    })

    it.skip("User is able to add/select/delete address from Subscription setting page", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm();
        subscription.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        address.line1 = '1118 W Amber St'
        address.city = 'San Antonio'
        address.zip = '78221'
        user.phone_number = '9008007006'
        subscription.deliveryAddress.getSubscriptionAddress().invoke('text').then((addressBeforeChanging) => {
            subscription.deliveryAddress.changeDeliveryAddress();
            subscription.deliveryAddress.addNewAddress();
            subscription.deliveryAddress.fillNewAddress(user, address);
            subscription.deliveryAddress.saveDeliveryAddress();
            joinNow.toastMessage.checkMessage("Default delivery address successfully updated");
            subscription.deliveryAddress.getSubscriptionAddress().invoke('text').should((newDay) => {
                expect(addressBeforeChanging).not.to.eq(newDay)
            })
        })
        //select address added address
        subscription.deliveryAddress.getSubscriptionAddress().invoke('text').then((addressBeforeChanging) => {
            subscription.deliveryAddress.changeDeliveryAddress();
            subscription.deliveryAddress.selectAddress();
            joinNow.toastMessage.checkMessage("Default delivery address successfully updated");
            subscription.deliveryAddress.getSubscriptionAddress().invoke('text').should((newDay) => {
                expect(addressBeforeChanging).not.to.eq(newDay)
            })
        })
        //delete earlier added address
        subscription.deliveryAddress.getSubscriptionAddress().invoke('text').then((addressBeforeChanging) => {
            subscription.deliveryAddress.changeDeliveryAddress();
            subscription.deliveryAddress.deleteAddress()
            subscription.deliveryAddress.yesDeleteButton();
            joinNow.toastMessage.checkMessage("Delivery address successfully deleted");
            subscription.deliveryAddress.getSubscriptionAddress().invoke('text').should((newDay) => {
                expect(addressBeforeChanging).to.eq(newDay)
            })
        })
    })

    it.skip("User is able to select Dietary Preferencies", () => {
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
        subscription.dietaryPreferencies.moveToDietaryPreferencies()
        subscription.dietaryPreferencies.launchQuestionarie()
        var selectedPrefernciesList = [0, 0, 0]
        selectedPrefernciesList = subscription.dietaryPreferencies.selectPreferencesFullList()
        cy.log(selectedPrefernciesList)
        subscription.dietaryPreferencies.selectedAvoid().then((selectedAvoid) => {
            expect(selectedAvoid).to.have.lengthOf(selectedPrefernciesList[0])

        })
        subscription.dietaryPreferencies.selectedNeutral().then((selectedNeutral) => {
            expect(selectedNeutral).to.have.lengthOf(selectedPrefernciesList[1])

        })
        subscription.dietaryPreferencies.selectedEnjoy().then((selectedEnjoy) => {
            expect(selectedEnjoy).to.have.lengthOf(selectedPrefernciesList[2])

        })
        //start editing and finish  earlier selected preferencies
        subscription.dietaryPreferencies.editDietaryPreferencies().click()
        subscription.dietaryPreferencies.finishDietaryPreferencies().click()
        joinNow.navBar.clickOnDeliveries()
        //check avoid mark is presented
        //will added after adding tests for delivery page
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

