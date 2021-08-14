import React, { useEffect, useState } from 'react'

import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import { Button } from 'antd';
import {MailOutlined} from '@ant-design/icons'


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
        if(!email || password.length<6){
            setErrorMessage('Email cant be empty! Password must have 6 characters')
        }
        console.log('pressed');
    
    }

    

  

    return (
        
       
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md '  >
                <img resize='contain' width={'90%'} height={'90%'} src='../log.svg' alt='regImage' />
                </div>
            
                <div className='col-md ' >
                    <h4>Login</h4>
                    <form onSubmit={handleSubmit}>
                <input type='email' className='form-control' value={email} placeholder="Email"  onChange={e=>setEmail(e.target.value)} />
                <input type='password' className='form-control mt-2' value={password} placeholder="Password"  onChange={e=>setPassword(e.target.value)} />
                {errorMessage && <p className='mt-3 form-text text-danger' >{errorMessage}</p>}
                {/* <button type='submit' className='btn btn-primary mt-3'>Confirm</button> */}
                <Button block   shape='round' icon={<MailOutlined/>} onClick={handleSubmit} type='submit' size='large' className=' bg-primary text-white shadow-5 mt-5 mb-3' >Login with Email/Password</Button>
                
            </form>
                    
                   
                </div>
            </div>

           
        </div>
       
        
    )
}

export default Login
