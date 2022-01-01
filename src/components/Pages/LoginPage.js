import React, { useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import MLogoPic from "../../images/Main_cat.png";
const centereddiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
};
const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error,seterror]=useState(false);

  const onRegister = () => {
    setIsLoginMode((prevState)=>{
      return !prevState;
    });
  };
  const onFinish = async (values) => {
    if (isLoginMode) {
      try {
        axios
          .post("http://localhost:8000/api/users/login", {
            email: values.email,
            password: values.password,
          })
          .then(function (response) {
            console.log(response);
            auth.login(response.data.userId, response.data.token);
          })
          .catch(function (error) {
            seterror(error);
          });
      } catch (err) {}
    } else {
      try {
        console.log(values);
        // const formData = new FormData();
        // formData.append("email", values.email);
        // formData.append("password", values.password);
        axios
          .post("http://localhost:8000/api/users/signup", {
            email: values.email,
            password: values.password,
          })
          .then(function (response) {
            console.log(response);
            auth.login(response.data._id, response.data.token);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (err) {}
    }
  };
  return (
    <div style={centereddiv}>
        
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <img alt="logo" src={MLogoPic} style={{width:"20rem",height:"auto",display:"block"}}/>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        {isLoginMode && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or{" "}
            <Button className="login-form-button" onClick={onRegister}>
              register now!
            </Button>
          </Form.Item>
        )}
        {!isLoginMode && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            Or{" "}
            <Button className="login-form-button" onClick={onRegister}>
              Login
            </Button>
          </Form.Item>
        )}
        {error && <p style={{color:"red"}}>Login failed</p>}
      </Form>
      
    </div>
  );
};
export default LoginPage;
