const express = require('express');
const bodyParser = require('body-parser');
const PORT = 2000;
const app = express();
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/users');

app.listen(PORT, (req, res)=>{console.log(`Server listening on PORT: ${PORT}`)});

app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/users', userRouter);