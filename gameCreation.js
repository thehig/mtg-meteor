/**
 * Global Game Factory for creating cards, decks, players, games
 * @type {{}}
 */
GameFactory = {};

/**
 * Create and return a game between the specified playerIds
 * @param playerIds
 * @returns {{deck: an, players: a, table: an, currentTurn: *, inProgress: boolean, started: Date}}
 */
GameFactory.createGame = function (playerIds) {

    //Create the placeholder items for this game
    var deck = createDeck(),
        players = createPlayers(playerIds);

    //Deal cards from the deck to the players
    GameFactory.dealPlayers(players, deck);

    //From the remaining cards, deal to the table
    var table = dealTable(deck);

    //Return a game object with all the required structures in place
    return {
        deck: deck,
        players: players,
        table: table,
        currentTurn: playerIds,
        inProgress: true,
        started: new Date()
    };
};

/**
 * Deal 3 cards to each player from the provided deck
 * @param players
 * @param deck
 */
GameFactory.dealPlayers = function (players, deck){
    for(var i = 0; i < 3; i++){
        //This is a weird looking foreach operation because players is an object and not an array
        //Each player is stored as a named object (key, value) attached to players
        //      i.e. players.QGY or players[QGY]
        Object.keys(players).forEach(function(id){
            players[id].hand.push(deck.shift());
        });
    }
};



/**
 * Create a Scopa deck with
 * 4 suits - Cups, Coins, Swords, Clubs
 * 10 cards, 4 of which are special named cards: Ace, kNight, Queen, King
 * @returns an array of shuffled cards
 */
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

/**
 * Create initial structures for each player
 * @param playerIds
 * @returns a players object with each player stored as (key, value) i.e. players.QHY or players[QHY]
 */
function createPlayers(playerIds){
    var players = {};

    playerIds.forEach(function(id){
        //Create player
        players[id] = {
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

    return players;
}

/**
 * Deal 4 cards to the table
 * @param deck
 * @returns an array of 4 cards from the provided deck
 */
function dealTable(deck){
    //Shorthand to call the same function 4 times instead of using a loop structure
    var card = deck.shift.bind(deck);
    return [card(), card(), card(), card()];
}