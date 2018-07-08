import React, { PureComponent } from 'react';
import { Layout, Button, Icon } from 'antd';
import Character from 'components/Character';

import { getCharacterList } from 'api';

import './style.less';

const { Content } = Layout;

class Select extends PureComponent {
  state = {
    characterList: [],
    selectedId: null
  };

  async componentDidMount() {
    this._isMounted = true;
    const res = await getCharacterList();
    if (res.code === 0) {
      this._isMounted &&
        this.setState({ characterList: res.data, selectedId: res.data[0].id });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSelect = id => {
    this.setState({ selectedId: id });
  };

  handleClick = () => {
    const { characterList, selectedId } = this.state;
    const character = characterList.find(t => {
      if (t.id === selectedId) {
        return true;
      }
    });
    this.props.history.push('/chase', character);
  };

  render() {
    const { characterList, selectedId } = this.state;
    return (
      <Layout className="select-page">
        <Content>
          <div className="character-container">
            {characterList.map(character => (
              <Character
                key={character.id}
                data={character}
                selected={selectedId === character.id}
                onSelect={this.handleSelect}
              />
            ))}
            <div className="btn-row">
              <Button
                type="danger"
                ghost
                disabled={selectedId === null ? true : false}
                onClick={this.handleClick}>
                <Icon type="left" /> 确认选择<Icon type="right" />
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Select;
