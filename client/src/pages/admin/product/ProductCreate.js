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
  images: [],
  colors: ["Silver", "Gold", "Black", "White", "Brown"],
  brands: ["Apple", "Samsung", "Asus", "Lenovo", "Microsoft"],
  color: "",
  brand: "",
  shipping: "",
  quantity: "",
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
    images,
    colors,
    brands,
    color,
    brand,
    shipping,
    quantity,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, "----", e.target.value);
    console.log(values);
  };

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
                value={title}
                onChange={handleChange}
                name="title"
              />
            </div>
            <div className="form-group mt-3">
              <lable>Description</lable>
              <input
                type="text"
                className="form-control mt-3"
                value={description}
                onChange={handleChange}
                name="description"
              />
            </div>
            <div className="form-group mt-3">
              <lable>Price</lable>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={handleChange}
                name="price"
              />
            </div>
            <div className="form-group mt-3">
              <lable>Shipping</lable>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <lable>Quantity</lable>
              <input
                type="text"
                className="form-control"
                value={quantity}
                onChange={handleChange}
                name="quantity"
              />
            </div>
            <div className="form-group mt-3">
              <lable>Color</lable>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-3">
              <lable>Brand</lable>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {brands.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-outline-info mt-3">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
