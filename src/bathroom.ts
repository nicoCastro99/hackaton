/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let triggerOpenDoor: any = undefined;
let triggerCloseDoor: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    // @ts-ignore
    WA.room.onEnterLayer('triggerOpen').subscribe(() => {
        if (WA.state.my_door) {
            // @ts-ignore
            triggerOpenDoor = WA.ui.displayActionMessage({
                message: "press 'space' to close the door",
                callback: () => {
                    WA.state.my_door = false
                }
            });
        } else {
            // @ts-ignore
            triggerOpenDoor = WA.ui.displayActionMessage({
                message: "press 'space' to enter",
                callback: () => {
                    WA.state.my_door = true
                }
            });
        }
    });

    WA.room.onEnterLayer('triggerClose').subscribe(() => {
        if (WA.state.my_door) {
            // @ts-ignore
            triggerCloseDoor = WA.ui.displayActionMessage({
                message: "press 'space' to close the door",
                callback: () => {
                    WA.state.my_door = false
                }
            });
        } else {
            // @ts-ignore
            triggerCloseDoor = WA.ui.displayActionMessage({
                message: "press 'space' to open the door",
                callback: () => {
                    WA.state.my_door = true
                }
            });
        }
    });

    WA.room.onLeaveLayer('triggerOpen').subscribe(() => {
        triggerOpenDoor.remove();
    });

    WA.room.onLeaveLayer('triggerClose').subscribe(() => {
        triggerCloseDoor.remove();
    });


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
