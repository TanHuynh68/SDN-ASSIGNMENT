// db.js
const mongoose = require('mongoose');
const uri = "mongodb+srv://tanhpce171112:tandeptrai@sdn-assignment.by3ui.mongodb.net/?retryWrites=true&w=majority&appName=Sdn-Assignment";
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
