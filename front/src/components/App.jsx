import React from 'react';
import NewFeedForm from './NewFeedForm';
import FeedSelector from './FeedSelector';
import ProductIdList from './ProductIdList';

function App() {
    return (
        <div>
            <FeedSelector feeds={[{delimiter:'\t', url:'http://example.com', name:'first'}]} />
            <NewFeedForm />
            <ProductIdList idList={['123', '00012312', '2349234', '000112312', '234912324']} shop="first" />
        </div>
    );
}

export default App;
