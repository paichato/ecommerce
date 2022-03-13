import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { createSub, getSubs, getSub, removeSub } from "../../../functions/sub";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import SubForm from "../../../components/forms/SubForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";

export default function SubCreate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    Promise.all([loadCategories(), loadSubs()]);
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => console.log(err));
  };
  const loadSubs = () => {
    getSubs()
      .then((c) => setSubs(c.data))
      .catch((err) => console.log(err));
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Are you sure you want to delete ${slug}`)) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          console.log(res.data);
          loadSubs();
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
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        console.log(res.data);
        loadSubs();
        setName("");
        toast.success(`sub category ${res.data.name} has been created`);
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
            <h4>Create Sub</h4>
          )}
          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select a parent category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
            loading={loading}
          />
          <hr />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />
          {subs.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}{" "}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm "
                style={{ float: "right" }}
              >
                <DeleteOutlined className="text-danger" />
              </span>{" "}
              <Link to={`/admin/sub/${c.slug}`}>
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
