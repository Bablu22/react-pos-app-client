import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { Modal, Spin, Table } from "antd";
import Moment from "react-moment";
import Bill from "../components/Bill";
import { useReactToPrint } from "react-to-print";

function Bills() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/v1/bill")
            .then((res) => {
                setLoading(false);
                setBills(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const columns = [
        {
            title: "Bill ID",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "Customer name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Sub Total",
            dataIndex: "subTotal",
            key: "subTotal",
        },
        {
            title: "Tax",
            dataIndex: "tax",
            key: "tax",
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (id, record) => (
                <Moment format="MMM Do YY">{record.createdAt}</Moment>
            ),
        },

        {
            title: "Action",
            dataIndex: "_id",
            key: "_id",
            render: (id, record) => (
                <EyeOutlined
                    onClick={() => {
                        setSelectedBill(record);
                        setOpen(true);
                    }}
                />
            ),
        },
    ];

    return (
        <DefaultLayout>
            {
                loading ? <Spin /> :

                    <Table
                        pagination={false}
                        dataSource={bills}
                        columns={columns}
                        bordered
                        rowKey={(record) => record._id}
                    />
            }
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={false}
                title="Charge Bill"
            >
                <Bill
                    item={selectedBill}
                    reference={componentRef}
                    handleClick={handlePrint}
                />
            </Modal>
        </DefaultLayout>
    );
}

export default Bills;
