import React from "react"
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LoginOutlined,
  DatabaseOutlined,
  BuildOutlined,
  LogoutOutlined,
  BankFilled
} from '@ant-design/icons';
import { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";

const Navbar = props=>{

    const {user} = props

    const location = useLocation()

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(prevState=>!prevState);
      };


    return (
        <div style={{ width: '200px', position: "fixed", zIndex: 200 }}>
          <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
          <Menu
            defaultSelectedKeys={[location.pathname[location.pathname.length - 1]==="/" && location.pathname.length>1 ? location.pathname.substr(0, location.pathname.length-1): location.pathname]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
          >
            
            
            <Menu.Item key="/" icon={<DatabaseOutlined />}>
                <NavLink to="/auctions">Auctions</NavLink>
            </Menu.Item>
            {!user && <Menu.Item key="/auth" icon={<LoginOutlined />}>
                <NavLink to="/auth">Login/Sign up</NavLink>
            </Menu.Item>
            }
            {user && <Menu.Item key="/create-auction" icon={<BuildOutlined />}>
              <NavLink to="/create-auction" >Create Auction</NavLink>
            </Menu.Item>
            }
            {user && <Menu.Item key="/your-auctions" icon={<BankFilled />}>
              <NavLink to="/your-auctions" >Your Auctions</NavLink>
            </Menu.Item>
            }
            {user && <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={props.logoutHandler}>
              Logout
            </Menu.Item>
            }
          </Menu>
        </div>
    );
}

export default Navbar;