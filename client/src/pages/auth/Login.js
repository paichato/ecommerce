import React, { useEffect, useState } from "react";

import { auth, googleAuthProvier } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetch, setFetch] = useState(false);
  let dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

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
          const { user } = res;
          const idTokenResult = user
            .getIdTokenResult()
            .then((tkn) => {
              createOrUpdateUser(tkn.token)
                .then((res) => {
                  console.log("Create or Update", res.data);
                  dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                      name: res.data.name,
                      email: res.data.email,
                      token: idTokenResult.token,
                      role: res.data.role,
                      _id: res.data._id,
                    },
                  });
                })
                .catch((error) => {
                  console.log(error);
                });

              history.push("/");
              setFetch(false);
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.message);
              setFetch(false);
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          setErrorMessage(err.message);
          setFetch(false);
        });
    }
  };

  const googleSubmit = async () => {
    auth
      .signInWithPopup(googleAuthProvier)
      .then((res) => {
        const { user } = res;
        const idTokenResult = user
          .getIdTokenResult()
          .then((tkn) => {
            createOrUpdateUser(tkn.token)
              .then((res) => {
                console.log("Create or Update", res.data);
                dispatch({
                  type: "LOGGED_IN_USER",
                  payload: {
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                  },
                });
              })
              .catch((error) => {
                console.log(error);
              });
            history.push("/");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
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
          {fetch ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4>}
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
              className=" bg-primary text-white shadow-5 mt-5 mb-3 p-2 "
              loading={fetch}
            >
              Login with Email/Password
            </Button>
          </form>
          <Button
            block
            icon={<GoogleOutlined />}
            onClick={googleSubmit}
            type="danger"
            size="large"
            shape="round"
            className=" shadow-5 mt-5 mb-3"
            loading={fetch}
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="  mt-5  text-danger">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
