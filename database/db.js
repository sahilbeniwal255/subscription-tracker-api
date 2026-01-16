import {mongoose} from 'mongoose';

import {DB_URI} from '../config/env.js';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        //executed when connection is successful
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.log(error);
        process.exit(1); //codeof 1 means failure
    }
}

export default connectToDatabase;