export const writeLocalStorage = (key: string, value: any, expires = 0): void => {
  try {
    const data: any = { value };

    if (expires) {
      data.expires = Date.now() + expires;
    }

    return window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const readLocalStorage = (key: string): any => {
  try {
    const storedData = window.localStorage.getItem(key);

    if (null === storedData) {
      return null;
    }

    const { expires, value } = JSON.parse(storedData) || {};
    if (expires && expires < Date.now()) {
      clearLocalStorage(key);
      return null;
    }

    return value;
  } catch (error) {
    console.log(error);
  }
};

export const clearLocalStorage = (key: string): void => {
  try {
    return window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
