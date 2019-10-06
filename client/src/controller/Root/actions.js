import {ON_VIEW_CHANGE, ON_SHRINK_COMPLETE} from "controller/Root/types";

export const setView = view => {
    return {
        type: ON_VIEW_CHANGE,
        payload: view
    }
};

export const setShrinkComplete = isShrinkComplete => {
    return {
        type: ON_SHRINK_COMPLETE,
        payload: isShrinkComplete
    }
};
