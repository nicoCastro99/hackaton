import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// Waiting for the API to be ready
WA.onInit().then(() => {
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

setInterval(() => {
    WA.camera.onCameraUpdate().subscribe(() => {
        console.log(1)
        let data = WA.player.getPosition()
        data.then((data) => {
            WA.camera.set(
                data.x,
                data.y,
                450,
                200,
                false,
                false,
            )
        })
    });
}, 1000);

export {};
