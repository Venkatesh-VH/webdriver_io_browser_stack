import LoginPage from "../pageobjects/login.page.mjs";
import { addStep } from "@wdio/allure-reporter";
import getToastMessage from "../helpers/toast-message.mjs";

describe("Evi File Login Failure", () => {
    it("should login fail", async () => {
        try {
            await LoginPage.open("");
            await LoginPage.login("wrongemail.com", "Test@123");
            console.log("toastMessage", await getToastMessage().getText());
            await expect(getToastMessage()).toBeDisplayed();
            addStep("Login fail", {}, "passed");
        } catch (e) {
            console.log("should login fail error", e);
            addStep("Login fail", {}, "failed");
        }
    });
});
