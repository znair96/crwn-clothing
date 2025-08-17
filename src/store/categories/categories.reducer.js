import { CATGORY_MAP_ACTION_TYPE } from "./categories.types";

const INITIAL_STATE = {
  categoriesMap: {},
};

export const categoriesReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATGORY_MAP_ACTION_TYPE.CREATE_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload,
      };
    default:
      return state;
  }
};
