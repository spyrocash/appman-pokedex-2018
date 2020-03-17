import React, { Component } from "react";

export default class Progress extends Component {
  render() {
    const { percent } = this.props;
    return (
      <div className="progress-component">
        <div className="box"></div>
        <div className="energy" style={{ width: `${percent}%` }}></div>
      </div>
    );
  }
}
