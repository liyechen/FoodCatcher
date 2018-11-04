const picNames = ["burger_bread1", "burger_bread2", "burger_meat", "burger_vege"];
const maxPicNos = 4;

var FoodMaterial = cc.Class({
    extends: cc.Component,
    properties: {
        fallDuration: 4,
        fallDistance: 500,
        texture: {
            default: null,
            type: cc.Texture2D
        },
        materialNo: 0
    },

    onLoad() {
    },

    onCollisionEnter(other) { 
        switch (other.node.name) {
            case "basket":
                this.mainCanvas.materialCaught(picNames[this.materialNo]);
                this.node.destroy();
                break;
            case "ground":
                this.node.destroy(); 
                break;
            default:   
                this.node.destroy();
        }
    },

    setFallDownAction() {
        let fallDown = cc.moveBy(this.fallDuration, cc.v2(0, -this.fallDistance));
        return fallDown;
    },

    setFallDownDistance(distance) {
        this.fallDistance = distance;
    },

    startFalling() {
        this.fallAction = this.setFallDownAction();
        this.node.runAction(this.fallAction);
    },

    setTexture() {
        let self = this;
        self.materialNo = Math.round(Math.random() * 10000) % maxPicNos;
        let picName = picNames[this.materialNo];
        self.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(self.mainCanvas[picName]);
    },


});
