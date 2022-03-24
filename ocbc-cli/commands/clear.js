const conf = new (require('conf'))()
const chalk = require('chalk')

function clear() {
    const users = conf.get('user-list')

    //default value for user-list
    let user = []

    //set user-list in conf
    conf.set('user-list', user)

    //display message to user
    console.log(
        chalk.green.bold('All users has been clear')
    )
}

module.exports = clear