/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let websiteSecret: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    WA.state.nbUser = 0;

    const countUser = WA.state.nbUser;
    if (typeof countUser === "number") {
        WA.state.nbUser = countUser + 1;
    }

    console.log(WA.state.nbUser);

    WA.room.onEnterLayer('door-zone').subscribe(() => {
        WA.state.door = true;
    })

    WA.room.onEnterLayer('secret-zone').subscribe(() => {
        openSite();
    })

    WA.room.onLeaveLayer('secret-zone').subscribe(() => {
        closeSite();
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

const openSite = async () => {
    websiteSecret = await WA.ui.website.open({
        url: "https://wikipedia.org",
        position: {
            vertical: "middle",
            horizontal: "middle",
        },
        size: {
            height: "50vh",
            width: "50vw",
        },
    });
}

const closeSite = () => {
    if (websiteSecret !== undefined) {
        websiteSecret.close();
        websiteSecret = undefined;
    }
}

export {};
