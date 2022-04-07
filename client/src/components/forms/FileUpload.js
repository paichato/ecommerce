import { Avatar, message, Skeleton } from "antd";
import axios from "axios";
import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

export default function FileUpload({ values, setValues, setLoading, loading }) {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    console.log(e.target.files[0]);
    let files = e.target.files;
    let allUploadeFiles = values.images;
    console.log([files]);
    if (files) {
      setLoading(true);
      [...files].map((img) => {
        Resizer.imageFileResizer(
          img,
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA:", res.data);
                allUploadeFiles.push(res.data);
                setValues({ ...values, images: allUploadeFiles });
                setLoading(false);
                message.success("Imagens carregadas com sucesso");
              })
              .catch((err) => {
                console.log("IMAGE UPLOAD ERROR:", err);
                setLoading(false);
                message.error("Falha ao carregar imagens");
              });
          },
          "base64"
        );
      });
    }
  };

  return (
    <>
      <div className="row">
        <Skeleton
          loading={loading}
          active
          avatar
          paragraph={false}
          title={false}
          round={false}
        >
          {values.images &&
            values.images.map((image) => (
              <Avatar
                key={image.public_id}
                size={100}
                src={image.url}
                className="m-3"
              />
            ))}
        </Skeleton>

        <div className="row">
          <label className="btn btn-primary btn-raised">
            Choose file
            <input
              type="file"
              multiple
              hidden
              accept="images/*"
              onChange={fileUploadAndResize}
            />
          </label>
        </div>
      </div>
    </>
  );
}
