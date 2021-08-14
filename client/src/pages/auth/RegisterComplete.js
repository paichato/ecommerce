import React, { useEffect, useState } from "react";

import { auth } from "../../firebase";
import { toast } from "react-toastify";

function RegisterComplete({ history }, props) {
  // let userEmail= window.localStorage.getItem('emailForRegistration');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTmp, setPasswordTmp] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    toast.success("One more step");
    console.log(props);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === passwordTmp) {
      auth
        .signInWithEmailLink(email, window.location.href)
        .then((res) => {
          console.log(res);
          if(res.user.emailVerified){
              window.localStorage.removeItem('emailForRegistration');
              let user= auth.currentUser;
              user.updatePassword(password).then((res)=>{
                  console.log('updatePass:',res);
                   user.getIdTokenResult().then((res)=>{
                       console.log('token:',res);
                       console.log('user:',user);
                       history.push('/')
                   }).catch((error)=>{
                       console.log(error);
                       toast.error(error);
                   })
              }).catch((error)=>{
                  console.log(error);
                  toast.error(error)
              })
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    } else if(password.length<6) {
      setError(true);
      toast.error('password must be at least 6 characters long')
    }else{
        setError(true);
    }
  };

  // const CompleteRegistrationForm=()=>{
  //     return(

  //     )
  // }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md ">
          <img
            resize="contain"
            width={"90%"}
            height={"90%"}
            src="../reg-complete.svg"
            alt="regImage"
          />
        </div>

        <div className="col-md  ">
          <h4>Complete Registration for {email}</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="create password"
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-2"
              value={passwordTmp}
              placeholder="confirm password"
              onChange={(e) => setPasswordTmp(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mt-3">
              Complete registration
            </button>
          </form>
          {/* {email && <p className='mt-3 form-text' >We will send an email to {email}</p>} */}
          {error && (
            <p className="text-danger form-text">Passwords doesnt match</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
