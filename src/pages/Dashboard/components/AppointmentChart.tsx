import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/charts";
import { Typography, Select } from "antd";
import { I18n, _t, translations } from "utils";
import { getFakeAppointmentData } from "utils/fakeData";
import { columnChartConfig } from "utils/configurations";
import styles from "./styles";

const { Text, Title } = Typography;
const { Option } = Select;

interface IProps {}

const LineChart = (props: IProps) => {
  const [isMonth, setIsMonth] = useState(false);
  const [mode, setMode] = useState("Week");
  const [data, setData] = useState<Array<any>>([]);
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "Week") {
      setIsMonth(false);
    } else {
      setIsMonth(true);
    }
  }, [mode]);

  useEffect(() => {
    setTimeout(() => {
      setData(getFakeAppointmentData(isMonth));
    }, 1500);
  }, [isMonth]);

  const onSelectChangeHandle = (value: string) => {
    setMode(value);
  };

  return (
    <div style={isHover ? styles.chart.containerHover : styles.chart.container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div>
        <Title level={3} style={styles.chart.title}>
          {I18n.t(_t(translations.dashboard.columnChartAppointmentTitle))}
        </Title>
        <Select
          defaultValue={mode}
          style={{ float: "right" }}
          onChange={onSelectChangeHandle}
        >
          <Option value="Week">Week</Option>
          <Option value="Month">Month</Option>
        </Select>
      </div>
      {renderSubTitle()}
      {renderTotalBook(data)}
      {renderConfirmedApp(data, "Confirmed")}
      {renderConfirmedApp(data, "Cancelled")}
      <Column data={data} {...columnChartConfig} />
    </div>
  );
};

const renderSubTitle = () => (
  <Text strong style={styles.chart.sub}>
    {I18n.t(_t(translations.dashboard.lineChartSaleSubMonth))}
  </Text>
);

const renderConfirmedApp = (data: Array<any>, type: string) => {
  const filtered = data.filter((element) => element.status === type);
  const total = filtered.reduce(
    (accumulator, element) => accumulator + element.appointment,
    0
  );
  return (
    <Text style={{ ...styles.chart.sub, ...styles.chart.totalAppointment }}>{`${
      type === "Confirmed"
        ? I18n.t(_t(translations.dashboard.columnChartConfirmedAppointment))
        : I18n.t(_t(translations.dashboard.columnChartCancelledAppointment))
    }: ${total}`}</Text>
  );
};

const renderTotalBook = (data: Array<any>) => {
  const total = data.reduce(
    (accumulator, element) => accumulator + element.value,
    0
  );
  return <Title level={1} style={styles.chart.totalSale}>{`${total} đơn hàng`}</Title>;
};

export default LineChart;
