var WebSocketServer = require("ws").Server,
    http = require("http"),
    express = require("express"),
    app = express(),
    port = process.env.PORT || 5000,
    players = [],
    adminSocket = '',
    currentQuestion = 0,
    questions = [ 
      {
        type: 'question',
        number: 1,
        question: '"Blue Harvest" was the working title for which Star Wars episode?',
        answers: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Phantom Menace'],
        image: 'images/1.jpg',
        correctAnswer: 2
      },
      {
        type: 'question',
        number: 2,
        question: 'What type of ship is this?',
        answers: ['A-Wing', 'B-Wing', 'X-Wing', 'Y-Wing'],
        image: 'images/2.jpg',
        correctAnswer: 0
      },
      {
        type: 'question',
        number: 3,
        question: 'On Hoth, which creature captures Luke?',
        answers: ['Jawa', 'Tauntaun', 'Womp Rat', 'Wampa'],
        image: 'images/3.jpg',
        correctAnswer: 3
      },
      {
        type: 'question',
        number: 4,
        question: "What is the name of Boba Fett's Ship?",
        answers: ['Slave 1', 'Slave 2', 'Slave 3', 'Slave 4'],
        image: 'images/4.jpg',
        correctAnswer: 0
      },
      {
        type: 'question',
        number: 5,
        question: 'Which character is first to speak in Episode IV?',
        answers: ['Princess Leia', 'Darth Vader', 'C-3PO', 'Tantive IV Crew Member'],
        image: 'images/5.jpg',
        correctAnswer: 2
      },
      {
        type: 'question',
        number: 6,
        question: 'What type of ship did Luke use to shoot Womp Rats?',
        answers: ['T-15', 'T-16', 'T-17', 'T-18'],
        image: 'images/6.jpg',
        correctAnswer: 1
      },
      {
        type: 'question',
        number: 7,
        question: 'What did Leia call Chewie as they escaped the trash compactor?',
        answers: ['Giant Ewok', 'Hairy Jeff', 'Al', 'Walking Carpet'],
        image: 'images/7.jpg',
        correctAnswer: 3
      },
      {
        type: 'question',
        number: 8,
        question: 'On which planet would you find Cloud City?',
        answers: ['Bespin', 'Dagobah', 'Tatooine', 'Alderaan'],
        image: 'images/8.jpg',
        correctAnswer: 0
      },
      {
        type: 'question',
        number: 9,
        question: 'What does AT-AT stand for?',
        answers: ['Nothing', 'All Terrain Armoured Transport', 'A Terrifying Animal Tank', 'Armoured Troop Auxiliary Transport'],
        image: 'images/9.jpg',
        correctAnswer: 1
      },
      {
        type: 'question',
        number: 10,
        question: 'Of the first six episodes, which is the longest?',
        answers: ['Episode II', 'Episode III', 'Episode V', 'Episode VI'],
        image: 'images/10.jpg',
        correctAnswer: 0
      },
      {
        type: 'question',
        number: 11,
        question: 'In what material is Han Solo frozen?',
        answers: ['Carbon Fibre', 'Carbonite', 'Carbonara', 'Graphene'],
        image: 'images/11.jpg',
        correctAnswer: 1
      },
      {
        type: 'question',
        number: 12,
        question: 'Name of Lukeʼs friend, killed during the attack on the Death Star?',
        answers: ['Wedge Antilles', 'Laurent Babydeliverer', 'Mos Eisley', 'Biggs Darklighter'],
        image: 'images/12.jpg',
        correctAnswer: 3
      },
      {
        type: 'question',
        number: 13,
        question: 'What was Luke Skywalker’s callsign in the Death Start assault?',
        answers: ['Red 3', 'Red 5', 'Red 7', 'Red 9'],
        image: 'images/13.jpg',
        correctAnswer: 1
      },
      {
        type: 'question',
        number: 14,
        question: "Mace Windu's lightsaber was which colour?",
        answers: ['Red', 'Blue', 'Purple', 'Green'],
        image: 'images/14.jpg',
        correctAnswer: 2
      },
      {
        type: 'question',
        number: 15,
        question: "What is the name of Anakin Skywalker’s mother?",
        answers: ['Smee', 'She', 'Scree', 'Shmi'],
        image: 'images/15.jpg',
        correctAnswer: 3
      },
      {
        type: 'question',
        number: 16,
        question: 'Which actor is unmasked as Darth Vader in Return of the Jedi?',
        answers: ['David Prowse', 'Sebastian Shaw', 'James Earl Jones', 'Alec Guinness'],
        image: 'images/16.jpg',
        correctAnswer: 1
      },
      {
        type: 'question',
        number: 17,
        question: 'How many times is the word "Ewok" used in Return of the Jedi?',
        answers: ['0', '5', '10', '15'],
        image: 'images/17.jpg',  
        correctAnswer: 0
      },
      {
        type: 'question',
        number: 18,
        question: 'The Jedi Temple was on which planet?',
        answers: ['Tatooine', 'Coruscant', 'Hoth', 'Alderaan'],
        image: 'images/18.jpg',
        correctAnswer: 1
      },
      {
        type: 'question',
        number: 19,
        question: 'Who was Queen of Naboo?',
        answers: ['Pedometer Dials', 'Pedmé Palmer', 'Padmé Amidala', 'Leia Organa'],
        image: 'images/19.jpg',
        correctAnswer: 2
      },
      {
        type: 'question',
        number: 20,
        question: "Who was Obi-Wan Kenobi's mentor?",
        answers: ['Yoda', 'Mace Windu', 'One-Gin John', 'Qui-Gon Jinn'],
        image: 'images/20.jpg',
        correctAnswer: 3
      },
      {
        type: 'question',
        number: 21,
        question: 'Who killed Jabba The Hutt?',
        answers: ['Luke Skywalker', 'Han Solo', 'Princess Leia', 'Darth Vader'],
        image: 'images/21.jpg',
        correctAnswer: 2
      },
      {
        type: 'question',
        number: 22,
        question: 'What actor played R2-D2?',
        answers: ['Anthony Daniels', 'Warwick Davis', 'Jake Lloyd', 'Kenny Baker'],
        image: 'images/22.jpg',
        correctAnswer: 3
      },
      {
        type: 'question',
        number: 23,
        question: "What is Chewbacca's home world?",
        answers: ['Kashyyyk', 'Corellia', 'Korriban', 'Kamino'],
        image: 'images/23.jpg',
        correctAnswer: 0
      },
      {
        type: 'question',
        number: 24,
        question: 'Princess Leia tries to convince the Empire the rebels are on which planet?',
        answers: ['Korriban', 'Dantooine', 'Tattooine', 'Endor'],
        image: 'images/24.jpg',
        correctAnswer: 1
      },
      {
        type: 'question',
        number: 25,
        question: 'Where is Princess Leia detained on the Death Star?',
        answers: ['Level 5, Detention Block 1138', 'Level 5, Detention Block AA23', 'Level 5, Detention Block THX', 'Level 5, Detention Block KYAN'],
        image: 'images/25.jpg',
        correctAnswer: 1
      },
      {
        type: 'question',
        number: 26,
        question: 'Sand People are easily...?',
        answers: ['Led', 'Confused', 'Startled', 'Offended'],
        image: 'images/26.gif',
        correctAnswer: 2
      },
      {
        type: 'question',
        number: 27,
        question: 'Who plays Lando Calrissian?',
        answers: ['Bill Withers', 'Bill Cosby', 'Bill Bailey', 'Billy Dee Williams'],
        image: 'images/27.gif',
        correctAnswer: 3
      },
      {
        type: 'question',
        number: 28,
        question: 'Who was the genetic template for the Clone Troopers?',
        answers: ['Gavino Shinfett', 'Jango Fett', 'Boba Fett', 'Spinach & Feta'],
        image: 'images/28.gif',
        correctAnswer: 1
      },
      {
        type: 'question',
        number: 29,
        question: 'Which comic book villain does Mark Hamill voice?',
        answers: ['Joker', 'Riddler', 'Lex Luthor', 'Kingpin'],
        image: 'images/29.gif',
        correctAnswer: 0
      },
      {
        type: 'question',
        number: 30,
        question: 'Harrison Ford is how old?',
        answers: ['71', '72', '73', '74'],
        image: 'images/30.gif',
        correctAnswer: 2
      }
    ];

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    obj = JSON.parse(message);
    switch(obj.type) {
      case "login":
        login(obj.data, this);
        break;
      case "admin-login":
        adminSocket = ws;
        break;
      case "admin-next-question":
        adminSocket.send(JSON.stringify({type:'question', data: questions[currentQuestion]}));
        wss.broadcast(JSON.stringify({type:'question', data: questions[currentQuestion]}));
        break;
      case "admin-show-answer":
        wss.broadcast(JSON.stringify({type:'show-answer', data: questions[currentQuestion].correctAnswer}));
        currentQuestion++
        break;
      case "admin-show-results":
        var rankedPlayers = players.slice().sort(function(a,b){return b.score - a.score});
        var results = rankedPlayers.map(function(p) {
          return {"name": p.name, "score": p.score}
        });
        wss.broadcast(JSON.stringify({type:'show-result', data: results}));
        break;
      case "admin-reset":
        players.forEach(function each(player) {
          player.score = 0;
        });
        currentQuestion = 0
        break;  
      case "answer-q":
        var player = players.filter(function(p){ return p.id === obj.data.player ? true : false })[0],
            playerIndex = players.findIndex(function(el){ return el.id == player.id ? el : false });

        if(obj.data.answerIndex === questions[currentQuestion].correctAnswer) {
          player.score++
        }

        adminSocket.send(JSON.stringify({type:'players-answered', data: {"playerIndex":playerIndex, "score":player.score}}));
        break;
      default:
        console.log("Ooops, no message type");
    }
  });

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
  })
});

wss.broadcast = function broadcast(data) {
  sockets = players.map(function(p){
    return p.socket;
  })
  sockets.forEach(function each(socket) {
    socket.send(data);
  });
};

function login(data, ws) {
  var newPlayer = {  
      id: players.length + 1,
      name: data.playerName,
      socket: ws,
      score: 0
    }
  players.push(newPlayer);

  playerPacket = players.map(function(p){ 
    return {name: p.name}
  })
  
  ws.send(JSON.stringify({type:'login-success', data: newPlayer.id}));
  adminSocket.send(JSON.stringify({type:'players-standing-by', data: playerPacket}));
  wss.broadcast(JSON.stringify({type:'standing-by', data: playerPacket}));
}
