import React,{useState,useEffect,useCallback} from 'react'
import '../css/sales-person.css'
import { FaPaperPlane } from 'react-icons/fa'
const Salesperson = ({salespersonClient}) => {
    console.log('salespersonClient',salespersonClient)
    const[clientlist, setClientList] = useState('');
    const[clientchat,setclientchat] = useState('');
    const sales_unique_id = salespersonClient.unique_id;
    const [selectedClientId, setSelectedClientId] = useState(null);
    const[inprogress,setInprogress] = useState(true);
    const[successful,setSuccessful] = useState(false);
    const[closed,setClosed] = useState(false);
    const handleinprogress =()=>{
        setInprogress(true);
        setSuccessful(false);
        setClosed(false);
    }
    const handleSuccessful = ()=>{
        setInprogress(false);
        setSuccessful(true);
        setClosed(false);
    }
    const handleClosed = ()=>{
        setInprogress(false);
        setSuccessful(false);
        setClosed(true);
    }
    useEffect(() => {
        const getClient = async () => {
            if (!sales_unique_id) return;
            try {
                const response = await fetch(`http://192.168.1.3:3003/client-list/${sales_unique_id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Data:', data);
                setClientList(data);
            } catch (error) {
                console.log(error);
            }
        };
        getClient();
    }, []);
    
    const getChat = useCallback(async(unique_id) =>{

        try {
            const response = await fetch(`http://192.168.1.3:3003/client-chat/${unique_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const chatData = await response.json();
            setclientchat(chatData);
        } catch (error) {
            console.log(error);
        }
    }, [])
    useEffect(() => {
        if (selectedClientId) {
            const intervalId = setInterval(() => getChat(selectedClientId), 500); // Fetch every 500ms

            // Clean up function to clear the interval when the component unmounts or selectedClientId changes
            return () => clearInterval(intervalId);
        }
    }, [selectedClientId, getChat]);

    const handleClientClick = (unique_id) => {
        setSelectedClientId(unique_id);
        getChat(unique_id);
    };
    // const client_id = selectedClientId.unique_id;
    console.log('client_id',selectedClientId);
    const[adminmessage,setadminmessage] = useState({
        message: '',
    });
    const handleAdminMessagechange =(e)=>{
        setadminmessage({...adminmessage, [e.target.name]: e.target.value});
    }
    const handleSendMessage = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`http://192.168.1.3:3003/admin-message/${selectedClientId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminmessage)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              // Clear the textarea after successful submission
              setadminmessage({ message: '' });
            const data = await response.json();
            console.log('data',data)

        } catch (error) {
            console.log(error);
        }
    }
    console.log('Client',clientlist);
    console.log('Client Chat',clientchat);
  return (
    <><div className="row">
          <div className="d-flex col-md-12">
              <div className="card col-sm-12 col-md-4">
                  <div className="card-header text-white ">
                      <div className=" justify-content-center">
                          <h5 className="card-title">Client List</h5>
                      </div>
                  </div>
                  <div className="list mt-4 ">
                      {Array.isArray(clientlist) && clientlist.length ? (
                          clientlist.map((clientlist) => (
                              <div className="list-group ">
                                  <li className='list-group-item list-bg text-white' onClick={() => handleClientClick(clientlist.unique_id)}>{clientlist.fullname}</li>
                              </div>
                          ))
                      ) : (
                          <div className="text-center">No Client</div>
                      )}
                      {/*

     <div className="list-group">
        <li className='list-group-item list-bg text-white'>Shakti Raghav</li>
     </div>
     <div className="list-group">
        <li className='list-group-item list-bg text-white'>Luckey Cipy</li>
     </div>
     <div className="list-group ">
        <li className='list-group-item list-bg text-white'>Kundan Sharma</li>
     </div> */}
                  </div>
              </div>

              <div className="card text-white col-sm-12 col-md-8">
                  <div className="card-header">
                      Chat
                  </div>
                  <div className="d-flex card text-white chat-bg chat-card chat-style">
                      {Array.isArray(clientchat) && clientchat.length ? (
                          clientchat.map((clientchat) => (
                              <>
                                  {clientchat.message &&
                                      <div className="card-body text-start col-md-10 sales-chat-bg flex-none" style={{ flex: 'none !important' }}>
                                          <p>{clientchat.message}</p>
                                          <span className='message-time'>{new Date(clientchat.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                      </div>}
                                  {clientchat.adminmessage &&
                                      <div className="card-body text-end col-md-10 ml-auto admin-chat-bg flex-none">
                                          <p>{clientchat.adminmessage}</p>
                                          <span className='message-time'>11:42</span>
                                      </div>}
                              </>
                          ))
                      ) : (
                          <div className="text-center">No Chat</div>
                      )}
                  </div>
                  <div className="card-footer">
                      <form action="" className='d-flex' onSubmit={handleSendMessage}>
                          <textarea name="message" value={adminmessage.message} onChange={handleAdminMessagechange} id="" rows="1" className='form-control'></textarea>
                          <button className="btn btn-primary"><FaPaperPlane /></button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      <div className="row mt-4">
            <div className="collg-12 col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title text-white ml-3">Sales</h4>
                    </div>
                    <div className="card-body">
                        <div className="card-header">
                            <ul className='d-flex text-white button-list text-uppercase'>
                                <li className='btn-rounded btn-fixed-w mb-3 mr-3 btn btn-outline-primary' onClick={handleinprogress}>In-Progress</li>
                                <li className='btn-rounded btn-fixed-w mb-3 mr-3 btn btn-outline-success' onClick={handleSuccessful}>Successful</li>
                                <li className='btn-rounded btn-fixed-w mb-3 mr-3 btn btn-outline-danger' onClick={handleClosed}>Closed</li>
                            </ul>
                        </div>
                        {inprogress&&
                            <div className="inprogress single-table">
                                <div className="responsive">
                                    <table className="table table-hover text-white progress-table text-center table">
                                        <thead className="thead-light text-uppercase">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>
                                                <th scope='col'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-uppercase'>
                                            <tr>
                                                <td>Shakti Raghav</td>
                                                <td>info.Shakti@gmail.com</td>
                                                <td>8789779098</td>
                                                <td><button className='btn-rounded btn-fixed-w mb-3 mr-2 btn btn-outline-primary'>status</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                        {successful&&
                            <div className="successful single-table">
                                <div className="responsive">
                                    <table className="table table-hover text-white progress-table text-center table">
                                        <thead className="thead-light text-uppercase">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>
                                                <th scope='col'>Invoice</th>
                                                {/* <th scope='col'>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody className='text-uppercase'>
                                            <tr>
                                                <td>Nitesh Chauhan</td>
                                                <td>info.nitesh@gmail.com</td>
                                                <td>8789779098</td>
                                                <td>TI/24-25/230</td>
                                                {/* <td><button className='btn-rounded btn-fixed-w mb-3 mr-2 btn btn-outline-primary'>status</button></td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                        {closed&&
                            <div className="closed single-table">
                                <div className="responsive">
                                    <table className="table table-hover text-white progress-table text-center table">
                                        <thead className="thead-light text-uppercase">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>
                                                <th scope='col'>Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-uppercase'>
                                            <tr>
                                                <td>Lucky Sippy</td>
                                                <td>info.lucky@gmail.com</td>
                                                <td>8789779098</td>
                                                <td>Not Intrested</td>
                                                {/* <td><button className='btn-rounded btn-fixed-w mb-3 mr-2 btn btn-outline-primary'>status</button></td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
      </div>
    </>
  )
}

export default Salesperson