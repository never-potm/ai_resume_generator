import mongoose from 'mongoose';

export default async function db() {
    try {
        console.log("connecting to mongodb...");
        console.log(process.env.DATABASE);
        await mongoose.connect(process.env.DATABASE);
        console.log('Connected to mongo db!');
    } catch (error) {
        console.log(error);
    }
}