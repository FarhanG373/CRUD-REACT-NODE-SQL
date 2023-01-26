const express = require('express');
const app = express();
const PORT = 4200;
const DB = require('./databaseConfig/config');
const cors = require('cors');
const router = require('./routes/router');
app.use(express.json());
app.use(cors());
app.use('/images', express.static('./images'));
app.use(router);
app.get("/", (req, res) => (
    res.send('Server Start at port - ' + PORT)
))
app.listen(PORT, ()=> {
    console.log('server started on port - ' + PORT);
})