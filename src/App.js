import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import localization from 'moment/locale/nb';

import ArticlePreview from './components/ArticlePreview';
import Filters from './components/Filters';
import Sorting from './components/Sorting';

const API_URL = 'http://localhost:6010';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      filters: ['fashion', 'sports'],
      selectedFilters: [],
      sort: 0,
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

    // this.setState((state) => {return { isLoaded: !state.isLoaded }})
    axios.all(requests)
      .then((responses) => {
        var tmp = [];
        responses.forEach((response) => {
          tmp = [...tmp, ...response.data.articles];
        })
        this.setState(() => {
          return {
            isLoaded: true,
            articles: tmp
          }
        })
      })
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

  changeFilters = (event) => {
    const { selectedFilters } = this.state;
    const target = event.target;
    const filter = target.name;
    const index = selectedFilters.indexOf(filter);
    if(index > -1) {
      this.setState({
        selectedFilters: selectedFilters.filter((item) => item != filter)
      }, () => {
        this.getArticles();
      })
    } else {
      selectedFilters.push(filter)

      this.setState({
        selectedFilters: selectedFilters
      }, () => {
        this.getArticles();
      })
    }
  }

  changeSorting = (newSort) => {
    const { sort } = this.state;
    if(newSort !== 0) {
      this.setState({
        sort: newSort
      })
    } else {
      this.setState({
        sort: sort ? (sort < 0 ? 0 : -1) : 1
      })
    }

  }

  sortByDate(articles) {
    const { sort } = this.state;
    var sortedArticles = [...articles];

    if(sort === 0) {
      return sortedArticles;
    }

    sortedArticles.sort((first, second) => {
      moment().locale('nb', localization).format('ll');
      const firstDate = new moment(first.date, 'DD. MMM YYYY');
      const secondDate = new moment(second.date, 'DD. MMM YYYY');

      return firstDate.diff(secondDate) > 0 ? 1 * sort : (firstDate.diff(secondDate) < 0 ? -1 * sort : 0);
    });
    return sortedArticles;
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { error, isLoaded, articles, filters, selectedFilters, sort } = this.state;
    if (error) {
      return <div className="container">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="container">Loading...</div>;
    } else {
      return (
        <div className="container">
          <Filters filters={filters} selectedFilters={selectedFilters} handleChange={this.changeFilters}/>
          <div className="articles">
            <Sorting sort={sort} handleChange={this.changeSorting}/>
            {this.sortByDate(articles).map(item => (
              <ArticlePreview key={item.id} item={item}/>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default App;
