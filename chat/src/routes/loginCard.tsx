import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // REPLACE YOUR CURRENT onFinish WITH THIS
  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
      );

      // save JWT token
      localStorage.setItem("token", response.data.token);

      // save user data if needed
      localStorage.setItem("user", JSON.stringify(response.data.user));

      message.success("Login successful");

      // redirect
      navigate("/chat");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F8F5F2] px-6 sm:px-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-[#1F262A]">Sign In</h2>
          <p className="text-gray-500 mt-2">Please login to continue</p>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your email"
              prefix={<Mail size={18} />}
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              prefix={<Lock size={18} />}
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <button
              type="button"
              className="text-sm text-[#1F262A] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            htmlType="submit"
            type="primary"
            block
            size="large"
            className="!h-12 !rounded-xl !bg-[#1F262A]"
          >
            Login
          </Button>
        </Form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
