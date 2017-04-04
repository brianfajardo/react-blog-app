import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        {/* Allows the render of children components in routes */}
        {this.props.children}
      </div>
    );
  }
}
