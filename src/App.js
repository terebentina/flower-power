import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { LineChart } from 'rd3';
import { retrieveData, parseWebtaskData } from './utils';

class App extends Component {

  state = { data: [] };

  componentDidMount() {
    retrieveData().then(parseWebtaskData).then((data) => {
      console.log('data.slice(-100)', data.slice(-100));
      this.setState({ data: data.slice(-100) });
    });
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    if (!this.state.data.length) {
      return <p>Loading...</p>;
    }

    return (
      <LineChart
        legend
        data={this.state.data}
        xAccessor={(obj) => new Date(obj.x)}
        xAxisTickCount={10}
        xAxisLabel="Time"
        yAxisLabel="Value"
        width={800}
        height={400}
        title="Sensor Readout"
        gridHorizontal
      />
    );
  }
}

export default App;
