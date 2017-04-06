import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <h6>Brian's React blog</h6>
        {/* Allows the render of children components in routes */}
        {this.props.children}
      </div>
    );
  }
}
