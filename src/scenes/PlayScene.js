import { CST } from "../CST.js";
export class PlayScene extends Phaser.Scene {
    constructor() {
        super({
            key: "PlayScene"
        })
    }
    init() {}
    
    preload() {
        this.load.image("bg_1", "assets/bg-1.png");
        this.load.image("bg_2", "assets/bg-2.png");
        this.load.image("ground", "assets/ground.png");
        this.load.spritesheet("player","assets/bee.png",{frameWidth:37,frameHeight:39})
    }
    create() {
//NOTE A TileSprite is a Sprite that has a repeating texture.
        //PRIMER FONDO como es tileSprite se repite indefinidamente hacia la derecha
        this.bg_1=this.add.tileSprite(0,0,CST.JUEGO.W, CST.JUEGO.H, "bg_1");
        this.bg_1.setOrigin(0,0);
        this.bg_1.setScrollFactor(0); 
        //SEGUNDO FONDO
        this.bg_2=this.add.tileSprite(0, 0, CST.JUEGO.W, CST.JUEGO.H, "bg_2");
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);
        //TERCERA IMAGEN esta es de 48x48 solo
        this.ground = this.add.tileSprite(0, 0, CST.JUEGO.W, 48, "ground");
        this.ground.setOrigin(0, 0);
        this.ground.setScrollFactor(0);
        this.ground.y =CST.JUEGO.H-48;//192;
//NOTE AHORA AÑADIMOS AL JUGADOR
        this.player = this.add.sprite(40,CST.JUEGO.H/2,"player");//game.config.width * 1.5
        this.anims.create(
            {key:'fly',
             frameRate:20,
             repeat:-1,
             frames:this.anims.generateFrameNumbers('player')
            }
        );
        this.player.play('fly');

//Generamos los 'cursores' para mover la mosca
        this.cursores=this.input.keyboard.createCursorKeys();
//Ahora pillamos la 'camara' principal y hacemos que siga a la mosca
        this.miCamara=this.cameras.main;
        this.miCamara.setBounds(0, 0, CST.JUEGO.W * 3, CST.JUEGO.H);
        this.miCamara.startFollow(this.player);
    }
    update(){
        if(this.cursores.left.isDown && this.player.x>20)
            {this.player.x-=3;
             this.player.scaleX=1;   
            }
        if(this.cursores.right.isDown && this.player.x<((CST.JUEGO.W*3)-20))
            {this.player.x+=3;
             this.player.scaleX=-1;   
             //console.log(this.player.x);
            }
        //TENEMOS QUE MOVER LAS TEXTURAS DE ATRAS, si no la abeja parece que no se muevve 
        //movelos el TILE
        this.bg_1.tilePositionX=this.miCamara.scrollX*.3;
        this.bg_2.tilePositionX = this.miCamara.scrollX *.6;
        this.ground.tilePositionX = this.miCamara.scrollX;   
        
        if(this.cursores.up.isDown && this.player.y>20) {this.player.y-=3;}
        if(this.cursores.down.isDown && this.player.y<CST.JUEGO.H-20) {this.player.y+=3;}
    }
}