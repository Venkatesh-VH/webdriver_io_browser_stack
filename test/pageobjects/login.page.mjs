import Page from "./page.mjs";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return $("input[type=text]");
    }

    get inputPassword() {
        return $("input[type=password]");
    }

    get buttonSubmit() {
        return $("button[type=submit]");
    }

    async checkIfButtonEnabled() {
        await this.buttonSubmit.isEnabled();
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.buttonSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open(url) {
        return super.open(url);
    }
}

export default new LoginPage();
