  var config = {
    apiKey: "AIzaSyDteBWCwdr5F5a37kLc9VJtij26DVfBRdk",
    authDomain: "mmorps-f7e9b.firebaseapp.com",
    databaseURL: "https://mmorps-f7e9b.firebaseio.com",
    projectId: "mmorps-f7e9b",
    storageBucket: "mmorps-f7e9b.appspot.com",
    messagingSenderId: "582797203111"
  };

firebase.initializeApp(config);

var player1;
var player2;
var thisPlayer;
var RPS ={ R: 0, P: 1, S: 2};


function Player() {
    this.wins = 0;
    this.losses = 0;
    this.choice = "";
}

var data = firebase.database();


$(document).ready(function(){
    $('#welcome').modal('show');
    
    data.ref().once("value").then(function(snapshot){
    if (snapshot.child("player1").exists()) 
    {
    	player1 = snapshot.child("player1").val();
    	if (snapshot.child("player2").exists())
    	{
    	    $('#welcome').modal('hide');
    	    $('#sorry').modal('show');	
    	}
        
        else
        {
    	    player2 = new Player;
    	    thisPlayer = 2;
    	    data.ref("player2").set(player2);
        }
    }
    
    else 
    {
    	player1 = new Player;
    	thisPlayer = 1;
    	data.ref().set({player1:player1});
    }
    });
});

data.ref().on("value", function(snapshot){
    
       
});