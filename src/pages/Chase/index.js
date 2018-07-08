import React, { PureComponent } from 'react';
import { message, Layout } from 'antd';

import ExtraInfo from './ExtraInfo';
import Chasing from './Chasing';

import './style.less';

const { Header, Content } = Layout;
class Chase extends PureComponent {
  constructor(props) {
    super(props);
    if (!this.props.location.state) {
      message.error('请先选择心仪对象噢～', 1, () => {
        this.props.history.push('/');
      });
    }
    this.state = {
      info: this.props.location.state
    };
  }

  render() {
    const { info } = this.state;
    return (
      <Layout className="chase-page">
        <Header>
          <ExtraInfo />
        </Header>
        <Content>{info ? <Chasing data={info} /> : null}</Content>
      </Layout>
    );
  }
}

export default Chase;
