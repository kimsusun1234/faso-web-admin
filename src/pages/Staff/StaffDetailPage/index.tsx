import React from "react";
import {
  Input,
  Button,
  Layout,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  Select,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { I18n, _t, translations } from "utils";
import { Option } from "antd/lib/mentions";

const { Text, Title } = Typography;
const { TextArea } = Input;
class StaffDetailPage extends React.Component {
  onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  render() {
    return (
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        {this.renderHeader()}
        {this.renderForm()}
      </Layout>
    );
  }
  renderHeader = () => {
    return (
      <Col
        span={24}
        style={{
          // backgroundColor: "red",
          zIndex: 1,
          width: "100%",
        }}
      >
        <Row
          justify="space-between"
          style={{
            // position: "fixed",
            alignItems: "center",
            padding: 10,
            width: "100%",
          }}
        >
          <CloseOutlined style={{ fontSize: 18 }} />
          <Title>Add new staff</Title>
          <Button type="primary" size="large">
            Add staff
          </Button>
        </Row>
      </Col>
    );
  };
  renderForm = () => {
    return (
      <>
        <Col
          span={18}
          style={{
            backgroundColor: "white",
            alignSelf: "center",
            width: "100%",
            padding: 10,
            borderRadius: 10,
          }}
        >
          {this.formBasicInfo()}
        </Col>
      </>
    );
  };
  formBasicInfo = () => {
    return (
      <>
        <h2>Basic info</h2>
        <Divider style={{ marginTop: 0 }} />

        <Row style={{ alignItems: "center" }}>
          <Col xs={24} sm={24} xl={4}>
            aaaaaaaa
          </Col>
          <Col xs={24} sm={24} xl={20}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Row gutter={16}>
                <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
                  <Text>FirstName</Text>
                  <Input />
                </Col>
                <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
                  <Text>FirstName</Text>
                  <Input />
                </Col>
              </Row>
              <Col span={24}>
                <Text>FirstName</Text>
                <Input />
                <Text>This title will be visible to clients</Text>
              </Col>
            </Space>
          </Col>
          <Col span={24}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Notes</Text>
              (Optional)
            </Text>
            <TextArea
              onChange={(e: any) => console.log(e.target.value)}
              placeholder="Add private notes viewable in staff settings only"
            />
          </Col>
          {/* Contact///////////////////////////////////////////////////////// */}
          <Divider style={{ margin: "10px 0" }} />
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Col span={24}>
              <h3>Contact</h3>
              <Text>
                Staff contacts are confidential and won't be shared with your
                clients.
              </Text>
            </Col>
            <Col span={24}>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12}>
                  <Text>Email</Text>
                  <Input />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>Mobile Number</Text>
                  <Input.Group style={{ width: "100%" }}>
                    <Input style={{ width: "80%" }} defaultValue="" />
                    <Select defaultValue="Option1" style={{ width: "20%" }}>
                      <Option value="Option1">Option1</Option>
                      <Option value="Option2">Option2</Option>
                    </Select>
                  </Input.Group>
                </Col>
              </Row>
            </Col>
          </Space>
        </Row>
      </>
    );
  };
}

export default StaffDetailPage;
