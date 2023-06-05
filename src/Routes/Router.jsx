import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage, IntroPage } from "../Pages";
import {
  ROUTE_LANDING_PAGE,
  ROUTE_INTRO_PAGE,

} from "./RouteMapping";

function Router() {
  return (
    <Routes>
      <Route path={ROUTE_INTRO_PAGE} element={<IntroPage />}></Route>
      <Route path={ROUTE_LANDING_PAGE} element={<LandingPage />}></Route>
      <Route path="*" element={<IntroPage />}></Route>
    </Routes>
  );
}

export default Router;
