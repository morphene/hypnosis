// @flow
import morpheneJS from '@boone-development/morphene-js';
import * as ProcessingActions from './processing';

export const MORPHENE_GLOBALPROPS_UPDATE = 'MORPHENE_GLOBALPROPS_UPDATE';
export const MORPHENE_GLOBALPROPS_UPDATE_RESOLVED = 'MORPHENE_GLOBALPROPS_UPDATE_RESOLVED';

function getGlobalProps(dispatch) {
  morpheneJS.api.getDynamicGlobalProperties((err, results) => {
    if (err) return;

    dispatch({
      type: MORPHENE_GLOBALPROPS_UPDATE_RESOLVED,
      payload: results
    });
  });
}

export function refreshGlobalProps() {
  return (dispatch: () => void) => {
    setInterval(getGlobalProps(dispatch), 3000)
  };
}
