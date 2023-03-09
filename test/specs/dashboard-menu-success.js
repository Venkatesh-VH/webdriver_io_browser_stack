import MockApi from "../../mock-config.json" assert { type: "json" };
import Logger from "../../src/utils/logger.mjs";
import { getMenuTop, testMenuClick } from "../../src/menu-top.mjs";
import { getMenuBottom } from "../../src/menu-bottom.mjs";
import LoginPage from "../pageobjects/login.page.mjs";
import DashboardPage from "../pageobjects/dashboard.page.mjs";
import { addStep } from "@wdio/allure-reporter";
import { strictEqual } from "assert";

describe("Evi File Dashboard", () => {
    before(async () => {
        try {
            await LoginPage.open("");
            await LoginPage.login(process.env.EMAIL, process.env.PASSWORD);
        } catch (e) {
            console.log("login successfully_e", e);
        }
    });
    it("menu should be correct", async () => {
        try {
            const loggedInUser = await DashboardPage.getPageTitle;
            if (
                await loggedInUser.waitForExist({
                    timeout: 40000,
                })
            ) {
                const welcomeMessage = await loggedInUser.getText();
                if (welcomeMessage.includes(MockApi.welcomeMessage)) {
                    Logger("success", MockApi.welcomeMessage);
                } else {
                    Logger("error", MockApi.welcomeMessage);
                }
            }
            Logger("reset");
            const sideMenuTopLists = await browser.$$(
                "div.menu-top > ul.navbar-nav > li"
            );
            await getMenuTop(sideMenuTopLists);
            await testMenuClick(sideMenuTopLists, browser);
            await getMenuBottom(browser);
            Logger("reset");

            const navProfile = await browser.$("div.nav-profile");
            await navProfile.click();
            const logoutButton = await browser.$(
                "div.nav-profile > ul > li:last-child"
            );
            await logoutButton.click();
            Logger("success", "Logout");
        } catch (e) {
            console.log("should login successfully_e", e);
            console.log("e.message", e.message, typeof e.message);
            console.log("e.matcherResult", e.matcherResult);
            addStep("Login failed", {}, "failed");
        }
    });
});

// try {
//     browser.maximizeWindow();
//     await browser.url(MockApi.url.login);

//     const emailInput = await browser.$("input[type=text]");
//     await emailInput.setValue(MockApi.credentials.email);
//     const passwordInput = await browser.$("input[type=password]");
//     await passwordInput.setValue(MockApi.credentials.password);

//     const buttonElement = await browser.$("button[type=submit]");

//     if (await buttonElement.isEnabled()) {
//         await buttonElement.click();
//     } else {
//         Logger("error", "Button clickable");
//     }
//     Logger("success", "Login");

//     const loggedInUser = await browser.$(".page-title");
//     if (
//         await loggedInUser.waitForExist({
//             timeout: 40000,
//         })
//     ) {
//         const welcomeMessage = await loggedInUser.getText();
//         if (welcomeMessage.includes(MockApi.welcomeMessage)) {
//             Logger("success", MockApi.welcomeMessage);
//         } else {
//             Logger("error", MockApi.welcomeMessage);
//         }
//     }
//     Logger("reset");
//     const sideMenuTopLists = await browser.$$(
//         "div.menu-top > ul.navbar-nav > li"
//     );
//     await getMenuTop(sideMenuTopLists);
//     await testMenuClick(sideMenuTopLists, browser);
//     await getMenuBottom(browser);
//     Logger("reset");

//     const navProfile = await browser.$("div.nav-profile");
//     await navProfile.click();
//     const logoutButton = await browser.$(
//         "div.nav-profile > ul > li:last-child"
//     );
//     await logoutButton.click();
//     Logger("success", "Logout");
//     // await browser.saveScreenshot("./screenshot.png");
// } catch (e) {
//     console.log("Error app.js", e);
// } finally {
//     await browser.deleteSession();
// }
