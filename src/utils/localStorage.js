const localStorageService = {
    getElement: (key) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error(`Error: ${error}`);
            return null;
        }
    },
    setElement: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    },
    removeElement: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    },
    clearStorage: () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
}

export default localStorageService;