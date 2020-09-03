async function setKey(key, data) {
  try {
    await localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

async function getKey(key) {
  try {
    const value = await localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function removeKey(key) {
  try {
    await localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

async function clearStorage() {
  try {
    await localStorage.clear();
  } catch (error) {
    console.error(error);
  }
}

export {
  setKey,
  getKey,
  removeKey,
  clearStorage,
};
