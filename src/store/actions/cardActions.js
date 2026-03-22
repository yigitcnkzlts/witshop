import api from "../../api/api";

// Action Creators
export const setCardList = (cards) => ({
  type: "SET_CARD_LIST",
  payload: cards
});

export const addCard = (card) => ({
  type: "ADD_CARD",
  payload: card
});

export const updateCard = (card) => ({
  type: "UPDATE_CARD",
  payload: card
});

export const removeCard = (cardId) => ({
  type: "REMOVE_CARD",
  payload: cardId
});

export const setSelectedCard = (card) => ({
  type: "SET_SELECTED_CARD",
  payload: card
});

// Thunk Actions
export const fetchCards = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/user/card");
      const cards = Array.isArray(response.data) ? response.data : [];
      dispatch(setCardList(cards));
    } catch (error) {
      console.error("Error fetching cards:", error);
      // Load from localStorage if API fails
      const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
      dispatch(setCardList(savedCards));
    }
  };
};

export const createCard = (cardData) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/user/card", cardData);
      dispatch(addCard(response.data));
      return response.data;
    } catch (error) {
      console.error("Error creating card:", error);
      // Save to localStorage if API fails
      const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
      const newCard = { ...cardData, id: Date.now() };
      savedCards.push(newCard);
      localStorage.setItem('savedCards', JSON.stringify(savedCards));
      dispatch(addCard(newCard));
      return newCard;
    }
  };
};

export const editCard = (cardData) => {
  return async (dispatch) => {
    try {
      const response = await api.put("/user/card", cardData);
      dispatch(updateCard(response.data));
      return response.data;
    } catch (error) {
      console.error("Error updating card:", error);
      // Update in localStorage if API fails
      const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
      const updatedCards = savedCards.map(c => c.id === cardData.id ? cardData : c);
      localStorage.setItem('savedCards', JSON.stringify(updatedCards));
      dispatch(updateCard(cardData));
      return cardData;
    }
  };
};

export const deleteCard = (cardId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/user/card/${cardId}`);
      dispatch(removeCard(cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
      // Delete from localStorage if API fails
      const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
      const filteredCards = savedCards.filter(c => c.id !== cardId);
      localStorage.setItem('savedCards', JSON.stringify(filteredCards));
      dispatch(removeCard(cardId));
    }
  };
};