import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./store";
import axios from "axios";
import { SWRConfig } from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function App() {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetcher,
          errorRetryCount: 5,
          errorRetryInterval: 1000,
        }}
      >
        <Provider store={store}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Provider>
      </SWRConfig>
    </>
  );
}

export default App;
