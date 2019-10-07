export default {


	navBar: {
		clickOnHeaderLogo: () => {
			cy.get(".logo-wrapper > a > img")
				.first()
				.click()
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
		chooseMealPlan:  mealPlan => {
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
		continueToMealSelection: () => {
			cy.get("[data-fe='continue-to-meal-selection']")
				.click()
		}
	},
	mealsPicker: {
        chooseMealsFromMealPlanner: (times, selectDifferentMeals = false) => {
            if (selectDifferentMeals) {
                for (let i = 0; i < times; i++) {
                    cy.get(".meal-card")
                        .first()
                        .find("[data-test='add-meal-button']")
                        .click()
                }
            }
            else {
                for (let i = 0; i < times; i++) {
                    if ((i % 2) != 0) {
                        cy.get(".meal-card")
                            .last()
                            .find("[data-test='add-meal-button']")
                            .click()
                    }
                    else {
                        cy.get(".meal-card")
                            .first()
                            .find("[data-test='add-meal-button']")
                            .click()
                    }
                }

            }
            cy.get(".meals-review-cont > .btn-update-meals-cont > .btn")
                .click()
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
				cy.get("[id='checkout_first_name']")
					.type(userData.firstName)
				cy.get("[id='checkout_last_name']")
					.type(userData.lastName)
				cy.get("[id='checkout_password']")
					.type(userData.password)

				cy.get("[id='checkout_line1']")
					.should("be.visible")
				cy.get("[id='checkout_line1']")
					.type(address.line1)
				cy.get("[id='checkout_phone']")
					.type(userData.phoneNumber)
				cy.get("[value='Next']").click()



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


			submitDeliveryForm: () => {
				cy.get("[value='Next']").click()
			},

			verifyAddress: () => {
				cy.get("[data-target='checkout--address.verification']").find("div")
					.contains("We were unable to verify this address").should("be.visible")
				cy.get("[id='checkout_verified_by_user']")
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
			 return cy.get("[class='list-delivery-discounts list-group list-group-flush']")
		    },



			submitPaymentForm: () => {
				cy.get("[class='btn btn-primary btn-lg btn-block']")
					.click()
			},

			addPromoCode: promoCode => {
				cy.get("[class='pl-0 btn btn-link btn-sm']")
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
			 return cy.get('[data-test='header-first-name']')
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
			cy.get("[id='snacks-promotion-modal']")
				.find("[id='cta-primary']")
				.should("be.visible")
			cy.get("[id='snacks-promotion-modal']")
				.find("[id='cta-close']")
				.click()
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
			cy.get("[id='snacks-promotion-modal']")
				.find("[id='cta-primary']")
				.should("be.visible")
			cy.get("[id='snacks-promotion-modal']")
				.find("[id='cta-close']")
				.click()
		},

		visitSubscriptionSettingsPage: () => {
			let credentials = Cypress.env('credentialDemo')
			cy.url().then((loc) => {
            let newUrl = loc + "/edit"
			let cutURL = newUrl.substring(8, newUrl.length)
			let urlWithCredentials = 'https://'+ credentials + cutURL
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
			cy.get("[class='toast toast-success']").should("be.visible").contains(message)
			cy.get("[class='toast-close-button']").click()
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


