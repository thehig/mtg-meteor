Template.userList.helpers({
    users: function(){

        var myId = Meteor.userId(),
            cantPlayAgainst = [myId];

        Games.find({inProgress: true}).forEach(function(game){
            cantPlayAgainst.push(game.currentTurn[game.currentTurn[0] === myId ? 1 : 0]);
        });



        //MongoDB query
        return Meteor.users.find({ _id: { $not: { $in: cantPlayAgainst}}});
    }
});

Template.userItem.events({
    'click button': function(evt, template){
        //Meteor Methods, where a function is hidden securely in server, but can be called from client
        Meteor.call('createGame', template.data._id);
    }
});