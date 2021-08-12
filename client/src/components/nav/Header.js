import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  
} from "@ant-design/icons";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {Link} from 'react-router-dom'

const { SubMenu, Item } = Menu;

function Header() {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
      setCurrent(e.key);
  };

  return (
    <>
   
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"  style={{display: 'block'}}  >
        <Item  key="home" icon={<AppstoreOutlined />} className='' >
          <Link to="/" >Home</Link>
         
        </Item>
        <SubMenu key="account" icon={<SettingOutlined />} title="Account">
          <Item key="setting:1">
          <Link to="/" >Home</Link>
            </Item>
          <Menu.Item key="setting:2">
          <Link to="/" >Home</Link>
            </Menu.Item>
        </SubMenu>
        <Item key="register"   icon={<UserAddOutlined />}  className="float-right" style={{float:'right'}} >
        <Link to="/register" >Register</Link>
        </Item>
        <Item key="login"  icon={<UserOutlined />}  className="float-right" style={{float:'right'}}>
        <Link to="/login" >Login</Link>
        </Item>
        

        
      </Menu>
     
    </>
  );
}

export default Header;
