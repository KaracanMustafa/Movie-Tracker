// A simple script to update a user to be an admin.
// Usage: node scripts/make-admin.js <user_email>

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const email = process.argv[2];

if (!email) {
    console.error('Please provide a user email.');
    process.exit(1);
}

const db = process.env.MONGO_URI;

mongoose.connect(db)
    .then(() => {
        console.log('MongoDB Connected...');
        makeAdmin();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const makeAdmin = async () => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found.');
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();
        console.log(`Successfully made ${user.email} an admin.`);
        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
