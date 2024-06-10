const express = require ('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session')

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'admin-secret',
    resave: false,
    saveUninitialized:true,
}))

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
// Login
app.post('/admin-login', (req, res) => {
    const{email,password} = req.body;
    const sqlFilter = `SELECT * FROM admin WHERE email = ? AND password = ?`;
    
    con.query(sqlFilter, [email,password], (err, result) => {
        if (err) {
            res.status(500).send({message:'Internal error in login query'})
            console.log(err)
        }else if(result.length > 0){
            const user =  result[0];
            req.session.user = user;
            res.status(200).send({message:"Login Successful.",user:user});
            
        }else{
            res.send({message: "Invalid username or password."});
        }
    })
})
// Register
app.post('/admin-signin', (req, res) => {
    const { name, phone, email, password } = req.body;
    const sqlCheck = `SELECT * FROM admin WHERE email = ? AND password = ?`;

    const sqlRegister = `INSERT INTO admin (name, phone, email, password) VALUES (?, ?, ?, ?)`;

    con.query(sqlCheck, [email, password], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Internal Server Error in Sql Check' });
            console.log(err);
        } else if (result.length > 0) {
            res.status(200).send({ message: 'This Admin Already Registered' });
        } else {
            con.query(sqlRegister, [name, phone, email, password], (err, result) => {
                if (err) {
                    res.status(500).send({ message: 'Internal Server error' });
                    console.log(err);
                } else {
                    res.status(200).send({ message: 'Admin Registered Successfully' });
                }
            });
        }
    });
});
// Logout
app.post('/admin-logout',(req,res)=>{
    req.session.destroy((err) => {
    if (err) {
        res.status(500).send({message:'Internal error in logout query'})
        console.log(err)
    }else{
        res.status(200).send({message:'Logout Successful.'})
    }
})
})
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
            res.status(500).send({message:"Internal Server Error in total in process api"})
        } else {
            res.send(result)
        }
    })
})
// Get Total generated Invoice
app.get('/total-generated-invoice',(req,res)=>{
    const sqlGeneratedinvoice = `SELECT * FROM invoice`;
    con.query(sqlGeneratedinvoice,(err,result)=>{
        if(err){
            res.status(500).send({message:'Internal Server Error in total in total generated invoice'})
        }else{
            res.send(result)
        }
    })
})
// Set Successful Table
app.post('/successful-lead',(req,res)=>{
    const{sales_person_id,unique_id,fullname,email,phone,status,invoice_number,invoice_date,amount} = req.body;
    const sqlUpdate = `INSERT INTO successful_lead (sales_person_id,unique_id,fullname,email,phone,status,invoice_number,invoice_date,amount) VALUES(?,?,?,?,?,?,?,?,?) `;
    const sqlSetsale = `INSERT INTO sales (sales_person_id,client_id,amount) VALUES (?,?,?)`;

    con.query(sqlUpdate,[sales_person_id,unique_id,fullname,email,phone,status,invoice_number,invoice_date,amount],(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal Server in successful lead api"})
            console.log(err)
        } else {
            con.query(sqlSetsale,[sales_person_id,unique_id,amount],(err,result)=>{
                if (err) {
                    res.status(500).send({message:"Internal Server in successful lead api sales table data setting"})
                    console.log(err)
                } else {
                    res.send({message:"Successful Lead Added Successfully"})
                }
            })
        }
    })
})
// Get Successful Lead Data
app.get('/successful-lead-data/:sales_unique_id',(req,res)=>{
    const{sales_unique_id} = req.params;
    const sqlGetSuccessfulLeadData = `SELECT * FROM successful_lead WHERE sales_person_id = ?`;
    con.query(sqlGetSuccessfulLeadData,[sales_unique_id],(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal Server in successful lead data api"})
        } else {
            res.send(result)
        }
    });
})
// Get Notification
app.get('/notification', (req, res) => {
    const sqlGetNotification = `SELECT * FROM invoice WHERE seen = 0 ORDER BY id DESC`;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const sqlGetReminders = `SELECT * FROM invoice WHERE seen = 0 AND (reminded IS NULL OR reminded < ?)`;

    con.query(sqlGetNotification, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Internal Server Error in notification API" });
            console.log(err);
        } else {
            con.query(sqlGetReminders, [oneDayAgo], (err, reminderResult) => {
                if (err) {
                    res.status(500).send({ message: 'Internal Server Error in reminder API' });
                    console.log(err);
                } else {
                    // Combine the results or send as needed
                    res.send({ notifications: result, reminders: reminderResult });
                    console.log('Notifications:', result);
                    console.log('Reminders:', reminderResult);
                }
            });
        }
    });
});


// // Renotify 
// app.get('/renotify',(req,res)=>{
//     const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//     const sqlGetReminders = `SELECT * FROM invoice WHERE seen = 0 AND last_reminded 0`;

// })
// Update state of seen
app.post('/update-seen/:unique_id', (req, res) => {
    const { unique_id } = req.params;
    const sqlUpdateSeen = `UPDATE invoice SET seen = 1 , reminded = 1 WHERE unique_id = ?`;
    
    con.query(sqlUpdateSeen, [unique_id], (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error in notification API" });
        console.log(err);
      } else {
        res.send({ message: 'Seen status updated', result });
        console.log(result)
      }
    });
  });
//   Get client data from invoice
app.get('/client-invoice/:unique_id',(req,res)=>{
    const{unique_id} = req.params;
    const sqlInvoicedata = `SELECT * FROM invoice WHERE unique_id = ?`;
    con.query(sqlInvoicedata,[unique_id],(err,result)=>{
        if (err) {
             res.status(500).send({message:'Internal servaer error in client-invoice api'});
        } else {
            res.send(result)
        }   
    })
})
app.listen(3003,'192.168.1.13',()=>{
    console.log('Server is running on port 3003');
})
