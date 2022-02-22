import React, { useEffect, useState } from "react";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };
    auth
      .sendPasswordResetEmail(email, config)
      .then((res) => {
        setLoading(false);
        toast.success("Email was sent to your mailbox");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className="conatiner col-md-6 offset-md-3 p-5">
      {loading ? (
        <h3 className="text-danger">Loading...</h3>
      ) : (
        <h3>Enter email</h3>
      )}
      <form className="col-md" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <button className="btn btn-raised mt-3" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
