import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const handleRemove = (slug) => {
    const Confirm = Modal.confirm({
      title: "Delete?",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${slug}`,
      okText: "Delete",
      cancelText: "Cancel",
      // okButtonProps:{danger:true},
      okType: "danger",
      onOk: () =>
        removeProduct(slug, user.token)
          .then((res) => {
            console.log(res.data);
            loadAllProducts();
            message.success(`${res.data.title} deleted with success`);
          })
          .catch((err) => {
            console.log(err);
            err.response.status === 400 && message.error(err);
          }),

      // okButtonProps={{danger:true}}
    });
  };

  const loadAllProducts = async () => {
    setLoading(true);
    getProductsByCount(10)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4>Loading...</h4> : <h4>All Products</h4>}
          <div className="row">
            {products.map((product) => (
              <AdminProductCard
                handleRemove={handleRemove}
                product={product}
                key={product._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
