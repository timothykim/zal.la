import {ON_VIEW_CHANGE, ON_SHRINK_COMPLETE} from "view/Root/types";

const INITIAL_STATE = {
  view: "root",
  isShrinkComplete: false,
};

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case ON_VIEW_CHANGE:
    }
}
