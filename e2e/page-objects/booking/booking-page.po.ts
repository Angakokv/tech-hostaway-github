import {
    element,
    By,
    ElementFinder
} from "protractor";

import {
    BILLING_ADDRESS_FIELD_NAME,
    BILLING_COUNTRY_FIELD_NAME,
    BOOKING_VIEW_NAME,
    CARD_NUMBER_FIELD_NAME,
    CITY_FIELD_NAME,
    EMAIL_ADDRESS_FIELD_NAME,
    FIRST_NAME_FIELD_NAME,
    FULL_NAME_FIELD_NAME,
    LAST_NAME_FIELD_NAME,
    MESSAGE_TO_OWNER_FIELD_NAME,
    PHONE_NUMBER_FIELD_NAME,
    ZIP_CODE_FIELD_NAME
} from "./booking-page.constants";

import * as ElementHelpers from "../../components/element-helpers";
import * as ExpectationHelpers from "../../components/expectation-helpers";
import * as CommonPageHelpers from "../../page-objects/common/common-page.helpers";
import * as BookingPageHelpers from "../../page-objects/booking/booking-page.helpers";
import * as TextBoxHelpers from "../../components/textbox-helpers";

/* tslint:disable:member-ordering*/
export class BookingPage {
    static readonly mainContainer =
        element(By.css("div.booking-view"));

    // Guest info controls
    static readonly fieldValidationMessage = (field: ElementFinder, text: string) =>
        field.element(By.xpath(`//preceding-sibling::label[contains((.), "${text}")]`));
    static readonly firstNameField =
        element(By.css("input[name=\"guestFirstName\"]"));
    static readonly lastNameField =
        element(By.css("input[name=\"guestLastName\"]"));
    static readonly emailAddressField =
        element(By.css("input[name=\"guestEmail\"]"));
    static readonly phoneNumberField =
        element(By.css("input[name=\"phone\"]"));
    static readonly messageToOwnerField =
        element(By.css("input[name=\"guestNote\"]"));
    static readonly cardNumberField =
        element(By.css("input[name=\"ccNumber\"]"));
    static readonly fullNameField =
        element(By.css("input[name=\"ccName\"]"));
    static readonly expirationDateMonthField =
        element(By.css("select[name=\"ccExpirationMonth\"]"));
    static readonly expirationDateYearField =
        element(By.css("select[name=\"ccExpirationYear\"]"));
    static readonly billingAddressField =
        element(By.css("input[name=\"guestAddress\"]"));
    static readonly zipCodeField =
        element(By.css("input[name=\"guestZipCode\"]"));
    static readonly cityField =
        element(By.css("input[name=\"guestCity\"]"));
    static readonly billingCountryField =
        element(By.css("select[name=\"guestCountry\"]"));

    // Guest info methods
    static async clickOnFirstNameField() {
        await ElementHelpers.click(this.firstNameField);
    }

    static async sendTabKeyToFirstNameField() {
        await CommonPageHelpers.sendTabKeyToField(this.firstNameField);
    }

    static async verifyFirstNameFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.firstNameField,
            FIRST_NAME_FIELD_NAME);
    }

    static async verifyFirstNameFieldValidationMessageIsDisplayed(message: string) {
        await BookingPageHelpers.verifyFieldValidationMessageIsDisplayed(this.firstNameField,
            FIRST_NAME_FIELD_NAME, message);
    }

    static async clickOnLastNameField() {
        await ElementHelpers.click(this.lastNameField);
    }

    static async sendTabKeyToLastNameField() {
        await CommonPageHelpers.sendTabKeyToField(this.lastNameField);
    }

    static async verifyLastNameFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.lastNameField,
            LAST_NAME_FIELD_NAME);
    }

    static async verifyLastNameFieldValidationMessageIsDisplayed(message: string) {
        await BookingPageHelpers.verifyFieldValidationMessageIsDisplayed(this.lastNameField,
            LAST_NAME_FIELD_NAME, message);
    }

    static async clickOnEmailAddressField() {
        await ElementHelpers.click(this.emailAddressField);
    }

    static async sendTabKeyToEmailAddressField() {
        await CommonPageHelpers.sendTabKeyToField(this.emailAddressField);
    }

    static async verifyEmailAddressFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.emailAddressField,
            EMAIL_ADDRESS_FIELD_NAME);
    }

    static async verifyEmailAddressFieldValidationMessageIsDisplayed(message: string) {
        await BookingPageHelpers.verifyFieldValidationMessageIsDisplayed(this.emailAddressField,
            EMAIL_ADDRESS_FIELD_NAME, message);
    }

    static async inputPhoneNumber(phoneNumber: string) {
        await TextBoxHelpers.sendKeys(this.phoneNumberField, phoneNumber);
    }

    static async verifyPhoneNumberValue(expectedValue: string) {
        await ExpectationHelpers.verifyTextBoxValueEquality(this.phoneNumberField, expectedValue);
    }

    static async verifyPhoneNumberFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.phoneNumberField,
            PHONE_NUMBER_FIELD_NAME);
    }

    static async verifyMessageToOwnerFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.messageToOwnerField,
            MESSAGE_TO_OWNER_FIELD_NAME);
    }

    static async verifyCardNumberFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.cardNumberField,
            CARD_NUMBER_FIELD_NAME);
    }

    static async verifyFullNameFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.fullNameField,
            FULL_NAME_FIELD_NAME);
    }

    static async verifyExpirationDateMonthListIsntEmpty() {
        await CommonPageHelpers.verifyDropdownListIsntEmpty(this.expirationDateMonthField);
    }

    static async verifyExpirationDateYearListIsntEmpty() {
        await CommonPageHelpers.verifyDropdownListIsntEmpty(this.expirationDateYearField);
    }

    static async clickOnBillingAddressField() {
        await ElementHelpers.click(this.billingAddressField);
    }

    static async sendTabKeyToBillingAddressField() {
        await CommonPageHelpers.sendTabKeyToField(this.billingAddressField);
    }

    static async verifyBillingAddressFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.billingAddressField,
            BILLING_ADDRESS_FIELD_NAME);
    }

    static async verifyBillingAddressFieldValidationMessageIsDisplayed(message: string) {
        await BookingPageHelpers.verifyFieldValidationMessageIsDisplayed(this.billingAddressField,
            BILLING_ADDRESS_FIELD_NAME, message);
    }

    static async clickOnZipCodeField() {
        await ElementHelpers.click(this.zipCodeField);
    }

    static async sendTabKeyToZipCodeField() {
        await CommonPageHelpers.sendTabKeyToField(this.zipCodeField);
    }

    static async verifyZipCodeFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.zipCodeField,
            ZIP_CODE_FIELD_NAME);
    }

    static async verifyZipCodeFieldValidationMessageIsDisplayed(message: string) {
        await BookingPageHelpers.verifyFieldValidationMessageIsDisplayed(this.zipCodeField,
            ZIP_CODE_FIELD_NAME, message);
    }

    static async clickOnCityField() {
        await ElementHelpers.click(this.cityField);
    }

    static async sendTabKeyToCityField() {
        await CommonPageHelpers.sendTabKeyToField(this.cityField);
    }

    static async verifyCityFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.cityField,
            CITY_FIELD_NAME);
    }

    static async verifyCityFieldValidationMessageIsDisplayed(message: string) {
        await BookingPageHelpers.verifyFieldValidationMessageIsDisplayed(this.cityField,
            CITY_FIELD_NAME, message);
    }

    static async clickOnBillingCountryField() {
        await ElementHelpers.click(this.billingCountryField);
    }

    static async sendTabKeyToBillingCountryField() {
        await CommonPageHelpers.sendTabKeyToField(this.billingCountryField);
    }

    static async verifyBillingCountryFieldIsEditable() {
        await CommonPageHelpers.verifyFieldIsEditable(this.billingCountryField,
            BILLING_COUNTRY_FIELD_NAME);
    }

    static async verifyBillingCountryFieldValidationMessageIsDisplayed(message: string) {
        await BookingPageHelpers.verifyFieldValidationMessageIsDisplayed(this.billingCountryField,
            BILLING_COUNTRY_FIELD_NAME, message);
    }

    static async verifyBillingCountryListIsntEmpty() {
        await CommonPageHelpers.verifyDropdownListIsntEmpty(this.billingCountryField);
    }

    // General methods
    static async verifyPageIsOpened() {
        await ExpectationHelpers.verifyDisplayStatus(this.mainContainer,
            BOOKING_VIEW_NAME);
    }
}
