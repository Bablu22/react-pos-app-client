import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import {
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import axios from "axios";

function CartPage() {
    const { cartItem } = useSelector((state) => state.rootReducer);
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let temp = 0;
        cartItem.forEach((item) => {
            temp = temp + item.price * item.quantity;
        });
        setSubTotal(temp);
    }, [cartItem]);

    const incQuantity = (record) => {
        dispatch({
            type: "updateCart",
            payload: { ...record, quantity: record.quantity + 1 },
        });
    };
    const decQuantity = (record) => {
        if (record.quantity !== 1) {
            dispatch({
                type: "updateCart",
                payload: { ...record, quantity: record.quantity + -1 },
            });
        }
    };
    const deletefromCart = (record) => {
        dispatch({
            type: "deletefromCart",
            payload: record,
        });
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image, record) => (
                <img src={image} alt="product" height="60" width="60" />
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (id, record) => (
                <div className="d-flex align-items-center">
                    <PlusCircleOutlined onClick={() => incQuantity(record)} />
                    <b className="text-center ms-2">{record.quantity}</b>
                    <MinusCircleOutlined onClick={() => decQuantity(record)} />
                </div>
            ),
        },
        {
            title: "Action",
            dataIndex: "_id",
            key: "_id",
            render: (id, record) => (
                <DeleteOutlined color="red" onClick={() => deletefromCart(record)} />
            ),
        },
    ];

    const tax = Number(subTotal * 0.1);
    const total = Number(subTotal + tax);

    const onFinish = (value) => {
        const data = {
            ...value,
            subTotal,
            tax,
            total,
            user: JSON.parse(localStorage.getItem("pos-user")).user._id,
            cartItem,
        };
        setLoading(true);
        axios
            .post("https://pos-app-server.onrender.com/api/v1/bill", data)
            .then((res) => {
                setLoading(false);
                message.success("Bill charged success");
                setOpen(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <DefaultLayout>

            <Table
                pagination={false}
                dataSource={cartItem}
                columns={columns}
                bordered
                rowKey={(record) => record._id}
            />
            <div className="mt-5 d-flex justify-content-end">
                <div>
                    <h3>
                        Sub Total:{" "}
                        <CurrencyFormat
                            displayType="text"
                            value={subTotal}
                            thousandSeparator={true}
                            prefix={"$"}
                        />
                    </h3>
                    <Button
                        onClick={() => setOpen(true)}
                        type="primary"
                        style={{
                            width: "100%",
                            backgroundColor: "teal",
                        }}
                    >
                        Charge Bill
                    </Button>
                </div>
            </div>

            <Modal
                title="Charge Bill"
                onCancel={() => setOpen(false)}
                footer={false}
                open={open}
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item required label="Customer name" name="name">
                        <Input placeholder="Input customer name" />
                    </Form.Item>
                    <Form.Item required label="Customer phone:" name="phone">
                        <Input placeholder="Input customer phone number" />
                    </Form.Item>
                    <Form.Item required label="Payment Method:" name="method">
                        <Select>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="card">Card</Select.Option>
                        </Select>
                    </Form.Item>
                    <div>
                        <h5>
                            Sub Total:{" "}
                            <CurrencyFormat
                                displayType="text"
                                value={subTotal}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                        </h5>
                        <h5>
                            Tax Total:{" "}
                            <CurrencyFormat
                                displayType="text"
                                value={tax}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                        </h5>
                        <hr />
                        <h3>
                            Grand Total:{" "}
                            <CurrencyFormat
                                displayType="text"
                                value={total}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                        </h3>
                    </div>
                    <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        className="px-5 bg-dark"
                    >
                        Charge Bill
                    </Button>
                </Form>
            </Modal>
        </DefaultLayout>
    );
}

export default CartPage;
