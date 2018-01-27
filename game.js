  var config = {
    apiKey: "AIzaSyDteBWCwdr5F5a37kLc9VJtij26DVfBRdk",
    authDomain: "mmorps-f7e9b.firebaseapp.com",
    databaseURL: "https://mmorps-f7e9b.firebaseio.com",
    projectId: "mmorps-f7e9b",
    storageBucket: "",
    messagingSenderId: "582797203111"
  };
  firebase.initializeApp(config);

  $(document).ready(function(){
      $('#welcome').modal('show')
  });