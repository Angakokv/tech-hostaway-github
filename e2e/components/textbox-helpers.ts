import {
    browser,
    protractor,
    ElementFinder
} from "protractor";

import * as WaitHelpers from "./wait-helpers";

/**
 * Clear existing text from an input element
 * @param {ElementFinder} targetElement
 */
export async function clearText(targetElement: ElementFinder) {
    let ctrl = protractor.Key.CONTROL;
    if (browser.platform && browser.platform.indexOf("Mac")) {
        ctrl = protractor.Key.COMMAND;
    }
    const command = protractor.Key.chord(ctrl, "a") + protractor.Key.BACK_SPACE;

    await targetElement.sendKeys(command);
    await targetElement.clear();
}

/**
 * Send key to an input element once it becomes presented
 * @param {ElementFinder} targetElement
 * @param {string} value to be sent
 */
export async function sendKey(targetElement: ElementFinder, value: string) {
    await WaitHelpers.waitForElementToBePresented(targetElement);
    await targetElement.sendKeys(value);
}


/**
 * Send Keys to an input element once it becomes displayed
 * @param {ElementFinder} targetElement
 * @param {string} value to be sent
 * @param {boolean} sendEnter - whether to send an enter key or not
 * @param {boolean} toClearText - whether to clear text or not
 */
export async function sendKeys(targetElement: ElementFinder, value: string, sendEnter = false, toClearText = true) {
    await WaitHelpers.waitForElementToBeDisplayed(targetElement);
    if (toClearText) {
        await this.clearText(targetElement);
    }

    await targetElement.sendKeys(value);
    if (sendEnter) {
        await targetElement.sendKeys(protractor.Key.ENTER);
    }
}
