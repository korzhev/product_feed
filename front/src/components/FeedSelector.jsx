import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProducts } from '../action_creators/feeds';

class FeedSelector extends Component {

    handleClick = ev => {
        ev.preventDefault();
        this.props.loadProducts(this.state);
    };

    render() {
        const feedsList = this.props.feeds.map(f => {
            return (
                <li key={f.name}>
                    <a href={`?shop=${f.name}`} onClick={this.handleClick}>
                        {`Feed "${f.name}" from "${f.url}" delimiter: "${f.delimiter}"`}
                    </a>
                </li>
            )
        });
        return (
            <div className="ui segment">
                {this.props.feeds.length ? <ul>{feedsList}</ul>: <h5>Add some feeds</h5>}
            </div>
        );
    }
}

export default connect(state => ({ feeds: state.feeds }), { loadProducts })(FeedSelector);
