import React, { Component } from 'react';

export default class ProductIdItem extends Component {
    render() {
        return (
            <div className="item">
                <div className="content">
                    <a href={`?shop=${this.props.shop}&product_id=${this.props.id}`} className="ui blue tag label">
                        View product #{this.props.id}
                    </a>
                </div>
            </div>
        );
    }
}
