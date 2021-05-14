import React from "react";
import { Layout, Tabs } from "antd";
import { I18n, _t, translations } from "utils";
import ServicesMenu from "pages/Services/components/ServicesMenu";

const { TabPane } = Tabs;

class ServicesPage extends React.Component {
  render() {
    return (
      <Layout style={style.container}>
        <Tabs onChange={this._onChangeTab} style={style.tab} type="card">
          <TabPane
            tab={I18n.t(_t(translations.services.servicesMenu))}
            key="TabPane1"
          >
            <ServicesMenu />
          </TabPane>
        </Tabs>
      </Layout>
    );
  }
  _onChangeTab = (key: string) => {
    console.log(key);
  };
}

const style = {
  container: {
    backgroundColor: "white",
    width: "100%",
  },
  tab: { marginTop: "0px" },
};
export default ServicesPage;
