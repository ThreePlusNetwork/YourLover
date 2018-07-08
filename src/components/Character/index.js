import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.less';

class Character extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
      age: PropTypes.number,
      job: PropTypes.string,
      hobby: PropTypes.string,
      difficulty: PropTypes.number
    }),
    selected: PropTypes.bool,
    onSelect: PropTypes.func
  };
  static defaultProps = {
    data: {
      name: '',
      picture: '',
      age: '',
      job: '',
      hobby: '',
      difficulty: 0
    },
    selected: false,
    onSelect: () => {}
  };

  render() {
    const {
      data: { id, name, picture, age, job, hobby, difficulty },
      selected,
      onSelect
    } = this.props;
    return (
      <div
        className={`character-card ${selected ? 'selected' : ''}`}
        onClick={e => onSelect(id)}>
        <img src={picture} alt="character" />
        <div>
          <p>{name}</p>
          <p>{age}</p>
          <p>{job}</p>
          <p>{hobby}</p>
        </div>
      </div>
    );
  }
}

export default Character;
