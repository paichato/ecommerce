import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { createCategory } from "../../../functions/category";

export default function CategoryCreate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        console.log(res.data);
        setName("");
        toast.success(`category ${res.data.name} has been created`);
      })
      .catch((err) => {
        console.log(err.response.data);
        err.response.status === 400 && toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const CategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <button disabled={loading} className="btn btn-outline-primary mt-2">
            Save
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <h4>Create Category</h4>
          <CategoryForm />
        </div>
      </div>
    </div>
  );
}
