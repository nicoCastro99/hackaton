/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let websiteSecret: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    WA.state.closeWebsite = false;
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    
    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onEnterLayer('formConfessionnal').subscribe(async () => {
        openSite();
        
        WA.room.onLeaveLayer('formConfessionnal').subscribe(() => {
            closeSite();
        })
    })

    WA.state.onVariableChange('closeWebsite').subscribe(() => {
        if (WA.state.closeWebsite === true) {
            closeSite();
            WA.player.tags.push('validated');
        }
    });
    
    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

const openSite = async () => {
    websiteSecret = await WA.ui.website.open({
        url: "http://localhost:3000/reveal",
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

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}


export {};
