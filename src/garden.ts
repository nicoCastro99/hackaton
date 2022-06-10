import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// Waiting for the API to be ready
WA.onInit().then(() => {
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

// Open the popup when we enter a given zone
 WA.room.onEnterLayer("openMissionPopup").subscribe(() => {

     let popupmission =  WA.ui.openPopup("missionPopup", 'Vous avez 1 min pour trouver le flamant rose caché dans la maison ! ' +
         'Le premier joueur gagne 20 pièces.', []);
     WA.controls.disablePlayerControls();

     setTimeout(function() {
         popupmission.close()
     }, 4000);

     setTimeout(function() {

         let i = 11;
         let timer = setInterval(function() {
             i--;
         }, 1000);

         let timerPopup = setInterval(function() {
             let popupmission =  WA.ui.openPopup("missionPopup", i + '', []);
             WA.controls.disablePlayerControls();
             setInterval(function() {
                 popupmission.close()
             }, 1000);
         }, 1000);

         setTimeout(function() {
             WA.controls.restorePlayerControls();
             clearInterval(timerPopup);
             clearInterval(timer);
         }, 11000);

     }, 4000);





});


// Close the popup when we leave the zone.
/*WA.room.onLeaveLayer("myZone").subscribe(() => {
    helloWorldPopup.close();
})*/

export {};
