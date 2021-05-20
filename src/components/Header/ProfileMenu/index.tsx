import React from "react";
import { Col, Row, Avatar, Menu, Typography } from "antd";
import {  UserOutlined } from "@ant-design/icons";
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { I18n, _t, translations } from "utils";
import styles from './styles';
import { AuthenticationActions } from "redux/actions";
const { Title, Link } = Typography;

interface IProps extends ReturnType<typeof mapDispatchToProps> {
  user: any
}

const menus: string[] = [
  I18n.t(_t(translations.profileMenu.notiSetting)),
  I18n.t(_t(translations.profileMenu.contactSupport)),
  I18n.t(_t(translations.profileMenu.helpCenter)),
  
]

const ProfileMenu = (props: IProps) => (
  <Menu style={styles.menu}>
    <Row>
      <Col span={12} style={styles.colAvatar}>
        <Avatar size={80} icon={<UserOutlined />} />
      </Col>
      <Col span={12} style={styles.colName}>
        <div>
          <Title level={4}>{props.user.name}</Title>
          <Link style={styles.myProfile}>{I18n.t(_t(translations.profileMenu.myProfile))}</Link>
        </div>
      </Col>
    </Row>
    <Menu.Divider />
    {renderMenuItem()}
    <Menu.Item key={3} style={styles.menuItem} onClick={() => props.logout()}>
      {I18n.t(_t(translations.profileMenu.logout))}
    </Menu.Item>
    
  </Menu>
)

const renderMenuItem =() => {
  return menus.map((element, index) => (
    <Menu.Item key={index} style={styles.menuItem}>
      <a href="/">{element}</a>
    </Menu.Item>
  ))
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    dispatch(AuthenticationActions.logout.request())
  }
})

export default connect(null, mapDispatchToProps)(ProfileMenu);
