import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import { Typography, Select } from "antd";
import { I18n, _t, translations } from "utils";
import { getFakeSaleData } from "utils/fakeData";
import { lineChartConfig } from "utils/configurations";
import styles from "./styles";
import visualizeData from './DataVisualizeHelper'


const { Text, Title } = Typography;
const { Option } = Select;

interface IProps { }

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
    getChartData()
    setTimeout(() => {
      setData(getFakeSaleData(isMonth));
    }, 1500);
  }, [isMonth]);

  const getChartData = async () => {
    const result = await visualizeData(isMonth ? 'month' : 'week');
    console.log(result)
  }

  const onSelectChangeHandle = (value: string) => {
    setMode(value);
  };

  return (
    <div style={isHover ? styles.chart.containerHover : styles.chart.container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div>
        <Title level={3} style={styles.chart.title}>
          {I18n.t(_t(translations.dashboard.lineChartSaleTitle))}
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
      {renderTotalSale(data)}
      {renderTotalAppointments(data)}
      {renderTotalSuccess(data)}
      <Line data={data} {...lineChartConfig} />
    </div>
  );
};

const renderSubTitle = () => (
  <Text strong style={styles.chart.sub}>
    {I18n.t(_t(translations.dashboard.lineChartSaleSubWeek))}
  </Text>
);

const renderTotalAppointments = (data: Array<any>) => {
  const total = data.reduce(
    (accumulator, element) => accumulator + element.appointment,
    0
  );
  return (
    <Text style={{ ...styles.chart.sub, ...styles.chart.totalAppointment }}>{`${I18n.t(
      _t(translations.dashboard.lineChartAppointment)
    )}: ${total}`}</Text>
  );
};

const renderTotalSuccess = (data: Array<any>) => {
  const total = data.reduce(
    (accumulator, element) => accumulator + element.appointment,
    0
  );
  return (
    <Text style={{ ...styles.chart.sub, ...styles.chart.totalAppointment }}>{`${I18n.t(
      _t(translations.dashboard.lineChartConfirm)
    )}: ${total}`}</Text>
  );
};

const renderTotalSale = (data: Array<any>) => {
  const total = data.reduce(
    (accumulator, element) => accumulator + element.value,
    0
  );
  return <Title level={1} style={styles.chart.totalSale}>{`${total} VND`}</Title>;
};





export default LineChart;
