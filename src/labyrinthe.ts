import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import UserService from './services/user-service'

let popupLabyrinthe: any = undefined;
let service = new UserService();
// Waiting for the API to be ready
WA.onInit().then(() => {

    WA.room.onEnterLayer('successLabyrinthe').subscribe(() => {
        popupLabyrinthe =  WA.ui.openPopup("clockPopup", 'Bravo, vous avez trouvé la sortie. Vous gagnez 50 coins !', []);
        service.assignPoints(WA.player.id, 50)
    })

    // Close the popup when we leave the zone.
    WA.room.onLeaveLayer("successLabyrinthe").subscribe(() => {
        popupLabyrinthe.close();
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

setInterval(() => {
    WA.camera.followPlayer(false)
    WA.camera.onCameraUpdate().subscribe(() => {
        console.log(1)
        let data = WA.player.getPosition()
        data.then((data) => {
            WA.camera.set(
                data.x,
                data.y,
                400,
                150,
                false,
                false,
            )
        })
    });
}, 1000);

export {};
