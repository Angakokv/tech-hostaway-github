import {
    browser,
    protractor,
    ElementFinder
} from "protractor";

import { PROPERTY_URL } from "./common-page.constants";
import { DEFAULT_ELEMENT_WAIT_TIMEOUT } from "../../components/timeouts";

import { StepLogger } from "../../loggers/step-logger";
import { CommonPage } from "./common-page.po";

import * as AngularHelpers from "../../components/angular-helpers";
import * as ElementHelpers from "../../components/element-helpers";
import * as ExpectationHelpers from "../../components/expectation-helpers";
import * as WaitHelpers from "../../components/wait-helpers";
import * as TextBoxHelpers from "../../components/textbox-helpers";

export async function refreshPage() {
    await browser.navigate().refresh();
}

export async function navigateBack() {
    await browser.navigate().back();
}

export async function navigateTo(url: string) {
    await AngularHelpers.disableAngularWait();
    return await browser.get(url, DEFAULT_ELEMENT_WAIT_TIMEOUT);
}

export async function navigateToMainPage() {
    const url = browser.baseUrl;
    StepLogger.subStep(`Navigate to main page: ${url}`);
    return await this.navigateTo(url);
}

export async function navigateToPropertyPageById(id: string) {
    const url = `${PROPERTY_URL}/${id}`;
    return await this.navigateTo(url);
}

export async function forceLogout() {
    await browser.executeScript("window.sessionStorage.clear();");
    await browser.executeScript("window.localStorage.clear();");
}

export async function verifyElementTextIsntEmpty(targetElement: ElementFinder, message: string) {
    const actualText = await ElementHelpers.getText(targetElement);
    await ExpectationHelpers.verifyValueEquality(actualText,
        "", false, message);
}

export async function verifyAllPropertiesHaveNonEmptyAttributes() {
    await CommonPage.allListingsCards.each(async function(element) {
        await CommonPage.verifyPropertyHaveNonEmptyAttributes(element);
    });
}

export async function waitForSearchToComplete() {
    await WaitHelpers.waitForElementToBeStaled(CommonPage.spinnerIcon);
}

export async function verifyFieldIsEditable(field: ElementFinder, fieldName: string) {
    await ExpectationHelpers.verifyEnabledStatus(field,
        fieldName);
}

export async function sendTabKeyToField(field: ElementFinder) {
    await TextBoxHelpers.sendKey(field, protractor.Key.TAB);
}

export async function verifyDropdownListIsntEmpty(dropdownElement: ElementFinder) {
    const dropdownListText = await ElementHelpers.getText(dropdownElement);

    await ExpectationHelpers.verifyValueEquality(dropdownListText, "", false);
}
