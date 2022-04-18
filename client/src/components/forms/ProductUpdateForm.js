import React from "react";
import { Select } from "antd";

const { Option } = Select;

export default function ProductUpdateForm({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
  loading,
  categories,
}) {
  const {
    title,
    description,
    price,
    category,
    // categories,
    subs,
    images,
    colors,
    brands,
    color,
    brand,
    shipping,
    quantity,
  } = values;

  console.log("THIS IS SUBS:", subs, "THIS IS SUBOPTIONS:", subOptions);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={handleChange}
          name="title"
        />
      </div>
      <div className="form-group mt-3">
        <label>Description</label>
        <input
          type="text"
          className="form-control mt-3"
          value={description}
          onChange={handleChange}
          name="description"
        />
      </div>
      <div className="form-group mt-3">
        <label>Price</label>
        <input
          type="text"
          className="form-control"
          value={price}
          onChange={handleChange}
          name="price"
        />
      </div>
      <div className="form-group mt-3">
        <label>Shipping</label>
        <select
          value={shipping}
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
        <label>Quantity</label>
        <input
          type="text"
          className="form-control"
          value={quantity}
          onChange={handleChange}
          name="quantity"
        />
      </div>
      <div className="form-group mt-3">
        <label>Color</label>
        <select
          value={color}
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
        <label>Brand</label>
        <select
          value={brand}
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
      <div className="form-group">
        <label>Parent category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option>
            {category ? category.name : "Please select a parent category"}
          </option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {category && (
        <div>
          <label>Sub Categories</label>
          <Select
            // disabled={subOptions.length < 1}
            value={subs}
            mode="multiple"
            style={{ width: "100%" }}
            onChange={(value) => setValues({ ...values, subs: value })}
            placeholder={
              subOptions.length < 1
                ? "No subs available"
                : "Please select a sub"
            }
          >
            {subOptions.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
      {!loading && (
        <button disabled={loading} className="btn btn-outline-info mt-3">
          Save
        </button>
      )}
    </form>
  );
}
