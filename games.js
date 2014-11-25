/**
 * The collection of currently ongoing games
 * @type {Mongo.Collection}
 */
Games = new Meteor.Collection('games');


/*
*   Example Game Object
* game = {
*   deck: [],
*   table: [],
*   players:{
*       a: {
*           hand: [],
*           pile: [],
*           score: {}
*       },
*       b: {}
*   },
*   inProgress: true/false,
*   started: date,
*   finished: date,
*   winner: id
* }
* */

if(Meteor.isServer){
    //Publish in Server

    Meteor.publish('games', function(){
        //This should show all games where the currentTurn contains the userId
        //This is a MongoDB lookup
        return Games.find({currentTurn: this.userId});
    });

    Meteor.publish('users', function(){
        return Meteor.users.find();
    });
}

if(Meteor.isClient){
    //Subscribe in Client
    Meteor.subscribe('games');
    Meteor.subscribe('users');
}

//Meteor method:
//  Simulated on client while server is completing
Meteor.methods({
    createGame: function(otherPlayerid){
        //Create a game between the current user and the other player
        var game = GameFactory.createGame([Meteor.userId(), otherPlayerid]);
        //Add it to the games collection (Persist)
        Games.insert(game);
    }
});