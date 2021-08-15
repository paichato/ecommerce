import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined
  
} from "@ant-design/icons";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {Link} from 'react-router-dom';
import firebase from "firebase";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

const { SubMenu } = Menu;

function Header() {
  const [current, setCurrent] = useState("home");
  let dispatch=useDispatch();
  let history=useHistory();
  let {user}=useSelector(state => ({...state}))


  const handleClick = (e) => {
      setCurrent(e.key);
  };

  const logout=()=>{
    firebase.auth().signOut();
    dispatch({
      type:'LOGOUT',
      payload:null,
    });
    setCurrent('login');
    history.push('/login');
    
  }

  return (
    <>
   
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"  style={{display: 'block'}}  >
        <Menu.Item  key="home" icon={<AppstoreOutlined />} className='' >
          <Link to="/" >Home </Link>
         
        </Menu.Item>
        {user && <SubMenu key="account" icon={<SettingOutlined />} style={{float:'right'}} title={user.email && user.email.split('@')[0]}>
          <Menu.Item key="setting:1">
          <Link to="/" >Dashboard</Link>
            </Menu.Item>
          <Menu.Item key="setting:2">
          <Link to="/" >Edit profile</Link>
            </Menu.Item>
          <Menu.Item onClick={logout}  icon={<LogoutOutlined />}>Logout</Menu.Item>
        </SubMenu>}
        
       {!user &&  <Menu.Item key="register"   icon={<UserAddOutlined />}  className="float-right" style={{float:'right'}} >
        <Link to="/register" >Register</Link>
        </Menu.Item>
        }
        {!user && <Menu.Item key="login"  icon={<UserOutlined />}  className="float-right" style={{float:'right'}}>
        <Link to="/login" >Login</Link>
        </Menu.Item>}
        

        
      </Menu>
     
    </>
  );
}

export default Header;
