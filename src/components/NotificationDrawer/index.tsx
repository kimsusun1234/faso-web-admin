import { UserOutlined } from '@ant-design/icons';
import { Avatar, Drawer, List, Typography, Button, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppConfig } from 'redux/actions';
import { RootState } from 'redux/configuration/rootReducer';
import styles from './styles';
import { defPad } from 'styles';
import { I18n, _t, translations } from "utils";

const { Paragraph, Link, Title} = Typography;

interface IProps extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps>{}
interface IState {}

// const count = 10;

class NotiDrawer extends Component<IProps, IState> {
  render() {
    return (
      <Drawer
        visible={this.props.isShow}
        title={this.renderTitle()}
        placement="right"
        closable={true}
        onClose={() => this.props.setShow(false)}
        width={375}
        >
        <List
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={fakeData}
          renderItem={this.renderItem}
          loadMore={this.renderReadAll()} />
      </Drawer>
    );
  }
  state = {
    visible: false
  }

  renderItem(item: any) {
    return (
      <>
      <List.Item style={styles.listItem.wrapper}>
        <Link 
          draggable={false}
          href="/" 
          style={{...styles.listItem.link, ...defPad}}>
          <div style={styles.listItem.avatar}>
            <Avatar
              size={{ xs: 60, sm: 60, md: 60, lg: 50, xl: 50, xxl: 50 }}
              icon={<UserOutlined />} />
          </div>
          <div style={styles.listItem.textContainer}>
            <Paragraph
              ellipsis={{rows: 2, expandable: false, suffix: '.'}}
              style={item.isRead ? styles.listItem.title : styles.listItem.titleUnread}>
                  {item.title}. This is a very very very long title to test if the text would be ellipse
            </Paragraph>
            <Paragraph 
              ellipsis={{rows: 3, expandable: false, suffix: '.'}}
              style={styles.listItem.content}>
                  {item.content}. This is a very very very long content to test if the text would be ellipse. This is a very very very long content to test if the text would be ellipse
            </Paragraph>
          </div>
          <div style={styles.listItem.time}>{new Date(item.time).toLocaleTimeString().substring(0, 5)}</div>
        </Link>
      </List.Item>
      {/* <Divider style={styles.listItem.divider} /> */}
      </>
    );
  };

  renderTitle() {
    return (
      <Title level={3}>{I18n.t(_t(translations.notiDrawer.drawerTitle))}</Title>
    );
  }

  renderReadAll() {
    return (
      <div style={{textAlign: 'center', marginTop: '16px'}}>
        <Button
          onClick={() => message.info("Read all Clicked!", 1000)}>
          Read all
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isShow: state.AppConfigReducer.showNotification
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setShow: (visible: boolean) => dispatch(AppConfig.showNotification.request(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotiDrawer);

const fakeData = [
  {
    "id": "1",
    "title": "title 1",
    "content": "content 1",
    "time": 1619596551,
    isRead: true
  },
  {
    "id": "2",
    "title": "title 2",
    "content": "content 2",
    "time": 1619596491,
    isRead: false
  },
  {
    "id": "3",
    "title": "title 3",
    "content": "content 3",
    "time": 1619596431,
    isRead: false
  },
  {
    "id": "4",
    "title": "title 4",
    "content": "content 4",
    "time": 1619596371,
    isRead: false
  },
  {
    "id": "5",
    "title": "title 5",
    "content": "content 5",
    "time": 1619596311,
    isRead: true
  },
  {
    "id": "6",
    "title": "title 6",
    "content": "content 6",
    "time": 1619596251,
    isRead: false
  },
  {
    "id": "7",
    "title": "title 7",
    "content": "content 7",
    "time": 1619596191,
    isRead: false
  },
  {
    "id": "8",
    "title": "title 8",
    "content": "content 8",
    "time": 1619596131,
    isRead: true
  },
  {
    "id": "9",
    "title": "title 9",
    "content": "content 9",
    "time": 1619596071,
    isRead: false
  },
  {
    "id": "10",
    "title": "title 10",
    "content": "content 10",
    "time": 1619596011,
    isRead: true
  }
]