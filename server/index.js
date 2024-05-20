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
function twodigitrandom(){
    return Math.floor(10 + Math.random() * 100);
}
// Add new sales person
app.post('/create-sales-person',(req,res)=>{
   const {first_name,last_name,email,password} = req.body;

   if(!first_name||!last_name||!email||!password){
       return res.status(400).send({ message: 'All fields are required' });
   }
   const random = twodigitrandom();
   const twochar = last_name.slice(0,2);
   const unique_id = first_name+random+twochar;

   const sqlPost = "INSERT INTO sales_team (unique_id,first_name,last_name,email,password) VALUES (?,?,?,?,?)";

   con.query(sqlPost,[unique_id,first_name,last_name,email,password],(err,result)=>{
        if (err) {
            res.status(500).send({message:'Internal server error in '});
        } else {
            res.status(200).send({message:'Created new sales person'});
        }
   });
});

// Get Team List
app.get('/sales-team',(req,res)=>{
    const sqlGet = "SELECT * FROM sales_team";
    con.query(sqlGet,(err,result)=>{
        if (err) {
            res.status(500).send({message:'Internal server error in Getting result from sales_team'});
        }else{
            res.status(200).send(result);
        }
    })
});

app.listen(3003,'192.168.1.11',()=>{
    console.log('Server is running on port 3003');
})
