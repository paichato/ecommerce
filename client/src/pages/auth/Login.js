import React, { useEffect, useState } from "react";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

function Login({history}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetch, setFetch] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    toast.success("welcome");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetch(true);
    setErrorMessage("");
    if (!email || password.length < 6) {
      setErrorMessage("Email cant be empty! Password must have 6 characters");
      console.log("error");
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          const {user}=res;
          const idTokenResult=user.getIdTokenResult().then(()=>{
            dispatch({
                type:'LOGGED_IN_USER',
                payload:{
                    email:user.email,
                    token:idTokenResult.token,
                }
            });
            history.push('/');
            setFetch(false);
          }).catch((err)=>{
              console.log(err);
              toast.error(err.message);
              setFetch(false);
          })

        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          setErrorMessage(err.message);
          setFetch(false);
        });
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md ">
          <img
            resize="contain"
            width={"90%"}
            height={"90%"}
            src="../log.svg"
            alt="regImage"
          />
        </div>

        <div className="col-md ">
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-2"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage ? (
              <p className="mt-3 form-text text-danger">{errorMessage}</p>
            ) : (
              <div className="mt-3"></div>
            )}
            {/* <button type='submit' className='btn btn-primary mt-3'>Confirm</button> */}
            <Button
              block
              shape="round"
              icon={<MailOutlined />}
              onClick={handleSubmit}
              type="submit"
              size="large"
              className=" bg-primary text-white shadow-5 mt-5 mb-3"
              loading={fetch}
            >
              Login with Email/Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
