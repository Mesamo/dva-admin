import firebaseApp from '../firebase';

const addUser = (name, email) => {
    const userRef = firebaseApp.database().ref(`users/${name}`);
    userRef.set({
        name,
        email
    });
};

export {
    addUser
};
