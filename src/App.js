import { Router, Switch, Route, Redirect } from "react-router-dom";
import {
  ROOT,
  STEPS,
  PERSONAL_DETAILS,
  CAR_DETAILS,
  SUCCESS,
  Layout
} from "./routes";
import { createBrowserHistory } from "history";
import { PersonalDetails, CarDetails, SubmitSuccess } from "./screens";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./app/store";

const history = createBrowserHistory();

const theme = extendTheme({
  styles: {
    global: {
      ".datepicker-container": {
        width: "100%"
      }
    }
  }
});

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Router history={history}>
            <Switch>
              <Redirect exact from={ROOT} to={PERSONAL_DETAILS} />
              <Redirect exact from={STEPS} to={PERSONAL_DETAILS} />
              <Route path={PERSONAL_DETAILS} component={PersonalDetails} />
              <Route path={CAR_DETAILS} component={CarDetails} />
              <Route path={SUCCESS} component={SubmitSuccess} />
            </Switch>
          </Router>
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
