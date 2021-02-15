export default {


    subscription: {

        dismissSelfAttributionForm: () => {
            cy.get("#self-attribution-form")
                .find("div.modal-content")
                .should("be.visible")
            cy.get("#self-attribution-form")
                .find("div.modal-content")
                .find(".modal-footer")
                .find("[id='cta-secondary']")
                .click()
        },

        getChangePlan: () => {
            return cy.get("[data-target = '#change-plan']")
        },

        get10MealsPlan: () => {
            return cy.get("[data-plan-id='427']")
        },

        getFirstNameHeader: () => {
            return cy.get("[data-test='header-first-name']")
            //return cy.get("[class='dropdown-menu dropdown-menu-right show']>span")
            //return cy.get("[class='navbar-text font-weight-bold text-uppercase user-firstname px-4']")
        },

        getCancelSubscriptionButton: () => {
            return cy.xpath("//*[@class='btn-link link-gray cancel']")
        },

        getPauseSubscriptionButton: () => {
            return cy.get("[data-fe='pause-subscription-btn']")
        },

        getFirstDropdown: () => {
            return cy.get("[data-test='first-question-dropdown']")
        },

        getFirstDropdownDelivery: () => {
            return cy.get("[data-first-answer-key='delivery']")
        },

        getFirstDropdownTemporary: () => {
            return cy.get("[data-first-answer-key='temporary']")
        },

        getSecondDropdownDelivery: () => {
            return cy.get("[data-second-question-key='delivery']")
        },

        getSecondDropdownTemporary: () => {
            return cy.get("[data-second-question-key='temporary']")
        },

         getDeliveryAnswerButton: () => {
            return cy.get("[data-second-answer-key='delivery_late']")
        },

         getTemporaryAnswerButton: () => {
            return cy.get("[data-second-answer-key='temporary_traveling']")
        },

        getSecondDropdown: () => {
            return cy.get("[data-test='second-question-dropdown']")
        },

        getUnPausedSubscription: () => {
            return cy.get("[data-fe='unpause-subscription-btn']")
        },

        getChangeSubscriptionName: () => {
            return cy.get("[data-fe='change-name-btn']")
        },
        getSubscriptionName: () => {
            return cy.get("[data-test='subscription-name']")
        },
        getSubscriptionPlan: () => {
            return cy.xpath("//*[@data-fe='plan']/main/p")
        },

        getSubscriptionRemovePromo: () => {
            return cy.get("[class ='remove']")
        },
        getSubscriptionAddPromo: () => {
            return cy.get("[data-target ='#apply-promo-code']")
        },

        getApplyPromoInput: () => {
            return cy.get("[id ='promo_code_code']")
        },

        getApplyPromoApply: () => {
            return cy.xpath("//button[contains(text(),'Apply')]")
        },

        getCancelWithPromoFinalText: () => {
            return cy.get("h1")

        },

        getReturnToHomePage: () => {
            return cy.get("[data-fe='return-to-homepage-btn']")

        },

        getSubscriptionPromoCode: () => {
            return cy.xpath("//*[@data-fe='promo-code']/main/p")
        },


        dismissSelfAttributionForm2: () => {
            cy.xpath("//*[@id = 'download-app-modal']//button[@data-test='close-modal']/span").should("be.visible").click()

        },

        skipBothAttributionForms: () => {
            cy.xpath("//*[@class='modal-content']//button[contains(text(),'×')]").should("be.visible").click()
            cy.get("[class='border-0 rounded-3 ml-0 py-0 my-1 btn btn-primary btn-lg']").should("be.visible").click()
            cy.xpath("//*[@id = 'download-app-modal']//button[@data-test='close-modal']/span").should("be.visible").click()
        },

        insertPromoAndApply: promoCode => {
            cy.get("[id ='promo_code_code']").should("be.visible").focus().clear();
            cy.get("[id ='promo_code_code']").type(promoCode);
            cy.xpath("//button[contains(text(),'Apply')]").should("be.visible").click();
        },

        visitSubscriptionSettingsPage: () => {
            let credentials = Cypress.env('credentialDemo')
            cy.url().then((loc) => {
                let newUrl = loc + "/edit"
                let cutURL = newUrl.substring(8, newUrl.length)
                let urlWithCredentials = 'https://' + credentials + cutURL
                cy.visit(urlWithCredentials)
            })
        },

        getNameNavigationBar: () => {
            return cy.get("[data-fe='dropdown-menu-first-name']")

        },


        waitToBeAtSubscriptionsPage: userData => {
            cy.url().should("include", "/subscriptions/")
            cy.get("[data-test='header-first-name']")
                .should("contain", userData.firstName)
        }

    },

    cancelSubscription: {
        submitReason: () => {
            cy.get("[data-fe='submit-survey-btn']").should("be.visible").click()

        },
        wantToCancel: () => {
            cy.get("[class='btn btn-primary btn-lg actions-wrapper']").should("be.visible").click()

        },
        continueToCancel: () => {
            cy.xpath("//a[contains(text(),'Continue to cancel')]").should("be.visible").click()

        },

        reactivateButton: () => {
            cy.get("[value='Reactivate']").should("be.visible").click()

        },

        reactivationBanner: () => {
            return cy.get("[class='reactivation-card'] > div > h4").should("be.visible")

        },

        addMealsButton: () => {
            return cy.get("[data-test-type='cart__confirm-button']")

        },

        confirmReviewButtonActive: () => {
            return cy.xpath("//*[contains(text(),'Confirm')]")
        },


        reactivateSubscriptionFromDelivery: () => {
            cy.get("[value='Reactivate Subscription']").should("be.visible").click()

        },
        select8WeekForSkipping: () => {
            var select_week = Math.floor(Math.random() * 9);// Get random number [1,8]

            switch (true) {
                case (select_week == 1):
                    cy.xpath("(//*[@data-target='account-settings--long-term-skip.skipDate'])[1]").should("be.visible").click();
                    break;
                case (select_week == 2):
                    cy.xpath("(//*[@data-target='account-settings--long-term-skip.skipDate'])[2]").should("be.visible").click();
                    break;
                case (select_week == 3):
                    cy.xpath("(//*[@data-target='account-settings--long-term-skip.skipDate'])[3]").should("be.visible").click();
                    break;
                case (select_week == 4):
                    cy.xpath("(//*[@data-target='account-settings--long-term-skip.skipDate'])[4]").should("be.visible").click();
                    break;
                case (select_week == 5):
                    cy.xpath("(//*[@data-target='account-settings--long-term-skip.skipDate'])[5]").should("be.visible").click();
                    break;
                case (select_week == 6):
                    cy.xpath("(//*[@data-target='account-settings--long-term-skip.skipDate'])[6]").should("be.visible").click();
                    break;
                case (select_week == 7):
                    cy.xpath("(//*[@data-target='account-settings--long-term-skip.skipDate'])[7]").should("be.visible").click();
                    break;
                case (select_week == 8):
                    cy.xpath("(//*[@data-target='account-settings--long-term-skip.skipDate'])[8]").should("be.visible").click();
                    break;
            default:
                alert("Nothing was clicked");
                break;
            }

        },
        skip8weeks: () => {
            cy.xpath("//*[@id='long-term-skip']//*[@id='cta-primary']").click()
            //cy.get("[data-test='long-term-skip-cta-button']").should("be.visible").click()

        }


    },
    brightBack: {
        skipYourNextDelivery: () => {
            cy.xpath("//button[contains(text(),'Skip your next delivery')]").should("be.visible").click()

        },
        neverMindAndBackToDelivery: () => {
            cy.xpath("//span[contains(text(),'Never mind! Take me back to my deliveries')]").should("be.visible").click()

        },
        selectAnyReason: () => {
            cy.xpath("//span[contains(text(),'I disliked the food')]").should("be.visible").click()
            cy.xpath("//*[contains(@class,'justify-self--end')]").should("be.visible").click()

        },
        clickYesAtAnyForm: () => {
            cy.xpath("//*[@class='es-btn']").should("be.visible").click()

        },

        selectAnyOf10OFF: () => {
            cy.xpath("//label[contains(@action,'10_off_phase_3')][1]").should("be.visible").click();

        },
        selectAnyOfThreeMonthPause: () => {
            cy.xpath("//label[contains(@action,'three_month_pause')][1]").should("be.visible").click();

        },
        change12Plan: () => {
            cy.xpath("//label[contains(@action,'swap_products.sixty_forty_column')][1]").should("be.visible").click();

        },
        closeModal: () => {
            cy.xpath("//*[@id='modal-close-btn']").should("be.visible").click()

        },
        selectGettingYourMeals: () => {
            cy.xpath("//div[@id='mui-component-select-competition']").should("be.visible").click();
            cy.xpath("//*[@data-value='Delivery']").should("be.visible").click();

        },

        selectAnyOf4_8_12WeeksPause: () => {
            cy.xpath("//label[contains(@action,'4_8_12_pause_phase_3')][1]").should("be.visible").click();

        },

        clickBiWeekly: () => {
            cy.xpath("//label[contains(@action,'change_to_biweekly')][1]").should("be.visible").click();

        },

        changeToBiweekly: () => {
            cy.xpath("//button[contains(text(),'Change To Biweekly')]").should("be.visible").click()

        },

        selectBiWeekly: () => {
            cy.get("[id='user_email']").should("be.visible").click();

        },

        saveBiweekly: () => {
            cy.xpath("//button[contains(text(),'Save')]").should("be.visible").click()

        },

        getSubscriptionBiweekly: () => {
            return cy.xpath("//*[@data-fe='frequency']/main/p")
        },

        select4_8_12weeks: () => {
            var select_week = Math.floor(Math.random() * 4);// Get random number [1,3]

            switch (true) {
                case (select_week == 1):
                    cy.xpath("//*[@data-weeks-number='4']").should("be.visible").click();
                    break;
                case (select_week == 2):
                    cy.xpath("//*[@data-weeks-number='8']").should("be.visible").click();
                    break;
                case (select_week == 3):
                    cy.xpath("//*[@data-weeks-number='12']").should("be.visible").click();
                    break;

                default:
                    alert("Nothing was clicked");
                    break;
            }

        },
        selectPoll: () => {
            var select_week = Math.floor(Math.random() * 11);// Get random number [1,10]

            switch (true) {
                case (select_week == 1):
                    cy.xpath("//*[@class='poll']/div[2]/label[1]").should("be.visible").click();
                    break;
                case (select_week == 2):
                    cy.xpath("//*[@class='poll']/div[2]/label[2]").should("be.visible").click();
                    break;
                case (select_week == 3):
                    cy.xpath("//*[@class='poll']/div[2]/label[3]").should("be.visible").click();
                    break;
                case (select_week == 4):
                    cy.xpath("//*[@class='poll']/div[2]/label[4]").should("be.visible").click();
                    break;
                case (select_week == 5):
                    cy.xpath("//*[@class='poll']/div[2]/label[5]").should("be.visible").click();
                    break;
                case (select_week == 6):
                    cy.xpath("//*[@class='poll']/div[2]/label[6]").should("be.visible").click();
                    break;
                case (select_week == 7):
                    cy.xpath("//*[@class='poll']/div[2]/label[7]").should("be.visible").click();
                    break;
                case (select_week == 8):
                    cy.xpath("//*[@class='poll']/div[2]/label[8]").should("be.visible").click();
                    break;
                case (select_week == 9):
                    cy.xpath("//*[@class='poll']/div[2]/label[9]").should("be.visible").click();
                    break;
                case (select_week == 10):
                    cy.xpath("//*[@class='poll']/div[2]/label[10]").should("be.visible").click();
                    break;
                default:
                    alert("Nothing was clicked");
                    break;
            }

        },
        understandCheckBox: () => {
            cy.xpath("//*[@for='confirmation']/span").should("be.visible").click()

        },
        cancelSubscriptionBrightback: () => {
            cy.xpath("//*[@class='cancel-btn forward-btn']").click()

        },

        pause4_8_12Weeks: () => {
            cy.xpath("//*[@id='extended-long-term-skip']//*[@id='cta-primary']").click()

        },

        neverMind: () => {
            cy.xpath("//button[contains(text(),'Never mind')]").should("be.visible").click()

        }

    },
    changeSubscriptionName: {
        changeName: newName => {
            cy.get("[id='new_subscription_name']").should("be.visible").focus().clear()
            cy.get("[id='new_subscription_name']").type(newName);
            cy.get("[data-fe='change-subscription-name-submit-btn']").should("be.visible").click()

        },
        cancelChangingName: newName => {
            cy.get("[id='new_subscription_name']").should("be.visible").focus().clear()
            cy.get("[id='new_subscription_name']").type(newName);
            cy.get("[data-fe='cancel-btn]").should("be.visible").click()

        }

    },
    changeInfo: {
        changeEmail: (newEmail, userPassword) => {
            cy.get("[data-target='#change-email']").should("be.visible").click()
            cy.get("[id='user_email']").should("be.visible").focus().clear()
            cy.get("[id='user_email']").type(newEmail);
            cy.get("[id='change-email-password']").type(userPassword);
            cy.xpath("//div[@id='change-email']//button[contains(text(),'Change Email')]").should("be.visible").click()

        },
        getEmail: () => {
            return cy.xpath("//*[@data-fe='user-email']/p").should("be.visible")
        },
        getName: () => {
            return cy.xpath("//*[@data-fe='user-name']/p").should("be.visible")
        },

        cancelChangingName: newName => {
            cy.get("[id='new_subscription_name']").should("be.visible").focus().clear()
            cy.get("[id='new_subscription_name']").type(newName);
            cy.get("[data-fe='cancel-btn]").should("be.visible").click()

        },
        changePassword: (newPassword, userPassword) => {
            cy.get("[data-target='#change-password']").should("be.visible").click()
            cy.get("[id='user_password']").should("be.visible").focus().clear()
            cy.get("[id='user_password']").type(newPassword)
            cy.get("[id='user_current_password']").type(userPassword);
            cy.xpath("//div[@id='change-password']//button[contains(text(),'Change Password')]").should("be.visible").click()

        },
        changePersonalInfo: (newFirstName, newLastName) => {
            cy.get("[data-target='#change-name']").should("be.visible").click()
            cy.xpath("//div[@id='change-name']//button[contains(text(),'Change Name')]").should("be.disabled")
            cy.get("[id='user_first_name']").should("be.visible").focus().clear()
            cy.get("[id='user_first_name']").type(newFirstName)
            cy.get("[id='user_last_name']").should("be.visible").focus().clear()
            cy.get("[id='user_last_name']").type(newLastName)
            cy.xpath("//div[@id='change-name']//button[contains(text(),'Change Name')]").should("be.visible").click()

        }

    },
    addNewSubscription: {
        addNewSubscription: () => {
            cy.get("[data-test='settings-add-new-subscription']").should("be.visible").click()

        },
        addSubscriptionYes: () => {
            return cy.xpath("//*[@id='self-attribution-form']//button[@id='cta-primary']")
        },
        addSubscriptionNo: () => {
            return cy.xpath("//*[@id='self-attribution-form']//button[@id='cta-secondary']")
        },
        insertZip: (address) => {
            cy.get("[id='join_now_data_zip']").should("be.visible").type(address.zip)
            cy.get("[data-test='get-started-form-submit-button']").should("be.visible").click()
        },
        fillUserData: (userData, address) => {
            cy.get("[id='line1']").should("be.visible").type(address.line1, {force: true});
            cy.get("[id='phone']").type(userData.phoneNumber, {force: true});
            cy.xpath("//button[contains(text(),'Next')]").click()
        },
        submitPaymentFormNewSubscription: (userData) => {
            cy.xpath("//button[contains(text(),'Submit Order')]").click(); //click to Submit button
            cy.xpath("//button[contains(text(),'View my deliveries')]").should("be.visible").click()
        },

    },


    dietaryPreferences: {
        moveToDietaryPreferences: () => {
            cy.get("[data-test='header-first-name']").should("be.visible").click()
            cy.xpath("//*[contains(@href,'food-preferences')]").should("be.visible").click();

        },
        launchQuestionnaire: () => {
            cy.get("[data-action='users--dietary-preferences--summary#onLaunch']").should("be.visible").click()

        },
        editDietaryPreferences: () => {
            return cy.get("[data-action='users--dietary-preferences--summary#onLaunch']").should("be.visible")

        },
        finishDietaryPreferences: () => {
            return cy.get("[data-action='users--dietary-preferences--form#onSkip']").should("be.visible")

        },
        selectedAvoid: () => {
            return cy.xpath("//*[contains(@class,'dietary-preferences__summary')]/ul/li[1]/ul/li").should("be.visible")

        },
        selectedNeutral: () => {
            return cy.xpath("//*[contains(@class,'dietary-preferences__summary')]/ul/li[2]/ul/li").should("be.visible")

        },
        selectedEnjoy: () => {
            return cy.xpath("//*[contains(@class,'dietary-preferences__summary')]/ul/li[3]/ul/li").should("be.visible")

        },

        selectPreferencesFullList: () => {
            cy.get("[value='Next']").should("be.visible")
            var randomNumber;
            let N_avoid = 0;
            let N_neutral = 0;
            let N_enjoy = 0;
            for (var i = 1; i < 16; i++) {
                cy.wait(3000)
                randomNumber = (Math.floor(Math.random() * 3) + 1).toString()

                switch (randomNumber) {
                    case '1':
                        cy.get("[for='users_food_preference_score_-1']").should("be.visible").click()
                        N_avoid++;
                        break;

                    case '2':
                        N_neutral++;
                        break;
                    case '3':
                        cy.get("[for='users_food_preference_score_1']").should("be.visible").click()
                        N_enjoy++
                        break;

                    default:

                        break;
                }

                cy.get("[value='Next']").click()
            }
            cy.get("[value='Finish']").should("be.visible").click()
            N_neutral++
            return [N_avoid, N_neutral, N_enjoy]

        }
    },

    changePayment: {
        cardEnd: () => {
            return cy.xpath("//*[@class='payment-method-display-elements']").should("be.visible").invoke('text')

        },
        changePaymentMethod: () => {
            cy.get("[data-target='#change-payment-method']").should("be.visible").click()

        },
        addNewPaymentMethod: () => {
            cy.xpath("//button[contains(text(),'+ New Payment Method')]").should("be.visible").click()

        },
        fillNewPaymentForm: (fullName, address, paymentCardAdded) => {
            cy.xpath("(//*[contains(@name,'__privateStripeFrame')])[1]")
                .iframe()
                .find("input[name='cardnumber']").should('not.be.disabled')
                .click().wait(2000)
                .type(paymentCardAdded.number);
            cy.xpath("(//*[contains(@name,'__privateStripeFrame')])[2]")
                .iframe()
                .find("input[name='exp-date']")
                .click().wait(2000)
                .type(paymentCardAdded.expDate);
            cy.xpath("(//*[contains(@name,'__privateStripeFrame')])[3]")
                .iframe()
                .find("input[name='cvc']")
                .click().wait(2000)
                .type(paymentCardAdded.cvv)

            cy.get("#payment_method_stripe_billing_address_full_name").should("be.visible").type(fullName)
            cy.get("#payment_method_stripe_billing_address_line1").should("be.visible").type(address.line1)
            cy.get("#payment_method_stripe_billing_address_city").should("be.visible").type(address.city)
            cy.get("#payment_method_stripe_billing_address_state").select(address.state)
            cy.get("#payment_method_stripe_billing_address_zip").type(address.zip)

        },

        savePaymentMethod: () => {
            cy.xpath("//div[@id='create-payment-method']//button[contains(text(),'Save')]").should("be.visible").click()

        },

        setAsDefault: () => {
            cy.get("[data-action='click->account-settings--change-payment-method#setDefaultPaymentMethod']").should("be.visible").click()

        },

        deleteDefaultMethod: () => {
            cy.get("[data-action='click->account-settings--change-payment-method#showDeletePaymentMethodConfirmationModal']").should("be.visible").click()

        },

        yesDeleteButton: () => {
            return cy.xpath("//*[@id='delete-payment-method-modals']//button[@id='cta-primary']").first().should("be.visible").click()

        }


    },

    deliveryAddress: {
        getSubscriptionAddress: () => {
            return cy.xpath("//*[@data-fe='address']/main/p[3]")

        },

        changeDeliveryAddress: () => {
            cy.get("[data-target='#change-address']").should("be.visible").click()

        },
        addNewAddress: () => {
            cy.xpath("//button[contains(text(),'+ New Address')]").should("be.visible").click()

        },
        fillNewAddress: (userData, address) => {
            cy.get("#address_line1").should("be.visible").type(address.line1)
            cy.get("#address_city").should("be.visible").type(address.city)
            cy.get("#address_state").select(address.state)
            cy.get("#address_zip").type(address.zip)
            cy.get("#address_phone").type(userData.phoneNumber)
        },
        saveDeliveryAddress: () => {
            cy.xpath("//div[@id='new-address']//button[contains(text(),'Save')]").should("be.visible").click()

        },
        selectAddress: () => {
            cy.xpath("//a[contains(text(),'Select Address')]").should("be.visible").click()

        },
        deleteAddress: () => {
            cy.get("[data-action='click->account-settings--select-address#showDeleteAddressConfirmationModal']").should("be.visible").click()

        },
        yesDeleteButton: () => {
            return cy.xpath("//*[@id='delete-addresses-modals']//button[@id='cta-primary']").first().should("be.visible").click()

        },
        confirmDeliveryAddress: () => {
            cy.get("input#verification").should("be.visible").click()

        }

    },

    calendar: {
        changeDeliveryDay: () => {
            cy.get("[data-fe='default-delivery-day'] > aside > a").should("be.visible").click()

        },

        selectAnyDayInDropdown: () => {
            cy.get("#daySelector").should("be.visible").invoke('text').then((selectedDay) => {
                cy.get("#daySelector").click()
                var xPathOfNearestDay = "//li[contains(text(),'"+selectedDay.trim()+"')]/following-sibling::*[1]|//li[contains(text(),'"+selectedDay.trim()+"')]/preceding-sibling::*[1]"
                cy.log(xPathOfNearestDay)
                cy.xpath(xPathOfNearestDay).first().should("be.visible").click()
                cy.get("[data-fe='save-delivery-days-btn']").should("be.visible").click()
                cy.get("[data-test='confirmation-modal'] > form > div > p > b").should("be.visible").should("not.have.text",selectedDay.trim())
                cy.get("[data-fe='confirm-button']").should("be.visible").should("contain", "Ok, Got It!").click()
            })
        },

        selectAnyAvailableDayInCalendar: () => {
            cy.get("[data-fe='save-delivery-days-btn']").should("be.visible").should('be.disabled')
            //cy.get("[data-fe='save-delivery-days-btn']").should("be.visible")
            cy.xpath("//*[not(contains(@class, 'selected')) and contains(@class,'available')]").first().should("be.visible").click()
            cy.get("[data-fe='save-delivery-days-btn']").should("be.visible").should('be.enabled').click()
            cy.get("[data-fe='confirm-button']").should("be.visible").should("contain", "Ok, Got It!").click()

        },

        getDefaultDayFromSubscriptionPage: () => {
            return cy.get("[data-fe='default-delivery-day'] > main > p")

        }

    }

}


