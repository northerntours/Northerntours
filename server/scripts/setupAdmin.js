const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load env from the root server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const setupAdmin = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error('MONGODB_URI not found in environment variables.');
            process.exit(1);
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('Connected successfully.');

        // Delete all existing admins ("null and void")
        console.log('Invalidating old admin accounts...');
        const deleteResult = await User.deleteMany({ role: 'Admin' });
        console.log(`Deleted ${deleteResult.deletedCount} old admin account(s).`);

        // Create new admin
        console.log('Establishing new admin account...');
        const newAdmin = new User({
            name: 'Northern Tours Admin',
            email: 'admin@northerntours.in',
            password: 'rambhujelkpg',
            role: 'Admin'
        });

        await newAdmin.save();
        console.log('New admin account created:');
        console.log('Email: admin@northerntours.in');
        console.log('Status: ACTIVE');

        console.log('\nMigration complete. You can now login with the new credentials.');
        process.exit(0);
    } catch (error) {
        console.error('CRITICAL ERROR during admin setup:', error);
        process.exit(1);
    }
};

setupAdmin();
