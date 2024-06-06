import React,{useState,useEffect} from 'react'
import '../css/index.css'
import { FaHome,FaChevronRight,FaEdit,FaTrash,FaExternalLinkAlt, FaBell,FaSignOutAlt} from 'react-icons/fa';
import Salesperson from './sales-person';
import Status from './Status';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from './footer';
// import "bootstrap/dist/js/bootstrap.bundle.min";


const Index = () => {

    const[team, setTeam] = useState(['']);
    const[message, setMessage] = useState("");
    const[index,setIndex] = useState(true);
    const[salesperson,setSalesperson] = useState(false);
    const[salespersonClient,setsalespersonClient] = useState([""]);
    const[status,setStatus] = useState(false);
    const[total,setTotal] = useState('');
    const[clientDetails, setclientdetails] = useState('');
    const[totalclosed, setTotalclosed] = useState('');
    const[showNotification,setshowNotification] = useState(false);
    const[notification,setnotification] = useState('')
    // const sales_person_id = team.unique_id;
    // console.log('Team',team)
    const handleshowNotification = () =>{
        setshowNotification(prevState => !prevState);
    }
    const handleSalesperson =(clients)=>{
        setSalesperson(true);
        setIndex(false)
        setsalespersonClient(clients)
        setStatus(false);
    }
    const handleStatus = (inprogresslist,salespersonClient) =>{
        setStatus(true);
        setSalesperson(false);
        setIndex(false);
        setclientdetails(inprogresslist);
        setsalespersonClient(salespersonClient)
    }

    const[formData,setformData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',       
    });
    const handleChange = async(e) =>{
        setformData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log('Form Data',formData);
        try {
            const response = await fetch('http://192.168.1.11:3003/create-sales-person',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(formData)
            })
            const data = await response.json();
            setMessage(data);
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.log('Error in connection',error);
        }
    }
    useEffect(() => {
        const getTeam = async() =>{
            try {
                const response = await fetch('http://192.168.1.11:3003/sales-team');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const data =await response.json();
                setTeam(data);
            } catch (error) {
                console.log('Error',error);
            }
        }
        getTeam();
    }, []);
    // Total Sale
   useEffect(() => {
      const getTotal = async(e) =>{
        try {
            const response = await fetch('http://192.168.1.11:3003/total-sale');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data =await response.json();
            console.log('Total Sale',data)
            setTotal(data);
        } catch (error) {
            console.log('error')
        }
      }
      getTotal();
   }, []);
   // Total Closed Leads
   useEffect(() => {
      const getTotalclosed = async()=>{
        try {
            const responce = await fetch('http://192.168.1.11:3003/total-closed-lead');
            if (!responce.ok) {
                throw new Error(`HTTP error! Status: ${responce.status}`)
                }
                const data =await responce.json();
                console.log('Total Closed Leads',data)
                setTotalclosed(data);
        } catch (error) {
             console.log('error')
        }
      }
      getTotalclosed();
   }, []);  
   const Total = total.length||0;
   const Closedlead = totalclosed.length||0;

   //    Get Notification
   useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await fetch('http://192.168.1.11:3003/notification');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Notification data', data);
        const notifications = data.notifications;
        console.log('Notifications',notifications);
        const reminders = data.reminders;
        const notification = [...notifications,...reminders];
        setnotification(notification);
      } catch (error) {
        console.error('Error fetching notifications:', error.message);
      }
    };

    getNotification();
  }, []);

  //Update seen
  const handleUpdateSeen = async (notification) => {
    // e.preventDefault();
    if (!notification) {
      console.error('Notification is undefined');
      return;
    }

    const unique_id = notification.unique_id;
    console.log('Unique Id', unique_id);
    try {
      const response = await fetch(`http://192.168.1.11:3003/update-seen/${unique_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('Update seen', data);

    } catch (error) {
      console.log(error);
    }
  };
  
  const[isadminlogedin,setAdminlogedin] = useState(false)
 //Login
   const email = sessionStorage.getItem('email');
   const password = sessionStorage.getItem('password');
   console.log('email',email);
   console.log('password',password);
   useEffect(() => {
    if (email && password) {
        setAdminlogedin(true)
    }else{
        setAdminlogedin(false)
    }
   }, []);
   const handlenotificationView = (notification) =>{
    handleUpdateSeen(notification);
    handleStatus(notification)
   }
  return (
    <>
       {
        isadminlogedin &&
         <div className="page-container-darker">
            <div className="left-side-menu">
                <div className="sidebar-menu">
                    <div className="sidebar-header">
                        <div className="logo">
                            <h3>Tradeimex</h3>
                        </div>
                    </div>
                    <div className="main-menu">
                        <div className="menu-inner">
                            <nav className="mm">
                                <ul>
                                    <li><a href="/erp-admin">Dashboard</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className='header-area'>
                    <div className="align-items-center row">
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="d-flex align-items-center nav-btn me-auto">
                                <h3>Tradeimex</h3>
                            </div>
                            {/* Uncomment and use if needed */}
                            {/* 
                            <div className="search-box ms-3">
                                <form action="" method="post">
                                    <input type="text" name="search" placeholder="Search..." className="form-control" />
                                </form>
                            </div> 
                            */}
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <ul className='notification-area d-flex justify-content-end list-unstyled mb-0 mr-12'>
                            
                                <li className='dropdown show me-auto-custom'>
                                    
                                    <span><FaBell onClick={handleshowNotification}/>
                                    {notification.length > 0 && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '-13px',
                                            right: '-15px',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '14px',
                                            cursor:'pointer',
                                        }}
                                        >
                                        {notification.length}
                                        </span>
                                    )}
                                    </span>
                                    {
                                        showNotification&&

                                        <div 
                                            tabIndex="-1" 
                                            role="menu" 
                                            aria-hidden="false" 
                                            className="dropdown-menu bell-notify-box notify-box dropdown-menu show notification-card" 
                                            style={{ backgroundColor: '#181831', color: '#ffffff', borderRadius: '0.5rem' }}
                                        >
                                            <span className="notify-title d-block mb-2" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                            You have {notification.length} new notifications 
                                        </span>
                                        <div className='notification-card-content-tab'>
                                            {
                                                Array.isArray(notification) && notification.length>0 ?(
                                                notification.map((notification,index)=>(                                             
                                                        <div  className="notify-content p-2 mb-2" style={{ backgroundColor: '#282a36', borderRadius: '0.25rem',cursor:'pointer' }}>
                                                            <p>Invoice generated for {notification.company}</p>
                                                            <button type="button" className='btn btn-primary' onClick={()=>handlenotificationView(notification)}>View</button>
                                                        </div>
                                                ))
                                                ):(
                                                    <div className="notify-content p-2 mb-2" style={{ backgroundColor: '#282a36', borderRadius: '0.25rem' }}>
                                                        No Notification
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    }
                                </li>
                                <li className='user-dropdown me-auto-custom'>
                                    <FaSignOutAlt/>
                                </li>
                            </ul>
                            {/* <button className="btn btn-link"><FaBell /></button> */}
                        </div>
                    </div>
                </div>
                <div className="main-content-inner">
                    <div className="sub-header">
                        <div className="sub-header-main">
                            <h3 className='sub-header-main-title'>Hello Admin</h3>
                            <div className="sub-header-main-breadcrumb">
                                <a href="" className="breadcrumb-home">
                                <FaHome/>
                                </a>
                                <span className='breadcrumb-seperator'>
                                    <FaChevronRight/>
                                </span>
                                <a href="" className='breadcrumb-link'>Home</a>
                                <span className='breadcrumb-seperator'>
                                    <FaChevronRight/>
                                </span>
                                <a href="" className='breadcrumb-link'>Main Dashboard</a>
                            </div>
                        </div>
                    </div>
                    {index &&
                    <><div className="mt-4-row">
                            <div className="stretched-card">
                                <div className="card bg-primary">
                                    <div className="card-body">
                                        <div className="card-content">
                                            <div className="card-content-title">
                                                <p>Total Sale</p>
                                                <h3>{Total}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="stretched-card">
                                <div className="card bg-success">
                                    <div className="card-body">
                                        <div className="card-content">
                                            <div className="card-content-title">
                                                <p>Total Closed Leads</p>
                                                <h3>{Closedlead}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="stretched-card">
                                <div className="bg-dark card ">
                                    <div className="card-body">
                                        <div className="card-content">
                                            <div className="card-content-title">
                                                <p>Total Generated Invoice</p>
                                                <h3>200</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><div className="row mt-4">
                                <div className="main-function">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card_title">
                                                Create Sales Person
                                            </h4>
                                            {message &&
                                                <p className='alert alert-success'>{message.message}</p>}

                                            <form action="" method='POST' onSubmit={handleSubmit}>
                                                <div className="row form-group">
                                                    <label htmlFor="" className='col-sm-12 col-form-label'>Sales Person First Name</label>
                                                    <div className="col-sm-12">
                                                        <input type="text" placeholder='First name' name='first_name' value={formData.first_name} onChange={handleChange} className='form-control custom-placeholder' />
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <label htmlFor="" className='col-sm-12 col-form-label'>Sales Person Last Name</label>
                                                    <div className="col-sm-12">
                                                        <input type="text" placeholder='Last name' name='last_name' value={formData.last_name} onChange={handleChange} className='form-control custom-placeholder' />
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <label htmlFor="" className='col-sm-12 col-form-label'>Sales Person Email</label>
                                                    <div className="col-sm-12">
                                                        <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleChange} className='form-control custom-placeholder' />
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <label htmlFor="" className='col-sm-12 col-form-label'>Sales Person Password</label>
                                                    <div className="col-sm-12">
                                                        <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} className='form-control custom-placeholder' />
                                                    </div>
                                                </div>
                                                <button type="submit" className='btn-submit'>Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div><div className="row ">
                                <div className="col-lg-12 mt-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card_title">Sales person list</h4>
                                            <div className="single-table">
                                                <div className="table-responsive">
                                                    <table className="table table-hover progress-table text-center table">
                                                        <thead className="text-uppercase">
                                                            <tr>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Email</th>
                                                                <th scope='col'>UID</th>
                                                                <th scope='col'>Leads</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className='text-uppercase'>

                                                            {Array.isArray(team) && team.length > 0 ? (
                                                                team.map((teamInfo, index) => (
                                                                    <>
                                                                        <tr>
                                                                            <td>{teamInfo.first_name}  {teamInfo.last_name}</td>
                                                                            <td>{teamInfo.email}</td>
                                                                            <td>{teamInfo.sales_person_id}</td>
                                                                            <td><button className="btn btn-info" onClick={()=>handleSalesperson(teamInfo)}><FaExternalLinkAlt /></button></td>
                                                                            <td>
                                                                                <ul className='d-flex justify-content-center'>
                                                                                    <li className='mr-3'>
                                                                                        <button className='btn btn-primary'><FaEdit /></button>
                                                                                    </li>
                                                                                    <li className='mr-3'>
                                                                                        <button className='btn btn-danger'><FaTrash /></button>
                                                                                    </li>
                                                                                </ul>
                                                                            </td>
                                                                        </tr></>
                                                                ))
                                                            ) : (
                                                                <tr>No Team data found </tr>
                                                            )}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></>
                    }
                    {salesperson&&
                    <div className="mt-4">
                        <Salesperson salespersonClient={salespersonClient} handleStatus={handleStatus}/>
                    </div>
                    }
                    {status&&
                    <div className="mt-4">
                        <Status clientDetails={clientDetails} salespersonClient={salespersonClient} handleSalesperson={handleSalesperson}/>
                    </div>
                    }
                    
                </div>
                <div className="row footer-custom">
                    <Footer/>
                </div>
            </div>
        </div>
       }
    </>

    

  )
}

export default Index