import * as firebase from 'firebase';

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
 * 用户注册
 *
 * @export
 * @param {any} email 邮箱地址
 * @param {any} password 密码
 * @returns {Promise<any>}
 */
export async function fetchRegiste(email, password) {
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

/**
 * 重置密码
 *
 * @export
 * @param {any} code 代码
 * @param {any} newPassword 新密码
 * @returns {Promise<any>}
 */
export async function passwordReset(code, newPassword) {
    return firebase.auth().confirmPasswordReset(code, newPassword);
}
