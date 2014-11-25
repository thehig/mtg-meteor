GameFactory = {};

GameFactory.createGame = function (playerIds) {

    var deck = createDeck(),
        players = createPlayers(playerIds);

    GameFactory.dealPlayers(players, deck);

    var table = dealTable(deck);

    return {
        deck: deck,
        players: players,
        table: table,
        currentTurn: playerIds,
        inProgress: true,
        started: new Date()
    };
};

GameFactory.dealPlayers = function (players, deck){
    for(var i = 0; i < 3; i++){
        Object.keys(players).forEach(function(id){
            players[id].hand.push(deck.shift());
        });
    }
};

function createDeck() {
  var suits = ['Cups', 'Coins', 'Swords', 'Clubs'],
      cards = [];

    suits.forEach(function(suit){
        for(var i = 1; i <= 10; i++){
            var name = i;
            switch(i){
                case 1: name = 'A'; break;
                case 8: name = 'N'; break;
                case 9: name = 'Q'; break;
                case 10: name = 'K'; break;
            }

            cards.push({
                suit: suit,
                value: i,
                name: name
            });
        }
    });

    return _.shuffle(cards);
}

function createPlayers(playerIds){
    var o = {};

    playerIds.forEach(function(id){
        //Create player
        o[id] = {
            hand: [],
            pile: [],
            score: {
                mostCoins: 0,
                mostCards: 0,
                setteBello: 0,
                primera: 0,
                scopa: 0
            }
        };
    });

    return o;
}

function dealTable(deck){
    var card = deck.shift.bind(deck);
    return [card(), card(), card(), card()];
}