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

    onLoad: function () {
        this.materialNo = Math.round(Math.random() * 10000) % maxPicNos;
        this.setTexture(picNames[this.materialNo]);
        cc.director.getCollisionManager().enabled = true; 
    },

    onCollisionEnter: function (other) { ; 
        switch (other.node.name) {
            case "basket":
                this.mainCanvas.materialCaught(this.materialNo);
                this.node.destroy();
                break;
            case "ground":
                this.node.destroy(); 
                break;
            default:   
                this.node.destroy();
        }
    },

    setFallDownAction: function () {
        var fallDown = cc.moveBy(this.fallDuration, cc.v2(0, -this.fallDistance));
        return fallDown;
    },

    setFallDownDistance: function (distance) {
        this.fallDistance = distance;
    },

    startFalling: function() {
        this.fallAction = this.setFallDownAction();
        this.node.runAction(this.fallAction);
    },

    setTexture: function(picName) {
        var self = this;
        cc.loader.loadRes(`imgs/${picName}`, function (err, texture) {
            self.texture = texture;
            self.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(self.texture);
        });
    }

});
