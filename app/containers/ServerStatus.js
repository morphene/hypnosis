/* eslint flowtype-errors/show-errors: 0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Header, Icon, Message } from 'semantic-ui-react';

import ServerSelect from '../components/global/ServerSelect'
import ServerReconnect from '../components/global/ServerReconnect'
import * as PreferencesActions from '../actions/preferences';
import * as MorpheneActions from '../actions/morphene';
import morpheneJS from '@boone-development/morphene-js';

class ServerStatus extends Component {

  state = {
    now: Date.now(),
    globalProps: null
  }

  componentDidMount() {
    this.currentTime()
    this.interval = setInterval(this.currentTime.bind(this), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  currentTime = () => {
    morpheneJS.api.getDynamicGlobalProperties((err, result) => {
      this.setState({globalProps: err ? null : result, now: Date.now()})
    });
  }

  render() {
    let message = false
    const now = this.state.now;
    const lastUpdated = this.state.globalProps ?
      new Date(this.state.globalProps.time + 'Z').getTime() :
      new Date('1970-01-01T00:00:00Z').getTime();
    if(((now - lastUpdated) / 1000) > 60) {
      message = (
        <Message error color='red' size='big' style={{paddingLeft: '102px'}}>
          <Header textAlign='center'>
            <ServerSelect {...this.props} />
            <ServerReconnect {...this.props} />
            <Icon name='warning sign' />
            <Header.Content>
              Connection lost, attempting to reconnect...
            </Header.Content>
          </Header>
        </Message>
      )
    }
    return message;
  }
}

function mapStateToProps(state) {
  return {
    account: state.account
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...PreferencesActions,
      ...MorpheneActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerStatus);
