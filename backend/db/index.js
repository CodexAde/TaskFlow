import mongoose from 'mongoose'

async function connectDb() {
    const connecting = await mongoose.connect(process.env.MONGODB_URI)
    console.log("db is connected");
}
export default connectDb