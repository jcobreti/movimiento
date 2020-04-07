/** @type {import("../typings/phaser")} */

import { CST } from "./CST.js";
import { PlayScene } from "./scenes/PlayScene.js";

var game = new Phaser.Game({
    type: Phaser.CANVAS,
    width: CST.JUEGO.W,
    height: CST.JUEGO.H,
    pixelArt:true,
    scene: [PlayScene],
     physics: {
        default: "arcade",
        arcade: {
            gravity:{y:0}
        }
    }  
});