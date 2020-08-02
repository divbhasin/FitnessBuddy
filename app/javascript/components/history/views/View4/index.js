import React, { Component } from 'react';
import './view4.css';
import LineChart from '../../charts/LineChart';

export default class View4 extends Component {
  render() {
    const width = 1100;
    const height = 250;

    return (
      <div id='view4' className='pane' >
        <div className='header'> {this.props.caption} </div>
        <div style={{ overflowX: 'hidden',overflowY:'scroll' }}>
          <LineChart data={this.props.data} width={width} height={height}/>
        </div>
      </div>
      )
}
}
