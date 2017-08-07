/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the train frequency in minutes. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate Arrival Time (frequency)


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjREHEdOlmO2suKuGmm-fC_a4WG3maPxE",
    authDomain: "train-activity-23fa6.firebaseapp.com",
    databaseURL: "https://train-activity-23fa6.firebaseio.com",
    projectId: "train-activity-23fa6",
    storageBucket: "train-activity-23fa6.appspot.com",
    messagingSenderId: "301509603070"
  };

  
firebase.initializeApp(config);

var database = firebase.database();

  // 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

// Grabs user input
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = moment($("#time-input").val().trim(), "HH:mm").toString();
	var frequency = $("#rate-input").val().trim(); 

	//Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    first: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.first);
  	console.log(newTrain.frequency);


	// Alert
  alert("New Train Added!");

  // Clears all of the text-boxes
  $("train-name-input").val("");
  $("destination-input").val("");
  $("time-input").val("");
  $("rate-input").val("");
});

	


  // 3. Create Firebase event for adding train to database. Add table row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());

	//Store everything into a variable.
	var addTrainName = childSnapshot.val().name;
	var addDestination = childSnapshot.val().destination;
	var addTrain = childSnapshot.val().first;
	var addFrequency = childSnapshot.val().frequency;

	//Train Data
	console.log(addTrainName);
	console.log(addDestination);
	console.log(addTrain);
	console.log(addFrequency);

	//Prettify train start
	 var trainArrive = moment.unix(addTrain).format("m");
	// var trainArrive = moment(addTrain "HH:mm").format("LT");

	// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

// Add each train's data into the table
 	$("#train-table > tbody").append("<tr><td>" + addTrainName + "</td><td>" + addDestination + "</td><td>"+ addFrequency + "</td><td>" + addTrain + "</td><td>" + addFrequency + "</td><td>");
});

// 4. Create a way to calculate the train frequency in minutes. Using difference between start and current time.
// //    Then use moment.js formatting to set difference in minutes.

// 5. Calculate Arrival Time (frequency)

// Calculate the months worked using hardcore math
  // To calculate the months worked
  // var trainTime = moment().diff(addFrequency);
  // console.log(trainTime);

  // // Assumptions
  //   var tFrequency = 3;

  //   // Time is 3:30 AM
  //   var firstTime = "03:30";

  //   // First Time (pushed back 1 year to make sure it comes before current time)
  //   var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  //   console.log(firstTimeConverted);
  //       // can specify a date in var firstTime to keep from doing this step
    
  //   // Current Time
  //   var currentTime = moment();
  //   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //   // Difference between the times
  //   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //   console.log("DIFFERENCE IN TIME: " + diffTime);

  //   // Time apart (remainder)
  //   var tRemainder = diffTime % tFrequency;
  //   console.log(tRemainder);

  //   // Minute Until Train
  //   var tMinutesTillTrain = tFrequency - tRemainder;
  //   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  //   // Next Train
  //   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  //   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


 // Add each train's data into the table
//  	$("#train-table > tbody").append("<tr><td>" + addTrainName + "</td><td>" + addDestination + "</td><td>"+ newTrain.first + "</td><td>" + addTrain + "</td><td>" + addFrequency + "</td><td>");
// });

// function(errorObject) {
//     	console.log("Errors handled: " + errorObject.code);
//   };

// **Left to Be Coded/Fixed**
// Change time to minutes
// Only show the military time and not the date and time
// When train is added, do not let it submit if all fields not complete