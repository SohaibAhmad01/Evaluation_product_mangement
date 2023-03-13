import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    amount_of_purchase: "",
    quantity_of_purchase: "",
    amount_of_sale: "",
    quantity_of_sale: "",
    in_stock: "",
  });

  const {
    name,
    price,
    category,
    amount_of_purchase,
    quantity_of_purchase,
    amount_of_sale,
    quantity_of_sale,
    in_stock,
  } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const headers = {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.userInfo)?.accessToken,
    };
    axios.post("http://127.0.0.1:8000/api/v1/add_product", data, headers);
  };
  return (
    <div>
      <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={price}
            placeholder="Enter price"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={category}
            placeholder="Enter category"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>amount_of_purchase</Form.Label>
          <Form.Control
            type="number"
            name="amount_of_purchase"
            value={amount_of_purchase}
            placeholder="Enter amount_of_purchase"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Equantity_of_purchase</Form.Label>
          <Form.Control
            type="number"
            name="quantity_of_purchase"
            value={quantity_of_purchase}
            placeholder="Enter quantity_of_purchase"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>amount_of_sale</Form.Label>
          <Form.Control
            type="number"
            name="amount_of_sale"
            value={amount_of_sale}
            placeholder="Enter amount_of_sale"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>quantity_of_sale</Form.Label>
          <Form.Control
            type="number"
            value={quantity_of_sale}
            name="quantity_of_sale"
            placeholder="Enter quantity_of_sale"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>in_stock</Form.Label>
          <Form.Control
            type="number"
            name="in_stock"
            value={in_stock}
            placeholder="in_stock"
            onChange={handleChange}
          />
        </Form.Group>

        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default AddProduct;
