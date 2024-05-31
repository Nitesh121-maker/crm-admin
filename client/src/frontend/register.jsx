import React, { useState } from 'react'

const Register = () => {
    const[successMessage,setSuccessMessage] = useState('');
    const[errorMessage,setErrorMessage] = useState('');
    const[registerForm,setRegisterForm] = useState({
        name: '',
        phone:'',
        email:'',
        password:'',
    })

    const handleFormChange = async(e)=>{
         setRegisterForm({...registerForm,[e.target.name]:e.target.value});
    }

    const handleRegister =async(e)=>{
        console.log(registerForm);
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.1.10:3003/admin-signin',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(registerForm)
            })
            const data = await response.json();
            console.log(data);
            if(data.success){
                setSuccessMessage(data.message);
                setErrorMessage('');
            }else{
                setSuccessMessage('');
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }
  return (
    <section class="vh-100" style={{backgroundColor:'#eee'}}>
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card text-black" style={{borderRadius: '25px'}}>
                <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        {
                            errorMessage &&
                            <p class="text-center mb-5 mx-1 mx-md-4 mt-4 text-white">{errorMessage}</p>
                        }
                        {
                            successMessage &&
                            <p class="text-center mb-5 mx-1 mx-md-4 mt-4 text-white">{successMessage}</p>
                        }
                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">ERP Admin Sign up</p>

                        <form class="mx-1 mx-md-4" onSubmit={handleRegister}>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" class="form-control" name='name'
                            value={registerForm.name}
                            onChange={handleFormChange}
                            />
                            <label class="form-label" for="form3Example1c">Your Name</label>
                            </div>
                        </div>
                        
                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                            <input type="phone" id="form3Example2c" class="form-control" name='phone'
                            value={registerForm.phone}
                            onChange={handleFormChange}
                            />
                            <label class="form-label" for="form3Example3c">Your Phone</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" class="form-control" name='email'
                            value={registerForm.email}
                            onChange={handleFormChange}
                            />
                            <label class="form-label" for="form3Example3c">Your Email</label>
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" class="form-control" name='password'
                            value={registerForm.password}
                            onChange={handleFormChange}
                            />
                            <label class="form-label" for="form3Example4c">Password</label>
                            </div>
                        </div>

                        {/* <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4cd" class="form-control" />
                            <label class="form-label" for="form3Example4cd">Repeat your password</label>
                            </div>
                        </div> */}

                        <div class="form-check d-flex justify-content-center mb-5">
                            {/* <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" /> */}
                            <label class="form-check-label" for="form2Example3">
                            Log in <a href="/erp-admin-login">Login</a>
                            </label>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button  type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Register</button>
                        </div>

                        </form>

                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid" alt="Sample image"/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Register