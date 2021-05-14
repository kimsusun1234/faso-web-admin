import React from "react";
import {
  Typography,
  Button,
  Space,
  Card,
  Col,
  Row,
  Switch,
  Select,
  Input,
  Badge,
  InputNumber,
  Form,
  Modal,
  Divider,
  Avatar,
} from "antd";
import {
  CheckCircleTwoTone,
  PlusCircleTwoTone,
  MinusCircleOutlined,
  CloseCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";

import { I18n, _t, translations } from "utils";

import "../styles.css";
import styles from "../styles";

const { Text } = Typography;
const { Option } = Select;

interface IProps {}
interface IStates {
  switchExtraTime: boolean;
  chooseExtraTime: boolean;
  isModalVisible: boolean;
}

const url =
  "https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/08/eee-social.jpg";
//data nay dung chung ben staff
const listStaff = [
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

const avatarSize = { xs: 100, sm: 100, md: 100, lg: 90, xl: 80, xxl: 70 };
export default class FormStaff extends React.Component<IProps, IStates> {
  state = {
    switchExtraTime: false,
    chooseExtraTime: true,
    isModalVisible: false,
  };

  render() {
    const styleChooseItem = this.state.chooseExtraTime
      ? {
          borderStyle: "solid",
          borderColor: "blue",
          borderWidth: 0.2,
          padding: 10,
        }
      : { padding: 10 };
    const styleNotChoose = !this.state.chooseExtraTime
      ? {
          borderStyle: "solid",
          borderColor: "blue",
          borderWidth: 0.2,
          padding: 10,
        }
      : { padding: 10 };
    return (
      <>
        <Card
          headStyle={{ fontSize: 20, fontWeight: "bold" }}
          style={styles.cardBorder}
        >
          <Card.Meta
            title={I18n.t(_t(translations.servicesDetail.pricingDuration))}
            description={I18n.t(
              _t(translations.servicesDetail.desPricingDuration)
            )}
          />

          <Col>
            <Form
              name="dynamic_form_nest_item"
              onFinish={(value) => console.log(value)}
              autoComplete="off"
            >
              <Form.List name="users">
                {(fields, { add, remove }) =>
                  this.renderCard(fields, { add, remove })
                }
              </Form.List>
              {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item> */}
            </Form>
          </Col>

          <Col>
            <h2>{I18n.t(_t(translations.servicesDetail.extraTime))}</h2>
            <Text>{I18n.t(_t(translations.servicesDetail.enableExtra))}</Text>
          </Col>

          <Space
            direction="horizontal"
            size="middle"
            style={styles.maxWidthSpace}
          >
            <Switch onChange={this._onSwitch} />
            <Text>
              {I18n.t(_t(translations.servicesDetail.switchEnableExtra))}
            </Text>
          </Space>
          {this.state.switchExtraTime && (
            <Space
              direction="vertical"
              size="middle"
              style={styles.maxWidthSpace}
            >
              <Row>
                <Space direction="horizontal" size="middle">
                  <Badge
                    count={
                      this.state.chooseExtraTime ? (
                        <CheckCircleTwoTone twoToneColor="blue" />
                      ) : (
                        0
                      )
                    }
                  >
                    <Col
                      onClick={() =>
                        this.setState({
                          chooseExtraTime: !this.state.chooseExtraTime,
                        })
                      }
                      style={styleChooseItem}
                    >
                      <h3>Processing time</h3>
                      <Text>Take other bookings during this time.</Text>
                    </Col>
                  </Badge>

                  <Badge
                    count={
                      !this.state.chooseExtraTime ? (
                        <CheckCircleTwoTone twoToneColor="blue" />
                      ) : (
                        0
                      )
                    }
                  >
                    <Col
                      onClick={() =>
                        this.setState({
                          chooseExtraTime: !this.state.chooseExtraTime,
                        })
                      }
                      style={styleNotChoose}
                    >
                      <h3>Blocked time</h3>
                      <Text>Block time between appointments.</Text>
                    </Col>
                  </Badge>
                </Space>
              </Row>
              <Col>
                <h3>{I18n.t(_t(translations.servicesDetail.duration))}</h3>
                <Select
                  defaultValue="lucy"
                  onChange={this.handleChange}
                  style={styles.maxWidth}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Col>
            </Space>
          )}
        </Card>
      </>
    );
  }

  renderCard = (fields: any, { add, remove }: any) => (
    <>
      {fields.map(({ key, name, fieldKey, ...restField }: any) => (
        <Col key={key} style={styles.cardPricing}>
          <Row>
            <Space direction="vertical" size="middle" style={styles.maxWidth}>
              <Row justify="space-between">
                <h2 style={{ fontWeight: "bold" }}>
                  Pricing option {name + 1}
                </h2>
                {fields.length > 1 && (
                  <CloseCircleTwoTone
                    style={styles.icClose}
                    twoToneColor="red"
                    onClick={() => remove(name)}
                  />
                )}
              </Row>
              <Row justify="space-between" gutter={10}>
                <Col xs={24} md={12} lg={6}>
                  <h3>{I18n.t(_t(translations.servicesDetail.duration))}</h3>
                  <Select
                    defaultValue="lucy"
                    onChange={this.handleChange}
                    style={styles.maxWidth}
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <h3>{I18n.t(_t(translations.servicesDetail.priceType))}</h3>
                  <Select
                    defaultValue="lucy"
                    onChange={this.handleChange}
                    style={styles.maxWidth}
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <h3>Price</h3>
                  <InputNumber
                    style={styles.maxWidth}
                    defaultValue={100}
                    formatter={(value: number | undefined) =>
                      `$ ${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                    }
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={this._onChangeNumber}
                  />
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <h3>
                    {I18n.t(_t(translations.servicesDetail.specialPrice))}
                  </h3>
                  <InputNumber
                    style={styles.maxWidth}
                    defaultValue={100}
                    formatter={(value: number | undefined) =>
                      `$ ${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                    }
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={this._onChangeNumber}
                  />
                </Col>
              </Row>
              <Col>
                <h3>{I18n.t(_t(translations.servicesDetail.pricingName))}</h3>
                <Input placeholder="e.g. Long hair" />
              </Col>
              <Col>
                <Button
                  type="link"
                  size="large"
                  onClick={() =>
                    this.setState({
                      isModalVisible: !this.state.isModalVisible,
                    })
                  }
                >
                  {I18n.t(_t(translations.servicesDetail.advancedPricing))}
                </Button>
              </Col>
            </Space>
          </Row>
          {this.renderModal()}
        </Col>
      ))}
      <Form.Item>
        <Button
          type="link"
          size="large"
          icon={<PlusCircleTwoTone />}
          onClick={() => add()}
        >
          {I18n.t(_t(translations.servicesDetail.addPricingOption))}
        </Button>
      </Form.Item>
    </>
  );

  renderModal = () => {
    return (
      <Modal
        style={{ minWidth: "70%" }}
        title="Advanced pricing options"
        visible={this.state.isModalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Col span={24}>
          <h2>Default pricing options</h2>
          <Row justify="space-between" gutter={10}>
            <Col xs={24} md={12} lg={6}>
              <h3>{I18n.t(_t(translations.servicesDetail.duration))}</h3>
              <Select
                defaultValue="lucy"
                onChange={this.handleChange}
                style={styles.maxWidth}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <h3>{I18n.t(_t(translations.servicesDetail.priceType))}</h3>
              <Select
                defaultValue="lucy"
                onChange={this.handleChange}
                style={styles.maxWidth}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <h3>Price</h3>
              <InputNumber
                style={styles.maxWidth}
                defaultValue={100}
                formatter={(value: number | undefined) =>
                  `$ ${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                }
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={this._onChangeNumber}
              />
            </Col>
            <Col xs={24} md={12} lg={6}>
              <h3>{I18n.t(_t(translations.servicesDetail.specialPrice))}</h3>
              <InputNumber
                style={styles.maxWidth}
                defaultValue={100}
                formatter={(value: number | undefined) =>
                  `$ ${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                }
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={this._onChangeNumber}
              />
            </Col>
          </Row>
          <Divider />
          <Col style={styles.cardPricing}>
            <Row>
              <Space direction="vertical" size="middle" style={styles.maxWidth}>
                <Col>
                  <h2 style={{ fontWeight: "bold", marginBottom: 0 }}>
                    Price by staff
                  </h2>
                  <h3 style={{ marginBottom: 0 }}>
                    Add the pricing options for each staff member.
                  </h3>
                </Col>

                {listStaff.map((item) => {
                  return (
                    <Row justify="space-between" gutter={10}>
                      <Col xs={24} md={24} lg={24} xl={6}>
                        <Space direction="horizontal" size="small">
                          <Avatar size={avatarSize} src={url} />
                          <Col>
                            <h2>{item.name}</h2>
                            <Text>{item.pos} </Text>
                          </Col>
                        </Space>
                      </Col>
                      <Col xs={24} md={12} lg={12} xl={4}>
                        <h3>
                          {I18n.t(_t(translations.servicesDetail.duration))}
                        </h3>
                        <Select
                          defaultValue="lucy"
                          onChange={this.handleChange}
                          style={styles.maxWidth}
                        >
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                      </Col>
                      <Col xs={24} md={12} lg={12} xl={4}>
                        <h3>
                          {I18n.t(_t(translations.servicesDetail.priceType))}
                        </h3>
                        <Select
                          defaultValue="lucy"
                          onChange={this.handleChange}
                          style={styles.maxWidth}
                        >
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                      </Col>
                      <Col xs={24} md={24} lg={24} xl={5}>
                        <h3>Price</h3>
                        <InputNumber
                          style={styles.maxWidth}
                          defaultValue={100}
                          formatter={(value: number | undefined) =>
                            `$ ${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                          }
                          parser={(value: any) =>
                            value.replace(/\$\s?|(,*)/g, "")
                          }
                          onChange={this._onChangeNumber}
                        />
                      </Col>
                      <Col xs={24} md={24} lg={24} xl={5}>
                        <h3>
                          {I18n.t(_t(translations.servicesDetail.specialPrice))}
                        </h3>
                        <InputNumber
                          style={styles.maxWidth}
                          defaultValue={100}
                          formatter={(value: number | undefined) =>
                            `$ ${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                          }
                          parser={(value: any) =>
                            value.replace(/\$\s?|(,*)/g, "")
                          }
                          onChange={this._onChangeNumber}
                        />
                      </Col>
                    </Row>
                  );
                })}
              </Space>
            </Row>
          </Col>
        </Col>
      </Modal>
    );
  };

  _onSwitch = (checked: boolean) => {
    this.setState({ switchExtraTime: checked });
  };
  handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  _onChangeNumber = (value: number) => {
    console.log("changed", value);
  };
  handleOk = () => {
    this.setState({ isModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
}
