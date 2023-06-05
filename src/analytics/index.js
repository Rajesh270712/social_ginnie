// import platform from "platform";
// import { STORAGE_CREATOR_INVITE_ID } from "../utils/constants";
// import { isEmpty } from "../utils/helpers";

// export const MICROSITE_LANDING_PAGE_VIEW = "MICROSITE_LANDING_PAGE_VIEW";
// export const MICROSITE_CONNECT_ACCOUNT_INITIATED = "MICROSITE_CONNECT_ACCOUNT_INITIATED";
// export const MICROSITE_INSTRUCTIONS_SCREEN_VIEW = "MICROSITE_INSTRUCTIONS_SCREEN_VIEW";
// export const MICROSITE_CONNECT_ACCOUNT_SUCCESS = "MICROSITE_CONNECT_ACCOUNT_SUCCESS";
// export const MICROSITE_CONNECT_MORE_ACCOUNTS = "MICROSITE_CONNECT_MORE_ACCOUNTS";
// export const MICROSITE_CONNECT_ACCOUNT_FAILED = "MICROSITE_CONNECT_ACCOUNT_FAILED";
// export const MICROSITE_CONNECT_TRY_AGAIN = "MICROSITE_CONNECT_TRY_AGAIN";
// export const MICROSITE_CONNECT_ANOTHER_ACCOUNT = "MICROSITE_CONNECT_ANOTHER_ACCOUNT";

// let analyticsToSend;
// // identity
// export const logUser = (userId, userObj) => {
//   window.analytics.identify(userId, userObj);
// };

// // track
// export const trackEvent = async (eventName, eventObj = {}) => {
//   if (isEmpty(analyticsToSend)) await updateAnalytics();
//   const eventToSend = { ...eventObj, ...analyticsToSend };
//   window.analytics.track(eventName, eventToSend);
// };

// // page
// export const changePage = (page, params = {}) => {
//   window.analytics.page(page, params);
// };

// export const updateAnalytics = async (params) => {
//   try {
//     const deviceLocale = window.navigator.languages;
//     const browserLocale = window.navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
//     const { userAgent } = window.navigator;
//     const {
//       product,
//       manufacturer,
//       os: { family: deviceOs },
//       os: { version: deviceOsVersion },
//     } = platform;
//     const { name: browser, version: browserVersion } = platform.parse(userAgent);
//     let IPAddress;
//     try {
//       const res = await fetch("https://geolocation-db.com/json/");
//       const response = await res.json();
//       IPAddress = response?.IPv4;
//     } catch (e) {
//       IPAddress = "Not found";
//     }
//     const analyticsPayload = {
//       device_manufacturer: manufacturer,
//       device_name: product,
//       device_model: product,
//       device_os: deviceOs,
//       device_os_version: deviceOsVersion,
//       device_locale: deviceLocale,
//       device_language: window.navigator.languages,
//       device_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       device_dimensions_width: window.screen.width,
//       device_dimensions_height: window.screen.height,
//       viewport_width: window.innerWidth,
//       viewport_height: window.innerHeight,
//       ip_address: IPAddress,
//       network_type: navigator?.connection?.effectiveType,
//       browser_name: browser,
//       browser_version: browserVersion,
//       browser_locale: browserLocale,
//       browser_user_agent: userAgent,
//       params,
//       sdk: params?.sdk ? params?.sdk : "web",
//       os: deviceOs,
//       user_id: params?.userId,
//       app_name: params?.appName,
//       creator_invite_id: sessionStorage.getItem(STORAGE_CREATOR_INVITE_ID),
//     };
//     analyticsToSend = analyticsPayload;
//     return analyticsPayload;
//   } catch (e) {
//     console.log(e);
//   }
// };
