const picNames = ["burger_1", "burger_2", "burger_3"];
const maxPicNos = 3;
var FoodMaterial = cc.Class({
    extends: cc.Component,
    properties: {
        fallDuration: 5,
        fallDistance: 500,
        texture: {
            default: null,
            type: cc.Texture2D
        }
    },

    onLoad: function () {
        let picNo = Math.round(Math.random() * 10000) % maxPicNos;
        this.setTexture(picNames[picNo]);

        cc.director.getCollisionManager().enabled = true; 
    },

    onCollisionEnter: function (other) { ; 
        switch (other.node._name) {
            case "basket":
                this.node.destroy();
                break;
            case "ground":
                this.node.color = cc.Color.RED; 
                break;
            // default:   
            //     this.node.color = cc.Color.RED; 
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
    },

    // getBasketDistance: function() {
    //     let basketPosition = this.mainCanvas.basket.getPosition();
    //     let distance = cc.pDistance(basketPosition, this.node.position())
    //     return distance;
    // }

});
