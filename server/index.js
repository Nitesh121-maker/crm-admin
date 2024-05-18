const express = require ('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(cors());
app.use(bodyParser.json());

const con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password:'',
        database:'crm',
    }
)


app.listen(3003,'192.168.1.4',()=>{
    console.log('Server is running on port 3003');
})
