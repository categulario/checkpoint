require("./index.scss");

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
    };
  }

  componentDidMount() {
    var req = new XMLHttpRequest;  

    req.open('GET', '/21k.json');

    req.onload  = this.onLoad.bind(this);
    req.send(null);
  }

  onLoad(event) {
    this.setState({
      records: JSON.parse(event.target.responseText),
    });
  }

  render() {
    return (
      <div>
        <div id="app">
          <div id="entry">
            <input type="text" autofocus name="runner" placeholder="Número del corredor"/>
          </div>

          <div id="recorded-times">
            { this.state.records.map((r) => (
              <div className="record">
                <div className="runner">{ r.number }</div>
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
