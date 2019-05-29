// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import MenuBar from './MenuBar';
import ContentBar from '../components/ContentBar';
import VestingAccounts from '../components/VestingAccounts';
import { Header, Segment } from 'semantic-ui-react';
import * as AccountActions from '../actions/account';
import * as KeysActions from '../actions/keys';


class VestingsPage extends Component {
  render() {
    if (!this.props.keys.isUser) {
      return <Redirect to="/" />;
    }
    return (
      <ContentBar>
        <Segment padded attached secondary>
          <Header
            icon="lightning"
            content="Vesting Schedule"
            subheader="VESTS can be converted to liquid MORPH using a process called 'Powering Down' which takes 13 weeks to complete. 1/13th of the amount choosen to withdraw will be converted and credited to your account each week. You can interrupt this process at any time."
          />
        </Segment>
        <VestingAccounts {...this.props} />
        <MenuBar />
      </ContentBar>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    keys: state.keys,
    preferences: state.preferences,
    processing: state.processing,
    morpheneJS: state.morpheneJS
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...KeysActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VestingsPage);
