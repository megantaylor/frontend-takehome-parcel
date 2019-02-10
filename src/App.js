import React from 'react';
import axios from 'axios';

import Form from './components/Form';
import List from './components/List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: false,
      results: []
    };
  }

  componentDidMount() {}

  handleChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    axios
      .get(
        `http://localhost:3000/api/v1/search.json?query=${
          this.state.searchTerm
        }`
      )
      .then(resp => {
        console.log('result', resp.data[0]);
        this.setState({
          loading: false,
          results: resp.data
        });
      });
  };

  render() {
    return (
      <div className='app'>
        <Form
          searchTerm={this.state.searchTerm}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        {!this.state.loading ? <List results={this.state.results} /> : null}
      </div>
    );
  }
}

export default App;
