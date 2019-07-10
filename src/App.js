import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:6010';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      filters: ['fashion', 'sports'],
      selectedFilters: [],
      sort: null,
      articles: []
    }
  }

  getArticlesRequest(category) {
    return axios.get(API_URL + '/articles/' + category);
  }

  getArticles() {
    const {selectedFilters, filters} = this.state;
    const requests = selectedFilters.length ?
      selectedFilters.map((filter) => this.getArticlesRequest(filter)) :
      filters.map((filter) => this.getArticlesRequest(filter));

    axios.all(requests)
      .then(axios.spread((fashion, sports) => {
        this.setState({
          isLoaded: true,
          articles: [...fashion.data.articles, ...sports.data.articles]
        })
      }))
      .catch((err)=> {
        if(err.response.status < 500) {
          this.setState({
            isLoaded: true,
            error: err.response.data
          })
        } else {
          this.setState({
            isLoaded: true,
            error: { message: 'Something went wrong' }
          })
        }
      });
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(articles);
      return (
        <ul>
          {articles.map(item => (
            <li key={item.id}>
              {item.title} {item.preamble}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default App;
