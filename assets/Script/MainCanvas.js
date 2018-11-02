var MainCanvas = cc.Class({
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
        FoodMaterialPrefab: {
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
        },
        fallInterval: null
    },

    onLoad () {

    },

    update (dt) {

    },

    gameStart () {
        console.log('game start.');
        if (this.buttonLabel.string == "start") {
            this.buttonLabel.string = "pause";
            this.fallInterval = setInterval(() => this.newFood(this.FoodMaterialPrefab), 1000);
        } else {
            this.buttonLabel.string = "start";
            this.gamePause();
        }
       
    },

    gamePause () {
        clearInterval(this.fallInterval);
        this.fallInterval = null;
    },

    

    newFood (food) {
        let newFood = cc.instantiate(food);
        this.node.addChild(newFood);
        newFood.setPosition(this.getNewFoodPosition());
        newFood.getComponent('FoodMaterial').setFallDownDistance(-this.ground.y + this.ceiling.y - 30);
        newFood.getComponent('FoodMaterial').startFalling();
    },

    getNewFoodPosition () {
        let randX = this.ceiling.x + this.ceiling.width * (Math.random() - 0.5) * 0.8;
        console.log(randX);
        let randY = this.ceiling.y;
        return cc.v2(randX, randY);
    },
});
