const { logEvent } = require('./logger');

const storage = {
    _store: {},
    setItem(key, value) {
        this._store[key] = value;
        logEvent(`Збережено в storage: ${key} = ${value}`);
    },
    getItem(key) {
        return this._store[key] || null;
    },
    removeItem(key) {
        delete this._store[key];
        logEvent(`Видалено з storage: ${key}`);
    }
};

module.exports = storage;
