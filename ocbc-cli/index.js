#! /usr/bin/env node

const { program } = require('commander')
const list = require('./commands/listUser')
const clear = require('./commands/clear')
const listUser = require('./commands/listUser')
const register = require('./commands/register')
const login = require('./commands/login')
const pay = require('./commands/pay')
const topup = require('./commands/topup')

program
    .command('register <user> <amount>')
    .description('Register new user.')
    .action(register)

program
    .command('login <client>')
    .description('Login as `client`. Please creates a new client if not yet exists.')
    .action(login)

program
    .command('pay <payTo> <amount>')
    .description('Pay `amount` from logged-in client to `another_client`, maybe in parts, as soon as possible.')
    .action(pay)

program
    .command('topup <amount>')
    .description('Increase logged-in client balance by `amount`.')
    .action(topup)

program
    .command('clear')
    .description('Clear all user')
    .action(clear)

program
    .command('listUser')
    .description('List all registered users')
    .action(listUser)

program
    .command('list')
    .description('List all registered users')
    .action(list)

program.parse()