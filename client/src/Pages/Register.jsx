import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import '../index.css';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register ", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Login Page");
        navigate("/")      
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something weng wrong");
    }
    console.log("recieved values of form", values);
  }

  return (
    <div className = 'authentication'>
      <div className="authentication-form card p-3">
        <h1 className="card-title">Register</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
          label="Name"
          name="name"
          rules={[{requied: true, message:'Please input your passowd'}]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Passwords" type="password" />
          </Form.Item>

          <Button className="primary button my-2" htmlType="submit">
              Register
          </Button>

          <Link to="/" className="anchor">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  )
};

export default Register;
