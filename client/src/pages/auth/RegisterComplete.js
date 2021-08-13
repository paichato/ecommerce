import React, { useEffect, useState } from 'react'

import {auth} from '../../firebase';
import {toast} from 'react-toastify';



function RegisterComplete({history}, props) {
    // let userEmail= window.localStorage.getItem('emailForRegistration');

    const [email, setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [passwordTmp,setPasswordTmp]=useState('');


    useEffect(() => {

        setEmail(window.localStorage.getItem('emailForRegistration'));
       toast.success('One more step');
       console.log(props);
    }, [])

    const handleSubmit=async(e)=>{
        e.preventDefault();
       
    
    }

    

    const CompleteRegistrationForm=()=>{
        return(
            <form onSubmit={handleSubmit}>
                <input type='password' className='form-control' value={password} placeholder="create password" autoFocus onChange={e=>setPassword(e.target.value)} />
                <input type='password' className='form-control mt-2' value={passwordTmp} placeholder="confirm password" onChange={e=>setPasswordTmp(e.target.value)} />
                <button type='submit' className='btn btn-primary mt-3'>Complete registration</button>
                
            </form>
        )
    }

    return (
        
       
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md '  >
                <img resize='contain' width={'90%'} height={'90%'} src='../reg-complete.svg' alt='regImage' />
                </div>
            
                <div className='col-md  ' >
                    <h4>Complete Registration for {email}</h4>
                    <CompleteRegistrationForm/>
                    {/* {email && <p className='mt-3 form-text' >We will send an email to {email}</p>} */}
                   
                </div>
            </div>

           
        </div>
       
        
    )
}

export default RegisterComplete
