/**
 * Get the other players ID from the given game
 * @param game
 * @returns {*} the other players id
 */
function otherId(game){
    return game.currentTurn[game.currentTurn[0] === Meteor.userId() ? 1 : 0]
}

Template.gameList.helpers({
    //Provide a games object to the gameList template
    games: function(){
        //Get only in-progress games
        return Games.find({inProgress: true}).map(function(game){
            //Add an 'otherPlayer' name property (for UX/binding)
            game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
            //How long ago was the game started? (for UX/binding)
            game.started = moment(game.started).fromNow();
            return game;
        });
    }
});

Template.userList.helpers({
    //Provide users data for the userList template
    users: function(){

        //You're not allowed play games against yourself
        var myId = Meteor.userId(),
            cantPlayAgainst = [myId];

        //Find games that are in progress and accumulate the Ids of our current opponents
        //  You are only allowed to have a single game against a given opponent
        Games.find({inProgress: true}).forEach(function(game){
            cantPlayAgainst.push(otherId(game));
        });

        //MongoDB query to find us some games with people we CAN play against
        return Meteor.users.find({ _id: { $not: { $in: cantPlayAgainst}}});
    }
});

Template.userItem.events({
    'click button': function(evt, template){
        //Securely call (via the Meteor.methods api) the createGame function with the opponent players Id
        Meteor.call('createGame', template.data._id);
    }
});