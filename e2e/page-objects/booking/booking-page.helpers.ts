import { VALIDATION_FIELD_MESSAGE_NAME } from "./booking-page.constants";

import { ElementFinder } from "protractor";
import { BookingPage } from "./booking-page.po";

import * as ExpectationHelpers from "../../components/expectation-helpers";

export async function clickOnBillingCountryFieldAndSendTabKeyTwice() {
    await BookingPage.clickOnBillingCountryField();
    await BookingPage.sendTabKeyToBillingCountryField();
    await BookingPage.sendTabKeyToBillingCountryField();
}

export async function verifyFieldValidationMessageIsDisplayed(field: ElementFinder, fieldName: string, message: string) {
    await ExpectationHelpers.verifyDisplayStatus(BookingPage.fieldValidationMessage(field, message),
        VALIDATION_FIELD_MESSAGE_NAME(fieldName));
}
