import firebaseApp from '../firebase';

const getUser = () => {
    const userListRef = firebaseApp.database().ref('users');
    return userListRef.once('value');
};

const addUser = (user) => {
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

export {
    addUser,
    getUser
};
