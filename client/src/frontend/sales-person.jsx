import React from 'react'
import '../css/sales-person.css'
import { FaPaperPlane } from 'react-icons/fa'
const Salesperson = () => {
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
                    <div className="list-group ">
                       <li className='list-group-item list-bg text-white'>Nitesh Chauhan</li>
                    </div>
                    <div className="list-group">
                       <li className='list-group-item list-bg text-white'>Shakti Raghav</li>
                    </div>
                    <div className="list-group">
                       <li className='list-group-item list-bg text-white'>Luckey Cipy</li>
                    </div>
                    <div className="list-group ">
                       <li className='list-group-item list-bg text-white'>Kundan Sharma</li>
                    </div>
                </div>
            </div>
            <div className="card text-white col-sm-12 col-md-8">
                <div className="card-header">
                    Chat
                </div>
                <div className="d-flex card text-white chat-bg chat-card ">
                    <div className="card-body text-start col-md-10 sales-chat-bg">
                        <p>Start aligned text on all viewport sizes.</p>
                        <span className='message-time'>11:42</span>
                    </div>
                    <div className="card-body text-end col-md-10 ml-auto admin-chat-bg">
                        <p>End aligned text on viewports sized MD (medium) or wider.</p>
                        <span className='message-time'>11:42</span>
                    </div>
                    <div className="card-body text-start sales-chat-bg">
                        <p>Start aligned text on all viewport sizes.</p>
                        <span className='message-time'>11:43</span>
                    </div>
                    <div className="card-body text-end ml-auto admin-chat-bg">
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