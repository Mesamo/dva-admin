
const read = (key) => {
    return localStorage.getItem(key);
};

const readObject = (key) => {
    const text = read(key);
    let obj;
    try {
        obj = JSON.parse(text);
    } catch (error) {
        obj = {};
    }
    return obj;
};

const write = (key, data) => {
    localStorage.setItem(key, data);
};

const writeObject = (key, data) => {
    const text = JSON.stringify(data);
    write(key, text);
};

const remove = (key) => {
    localStorage.removeItem(key);
};

export {
    read,
    readObject,
    write,
    writeObject,
    remove,
};
