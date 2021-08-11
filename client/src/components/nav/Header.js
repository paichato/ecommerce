import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  
} from "@ant-design/icons";

const { SubMenu } = Menu;

function Header() {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
      setCurrent(e.key);
  };

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item  key="home" icon={<AppstoreOutlined />}>
          Home
        </Menu.Item>

        <Menu.Item key="login"  icon={<UserOutlined />} className="float-right">
          Login
        </Menu.Item>
        <Menu.Item key="register"   icon={<UserAddOutlined />} className="float-right" >
          Register
        </Menu.Item>

        {/* <SubMenu key="account" icon={<SettingOutlined />} title="Account">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </SubMenu> */}
      </Menu>
    </>
  );
}

export default Header;
