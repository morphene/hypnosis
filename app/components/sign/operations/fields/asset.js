// @flow
import React, { Component } from 'react';
import { Dropdown, Form, Input } from 'semantic-ui-react'

export default class OperationsPromptFieldAsset extends Component {

  constructor(props) {
    super(props)
    let defaultAsset = 'MORPH'
    if(props.meta.type === 'sbd') {
      defaultAsset = 'SBD'
    }
    this.state = {
      assetType: defaultAsset,
      assetAmount: 0,
      defaultAsset,
    }
  }

  modifyAssetAmount = (e, { value, name }) => {
    const amount = parseFloat(value).toFixed(3)
    this.setState({
      assetAmount: amount
    })
    this.props.modifyOpsPrompt(null, {
      index: 0,
      name,
      value: [amount, this.state.assetType].join(' ')
    })
  }

  modifyAssetType = (e, { value, name }) => {
    this.setState({
      assetType: value
    })
    this.props.modifyOpsPrompt(null, {
      index: 0,
      name,
      value: [this.state.assetAmount, value].join(' ')
    })
  }

  render() {
    const { field, meta, opData } = this.props
    const defaultValue = (opData[field]) ? parseFloat(opData[field].split(" ")[0]) : 0
    let options = []
    const option_morph = { key: 'MORPH', text: 'MORPH', value: 'MORPH' }
    switch(meta.type) {
      case "asset":
        options.push(option_morph)
        break;
      case "morph":
        options.push(option_morph)
        break;
    }
    return (
      <Form.Field>
        <label>
          {meta.label}
        </label>
        <Input
          fluid
          key={field}
          required
          index={0}
          name={field}
          defaultValue={defaultValue}
          onChange={this.modifyAssetAmount}
          label={<Dropdown name={field} onChange={this.modifyAssetType} defaultValue={this.state.defaultAsset} options={options} />}
          labelPosition='left'
        />
      </Form.Field>
    )
  }

}
