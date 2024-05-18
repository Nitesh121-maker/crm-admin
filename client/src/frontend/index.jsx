import React from 'react'
import '../css/index.css'
import { FaHome,FaChevronRight } from 'react-icons/fa';
const index = () => {
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
                 <div className="align-items-center row">
                    <div className="header-nav-left align-items-center D-flex">
                         <div className="nav-btn pull-left">
                            <span></span>
                            <span></span>
                            <span></span>
                         </div>
                         <div className="search-box pull-left">
                            <form action="" method="post">
                                <input type="text" name="search" placeholder="Search..."></input>
                            </form>
                         </div>
                    </div>
                    <div className="header-nav-right">

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
                <div className="mt-4-row">
                    <div className="stretched-card">
                       <div className="card bg-primary">
                            <div className="card-body">
                                <div className="card-content">
                                     <div className="card-content-title">
                                        <p>Total Sale</p>
                                        <h3>200</h3>
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
                                        <p>Total Sale</p>
                                        <h3>200</h3>
                                     </div>
                                </div>
                            </div>
                       </div>
                    </div>
                    <div className="stretched-card">
                       <div className="card bg-dark">
                            <div className="card-body">
                                <div className="card-content">
                                     <div className="card-content-title">
                                        <p>Total Sale</p>
                                        <h3>200</h3>
                                     </div>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
                <div className="row mt-4">
                     <div className="main-function">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card_title">
                                    Create Sales Person
                                </h4>
                                <form action="">
                                    <div className="row form-group">
                                        <label htmlFor="" className='col-sm-12 col-form-label'>Sales Person Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" placeholder='name' className='form-control'/>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label htmlFor="" className='col-sm-12 col-form-label'>Sales Person Email</label>
                                        <div className="col-sm-12">
                                            <input type="email" placeholder='email' className='form-control'/>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label htmlFor="" className='col-sm-12 col-form-label'>Sales Person Password</label>
                                        <div className="col-sm-12">
                                            <input type="password" placeholder='pass' className='form-control'/>
                                        </div>
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

export default index