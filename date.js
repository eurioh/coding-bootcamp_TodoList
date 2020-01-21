//jshint esversion:6

exports.getDate = function(){

//JS format the date_check module
 const today = new Date();
 const options = {
     weekday: "long",
     day:"numeric",
     month:"long"
 };
 return day = today.toLocaleDateString("en-US", options);
 // Js format the date up to here
 
};

exports.getDay = function(){
    const today = new Date();
    const options = {
        weekday: "long"
    };
    return day = today.toLocaleDateString("en-US", options);
   }

   