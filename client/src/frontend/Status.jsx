import React from 'react'

const Status = ({clientDetails}) => {
    console.log('clientDetails',clientDetails)
  return (
    <div className='row'>
        <div className="col-lg-12 col-md-12">
             <div className="card">
                <div className="card-header">
                     <h4 className="card_title text-white ml-3">Status</h4>
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
                                    <form action="" className='form'>
                                        <div className="form-group ">
                                            <input type="text" className='form-control' name='amount'/>
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