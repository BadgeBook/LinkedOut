import React from 'react';
import './searchBar.css';

const SearchBar = (props) => {
    let searchInput = React.createRef();
    return (
        <div className="SearchBar">
            <div id="custom-search-input">
                <div className="input-group col-md-12">
                    <input type="text" className="form-control input-lg" placeholder="Search users.." ref={(searchInput)}/>
                    <span className="input-group-btn">
                        <button className="btn btn-info btn-lg" type="button" onClick={() => {
                            props.onSearchClicked(searchInput.current.value);
                            }}>
                            <i className="glyphicon glyphicon-search">Search</i>
                        </button>
                    </span>
                </div>  
            </div>
        </div>
    );
};

export default SearchBar;