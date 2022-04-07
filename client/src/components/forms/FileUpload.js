import React from "react";

export default function FileUpload() {
  const fileUploadAndResize = () => {};

  return (
    <div className="row">
      <label className="btn btn-primary">
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
