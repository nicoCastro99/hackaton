/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let popupFlamingo: any = undefined;
// Waiting for the API to be ready
WA.onInit().then(() => {
    // Open the popup when we enter a given zone
    WA.room.onEnterLayer("find_flamingo").subscribe(() => {
        popupFlamingo =  WA.ui.openPopup("popup_flamingo", 'Bravo, vous avez trouvé le flamand rose !', []);
    });

    // Close the popup when we leave the zone.
    WA.room.onLeaveLayer("find_flamingo").subscribe(() => {
        popupFlamingo.close();
    });
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
