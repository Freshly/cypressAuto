
export default {


    navBar: {
        clickOnHeaderLogo: () => {
            cy.get(".logo-wrapper > a > img")
                .first()
                .click()
        },
        clickOnGift: () => {
            cy.get("[class='nav-link nav-link-header'][href='/gifts']").click()
        },
        clickOnDeliveries: () => {
            cy.get("[data-test='meal-planner-header-link']").should("be.visible").click()
        }
    },
    getStarted: {
        visitGetStartedPage: () => {
            let uri = "/join-now"
            cy.visit(uri)
        },
        visitMainPage: () => {
            let uri = "/"
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

        FirstDeliveryDate: () => {
            return cy.get("[data-fe='selected-delivery-date']")
        },

        chooseLastDeliveryDayFromAvailable: () => {
            cy.get("[data-fe='day-of-week-card']").last()
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
        },

        chooseMealsFromMealDetailsCard: (times, selectDifferentMeals = false) => {
            if ((Cypress.env('typeOfMealsSelecting')) == "new") {
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
                    //check Next button is disabled until quantity of meals don't fit to plan
                    cy.get("[data-fe='next-button']").should("be.disabled")
                    //check Warning message is shown until quantity of meals don't fit to plan
                    cy.get("[data-fe='error-message-box']").should("be.visible")

                    for (let i = 0; i < times; i++) {
                        cy.get("[data-fe='meal-image']")
                            .first()
                            .click({force: true})
                        cy.wait(2000)
                        cy.get(".modal-dialog")
                            .find("[data-fe='add-button']").first()
                            .click({force: true})
                    }
                }
                else {
                    for (let i = 0; i < times; i++) {
                        //check Next button is disabled until quantity of meals don't fit to plan
                        cy.get("[data-fe='next-button']").should("be.disabled")
                        //check Warning message is shown until quantity of meals don't fit to plan
                        cy.get("[data-fe='error-message-box']").should("be.visible")

                        if ((i % 2) != 0) {
                            cy.get("[data-fe='meal-image']")
                                .last()
                                .click({force: true})
                            cy.wait(2000)
                            cy.get(".modal-dialog")
                                .find("[data-fe='add-button']").first()
                                .click({force: true})
                        }
                        else {
                            cy.get("[data-fe='meal-image']")
                                .first()
                                .click({force: true})
                            cy.wait(2000)
                            cy.get(".modal-dialog")
                                .find("[data-fe='add-button']").first()
                                .click({force: true})
                        }


                    }

                }
                //check Next button is NOT disabled when quantity of meals fit to plan
                cy.get("[data-fe='next-button']").should("be.enabled")
                //check Warning message is NOT shown when quantity of meals fit to plan
                cy.get("[data-fe='error-message-box']").should("be.not.visible")
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
                    .type(userData.firstName, {force: true})
                cy.get("[name='lastName']")
                    .type(userData.lastName, {force: true})
                //cy.get("[name='password']").type(userData.password, {force: true})

                cy.get("[name='line1']")
                    .should("be.visible")
                cy.get("[name='line1']")
                    .type(address.line1, {force: true})
                cy.get("[name='phone']")
                    .type(userData.phoneNumber, {force: true})
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
            totalSumCheckout: () => {
                return cy.get("[class='float-right font-weight-500']")

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
                cy.get("[for='ccPaymentOptionInput']").should("be.visible")
                    .click({force: true})
                cy.wait(5000)
                cy.get("iframe[name='__privateStripeFrame8']")
                    .iframe()
                    .find("input[name='cardnumber']").should('not.be.disabled')
                    .click().wait(2000)
                    .type(paymentCard.number)
                cy.get("iframe[name='__privateStripeFrame9']")
                    .iframe()
                    .find("input[name='exp-date']")
                    .click().wait(2000)
                    .type(paymentCard.expDate)
                cy.get("iframe[name='__privateStripeFrame10']")
                    .iframe()
                    .find("input[name='cvc']")
                    .click().wait(2000)
                    .type(paymentCard.cvv)
            },
            getRemovePromo: () => {
                return cy.get("[class='btn-link-gray p-0 btn btn-link']")
            },

            getPaymentPanel: () => {
                return cy.get("[class='promo-discount-item list-group-item']")
            },


            submitPaymentForm: (userData) => {
                cy.get("[class='btn btn-primary btn-lg btn-block']").click() //click to Submit button
                cy.get("[name='password']").should("be.visible").type(userData.password, {force: true})//fill password from
                cy.get("[class='mt-4 btn btn-primary btn-lg btn-block']").click()// click to "Create now"
                cy.wait(2000)
                //cy.get("[class='border-0 rounded-3 ml-0 py-0 my-1 btn btn-primary btn-lg']").should("be.visible").click() //click to View my deliveries


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
            cy.get(`[data-id="${mealPlanId}"]`).should("be.visible").click()
        },
        fillGiftForm: (firstName, lastName, email, gifterName, gifterLastName) => {
            cy.get("[id='gift_card_purchase_recipient_first_name'][type='text']").should("be.visible").focus().type(firstName);
            cy.get("[id='gift_card_purchase_recipient_last_name'][type='text']").should("be.visible").focus().type(lastName);
            cy.get("[id='gift_card_purchase_recipient_email'][type='email']").should("be.visible").focus().type(email);
            cy.get("[id='gift_card_purchase_gifter_first_name'][type='text']").should("be.visible").focus().type(gifterName);
            cy.get("[id='gift_card_purchase_gifter_last_name'][type='text']").should("be.visible").focus().type(gifterLastName);
            cy.get("[value='Continue']").should("be.visible").click();
            cy.get("[data-action='giftcards--purchase--payment-step#onPayByCreditCard']").should("be.visible").click();
        },
        fillOutGiftPayment: (paymentCard, email) => {
            cy.get("iframe[class='stripe_checkout_app']").iframe().find("input[placeholder='Email']").click().type(email)
            cy.get("iframe[class='stripe_checkout_app']").iframe().find("input[placeholder='Card number']").click().type(paymentCard.number)
            cy.get("iframe[class='stripe_checkout_app']").iframe().find("input[placeholder='MM / YY']").click().type(paymentCard.expDate)
            cy.get("iframe[class='stripe_checkout_app']").iframe().find("input[placeholder='CVC']").click().type(paymentCard.cvv)
            cy.get("iframe[class='stripe_checkout_app']").iframe().find("button[class='Button-animationWrapper-child--primary Button']").click()
        },
        recipientEmailSuccess: () => {
            return cy.get("[data-fe='recipient-email']")
        },
        findGiftAsAdmin: email => {
            let url = '/admin/gift_cards'
            cy.visit(url);
            cy.get("#term").should("be.visible").focus().type(email)
            cy.get("[value='Find']").should("be.visible").click()

        },
        getGift: () => {
            return cy.get("[class='table table-striped table-sm table-bordered']>tbody>tr>td:nth-child(4)>a")
        },
        fillRedeemForm: (giftCode, email, zip) => {
            cy.get("#gift_card_redemption_gift_code").should("be.visible").focus().type(giftCode)
            cy.get("#gift_card_redemption_recipient_email").should("be.visible").focus().type(email)
            cy.get("#gift_card_redemption_zip").should("be.visible").focus().type(zip)
            cy.get("[value='Choose meals']").click()
        },
        giftSuccessHeader: () => {
            //return cy.get("[class='promo-header text-center text-uppercase d-none d-sm-flex justify-content-center flex-column text-white']")
            return cy.xpath("//*[contains(@class,'promo-header text-center')]")

        },


    },


    subscription: {

        dismissSelfAttributionForm: () => {
            cy.xpath("//*[@class='modal-content']//button[contains(text(),'×')]").should("be.visible").click()
            cy.get("[class='border-0 rounded-3 ml-0 py-0 my-1 btn btn-primary btn-lg']").should("be.visible").click()
        },

        getFirstNameHeader: () => {
            return cy.get("[data-test='header-first-name']")
        },

        dismissSelfAttributionForm2: () => {
            cy.xpath("//*[@id = 'download-app-modal']//button[@data-test='close-modal']/span").should("be.visible").click()

        },

        selectRandomValue: () => {
            var randomNumber = (Math.floor(Math.random() * 13) + 1).toString()

            cy.xpath("//*[@class='modal-content']//button[contains(text(),'Submit')]").should("be.not.enabled")

            switch (randomNumber) {
                case '1':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(1)").should("be.visible").click()
                    break;
                case '2':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(2)").should("be.visible").click()
                    break;
                case '3':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(3)").should("be.visible").click()
                    break;
                case '4':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(4)").scrollIntoView().should("be.visible").click()
                    break;
                case '5':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(5)").scrollIntoView().should("be.visible").click()
                    break;
                case '6':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(6)").scrollIntoView().should("be.visible").click()
                    break;
                case '7':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(7)").scrollIntoView().should("be.visible").click()
                    break;
                case '8':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(8)").scrollIntoView().should("be.visible").click()
                    break;
                case '9':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(9)").scrollIntoView().should("be.visible").click()
                    break;
                case '10':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(10)").scrollIntoView().should("be.visible").click()
                    break;
                case '11':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(11)").scrollIntoView().should("be.visible").click()
                    break;
                case '12':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(12)").scrollIntoView().should("be.visible").click()
                    break;
                case '13':
                    cy.get("[class='mx-n3 overflow-auto border-bottom text-center list-group']>li:nth-child(13)").scrollIntoView().should("be.visible").click()
                    break;

                default:
                    break;
            }
            cy.wait(2000)
            cy.xpath("//*[@class='modal-content']//button[contains(text(),'Submit')]").should("be.enabled").click()


        },

        skipBothAttributionForms: () => {
            cy.xpath("//*[@class='modal-content']//button[contains(text(),'×')]").should("be.visible").click()
            cy.get("[class='border-0 rounded-3 ml-0 py-0 my-1 btn btn-primary btn-lg']").should("be.visible").click()
            cy.xpath("//*[@id = 'download-app-modal']//button[@data-test='close-modal']/span").should("be.visible").click()
            //cy.get(".modal fade show").should("be.visible").click()
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

    toastMessage: {
        checkMessage: message => {
            //cy.get("[class='toast toast-success']").should("be.visible").contains(message);
            cy.xpath("//*[@class='toast toast-success']|//*[@class='toast-message']").should("be.visible").contains(message);
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
        logOutFromAdmin: () => {
            cy.xpath("//*[contains(text(),'Exit')]").should("be.visible").click();
            cy.get("[data-test='header-first-name']").click();
            cy.get("[data-test='header-logout-button']").click();
            cy.get("[data-test='header-first-name']")
                .should('not.exist')
        }

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
    deliveryPage: {
        dayOfFirstWeek: () => {
            return cy.get("[class='component card weekly-order-card'] > header > article > h2 > span").first().should("be.visible").invoke('text')

        },

        dayOfSecondWeek: () => {
            return cy.get("[data-action='click->meal-planner--delivery-dates#fetchDeliveryDates']").should("be.visible").invoke('text')
        }

    }
}


