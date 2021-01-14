import _ from 'lodash';
import { IS_VALIDATING, UPDATE_VALIDATION } from './mutationTypes';

export default {
  [IS_VALIDATING]: (state, isValidating) => {
    _.set(state, 'isValidating', isValidating);

    return state;
  },
  [UPDATE_VALIDATION]: (state, validationState) => {
    _.set(state, 'validation', validationState);

    return state;
  }
};
