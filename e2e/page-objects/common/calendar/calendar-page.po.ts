import {
    By,
    element,
    protractor,
    ElementFinder
} from "protractor";


import {
    CALENDAR_NAME,
    FOLLOWING_SIBLING_UNBLOCKED_DATE_CELL_XPATH_SELECTOR,
    SELECTED_END_DATE_CELL_XPATH_SELECTOR,
    SELECTED_START_DATE_CELL_XPATH_SELECTOR,
    START_DATE_CELL_NAME,
    UNBLOCKED_DATE_CELL_XPATH_SELECTOR
} from "./calendar-page.constants";

import { CommonPage } from "../common-page.po";

import * as ElementHelpers from "../../../components/element-helpers";
import * as ExpectationHelpers from "../../../components/expectation-helpers";
import * as TextBoxHelpers from "../../../components/textbox-helpers";

/* tslint:disable:member-ordering*/
export class CalendarPage {
    // Containers
    static readonly calendarPopup =
        element(By.css("div.DateRangePicker__picker"));

    // Cells
    static readonly firstAvailableCell =
        element.all(By.css("td.CalendarDay--valid > button")).first();
    static readonly selectedStartDateCell =
        CalendarPage.calendarPopup.element(By.css("td.CalendarDay--selected-start > button"));
    static readonly previousBeforeSelectedCell = (daysQty: number) =>
        CalendarPage.calendarPopup.element(By.xpath(
            `(//${SELECTED_END_DATE_CELL_XPATH_SELECTOR}/preceding::${UNBLOCKED_DATE_CELL_XPATH_SELECTOR})[${daysQty}]`));
    static readonly nextAfterSelectedStartDayCell = (daysQty: number) =>
        CalendarPage.calendarPopup.element(By.xpath(
            `(//${SELECTED_START_DATE_CELL_XPATH_SELECTOR}/following::${UNBLOCKED_DATE_CELL_XPATH_SELECTOR})[${daysQty}]`));
    static readonly nextAfterSelectedEndDayCell = (daysQty: number) =>
        CalendarPage.calendarPopup.element(By.xpath(
            `(//${SELECTED_END_DATE_CELL_XPATH_SELECTOR}/following::${UNBLOCKED_DATE_CELL_XPATH_SELECTOR})[${daysQty}]`));
    static readonly firstUnblockedRow =
        element.all(By.xpath(
            `//${UNBLOCKED_DATE_CELL_XPATH_SELECTOR}${FOLLOWING_SIBLING_UNBLOCKED_DATE_CELL_XPATH_SELECTOR.repeat(6)}//parent::tr`)).first();

    static async openCalendarByCheckin() {
        await TextBoxHelpers.sendKey(CommonPage.checkinField, protractor.Key.DOWN);
    }

    static async openCalendarByCheckout() {
        await TextBoxHelpers.sendKey(CommonPage.checkoutField, protractor.Key.DOWN);
    }

    static async selectFirstAvailableDay() {
        await ElementHelpers.click(this.firstAvailableCell);
    }

    static async selectFirstAvailableDayInRow(rowElement: ElementFinder) {
        await ElementHelpers.click(rowElement.element(this.firstAvailableCell.locator()));
    }

    static async selectFirstAvailableDayInFirstUnblockedRow() {
        await this.selectFirstAvailableDayInRow(this.firstUnblockedRow);
    }

    static async selectNextAfterSelectedStartDayAvailableDay(daysQty: number) {
        await ElementHelpers.click(this.nextAfterSelectedStartDayCell(daysQty));
    }

    static async selectNextAfterSelectedEndDayAvailableDay(daysQty: number) {
        await ElementHelpers.click(this.nextAfterSelectedEndDayCell(daysQty));
    }

    static async verifyStartDateIsSelected() {
        await ExpectationHelpers.verifyDisplayStatus(this.selectedStartDateCell,
            START_DATE_CELL_NAME);
    }

    static async verifyEndDateIsSelected() {
        await ExpectationHelpers.verifyTextBoxValueEquality(CommonPage.checkoutField, "", false);
    }

    static async verifyCalendarPresentStatus(expectedState = false) {
        await ExpectationHelpers.verifyPresentStatus(this.calendarPopup,
            CALENDAR_NAME, expectedState);
    }

    static async verifyCalendarIsDisplayed() {
        await ExpectationHelpers.verifyDisplayStatus(this.calendarPopup,
            CALENDAR_NAME);
    }
}
