import _ from 'lodash';
import { PAGE_SAVE_PENDING, PAGE_SAVE_FAILURE } from './mutationTypes';
import { save } from '../core-data/api';
import { add as addToQueue } from '../core-data/queue';

function logSaveError(uri, e) {
  return console.error('Error saving page:', e);
}

function queuePageSave(uri, data, oldData, store) {
  addToQueue(save, [uri, data])
  // note: we don't care about the data we got back from the api
  .catch((e) => {
    store.commit(PAGE_SAVE_FAILURE, oldData);
    logSaveError(uri, e);
    // todo: handle this better. right now it's just reloading the page,
    // but it should probably figure out what changed and revert it
    window.location.reload();
  });

  store.commit(PAGE_SAVE_PENDING, data);
  return Promise.resolve(data);
}

/**
 * save a page's data, but do not re-render
 * because, uh, that would just be reloading the page
 * @param  {object} store
 * @param  {*} data  to save
 * @return {Promise}
 */
export function savePage(store, data) {
  const oldData = _.get(store, 'state.page.data'),
    dataToSave = _.assign({}, oldData, data),
    uri = _.get(store, 'state.page.uri');

  return queuePageSave(uri, dataToSave, oldData, store);
}