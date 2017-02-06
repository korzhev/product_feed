import React, { Component } from 'react';

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
        if (ev.target.value.length > 5) return
        this.setState({
            [field]: ev.target.value
        })
    };

    handleSubmit = ev => {
        ev.preventDefault();
        // this.props.addFeed(this.state);
        this.setState({
            name: '',
            url: '',
            delimiter: '\t'
        })
    };

    render() {
        const options = delimiterList.map(o => {
            return <option value={o.value}>{o.label}</option>
        });
        return (
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
        )
    }
}

export default NewFeedForm;
