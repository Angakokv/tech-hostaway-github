import {
    By,
    element
} from "protractor";


import { TIMEOUT_5 } from "../../../components/timeouts";
import { DAYS_PARAGRAPH_XPATH_SELECTOR } from "./booking-form-page.constants";
import { COUPON_APPLICATION_MESSAGE_NAME } from "../../property/property-page.constants";

import * as ElementHelpers from "../../../components/element-helpers";
import * as ExpectationHelpers from "../../../components/expectation-helpers";
import * as WaitHelpers from "../../../components/wait-helpers";
import * as TextBoxHelpers from "../../../components/textbox-helpers";

/* tslint:disable:member-ordering*/
export class BookingFormPage {
    static readonly bookingForm =
        element(By.css("div.booking-form"));
    static readonly paymentDetails =
        BookingFormPage.bookingForm.element(By.xpath(`//${DAYS_PARAGRAPH_XPATH_SELECTOR}/following-sibling::div[1]`));
    static readonly totalValue =
        BookingFormPage.bookingForm.element(By.xpath("//div/label[contains((.), \"Total\")]/following-sibling::div/span"));
    static readonly couponField =
        BookingFormPage.bookingForm.element(By.css("input[placeholder=\"Coupon name\"]"));
    static readonly applyButton =
        BookingFormPage.bookingForm.element(By.css("button.ladda-button"));
    static readonly bookingFormCouponApplicationMessage = (text: string) =>
        BookingFormPage.bookingForm.element(By.cssContainingText("div.message", text));
    static readonly bookNowButton =
        BookingFormPage.bookingForm.element(By.buttonText("Book now"));

    static async getTotalSum() {
        return await ElementHelpers.getText(this.totalValue);
    }

    static async getPaymentDetails() {
        return await ElementHelpers.getText(this.paymentDetails);
    }

    static async inputCoupon(couponText: string) {
        await TextBoxHelpers.sendKeys(this.couponField, couponText);
    }

    static async verifyCouponValue(expectedValue: string) {
        await ExpectationHelpers.verifyTextBoxValueEquality(this.couponField, expectedValue);
    }

    static async clickApplyButton() {
        await ElementHelpers.click(this.applyButton);
    }

    static async clickBookNowButton() {
        await ElementHelpers.click(this.bookNowButton);
    }

    static async verifyCouponApplicationMessageIsDisplayed(messageText: string) {
        await ExpectationHelpers.verifyDisplayStatus(this.bookingFormCouponApplicationMessage(messageText),
            COUPON_APPLICATION_MESSAGE_NAME);
    }

    static async verifyCouponApplication(couponText: string) {
        await WaitHelpers.waitForCustomCondition(async () => {
                const bookingFormText = await ElementHelpers.getText(BookingFormPage.bookingForm);
                return bookingFormText.includes(couponText);
            }, TIMEOUT_5, `Coupon "${couponText}" isn't applied`
        );

        const bookingFormText = await ElementHelpers.getText(BookingFormPage.bookingForm);
        await ExpectationHelpers.verifyObjectContains(bookingFormText, couponText);
    }

    static async waitForTotalSumToBeRecalculated(oldValue: string) {
        await WaitHelpers.waitForCustomCondition(async () => {
                const totalValue = await ElementHelpers.getText(BookingFormPage.totalValue);
                return totalValue != oldValue;
            }, TIMEOUT_5, `Total sum "${oldValue}" isn't recalculated`
        );
    }
}
