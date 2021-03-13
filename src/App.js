import "./App.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { ROOT, STEPS, PERSONAL_DETAILS, CAR_DETAILS, SUCCESS } from "./routes";
import { createBrowserHistory } from "history";
import { PersonalDetails, CarDetails, SubmitSuccess } from "./screens";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from={ROOT} to={PERSONAL_DETAILS} />
        <Redirect exact from={STEPS} to={PERSONAL_DETAILS} />
        <Route path={PERSONAL_DETAILS} component={PersonalDetails} />
        <Route path={CAR_DETAILS} component={CarDetails} />
        <Route path={SUCCESS} component={SubmitSuccess} />
      </Switch>
    </Router>
  );
}

export default App;
