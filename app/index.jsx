require("./index.scss");

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      runner: '',
      records: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var req = new XMLHttpRequest;  

    req.open('GET', '/21k.json');

    req.onload  = this.onLoad.bind(this);
    req.send(null);
  }

  onLoad(event) {
    this.setState({
      runner: '',
      records: JSON.parse(event.target.responseText).map((r) => ({
        key: r.key,
        name: r.name.toLowerCase(),
        last_name: r.last_name.toLowerCase(),
        time: null,
      })),
    });
  }

  handleSubmit(event) {
    this.setState({
      runner: '',
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      runner: event.target.value,
    });
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
              <div className="record">
                <div className="runner">{ r.key }</div>
                <div className="name"> { r.name } {r.last_name }</div>
                <div className="time"> { r.time }</div>
              </div>
            )) }
          </div>
        </div>

        <div id="tools">
          <div className="tool">
            <button id="download">D</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById("app"));
