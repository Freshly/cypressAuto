import {getRandomPaymentCard} from "../helpers/generate-random-data"
import {User} from "../support/seeds/users"
import joinNow from "../helpers/join-now"
import mealPlans from "../fixtures/meal-plans"
import subscription from "../helpers/subscription"
import addresses from "../support/data/valid-addresses"
import deliveries from "../helpers/deliveries"

const {_} = Cypress;

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

    it("20-User is able to add new subscritpion", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        cy.visitSubscriptionSettingsPage();
        subscription.addNewSubscription.addNewSubscription();
        subscription.addNewSubscription.addSubscriptionNo().should("be.visible").click();
        subscription.addNewSubscription.addSubscriptionYes().should("not.be.visible");
        subscription.addNewSubscription.addNewSubscription();
        subscription.addNewSubscription.addSubscriptionYes().should("be.visible").click();
        address = _.sample(addresses);
        mealPlan = _.sample(mealPlans);
        subscription.addNewSubscription.insertZip(address);
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        subscription.addNewSubscription.fillUserData(user, address);
        subscription.addNewSubscription.submitPaymentFormNewSubscription();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
    })


    it("8-User is able to change email and log in with new email", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        subscription.subscription.skipBothAttributionForms();
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

    it("9-User is able to change password and log in with new it", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        subscription.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        var randomPasswordNumber = (Math.floor(Math.random() * 9999)).toString();
        let newPassword = 'NewUserPassword' + randomPasswordNumber
        subscription.changeInfo.changePassword(newPassword, user.password)
        joinNow.toastMessage.checkMessage("Password successfully updated")
        joinNow.logOut.logOutFromDelivery()
        joinNow.logIn.fillLogInFormWithExistingUser(user.email, newPassword)
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);

    })

    it("10-User is able to change first name and last name", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        subscription.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        var userRenamed = new User()
        subscription.changeInfo.getName().invoke('text').then((nameBeforeChanging) => {
            subscription.changeInfo.changePersonalInfo(userRenamed.firstName, userRenamed.lastName)
            joinNow.toastMessage.checkMessage("Name successfully updated")
            subscription.changeInfo.getName().invoke('text').should((nameAfterChanging) => {
                expect(nameBeforeChanging).not.to.eq(nameAfterChanging)
            })
        })

        subscription.subscription.getNameNavigationBar().should("contain", userRenamed.firstName);

    })

    it("13-User is able to change a plan at Subscription setting page", () => {
        mealPlan.id = 425
        mealPlan.meals = 4
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        subscription.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        subscription.subscription.getSubscriptionPlan().should("be.visible").should("contain", "4 Meals");
        subscription.subscription.getChangePlan().should("be.visible").click()
        subscription.subscription.get10MealsPlan().should("be.visible").click({multiple: true})
        joinNow.toastMessage.checkMessage("Default plan successfully updated to");
        subscription.subscription.getSubscriptionPlan().should("be.visible").should("contain", "10 Meals");

    })

    it("14-User is able to change a default delivery day from Subscription setting page", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        subscription.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        subscription.calendarDropDown.getActualDayInDropdown().invoke('text').then((dayBeforeChanging) => {
            //subscription.calendarDropDown.showListOfActualDaysInDropdown();
            subscription.calendarDropDown.getAnyAvailableDayInDropdown().invoke('text').then((dayForSelecting) => {
                subscription.calendarDropDown.dropDown().select(dayForSelecting);
                let message = 'Your preferred delivery day has been changed to ' + dayForSelecting;
                joinNow.toastMessage.checkMessage(message);
            })
            cy.reload();
            subscription.calendarDropDown.getActualDayInDropdown().invoke('text').should((dayAfterChanging) => {
                expect(dayBeforeChanging).not.to.eq(dayAfterChanging);
            })

        })
    })

    it.skip("15-User is able to select available delivery day from Calendar Subscription setting page(not actual with new implementation of selecting defaulf day)", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        subscription.subscription.skipBothAttributionForms();
        //deliveries.second_week.deliveryDay().invoke('text').then((dayF) => {
        joinNow.deliveryPage.dayOfSecondWeek().then((dayF) => {
            var day1 = (dayF.split(','))[0]
            cy.log(day1)
            cy.visitSubscriptionSettingsPage();
            subscription.calendar.changeDeliveryDay()
            subscription.calendar.selectAnyAvailableDayInCalendar()
            joinNow.navBar.clickOnDeliveries();
            //deliveries.second_week.deliveryDay().invoke('text').then((dayS) => {
            joinNow.deliveryPage.dayOfSecondWeek().then((dayS) => {
                var day2 = (dayS.split(','))[0]
                cy.log(day2)
                expect(day1.trim()).to.not.equal(day2.trim())
            })
        })
    })

    it("16-User is able to add/select/delete new payment card from Subscription setting page", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        subscription.subscription.skipBothAttributionForms();
        cy.visitSubscriptionSettingsPage();
        var newCardTrimmed, oldCardTrimmed;
        var paymentCardAdded = getRandomPaymentCard();
        var fullName = "Frank Sinatra"
        subscription.changePayment.cardEnd().then((cardNumberOld) => {
            cy.log(cardNumberOld.trim());
            subscription.changePayment.changePaymentMethod()
            subscription.changePayment.addNewPaymentMethod()
            subscription.changePayment.fillNewPaymentFormBrainTree(fullName, address, paymentCardAdded)
            subscription.changePayment.savePaymentMethod()
            joinNow.toastMessage.checkMessage("Payment method successfully updated");
            cy.wait(2000);
            subscription.changePayment.cardEnd().then((cardNumberNew) => {
                cy.log(cardNumberNew.trim());
                newCardTrimmed = cardNumberNew.trim();
                oldCardTrimmed = cardNumberOld.trim();
                expect(newCardTrimmed.substring(newCardTrimmed.length - 4)).to.not.equal(oldCardTrimmed.substring(oldCardTrimmed.length - 4))
            })
        })
        //set as default
        subscription.changePayment.cardEnd().then((cardNumberOld) => {
            subscription.changePayment.changePaymentMethod()
            subscription.changePayment.setAsDefault()
            joinNow.toastMessage.checkMessage("Payment method successfully updated");
            cy.wait(2000);
            subscription.changePayment.cardEnd().then((cardNumberNew) => {
                newCardTrimmed = cardNumberNew.trim();
                oldCardTrimmed = cardNumberOld.trim();
                expect(newCardTrimmed.substring(newCardTrimmed.length - 4)).to.not.equal(oldCardTrimmed.substring(oldCardTrimmed.length - 4))

            })
        })
        // delete default method
        subscription.changePayment.cardEnd().then((cardNumberOld) => {
            subscription.changePayment.changePaymentMethod()
            subscription.changePayment.deleteDefaultMethod()
            subscription.changePayment.yesDeleteButton();
            joinNow.toastMessage.checkMessage("Payment method successfully deleted");
            cy.wait(2000);
            subscription.changePayment.cardEnd().then((cardNumberNew) => {
                newCardTrimmed = cardNumberNew.trim();
                oldCardTrimmed = cardNumberOld.trim();
                expect(newCardTrimmed.substring(newCardTrimmed.length - 4)).to.equal(oldCardTrimmed.substring(oldCardTrimmed.length - 4))

            })
        })
    })

    it("17-User is able to add/select/delete address from Subscription setting page", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
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
            joinNow.toastMessage.checkMessage("delivery address successfully");
            subscription.deliveryAddress.getSubscriptionAddress().invoke('text').should((newDay) => {
                expect(addressBeforeChanging).not.to.eq(newDay)
            })
        })
        //select address earlier earlier address
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


    it("19-User is able to delete/add Promo code from Subscription setting page", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address)
        //joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCard(paymentCard);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.addPromoCode(Cypress.env('PromoCode'))
        joinNow.checkOut.paymentPanel.getRemovePromo().should("be.visible");
        joinNow.checkOut.paymentPanel.getPaymentPanel().should("be.visible");
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
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

    it("20-User is able to use refer friend functional-not finished", () => {
        joinNow.planPicker.chooseMealPlan(mealPlan);
        joinNow.dayPicker.chooseFirstDeliveryDayFromAvailable();
        joinNow.mealsPicker.chooseMealsFromMealPlanner(mealPlan.meals);
        joinNow.checkOut.fillRegistrationData.fillUserData(user, address);
        joinNow.checkOut.paymentPanel.fillOutPaymentInfoWithCardBrainTree(paymentCard);
        joinNow.checkOut.paymentPanel.submitPaymentForm(user);
        joinNow.subscription.skipBothAttributionForms();
        joinNow.subscription.getFirstNameHeader().should("be.visible").should("contain", user.firstName);
        cy.visitSubscriptionSettingsPage();
        subscription.referFriend.storeCreditForm().should("be.visible");
        subscription.referFriend.referFriendClick();
        cy.url().should("include", "/refer");
        subscription.referFriend.checkReferFriendLink().should("be.visible").should("contain", user.firstName);
        subscription.referFriend.earnedSoFar().should("be.visible").should("have.text", '$0');


    })


});

