import React, { useEffect } from "react";
import { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Segmented, Spin } from "antd";
import Item from "../components/Item";

function Home() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("Fruits");

    useEffect(() => {
        axios
            .get("/api/v1/items")
            .then((res) => {
                setItems(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <DefaultLayout>
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    {" "}
                    <Segmented
                        onChange={(value) => setCategory(value)}
                        options={["Fruits", "Vagetables", "Meets", "Chocolates", "Fishes"]}
                    />
                    <Row gutter={[16, 16]}>
                        {items
                            ?.filter((i) => i.category === category)
                            .map((item) => (
                                <Item key={item._id} item={item} />
                            ))}
                    </Row>
                </>
            )}
        </DefaultLayout>
    );
}

export default Home;
