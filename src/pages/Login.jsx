import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import "../resources/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("pos-user"));

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const onFinish = (values) => {
        axios
            .post("/api/v1/auth/login", values)
            .then((res) => {
                message.success("User login success");
                localStorage.setItem("pos-user", JSON.stringify(res.data));
                navigate("/home");
            })
            .catch((err) => message.warning(err.response.data.message));
    };



    return (
        <div className="login-background">
            <Card className="card">
                <h1 className="text-center mb-2">POS SOLUTION</h1>
                <hr />
                <h2 className="mb-4">Log in </h2>
                <Form
                    layout="vertical"
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        email: "bablu@gmail.com",
                        password: '12345678'
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email"

                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button px-5 "
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;
