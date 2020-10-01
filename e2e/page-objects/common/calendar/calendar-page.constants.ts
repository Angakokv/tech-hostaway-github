export const CALENDAR_NAME = "Calendar";
export const START_DATE_CELL_NAME = "Start date day";

// XPath selectors
export const SELECTED_START_DATE_CELL_XPATH_SELECTOR =
    "td[contains(@class, \"CalendarDay--selected-start\")]/button";
export const SELECTED_END_DATE_CELL_XPATH_SELECTOR =
    "td[contains(@class, \"CalendarDay--selected-end\")]/button";
export const UNBLOCKED_DATE_CELL_XPATH_SELECTOR =
    "td[contains(@class, \"CalendarDay--valid\") and not(contains(@style, \"background\"))]";
export const FOLLOWING_SIBLING_UNBLOCKED_DATE_CELL_XPATH_SELECTOR =
    `/following-sibling::${UNBLOCKED_DATE_CELL_XPATH_SELECTOR}`;
