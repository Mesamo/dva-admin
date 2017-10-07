import React from 'react'
import { Link } from 'dva/router'
import { Menu, Icon } from 'antd'

const { SubMenu } = Menu

const getMenus = (menuArray, currentLanguage, parentPath = '/') => {
  return menuArray.map((menu) => {
    const linkTo = parentPath + menu.key
    if (menu.subMenu && menu.subMenu.length > 0) {
      return (
        <SubMenu
          key={linkTo}
          title={
            <span>
              {menu.icon ? <Icon type={menu.icon} /> : ''}
              <span>{menu.name[currentLanguage]}</span>
            </span>}
        >
          {getMenus(menu.subMenu, currentLanguage, `${linkTo}/`)}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={linkTo}>
          <Link to={linkTo}>
            {menu.icon ? <Icon type={menu.icon} /> : ''}
            <span>{menu.name[currentLanguage]}</span>
          </Link>
        </Menu.Item>
      )
    }
  })
}

export default getMenus
