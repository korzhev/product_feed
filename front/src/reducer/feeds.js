import { SUCCESS, FAIL, ADD_FEED } from '../constants';

const defaultFeeds = {};

export default (feeds = defaultFeeds, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_FEED + SUCCESS:
            return {};

        case ADD_FEED + FAIL:
            return {};
    }

    return feeds;
};
