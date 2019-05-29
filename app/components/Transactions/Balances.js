// @flow
import React, { Component } from 'react';
import { Divider, Header, Icon, Segment, Statistic, Table } from 'semantic-ui-react';
import _ from 'lodash';
import NumericLabel from '../../utils/NumericLabel';
import AccountName from '../global/AccountName';

export default class PendingReward extends Component {
  getBalances(data) {
    const props = this.props.morpheneJS.props;
    const totalVestsMorph = parseFloat(props.total_vesting_fund_morph.split(' ')[0])
    const totalVests = parseFloat(props.total_vesting_shares.split(' ')[0])
    const mapping = {
      MORPH: ['balance'],
      VESTS: ['vesting_shares']
    };
    const balances = {
      MORPH: 0,
      VESTS: 0
    };
    if (!data) {
      return {
        MORPH: <Icon name="asterisk" loading />,
        VESTS: <Icon name="asterisk" loading />
      };
    }
    _.forOwn(mapping, (fields: Array, assignment: string) => {
      _.forEach(fields, (field) => {
        const [value] = data[field].split(' ');
        balances[assignment] += parseFloat(value);
      });
    });
    balances.SP = totalVestsMorph * balances.VESTS / totalVests;
    return balances;
  }
  render() {
    let display = false;
    if (this.props.morpheneJS.props) {
      const accounts = this.props.account.accounts;
      const names = this.props.keys.names;
      const t = this;
      const balances = names.map((account) => {
        return (accounts && accounts[account]) ? t.getBalances(accounts[account]) : {};
      });
      const totals = {
        MORPH: balances.reduce((MORPH, balance) => MORPH + parseFloat(balance.MORPH), 0),
        VESTS: balances.reduce((VESTS, balance) => VESTS + parseFloat(balance.VESTS), 0)
      };
      const numberFormat = {
        shortFormat: true,
        shortFormatMinValue: 1000
      };
      display = (
        <Segment basic>
          <Header>
            Total Wallet Balance
          </Header>
          <Segment>
            <Statistic.Group widths="two">
              <Statistic
                horizontal
                style={{fontSize: '2rem', paddingLeft: '10%', marginTop: '1rem'}}
                value={<NumericLabel params={numberFormat}>{totals.MORPH}</NumericLabel>}
                label="MORPH"
              />
              <Statistic
                horizontal
                style={{fontSize: '2rem', paddingLeft: '10%', marginTop: '1rem'}}
                className="pull-right"
                value={<NumericLabel params={numberFormat}>{totals.VESTS}</NumericLabel>}
                label="VESTS"
              />
            </Statistic.Group>
          </Segment>
          <Divider />
          <Header>
            Account Balances
          </Header>
          <Table celled unstackable attached color="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="right">
                  Account
                </Table.HeaderCell>
                <Table.HeaderCell colSpan={2} textAlign="right">
                  Available to Spend
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  MORPH
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  VESTS
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {names.map((account, i) => (
                <Table.Row key={account}>
                  <Table.Cell>
                    <AccountName name={account} />
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <NumericLabel params={numberFormat}>{balances[i].MORPH}</NumericLabel>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <NumericLabel params={numberFormat}>{balances[i].VESTS}</NumericLabel>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      );
    }
    return display;
  }
}
