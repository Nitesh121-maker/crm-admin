import React from 'react'
import { useState,useEffect } from 'react'
import { FaStepBackward, FaArrowLeft } from 'react-icons/fa'
const Status = ({salespersonClient,clientDetails,handleSalesperson}) => {
    console.log('clientDetails',clientDetails)
    salespersonClient=clientDetails;
    console.log('salespersonClient',salespersonClient)
    const[invoicedata,setinvoicedata] = useState('');
    const unique_id=clientDetails.unique_id;
    const[errormessage,seterrormessage] = useState('');
    const[message,setMessage] = useState('');
    const[clientinvoicedata,setclientinvoicedata] = useState('');

    const [amountset,setAmountsetting] = useState(false);


    const[amount,setamont]= useState({
        amount:'',
        status:'Success'
    })
    const handlechangeAmount =(e) =>{
        setamont({...amount,[e.target.name]:e.target.value});
    }

    const client_id = clientinvoicedata.unique_id;
    console.log('clientinvoicedata',client_id)
    const handleSetAmount = async(e) =>{
        e.preventDefault();
       
        try {
            const responce = await fetch('http://192.168.1.10:3003/successful-lead',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({               
                    sales_person_id: clientDetails.sales_person_id,
                    unique_id:client_id,
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
                setamont({amount:''})
        } catch (error) {
            seterrormessage(error)
        }
    }
    const handleAmount =(invoice)=>{
        setAmountsetting((prevState) => !prevState);
        setclientinvoicedata(invoice);
    }
    const handleButtonClick = () => {
        handleSalesperson(salespersonClient);
    }
    useEffect(() => {
        const getclientInvoice = async(e) =>{
            try {
                const response = await fetch(`http://192.168.1.10:3003/client-invoice/${unique_id}`);
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setinvoicedata(data);
                console.log('Invoice data',data);
            } catch (error) {
                seterrormessage(error)
            }
        } 
        getclientInvoice();
    }, []);


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
                        <div className={`col-lg-${amountset ? '10' : '12'} col-md-${amountset ? '10' : '12'}`}>
                            <div className="card">
                                    <div className="card-body text-white">
                                        <h4 className='card_title'>User Details:</h4>
                                        {/* <div className="single-table"> */}
                                            <div className="responsive">
                                                <table className="table table-hover text-white progress-table text-center table">
                                                    <thead className="thead-light text-uppercase">
                                                        <tr>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Phone</th>
                                                            <th scope="col">Invoice No.</th>
                                                            <th scope="col">Invoice Date:</th>
                                                            <th scope="col">Invoice Status:</th>
                                                            <th scope='col'>Preview</th>
                                                            <th scope='col'>Set Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-uppercase'>
                                                        {
                                                            invoicedata.length > 0 ? (
                                                                invoicedata.map((invoice, index) => (

                                                                    <tr>
                                                                        <td>{invoice.fullname}</td>
                                                                        <td>{invoice.email}</td>
                                                                        <td>{invoice.number}</td>
                                                                        <td>{invoice.invoice_number}</td>
                                                                        <td>{invoice.invoice_date}</td>
                                                                        {   invoice.status == 'Sent' ?(
                                                                            <td>{invoice.status}</td>
                                                                        ):(
                                                                            <td>Not sent yet</td>
                                                                        )
                                                                        
                                                                        }
                                                                        {
                                                                            invoice.status == 'Sent' ?(
                                                                                <td>
                                                                                    <a href={`http://192.168.1.10:3002/downloads/${invoice.unique_id}.pdf`} 
                                                                                    className='btn-rounded btn-fixed-w mb-3 mr-2 btn btn-outline-primary' 
                                                                                    target="_blank" 
                                                                                    rel="noopener noreferrer">
                                                                                        Preview
                                                                                    </a>
                                                                                </td>
                                                                            
                                                                            ):(
                                                                            <td>Unavailable</td>
                                                                            )
                                                                        }
                                                                        <td><button className='btn-rounded btn-fixed-w mb-3 mr-2 btn btn-outline-primary' onClick={()=>handleAmount(invoice)}>Set Amount</button></td>                                                      
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <ul>
                                                                <li>No Data</li>
                                                                </ul>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        {/* </div> */}
                                    </div>
                            </div>
                        </div>
                        {amountset&&
                            <div className="col-lg-2">
                                <div className="card">
                                    <div className="card-body text-white">
                                        <h4 className="card_title text-white">Payment Status</h4>
                                        {/* <a >
                                            <button className='btn btn-primary'>Preview Invoice</button>
                                        </a> */}

                                        <form action="" className='form' onSubmit={handleSetAmount}>
                                            <div className="form-group ">
                                                <input type="text" className='form-control' name='amount' value={amount.amount} onChange={handlechangeAmount}/>
                                                <button type="submit" className='btn-rounded btn-fixed-w mb-3 mr-2 btn btn-outline-primary mt-4'>Set Ammount</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
             </div>
        </div>
    </div>
  )
}

export default Status