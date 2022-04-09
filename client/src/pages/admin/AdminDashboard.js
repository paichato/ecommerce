import React, { useEffect, useState } from "react";
import AdminProductCard from "../../components/cards/AdminProductCard";
import AdminNav from "../../components/nav/AdminNav";
import { getProductsByCount } from "../../functions/product";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllProducts();
  }, []);

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
              <AdminProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
