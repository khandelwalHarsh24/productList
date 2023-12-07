const express=require('express');
const connectdb = require('./Db/connectDb');
const app=express();
const port=3000;
const userRoutes=require('./routes/userRoute');
const productRoutes=require('./routes/productRoute')
require('dotenv/config'); 
const cors=require('cors');

app.use(cors());
app.use('*',cors());


app.use(express.json());

app.use('/api/v1',userRoutes);
app.use('/api/v1',productRoutes)

const start=async ()=>{
    try {
        await connectdb(process.env.url);
        app.listen(3000,console.log(`Server Listening To The Port ${3000}`));
    } catch (error) {
        console.log(error);
    }
}

start();