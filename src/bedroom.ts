/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)


    WA.room.onEnterLayer('morpionZone').subscribe(async () => {
        const coWebsite = await WA.nav.openCoWebSite('../snake/index.html');

        WA.room.onLeaveLayer('morpionZone').subscribe(() => {
            coWebsite.close()
        })
    })


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));


export {};
