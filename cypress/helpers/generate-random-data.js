import cards from "../fixtures/payment-cards"
import faker from "faker"

const {_, moment} = Cypress


export function generateCardExpirationDate() {

    let expirationDate = faker.date.between('2022-01-01', '2030-12-31')
    let expirationMonth = _.padStart(expirationDate.getMonth() + 1, 2, "0")
    let expirationYear = expirationDate.getFullYear().toString().substring(2)

    return expirationMonth + expirationYear

}

export function getRandomPaymentCard() {
    let randomPaymentCard = {..._.sample(cards.paymentCards.basic)}
    randomPaymentCard.expDate = generateCardExpirationDate()
    return randomPaymentCard
}

