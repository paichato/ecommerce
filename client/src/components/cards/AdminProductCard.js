import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React, { useState } from "react";
import laptop from "../../images/computer/laptop.png";

const { Meta } = Card;

export default function AdminProductCard({ product }) {
  const { title, description, images } = product;
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div className="col-md-4 pb-3">
      <Card
        hoverable
        onMouseOver={() => setShowIcons(true)}
        onMouseOut={() => setShowIcons(false)}
        actions={
          showIcons && [
            <EditOutlined className="text-warning" />,
            <DeleteOutlined className="text-danger" />,
          ]
        }
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="m-2 p-1 mb-3"
          />
        }
      >
        <Meta
          title={title}
          description={description && description.substring(0, 30) + "..."}
        />
      </Card>
    </div>
  );
}
