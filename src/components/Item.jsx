import { Button, Card, Col } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import "../resources/card.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";


function Item({ item }) {
    const dispatch = useDispatch();


    const addToCart = () => {
        dispatch({ type: "addToCart", payload: { ...item, quantity: 1 } });
    };



    return (
        <Col className="gutter-row" span={6} xs={24} lg={6} md={12} sm={6}>
            <Card cover={<img alt="example" src={item.image} />}>
                <Meta
                    title={`Item: ${item.name}`}
                    description={`Category: ${item.category}`}
                />
                <Button

                    type="primary"
                    onClick={() => addToCart()}
                    block
                    icon={<ShoppingCartOutlined />}
                    style={{
                        backgroundColor: "#008080",
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    Add To Cart
                </Button>
            </Card>
        </Col>
    );
}

export default Item;
