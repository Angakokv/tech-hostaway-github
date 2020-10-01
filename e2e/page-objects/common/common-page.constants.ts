import { browser } from "protractor";

export const PROPERTIES_LIST_NAME = "Properties list";

// Urls
export const BASE_URL = browser.baseUrl.endsWith("/") ?
    `${browser.baseUrl.slice(0, -1)}` : `${browser.baseUrl}`;
export const PROPERTY_URL = `${BASE_URL}/listings`;

