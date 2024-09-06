import { render } from "preact";
import { App } from "./app.tsx";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import "./index.css";

render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("app")!
);
