export const columnChartConfig = {
  isGroup: true,
  xField: "day",
  yField: "value",
  seriesField: "status",
  colorField: "status", // or seriesField in some cases
  color: ({ status }: any) => {
    if (status === "Success") {
      return "#3347ff";
    }
    return "#d60000";
  },
};

export const lineChartConfig = {
  xField: "day",
  yField: "value",
  label: {},
  point: {
    //Config of the line-most point
    size: 5,
    shape: "circle",
    style: {
      fill: "#5B8FF9",
      stroke: "#f2f2f2",
      lineWidth: 2, //width of the stroke
    },
  },
  tooltip: { showMarkers: false }, //The small circle inside the point
  state: {
    active: {
      style: {
        shadowColor: "yellow",
        shadowBlur: 4,
        stroke: "transparent",
        fill: "red",
      },
    },
  },
  theme: {
    geometries: {
      point: {
        circle: {
          active: {
            //theme when user hover to the point
            style: {
              shadowColor: "#f6d116",
              shadowBlur: 1,
              stroke: "#f6d116",
            },
          },
        },
      },
    },
  },
  interactions: [{ type: "marker-active" }]
};
