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
var otherPlayer;
var RPS ={ R: 0, P: 1, S: 2};


function Player() {
    this.wins = 0;
    this.losses = 0;
    this.choice = "";
    this.messages = "";
}

var data = firebase.database();


$(document).ready(function(){
    $('#welcome').modal('show');
    player1 = "";
    player2 = "";
    thisPlayer= "";
    otherPlayer= "";
    
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
    	    otherPlayer = "player1"
    	    thisPlayer = "player2";
    	    data.ref("player2").set(player2);
    	    // var messages = data.ref("player1/messages"); 
    	    // messages.once("value", function(snap){

    	    // snap.forEach(function(child){
         //         $("#messages").append("Them: "+child.val()+"<br>");
    	    // });
    	    // });
    	    // console.log(otherPlayer);
    	}
    }
    
    else 
    {
    	player1 = new Player;
    	thisPlayer = "player1";
    	otherPlayer = "player2";
    	data.ref("player1").set(player1);
    	console.log(otherPlayer);
    }
    });

});

$(".rps").on("click", function()
{
	var choice = this.id;
    console.log(choice);
    data.ref().once("value").then(function(snapshot){
    if (snapshot.child(otherPlayer+"/choice").val() == "")
    {
        if (snapshot.child(thisPlayer+"/choice").val() != "")
        {
            $("#sorry .modal-body").text("You already chose!");
            $('#sorry').modal('show');
        }
        else
        {
    	    data.ref(thisPlayer+"/choice").set(choice);
        }
    }
        
    else if (!snapshot.child(otherPlayer+"/choice").exists())
    {
    	if (snapshot.child(thisPlayer+"/choice").val() != "")
        {
            $("#sorry .modal-body").text("You already chose!");
            $('#sorry').modal('show');
        }
        else
        {
    	    data.ref(thisPlayer+"/choice").set(choice);
        }
    }

    else
    {
    	theirChoice = snapshot.child(otherPlayer+"/choice").val();
        console.log(RPS[choice]);
        console.log(RPS[theirChoice]);
    	switch (RPS[choice]-RPS[theirChoice])
    	{
            case 0:
                $("#results .modal-body").html("It was a tie!<br>");
                break;
    	   
            case 1:
                $("#results .modal-body").html("You won!<br>");
                var losses = snapshot.child(otherPlayer+"/losses").val() + 1;
    	        data.ref(otherPlayer+"/losses").set(losses);
    	        var wins = snapshot.child(thisPlayer+"/wins").val() + 1;
    	        data.ref(thisPlayer+"/wins").set(wins);
    	        break; 

    	    case -2:
                $("#results .modal-body").html("You won!<br>");
                var losses = snapshot.child(otherPlayer+"/losses").val() + 1;
    	        data.ref(otherPlayer+"/losses").set(losses);
    	        var wins = snapshot.child(thisPlayer+"/wins").val() + 1;
    	        data.ref(thisPlayer+"/wins").set(wins);
    	        break;

    	    case 2:
    	         $("#results .modal-body").html("You lost!<br>");
    	         var losses = snapshot.child(thisPlayer+"/losses").val() + 1;
    	         data.ref(thisPlayer+"/losses").set(losses);
    	         var wins = snapshot.child(otherPlayer+"/wins").val() + 1;
    	         data.ref(otherPlayer+"/wins").set(wins); 
                 break; 

             case -1:
    	         $("#results .modal-body").html("You lost!<br>");
    	         var losses = snapshot.child(thisPlayer+"/losses").val() + 1;
    	         data.ref(thisPlayer+"/losses").set(losses);
    	         var wins = snapshot.child(otherPlayer+"/wins").val() + 1;
    	         data.ref(otherPlayer+"/wins").set(wins); 
                 break;              
    	}
        
        choice = $("#"+choice).text();
        theirChoice = $("#"+theirChoice).text();

    	$("#results .modal-body").append("You chose "+choice+"<br>");
    	$("#results .modal-body").append("Your opponent chose "+theirChoice+"<br>");
        $("#results").modal('show');
        data.ref(thisPlayer+"/choice").set("");
        data.ref(otherPlayer+"/choice").set("");
    }
    
    $("#losses").text(snapshot.child(thisPlayer+"/losses").val()+"  ");
    $("#wins").text(snapshot.child(thisPlayer+"/wins").val()+"  ");
    });
});

// $("#chat").on("click", function(event)
// {
//     event.preventDefault();
//     var input = $("#chatBox").val();
//     var message = "you: "+ input;
//     $("#messages").append(message+"<br>");
//     data.ref(thisPlayer).child("messages").push(input);
// });

// data.ref(otherPlayer).on("child_changed", function(childSnapshot) {
    
//     console.log(childSnapshot.val());

//     // if (childSnapshot.val() != "null")
//     // {
//     //     var line = "Them: "+childSnapshot.val();
//     //     $("#messages").append(line);
//     // }

// });