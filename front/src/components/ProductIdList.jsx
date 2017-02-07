import React, { Component } from 'react';
import ProductIdItem from './ProductIdItem';

export default function (props) {
    const items = props.idList.map(id => <ProductIdItem key={id} id={id} shop={props.shop} />);
    return (
        <div className="ui segment">
            <div className="ui horizontal list">
                {items}
            </div>
        </div>
    );
}
