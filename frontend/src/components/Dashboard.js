import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import AddProduct from "../forms/AddProduct";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dataTotal, setDataTotal] = useState("");
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };
  useEffect(() => {
    const headers = {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.userInfo)?.accessToken,
    };
    axios
      .get("http://127.0.0.1:8000/api/v1/get_product", { headers })
      .then((response) => {
        console.log(response);
        setDataTotal(response.data?.overall_record);
        setData(response.data?.product_record);
      });
  }, []);
  return (
    <main>
    <div>
      <div style={{ display: "flex", justifyContent: "end", margin: "20px" }}>
        <Button onClick={showModal}>Add Product</Button>
      </div>
      <div style={{ margin: "20px" }}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Purchased Amount</th>
              <th>Purchased Qty</th>
              <th>Sold Amount</th>
              <th>Sold Qty</th>
              <th>Profit</th>
              <th>In Stock</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((productData, i) => (
              <tr>
                <td>{productData?.product_data?.name}</td>
                <td>{productData?.product_data?.category}</td>
                <td>{productData?.amount_of_purchase}</td>
                <td>{productData?.quantity_of_purchase}</td>
                <td>{productData?.amount_of_sale}</td>
                <td>{productData?.quantity_of_sale}</td>
                <td>{productData?.profit_loss}</td>
                <td>{productData?.in_stock}</td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td></td>
              <td>{dataTotal?.amount_of_purchase}</td>
              <td>{dataTotal?.quantity_of_purchase}</td>
              <td>{dataTotal?.amount_of_sale}</td>
              <td>{dataTotal?.quantity_of_sale}</td>
              <td><b>Profit:</b>{dataTotal?.profit}</td>
              <td>{dataTotal?.all_in_stock}</td>
            </tr>
          </tbody>
        </Table>
      </div>
     

      <Modal show={modal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct />
        </Modal.Body>
      </Modal>
    </div>
    </main>
  );
};

export default Dashboard;
