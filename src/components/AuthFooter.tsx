import React from 'react';
import { Layout, Typography} from 'antd';
import { I18n, _t, translations } from 'utils';
const { Footer } = Layout;
const { Text } = Typography;

const AuthFooter = () => (
  <Footer style={{background: 'none', textAlign: 'center'}}>
    <Text>{I18n.t(_t(translations.login.footerCopyright))}</Text>
  </Footer>
);

export default AuthFooter;
