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
      savedGems: [],
      whichList: null
    };
  }

  componentDidMount() {
    if (!localStorage.savedGems) {
      localStorage.setItem('savedGems', []);
    } else {
      this.setState({
        savedGems: JSON.parse(localStorage.savedGems)
      });
    }
  }

  //find the index of an object with a specific key:value pair in an array of objects
  findWithAttr = (array, attr, value) => {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  };

  //reduce large response object to just required data
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
          results: data,
          whichList: 'searchResults'
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  //check if an item is in savedGems. if so, remove it, otherwise, add it
  handleGemButton = item => {
    let gems;
    if (this.findWithAttr(this.state.savedGems, 'name', item.name) === -1) {
      gems = [...this.state.savedGems, item];
    } else {
      gems = this.state.savedGems.filter(e => e.name !== item.name);
    }
    localStorage.setItem('savedGems', [JSON.stringify(gems)]);
    this.setState({
      savedGems: gems
    });
  };

  //use whichList state variable to control whether searchResults or savedGems list is displayed
  handleViewSavedGems = () => {
    this.setState({
      whichList: 'savedGems'
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
        <button
          className='viewSavedGems'
          onClick={() => this.handleViewSavedGems()}
          type='button'
        >
          Or view saved Gems ({this.state.savedGems.length})
        </button>
        {!this.state.loading && this.state.whichList === 'savedGems' ? (
          <List
            results={this.state.savedGems}
            savedGems={this.state.savedGems}
            handleGemButton={this.handleGemButton}
            findWithAttr={this.findWithAttr}
            whichList={this.state.whichList}
          />
        ) : null}
        {!this.state.loading && this.state.whichList === 'searchResults' ? (
          <List
            results={this.state.results}
            savedGems={this.state.savedGems}
            handleGemButton={this.handleGemButton}
            findWithAttr={this.findWithAttr}
            whichList={this.state.whichList}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
