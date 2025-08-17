import { CATGORY_MAP_ACTION_TYPE } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";
export const setCategoriesMap = (categoriesMap) =>
  createAction(CATGORY_MAP_ACTION_TYPE.CREATE_CATEGORIES_MAP, categoriesMap);
