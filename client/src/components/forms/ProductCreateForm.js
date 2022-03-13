import React from "react";

export default function ProductCreateForm({
  handleChange,
  handleSubmit,
  values,
}) {
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
  return (
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
        <select name="color" className="form-control" onChange={handleChange}>
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
        <select name="brand" className="form-control" onChange={handleChange}>
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
  );
}
