import request from '../utils/request';

export default function fetchMessage(local) {
    const url = `/assets/local/${local}.json`;
    return request(url);
}
