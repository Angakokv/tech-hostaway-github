import { ElementFinder } from "protractor";

import { TAG_SRC_ATTRIBUTE } from "./tag-attributes";
import { DEFAULT_ELEMENT_WAIT_TIMEOUT } from "./timeouts";

import * as AngularHelpers from "./angular-helpers";
import * as WaitHelpers from "./wait-helpers";

/**
 * Checks whether an element is displayed on page or not
 * @param {ElementFinder} targetElement
 * @param {boolean} toWait
 * @param {boolean} expectedState
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
export async function isDisplayed(targetElement: ElementFinder, expectedState: boolean,
                                  toWait = true, timeout = DEFAULT_ELEMENT_WAIT_TIMEOUT) {
    let caughtException = false;
    if (toWait) {
        expectedState ?
            await WaitHelpers.waitForElementToBeDisplayed(targetElement, timeout)
                .catch(() => caughtException = true) :
            await WaitHelpers.waitForElementToBeHidden(targetElement, timeout)
                .catch(() => caughtException = true);
    }

    return !caughtException && await targetElement.isDisplayed();
}

/**
 * Checks whether an element is presented on page or not
 * @param {ElementFinder} targetElement
 * @param {boolean} expectedState
 * @param {boolean} toWait
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
export async function isPresented(targetElement: ElementFinder, expectedState: boolean,
                                  toWait = true, timeout = DEFAULT_ELEMENT_WAIT_TIMEOUT) {
    let caughtException = false;
    if (toWait) {
        expectedState ?
            await WaitHelpers.waitForElementToBePresented(targetElement, timeout)
                .catch(() => caughtException = true) :
            await WaitHelpers.waitForElementToBeStaled(targetElement, timeout)
                .catch(() => caughtException = true);
    }

    return !caughtException && await targetElement.isPresent();
}

/**
 * Checks whether an element is enabled or not
 * @param {ElementFinder} targetElement
 * @param {boolean} toWait
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
export async function isEnabled(targetElement: ElementFinder, toWait = true, timeout = DEFAULT_ELEMENT_WAIT_TIMEOUT) {
    if (toWait) {
        await WaitHelpers.waitForElementToBeDisplayed(targetElement, timeout);
    }

    return await targetElement.isEnabled();
}

/**
 * Clicks on the element
 * @param {ElementFinder} targetElement
 * @param {boolean} toWait
 * @returns {Promise<void>}
 */
export async function click(targetElement: ElementFinder, toWait = false) {
    const isAngularWaitEnabled = await AngularHelpers.getAngularWaitState();

    if ((isAngularWaitEnabled && toWait) || !isAngularWaitEnabled) {
        await WaitHelpers.waitForElementToBeClickable(targetElement);
    }

    return await targetElement.click();
}

/**
 * Gets value of the given attribute of the element
 * @param {ElementFinder} targetElement
 * @param {string} attributeName
 * @returns {Promise<string>}
 */
export async function getAttributeValue(targetElement: ElementFinder, attributeName: string) {
    const attributeValue = await targetElement.getAttribute(attributeName);

    return attributeValue.trim();
}

/**
 * Gets visible text of the element
 * @param {ElementFinder} targetElement
 * @param {boolean} toWait
 * @returns {Promise<string>}
 */
export async function getText(targetElement: ElementFinder, toWait = true) {
    if (toWait) {
        await WaitHelpers.waitForElementToBeDisplayed(targetElement);
    }
    const text = await targetElement.getText();

    return text.trim();
}
/**
 * Gets "src" attribute value of the image element
 * @param {ElementFinder} targetElement
 * @returns {Promise<string>}
 */
export async function getImageSource(targetElement: ElementFinder) {
    return await this.getAttributeValue(targetElement, TAG_SRC_ATTRIBUTE);
}
