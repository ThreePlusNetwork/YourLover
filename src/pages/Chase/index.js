import React, { PureComponent } from 'react';
import { message, Layout } from 'antd';

import ExtraInfo from './ExtraInfo';
import Chasing from './Chasing';

import { moneyMap } from './Chasing/config';

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
      info: this.props.location.state,
      money: 300
    };
  }
  handleNextDay = () => {
    this.setState({ money: this.state.money + 100 });
  };
  handleReduceMoney = type => {
    const money = moneyMap.get(type);
    const newMoney = this.state.money - money;
    if (newMoney < 10) {
      message.info('大兄弟，钱包羞涩呢！');
      return false;
    }
    this.setState({ money: this.state.money - money });
    return true;
  };
  render() {
    const { info, money } = this.state;
    return (
      <Layout className="chase-page">
        <Header>
          <ExtraInfo money={money} handleNextDay={this.handleNextDay} />
        </Header>
        <Content>
          {info ? (
            <Chasing data={info} handleReduceMoney={this.handleReduceMoney} />
          ) : null}
        </Content>
      </Layout>
    );
  }
}

export default Chase;
