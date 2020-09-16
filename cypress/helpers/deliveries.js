export default {


    deliveries: {

        selectingNewMeals: mealPlan => {
            cy.url().should("include", "/edit")
            cy.xpath("//button[contains(text(),'Clear All')]").should("be.visible").click()
            var selectMealNumber = Math.floor(Math.random() * 20)

            for (let i = 0; i <= mealPlan; i++) {
                //cy.get("[class='fr-add-button meal-card__add-button']").eq(selectMealNumber).click({force: true})
                cy.get("[data-test='add-meal']").eq(selectMealNumber).click({force: true})

                selectMealNumber = Math.floor(Math.random() * 20)
            }

            cy.xpath("//button[contains(text(),'Save')]").should("be.visible").click()
        },

        stillWantToSkipDelivery: () => {
            cy.xpath("//section[@data-week-number='2']//button[contains(text(),'Skip Delivery')]").should("be.visible").click()
        },

        stillWantToSkipNevermind: () => {
            cy.xpath("//section[@data-week-number='2']//button[contains(text(),'Nevermind')]").should("be.visible").click()
        },
        mealAvoidAlert: () => {
            cy.xpath("//*[@class='fr-nav navigation']/div[2]").should("be.visible").click() //move to tab 'All meals'
            return cy.get("[class='icon-warning']")
        },
        totalSumAtDelivery: () => {
            return cy.get("[class='promo total-price']>strong")

        }

    },

    first_week: {
        quantityMeals: () => {
            return cy.xpath("//section[@class='component card weekly-order-card paid']//*[@class='component meal-card ']")

        },
        deliveryDay: () => {
            return cy.get("[data-test='weekly-order-show-delivery']>section>h2")

        },
        plan: () => {
            return cy.xpath("[data-test='weekly-order-show-meal-plan']>section>h2").should("be.visible")

        }


    },
    second_week: {
        quantityMeals: () => {
            cy.xpath("//section[@class='component card weekly-order-card open'][1]//*[@class='component meal-card ']")

        },
        deliveryDay: () => {
            return cy.xpath("//section[@class='component card weekly-order-card open'][1]//*[@data-action='click->meal-planner--delivery-dates#fetchDeliveryDates']").should("be.visible")

        },
        changeDeliveryDay: () => {
            cy.xpath("//section[@class='component card weekly-order-card open'][1]//*[@data-action='click->meal-planner--delivery-dates#fetchDeliveryDates']").should("be.visible").click();
            cy.xpath("(//section[@class='component card weekly-order-card open'][1]//*[@data-action='click->meal-planner--delivery-dates#updateDeliveryDate'])[1]").should("be.visible").click();



        },
        skipWeek: () => {
            return cy.xpath("//section[@class='component card weekly-order-card open'][1]//*[@value='Skip This Week']")

        },

        unSkipWeek: () => {
            return cy.xpath("//*[@value='Unskip This Week']")

        },
        changeMeals: () => {
            return cy.xpath("//section[@class='component card weekly-order-card open'][1]//a[contains(text(),'Change Meals')]")

        },
        plan: () => {
            return cy.xpath("//section[@class='component card weekly-order-card open'][1]//*[@data-target='meal-planner--weekly-order-card.changePlanButton']").should("be.visible")


        },
        changePlan: () => {
            cy.xpath("//section[@class='component card weekly-order-card open'][1]//*[@data-target='meal-planner--weekly-order-card.changePlanButton']").should("be.visible").click();
            cy.xpath("(//section[@class='component card weekly-order-card open'][1]//*[@data-action='click->meal-planner--weekly-order-card#onUpdatePlan'])[2]").should("be.visible").click();

        },
        firstMealName: () => {
            return cy.xpath("//section[@class='component card weekly-order-card open'][1]//*[@class='meals']/li[1]/section/h3")


        }


    },
    third_week: {

        deliveryDay: () => {
            cy.xpath("//section[@class='component card weekly-order-card open'][2]//*[@data-action='click->meal-planner--delivery-dates#fetchDeliveryDates']").should("be.visible")

        },
        changeDeliveryDay: () => {
            cy.xpath("//section[@class='component card weekly-order-card open'][2]//*[@data-action='click->meal-planner--delivery-dates#fetchDeliveryDates']").should("be.visible").click();
            cy.xpath("(//section[@class='component card weekly-order-card open'][2]//*[@data-action='click->meal-planner--delivery-dates#updateDeliveryDate'])[1]").should("be.visible").click();

        },
        skipWeek: () => {
            return cy.xpath("//section[@class='component card weekly-order-card open'][2]//*[@value='Skip This Week']")

        },
        plan: () => {
            return cy.xpath("//section[@class='component card weekly-order-card open'][2]//*[@data-target='meal-planner--weekly-order-card.changePlanButton']").should("be.visible")

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
            return cy.xpath("//*[@class='dietary-preferences__summary']/ul/li[1]/ul/li").should("be.visible")

        },
        selectedNeutral: () => {
            return cy.xpath("//*[@class='dietary-preferences__summary']/ul/li[2]/ul/li").should("be.visible")

        },
        selectedEnjoy: () => {
            return cy.xpath("//*[@class='dietary-preferences__summary']/ul/li[3]/ul/li").should("be.visible")

        },

        selectPreferencesFullList: () => {
            cy.get("[value='Next']").should("be.visible")
            var randomNumber;
            let N_avoid = 0;
            let N_neutral = 0;
            let N_enjoy = 0;
            for (var i = 1; i < 11; i++) {
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


}


