require("./index.scss");

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const checkpointState = (state, action) => {
  if (!state) {
    state = {runner: '', records: []};
  }

  switch (action.type) {
    case 'BOOT':
      return state;
    case 'UPDATERECORDS':
      return {
        runner: '',
        records: action.records,
      };
    case 'UPDATERUNNER':
      return {
        runner: action.runner,
        records: state.records,
      };
  }
};

class Checkpoint extends Component {
  constructor(props) {
    super(props);

    this.state = checkpointState(undefined, {type: 'BOOT'});
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.records.length === 0) {
      var req = new XMLHttpRequest;

      req.open('GET', '/runners.json');
      req.onload  = this.onLoad.bind(this);
      req.send(null);
    }
  }

  onLoad(event) {
    this.setState(
      checkpointState(
        this.state, {
          type: 'UPDATERECORDS',
          records: JSON.parse(event.target.responseText).map((r) => ({
            number: r.number,
            name: r.name.toLowerCase(),
            category: 'c'+r.category,
            time: null,
          })),
        }
      )
    );
  }

  currentTime() {
    let curdate = new Date();
    let hours = curdate.getHours();
    let minutes = curdate.getMinutes();
    let seconds = curdate.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  }

  handleSubmit(event) {
    this.setState(
      checkpointState(
        this.state, {
          type: 'UPDATERECORDS',
          records: this.state.records.map((r) => ({
            number: r.number,
            name: r.name,
            category: r.category,
            time: r.number == this.state.runner ? this.currentTime() : r.time,
          })),
        }
      )
    );

    event.preventDefault();
  }

  handleChange(event) {
    this.setState(
      checkpointState(
        this.state, {
          type: 'UPDATERUNNER',
          runner: event.target.value,
        }
      )
    );
  }

  render() {
    return (
      <div>
        <div id="app">
          <div id="entry">
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.runner} autoFocus name="runner" placeholder="Número del corredor" onChange={this.handleChange} autoComplete="off"/>
            </form>
          </div>

          <div id="recorded-times">
            { this.state.records.map((r) => (
              <div className={`record ${r.category}`}>
                <div className="runner">{ r.number }</div>
                <div className="name"> { r.name }</div>
                <div className="time"> { r.time }</div>
              </div>
            )) }
          </div>
        </div>

        <div id="tools">
          <button id="download" className="tool">
            <i className="fa fa-download"></i>
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Checkpoint />, document.getElementById("app"));
