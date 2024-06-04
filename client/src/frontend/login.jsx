import React,{useState} from 'react'
import '../css/login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    
    const [loginForm, setLoginForm] = useState({
        email:'',
        password:'',
    });
    const[successMessage,setSuccessMessage] = useState('')
    const[errorMessage,setErrorMessage] = useState('')
    const handleChange  = (e) => {
        setLoginForm({...loginForm, [e.target.name] : e.target.value});
    }
    const handleLogin = async(e)=>{
        console.log(loginForm)
        e.preventDefault();
        try {
            const responce = await fetch('http://192.168.1.11:3003/admin-login',{
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(loginForm)
            })
            const data = await responce.json()
           
            console.log('Result:',data);
            const user =  data.user;
            console.log('User:',user);
            sessionStorage.setItem('name',user.name)
            sessionStorage.setItem('email',user.email)
            sessionStorage.setItem('password',user.password)
            if(user.status === 'success'){
                setSuccessMessage(data.message)

                setErrorMessage('')             
            }else{
                setSuccessMessage('')
                setErrorMessage(data.message)
            }
            navigate(`/erp-admin`)
        } catch (error) {
            setErrorMessage(error.message)
        }
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
                     <form action="" onSubmit={handleLogin}>
                        <div className="login-form-body">
                        {
                            errorMessage &&
                            <p class="text-center mb-5 mx-1 mx-md-4 mt-4">{errorMessage}</p>
                        }
                        {
                            successMessage &&
                            <p class="text-center mb-5 mx-1 mx-md-4 mt-4">{successMessage}</p>
                        }
                        <h3>Tradeimex ERP Admin Login</h3>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name='email' value={loginForm.email} onChange={handleChange} className="form-control-login  input" id="username" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" value={loginForm.password} onChange={handleChange} className="form-control-login input" id="password" placeholder="Password" />
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