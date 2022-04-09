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
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { Button, Result, Skeleton, Spin } from "antd";

export default function ProductUpdate() {
  const { user } = useSelector((state) => ({ ...state }));

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
