const conf = new (require('conf'))()
const chalk = require('chalk')

function login(login) {
    //get the current user-list
    let userList = conf.get('user-list');
    let exist = true;

    //find user in user list
    if (userList && userList.length > 0) {
        userList.forEach((user) => {
            if (user.username == login) {
                if (user.oweToCheck == false && user.oweFromCheck == false) {
                    console.log(
                        chalk.greenBright(`Hello ${user.username}!`),
                        chalk.greenBright(`\nYour balance is: ${user.balance}. `)
                    )
                } else if (user.oweToCheck == true) {
                    console.log(
                        chalk.greenBright(`Hello ${user.username}!`),
                        chalk.greenBright(`\nOwing RM${user.oweToAmt} to ${user.oweTo} `),
                        chalk.greenBright(`\nYour balance is: ${user.balance}. `)

                    )
                } else if (user.oweFromCheck == true) {
                    console.log(
                        chalk.greenBright(`Hello ${user.username}!`),
                        chalk.greenBright(`\nOwing RM${user.oweFromAmt} from ${user.oweFrom} `),
                        chalk.greenBright(`\nYour balance is: ${user.balance}. `)
                    )
                }

                //set current client
                conf.set('current', user)
            } else {
                // console.log(chalk.redBright(`Client username does not exists! Please try again.`))
            }
        })
    } else {
        console.log(
            chalk.red.bold('You don\'t have any user yet.')
        )
    }
}

module.exports = login