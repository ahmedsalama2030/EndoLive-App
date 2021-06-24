"use strict";

 
 
let connection = new signalR.HubConnectionBuilder().withUrl("/appointmentHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("receiveAppointment", function (count) {
    console.log(count);
    document.getElementById("Book-Appountment").innerText = count;
    
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
   
    connection.invoke("SendAppointment").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});