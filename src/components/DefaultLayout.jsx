import React, { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    CopyOutlined,
    UnorderedListOutlined,
    LogoutOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "../resources/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function DefaultLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { cartItem } = useSelector((state) => state.rootReducer);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("cartItem", JSON.stringify(cartItem));
    }, [cartItem]);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={window.location.pathname}
                >
                    <Menu.Item key="/home" icon={<HomeOutlined />}>
                        <Link to="/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
                        <Link to="/cart">Cart</Link>
                    </Menu.Item>
                    <Menu.Item key="/bills" icon={<CopyOutlined />}>
                        <Link to="/bills">Bills</Link>
                    </Menu.Item>
                    <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
                        <Link to="/items">Items</Link>
                    </Menu.Item>
                    <Menu.Item key="/customers" icon={<UserOutlined />}>
                        <Link to="/customers">Customers</Link>
                    </Menu.Item>
                    <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                        <Button
                            onClick={() => {
                                localStorage.removeItem("pos-user");
                                navigate("/");
                            }}
                            className="bg-transparent text-white border-0"
                        >
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                    <div className="logo">
                        <h4>POS SOLUTION</h4>
                    </div>
                    <div className="">
                        <Badge onClick={() => navigate("/cart")} count={cartItem.length}>
                            <Avatar
                                icon={<ShoppingCartOutlined size={"large"} />}
                                shape="square"
                                size="large"
                            />
                        </Badge>
                    </div>
                </Header>
                <Content className="site-layout-background">{children}</Content>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;
