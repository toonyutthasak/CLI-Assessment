const conf = new (require('conf'))()
const chalk = require('chalk')

function pay(payTo, amount) {
    //get current user and user list
    let current = conf.get('current')
    let userList = conf.get('user-list')

    //find user in user list
    if (userList && userList.length > 0) {
        userList.forEach((user) => {
            if (user.username == current.username) {
                userList.forEach((to) => {
                    if (to.username == payTo) {
                        if (user.balance >= amount) {
                            if (user.oweFromAmt > 0) {
                                user.balance = parseInt(user.balance)
                                user.oweFromAmt = parseInt(user.oweFromAmt) - parseInt(amount)

                                to.oweToAmt = parseInt(to.oweToAmt) - parseInt(amount)

                                conf.set('user-list', userList)
                                conf.set('current', current)
                                console.log(
                                    chalk.greenBright(`\nOwing RM${user.oweFromAmt} from ${user.oweFrom} `),
                                    chalk.greenBright(`\nYour balance is: RM${user.balance}. `)
                                )

                            } else {
                                user.balance = parseInt(user.balance) - parseInt(amount)
                                to.balance = parseInt(to.balance) + parseInt(amount)

                                conf.set('user-list', userList)
                                conf.set('current', current)
                                console.log(
                                    chalk.greenBright(`Transferred RM` + amount + ` to ` + payTo),
                                    chalk.greenBright(`\nYour balance is: RM${user.balance}. `)
                                )
                            }

                        } else if (user.oweToCheck == false) {
                            // transfered = Math.abs(parseInt(user.balance) - parseInt(amount))
                            // owe = transfered - parseInt(amount)

                            owe = Math.abs(parseInt(user.balance) - parseInt(amount))
                            transfered = parseInt(user.balance)

                            user.balance = 0
                            user.oweToCheck = true
                            user.oweTo = payTo
                            user.oweToAmt = owe

                            to.balance = parseInt(to.balance) + transfered
                            to.oweFromCheck = true
                            to.oweFromAmt = owe
                            to.oweFrom = user.username

                            conf.set('user-list', userList)
                            conf.set('current', current)

                            console.log(
                                chalk.greenBright(`Transferred RM` + transfered + ` to ` + payTo),
                                chalk.greenBright(`\nYour balance is: RM${user.balance}. `),
                                chalk.greenBright(`\nOwing RM${owe} to ${payTo} `)
                            )
                        } else if (user.oweToCheck == true) {
                            console.log(
                                chalk.redBright(`You have outstanding owing amount. Please topup first. Thank you`)
                            )
                        }
                    }
                })
            }
        })
    } else {
        console.log(
            chalk.red.bold('An error has occur. Please try again!')
        )
    }
}

module.exports = pay