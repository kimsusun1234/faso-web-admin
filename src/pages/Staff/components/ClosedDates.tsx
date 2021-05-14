import React, { Component } from "react";
import { Button, Col, Row, Space, Table, DatePicker, Input } from "antd";
import Modal from "antd/lib/modal/Modal";

interface IStates {
  loading: boolean;
  visible: boolean;
}

interface IProps {}

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const data = [
  {
    key: "1",
    dateRange: "Sun, 01 Apr 2018 - Sun, 01 Apr 2018",
    noOfDay: "1 Day",
    locations: "Glow Nail Bar",
    description: "Easter",
  },
  {
    key: "2",
    dateRange: "Mon, 28 May 2018 - Mon, 28 May 2018",
    noOfDay: "2 Days",
    locations: "Glow Nail Bar",
    description: "Memorial Day",
  },
  {
    key: "3",
    dateRange: "Wed, 04 Jul 2018 - Wed, 04 Jul 2018",
    noOfDay: "3 Days",
    locations: "Glow Nail Bar",
    description: "July 4th",
  },
];

const columns = [
  {
    title: "DATE RANGE",
    dataIndex: "dateRange",
    key: "dateRange",
  },
  {
    title: "NO. OF DAYS",
    dataIndex: "noOfDay",
    key: "noOfDay",
  },
  {
    title: "LOCATIONS",
    dataIndex: "locations",
    key: "locations",
  },
  {
    title: "DESCRIPTION",
    key: "description",
    dataIndex: "description",
  },
];

export default class ClosedDates extends Component<IProps, IStates> {
  state = {
    loading: false,
    visible: false,
  };
  render() {
    return (
      <>
        <Space
          direction="vertical"
          style={{
            display: "flex",
            width: "100%",
          }}
          size="small"
        >
          <Row justify="end">
            <Col>
              <Button type="primary" onClick={() => alert("1233")}>
                New Closed Date
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data}
                onRow={(record, rowIndex) => {
                  this.renderModal(record);
                  return {
                    onClick: (event) => {
                      this.setState({ visible: !this.state.visible });
                    }, // click row
                    onDoubleClick: (event) => {}, // double click row
                    onContextMenu: (event) => {}, // right button click row
                    onMouseEnter: (event) => {}, // mouse enter row
                    onMouseLeave: (event) => {}, // mouse leave row
                  };
                }}
              />
              {this.renderModal("acs")}
            </Col>
          </Row>
        </Space>
      </>
    );
  }

  renderModal = (data: any) => {
    const handleOk = () => {
      this.setState({ visible: false, loading: false });
    };
    const handleCancel = () => {
      this.setState({ visible: false });
    };
    return (
      <Modal
        visible={this.state.visible}
        title="Edit Closed Date"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Row justify="space-between">
            <Col>
              <Button
                key="back"
                onClick={handleCancel}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </Button>
            </Col>

            <Col>
              <Button
                key="submit"
                type="primary"
                loading={this.state.loading}
                onClick={handleOk}
              >
                Cancel
              </Button>
              <Button
                key="link"
                loading={this.state.loading}
                onClick={handleOk}
              >
                Save
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <Space
          direction="vertical"
          style={{
            display: "flex",
            width: "100%",
          }}
          size="middle"
        >
          <h4
            style={{
              alignSelf: "center",
              backgroundColor: "snow",
              paddingTop: "5px",
              paddingBottom: "5px",
              paddingInline: "10px",
            }}
          >
            Online bookings can not be placed during closed dates
          </h4>
          <RangePicker style={{ display: "flex" }} />
          <h4>DESCRIPTIONS</h4>
          <TextArea
            style={{ marginTop: "-16px" }}
            autoSize
            //  value={data.description}
          />
        </Space>
      </Modal>
    );
  };
}
