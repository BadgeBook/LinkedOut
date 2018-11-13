import React from 'react';
import './searchBar.css';

const SearchBar = (props) => {
    return (
        <div className="SearchBar">
            <div id="custom-search-input">
                <div className="input-group col-md-12">
                    <input type="text" className="form-control input-lg" placeholder="Search users.." />
                    <span className="input-group-btn">
                        <button className="btn btn-info btn-lg" type="button">
                            <i className="glyphicon glyphicon-search">Search</i>
                        </button>
                    </span>
                </div>  
            </div>
        </div>
    );
};

export default SearchBar;