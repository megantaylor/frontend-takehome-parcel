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
      results: [],
      savedGems: []
    };
  }

  componentDidMount() {
    if (!localStorage.savedGems) {
      localStorage.setItem('savedGems', []);
    } else {
      this.setState({
        savedGems: [...JSON.parse(localStorage.savedGems)]
      });
    }
  }

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
        return this.parseData(resp.data);
      })
      .then(data => {
        this.setState({
          loading: false,
          results: data
        });
      });
  };

  parseData = results => {
    let data = [];
    results.forEach(result => {
      let saved = this.state.savedGems.some(function(obj) {
        return obj.name === result.name;
      });
      let item = {
        name: result.name,
        version: result.version,
        info: result.info,
        saved: saved
      };
      data.push(item);
    });
    return data;
  };

  handleGemButton = item => {
    let gems = [...this.state.savedGems, item];
    if (localStorage.savedGems.length < 1) {
      localStorage.setItem('savedGems', [JSON.stringify(gems)]);
    } else {
      localStorage.setItem('savedGems', [JSON.stringify(gems)]);
    }
    this.setState({
      savedGems: gems
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
        {!this.state.loading ? (
          <List
            results={this.state.results}
            handleGemButton={this.handleGemButton}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
