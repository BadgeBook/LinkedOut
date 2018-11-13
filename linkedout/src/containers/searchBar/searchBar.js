import React, { Component } from 'react';
import './searchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
        }
    }

    onSearchClicked = (searchString) => {
        if (searchString) {
            console.log("Search for: " + searchString);
            this.props.history.push({
                pathname: '/search',
                search: '?query=' + searchString,
                state: {search: searchString},
            })
        }
    };

    render() {
        let searchInput = React.createRef();
        return (
            <div className="SearchBar">
                <div id="custom-search-input">
                    <div className="input-group col-md-12">
                        <input type="text" className="form-control input-lg" placeholder="Search users.." ref={(searchInput)}/>
                        <span className="input-group-btn">
                        <button className="btn btn-info btn-lg" type="button" onClick={() => {
                            this.onSearchClicked(searchInput.current.value);
                        }}>
                            <i className="glyphicon glyphicon-search">Search</i>
                        </button>
                    </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;