export const setFavorites = (favorites) => ({
  type: "SET_FAVORITES",
  payload: favorites,
});

export const toggleFavorite = (product) => {
  return (dispatch, getState) => {
    const list = getState().favorites.list;
    const exists = list.some((p) => p.id === product.id);

    if (exists) {
      dispatch({ type: "REMOVE_FAVORITE", payload: product.id });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: product });
    }

    const updated = getState().favorites.list;
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
};

export const loadFavorites = () => {
  return (dispatch) => {
    try {
      const saved = localStorage.getItem("favorites");
      if (saved) {
        dispatch(setFavorites(JSON.parse(saved)));
      }
    } catch {
      localStorage.removeItem("favorites");
    }
  };
};
