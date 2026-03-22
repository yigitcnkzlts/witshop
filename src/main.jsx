import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import App from "./App.jsx";
import store from "./store/store";
import { fetchRoles, verifyToken, fetchCategories } from "./store/actions";
import "./index.css";

// Redux store'u initialize eden component
function AppWithRedux() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Uygulama başladığında gerekli verileri fetch et
    dispatch(fetchRoles());
    dispatch(fetchCategories());
    
    // Auto login - token varsa verify et
    dispatch(verifyToken());
  }, [dispatch]);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppWithRedux />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);