import { LoadingOutlined } from "@ant-design/icons";
import { Avatar, Badge, message, Skeleton } from "antd";
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

  const handleRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimages`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        const { images } = values;
        let filteredImages = images.filter((img) => {
          return img.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
        setLoading(false);
        message.success("Imagens removida com sucesso");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        message.error("Falha ao remover imagem");
      });
  };

  return (
    <>
      <div>
        <Skeleton
          loading={!values.images && loading}
          active
          avatar={{ shape: "square" }}
          paragraph={false}
          title={false}
          round={false}
        >
          {values.images &&
            values.images.map((image) => (
              <Badge
                count="X"
                key={image.public_id}
                onClick={() => handleRemove(image.public_id)}
                style={{ cursor: "pointer" }}
                className="m-3"
              >
                <Avatar
                  style={loading && { opacity: 0.2 }}
                  size={100}
                  src={image.url}
                  shape="square"
                />
              </Badge>
            ))}
        </Skeleton>
        {values.images && loading && (
          <LoadingOutlined className="p-2" style={{ fontSize: "36px" }} />
        )}

        <div className="row">
          <label className="btn btn-primary btn-raised">
            Choose file
            <input
              disabled={loading}
              onChange={() => setLoading(false)}
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
