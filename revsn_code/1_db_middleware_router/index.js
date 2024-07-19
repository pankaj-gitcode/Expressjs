const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const PORT = 3000;
const app = express();
// const admin = route

app.use(bodyParser.json());
app.use('/admin', adminRouter);

app.listen(PORT, (req,res)=>console.log(`Server is listening on PORT: ${PORT}`));