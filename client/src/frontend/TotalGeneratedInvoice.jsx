import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
const TotalGeneratedInvoice = ({totalinvoice}) => {
  return (
    <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <div className="card-header">
                        <h4 className="card_title">Total Generated Invoice</h4>
                    </div>
                    <div className="col-lg-2">
                        <a href="/erp-admin" className='ml-3 btn btn-primary'>
                         <FaArrowLeft/>
                        </a>
                    </div>
                    <div className="responsive-table">
                         <table className="table table-hover text-white progress-table text-center table">
                            <thead className='thead-light text-uppercase'>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Phone</th>
                                    <th scope='col'>Client Company</th>
                                    <th scope='col'>Invoice Number</th>
                                    <th scope='col'>Invoice Date</th>
                                    <th scope='col'>Preview</th>
                                </tr>
                            </thead>
                            <tbody className="text-uppercase">
                                {
                                    Array.isArray(totalinvoice) && totalinvoice.length>0 ?(
                                        totalinvoice.map((totalinvoice,index)=>(
                                            <tr>
                                                <td>{totalinvoice.fullname}</td>
                                                <td>{totalinvoice.email}</td>
                                                <td>{totalinvoice.number}</td>
                                                <td>{totalinvoice.company}</td>
                                                <td>{totalinvoice.invoice_number}</td>
                                                <td>{totalinvoice.invoice_date}</td>
                                                <td>
                                                    <a href={`http://192.168.1.10:3002/downloads/${totalinvoice.unique_id}.pdf`} 
                                                    className='btn-rounded btn-fixed-w btn btn-outline-primary' 
                                                    target="_blank" 
                                                    rel="noopener noreferrer">
                                                        Preview
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr>No Data</tr>
                                    )
                                }
                            </tbody>
                         </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TotalGeneratedInvoice