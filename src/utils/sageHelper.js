const takeEvery = fn => [fn, { type: 'takeEvery' }];

const takeLatest = fn => [fn, { type: 'takeLatest' }];

const watcher = fn => [fn, { type: 'watcher' }];

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const SagaHelper = {
    takeEvery,
    takeLatest,
    watcher,
    delay
};

export default SagaHelper;
