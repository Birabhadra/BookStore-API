const express=require('express');
const dotenv=require('dotenv');
const app=express();
dotenv.config();
const connectdb=require("./database/db");
const PORT=process.env.PORT||3000;
connectdb();
const bookRouter=require('./routes/book-router')
const authRouter=require('./routes/auth-router')
const homeRouter=require('./routes/home-router')
const adminRouter=require('./routes/admin-router');
const uploadRouter=require('./routes/image-router')
app.use(express.json());
app.use('/api/books',bookRouter)

app.use('/api/auth',authRouter);
app.use('/api/home',homeRouter);
app.use('/api/admin',adminRouter);
app.use('/api/image',uploadRouter);


app.listen(PORT,async()=>{
    console.log('server is running on port',PORT);
})
