const conf = new (require('conf'))()
const chalk = require('chalk')

function list() {
    const userList = conf.get('user-list')
    if (userList && userList.length) {
        console.log(
            chalk.blue.bold('------------------------'),
            chalk.blue.bold('List of registered clients'),
            chalk.blue.bold('------------------------')
        )
        userList.forEach((user, balance) => {
            if (user.done) {
                if (balance !== undefined) {
                    console.log(
                        chalk.greenBright(`Client: ${user.username}. Balances: ${user.balance} `)
                    )
                    // console.log(user)
                }

            } else {
                if (balance !== undefined) {
                    console.log(
                        chalk.yellowBright(`Client: ${user.username}. Balances: ${user.balance} `)
                    )
                    // console.log(user)
                }
            }
        })
    } else {
        console.log(
            chalk.red.bold('You don\'t have any user yet.')
        )
    }
}

module.exports = list