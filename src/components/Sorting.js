import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Sorting.css';

class Sorting extends Component {
  render() {
    const { sort, handleChange } = this.props;
    return (
      <div className="sorting">
        <span onClick={()=> handleChange(0)}>Sort by date</span>
        <div className="sorting_triangles">
          <span className={classNames('sorting_triangle', {'active': sort === 1})} onClick={()=> handleChange(1)}>&#9650;</span>
          <span className={classNames('sorting_triangle', {'active': sort === -1})} onClick={() => handleChange(-1)}>&#9660;</span>
        </div>
      </div>
    )
  }
}

Sorting.propTypes = {
  handleChange: PropTypes.func,
  sort: PropTypes.number
};

export default Sorting;