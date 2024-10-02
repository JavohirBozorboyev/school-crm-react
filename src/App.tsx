import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./store";
import axios from "axios";
import { SWRConfig } from "swr";
// import { useSelector } from "react-redux";
// import { RootState } from "./store";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function App() {
  // const { isAuthenticated, user } = useSelector(
  //   (state: RootState) => state.auth
  // );

  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: fetcher,
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
