import React, { Component } from "react";
import _ from "lodash";

import { Progress } from "../../components";
import imageHappiness from "../../cute.png";

export default class Card extends Component {
  render() {
    const { image, name, hp, str, weakness, happiness } = this.props;
    return (
      <div className="card-component">
        <div className="left">
          <div className="image">
            <img src={image} alt={name} />
          </div>
        </div>
        <div className="right">
          <div className="top">
            <div className="name">{name}</div>
          </div>
          <div className="center">
            <div className="info">
              <div className="left">
                <div className="hp-label">HP</div>
                <div className="str-label">STR</div>
                <div className="weakness-label">WEAK</div>
              </div>
              <div className="right">
                <div className="hp-value">
                  <Progress percent={hp} />
                </div>
                <div className="str-value">
                  <Progress percent={str} />
                </div>
                <div className="weakness-value">
                  <Progress percent={weakness} />
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="happiness-value">
              {_.map(_.times(happiness), index => {
                return <img key={index} src={imageHappiness} alt="" />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
