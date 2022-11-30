import { Spin, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import DefaultLayout from '../components/DefaultLayout'

function Customers() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);

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
            title: "Customer name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Phone number",
            dataIndex: "phone",
            key: "subTotal",
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (id, record) => (
                <Moment format="MMM Do YY">{record.createdAt}</Moment>
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
        </DefaultLayout>
    )
}

export default Customers
