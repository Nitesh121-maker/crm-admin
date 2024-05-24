import React from 'react'

const Status = () => {
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
                                    <ul>
                                        <li>Name: Nitesh</li>
                                        <li>Email: niteshchauhan8285@gmail.com</li>
                                        <li>Phone:8989898989</li>
                                        <li>Invoice:TI/24-25/234</li>
                                        <li>Date:12-09-24</li>
                                    </ul>
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