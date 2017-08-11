import firebaseApp from '../firebase';

export const getUser = () => {
    const userListRef = firebaseApp.database().ref('users');
    return userListRef.once('value');
};

export const addUser = (user) => {
    const { name, gender, age, email, phone, address } = user;
    const userRef = firebaseApp.database().ref('users').push();
    userRef.set({
        name,
        gender,
        age,
        email,
        phone,
        address
    });
};
