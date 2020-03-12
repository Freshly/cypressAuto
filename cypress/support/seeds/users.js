import faker from "faker"

//import addresses from "../../data/valid-addresses"


class User {

    constructor({email, password, firstName, lastName, phoneNumber} = {}) {
        this.email = email || faker.name.firstName().toLowerCase() + faker.name.lastName().toLowerCase() + faker.random.number({
            min: 10000,
            max: 999999
        }) + "@" + faker.internet.domainName()
        this.password = password || faker.internet.password()
        this.firstName = firstName || faker.name.firstName()
        this.lastName = lastName || faker.name.lastName()
        var phoneNumberPure = faker.phone.phoneNumberFormat()
        this.phoneNumber = phoneNumber || phoneNumberPure.split('1').join('2')

    }

}



module.exports = {User}
