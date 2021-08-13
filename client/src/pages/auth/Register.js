import React, { useEffect, useState } from 'react'

import {auth} from '../../firebase';
import {toast} from 'react-toastify';



function Register() {

    const [email, setEmail] = useState('');

    useEffect(() => {
       toast.success('welcome');
    }, [])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log('ENV',process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config={
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp:true
        }

        await auth.sendSignInLinkToEmail(email,config).then(()=>{
            toast.success(`Email is sent to ${email}. Check your email`);
            window.localStorage.setItem('emailForRegistration',email);
            
        }).catch((error)=>{
            console.log(error);
            toast.error('Something went wrong, try again!');
        });

        setEmail('');
    
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
                <img resize='contain' width={'90%'} height={'90%'} src='../reg.svg' alt='regImage' />
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
