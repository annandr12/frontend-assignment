import React, { Component } from "react";
import PropTypes from 'prop-types';

import './ArticlePreview.css'

class ArticlePreview extends Component {
  render() {
    const {item} = this.props;
    return (
      <div className="article">
        <img className="image" src={item.image ? item.image : 'assets/placeholder.png'}/>
        <div className="info">
          <span className="date">{item.date}</span>
          <h3 className="title">{item.title}</h3>
          <p className="preamble">{item.preamble}</p>
        </div>
      </div>
    )
  }
}
ArticlePreview.propTypes = {
  item: PropTypes.object
};

export default ArticlePreview;