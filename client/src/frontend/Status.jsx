import React from 'react'
import { useState } from 'react'
import { FaStepBackward, FaArrowLeft } from 'react-icons/fa'
const Status = ({salespersonClient,clientDetails,handleSalesperson}) => {
    console.log('clientDetails',clientDetails)
    console.log('salespersonClient',salespersonClient)
    const[errormessage,seterrormessage] = useState('');
    const[message,setMessage] = useState('');
    const[amount,setamont]= useState({
        amount:'',
        status:'Success'
    })
    const handlechangeAmount =(e) =>{
        setamont({...amount,[e.target.name]:e.target.value});
    }
    
    const handleSetAmount = async(e) =>{
        e.preventDefault();
        try {
            const responce = await fetch('http://192.168.1.10:3003/successful-lead',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({               
                    sales_person_id: clientDetails.sales_person_id,
                    unique_id:clientDetails.unique_id,
                    fullname:clientDetails.fullname,
                    email:clientDetails.email,
                    phone:clientDetails.number,
                    status:amount.status,
                    invoice_number:clientDetails.invoice_number,
                    invoice_date:clientDetails.invoice_date,
                    amount:amount.amount,
                })              
            })
            const data = await responce.json();
            console.log('data',data)
                if(data.status === 'Success'){
                    setMessage('Amount set successfully')
                }else{
                    seterrormessage('Something went wrong')
                }
        } catch (error) {
            seterrormessage(error)
        }
    }

    const handleButtonClick = () => {
        handleSalesperson(salespersonClient);
    }

  return (
    <div className='row'>
        <div className="col-lg-12 col-md-12">
             <div className="card">
                <div className="card-header">
                     <h4 className="card_title text-white ml-3">Status</h4>
                </div>
                <div className="col-lg-2">
                    <button className='ml-3 btn btn-primary' onClick={handleButtonClick}>
                       <FaArrowLeft/>
                    </button>
                </div>
                <div className="card-body d-flex">
                    <div className="col-lg-6 ">
                           <div className="card">
                                <div className="card-body text-white">
                                    <h4 className='card_title'>User Details:</h4>
                                    {clientDetails ? (
                                        <ul>
                                            <li>Name: {clientDetails.fullname}</li>
                                            <li>Email: {clientDetails.email}</li>
                                            <li>Phone: {clientDetails.number}</li>
                                            <li>Invoice: {clientDetails.invoice_number}</li>
                                            <li>Invoice: {clientDetails.invoice_date}</li>
                                        </ul>
                                    ) : (
                                        <ul>
                                            <li>No Data</li>
                                        </ul>
                                    )}
                                </div>
                           </div>
                    </div>
                    <div className="col-lg-6">
                           <div className="card">
                                <div className="card-body text-white">
                                    <h4 className="card_title text-white">Payment Status</h4>
                                    <button className='btn btn-primary'>Preview Invoice</button>
                                    <form action="" className='form' onSubmit={handleSetAmount}>
                                        <div className="form-group ">
                                            <input type="text" className='form-control' name='amount' value={amount.amount} onChange={handlechangeAmount}/>
                                            <button type="submit" className='btn-rounded btn-fixed-w mb-3 mr-2 btn btn-outline-primary mt-4'>Set Ammount</button>
                                        </div>
                                    </form>
                                </div>
                           </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
  )
}

export default Status