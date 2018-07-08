import React, { PureComponent } from 'react';
import { Button, message, Progress } from 'antd';
import './style.less';

import { decimalMap, textMap } from './config';

class Chasing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playerPic: require('mock/image/player1.jpg'),
      percent: 0,
      success: false
    };
  }

  componentDidMount() {
    const { percent } = this.state; // 后续更改为从服务端获取
    this.initialWidth = this.imgNode.getBoundingClientRect().width;

    this.reduceLimit(percent);
  }

  handleRef = node => {
    this.imgNode = node;
  };

  handleReduce = e => {
    //所需要做的只是更改百分比
    const type = e.target.getAttribute('keyword');
    const decimal = decimalMap.get(type);
    this.handleMandomNumber(decimal);
  };

  reduceLimit = percent => {
    if (percent >= 100) {
      message.success('该妹子已成功收入后宫～', 1);
      this.imgNode.style.width = '540px';
      this.setState({ percent: 100, success: true });
      return;
    }

    const expendWidth = ((this.initialWidth - 540) * percent) / 100; //// 540为两图片固定宽度
    const newWidth = this.initialWidth - expendWidth;
    this.imgNode.style.width = `${newWidth}px`;
  };

  handleMandomNumber = decimal => {
    const { success, percent } = this.state;
    if (success) {
      message.success('该妹子已成功收入后宫～', 1);
      return;
    }
    if (percent === 0 && decimal < 0) {
      message.info('大兄弟，女神离你越来越远了', 0.8);
      return;
    }
    if (decimal > 0) {
      message.success('好感度又增加了，女神就在眼前等你～', 0.8);
    } else {
      message.info('女神不吃这一套噢', 1);
    }
    this.setState(
      { percent: this.state.percent + this.getRandomNumber(decimal) },
      () => this.reduceLimit(this.state.percent)
    );
  };

  getRandomNumber = decimal => {
    return Math.floor(Math.random() * 100 * decimal);
  };

  render() {
    const { picture } = this.props.data;
    const { playerPic, percent } = this.state;
    const actionList = decimalMap.keys();
    const renderActionList = [];
    for (let action of actionList) {
      renderActionList.push(action);
    }
    return (
      <div className="chasing-subpage">
        <div className="progress-container">
          <span>亲密度</span>
          <Progress percent={percent} status="active" />
        </div>
        <div className="img-container" ref={this.handleRef}>
          <img src={playerPic} alt="player1" />
          <img src={picture} alt="target" />
        </div>
        <div className="action">
          {renderActionList.map(action => (
            <Button key={action} keyword={action} onClick={this.handleReduce}>
              {textMap.get(action)}
            </Button>
          ))}
        </div>
      </div>
    );
  }
}

export default Chasing;
