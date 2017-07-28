import request from '../utils/request';

export default function fetchMessage(currentLanguage) {
    const url = `/assets/local/${currentLanguage}.json`;
    return request(url);
}
