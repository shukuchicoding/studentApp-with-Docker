const express = require("express");
require('dotenv').config();
const app = express();
const cors = require('cors');

//middleware
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
    credentials: true  // If you want to allow cookies or authentication headers
}));

const studentRouter = require("./routes/StudentRoutes");
app.use("/", studentRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running`);
});

module.exports = app;

const mongoose = require("mongoose");

const queryString = process.env.MONGODB_URI
//configure mongoose
mongoose.connect( queryString, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'));
mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err.message);
})