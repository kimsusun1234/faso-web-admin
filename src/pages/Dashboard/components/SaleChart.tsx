import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import { Typography, Select } from "antd";
import { I18n, _t, translations } from "utils";
import { getFakeSaleData } from "utils/fakeData";
import { lineChartConfig } from "utils/configurations";
import styles from "./styles";
import {getOrderChartData} from './DataVisualizeHelper'
import { setConstantValue } from "typescript";


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
    // setTimeout(() => {
    //   setData(getFakeSaleData(isMonth));
    // }, 1500);
  }, [isMonth]);

  const getChartData = async () => {
    const result = await getOrderChartData(isMonth ? 'month' : 'week');
    //chart format
    const formated = result.map((element) => {
      return {
        day: `${getDayOfWeek(element.date!)} ${element.date?.getDate()}`,
        value: element.value,
        amount: element.amount,
        success: element.success
      }
    })
    setData(formated);
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
          Doanh số
        </Title>
        <Select
          defaultValue={mode}
          style={{ float: "right" }}
          onChange={onSelectChangeHandle}
        >
          <Option value="Week">Tuần</Option>
          <Option value="Month">Tháng</Option>
        </Select>
      </div>
      {renderSubTitle(isMonth)}
      {renderTotalSale(data)}
      {renderTotalAppointments(data)}
      {renderTotalSuccess(data)}
      <Line data={data} {...lineChartConfig} />
    </div>
  );
};

const renderSubTitle = (isMonth: boolean) => (
  <Text strong style={styles.chart.sub}>
    {isMonth ? '30 ngày qua' : '7 ngày qua'}
  </Text>
);

const renderTotalAppointments = (data: Array<any>) => {
  const total = data.reduce(
    (accumulator, element) => accumulator + element.amount,
    0
  );
  return (
    <Text style={{ ...styles.chart.sub, ...styles.chart.totalAppointment }}>{`Tổng số: ${total}`}</Text>
  );
};

const renderTotalSuccess = (data: Array<any>) => {
  const total: number = data.reduce(
    (accumulator, element) => accumulator + element.success,
    0
  );
  return (
    <Text style={{ ...styles.chart.sub, ...styles.chart.totalAppointment }}>{`Đơn hàng đã giao: ${total}`}</Text>
  );
};

const renderTotalSale = (data: Array<any>) => {
  const total: number= data.reduce(
    (accumulator, element) => accumulator + element.value,
    0
  );
  return <Title level={1} style={styles.chart.totalSale}>{`${total.toLocaleString()} VND`}</Title>;
};


const getDayOfWeek = (date: Date) => {

  var weekday = new Array(7);
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  return weekday[date.getDay()];

}


export default LineChart;
