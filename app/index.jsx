require("./index.scss");

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
    };

    setTimeout(this.onLoad.bind(this), 1000);
  }

  onLoad() {
    this.setState({
      records: [
        {
          number: 100,
          time: null,
          name: 'John Doe',
        },
        {
          number: 13,
          time: null,
          name: 'John Doe',
        },
        {
          number: 13,
          time: null,
          name: 'John Doe',
        },
        {
          number: 13,
          time: null,
          name: 'John Doe',
        },
        {
          number: 13,
          time: null,
          name: 'John Doe',
        },
        {
          number: 412,
          time: null,
          name: 'John Doe',
        },
      ],
    });
  }

  render() {
    return (
      <div>
        <div id="app">
          <div id="entry">
            <input type="text" autofocus name="runner" placeholder="Número del corredor"/>
          </div>

        <p>{ this.state.records.length }</p>

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
