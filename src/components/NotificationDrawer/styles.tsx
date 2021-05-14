const styles: any = {
  listItem: {
    wrapper: {
      padding: '0 0 16px 0'
    },
    link: {
      display: 'flex',
      width: '100%', 
      height: '115px', 
      flexDirection: 'row',
      // backgroundColor: '#f0f2f5'
    },
    avatar: {
      flex: 1, 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center',
      paddingRight: '5px'
    },
    textContainer: {
      flex: 3, 
      height: '100%',
      flexDirection: 'column'
    },
    titleRead: {
      fontSize: '14px',
      // margin: 0,
      lineHeight: '16px'
    },
    titleUnread: {
      fontSize: '14px',
      fontWeight: 'bold',
      // margin: 0,
      lineHeight: '16px'
    },
    content: {
      fontSize: '14px',
      // margin: 0,
      lineHeight: '16px'
    },
    time: {
      flex: 1, 
      height: '100%', 
      textAlign: 'right', 
      color: 'black'
    },
    divider: {margin: '4px'}
  }
};

export default styles;
