import { COUPON_SUCCESSFUL_APPLICATION_MESSAGE_TEXT } from "./property-page.constants";

import { StepLogger } from "../../loggers/step-logger";
import { BookingPage } from "../booking/booking-page.po";
import { CalendarPage } from "../common/calendar/calendar-page.po";
import { PropertyPage } from "./property-page.po";
import { BookingFormPage } from "../common/booking-form/booking-form-page.po";

import * as ExpectationHelpers from "../../components/expectation-helpers";
import * as CommonPageHelpers from "../common/common-page.helpers";
import * as WaitHelpers from "../../components/wait-helpers";

export async function verifyPreviousSlideButtonFunctioning() {
    const previousThumbnailImageSource = await PropertyPage.getPreviousThumbnailImageSource();

    await PropertyPage.clickPreviousSlide();
    await WaitHelpers.waitForElementToBePresented(PropertyPage.leftImage);
    const previousImageSource = await PropertyPage.getCurrentImageSource();

    await ExpectationHelpers.verifyObjectContains(previousThumbnailImageSource, previousImageSource);
}

export async function verifyNextSlideButtonFunctioning() {
    const nextThumbnailImageSource = await PropertyPage.getNextThumbnailImageSource();

    await PropertyPage.clickNextSlide();
    await WaitHelpers.waitForElementToBePresented(PropertyPage.rightImage);
    const nextImageSource = await PropertyPage.getCurrentImageSource();

    await ExpectationHelpers.verifyObjectContains(nextThumbnailImageSource, nextImageSource);
}

export async function bookPropertyById(id: string, propertyMinimumStayDays: number, couponText: string) {
    StepLogger.subStep("Open property detailed page.");
    await CommonPageHelpers.navigateToPropertyPageById(id);

    StepLogger.subStep("Open calendar.");
    await CalendarPage.openCalendarByCheckin();

    StepLogger.subStep("Choose a row with all free dates and select the first date.");
    await CalendarPage.selectFirstAvailableDayInFirstUnblockedRow();

    StepLogger.subStep(`Click on the date which is equal to first date + ${propertyMinimumStayDays}.`);
    await CalendarPage.selectNextAfterSelectedStartDayAvailableDay(propertyMinimumStayDays);

    StepLogger.subStep(`Input value "${couponText}" into “Coupon name” field.`);
    await BookingFormPage.inputCoupon(couponText);

    StepLogger.subStep("Click “Apply” button.");
    await BookingFormPage.clickApplyButton();
    StepLogger.subVerification("Message “Coupon successfully applied!” is displayed.");
    await BookingFormPage.verifyCouponApplicationMessageIsDisplayed(COUPON_SUCCESSFUL_APPLICATION_MESSAGE_TEXT);

    StepLogger.subVerification("Coupon name is added to payment details.");
    await BookingFormPage.verifyCouponApplication(couponText);

    StepLogger.step("Click “Book now” button.");
    await BookingFormPage.clickBookNowButton();

    StepLogger.subVerification("Booking details page is opened successfully.");
    await BookingPage.verifyPageIsOpened();
}
