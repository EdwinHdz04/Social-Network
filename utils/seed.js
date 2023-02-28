const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { faker } = require('@faker-js/faker');

connection.on('error', (err) => console.log(err));

connection.once('open', async () => {
    console.log('connected to db');
    
    await User.deleteMany({});

    // create empty array for users created with faker
    const users = [];

    for (let i = 0; i < 10; i++) {
        users.push({
            username: faker.internet.userName(),
            email: faker.internet.email(),
        });
    }

    await User.collection.insertMany(users);

});