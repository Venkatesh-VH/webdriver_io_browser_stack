/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
import { config } from "dotenv";
config();

export default class Page {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path) {
        return browser.url(`${process.env.BASE_URL}/${path}`);
    }
}
