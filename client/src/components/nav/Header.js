import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  
} from "@ant-design/icons";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

const { SubMenu } = Menu;

function Header() {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
      setCurrent(e.key);
  };

  return (
    <>
   
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"  style={{display: 'block'}}  >
        <Menu.Item  key="home" icon={<AppstoreOutlined />} className='' >
          Home
        </Menu.Item>
        <SubMenu key="account" icon={<SettingOutlined />} title="Account">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="register"   icon={<UserAddOutlined />}  className="float-right" style={{float:'right'}} >
          Register
        </Menu.Item>
        <Menu.Item key="login"  icon={<UserOutlined />}  className="float-right" style={{float:'right'}}>
          Login
        </Menu.Item>
        

        
      </Menu>
     
    </>
  );
}

export default Header;
