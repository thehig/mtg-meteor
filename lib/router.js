
//Where to insert the routed content
//  Note: Seems to take up the entire screen, even if there's other things on the page

/**
 * Configure the basic routing, i.e. what template should we replace?
 */
Router.configure({
    layoutTemplate: 'layout'
});

/**
 * Set up our routes
 *      /               ->      home template
 *      /game/:_id      ->      play template (with game data)
 */
Router.map(function(){

    this.route('home', {path: '/'});

    this.route('play', {
        path: '/game/:_id',
        data: function(){
            if(!this.params._id) return {};

            //Get game object from MongoDB with this game id
            var game = Games.findOne(this.params._id);
            if(!game) return {};

            //Add helper-bindings for our template so we can bind from the game without having to do look-ups

            //Get the current player from the game object by id
            game.player = game.players[Meteor.userId()];
            //Is it your turn?
            game.yourTurn = game.currentTurn[0] === Meteor.userId();

            //Get the other player for handier binding
            var otherId = game.currentTurn[game.yourTurn? 1 : 0];

            //Get the other player information that we want to visualize/bind
            game.otherPlayer = {
                username: Meteor.users.findOne(otherId).username,
                score: game.players[otherId].score
            };

            //Return game, this will become the data for the 'play' template/page
            return game;
        }
    })
});