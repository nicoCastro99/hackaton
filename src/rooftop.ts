/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import UserService from "./services/user-service";
import MissionService from "./services/mission-services";

console.log('Script started successfully');

let popupFlamingo: any = undefined;
// Waiting for the API to be ready
WA.onInit().then(() => {
    const userService = new UserService();
    const missionService = new MissionService();
    // Open the popup when we enter a given zone
    WA.room.onEnterLayer("find_flamingo").subscribe(() => {
        missionService.getMission('Flamand rose').then((data) => {
            if (data.state == 1) {
                userService.assignPoints(WA.player.id, 20).then((data) => {
                    console.log(data)
                }).catch((err) => {
                    console.log(err)
                })
                missionService.updateMission('Flamand rose', 2).then((data) => {
                    console.log(data)
                }).catch((err) => {
                    console.log(err)
                })

                popupFlamingo = WA.ui.openPopup("popup_flamingo", 'Bravo, vous avez trouvé le flamand rose et vous avez gagné 20 points !', []);
            }
            else if (data.state == 2) {
                popupFlamingo = WA.ui.openPopup("popup_flamingo", "Quelqu'un a déja trouvé le flamand rose !", []);
            }
        }).catch((err) => {
            if (err.response.status == 404) {
                popupFlamingo = WA.ui.openPopup("popup_flamingo", "Bonjour, je suis le flamand rose !", []);
            }
        });


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
