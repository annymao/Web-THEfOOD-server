const yargs = require('yargs');
const accModel = require('./accModel.jsx');




const argv = yargs
    .help().alias('help', 'h')
    .usage('Usage: $0 <command> [options]')
    .command('create', 'Create a new account', {
        account: {
          describe: 'User Account',
          demand: true,
          alias:'a'
        },
        password: {
            describe: 'Password',
            demand: true,
            alias: 'p'
        },
        role: {
            describe: 'Role',
            demand: true,
            alias: 'r'
        }
    })
    .command('get', 'get all accounts', {
      account: {
        describe: 'User Account',
        demand: false,
        alias:'a'
      },
    })
    .demandCommand()
    .argv;

var command = argv._[0];

console.log(`Processing command "${command}"`);

switch (command) {
    case 'create':
        accModel.setAccount(argv.account, argv.password,argv.role).then(acc => {
            console.log('Created:');
            console.log(JSON.stringify(acc, null, 4));
        }).catch(err => console.log(err));
        break;
    case 'get':
        accModel.getAccount(argv.account).then(acc => {
            console.log(`Listing ${acc.length} acc(s):`);
            console.log(JSON.stringify(acc, null, 4));
        }).catch(err => console.log(err));

        break;
    default:
        console.log('Command not recognized. See usage via --help');
}
