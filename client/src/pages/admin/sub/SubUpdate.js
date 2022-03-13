import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import {
  createSub,
  getSubs,
  getSub,
  removeSub,
  updateSub,
} from "../../../functions/sub";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import SubForm from "../../../components/forms/SubForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";

export default function SubUpdate({ history, match }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [parent, setParent] = useState("");

  useEffect(() => {
    Promise.all([loadCategories(), loadSub()]);
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => console.log(err));
  };
  const loadSub = () => {
    getSub(match.params.slug)
      .then((c) => {
        console.log("c:", c.data);
        setName(c.data.name);
        setParent(c.data.parent);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        console.log(res.data);
        // loadSubs();
        setName("");
        toast.success(`sub category ${res.data.name} has been created`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err.response.data);
        err.response.status === 400 && toast.error(err.response.data);
      })
      .finally(() => {
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
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Sub</h4>
          )}
          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
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

          {/* <hr />
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
          ))} */}
        </div>
      </div>
    </div>
  );
}
