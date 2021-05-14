import { Component, CSSProperties } from "react";
import {
  Button,
  Col,
  Row,
  Space,
  Collapse,
  Dropdown,
  Menu,
  Divider,
  List,
  Typography,
} from "antd";
import { EllipsisOutlined, DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { I18n, _t, translations } from "utils";
import { IService } from "models/IServices";
import { RootState } from "redux/configuration/rootReducer";
import { Dispatch } from "redux";
import {
  ServicesActions,
  CategoryActions,
  ActionInterfaces,
} from "redux/actions";
import { IItemCategory } from "models/IItemCategory";
import "./style.css";
import { getServicesByCategory } from "redux/selectors/services";
import moment from "moment";

const { Panel } = Collapse;
const { Text } = Typography;

interface IStates {}

interface IProps
  extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps> {}

// interface ICategoryServices {
//   [key: string]: {
//     category: IItemCategory;
//     services: IService[];
//   };
// }

class ServicesMenu extends Component<IProps, IStates> {
  state = {};
  componentDidMount() {
    this.props.getServices({
      userId: "1",
      shopId: "2",
    });
    this.props.getCategory({
      userId: "1",
      shopId: "1",
    });
  }
  render() {
    return (
      <Col span={24} style={styles.container}>
        <Space direction="vertical" style={styles.spaceContainer} size="small">
          {this.renderButton()}
          {this.renderCollapse()}
        </Space>
      </Col>
    );
  }
  renderButton = () => {
    return (
      <Row justify="end">
        <Col>
          <Space direction="horizontal" size="small">
            <Dropdown trigger={["click"]} overlay={this.renderMenuExport}>
              <Button type="default" icon={<DownloadOutlined />}>
                {I18n.t(_t(translations.services.btnExport))}
              </Button>
            </Dropdown>
            <Dropdown trigger={["click"]} overlay={this.renderMenuAddNew}>
              <Button type="primary">
                {I18n.t(_t(translations.services.btnAddNew))}
              </Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>
    );
  };

  renderCollapse = () => {
    return (
      <Row>
        <Col span={24}>
          <Collapse
            defaultActiveKey={["1"]}
            onChange={(key) => this._onChangeCollapse(key)}
          >
            {this.props.category.map((e: IItemCategory) => {
              return (
                <Panel header={e.name} key={e.id} extra={this.renderExtra()}>
                  <List
                    itemLayout="horizontal"
                    dataSource={this.props.servicesByCategory(e.id)}
                    renderItem={this.renderItem}
                    rowKey={(item) => `key ${item.id}`}
                  />
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      </Row>
    );
  };

  renderItem = (item: IService) => {
    return (
      <Link to={`/services/edit/${1}`} onClick={() => {}}>
        <List.Item style={styles.listItem}>
          <Col span={10}>
            <h3>{item.item.name}</h3>
          </Col>

          <Col span={14} style={{ alignSelf: "center" }}>
            <Space direction="vertical" size="large">
              <Col span={24}>
                <Row justify="space-between">
                  <Text style={styles.time}>
                    {moment.unix(item.duration).format("mm")}
                  </Text>
                  <Text style={styles.price}>{item.item.price}</Text>
                </Row>
              </Col>
            </Space>
          </Col>

          <Divider style={styles.divider} />
        </List.Item>
      </Link>
    );
  };

  _onChangeCollapse = (key: any) => {
    console.log(key);
  };

  renderMenuAddNew = () => (
    <Menu>
      <Menu.Item key="menuNewService">
        <Link to={`/services/addNew`}>
          {I18n.t(_t(translations.services.menuNewService))}
        </Link>
      </Menu.Item>
      <Divider style={styles.dividerNoMargin} />
      <Menu.Item key="menuNewCategory" onClick={() => alert("456")}>
        {I18n.t(_t(translations.services.menuNewCategory))}
      </Menu.Item>
    </Menu>
  );

  renderMenuExport = () => (
    <Menu>
      <Menu.Item key="menuPDF" onClick={() => alert("123")}>
        {I18n.t(_t(translations.services.menuPDF))}
      </Menu.Item>
      <Divider style={styles.dividerNoMargin} />
      <Menu.Item key="menuExcel" onClick={() => alert("456")}>
        {I18n.t(_t(translations.services.menuExcel))}
      </Menu.Item>
      <Divider style={styles.dividerNoMargin} />
      <Menu.Item key="MenuCSV" onClick={() => alert("789")}>
        {I18n.t(_t(translations.services.menuCSV))}
      </Menu.Item>
    </Menu>
  );

  renderExtra = () => (
    <Dropdown trigger={["click"]} overlay={this.renderMenuPanel}>
      <Button
        onClick={(event) => event.stopPropagation()}
        icon={<EllipsisOutlined />}
      />
    </Dropdown>
  );

  renderMenuPanel = () => (
    <Menu>
      <Menu.Item key="menuAddService" onClick={() => alert("123")}>
        {I18n.t(_t(translations.services.menuAddNewServices))}
      </Menu.Item>
      <Divider style={styles.dividerNoMargin} />
      <Menu.Item key="menuEditCate" onClick={() => alert("456")}>
        {I18n.t(_t(translations.services.menuEditCategory))}
      </Menu.Item>
      <Divider style={styles.dividerNoMargin} />
      <Menu.Item
        key="menuDeleteCate"
        onClick={() => alert("789")}
        style={styles.textDelete}
      >
        {I18n.t(_t(translations.services.menuDeleteCategory))}
      </Menu.Item>
    </Menu>
  );
}

const styles = {
  container: {
    backgroundColor: "white",
    alignSelf: "center",
    width: "100%",
  },
  divider: {
    margin: "16px 0",
  },
  dividerNoMargin: {
    margin: 0,
  },
  spaceContainer: {
    display: "block",
    width: "100%",
  },
  textDelete: {
    color: "red",
  },
  listItem: {
    alignItems: "normal",
  },

  time: {
    color: "#8c8c8c",
  },
  price: {
    fontWeight: 700,
  },
};

const mapStateToProps = (state: RootState) => ({
  services: state.ServiceReducer.services,
  category: state.CategoryReducer.category,
  servicesByCategory: (categoryId: string) =>
    getServicesByCategory(state, categoryId),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCategory: (data: ActionInterfaces.ICategoryRequest) => {
    dispatch(CategoryActions.getCategory.request(data));
  },
  getServices: (data: ActionInterfaces.IServicesRequest) => {
    dispatch(ServicesActions.getServices.request(data));
  },
  selectService: (service: IService) =>
    dispatch(ServicesActions.selectService.request(service)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesMenu);
