const express = require("express");
const postRouter = require('./routes//postRoutes');
const userRouter = require("./routes/userRoutes");



const dotenv = require('dotenv');
dotenv.config();
const {dbConnect} = require('./config/dbConnect');
dbConnect();
const app = express();

//middlewares
app.use(express.json());
//routes

//---Posts
app.use('/api/posts/',postRouter);
 app.use("/api/users/", userRouter);

//listen server
const PORT = process.env.PORT||3000;
app.listen(PORT,console.log(`server is running on ${PORT}`))
