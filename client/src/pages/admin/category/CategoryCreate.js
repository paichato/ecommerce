import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

export default function CategoryCreate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => console.log(err));
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Are you sure you want to Delete ${slug}`)) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          console.log(res.data);
          loadCategories();
          setLoading(false);
          toast.error(`${res.data.deleted.name} deleted`);
        })
        .catch((err) => {
          setLoading(false);
          err.response.status === 400 && toast.error(err.response.data);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        console.log(res.data);
        loadCategories();
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

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create Category</h4>
          )}

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
            loading={loading}
          />
          <hr />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}{" "}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm "
                style={{ float: "right" }}
              >
                <DeleteOutlined className="text-danger" />
              </span>{" "}
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm" style={{ float: "right" }}>
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
