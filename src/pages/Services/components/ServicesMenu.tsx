import { Component } from "react";
import { connect } from 'react-redux';
import {
  Col,
  Row,
  Input,
  Space,
  Button,
  Dropdown,
  Menu,
  message,
  List,
  Avatar,
  Typography,
} from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  DownOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Axios from 'axios';
import { RootState } from "redux/configuration/rootReducer";

interface IStates {
  gridView: boolean;
  searchTerm: string;
  listData: Array<any>;
}

interface IProps extends ReturnType<typeof mapStateToProps> { }

const { Text } = Typography;

const data = [
  {
    id: 1,
    name: "Trung",
    pos: "Technician",
    phone: "+1 614-772-4672",
    email: "akajeeeedawdafagfawdwdawaee@gmail.com",
  },
  {
    id: 2,
    name: "hai",
    pos: "Hihi",
    phone: "+1 614-772-4672",
    email: "akajeeeeee@gmail.com",
  },
  {
    id: 3,
    name: "hieu",
    pos: "haha",
    phone: "+1 614-772-4672",
    email: "akajeeeeee@gmail.com",
  },
  {
    id: 4,
    name: "the anh",
    pos: "Nail Technician",
    phone: "+1 614-772-4672",
    email: "akajeeeeee@gmail.com",
  },
];
class StaffMembers extends Component<IProps, IStates> {
  state = {
    gridView: false,
    searchTerm: "",
    listData: [],
  };

  componentDidUpdate(prevProps: IProps, prevState: IStates, snapshot: any) {

  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    const { data } = await Axios({
      baseURL: 'http://3.136.161.133:3000/api/v1',
      url: `admin/get-all-items`,
      method: 'get'
    });
    this.setState({listData: data.data})
  }

  render() {
    return (
      <>
        <Space direction="vertical" style={styles.container} size="large">
          {this.renderHeader()}
          {this.renderList()}
        </Space>
      </>
    );
  }

  renderHeader = () => {
    return (
      <Row justify="space-between">
        <Col>
          <Space direction="horizontal" size="small">
            <Col>
              <Button
                type={!this.state.gridView ? "link" : "text"}
                icon={<AppstoreOutlined style={styles.icon} />}
                onClick={this._onChangeListView}
              />
              <Button
                type={this.state.gridView ? "link" : "text"}
                icon={<BarsOutlined style={styles.iconBars} />}
                onClick={this._onChangeListView}
              />
            </Col>
            {/* <Input
              allowClear
              prefix={<SearchOutlined />}
              placeholder="Search by name or title"
              style={styles.inputSearch}
              value={this.state.searchTerm}
              onChange={(e) => this.setState({ searchTerm: e.target.value })}
            /> */}
          </Space>
        </Col>
        {/* <Col>
          <Space direction="horizontal" size="small">
            <Dropdown trigger={["click"]} overlay={this.menu}>
              <Button>
                Options <DownOutlined />
              </Button>
            </Dropdown>
            <Button type="primary" onClick={() => alert("1233")}>
              New Closed Date
            </Button>
          </Space>
        </Col> */}
      </Row>
    );
  };

  renderList = () => {
    const gridView = !this.state.gridView
      ? { column: 2, gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 2 }
      : { column: 1, gutter: 16 };
    const avatarSize = { xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 };
    const url =
      "https://img.icons8.com/ios/452/clothes.png";
    return (
      <Row>
        <Col span={24}>
          <List
            loading={this.props.isLoading}
            itemLayout="horizontal"
            dataSource={this.state.listData}
            rowKey={(e: any) => e._id.toString()}
            grid={gridView}
            renderItem={(item) => (
              <List.Item
                onClick={() => console.log(123)}
                style={styles.listItem}
              >
                <Row style={{ alignItems: "center" }}>
                  <Col>
                    <Avatar size={avatarSize} src={item.avatar} />
                  </Col>
                  <Col span={20} style={{ display: "flex" }}>
                    <Row style={styles.rowItem} justify="space-between">
                      <Col span={6}>
                        <h3>{item.name || item._id}</h3>
                        {/* <Text>{item.pos} </Text> */}
                      </Col>
                      <Col span={13}>
                        <Text>Giá: {item.price} đ</Text>
                        <br />
                        <Text>Số lượng {item.quantity} </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  };

  _onChangeListView = () => {
    this.setState({ gridView: !this.state.gridView });
  };

  handleMenuClick = (e: any) => {
    message.info("Click on menu item. " + e);
  };

  menu = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100%",
  },
  icon: {
    fontSize: 28,
  },
  iconBars: {
    fontSize: 28,
    marginInlineEnd: 10,
  },
  listItem: {
    borderStyle: "ridge",
    borderRadius: 10,
    padding: 10,
  },
  rowItem: {
    alignItems: "center",
    marginLeft: 20,
    display: "flex",
    width: "100%",
  },
  iconRight: {
    marginLeft: "auto",
  },
  inputSearch: { width: 500 },
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.AppConfigReducer.showLoading
})

export default connect(mapStateToProps)(StaffMembers)