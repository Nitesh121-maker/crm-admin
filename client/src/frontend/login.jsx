import React,{useState} from 'react'
import '../css/login.css'
const Login = () => {
    const [login, setLogin] = useState({
        username:'',
        password:'',
    });
    const handleChange  = (e) => {
       setLogin({...login, [e.target.name] : e.target.value});
    }
  return (
    <div className="wraper">
        <div className="container-fluid">
            <div className="row">
                <div className="login-bg">
                     <div className="login-overlay">
                        <div className="login-left">
                            <h4>Tradeimex</h4>
                        </div>
                     </div>
                </div>
                <div className="login-form">
                     <form action="">
                        <div className="login-form-body">
                        <h3>Tradeimex ERP Sales Person Login</h3>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name='username' value={login.username} onChange={handleChange} className="form-control-login  input" id="username" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" value={login.password} onChange={handleChange} className="form-control-login input" id="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className='btn btn-primary btn btn-primary'>Login</button>
                            </div>
                        </div>
                     </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login