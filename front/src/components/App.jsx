import React from 'react';
import NewFeedForm from './NewFeedForm';
import FeedSelector from './FeedSelector';


function App() {
    return (
        <div>
            <FeedSelector feeds={[]} />
            <NewFeedForm />
        </div>
    );
}

export default App;
