import { SMOKE_TEST_SUITE } from "../../../components/suite-names";
import {
    PROPERTY_ID,
    PROPERTY_MINIMUM_STAY_DAYS,
    COUPON_SUCCESSFUL_APPLICATION_MESSAGE_TEXT
} from "../../../page-objects/property/property-page.constants";

import { StepLogger } from "../../../loggers/step-logger";
import { BookingPage } from "../../../page-objects/booking/booking-page.po";
import { BookingFormPage } from "../../../page-objects/common/booking-form/booking-form-page.po";
import { CalendarPage } from "../../../page-objects/common/calendar/calendar-page.po";
import { CommonPage } from "../../../page-objects/common/common-page.po";
import { DialogPage } from "../../../page-objects/common/dialog/dialog-page.po";
import { HomePage } from "../../../page-objects/home/home-page.po";
import { PropertyPage } from "../../../page-objects/property/property-page.po";
import { SearchPage } from "../../../page-objects/search/search-page.po";

import * as ExpectationHelpers from "../../../components/expectation-helpers";
import * as CommonPageHelpers from "../../../page-objects/common/common-page.helpers";
import * as DialogPageHelpers from "../../../page-objects/common/dialog/dialog-page.helpers";
import * as PropertyPageHelpers from "../../../page-objects/property/property-page.helpers";
import * as BookingPageHelpers from "../../../page-objects/booking/booking-page.helpers";

describe(SMOKE_TEST_SUITE, () => {
    it("[TC1] Listing search page via Home Page - [1001]", async () => {
        StepLogger.caseId = 1001;

        StepLogger.stepId(1);
        StepLogger.step("Open home page.");
        await CommonPageHelpers.navigateToMainPage();
        StepLogger.verification("Home page is opened successfully.");
        await HomePage.verifyPageIsOpened();

        StepLogger.stepId(2);
        StepLogger.step("Check property list display.");
        StepLogger.verification("Properties list is displayed on the page.");
        await CommonPage.verifyPropertiesListIsDisplayed();

        StepLogger.stepId(3);
        StepLogger.step("Check properties attributes.");
        StepLogger.verification("All properties have name, price, address.");
        await CommonPageHelpers.verifyAllPropertiesHaveNonEmptyAttributes();

        StepLogger.stepId(4);
        StepLogger.step("Click the search button leaving all fields blank.");
        await CommonPage.clickSearch();
        StepLogger.verification("Search isn’t performed." +
            " Warning message “Please select arrival and departure date” is displayed.");
        const warningMessage = "Please select arrival and departure date";
        await DialogPageHelpers.verifyDialogIsDisplayedAndContainsText(warningMessage);

        StepLogger.stepId(5);
        StepLogger.step("Close the dialog by clicking “Close” button.");
        await DialogPage.closeDialog();
        StepLogger.verification("Dialog is closed.");
        await DialogPage.verifyDialogPresentStatus();

        StepLogger.stepId(6);
        StepLogger.step("Save quantity Q1 of displayed properties.");
        StepLogger.verification("Quantity is saved successfully.");
        const quantityQ1 = await CommonPage.getListingCardsQuantity();

        StepLogger.stepId(7);
        StepLogger.step("Open calendar.");
        await CalendarPage.openCalendarByCheckin();
        StepLogger.verification("Calendar is opened.");
        await CalendarPage.verifyCalendarIsDisplayed();

        StepLogger.stepId(8);
        StepLogger.step("Select first available date in calendar.");
        await CalendarPage.selectFirstAvailableDay();
        StepLogger.verification("Date is selected successfully.");
        await CalendarPage.verifyStartDateIsSelected();

        StepLogger.stepId(9);
        StepLogger.step("Select the next date in the calendar.");
        await CalendarPage.selectNextAfterSelectedStartDayAvailableDay(1);
        StepLogger.verification("Date is selected successfully.");
        await CalendarPage.verifyEndDateIsSelected();

        StepLogger.stepId(10);
        StepLogger.step("Check calendar presence.");
        StepLogger.verification("Calendar is closed.");
        await CalendarPage.verifyCalendarPresentStatus();

        StepLogger.stepId(11);
        StepLogger.step("Input value “2” into “Guests” field.");
        const guestsQty = "2";
        await CommonPage.inputGuests(guestsQty);
        StepLogger.verification("Value is inputed successfully.");
        await CommonPage.verifyGuestsValue(guestsQty);

        StepLogger.stepId(12);
        StepLogger.step("Click search button.");
        await CommonPage.clickSearch();
        StepLogger.verification("Search is completed.");
        await CommonPageHelpers.waitForSearchToComplete();

        StepLogger.stepId(13);
        StepLogger.step("Check that search page is opened.");
        StepLogger.verification("Search page is displayed.");
        await SearchPage.verifyPageIsOpened();

        StepLogger.stepId(14);
        StepLogger.step("Check search results list.");
        StepLogger.verification("Properties list is displayed.");
        await CommonPage.verifyPropertiesListIsDisplayed();

        StepLogger.stepId(15);
        StepLogger.step("Check properties attributes.");
        StepLogger.verification("All properties have name, price, address.");
        await CommonPageHelpers.verifyAllPropertiesHaveNonEmptyAttributes();

        StepLogger.stepId(16);
        StepLogger.step("Save quantity Q2 of displayed properties.");
        StepLogger.verification("Quantity is saved successfully.");
        const quantityQ2 = await CommonPage.getListingCardsQuantity();

        StepLogger.stepId(17);
        StepLogger.step("Compare values of Q1 and Q2.");
        StepLogger.verification("Values are different.");
        await ExpectationHelpers.verifyValueEquality(quantityQ1, quantityQ2, false,
            "Properties quantity");
    });

    it("[TC2] Listing details page - [1002]", async () => {
        StepLogger.caseId = 1002;

        StepLogger.stepId(1);
        StepLogger.step("Open property detailed page.");
        await CommonPageHelpers.navigateToPropertyPageById(PROPERTY_ID);
        StepLogger.verification("Property page is opened successfully.");
        await PropertyPage.verifyPageIsOpened();

        StepLogger.stepId(2);
        StepLogger.step("Click “>” button on the current property’s photo.");
        StepLogger.verification("Photo is changed to the next photo displayed in gallery thumbnails.");
        await PropertyPageHelpers.verifyNextSlideButtonFunctioning();

        StepLogger.stepId(3);
        StepLogger.step("Click “<” button on the current property’s photo.");
        StepLogger.verification("Photo is changed to the previous photo displayed in gallery thumbnails.");
        await PropertyPageHelpers.verifyPreviousSlideButtonFunctioning();

        StepLogger.stepId(4);
        StepLogger.step("Check property attributes.");
        StepLogger.verification("Property has name, address, description.");
        await PropertyPage.verifyPropertyHaveNonEmptyAttributes();

        StepLogger.stepId(5);
        StepLogger.step("Open calendar.");
        await CalendarPage.openCalendarByCheckin();
        StepLogger.verification("Calendar is opened.");
        await CalendarPage.verifyCalendarIsDisplayed();

        StepLogger.stepId(6);
        StepLogger.step("Choose a row with all free dates and select the first date.");
        await CalendarPage.selectFirstAvailableDayInFirstUnblockedRow();
        StepLogger.verification("Date is selected successfully.");
        await CalendarPage.verifyStartDateIsSelected();

        StepLogger.stepId(7);
        StepLogger.step("Click on the date which is equal to first date + 3.");
        await CalendarPage.selectNextAfterSelectedStartDayAvailableDay(PROPERTY_MINIMUM_STAY_DAYS);
        StepLogger.verification("Date is selected successfully.");
        await CalendarPage.verifyEndDateIsSelected();

        StepLogger.stepId(8);
        StepLogger.step("Check calendar presence.");
        StepLogger.verification("Calendar is closed.");
        await CalendarPage.verifyCalendarPresentStatus();

        StepLogger.stepId(9);
        StepLogger.step("Note “Total” sum value as T1.");
        StepLogger.verification("Value is noted.");
        const totalValue1 = await BookingFormPage.getTotalSum();

        StepLogger.stepId(10);
        StepLogger.step("Input value “QAVACANCY2020” into “Coupon name” field.");
        const couponText = "QAVACANCY2020";
        await BookingFormPage.inputCoupon(couponText);
        StepLogger.verification("Value is inputted successfully.");
        await BookingFormPage.verifyCouponValue(couponText);

        StepLogger.stepId(11);
        StepLogger.step("Click “Apply” button.");
        await BookingFormPage.clickApplyButton();
        StepLogger.verification("Message “Coupon successfully applied!” is displayed.");
        await BookingFormPage.verifyCouponApplicationMessageIsDisplayed(COUPON_SUCCESSFUL_APPLICATION_MESSAGE_TEXT);

        StepLogger.stepId(12);
        StepLogger.step("Verify coupon application.");
        StepLogger.verification("Coupon name is added to payment details.");
        await BookingFormPage.verifyCouponApplication(couponText);

        StepLogger.stepId(13);
        StepLogger.step("Note “Total” sum value as T1.");
        StepLogger.verification("Value is noted.");
        const totalValue2 = await BookingFormPage.getTotalSum();

        StepLogger.stepId(14);
        StepLogger.step("Compare values of T1 and T2.");
        StepLogger.verification("Values are different.");
        await ExpectationHelpers.verifyValueEquality(totalValue1, totalValue2, false,
            "Booking total price");

        StepLogger.stepId(15);
        StepLogger.step("Click “Book now” button.");
        await BookingFormPage.clickBookNowButton();
        StepLogger.verification("Booking details page is opened successfully.");
        await BookingPage.verifyPageIsOpened();
    });

    it("[TC3] Booking details - [1003]", async () => {
        StepLogger.caseId = 1003;

        StepLogger.preCondition("Execute steps 1, 5-15 of “[TC2] Listing details page”.");
        await PropertyPageHelpers.bookPropertyById(PROPERTY_ID, PROPERTY_MINIMUM_STAY_DAYS, "QAVACANCY2020");

        StepLogger.stepId(1);
        StepLogger.step("Click on “First name” field and check it.");
        await BookingPage.clickOnFirstNameField();
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyFirstNameFieldIsEditable();

        StepLogger.stepId(2);
        StepLogger.step("Press Tab button.");
        await BookingPage.sendTabKeyToFirstNameField();
        StepLogger.verification("“First name is required” message is appeared.");
        let validationMessage = "First name is required";
        await BookingPage.verifyFirstNameFieldValidationMessageIsDisplayed(validationMessage);

        StepLogger.stepId(3);
        StepLogger.step("Click on “Last name” field and check it.");
        await BookingPage.clickOnLastNameField();
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyLastNameFieldIsEditable();

        StepLogger.stepId(4);
        StepLogger.step("Press Tab button.");
        await BookingPage.sendTabKeyToLastNameField();
        StepLogger.verification("“Last name is required” message is appeared.");
        validationMessage = "Last name is required";
        await BookingPage.verifyLastNameFieldValidationMessageIsDisplayed(validationMessage);

        StepLogger.stepId(5);
        StepLogger.step("Click on “E-mail address” field and check it.");
        await BookingPage.clickOnEmailAddressField();
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyEmailAddressFieldIsEditable();

        StepLogger.stepId(6);
        StepLogger.step("Press Tab button.");
        await BookingPage.sendTabKeyToEmailAddressField();
        StepLogger.verification("“Email is required” message is appeared.");
        validationMessage = "Email is required";
        await BookingPage.verifyEmailAddressFieldValidationMessageIsDisplayed(validationMessage);

        StepLogger.stepId(7);
        StepLogger.step("Check “Phone number” field.");
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyPhoneNumberFieldIsEditable();

        StepLogger.stepId(8);
        StepLogger.step("Try to input string value into it.");
        await BookingPage.inputPhoneNumber("some phone");
        StepLogger.verification("User can’t input string value.");
        await BookingPage.verifyPhoneNumberValue("");

        StepLogger.stepId(9);
        StepLogger.step("Check “Message to owner” field.");
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyMessageToOwnerFieldIsEditable();

        StepLogger.stepId(10);
        StepLogger.step("Check “Card number” field.");
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyCardNumberFieldIsEditable();

        StepLogger.stepId(11);
        StepLogger.step("Check “Full Name” field.");
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyFullNameFieldIsEditable();

        StepLogger.stepId(12);
        StepLogger.step("Check “Expiration date (Month)” list.");
        StepLogger.verification("List isn’t empty.");
        await BookingPage.verifyExpirationDateMonthListIsntEmpty();

        StepLogger.stepId(13);
        StepLogger.step("Check “Expiration date (Year)” list.");
        StepLogger.verification("List isn’t empty.");
        await BookingPage.verifyExpirationDateYearListIsntEmpty();

        StepLogger.stepId(14);
        StepLogger.step("Click on “Billing address” field and check it.");
        await BookingPage.clickOnBillingAddressField();
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyBillingAddressFieldIsEditable();

        StepLogger.stepId(15);
        StepLogger.step("Press Tab button.");
        await BookingPage.sendTabKeyToBillingAddressField();
        StepLogger.verification("“Address is required” message is appeared.");
        validationMessage = "Address is required";
        await BookingPage.verifyBillingAddressFieldValidationMessageIsDisplayed(validationMessage);

        StepLogger.stepId(16);
        StepLogger.step("Click on “Zip code” field and check it.");
        await BookingPage.clickOnZipCodeField();
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyZipCodeFieldIsEditable();

        StepLogger.stepId(17);
        StepLogger.step("Press Tab button.");
        await BookingPage.sendTabKeyToZipCodeField();
        StepLogger.verification("“Zip code / Postcode is required” message is appeared.");
        validationMessage = "Zip code / Postcode is required";
        await BookingPage.verifyZipCodeFieldValidationMessageIsDisplayed(validationMessage);

        StepLogger.stepId(18);
        StepLogger.step("Click on “City” field and check it.");
        await BookingPage.clickOnCityField();
        StepLogger.verification("Field is editable.");
        await BookingPage.verifyCityFieldIsEditable();

        StepLogger.stepId(19);
        StepLogger.step("Press Tab button.");
        await BookingPage.sendTabKeyToCityField();
        StepLogger.verification("“City is required” message is appeared.");
        validationMessage = "City is required";
        await BookingPage.verifyCityFieldValidationMessageIsDisplayed(validationMessage);

        StepLogger.stepId(20);
        StepLogger.step("Check “Billing country” list.");
        StepLogger.verification("List isn’t empty.");
        await BookingPage.verifyBillingCountryListIsntEmpty();

        StepLogger.stepId(21);
        StepLogger.step("Click on “Billing country” field and press Tab button twice.");
        await BookingPageHelpers.clickOnBillingCountryFieldAndSendTabKeyTwice();
        StepLogger.verification("“Country is required” message is appeared.");
        validationMessage = "Country is required";
        await BookingPage.verifyBillingCountryFieldValidationMessageIsDisplayed(validationMessage);

        StepLogger.stepId(22);
        StepLogger.step("Note values for payment details as PD1.");
        StepLogger.verification("Values are noted.");
        const paymentDetails1 = await BookingFormPage.getFormData();

        StepLogger.stepId(23);
        StepLogger.step("Open calendar by “Check-out” field.");
        await CalendarPage.openCalendarByCheckout();
        StepLogger.verification("Calendar is opened.");
        await CalendarPage.verifyCalendarIsDisplayed();

        StepLogger.stepId(24);
        StepLogger.step("Click on date equal to check-out current date + 1.");
        await CalendarPage.selectNextAfterSelectedEndDayAvailableDay(1);
        StepLogger.verification("Calendar is closed.");
        await CalendarPage.verifyCalendarPresentStatus();

        StepLogger.stepId(25);
        StepLogger.step("Note values for payment details as PD2.");
        StepLogger.verification("Values are noted.");
        const paymentDetails2 = await BookingFormPage.getFormData();

        StepLogger.stepId(26);
        StepLogger.step("Compare values of PD1 and PD2.");
        StepLogger.verification("Values are different.");
        await ExpectationHelpers.verifyValueEquality(paymentDetails1, paymentDetails2, false,
            "Booking amount details");
    });
});
