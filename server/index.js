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
//    const sqltableCreate = `CREATE TABLE IF NOT EXISTS \`${unique_id}\` (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         unique_id VARCHAR(55),
//         fullname VARCHAR(55),
//         email VARCHAR(100),
//         number VARCHAR(20),
//         company VARCHAR(100),
//         requirements LONGTEXT,
//         reminder DATETIME,
//         invoice_number VARCHAR(20),
//         invoice_date DATE,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );`

   const sqlPost = "INSERT INTO sales_team (unique_id,first_name,last_name,email,password) VALUES (?,?,?,?,?)";
   
   con.query(sqlPost,[unique_id,first_name,last_name,email,password],(err,result)=>{
        if (err) {
            res.status(500).send({message:'Internal server error in '});
        } else {
            // Create Table for Sales person Client
            res.status(200).send({message:'Sales person created successfully'});
            // con.query(sqltableCreate,(err,result)=>{
            //     if (err) {
            //         res.status(500).send({message:'Internal server error in creating table for clients'});
            //     }else{
            //         res.status(200).send({message:'Sales person created successfully'});
            //     }
            // });
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
// Client List
app.get('/client-list/:sales_unique_id',(req,res) =>{
    const{sales_unique_id} =req.params;
    const sqlGetClient = `SELECT * FROM new_lead WHERE sales_person_id = '${sales_unique_id}' `;
    // console.log('Unique_id',unique_id);
    con.query(sqlGetClient,(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal server error"})
        }else{
            res.status(200).send(result);
        }          
    })
});
// Client Chat 
app.get('/client-chat/:unique_id',(req,res)=>{
    const{unique_id}=req.params;
    const sqlGetChat = `SELECT * FROM \`${unique_id}\``;
    con.query(sqlGetChat,(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal server error"})
        }else{
            res.status(200).send(result);
        }
    });
})
app.post('/admin-message/:selectedClientId',(req,res)=>{
    const{selectedClientId} = req.params;
    const{message} = req.body;
    console.log('selectedClientId',selectedClientId);
    console.log('message',message);
    const sqlInsert = `INSERT INTO \`${selectedClientId}\` (adminmessage) VALUES ('${message}')`;
        con.query(sqlInsert,(err,result)=>{
                if (err) {
                    res.status(500).send({message:"Internal server error"})
                    console.log('Internal server error',err)
                }else{
                    res.status(200).send({message:"Message sent successfully"})
                    console.log('Message sent successfully')
                }
        });
})
// Get In progress client list of sales person
app.get('/sales-person-in-progress/:sales_unique_id',(req,res)=>{
    const{sales_unique_id} = req.params;
    const sqlGetInprogress = `SELECT * FROM new_lead WHERE sales_person_id = '${sales_unique_id}' `;
    con.query(sqlGetInprogress,(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal Server Error in API sales-person-in-progress/sales_unique_id"})
        } else {
            res.send(result)
        }
    })
})
// Get Closed Client list of Sales Person
app.get('/sales-person-closed-client/:sales_unique_id',(req,res)=>{
    const{sales_unique_id} = req.params;
    const query = 'SELECT * FROM closed_leads WHERE sales_person_id = ?';
    con.query(query,[sales_unique_id],(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal server error"})
            console.log('Error',err);
        }else{
            res.status(200).send(result);
            // console.log('Result',result);
        }
    })
})

// Get Total Sale
app.get('/total-sale',(req,res)=>{
    const sqlGetTotalSale = `SELECT * FROM successful_lead`;
    con.query(sqlGetTotalSale,(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal Server in total sale api"})
        } else {
            res.send(result)
        }
     })
})
// Get Total Closed lead
app.get('/total-closed-lead',(req,res)=>{
    const sqlGetTotalclosed = `SELECT * FROM closed_leads`;
    con.query(sqlGetTotalclosed,(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal Server in total closed lead api"})
            } else {
                res.send(result)
                }
    })
})
// Get Total In Process 
app.get('/total-in-process',(req,res)=>{
    const sqlGetinprocess = `SELECT * FROM new_lead`;
    console.query(sqlGetinprocess,(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal Server in total in process api"})
            } else {
                res.send(result)
            }
    })
})
// Set 
app.listen(3003,'192.168.1.10',()=>{
    console.log('Server is running on port 3003');
})
