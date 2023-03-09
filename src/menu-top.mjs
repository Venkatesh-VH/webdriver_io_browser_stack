import Logger from "./utils/logger.mjs";
import MockApi from "../mock-config.json" assert { type: "json" };

export const getMenuTop = async (topMenuLists) => {
    const missingLabels = [];
    for (const [index, topMenu] of topMenuLists.entries()) {
        const label = await topMenu.getText();
        // if (MockApi.menuTop[index].label !== label) missingLabels.push(label);
        // label
        if (MockApi.menuTop[index].label !== label)
            Logger("error", `Top Menu: ${MockApi.menuTop[index].label}`);
        else Logger("success", `Top Menu: ${MockApi.menuTop[index].label}`);
    }
};

export const clickDashboard = async (topMenuLists) => {
    await topMenuLists[0].click();
};

const secondLevelTestMenuClick = async (
    firstChild,
    jsonChild,
    rootLabel,
    firstNestedLabel,
    browser
) => {
    await firstChild.click();
    await browser.pause(100);
    const missingSecondNestedLabels = [];
    const secondNestedElements = await firstChild.$$(
        "ul.additional-menu > li.menu-group-item"
    );
    for (const [index, secondNestedElement] of secondNestedElements.entries()) {
        const secondLevelLabel = await secondNestedElement.getText();
        if (secondLevelLabel !== jsonChild[index].label)
            Logger(
                "error",
                `Top Menu: ${rootLabel} -> ${firstNestedLabel} -> ${jsonChild[index].label}`
            );
        else
            Logger(
                "success",
                `Top Menu: ${rootLabel} -> ${firstNestedLabel} -> ${jsonChild[index].label}`
            );
    }
};

export const testMenuClick = async (topMenuLists, driver) => {
    const missingFirstNestedLabels = [];
    let thirdLevelLabels = [];
    for (const labelIndex of [1, 2, 8]) {
        await topMenuLists[labelIndex].click();
        const firstNestedElements = await topMenuLists[labelIndex].$$(
            "ul.additional-menu > li.menu-group-item"
        );
        const length = MockApi.menuTop[labelIndex].child.length;
        let firstNestedElement = "";
        for (let i = 0; i < length; i++) {
            const elementIndex = i === 0 ? 0 : 8;
            if (length > 1) {
                firstNestedElement = await firstNestedElements[
                    elementIndex
                ].getText();
            } else {
                firstNestedElement = await topMenuLists[labelIndex]
                    .$("ul.additional-menu > li.menu-group-item:first-child")
                    .getText();
            }
            if (
                firstNestedElement !==
                MockApi.menuTop[labelIndex].child[i].label
            )
                Logger(
                    "error",
                    `Top Menu: ${MockApi.menuTop[labelIndex].label} -> ${MockApi.menuTop[labelIndex].child[i].label}`
                );
            else
                Logger(
                    "success",
                    `Top Menu: ${MockApi.menuTop[labelIndex].label} -> ${MockApi.menuTop[labelIndex].child[i].label}`
                );
            const result = await secondLevelTestMenuClick(
                firstNestedElements[elementIndex],
                MockApi.menuTop[labelIndex].child[i].child,
                MockApi.menuTop[labelIndex].label,
                MockApi.menuTop[labelIndex].child[i].label,
                driver
            );
            thirdLevelLabels.push(result);
        }
        await clickDashboard(topMenuLists);
    }
};
