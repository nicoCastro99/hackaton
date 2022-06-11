/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import UserService from "./services/user-service";

let websiteSecret: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    const userService = new UserService();
    userService.getAll().then((users: any) => {
        console.log(users)
      }).catch((err: any) => {
          console.log(err)
      })
    WA.state.closeWebsite = false;

    WA.room.onEnterLayer('door-zone').subscribe(() => {
        if (WA.player.tags.includes('validated')) {
            WA.state.door = true;
        } else {
            WA.controls.disablePlayerControls();
            WA.player.moveTo(500, 350, 10);
            setTimeout(() => {
                WA.controls.restorePlayerControls();
            }, 1000)
        }
    })

    WA.room.onEnterLayer('secret-zone').subscribe(() => {
        openSite();
    })

    WA.room.onLeaveLayer('secret-zone').subscribe(() => {
        closeSite();
    })

    WA.state.onVariableChange('closeWebsite').subscribe(() => {
        if (WA.state.closeWebsite === true) {
            closeSite();
            WA.player.tags.push('validated');
        }
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

const openSite = async () => {
    websiteSecret = await WA.ui.website.open({
        url: "https://hackaton-app.ncastro.fr/register",
        position: {
            vertical: "middle",
            horizontal: "middle",
        },
        size: {
            height: "50vh",
            width: "50vw",
        },
        allowApi: true
    });
}

const closeSite = () => {
    if (websiteSecret !== undefined) {
        websiteSecret.close();
        websiteSecret = undefined;
    }
}

export {};
