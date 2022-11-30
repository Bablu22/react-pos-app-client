import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import {
    EditOutlined,
    DeleteOutlined,
    AppstoreAddOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import "../resources/layout.css";

import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Select,
    Spin,
    Table,
    Upload,
} from "antd";

function Items() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnLoad, setBtnLoad] = useState(false);
    const [image, setImage] = useState([]);
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const getItems = () => {
        axios
            .get("/api/v1/items")
            .then((res) => {
                setItems(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (record) => {
        axios
            .delete(`/api/v1/items/${record._id}`)
            .then((res) => {
                message.success("Item deleted success");
                getItems();
            })
            .catch((err) => console.log(err));
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
            title: "Catrgoty",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (id, record) => (
                <div className="d-flex align-items-center">
                    <EditOutlined
                        onClick={() => {
                            setEditItem(record);
                            setOpen(true);
                        }}
                    />
                    <DeleteOutlined onClick={() => handleDelete(record)} />
                </div>
            ),
        },
    ];

    const showModal = () => {
        setOpen(true);
    };
    const handleAnt = (e) => {
        setImage(e.file.originFileObj);
    };

    useEffect(() => {
        getItems();
    }, []);

    const onFinish = async (value) => {
        if (editItem === null) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "redux-tour");
            formData.append("cloud_name", "dmkyaq9vt");
            const imageRes = await fetch(
                "https://api.cloudinary.com/v1_1/dmkyaq9vt/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const res2 = await imageRes.json();
            const imageURL = res2.url;
            value.image = imageURL;

            const { name, price, category } = value;
            if (name && price && category && image) {
                axios
                    .post("/api/v1/items", value)
                    .then((res) => {
                        message.success("Item added success");
                        setBtnLoad(false);
                        value = {};
                        setOpen(false);
                        getItems();
                    })
                    .catch((err) => console.log(err));
            } else {
                message.warning("Please provide all information");
            }
        } else {
            axios
                .patch("/api/v1/items", { ...value, itemId: editItem._id })
                .then((res) => {
                    message.success("Item update success");
                    setBtnLoad(false);
                    value = {};
                    setOpen(false);
                    getItems();
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <DefaultLayout>
            <Button
                type="primary"
                onClick={showModal}
                className="ms-auto d-flex mb-2 px-4"
            >
                Add Item <AppstoreAddOutlined />
            </Button>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Table
                    key="key"
                    dataSource={items}
                    columns={columns}
                    bordered
                    rowKey={(record) => record._id}
                />
            )}
            {open && (
                <Modal
                    title={`${editItem !== null ? "Edit item" : "Add new item"}`}
                    open={open}
                    footer={false}
                    onCancel={() => {
                        setEditItem(null);
                        setOpen(false);
                    }}
                >
                    <Form initialValues={editItem} layout="vertical" onFinish={onFinish}>
                        <Form.Item required label="Name" name="name">
                            <Input placeholder="Input item name" />
                        </Form.Item>
                        <Form.Item required label="Price" name="price">
                            <Input placeholder="Input item price" />
                        </Form.Item>
                        <Form.Item required label="Catrgory" name="category">
                            <Select>
                                <Select.Option value="Fruits">Fruits</Select.Option>
                                <Select.Option value="Vagetables">Vagetables</Select.Option>
                                <Select.Option value="Meets">Meets</Select.Option>
                                <Select.Option value="Chocolates">Chocolates</Select.Option>
                                <Select.Option value="Fishes">Fishes</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="image" label="Upload" required>
                            <Upload
                                name="image"
                                onChange={handleAnt}
                                listType="picture"
                                maxCount={1}
                                bordered
                                required
                            >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Button
                            loading={btnLoad}
                            type="primary"
                            htmlType="submit"
                            className="px-5"
                        >
                            Submit
                        </Button>
                    </Form>
                </Modal>
            )}
        </DefaultLayout>
    );
}

export default Items;
