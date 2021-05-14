const styles: any = {
  chart: {
    container: {
      backgroundColor: "white",
      padding: "16px",
      boxShadow: "#00000038 5px 5px 10px",
    },
    containerHover: {
      backgroundColor: "white",
      padding: "16px",
      boxShadow: "#00000038 5px 5px 10px",
    },
    title: {
      margin: "0",
      display: "inline-block",
    },
    sub: {
      display: "block",
      color: "grey",
    },
    totalSale: {
      margin: "16px 0",
      display: "inline-block",
    },
    totalAppointment: {
      margin: "0 0 20px 0",
    },
  },
  list: {
    container: {
      backgroundColor: "white",
      // padding: "16px",
      boxShadow: "#00000038 5px 5px 10px",
      height: "500px",
      display: "flex",
      flexDirection: "column",

    },
    containerHover: {
      backgroundColor: "white",
      // padding: "16px",
      boxShadow: "#00000038 5px 5px 10px",
      height: "500px",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      background: "none",
      padding: "16px",
      boxShadow: "0px 10px 10px -10px #888",
    },
    listContainer: {
      height: "100%",
      overflow: "auto",
    },
    listItemContainer: {
      width: "100%",
    },
    textDate: {
      margin: 0,
      fontWeight: "bold",
    },
    textDay: {
      margin: 0,
    },
    textDateTime: {
      fontSize: "15px",
      display: "block",
      color: "grey",
    },
    textService: {
      fontSize: "17px",
      display: "block",
    },
    textCustomer: {
      fontSize: "17px",
      display: "block",
      color: "grey",
    },
    colCost: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
    },
    textCost: {
      margin: 0,
      fontWeight: "bold",
    },
    loadingComponent: {
      textAlign: "center",
      padding: "16px 0",
    },
  },
};

export default styles;
