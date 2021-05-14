import React from "react";
import { Calendar, Views, View, momentLocalizer } from "react-big-calendar";
import { Popover, Avatar, Typography, Space } from "antd";
import moment from "moment";
import "./style.css";
import { StringHelper } from "helpers";
const { Title } = Typography;
const globalizeLocalizer = momentLocalizer(moment);
const events = [
  {
    id: 0,
    title: "Board meeting",
    desc: "TSFSADASDSA",
    start: moment().toDate(),
    end: moment().add(1, "hours").toDate(),
    resourceId: 1,
  },
  {
    id: 2,
    title: "Team lead meeting",
    desc: "TSFSADASDSA",
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: "Birthday Party",
    desc: "TSFSADASDSA",
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
];

const resourceMap = [
  { resourceId: 1, resourceTitle: "Board room" },
  { resourceId: 2, resourceTitle: "Training room" },
  { resourceId: 3, resourceTitle: "Meeting room 1" },
  { resourceId: 4, resourceTitle: "Meeting room 2" },
  { resourceId: 5, resourceTitle: "Meeting room 4" },
  { resourceId: 6, resourceTitle: "Meeting room 5" },
  { resourceId: 7, resourceTitle: "Meeting room 4" },
  { resourceId: 8, resourceTitle: "Meeting room 5" },
];

class MainCalendar extends React.Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <Calendar
          selectable
          onSelectSlot={() => alert(1)}
          onSelecting={() => false}
          events={events}
          localizer={globalizeLocalizer}
          defaultView={"day"}
          views={["day", "work_week"]}
          step={15}
          timeslots={4}
          style={{ height: "calc(100vh - 6em)" }}
          defaultDate={new Date()}
          scrollToTime={new Date()}
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          eventPropGetter={(event) => {
            return {
              style: {
                backgroundColor: "red",
                border: "none",
              },
            };
          }}
          components={{
            resourceHeader: (resource) => {
              return (
                <Space
                  direction="vertical"
                  style={{
                    height: 80,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    paddingTop: 16,
                    backgroundColor: "#f0f2f5",
                  }}
                >
                  <Avatar>
                    {StringHelper.getShortName(
                      resource.label?.toString()!
                    )?.toUpperCase()}
                  </Avatar>
                  <Title level={5}>{resource.label?.toString()!} </Title>
                </Space>
              );
            },
            timeSlotWrapper: (slot: any) => {
              var isWorkingTime = this.isWorkingTime(slot.value);
              return (
                <div
                  className={`time-slot ${
                    isWorkingTime ? "" : "out-working-time-slot"
                  }`}
                  style={{
                    backgroundImage: isWorkingTime
                      ? ""
                      : `url(${process.env.PUBLIC_URL}/calendar_unavailable_slot_background.svg)`,
                  }}
                >
                  <div className="time-label">
                    <h5 style={{ margin: 4 }}>
                      {moment(slot.value).format("h:mmA")}
                    </h5>
                  </div>
                </div>
              );
            },

            eventWrapper: (event) => {
              return (
                <Popover
                  style={{ zIndex: 100 }}
                  placement="right"
                  content={() => (
                    <div>
                      <p>Content</p>
                      <p>Content</p>
                    </div>
                  )}
                >
                  {event.children}
                </Popover>
              );
            },
            // event: (event) => {
            //   return (
            //     <div style={{backgroundColor:'green'}} >
            //       <strong>{event.event.title}</strong>
            //       {event.event.desc}
            //     </div>
            //   );
            // },
          }}
        />
      </div>
    );
  }

  isWorkingTime(time: Date) {
    const timeCal = moment(time).minutes() + moment(time).hours() * 60;
    return timeCal > 600 && timeCal < 18 * 60;
  }
}

export default MainCalendar;
