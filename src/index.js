import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Sentry.setTag("project", "Connect creator account microsite");

// Sentry.init({
//   dsn: process.env.REACT_APP_SENTRY_API_KEY,
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <StrictMode>
    <App />
  </StrictMode>
  </>
);
