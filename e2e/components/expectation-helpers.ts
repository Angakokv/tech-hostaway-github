import { ElementFinder } from "protractor";

import * as ElementHelpers from "./element-helpers";
import * as ValidationTextHelpers from "./validation-text-helpers";
import * as HtmlAttributes from "./html-attributes";

/**
 * Verify whether an element is displayed or not
 * @param{ElementFinder} targetElement
 * @param {string} elementName
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyDisplayStatus(targetElement: ElementFinder, elementName: string, expectedState = true) {
    await expect(await ElementHelpers.isDisplayed(targetElement, expectedState))
        .toBe(expectedState,
            expectedState ? ValidationTextHelpers.getDisplayedValidationText(elementName) :
                ValidationTextHelpers.getNotDisplayedValidationText(elementName));
}

/**
 * Verify whether an element is presented or not
 * @param {ElementFinder} targetElement
 * @param {string} elementName
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyPresentStatus(targetElement: ElementFinder, elementName: string, expectedState = false) {
    await expect(await ElementHelpers.isPresented(targetElement, expectedState))
        .toBe(expectedState,
            expectedState ? ValidationTextHelpers.getPresentedValidationText(elementName) :
                ValidationTextHelpers.getNotPresentedValidationText(elementName));
}

/**
 * Verify whether an element is enabled or not
 * @param{ElementFinder} targetElement
 * @param {string} elementName
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyEnabledStatus(targetElement: ElementFinder, elementName: string, expectedState = true) {
    await expect(await ElementHelpers.isEnabled(targetElement))
        .toBe(expectedState,
            expectedState ? ValidationTextHelpers.getEnabledValidationText(elementName) :
                ValidationTextHelpers.getNotEnabledValidationText(elementName));
}

/**
 * Verify whether object contains element or not
 * @param {any} object
 * @param {any} element
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyObjectContains(object: any, element: any, expectedState = true) {
    await expect(object).toContain(element,
        expectedState ? ValidationTextHelpers.getContainsValidationText(object, element) :
            ValidationTextHelpers.getDoesntContainValidationText(object, element));
}

/**
 * Verify whether TextBox value is equal to expected value or not
 * @param {ElementFinder} targetElement
 * @param {string} expectedValue
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyTextBoxValueEquality(targetElement: ElementFinder, expectedValue: string,
                                                 expectedState = true) {
    const actualValue = await ElementHelpers.getAttributeValue(targetElement, HtmlAttributes.VALUE);

    expectedState ?
        await expect(actualValue).toEqual(expectedValue,
            ValidationTextHelpers.getEqualToValidationText(actualValue, expectedValue)) :
        await expect(actualValue).not.toEqual(expectedValue,
            ValidationTextHelpers.getNotEqualToValidationText(actualValue, expectedValue));
}

/**
 * Verify whether actual value is equal to expected value or not
 * @param {number} actualValue
 * @param {number} expectedValue
 * @param {boolean} expectedState
 * @param {string} message
 * @returns {Promise<void>}
 */
export async function verifyValueEquality(actualValue: any, expectedValue: any,
                                          expectedState = true, message = "") {
    expectedState ?
        await expect(actualValue).toEqual(expectedValue,
            ValidationTextHelpers.getEqualToValidationText(actualValue, expectedValue, message)) :
        await expect(actualValue).not.toEqual(expectedValue,
            ValidationTextHelpers.getNotEqualToValidationText(actualValue, expectedValue, message));
}
