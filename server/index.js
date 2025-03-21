const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require("cors");
const { mongoDBConnection } = require('./connection');

const userRouter = require('./routes/user.routes');
const transactionRoute = require("./routes/transaction.routes");
const { checkAuth } = require('./middlewares/checkAuth');

const app = express();
const PORT = 3000;

//DB connection
mongoDBConnection("mongodb://localhost:27017/expense-tracker")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//middleware
app.use(checkAuth("token"));

//routes
app.use("/auth/user", userRouter);
app.use('/api/v1', transactionRoute);

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});