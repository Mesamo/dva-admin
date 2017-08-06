import firebaseApp from '../firebase';

const addUser = (name, email) => {
    const userListref = firebaseApp.database().ref('users').push();
    userListref.set({
        name,
        email
    });
};

export {
    addUser
};
