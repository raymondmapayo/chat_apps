import React from "react";
import { Form, Input, Button, Checkbox, Upload } from "antd";
import { Mail, Lock, User, UploadIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const RegisterCard = () => {
  const [form] = Form.useForm();
  const profilePic = Form.useWatch("profile_pic", form) || [];
  const file = profilePic?.[0]?.originFileObj;
  const getBase64 = (file: any) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: any) => {
    let src = file.url;

    if (!src && file.originFileObj) {
      src = await getBase64(file.originFileObj);
    }

    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(`<img src="${src}" style="width:100%" />`);
    }
  };
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const file = values.profile_pic?.[0]?.originFileObj;

      const formData = new FormData();

      formData.append("fullname", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);

      if (file) {
        formData.append("profile_pic", file);
      }

      const res = await axios.post(
        "http://localhost:8081/api/auth/register",
        formData,
      );

      console.log("SUCCESS:", res.data);
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
          <h2 className="text-4xl font-bold text-[#1F262A] text-center">
            Create Account
          </h2>
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
              placeholder="John Doe"
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
              placeholder="example@gmail.com"
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
          {/* ✅ PROFILE PICTURE UPLOAD (ADDED HERE) */}
          <Form.Item
            name="profile_pic"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              accept="image/*"
              fileList={profilePic}
              onChange={(info) => {
                form.setFieldValue("profile_pic", info.fileList);
              }}
              onPreview={handlePreview}
              style={{ width: "100%" }}
              className="w-full"
            >
              {/* ONLY SHOW WHEN EMPTY */}
              {profilePic.length < 1 && (
                <div
                  className="w-full h-40 flex items-center justify-center rounded-xl border border-dashed cursor-pointer overflow-hidden"
                  style={{ width: "100%" }}
                >
                  <div className="flex flex-col items-center text-gray-500">
                    <UploadIcon size={18} />
                    <span className="text-xs mt-1">Upload Image</span>
                  </div>
                </div>
              )}
            </Upload>
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
