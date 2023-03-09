import MockApi from "../mock-config.json" assert { type: "json" };
import Logger from "./utils/logger.mjs";

export const getMenuBottom = async (driver) => {
    const sideMenuBottomLists = await driver.$$(
        "div.menu-bottom > ul.navbar-nav > li"
    );

    const missingLabels = [];
    for (const [index, bottomMenu] of sideMenuBottomLists.entries()) {
        const label = await bottomMenu.getText();
        // if (MockApi.menuBottom[index].label !== label)
        //   missingLabels.push(label);
        if (MockApi.menuBottom[index].label !== label)
            Logger("error", `Bottom Menu: ${MockApi.menuBottom[index].label}`);
        else
            Logger(
                "success",
                `Bottom Menu: ${MockApi.menuBottom[index].label}`
            );
    }
    let missingLabel = "";
    //   if (missingLabels.length > 0) {
    //     for (const [index, missingLbl] of missingLabels.entries()) {

    //     //   if (index === missingLabels.length - 1) missingLabel += `${missingLbl}`;
    //     //   else missingLabel += `${missingLbl} `;
    //     }
    //   } else {
    //     missingLabel = "Initial bottom side menu labels are correct";
    //   }

    return missingLabel;
};
