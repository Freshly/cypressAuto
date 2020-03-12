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

        get9MealsPlan: () => {
            return cy.get("[data-plan-id='423']")
        },

        getFirstNameHeader: () => {
            return cy.get("[data-test='header-first-name']")
        },

        getCancelSubscriptionButton: () => {
            return cy.get("[class='btn-link link-gray']")
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
            return cy.get("[data-method ='delete']")
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
            return cy.get("[class='txt-regular-m']")

        },

        getReturnToHomePage: () => {
            return cy.get("[data-fe='return-to-homepage-btn']")

        },

        getSubscriptionPromoCode: () => {
            return cy.xpath("//*[@data-fe='promo-code']/main/p")
        },


        dismissSelfAttributionForm2: () => {
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

        reactivateButton: () => {
            cy.get("[data-fe='unpause-subscription-btn']").should("be.visible").click()

        },

        reactivateSubscriptionFromDelivery: () => {
            cy.get("[value='Reactivate Subscription']").should("be.visible").click()

        },
        select8WeekForSkipping: () => {
            var select_week = Math.floor(Math.random() * 9);// Get random number [1,8]

            switch (true) {
                case (select_week == 1):
                    cy.xpath("(//*[@data-fe='select-date-button'])[1]").should("be.visible").click();
                    break;
                case (select_week == 2):
                    cy.xpath("(//*[@data-fe='select-date-button'])[2]").should("be.visible").click();
                    break;
                case (select_week == 3):
                    cy.xpath("(//*[@data-fe='select-date-button'])[3]").should("be.visible").click();
                    break;
                case (select_week == 4):
                    cy.xpath("(//*[@data-fe='select-date-button'])[4]").should("be.visible").click();
                    break;
                case (select_week == 5):
                    cy.xpath("(//*[@data-fe='select-date-button'])[5]").should("be.visible").click();
                    break;
                case (select_week == 6):
                    cy.xpath("(//*[@data-fe='select-date-button'])[6]").should("be.visible").click();
                    break;
                case (select_week == 7):
                    cy.xpath("(//*[@data-fe='select-date-button'])[7]").should("be.visible").click();
                    break;
                case (select_week == 8):
                    cy.xpath("(//*[@data-fe='select-date-button'])[8]").should("be.visible").click();
                    break;
            default:
                alert("Nothing was clicked");
                break;
            }

        },
        skip8weeks: () => {
            cy.get("[data-test='long-term-skip-cta-button']").should("be.visible").click()

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

        getDefaultDayFromSubscriptionPage: () => {
            return cy.get("[data-fe='default-delivery-day'] > main > p")

        }

    }

}


