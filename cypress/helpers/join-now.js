
export default {


    navBar: {
        clickOnHeaderLogo: () => {
            cy.get(".logo-wrapper > a > img")
                .first()
                .click()
        },
        clickOnGift: () => {
            cy.get("[href='/gifts']").click()
        },
        clickOnDeliveries: () => {
            cy.get("[data-test='meal-planner-header-link']").click()
        }
    },
    getStarted: {
        visitGetStartedPage: () => {
            let uri = "/join-now"
            cy.visit(uri)
        },

        fillOutGetStartedForm: (userData, address) => {
            cy.get("[data-test='email-field']")
                .type(userData.email)
            cy.get("[data-test='zip-field']")
                .type(address.zip)
            cy.get("[data-test='get-started-form-submit-button']")
                .click()
        },
        enterZipCode: zip => {
            cy.get("[data-fe='zip-input']")
                .type(zip)
        },
        submitGetStartedForm: () => {
            cy.get("[data-test='get-started-form-submit-button']")
                .click()
        },
        clickOnHeaderLogo: () => {
            cy.get(".logo-wrapper > a > img")
                .first()
                .click()
        }

    },
    planPicker: {
        chooseMealPlan: mealPlan => {
            let planId = mealPlan.id
            cy.get(`[data-plan-id="${planId}"]`)
                .first()
                .find("span")
                .contains("Select this plan")
                .click()
        }
    },
    dayPicker: {
        getValuesOfAvailableDeliveryDays: () => {

            let availableDeliveryDates = [];
            let ArrayLenght;
            cy.get("[data-fe='day-of-week-card']").then(availableDeliveryDays => {
                for (let i = 0; i < availableDeliveryDays.length; i++) {
                    cy.wrap(availableDeliveryDays[i])
                        .invoke("attr", "data-day")
                        .then(date => {
                            availableDeliveryDates.push(date)
                            cy.log(date)

                        })
                }

            })

            return cy.wrap(availableDeliveryDates)

        },


        chooseFirstDeliveryDayFromAvailable: () => {
            cy.get("[data-test='earliest-delivery-date']")
                .click()
            cy.get("[data-fe='continue-to-meal-selection']")
                .click()
        },
        chooseMostPopularDay: () => {
            cy.get("[class='day-details-copy txt-small-green']")
                .click()
            cy.get("[data-fe='continue-to-meal-selection']")
                .click()
        },
        MostPopularDay: () => {
            return cy.get("[class='day-details-copy txt-small-green']")

        },
        MostPopularDayAfterSelection: () => {
            return cy.xpath("//*[@class='card-wrapper txt-regular active']//*[@class='day-of-week txt-regular-m']")

        },
        continueToMealSelection: () => {
            cy.get("[data-fe='continue-to-meal-selection']")
                .click()
        }
    },
    mealsPicker: {
        chooseMealsFromMealPlanner: (times, selectDifferentMeals = false) => {
            if ((Cypress.env('typeOfMealsSelecting'))=="new") {
                 for (let i = 0; i < times; i++) {
                        if ((i % 2) != 0) {
                            cy.get(".meal-card__container")
                                .last()
                                .find("[data-test='add-meal']")
                                .click({force: true})
                        }
                        else {
                            cy.get(".meal-card__container")
                                .first()
                                .find("[data-test='add-meal']")
                                .click({force: true})
                        }
                    }

            cy.get(".cart-layout>header button").click()
            }
            else {
                if (selectDifferentMeals) {
                    for (let i = 0; i < times; i++) {
                        cy.get(".meal-card")
                            .first()
                            .find("[data-test='add-meal-button']")
                            .click({force: true})
                    }
                }
                else {
                    for (let i = 0; i < times; i++) {
                        if ((i % 2) != 0) {
                            cy.get(".meal-card")
                                .last()
                                .find("[data-test='add-meal-button']")
                                .click({force: true})
                        }
                        else {
                            cy.get(".meal-card")
                                .first()
                                .find("[data-test='add-meal-button']")
                                .click({force: true})
                        }
                    }

                }
                cy.get(".meals-review-cont > .btn-update-meals-cont > .btn")
                    .click()

            }
        }
    },
    checkOut: {
        authorizationPanel: {
            enterPassword: password => {
                cy.get("[data-fe='password-input']")
                    .type(password)
            },
            fillOutAuthForm: userData => {
                cy.get("[data-fe='first-name-input']")
                    .type(userData.firstName)
                cy.get("[data-fe='last-name-input']")
                    .type(userData.lastName)
                cy.get("[data-fe='password-input']")
                    .type(userData.password)
            },

            submitAuthForm: () => {
                cy.get("#authPanel")
                    .find("button")
                    .contains("Next")
                    .click()
            }
        },
        fillRegistrationData: {
            fillUserData: (userData, address) => {
                cy.get("[name='firstName']")
                    .type(userData.firstName)
                cy.get("[name='lastName']")
                    .type(userData.lastName)
                cy.get("[name='password']")
                    .type(userData.password)

                cy.get("[name='line1']")
                    .should("be.visible")
                cy.get("[name='line1']")
                    .type(address.line1)
                cy.get("[name='phone']")
                    .type(userData.phoneNumber)
                //cy.get("[class='btn btn-primary btn-block btn-lg btn btn-secondary']").click()
                cy.get("[class='same-height-as-paypal-button btn btn-primary btn-lg btn-block']").click()


            },
        },
        deliveryPanel: {
            fillOutDeliveryForm: (userData, address) => {
                cy.get("[data-fe='line1-input']")
                    .should("be.visible")
                cy.get("[data-fe='line1-input']")
                    .type(address.line1)
                cy.get("[data-fe='phone-input']")
                    .type(userData.phoneNumber)
            },

            selectAnotherDeliveryDate: () => {
                cy.get("#deliveryDate").selectNth(2)
                //cy.xpath("(//*[@id='deliveryDate']/option)[2]").select()

            },

            submitDeliveryForm: () => {
                cy.get("[type='submit']").contains('Next').click()
            },

            checkSMSbox: () => {
                cy.get("[name='agreedToReceiveSms']").click({force: true})

            },
            billingAddressBox: () => {
                cy.get("[id='sameBillingAddressInput']").click({force: true})

            },
            fillBillingAddress: () => {
                cy.get("#billing_address_line1").should("be.visible").type("120 Highway");

                cy.get("#billing_address_city").should("be.visible").focus().clear();
                cy.get("#billing_address_city").type('New York');


            },


            SMSbox: () => {
                return cy.get("[name='agreedToReceiveSms']")

            },

            verifyAddress: () => {
                cy.get("[class='text-danger ml-2']")
                    .contains("We were unable to verify").should("be.visible")
                cy.xpath("//*[@class='p-0 mb-2 opacity_height_transition_wrapper col-md-10 offset-md-1 opacity_height_transition_wrapper-exit-done']/div/div/label")
                    .click({force: true})
            },

        },
        paymentPanel: {
            fillOutPaymentInfoWithCard: (paymentCard) => {
                cy.get("[for='ccPaymentOptionInput']")
                    .click({force: true})
                cy.get("iframe[name='__privateStripeFrame5']")
                    .iframe()
                    .find("input[name='cardnumber']")
                    .click()
                    .type(paymentCard.number)
                cy.get("iframe[name='__privateStripeFrame6']")
                    .iframe()
                    .find("input[name='exp-date']")
                    .click()
                    .type(paymentCard.expDate)
                cy.get("iframe[name='__privateStripeFrame7']")
                    .iframe()
                    .find("input[name='cvc']")
                    .click()
                    .type(paymentCard.cvv)
            },
            getRemovePromo: () => {
                return cy.get("[class='btn-link-gray p-0 btn btn-link']")
            },

            getPaymentPanel: () => {
                return cy.get("[class='promo-discount-item list-group-item']")
            },


            submitPaymentForm: () => {
                cy.get("[class='btn btn-primary btn-lg btn-block']").click() //click to Submit button
                cy.get("[class='border-0 rounded-3 ml-0 py-0 my-1 btn btn-primary btn-lg']").should("be.visible").click() //click to View my deliveries


            },

            addPromoCode: promoCode => {
                cy.get("[class='pl-0 font-weight-normal btn btn-link']")
                    .click()
                cy.get("[name='checkoutPromoCode']")
                    .type(promoCode)
                cy.get("[name='checkoutPromoCodeSubmit']").click()

            },

        }
    },
    createAccountPage: {
        waitToBeNavigatedToAccountCreationPage: () => {
            cy.get("[class='text-nowrap']")
                .should("be.visible")
            cy.url().should("include", "/join-now/purchase-complete")
            cy.get("h1").contains("Thank you for your order").should("be.visible")
        }
    },
    gifts: {
        waitToBeNavigatedToAccountCreationPage: () => {
            cy.get("[class='text-nowrap']")
                .should("be.visible")
            cy.url().should("include", "/join-now/purchase-complete")
            cy.get("h1").contains("Thank you for your order").should("be.visible")
        },
        giveGift: () => {
            cy.get("[data-seg='GiftCard GiftCTA']").first().should("be.visible").click()
            cy.url().should("include", "/gifts/purchase")
            cy.get("h1").contains("Choose a plan").should("be.visible")
        },
        reedemGift: () => {
            cy.get("[data-seg='GiftCard RedeemCTA']").first().should("be.visible").click()
            cy.url().should("include", "/gifts/redeem")
            cy.get("h1").contains("Hi there!").should("be.visible")
        },
        chooseMealPlanForGift: mealPlanId => {
            //let planId = mealPlan.id
            cy.get(`[data-id="${mealPlanId}"]`).should("be.visible").click()
        },
        fillGiftForm: (firstName, lastName, email, gifterName, gifterLastName) => {
            cy.get("[id='gift_card_purchase_recipient_first_name'][type='text']").should("be.visible").focus().type(firstName);
            cy.get("[id='gift_card_purchase_recipient_last_name'][type='text']").should("be.visible").focus().type(lastName);
            cy.get("[id='gift_card_purchase_recipient_email'][type='text']").should("be.visible").focus().type(email);
            cy.get("[id='gift_card_purchase_gifter_first_name'][type='text']").should("be.visible").focus().type(gifterName);
            cy.get("[id='gift_card_purchase_gifter_last_name'][type='text']").should("be.visible").focus().type(gifterLastName);
            cy.get("[value='Continue']").should("be.visible").click();
            cy.get("[data-action='giftcards--purchase--payment-step#onPayByCreditCard']").should("be.visible").click();
        }
    },


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
            return cy.get("[data-fe='change-default-plan-btn']")
        },

        get9MealsPlan: () => {
            return cy.get("[data-plan-id='423']")
        },

        getFirstNameHeader: () => {
            return cy.get("[data-test='header-first-name']")
        },

        getCancelSubscriptionButton: () => {
            return cy.get("[data-fe='cancel-subscription-btn']")
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

        getSecondDropdownDelivery: () => {
            return cy.get("[data-second-question-key='delivery']")
        },

        getDeliveryAnswerButton: () => {
            return cy.get("[data-second-answer-key='delivery_late']")
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


        dismissSelfAttributionForm2: () => {
            /*cy.get("[id='snacks-promotion-modal']")
                .find("[id='cta-primary']")
                .should("be.visible")
            cy.get("[id='snacks-promotion-modal']")
                .find("[id='cta-close']")
                .click()*/
            cy.xpath("//*[@id = 'change-meals-modal']/div/div/div[1]/button|//*[@data-meal-planner--raf-modal-raf-path='/refer_a_friend']/div/div/div[1]/button").should("be.visible").click()
            //cy.get("//*[@id = 'change-meals-modal']/div/div/div[1]/button|//*[@data-meal-planner--raf-modal-raf-path=\"/refer_a_friend\"]/div/div/div[1]/button").should("be.visible")
        },

        skipBothAttributionForms: () => {
            cy.get("#self-attribution-form")
                .find("div.modal-content")
                .should("be.visible")
            cy.get("#self-attribution-form")
                .find("div.modal-content")
                .find(".modal-footer")
                .find("[id='cta-secondary']")
                .click()
            cy.xpath("//*[@id = 'change-meals-modal']/div/div/div[1]/button|//*[@data-meal-planner--raf-modal-raf-path='/refer_a_friend']/div/div/div[1]/button").should("be.visible").click()
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

        waitToBeAtSubscriptionsPage: userData => {
            cy.url().should("include", "/subscriptions/")
            cy.get("[data-test='header-first-name']")
                .should("contain", userData.firstName)
        }

    },
    accountDetails: {
        enterName: newUserName => {
            cy.get("[id='first_name']").should("be.visible").focus().clear()
            cy.get("[id='first_name']").type(newUserName)
        },
        getUserAccountPage: () => {
            return cy.get("[class='dropdown-item font-weight-light']")
        },

        enterSurname: newUserName => {
            cy.get("[id='last_name']").clear()
            cy.get("[id='last_name']").type(newUserName)
        },
        saveButtonClick: () => {
            cy.get("[data-fe='change-name-save-btn']")
                .click()
        },
        changePassword: () => {
            cy.get("[data-fe='change-password-btn']")
                .click()
        },
        fillPasswordForm: (newPassword, oldPassword) => {
            cy.get("[id='new_password']").type(newPassword)
            cy.get("[id='current_password']").type(oldPassword)
        },
        changePasswordClick: (newPassword, oldPassword) => {
            cy.get("[data-fe='change-password-submit-btn']").click()

        }

    },
    toastMessage: {
        checkMessage: message => {
            cy.get("[class='toast toast-success']").should("be.visible").contains(message);
            cy.get("[class='toast-close-button']").click({multiple: true})
        },

        checkErrorMessage: message => {
            cy.get("[class='toast toast-error']").should("be.visible").contains(message);
            cy.get("[class='toast-close-button']").click({multiple: true})
        },


        closeButtonClick: () => {
            cy.get("[class='toast-close-button']")
                .click()
        }

    },
    logOut: {
        logOutFromDelivery: () => {
            cy.get("[data-test='header-first-name']").click();
            cy.get("[data-test='header-logout-button']").click();
            cy.get("[data-test='header-first-name']")
                .should('not.exist')
        },
    },
    logIn: {
        fillLogInFormWithExistingUser: (email, password) => {
            let logInUrl = "/login"
            cy.visit(logInUrl)
            cy.get("[id='form_object_session_email']").should("be.visible")
            cy.get("[id='form_object_session_email']").type(email);
            cy.get("[id='form_object_session_password']").type(password);
            cy.get("[value='Log in']").should("be.visible").click()

        }


    },
    cancelSubscription: {
        submitReason: () => {
            cy.get("[data-fe='submit-survey-btn']").should("be.visible").click()

        },
        wantToCancel: () => {
            cy.get("[data-fe='pause-subscription-btn']").should("be.visible").click()

        },
        reactivateButton: () => {
            cy.get("[data-fe='unpause-subscription-btn']").should("be.visible").click()

        }

    },

    deliveryPage: {
        dayOfFirstWeek: () => {
            return cy.get("[class='component card weekly-order-card'] > header > article > h2 > span").first().should("be.visible").invoke('text')

        },

        dayOfSecondWeek: () => {
            return cy.xpath("(//*[@class = 'component card weekly-order-card']/header/article/h2/span)[3]").should("be.visible").invoke('text')


        },

        cancelChangingName: newName => {
            cy.get("[id='new_subscription_name']").should("be.visible").focus().clear()
            cy.get("[id='new_subscription_name']").type(newName);
            cy.get("[data-fe='cancel-btn]").should("be.visible").click()

        }

    },

    changeSubscritionName: {
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

    }

}


