import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
const TotalSale = ({totalsale}) => {
  return (
    <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <div className="card-header">
                        <h4 className="card_title">Total Sale</h4>
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
                                </tr>
                            </thead>
                            <tbody className="text-uppercase">
                                {
                                    Array.isArray(totalsale) && totalsale.length>0 ?(
                                        totalsale.map((totalsale,index)=>(
                                            <tr>
                                                <td>{totalsale.fullname}</td>
                                                <td>{totalsale.email}</td>
                                                <td>{totalsale.phone}</td>
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

export default TotalSale