import React from "react";
import { Typography, Space, Card, Divider, Switch } from "antd";
import { I18n, _t, translations } from "utils";

import "../styles.css";
import styles from "../styles";

const { Text } = Typography;

interface IProps {}
interface IStates {}
class FormOnlineBooking extends React.Component<IProps, IStates> {
  state = {};
  render() {
    return (
      <>
        <Card
          headStyle={{ fontSize: 20, fontWeight: "bold" }}
          style={styles.cardBorder}
        >
          <Card.Meta
            title={I18n.t(_t(translations.servicesDetail.onlineBooking))}
            description={I18n.t(
              _t(translations.servicesDetail.desOnlineBooking)
            )}
          />
          <Divider style={styles.dividerNoMargin} />
          <Space direction="horizontal" size="middle" style={styles.maxWidth}>
            <Switch defaultChecked onChange={this._onSwitch} />
            <Text>
              {I18n.t(_t(translations.servicesDetail.enableBookings))}
            </Text>
          </Space>
        </Card>
      </>
    );
  }
  _onSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
}

export default FormOnlineBooking;
