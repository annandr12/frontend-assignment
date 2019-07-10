import React, { Component } from "react";
import PropTypes from 'prop-types';

import './Filters.css'

class Filters extends Component {
  render() {
    const { filters, selectedFilters, handleChange } = this.props
    return (
      <div className="filters">
      <span className="filters_title">Data sources</span>
        {filters.map((item) => (
          <label className="filter_label" key={item}>
            <input type="checkbox" name={item}
                  checked={selectedFilters.indexOf(item) > -1}
                  onChange={handleChange}/>
            {item}
          </label>
        )
        )}
      </div>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.array,
  selectedFilters: PropTypes.array,
  handleChange: PropTypes.func
};

export default Filters;