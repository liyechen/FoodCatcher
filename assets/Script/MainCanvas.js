cc.Class({
    extends: cc.Component,

    properties: {
        buttonLabel: {
            default: null,
            type: cc.Label
        },
        startButton: {
            default: null,
            type: cc.Button
        },
        BurgerPrefab: {
            default: null,
            type: cc.Prefab
        },
        ceiling: {
            default: null,
            type: cc.Node
        },
        ground: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad () {

    },

    // called every frame
    update (dt) {

    },

    gameStart () {
        console.log('game start.');
        if (this.buttonLabel.string == "start") {
            this.buttonLabel.string = "pause";
            this.newFood(this.BurgerPrefab);
        } else {
            this.buttonLabel.string = "start";
        }
       
    },

    newFood (food) {
        let newFood = cc.instantiate(food);
        this.node.addChild(newFood);
        newFood.setPosition(this.getNewFoodPosition());
    },

    getNewFoodPosition () {
        let randX = this.ceiling.x + this.ceiling.width * (Math.random() - 0.5) * 0.8;
        console.log(randX);
        let randY = this.ceiling.y;
        return cc.v2(randX, randY);
    },
});
