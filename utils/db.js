import mongoose from 'mongoose';

export default async function db() {
    try {

        if (mongoose.connection.readyState >= 1) {
            console.log("a database connection is already ready")
            return;
        }

        console.log("connecting to mongodb...");
        console.log(process.env.DATABASE);
        await mongoose.connect(process.env.DATABASE);
        console.log('Connected to mongo db!');

        if (process.env.NODE_ENV !== 'production') {
            process.on('SIGINT', async () => {
                console.log('SIGINT received. Closing MongoDB connection...');
                await mongoose.connection.close();
                process.exit(0);
            });
        }

    } catch (error) {
        console.log(error);
    }
}