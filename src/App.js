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
      let item = {
        name: result.name,
        version: result.version,
        info: result.info
      };
      data.push(item);
    });
    return data;
  };

  handleGemButton = item => {
    let gems, index;
    if (this.state.savedGems.indexOf(item.name) === -1) {
      gems = [...this.state.savedGems, item.name];
    } else {
      index = this.state.savedGems.indexOf(item.name);
      gems = this.state.savedGems.filter(e => e !== item.name);
    }
    localStorage.setItem('savedGems', [JSON.stringify(gems)]);
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
            savedGems={this.state.savedGems}
            handleGemButton={this.handleGemButton}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
