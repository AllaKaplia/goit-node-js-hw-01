const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const getAllContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getByIdContact = async (id) => {
    const contacts = await getAllContacts();
    const result = contacts.findIndex(contact => contact.id === id);
    return result || null;
};

const addNewContact = async (data) => {
    const contacts = await getAllContacts();

    const newContact = {
        id: nanoid(),
        ...data,
    }

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
};

const updateById = async (id, data) => {
    const contacts = await getAllContacts();

    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1){
        return null;
    }

    contacts[index] = {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[index];
};

const removeContact = async (id) => {
    const contacts = await getAllContacts();

    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1){
        return null;
    }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return result;
};

module.exports = {
    getAllContacts,
    getByIdContact,
    addNewContact,
    updateById,
    removeContact,
}