const getItems = () => {
  return fetch(`/api/categories/items`,  {
    cache: "no-store"
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCategories = () => {
  return fetch(`/api/categories`, {
    cache: "no-store"
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getItems, getCategories};