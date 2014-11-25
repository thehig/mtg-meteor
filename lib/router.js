Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function(){
    this.route('home', {path: '/'});
    this.route('play', {
        path: '/game/:_id',
        data: function(){
            //Get game object
            var game = Games.findOne(this.params._id);

            //Add helpers for our template
            game.player = game.players[Meteor.userId()];
            game.yourTurn = game.currentTurn[0] === Meteor.userId();

            var otherId = game.currentTurn[game.yourTurn? 1 : 0];
            game.otherPlayer = {
              username: Meteor.users.findOne(otherId).username,
                score: game.players[otherId].score
            };

            return game;
        }
    })
});