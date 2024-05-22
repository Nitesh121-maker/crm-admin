import React,{useState,useEffect} from 'react'
import '../css/sales-person.css'
import { FaPaperPlane } from 'react-icons/fa'
const Salesperson = ({salespersonClient}) => {
    console.log('salespersonClient',salespersonClient)
    const[clientlist, setClientList] = useState('');
    const[clientchat,setclientchat] = useState('');
    const unique_id = salespersonClient.unique_id;

    useEffect(() => {
        const getClient = async () => {
            if (!unique_id) return;
            try {
                const response = await fetch(`http://192.168.1.3:3003/client-list/${unique_id}`);
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

    const getChat = async(unique_id) =>{

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
    }
    useEffect(() => {
        const intervalId = setInterval(getChat, 1000/2); 
    
        // Clean up function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, []);
    console.log('Client',clientlist);
    console.log('Client Chat',clientchat);
  return (
    <div className="row">
        <div className="d-flex col-md-12">
            <div className="card col-sm-12 col-md-4">
                <div className="card-header text-white ">
                     <div className=" justify-content-center">
                        <h5 className="card-title">Client List</h5>
                     </div>
                </div>
                <div className="list mt-4 ">
                    {
                       Array.isArray(clientlist) && clientlist.length ?(
                           clientlist.map((clientlist) => (
                                <div className="list-group ">
                                    <li className='list-group-item list-bg text-white' onClick={() => getChat(clientlist.unique_id)}>{clientlist.fullname}</li>
                                </div>
                           ))
                       ):(
                        <div className="text-center">No Client</div>
                      )

                    }
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
                    {
                        Array.isArray(clientchat) && clientchat.length ?(
                            clientchat.map((clientchat) => (
                                <div className="card-body text-start col-md-10 sales-chat-bg flex-none" style={{flex:'none !important'}}>
                                    <p>{clientchat.message}</p>
                                    <span className='message-time'>{new Date(clientchat.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            ))
                        ):(
                            <div className="text-center">No Chat</div>
                        )
                    }

                    <div className="card-body text-end col-md-10 ml-auto admin-chat-bg flex-none">
                        <p>End aligned text on viewports sized MD (medium) or wider.</p>
                        <span className='message-time'>11:42</span>
                    </div>

                    <div className="card-body text-end ml-auto admin-chat-bg flex-none">
                        <p>End aligned text on viewports sized MD (medium) or wider. <span>A</span></p>
                        <span className='message-time'>11:43</span>
                    </div>
                </div>
                <div className="card-footer">
                     <form action="" className='d-flex '>
                        <textarea name="" id=""  rows="1" className='form-control'></textarea>
                        <button className="btn btn-primary"><FaPaperPlane/></button>
                     </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Salesperson