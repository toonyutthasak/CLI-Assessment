const conf = new (require('conf'))()
const chalk = require('chalk')

function register(user, amount) {
    //get the current user-list
    let users = conf.get('user-list')

    if (!users) {
        //default value for user-list
        users = []
    }

    //push the new task to the user-list
    users.push({
        username: user,
        balance: parseInt(amount),
        done: false,
        oweToCheck: false,
        oweFromCheck: false,
        oweTo: '',
        oweFrom: '',
        oweToAmt: 0,
        oweFromAmt: 0
    })

    //set user-list in conf
    conf.set('user-list', users)

    //display message to user
    console.log(
        chalk.green.bold('New user has been added successfully!')
    )
}

module.exports = register