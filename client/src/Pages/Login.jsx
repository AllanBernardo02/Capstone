import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice"


const Login = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    usertype: "",
    email: "",
    password: "",
  });

  const values = {
    usertype: form.usertype,
    email: form.email,
    password: form.password,
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    try {
      dispatch(showLoading());
      e.preventDefault();
      const response = await axios.post("api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message) 
        toast("Redirecting to Homepage Page");
        localStorage.setItem("token", response.data.data);
        navigate("/homepage")
        } 
        else {
            toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading())
        toast.error("Something went wrong");
      }
    
      console.log("Received values of form", values);
  };

    const handleChange = (e) => {
      setForm({...form, [e.target?.id]: e.target?.value });
    };
    console.log("data", form);
  

  return (
    <React.Fragment>
       <div className="authentication">
        <div className="authentication-form card p-3">
          <h1 className="card-title">Login</h1>
          <form onSubmit={(e) => submit(e)}>
            <Form.Item label="Email" name="email">
              <input
                id="email"
                placeholder="Email"
                values={form.email}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input
                id="password"
                placeholder="Password"
                values={form.password}
                onChange={handleChange}
              />
            </Form.Item>
            
            <button className="primary-button my-2">Login</button>
            <Link to="/register" className="anchor">
              CLICK HERE TO REGISTER
            </Link>
          </form>
        </div>
       </div>
    </React.Fragment>
  )
}

export default Login;
