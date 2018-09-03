cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = 'LoginWindow';
    },

    // called every frame
    update: function (dt) {

    },
    login () {
        console.log('login to the game.');
    }
});
