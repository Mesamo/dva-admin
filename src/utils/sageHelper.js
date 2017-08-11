const checkType = (fn) => {
    if (typeof fn !== 'function') {
        const typeName = typeof fn;
        throw Error(`Invalid param \`fn\` of type \`${typeName}\`, expected \`function\``);
    }
};

const takeEvery = (fn) => {
    checkType(fn);
    return [fn, { type: 'takeEvery' }];
};

const takeLatest = (fn) => {
    checkType(fn);
    return [fn, { type: 'takeLatest' }];
};

const watcher = (fn) => {
    checkType(fn);
    return [fn, { type: 'watcher' }];
};

const delay = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const SagaHelper = {
    takeEvery,
    takeLatest,
    watcher,
    delay
};

export default SagaHelper;
