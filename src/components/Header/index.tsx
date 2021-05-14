import React, { Component, createRef, useState } from "react";
import {
  Col,
  Layout,
  Row,
  Select,
  Avatar,
  Button,
  Form,
  FormInstance,
  Dropdown,
  Space,
  Typography
} from "antd";
import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Dispatch } from "redux";
import styles from "./styles";
import { AppConfig } from "redux/actions";
import { RootState } from "redux/configuration/rootReducer";
import { connect } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import LanguageMenu from "./LanguageMenu";
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from 'react-router';
const { Header } = Layout;
const { Option } = Select;
const { Title } = Typography;

interface IProps
  extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps>, RouteComponentProps {}
interface IState {
  data: Array<FakeData>;
  isLoading: boolean;
}

type FakeData = {
  id: number;
  name: string;
};

class NailHeader extends Component<IProps, IState> {
  render() {
    return (
      <Header style={styles.header}>
        <Row>
          <Col lg={6} xs={12}>
            <Form ref={this.formRef} style={styles.branch.form}>
              <Form.Item name="branch" style={styles.branch.formItem}>
                <Select
                  ref={this.selectRef}
                  style={styles.select}
                  loading={this.state.isLoading}
                >
                  {this.renderData()}
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col lg={12} xs={0}></Col>
          <Col style={styles.rightCol} lg={6} xs={12}>
            <Space size="large">
            <Button
              // style={isHover ? styles.notiOnHover : styles.noti}
              icon={<NotificationOutlined />}
              size="middle"
              shape="circle"
              // onMouseEnter={() => setIsHover(true)}
              // onMouseLeave={() => setIsHover(false)}
              onClick={() => this.props.setShowNotification(true)}
            />
            <Dropdown
              overlay={<ProfileMenu user={{ name: "Vilect" }} />}
              trigger={["click"]}
            >
              <Button style={styles.avatarBtn} size="middle" shape="circle">
                <Avatar size="default" icon={<UserOutlined />} />
              </Button>
            </Dropdown>
            <Dropdown overlay={<LanguageMenu />} trigger={["click"]}>
              <Button style={{...styles.btnLanguage }}>
                {this.props.currentLanguage}
              </Button>
            </Dropdown>
            </Space>
          </Col>
        </Row>
        <Title level={3} style={styles.title}>{this.renderPathName()}</Title>
      </Header>
    );
  }

  state = {
    data: Array<FakeData>(),
    isLoading: false,
  };
  selectRef = createRef<any>();
  formRef = createRef<FormInstance>();

  componentDidMount() {
    //load data
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
        data: fakeData,
      });
    }, 1500);
  }

  componentDidUpdate() {
    if (this.state.data.length) {
      this.formRef.current?.setFieldsValue({
        branch: this.state.data[0].name,
      });
    }
  }

  renderData = () => {
    return this.state.data.map((element: any, index: number) => (
      <Option value={element.name} key={index}>
        {element.name}
      </Option>
    ));
  };

  renderPathName = (): string => {
    const { pathname } = this.props.location;
    const [_, text] = pathname.split('/');
    return text.substring(0,1).toUpperCase() + text.substring(1);
  }
}

type NotiBtnProps = {
  showNoti: Function;
};
const NotiBtn = (props: NotiBtnProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    // <div style={styles.btnNoti.container}>
    <Button
      // style={isHover ? styles.notiOnHover : styles.noti}
      icon={<NotificationOutlined />}
      size="middle"
      shape="circle"
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
      onClick={() => props.showNoti(true)}
    />
    // </div>
  );
};

// const NotiBtnContainer = connect(null, mapDispatchToProps)(NotiBtn);

const fakeData: FakeData[] = [
  { id: 1, name: "Branch one" },
  { id: 2, name: "Branch two" },
  { id: 3, name: "Branch three" },
];

const mapStateToProps = (state: RootState) => ({
  currentLanguage: state.AppConfigReducer.language,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setShowNotification: (visible: boolean) =>
    dispatch(AppConfig.showNotification.request(visible)),
  setShowLanguage: (visible: boolean) =>
    dispatch(AppConfig.showLanguage.request(visible)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NailHeader));
