import { Component } from "react";
import { Typography, Space, Card, Col, Divider, Switch, Select } from "antd";

import { I18n, _t, translations } from "utils";

import "../styles.css";
import styles from "../styles";

const { Text } = Typography;
const { Option, OptGroup } = Select;

export default class SalesSettings extends Component {
  state = {
    switchSettingSales: false,
  };
  render() {
    return (
      <>
        <Card
          style={styles.cardBorder}
          headStyle={{ fontSize: 20, fontWeight: "bold" }}
        >
          <Card.Meta
            title={I18n.t(_t(translations.servicesDetail.salesSettings))}
          />
          <Divider style={styles.dividerSpaceTop} />
          <Space direction="vertical" size="middle" style={styles.maxWidth}>
            <Col>
              <h2>{I18n.t(_t(translations.servicesDetail.setTaxRate))}</h2>
              <h3>
                Tax <Text>(Added to price)</Text>
              </h3>
              <Select
                defaultValue="lucy"
                style={styles.maxWidth}
                onChange={this.handleChange}
              >
                <OptGroup label="Manager">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </OptGroup>
                <OptGroup label="Engineer">
                  <Option value="Yiminghe">yiminghe</Option>
                </OptGroup>
              </Select>
            </Col>

            <Col>
              <Space style={styles.maxWidth} direction="vertical" size="small">
                <h3>{I18n.t(_t(translations.servicesDetail.voucherSales))}</h3>
                <Space
                  direction="horizontal"
                  size="middle"
                  style={styles.maxWidth}
                >
                  <Switch onChange={this._onSwitch} />
                  <Text>
                    {I18n.t(_t(translations.servicesDetail.enableVoucherSales))}
                  </Text>
                </Space>
                {this.state.switchSettingSales && (
                  <Col>
                    <h4>
                      {I18n.t(
                        _t(translations.servicesDetail.voucherExpiryPeriod)
                      )}
                    </h4>
                    <Select
                      defaultValue="lucy"
                      style={styles.maxWidth}
                      onChange={this.handleChange}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled" disabled>
                        Disabled
                      </Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </Col>
                )}
              </Space>
            </Col>
          </Space>
        </Card>
      </>
    );
  }
  _onSwitch = (checked: boolean) => {
    this.setState({ switchSettingSales: checked });
  };
  handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
}
