import React, { useState } from 'react'

function Register() {

    const [email, setEmail] = useState('');

    const handleSubmit=()=>{

    }

    

    const RegisterForm=()=>{
        return(
            <form onSubmit={handleSubmit}>
                <input type='email' className='form-control' value={email} placeholder="Email" autoFocus onChange={e=>setEmail(e.target.value)} />
                <button type='submit' className='btn btn-primary mt-3'>Confirm</button>
                
            </form>
        )
    }

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md '  >
                <img resize='contain' width={'90%'} height={'90%'} src='reg.svg' alt='regImage' />
                </div>
            
                <div className='col-md ' >
                    <h4>Register</h4>
                    <RegisterForm/>
                    {email && <p className='mt-3 form-text' >We will send an email to {email}</p>}
                </div>
            </div>

           
        </div>
    )
}

export default Register
