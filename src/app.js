import { remote } from "webdriverio";
import MockApi from "../mock-config.json" assert { type: "json" };
import Logger from "./utils/logger.mjs";
import { getMenuTop, testMenuClick } from "./menu-top.mjs";
import { getMenuBottom } from "./menu-bottom.mjs";

(async function runTest() {
    const browser = await remote({
        capabilities: {
            browserName: "chrome",
            "goog:chromeOptions": {
                args: process.env.CI ? ["headless", "disable-gpu"] : [],
            },
        },
    });

    try {
        await browser.url(MockApi.url.login);

        const emailInput = await browser.$("input[type=text]");
        await emailInput.setValue(MockApi.credentials.email);
        const passwordInput = await browser.$("input[type=password]");
        await passwordInput.setValue(MockApi.credentials.password);

        const buttonElement = await browser.$("button[type=submit]");

        if (await buttonElement.isEnabled()) {
            await buttonElement.click();
        } else {
            Logger("error", "Button clickable");
        }
        Logger("success", "Login");

        await browser.pause(1000);
        await browser.url(MockApi.url.dashboard);
        await browser.pause(6000);
        const loggedInUser = await browser.$(".page-title");
        if (
            await loggedInUser.waitForExist({
                timeout: 20000,
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
        // await browser.saveScreenshot("./screenshot.png");
    } catch (e) {
        console.log("Error app.js", e);
    } finally {
        await browser.deleteSession();
    }
})();
