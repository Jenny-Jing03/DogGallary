const SERVER_URL = "https://dog.ceo/api";

export const getAllBreeds = () => {
  return fetch(`${SERVER_URL}/breeds/list/all`).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get the list of all breeds");
    }
    return response.json();
  });
};

export const getByBreed = (breed) => {
  return fetch(`${SERVER_URL}/breed/${breed}/images/random/5`).then(
    (response) => {
      if (response.status !== 200) {
        throw Error("Fail to get the image");
      }
      return response.json();
    }
  );
};

export const getRandomBreed = (number = 30) => {
  return fetch(`${SERVER_URL}/breeds/image/random/${number}`).then(
    (response) => {
      if (response.status !== 200) {
        throw Error("Fail to get the image");
      }
      return response.json();
    }
  );
};
