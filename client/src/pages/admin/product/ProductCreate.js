import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
// import {
//   createCategory,
//   getCategories,
//   removeCategory,
// } from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  categories: [],
  subs: [],
  shipping: "",
  images: [],
  colors: ["Silver", "Gold", "Black", "White", "Brown"],
  brands: ["Apple", "Samsung", "Asus", "Lenovo", "Microsoft"],
  color: "",
  brand: "",
  shipping: "",
};

export default function ProductCreate() {
  const [values, setValues] = useState(initialState);

  const {
    title,
    description,
    price,
    category,
    categories,
    subs,
    shipping,
    images,
    colors,
    brands,
    color,
    brand,
    shipping,
  } = values;

  const handleSubmit = () => {};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product create</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <lable>Title</lable>
              <input
                type="text"
                className="form-control"
                value={values.title}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
