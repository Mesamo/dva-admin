// import { request } from '../utils';

export async function fetchLogin(params) {
    const result = new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...params, success: true });
        }, 2000);
    });
    return result;
}

// export async function logout(params) {
//     return request('/api/logout', {
//         method: 'post',
//         data: params,
//     });
// }

export async function fetchLogout(params) {
    const result = new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...params, success: true });
        }, 2000);
    });
    return result;
}
