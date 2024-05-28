import React,{useState,useEffect} from 'react'
import '../css/index.css'
import { FaHome,FaChevronRight,FaEdit,FaTrash,FaExternalLinkAlt, FaBell} from 'react-icons/fa';
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
            const response = await fetch('http://192.168.1.10:3003/create-sales-person',{
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
                const response = await fetch('http://192.168.1.10:3003/sales-team');
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
            const response = await fetch('http://192.168.1.10:3003/total-sale');
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
            const responce = await fetch('http://192.168.1.10:3003/total-closed-lead');
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
  return (
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
                 <div className=" D-flex align-items-center row ">
                    <div className="header-nav-left align-items-center D-flex">
                         <div className="nav-btn pull-left">
                            {/* <span></span>
                            <span></span>
                            <span></span> */}
                            <h3>Tradeimex</h3>
                         </div>
                         {/* <div className="search-box pull-left">
                            <form action="" method="post">
                                <input type="text" name="search" placeholder="Search..."></input>
                            </form>
                         </div> */}
                    </div>
                    <div className="header-nav-right">
                         <button><FaBell/></button>
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
                                                                          <td>{teamInfo.unique_id}</td>
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
  )
}

export default Index