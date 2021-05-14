import React from "react";
import { Layout, Tabs } from "antd";
import { I18n, _t, translations } from "utils";
import WorkingHours from "pages/Staff/components/WorkingHours";
import ClosedDates from "pages/Staff/components/ClosedDates";
import StaffMembers from "pages/Staff/components/StaffMembers";

const { TabPane } = Tabs;

class StaffPage extends React.Component {
  render() {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        {this.renderTabs()}
      </Layout>
    );
  }
  renderTabs() {
    function _onChangeTab(key: string) {
      console.log(key);
    }
    return (
      <Tabs onChange={_onChangeTab} style={{ margin: "0px" }} type="card">
        <TabPane tab="Staff Working Hours" key="Tab1">
          <WorkingHours />
        </TabPane>
        <TabPane tab="Closed Dates" key="Tab2">
          <ClosedDates />
        </TabPane>
        <TabPane tab="Staff Member" key="Tab3">
          <StaffMembers />
        </TabPane>
      </Tabs>
    );
  }
}

export default StaffPage;
