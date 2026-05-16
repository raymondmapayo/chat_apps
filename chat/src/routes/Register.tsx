import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const RegisterCard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const res = await axios.post("http://localhost:8081/api/auth/register", {
        fullname: values.fullName,
        email: values.email,
        password: values.password,
      });

      console.log("SUCCESS:", res.data);

      // ✅ redirect to login page
      navigate("/");
    } catch (err: any) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F8F5F2] px-6 sm:px-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-[#1F262A]">Create Account</h2>
          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </div>

        {/* FORM */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* NAME */}
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Full name is required" }]}
          >
            <Input
              size="large"
              placeholder="Enter your name"
              prefix={<User size={18} />}
              className="h-12 rounded-xl"
            />
          </Form.Item>

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Create password"
              prefix={<Lock size={18} />}
              className="h-12 rounded-xl"
            />
          </Form.Item>

          {/* CONFIRM PASSWORD */}
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm password"
              prefix={<Lock size={18} />}
              className="h-12 rounded-xl"
            />
          </Form.Item>

          {/* TERMS */}
          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must accept terms")),
              },
            ]}
          >
            <Checkbox>I agree to terms</Checkbox>
          </Form.Item>

          {/* BUTTON */}
          <Button
            htmlType="submit"
            type="primary"
            block
            size="large"
            className="!h-12 !rounded-xl !bg-[#1F262A] hover:!bg-[#2c363b]"
          >
            Register
          </Button>
        </Form>

        {/* FOOTER */}
        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-[#1F262A] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
