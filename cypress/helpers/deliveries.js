export default {


    deliveries: {

        selectingNewMeals: mealPlan => {
            cy.url().should("include", "/edit")
            cy.xpath("//button[contains(text(),'Clear All')]").should("be.visible").click()
            var selectMealNumber = Math.floor(Math.random() * 20)

            for (let i = 0; i <= mealPlan + 1; i++) {
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
            return cy.get("[class='icon-warning']")
        },
        totalSumAtDelivery: () => {
            return cy.get("[class='promo total-price']>strong")

        }

    },

    first_week: {
        quantityMeals: () => {
            return cy.xpath("//section[@data-week-number='1']//*[@class='component meal-card ']")

        },
        deliveryDay: () => {
            //return cy.xpath("//section[@data-week-number='1']//*[@data-test='weekly-order-show-delivery']//h2")
            return cy.get("[data-test='weekly-order-show-delivery']>section>h2")

        },
        plan: () => {
            return cy.xpath("(//*[@data-week-number='1']//h2)[2]").should("be.visible")

        }


    },
    second_week: {
        quantityMeals: () => {
            return cy.xpath("//section[@data-week-number='2']//*[@class='component meal-card ']")

        },
        deliveryDay: () => {
            return cy.xpath("(//section[@data-week-number='2']//*[@data-toggle='dropdown'])[1]").should("be.visible")

        },
        changeDeliveryDay: () => {
            cy.xpath("//section[@data-week-number='2']//*[@data-action='click->meal-planner--delivery-dates#fetchDeliveryDates']").should("be.visible").click();
            cy.xpath("(//li[@data-week-number='2' and @class='dropdown-item '])[1]").should("be.visible").click();


        },
        skipWeek: () => {
            return cy.xpath("//section[@data-week-number='2']//*[@value='Skip This Week']")

        },

        unSkipWeek: () => {
            return cy.xpath("//section[@data-week-number='2']//*[@value='Unskip This Week']")

        },
        changeMeals: () => {
            return cy.xpath("//section[@data-week-number='2']//a[contains(text(),'Change Meals')]")

        },
        plan: () => {
            return cy.xpath("(//section[@data-week-number='2']//*[@data-toggle='dropdown'])[2]")

        },
        changePlan: () => {
            cy.xpath("(//section[@data-week-number='2']//*[@data-toggle='dropdown'])[2]").should("be.visible").click();
            //cy.xpath("(//section[@data-week-number='2']//*[@class='dropdown-item ' and @data-action='click->meal-planner--weekly-order-card#onUpdatePlan']/span[1])[1]").should("be.visible").click();
            cy.xpath("(//section[@data-week-number='2']//*[@class='dropdown-item weekly-order__dropdown-link ' and @data-action='click->meal-planner--weekly-order-card#onUpdatePlan']/span[1])[1]").should("be.visible").click();
        },
        firstMealName: () => {
            return cy.xpath("//section[@data-week-number='2']//*[@class='meals']/li[1]/section/h3")

        }


    },
    third_week: {

        deliveryDay: () => {
            return cy.xpath("//*[class='//*[@class='component weekly_order_details']/div/ul/li[3]/p']")

        },
        changeDeliveryDay: () => {
            return cy.xpath("//section[@data-week-number='3']//*[@data-test='change-date']")

        },
        skipWeek: () => {
            return cy.xpath("//section[@data-week-number='3']//*[@value='Skip This Week']")

        },
        plan: () => {
            return cy.xpath("(//*[@class='component weekly_order_details']/div/ul/li[3]/p)[3]")

        },
        changePlan: () => {
            return cy.xpath("//section[@data-week-number='3']//*[@data-test='change-plan']")

        }


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


