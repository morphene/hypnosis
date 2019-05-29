// @flow
import React, { Component } from 'react';

import { Form, Input } from 'formsy-semantic-ui-react'
import { Divider, Grid, Header, Label, Segment, Select } from 'semantic-ui-react';

export default class RPC extends Component {

  onValidSubmit = (
   e: SyntheticEvent
 ) => {
    const { setPreference } = this.props.actions;
    setPreference('morphened_node', e.morphened_node);
 }

  render() {
    return (
      <Form onValidSubmit={this.onValidSubmit}>

        <Header>
          Preferred Morphene Node
          <Header.Subheader>
            Configure which Morphene node your wallet connects to in order to broadcast transactions.
          </Header.Subheader>
        </Header>

        <Segment attached>
          <Grid>
            <Grid.Column width={9}>
              <Form.Input
                label="Morphene RPC Node"
                name="morphened_node"
                instantValidation
                validations="isUrl"
                validationErrors={{
                  isUrl: 'Requires a valid URL starting with http:// or https://'
                }}
                errorLabel={ <Label color="red" pointing /> }
                value={this.props.preferences.morphened_node}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Button color='blue' content='Update' label={`Currently: ${this.props.preferences.morphened_node}`}/>
            </Grid.Column>
          </Grid>
        </Segment>

      </Form>
    );
  }
}
