import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPrice } from '../action_creators/products';

class ProductIdItem extends Component {
    handleClick = ev => {
        ev.preventDefault();
        this.props.loadPrice(this.props.shop, this.props.id);
    };

    render() {
        return (
            <div className="item">
                <div className="content">
                    <a
                        onClick={this.handleClick}
                        href={`?shop=${this.props.shop}&product_id=${this.props.id}`}
                        className="ui blue tag label"
                    >
                        View product #{this.props.id}
                    </a>
                </div>
            </div>
        );
    }
}

export default connect(state => ({}), { loadPrice })(ProductIdItem);