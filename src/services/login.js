import firebase from 'firebase/app';

/**
 * 用户登录
 *
 * @export
 * @param {string} email 邮箱地址
 * @param {string} password 密码
 * @returns {Promise<any>}
 */
export async function fetchLogin(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

/**
 * 用户退出
 *
 * @export
 * @returns {Promise<any>}
 */
export async function fetchLogout() {
    return firebase.auth().signOut();
}

/**
 * 获取当前用户
 *
 * @export
 * @returns {firebase.User}
 */
export function currentUser() {
    return firebase.auth().currentUser;
}

/**
 * 用户注册
 *
 * @export
 * @param {any} email 邮箱地址
 * @param {any} password 密码
 * @returns {Promise<any>}
 */
export async function fetchRegister(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

/**
 * 发送重置密码邮件
 *
 * @export
 * @param {any} email 邮箱地址
 * @returns {Promise<any>}
 */
export async function sendResetPasswordEmail(email) {
    return firebase.auth().sendPasswordResetEmail(email);
}
