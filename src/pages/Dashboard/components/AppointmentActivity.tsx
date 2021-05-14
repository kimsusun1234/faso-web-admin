import React, { useEffect, useState } from "react";
import { Typography, Layout, List, message, Spin, Row, Col, Empty } from "antd";
import styles from "./styles";
import InfiniteScroller from "react-infinite-scroller";
import { StringHelper } from "helpers";
import { I18n, _t, translations } from "utils";

const { Title, Link, Text } = Typography;
const { Header } = Layout;

const itemPerPage = 5;

const AppointmentsActivity = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [data, setData] = useState<FakeResultType>({data: []});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    initialLoad();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const initialLoad = async () => {
    try {
      setIsLoading(true);
      const result = await getData(0);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onLoadMore = async () => {
    console.log("Loading more.......Next page", data?.nextPage);
    setIsLoading(true);
    if (data?.nextPage == null) {
      message.info("No more item!");
      setIsLoading(false);
    } else {
      const result = await getData(data.nextPage);
      setData(
        (prevState): FakeResultType => {
          return {
            data: prevState!.data.concat(result.data),
            nextPage: result.nextPage,
            prevPage: result.prevPage,
            page: result.page,
          };
        }
      );
      setIsLoading(false);
    }
  };

  const renderListItem = (item: FakeDataType) => (
    <List.Item>
      <Link style={styles.list.listItemContainer}>
        <Row>
          <Col span={4}>
            <Title level={4} style={styles.list.textDate}>
              {item.date.getDate()}
            </Title>
            <Title level={5} style={styles.list.textDay}>
              {StringHelper.getDayOfWeek(item.date)}
            </Title>
          </Col>
          <Col span={16}>
            <Text style={styles.list.textDateTime}>
              {StringHelper.getDayOfWeek(item.date)}{" "}
              {item.date.toLocaleDateString()} {item.date.toLocaleTimeString()}
            </Text>
            <Text strong style={styles.list.textService}>
              {item.service}
            </Text>
            <Text style={styles.list.textCustomer}>
              {item.customer}, {item.estimate} with {item.stylist}
            </Text>
          </Col>
          <Col
            span={4}
            style={styles.list.colCost}
          >
            <Title level={4} style={styles.list.textCost}>
              ${item.cost}
            </Title>
          </Col>
        </Row>
      </Link>
    </List.Item>
  );

  return (
    <div
      style={isHover ? styles.list.containerHover : styles.list.container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Header style={styles.list.header}>
        <Title level={3}>{I18n.t(_t(translations.dashboard.listAppointmentsActivity))}</Title>
      </Header>
      <div style={styles.list.listContainer}>
        <InfiniteScroller
          pageStart={0}
          loadMore={onLoadMore}
          initialLoad={false}
          hasMore={!isLoading && data.nextPage !== undefined}
          useWindow={false}
          threshold={300}
        >
          <List dataSource={data?.data} renderItem={renderListItem}>
            {isLoading && (
              <div style={styles.list.loadingComponent}>
                <Spin size="large" />
              </div>
            )}
          </List>
        </InfiniteScroller>
      </div>
    </div>
  );
};

type FakeDataType = {
  id: number;
  date: Date;
  service: string;
  stylist: string;
  customer: string;
  estimate: string;
  cost: number;
  new: boolean;
};
type FakeResultType = {
  data: FakeDataType[];
  nextPage?: number;
  prevPage?: number;
  page?: number;
};
const fakeData: FakeDataType[] = [
  {
    id: 1,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 2,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 3,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 4,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 5,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 6,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 7,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 8,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 9,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 10,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 11,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 12,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 13,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 14,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 15,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 16,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 17,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 18,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 19,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 20,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 21,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
  {
    id: 22,
    date: new Date("Apr 30 2021 10:30:00"),
    service: "Balance/Fill (Regular Acrylic)",
    stylist: "Kenny",
    customer: "Hunter Mccorkie",
    estimate: "45min",
    cost: 27,
    new: true,
  },
];
const maxpage = Math.ceil(fakeData.length / itemPerPage);
console.log(maxpage);
const getData = (page: number) => {
  return new Promise<FakeResultType>((resolve, reject) => {
    if (page === 0) {
      const result: FakeResultType = {
        data: fakeData.slice(0, itemPerPage),
        nextPage: page + 1,
        page: page,
      };
      setTimeout(() => {
        resolve(result);
      }, 1500);
    } else if (page === 1) {
      const offset = itemPerPage;
      const result: FakeResultType = {
        data: fakeData.slice(offset - 1, offset - 1 + itemPerPage),
        nextPage: page == maxpage - 1 ? undefined : page + 1,
        prevPage: 0,
        page: page,
      };
      console.log("Result", result);
      setTimeout(() => {
        resolve(result);
      }, 1500);
    } else {
      const offset = page * itemPerPage;
      if (page > maxpage - 1) {
        const result: FakeResultType = {
          data: [],
          prevPage: page - 1,
          page: page,
        };
        resolve(result);
      } else {
        const result: FakeResultType = {
          data: fakeData.slice(offset - 1, offset - 1 + itemPerPage),
          nextPage: page === maxpage - 1 ? undefined : page + 1,
          prevPage: page === 0 ? undefined : page - 1,
          page: page,
        };
        console.log("Result", result);
        setTimeout(() => {
          resolve(result);
        }, 1500);
      }
    }
  });
};

export default AppointmentsActivity;
