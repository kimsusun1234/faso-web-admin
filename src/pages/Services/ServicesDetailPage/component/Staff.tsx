import React from "react";
import {
  Typography,
  Button,
  Space,
  Card,
  Col,
  Row,
  Divider,
  Switch,
  Select,
  Checkbox,
  Avatar,
} from "antd";

import { I18n, _t, translations } from "utils";

import "../styles.css";
import styles from "../styles";

const { Text, Title } = Typography;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Apple", "Pear", "Orange", "Banana"];
const defaultCheckedList = ["Apple", "Orange"];

interface IProps {}
interface IStates {
  checkedList: Array<any>;
  indeterminate: boolean;
  checkAll: boolean;
  showAllStaff: boolean;
}

export default class FormStaff extends React.Component<IProps, IStates> {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
    showAllStaff: false,
  };

  render() {
    return (
      <>
        <Card
          headStyle={{ fontSize: 20, fontWeight: "bold" }}
          style={styles.cardBorder}
        >
          <Card.Meta
            title="Staff"
            description="Assign staff to the service and manage staff commission"
          />
          <Divider style={{ margin: 0 }} />

          <Col span={24}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this._onCheckAllChange}
              checked={this.state.checkAll}
            >
              <h3>{I18n.t(_t(translations.servicesDetail.selectAll))}</h3>
            </Checkbox>
            <br />
            <CheckboxGroup
              style={styles.maxWidth}
              defaultValue={this.state.checkedList}
              value={this.state.checkedList}
              onChange={this._onChange}
            >
              <Space direction="vertical" size="small" style={styles.maxWidth}>
                <Row gutter={16}>
                  {plainOptions.map((e, i) => (
                    <Col
                      sm={24}
                      md={12}
                      style={
                        !this.state.showAllStaff
                          ? i > 1
                            ? { marginTop: 10, display: "none" }
                            : { marginTop: 10 }
                          : { marginTop: 10 }
                      }
                    >
                      <Checkbox value={e}>
                        <Avatar
                          size="large"
                          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg"
                        />
                        <Text>{" " + e}</Text>
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
                <Button
                  size="large"
                  type="link"
                  onClick={() =>
                    this.setState({ showAllStaff: !this.state.showAllStaff })
                  }
                  style={styles.btnShowStaff}
                >
                  {I18n.t(_t(translations.servicesDetail.seeAllStaff))}
                </Button>
              </Space>
            </CheckboxGroup>
          </Col>
          <Divider style={styles.dividerNoMargin} />
          <Col>
            <h2>{I18n.t(_t(translations.servicesDetail.tStaffCommission))}</h2>
            <Text>
              {I18n.t(_t(translations.servicesDetail.tDesCalculateStaff))}
            </Text>
          </Col>

          <Space
            direction="horizontal"
            size="middle"
            style={styles.maxWidthSpace}
          >
            <Switch defaultChecked onChange={this._onSwitch} />
            <Text>{I18n.t(_t(translations.servicesDetail.enableStaff))}</Text>
          </Space>
        </Card>
      </>
    );
  }
  _onChange = (list: Array<any>) => {
    this.setState({
      checkedList: list,
      indeterminate: !!list.length && list.length < plainOptions.length,
      checkAll: list.length === plainOptions.length,
    });
  };

  _onCheckAllChange = (e: any) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  _onSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
}
