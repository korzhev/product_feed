/* global alert */
import { SUCCESS, FAIL, ADD_FEED, LOAD_FEEDS } from '../constants';

const defaultFeeds = [];

export default (feeds = defaultFeeds, action) => {
    const { type, payload } = action;

    switch (type) {
    case ADD_FEED + SUCCESS:
        const newFeed = Array.from(feeds);
        newFeed.push(payload);
        return newFeed;

    case ADD_FEED + FAIL:
        alert(JSON.stringify(payload, null, 2));
        return Array.from(feeds);

    case LOAD_FEEDS + SUCCESS:
        return payload;

    case LOAD_FEEDS + FAIL:
        console.error(payload);
        return Array.from(feeds);
    }

    return feeds;
};
