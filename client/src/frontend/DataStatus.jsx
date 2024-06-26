import React,{useState,useEffect} from 'react'
import { FaStepBackward, FaArrowLeft } from 'react-icons/fa'
const DataStatus = ({salespersonClient,handleSalesperson,successfulleaddata}) => {
    const[delivereddata,setdelivereddata]=useState('');
    const[error,SetError] = useState([]);
    const handleButtonClick = () => {
        handleSalesperson(salespersonClient);
    }
    console.log('successfulleaddata',successfulleaddata);
    const unique_id = successfulleaddata.unique_id;
    useEffect(() => {
        const getDelivereddata = async(e) =>{
            try {
                const responce = await fetch(`http://192.168.1.10:3003/delivered-data/${unique_id}`);
                if (!responce.ok) {
                    throw new Error(`HTTP error! Status: ${responce.status} - ${responce.statusText}`);
                  }     
                const data = await responce.json();
                console.log('Data',data);
                setdelivereddata(data);
            } catch (error) {
                SetError(error)
            }
        }
        getDelivereddata();
    }, []);
  return (
   <data className="row">
        <data className="col-lg-12 col-md-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card_title text-white">
                         Data Deleivery Status
                    </h4>
                </div>
                <div className="col-lg-2">
                    <button className='ml-3 btn btn-primary' onClick={handleButtonClick}>
                    <FaArrowLeft/>
                    </button>
                </div>
                <div className="single-table">
                    <div className="table-responsive">
                        <table className="table table-hover text-white progress-table text-center table">
                            <thead className="thead-light text-uppercase">
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Month</th>
                                    <th scope='col'>Message</th>
                                    <th scope='col'>Sent At</th>
                                </tr>
                            </thead>
                            <tbody className="text-uppercase">
                                {
                                    Array.isArray(delivereddata) && delivereddata.length > 0 ?(
                                        delivereddata.map((delivereddata,index)=>(
                                            <tr>
                                                <td>{delivereddata.fullname}</td>
                                                <td>{delivereddata.month}</td>
                                                <td>{delivereddata.message}</td>
                                                <td>{delivereddata.created_at}</td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr>No data</tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </data>
   </data>
  )
}

export default DataStatus