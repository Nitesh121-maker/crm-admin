import React from 'react'
import '../css/index.css'
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
                    
                 </div>
             </div>
        </div>
    </div>
  )
}

export default index