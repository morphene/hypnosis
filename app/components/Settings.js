// @flow
import React, { Component } from 'react';

import PreferredNode from './global/PreferredNode'
import { Form, Input } from 'formsy-semantic-ui-react'
import { Divider, Grid, Header, Label, Segment, Select } from 'semantic-ui-react';

export default class Settings extends Component {

   handleChange = (
    e: SyntheticEvent, { name, value }: { name: string, value: string }
  ) => {
     const { setPreference } = this.props.actions;
     setPreference(name, value);
  }

  onValidSubmit = (
   e: SyntheticEvent
 ) => {
    const { setPreference } = this.props.actions;
    setPreference('morphened_node', e.morphened_node);
 }

  render() {
    return (
      <Segment basic padded>

        <PreferredNode {...this.props} />

        <Divider />

        <Form>

          <Header>
            Exchange Configuration
            <Header.Subheader>
              Configure the required <strong>unencrypted memo</strong> for each
              individual exchange.
            </Header.Subheader>
          </Header>

          <Segment attached>
            <Header size="small">
              To Be Announced ...
            </Header>
            <Form.Group widths="equal">
              <Form.Input
                label="MORPH Memo (Unencrypted)"
                name="exchange_morph_one"
                value={this.props.preferences.exchange_morph_one}
                onChange={this.handleChange}
                disabled={true}
                placeholder="Enter your MORPH Unencrypted Memo key for ..."
              />
            </Form.Group>
          </Segment>

        </Form>

      </Segment>
    );
  }
}
