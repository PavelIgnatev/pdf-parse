import { BrowserRouter, Switch, Route } from "react-router-dom";

import { MainPage } from "./MainPage";

export const Pages = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/*" component={() => <MainPage />} />
      </Switch>
    </BrowserRouter>
  );
};
