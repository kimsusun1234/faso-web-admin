import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/charts";
import { Typography, Select } from "antd";
import { I18n, _t, translations } from "utils";
import { getFakeAppointmentData } from "utils/fakeData";
import { columnChartConfig } from "utils/configurations";
import styles from "./styles";
import { getStatusOrderChartData } from "./DataVisualizeHelper";

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
    getChartData()
    // setTimeout(() => {
    //   setData(getFakeAppointmentData(isMonth));
    // }, 1500);
  }, [isMonth]);

  const getChartData = async () => {
    const result = await getStatusOrderChartData(isMonth ? 'month' : 'week');
    //chart format
    const formated = result.map((element) => {
      return {
        day: `${getDayOfWeek(element.date!)} ${element.date?.getDate()}`,
        value: element.value,
        amount: element.amount,
        status: element.status,
        total: element.totalOrder
      }
    })
    console.log(formated);
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
          Đơn hàng
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
      {renderTotalBook(data)}
      {renderConfirmedApp(data, "Success")}
      {renderConfirmedApp(data, "Failed")}
      <Column data={data} {...columnChartConfig} />
    </div>
  );
};

const renderSubTitle = (isMonth: boolean) => (
  <Text strong style={styles.chart.sub}>
    {isMonth ? '30 ngày qua' : '7 ngày qua'}
  </Text>
);

const renderConfirmedApp = (data: Array<any>, type: string) => {
  const filtered = data.filter((element) => element.status === type);
  const total = filtered.reduce(
    (accumulator, element) => accumulator + element.amount,
    0
  );
  return (
    <Text style={{ ...styles.chart.sub, ...styles.chart.totalAppointment }}>{`${
      type === "Success"
        ? 'Giao thành công'
        : 'Giao thất bại'
    }: ${total}`}</Text>
  );
};

const renderTotalBook = (data: Array<any>) => {
  const total = data.reduce(
    (accumulator, element) => accumulator + element.amount,
    0
  );
  return <Title level={1} style={styles.chart.totalSale}>{`${data[0] ? data[0].total : 0} đơn hàng`}</Title>;
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
