import{b as o}from"./init.e2c43348.js";WA.onInit().then(()=>{o().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(e=>console.error(e));setInterval(()=>{WA.camera.followPlayer(!1),WA.camera.onCameraUpdate().subscribe(()=>{console.log(1),WA.player.getPosition().then(a=>{WA.camera.set(a.x,a.y,400,150,!1,!1)})})},1e3);
