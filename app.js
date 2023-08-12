const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require("./confiq/MONGO");
const userRoutes = require('./Routes/userRoute');
const blogRoutes = require('./Routes/blogRoutes');
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog',blogRoutes);

app.get('/', (req, res) => {
    res.status(200).send({
        message: "RUNNING SUCCESSFULLY"
    })
})
connectDB();
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || "Development";
app.listen(PORT, () => {
    console.log(`Server Running on ${DEV_MODE} mode on ${PORT}`);
})
