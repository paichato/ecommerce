import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

export default function FileUpload() {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    console.log(e.target.files[0]);
    let files = e.target.files;
    console.log([files]);
    if (files) {
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
          },
          "base64"
        );
      });
    }
  };

  return (
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
  );
}
