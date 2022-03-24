const conf = new (require('conf'))()
const chalk = require('chalk')

function topup(amount) {
    //get current user and user list
    let current = conf.get('current')
    let userList = conf.get('user-list')

    //find user in user list
    if (userList && userList.length > 0) {
        userList.forEach((user) => {
            if (user.username == current.username) {
                //logic on topup for client

                if (user.oweToCheck == false) {
                    user.balance = parseInt(user.balance) + parseInt(amount)
                    current.balance = parseInt(current.balance) + parseInt(amount)

                    conf.set('user-list', userList)
                    conf.set('current', current)
                    console.log(
                        chalk.greenBright(`Client ${current.username} has topup RM` + amount + `. Your balance is RM` + user.balance),
                    )
                } else if (user.oweToCheck == true) {
                    userList.forEach((to) => {
                        if (user.oweTo == to.username) {
                            if (user.oweToAmt >= amount) {
                                transfered = amount

                                user.balance = 0
                                user.oweToAmt = parseInt(user.oweToAmt) - parseInt(transfered)
                                user.oweToCheck = true
                                user.oweTo = to.username

                                to.balance = parseInt(to.balance) + parseInt(transfered)
                                to.oweFromAmt = parseInt(to.oweFromAmt) - parseInt(transfered)
                                to.oweFromCheck = true
                                to.oweFrom = user.username

                                conf.set('user-list', userList)
                                conf.set('current', current)

                                console.log(
                                    chalk.greenBright(`Transfered ${transfered} to ${to.username}`),
                                    chalk.greenBright(`\nYour balance is RM${user.balance}`),
                                    chalk.greenBright(`\nOwing RM${user.oweToAmt} to ${to.username} `),
                                )
                            } else {
                                user.balance = parseInt(amount) - parseInt(to.oweFromAmt)
                                transfered = parseInt(to.oweFromAmt)
                                to.balance = parseInt(to.balance) + transfered

                                user.oweToAmt = 0
                                user.oweTo = ''
                                user.oweToCheck = false

                                to.oweFromCheck = false
                                to.oweFrom = ''
                                to.oweFromAmt = 0


                                conf.set('user-list', userList)
                                conf.set('current', current)

                                console.log(
                                    chalk.greenBright(`Transfered ${transfered} to ${to.username}`),
                                    chalk.greenBright(`\nYour balance is RM${user.balance}`),
                                )

                            }
                        }

                    })
                }

            }
        })
    } else {
        console.log(
            chalk.red.bold('An error has occur. Please try again!')
        )
    }

}

module.exports = topup