import Page from "./page.mjs";
import { strictEqual } from "assert";

class DashboardPage extends Page {
    get getPageTitle() {
        return $(".page-title");
    }
}

export default new DashboardPage();
