import { Card } from "antd";
import React from "react";

const { Meta } = Card;

export default function AdminProductCard({ product }) {
  const { title, description, images } = product;

  return (
    <div className="col-md-4">
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            style={{ height: "150px", objectFit: "cover" }}
            className="m-2"
          />
        }
      >
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
}
