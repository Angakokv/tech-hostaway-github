import { browser } from "protractor";

export const PROPERTY_ID = browser.params.propertyId;
export const PROPERTY_MINIMUM_STAY_DAYS = browser.params.propertyMinimumStayDays;

export const PROPERTY_VIEW_NAME = "Property view";
export const COUPON_APPLICATION_MESSAGE_NAME = "Coupon application message";
export const COUPON_SUCCESSFUL_APPLICATION_MESSAGE_TEXT = "Coupon successfully applied";

// XPath selectors
export const THUMBNAIL_IMAGE_XPATH_SELECTOR =
    "a[@class=\"image-gallery-thumbnail\"]//img";
export const CURRENT_THUMBNAIL_IMAGE_XPATH_SELECTOR =
    "a[@class=\"image-gallery-thumbnail active\"]//img";
