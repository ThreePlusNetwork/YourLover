import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Button, Modal } from 'antd';

import { getChasingInfo } from 'api';

import './style.less';

class ExtraInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 默认值
      day: 1,
      weather: '晴',
      date: moment(new Date())
        .format('YYYY-MM-DD')
        .split('-')
    };
  }

  componentDidMount() {
    this._isMounted = true;
    getChasingInfo().then(res => {
      if (res.code === 0) {
        const { firstMeetTime } = res.data;

        this.dateTimer = setInterval(() => {
          const { day, date } = this.state;
          const currentDate = new Date();

          const newDay = Math.ceil(
            (currentDate.getTime() - firstMeetTime) / 1000 / 60 / 60 / 24
          );

          const newDate = moment(new Date())
            .format('YYYY-MM-DD')
            .split('-');

          // if (day !== newDay || date[2] !== newDate[2]) {
          if (date[2] !== newDate[2]) {
            this.setState({
              // day: newDay,
              date: newDate,
              weather: this.getRandomWeather()
            });
          }
        }, 1000);
      }
    });
  }

  componentWillUnMount() {
    this._isMounted = false;
    clearInterval(this.dateTimer);
  }

  handleBack = () => {
    const self = this;
    Modal.confirm({
      title: '真的要放弃该妹子吗？',
      okText: '是的，撩不动',
      cancelText: '不，还能再努力一把',
      onOk() {
        self.props.history.push('/select');
      }
    });
  };

  getRandomWeather = () => {
    const weatherMap = ['晴', '多云', '阴', '小雨', '小雨转阴', '大雨'];
    return weatherMap[Math.floor(Math.random() * weatherMap.length)];
  };
  handleNextDay = () => {
    const { day } = this.state;
    this.setState({ day: day + 1 });
    this.props.handleNextDay();
  };
  render() {
    const { day, weather, date } = this.state;
    const { money } = this.props;
    return (
      <React.Fragment>
        <div className="extra-left">
          <div>
            相识第 <span> {day} </span>天
          </div>
          <div>
            金币 <span className="coin">{money}</span>
          </div>
          <div>
            <Button ghost onClick={this.handleNextDay}>
              下一天
            </Button>
          </div>
        </div>
        <div className="extra-right">
          <span>
            {date[0]} 年 {date[1]} 月 {date[2]} 日
          </span>
          <span>{weather}</span>
          <Button type="danger" ghost onClick={this.handleBack}>
            放弃追求
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ExtraInfo);
