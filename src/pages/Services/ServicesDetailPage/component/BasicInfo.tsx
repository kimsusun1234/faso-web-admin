import React from "react";
import { Input, Space, Card, Col, Divider, Select } from "antd";

import { I18n, _t, translations } from "utils";

import "../styles.css";
import styles from "../styles";

const { Option, OptGroup } = Select;
const { TextArea } = Input;

interface IProps {}
interface IStates {}
class BasicInfo extends React.Component<IProps, IStates> {
  state = {};
  render() {
    return (
      <>
        <Card
          style={styles.cardBorder}
          headStyle={{ fontSize: 20, fontWeight: "bold" }}
        >
          <Card.Meta
            title={I18n.t(_t(translations.servicesDetail.tBasicInfo))}
            description={I18n.t(_t(translations.servicesDetail.desBasicInfo))}
          />
          <Divider style={styles.dividerNoMargin} />
          <Space direction="vertical" size="middle" style={styles.maxWidth}>
            <Col>
              <h3>{I18n.t(_t(translations.servicesDetail.serviceName))}</h3>
              <Input />
            </Col>

            <Col>
              <h3>{I18n.t(_t(translations.servicesDetail.serviceCategory))}</h3>
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
            <Col>
              <h3>
                {I18n.t(_t(translations.servicesDetail.serviceDescription))}
              </h3>
              <TextArea
                onChange={(e: any) => console.log(e.target.value)}
                placeholder="Add a short description"
              />
            </Col>
            <Col>
              <h3>
                {I18n.t(_t(translations.servicesDetail.serviceAvailable))}
              </h3>
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
          </Space>
        </Card>
      </>
    );
  }
  handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
}

export default BasicInfo;
