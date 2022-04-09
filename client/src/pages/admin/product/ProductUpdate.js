import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
// import {
//   createCategory,
//   getCategories,
//   removeCategory,
// } from "../../../functions/category";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { createProduct, getProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { Button, Result, Skeleton, Spin } from "antd";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  categories: [],
  subs: [],
  images: [],
  colors: ["Silver", "Gold", "Black", "White", "Brown"],
  brands: ["Apple", "Samsung", "Asus", "Lenovo", "Microsoft"],
  color: "",
  brand: "",
  shipping: "",
  quantity: "",
};

export default function ProductUpdate({ match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [done, setDone] = useState(false);
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  let params = useParams();
  //   console.log(params.slug);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {
    // e.preventDefault();
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(params.slug).then((p) => {
      console.log("single product:", p.data);
      setValues({ ...values, ...p.data });
    });
  };

  return (
    <div className="container-fluid">
      {!done ? (
        <div className="row ">
          <div className=" col-md-2">
            <AdminNav />
          </div>

          <div className="col-md-10">
            <h4>Product Update</h4>
            <hr />
            <ProductUpdateForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              // handleCategoryChange={handleCategoryChange}
              // subOptions={subOptions}
              // showSub={showSub}
              values={values}
              setValues={setValues}
              loading={loading}
            />
          </div>
        </div>
      ) : (
        <Result
          title="Operação executada com sucesso"
          extra={
            <Button
              onClick={() => window.location.reload()}
              type="primary"
              key="console"
            >
              Voltar ao dashboard
            </Button>
          }
        />
      )}
    </div>
  );
}
