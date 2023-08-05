const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const contacts = require('./db/contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.getAllContacts();
            return console.table(allContacts);
        case "get":
            const oneContact = await contacts.getByIdContact(id);
            return console.log(oneContact);
        case "add":
            const newContact = await contacts.addNewContact({name, email, phone});
            return console.log(newContact);
        case "update":
            const updateContact = await contacts.updateById(id, {name, email, phone});
            return console.log(updateContact);
        case "remove":
            const deleteContact = await contacts.removeContact(id);
            return console.log(deleteContact);
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);