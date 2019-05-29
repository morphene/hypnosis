/* eslint flowtype-errors/show-errors: 0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import morpheneJS from '@boone-development/morphene-js';

import App from './containers/App';
import AccountsPage from './containers/AccountsPage';
import DebugPage from './containers/DebugPage';
import PromptOperation from './containers/PromptOperation';
import SettingsPage from './containers/SettingsPage';
import SendPage from './containers/SendPage';
import TransactionsPage from './containers/TransactionsPage';
import WelcomePage from './containers/WelcomePage';
import VestingPage from './containers/VestingPage';
import DecryptPrompt from './containers/DecryptPrompt';
import ServerStatus from './containers/ServerStatus';

import * as MorpheneActions from './actions/morphene';

class Routes extends Component {

  isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

  changeNode(url) {
    if (url && this.isURL(url)) {
      // If it's a valid URL, set
      morpheneJS.api.setWebSocket(url);
    } else {
      // Otherwise set to the rpc.buildteam.io node
      morpheneJS.api.setWebSocket('https://morphene.io/rpc');
    }
    // Force a refresh immediately after change
    this.props.actions.refreshGlobalProps();
  }

  componentWillMount() {
    if (this.props.preferences && this.props.preferences.morphened_node) {
      this.changeNode(this.props.preferences.morphened_node)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextNode = this.props.preferences.morphened_node
    const thisNode = prevProps.preferences.morphened_node
    console.log(this.props.morpheneJS.props.time)
    if (nextNode !== thisNode) {
      this.changeNode(nextNode)
    }
  }
  render() {
    var parse = require('url-parse');
    const parsed = parse(window.location.href, true)
    if (parsed && parsed.query && parsed.query.action && parsed.query.action === 'promptOperation') {
      return (
        <App>
          <DecryptPrompt />
          <PromptOperation query={parsed.query} />
        </App>
      )
    }
    return (
      <App>
        <ServerStatus {...this.props} />
        <DecryptPrompt />
        <Switch>
          <Route
            exact
            path="/"
            render={
              (props) => {
                if(this.props.keys.isUser) {
                  return <TransactionsPage />;
                } else {
                  return <WelcomePage />;
                }
              }
            }
          />
          <Route path="/transactions" component={TransactionsPage} />
          <Route path="/debug" component={DebugPage} />
          <Route path="/send" component={SendPage} />
          <Route path="/vesting" component={VestingPage} />
          <Route path="/accounts" component={AccountsPage} />
          <Route path="/settings" component={SettingsPage} />
        </Switch>
      </App>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    keys: state.keys,
    location: state.location,
    preferences: state.preferences,
    router: state.router,
    morpheneJS: state.morpheneJS,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...MorpheneActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
