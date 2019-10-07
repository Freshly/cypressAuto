import cards from "../fixtures/payment-cards"
import faker from "faker"
const { _, moment } = Cypress


export function generateCardExpirationDate() {
	//let month = ['01','02','03','04','05','06','07','08','09','10','11','12']
	//let randomMonth = _.sample(month,1)
   // let year = ['21','22','23','24','25','26','27','28','29','30','31','32']
	//let randomYear = _.sample(year,1)
	//return randomMonth + randomYear

	let expirationDate = faker.date.between('2021-01-01', '2029-12-31')
	let expirationMonth = _.padStart(expirationDate.getMonth()+1, 2, "0")
	let expirationYear = expirationDate.getFullYear().toString().substring(2)

	return expirationMonth + expirationYear

}

export function getRandomPaymentCard() {
	let randomPaymentCard = { ..._.sample(cards.paymentCards.basic) }
	randomPaymentCard.expDate = generateCardExpirationDate()
	return randomPaymentCard
}

