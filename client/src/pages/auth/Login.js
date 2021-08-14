import React, { useEffect, useState } from 'react'

import {auth} from '../../firebase';
import {toast} from 'react-toastify';



function Login() {

    const [email, setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState('');

    useEffect(() => {
       toast.success('welcome');
    }, [])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
    
    }

    

    const LoginForm=()=>{
        return(
            <form onSubmit={handleSubmit}>
                <input type='email' className='form-control' value={email} placeholder="Email" autoFocus onChange={e=>setEmail(e.target.value)} />
                <input type='password' className='form-control' value={password} placeholder="Password"  onChange={e=>setPassword(e.target.value)} />

                <button type='submit' className='btn btn-primary mt-3'>Confirm</button>
                
            </form>
        )
    }

    return (
        
       
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md '  >
                <img resize='contain' width={'90%'} height={'90%'} src='../reg.svg' alt='regImage' />
                </div>
            
                <div className='col-md ' >
                    <h4>Login</h4>
                    <LoginForm/>
                    {error && <p className='mt-3 form-text' >{errorMessage}}</p>}
                   
                </div>
            </div>

           
        </div>
       
        
    )
}

export default Login
