import React, { Component } from 'react';

export default class FeedSelector extends Component {
    render() {
        const feedsList = this.props.feeds.map(f => {
            return (
                <li>
                    <a href={`?shop=${f.name}`}>
                        {`Feed "${f.name}" from "${f.url}" delimiter: "${f.delimiter}"`}
                    </a>
                </li>
            )
        });
        return (
            <ul>
                {feedsList}
            </ul>
        );
    }
}
