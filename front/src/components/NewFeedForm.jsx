import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFeed } from '../action_creators/feeds';

const delimiterList = [
        { value: '\t', label: 'Tab'},
        { value: ' ', label: 'Space'},
        { value: ';', label: ';'},
        { value: ',', label: ','},
        { value: '|', label: '|'},
    ];

class NewFeedForm extends Component {
    state = {
        name: '',
        url: '',
        delimiter: '\t'
    };

    handleChange = field => ev => {
        this.setState({
            [field]: ev.target.value
        })
    };

    handleSubmit = ev => {
        ev.preventDefault();
        this.props.addFeed(this.state);
        this.setState({
            name: '',
            url: '',
            delimiter: '\t'
        })
    };

    render() {
        const options = delimiterList.map((o, i) => {
            return <option key={i} value={o.value}>{o.label}</option>
        });
        return (
            <div className="ui segment">
                <form onSubmit = {this.handleSubmit} className='ui form'>
                    <div className='field'>
                        <label>Shop Name</label>
                        <input
                            type='text'
                            name='name'
                            required
                            placeholder='shop Name'
                            value={this.state.name}
                            onChange = {this.handleChange('name')}
                        />
                    </div>
                    <div className='field'>
                        <label>URL</label>
                        <input
                            type='text'
                            name='url'
                            placeholder='http://example.com'
                            required
                            value={this.state.url}
                            onChange = {this.handleChange('url')}
                        />
                    </div>
                    <div className='field'>
                        <label>Delimiter</label>
                        <select name='delimiter' onChange = {this.handleChange('delimiter')} defaultValue={'\t'}>
                            {options}
                        </select>
                    </div>
                    <button className='ui inverted red button' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(() => ({}), { addFeed })(NewFeedForm);
