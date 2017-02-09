import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductIdItem from './ProductIdItem';


class ProductIdList extends Component {
    render() {
        const items = this.props.idList.map(id => <ProductIdItem key={id} id={id} shop={this.props.shop} />);
        return (
            <div className="ui segment">
                <div className="ui horizontal list">
                    {this.props.idList.length ? items : <h5>No products...</h5>}
                </div>
            </div>
        );
    }
}

export default connect(state => state.products)(ProductIdList);
//export default connect(state => ({ idList: state.products.idList, shop: state.products.state }))(ProductIdList);
