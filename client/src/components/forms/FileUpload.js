import React from "react";

export default function FileUpload() {
  const fileUploadAndResize = () => {};

  return (
    <div className="row">
      <label>Choose file</label>
      <input
        type="file"
        multiple
        accept="images/*"
        onChange={fileUploadAndResize}
      />
    </div>
  );
}
