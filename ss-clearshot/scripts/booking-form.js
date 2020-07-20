jQuery(document).ready(function($) {

   /**
     * load scripts for checkout page
     **/
    if ( $('body.woocommerce-checkout').length ) {
        console.log("checkout baby");

        //run after ajax stops:
        jQuery(document).ajaxStop(function() {
            // change "time" to "start-time"
            $('dt.variation-Time').html("Start Time:");
            // change provider text
            $('dt.variation-Selectyourpreferredprovider').html("Provider:");
            // insert end time info
            if( $('.variation-endTime').length == 0){
            $('dd.variation-Time').after('<dt class="variation-endTime">End Time:</dt>');
            $('dt.variation-endTime').after('<dd class="variation-endTime"><p></p></dd>');
            }
            
            // get duration time in number format
            durationTime = parseInt($('dd.variation-Duration p').html());
            //get additional time as numbef format
            //additionalTime = parseInt($('dd p:last').html());

            //hide additional time
            $('dd:last').hide();
            $('dt:last').hide();
            //$('dd.variation-Selectyourpreferredprovider').next().hide();
            //$('dd.variation-Selectyourpreferredprovider').next().next().hide();
            $('dt.variation-AddTimeSelection').hide();
            $('dd.variation-AddTimeSelection').hide();
                     

            // create totalTime value (minutes)
            //totalTime = defaultTime + additionalTime

            //change duration display
            //$('dd.variation-Duration p').html(totalTime + ' minutes');

            //get start time string, split into time (i.e. 4:00) and am/pm
            startTime = $('dd.variation-Time p').html();
            startTimeArray = startTime.split(" ");

            // get the am or pm
            startTimeAMPM = startTimeArray[1];

            //split the time (i.e. 4:00) into hours and minutes
            startTimeSplit = startTimeArray[0].split(":");
            startTimeHours = Number(startTimeSplit[0]);
            startTimeMinutes = Number(startTimeSplit[1]);
            
            // create date object from start time
            if(startTimeAMPM = "pm") {
                //convert 12 hours time to 24 hour time
                if(startTimeHours < 12){
                startTimeHours += 12;
                }
            }
            startTimeObject = new Date(0,0, 0, startTimeHours, startTimeMinutes, 0, 0);

            //create end time date object; set as same time as start
            endTimeObject = new Date(0,0,0,startTimeHours,startTimeMinutes,0,0)
            // add totalTime to the minutes
            endTimeObject.setMinutes(startTimeMinutes + durationTime)
            endTimeString = endTimeObject.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            //format end time display
            endTimeArray = endTimeString.split(" ");
            endTimeAMPM = endTimeArray[1].toLowerCase();
            endTimeSplit = endTimeArray[0].split(":");
            endTimeHours = Number(endTimeSplit[0]);
            endTimeMinutes = endTimeSplit[1];

            //display end time
            $('.variation-endTime p').html( endTimeHours +":"+ endTimeMinutes +" "+ endTimeAMPM)


        })//end ajax stop
    }    

/*** 
 * load scripts for single product page
***/

if ( $('body.single-product').length ) {   
    // auto select radio button
    //$("input.wc-pao-addon-radio").prop("checked", true);

jQuery(document).ajaxStop(function() {
    
    //move add on time area to after select provider
    addOnArea = $('.wc-pao-addon-add-time-selection');
    addOnArea.detach();
    $(".wc_appointments_field_staff").after(addOnArea)

    //add instructions heading (i.e. Step 2) above add on time selector
    stepTwo = $(".step-two");

    if(stepTwo.length == 0){
        //add heading
        $(".wc-pao-addon-name").first().before("<div class='step-two booking-instructions'>2. Enter the length of your appointment</div>");            
        // select first radio button (0 minutes add on time)
        
        $(".wc-pao-addon-radio").first().prop("checked", true);
        console.log("select 0");
    }
   
    // default appointment time (in minutes)
    defaultTimeString = $(".duration").html();
    defaultTime = parseInt(defaultTimeString);

    // max appoint time (last radio button + default time)
    // get last (max) time
    maxTimeRadio = $(".wc-pao-addon-radio").last().val();
    maxTime = parseInt(maxTimeRadio) + defaultTime;
    
    // create time selector
    timeSelectorDIV = $(".time-selector");
        if(timeSelectorDIV.length == 0){
            $(".wc-pao-addon-name").before("<div class='time-selector'><label>Change appointment length (max 3 hours)</label></div>");
            $(".time-selector").append("<form><input type='button' value='-' id='qtyminus' /><input id='qty'></input><input type='button' value='+' id='qtyplus' /></form><div class='time-note'>Appointment times may vary, for example appointments may end 5 or 10 minutes early to allow for support related notes and processes between appointments</div>");
                
    // sets default,min,max value of time selector (#qty) as default time 
    $("#qty").attr("value", defaultTime)
    $("#qty").attr("min",defaultTime);
    $("#qty").attr("max", maxTime);

    // show minutes or hours text
    displayedLength = $("#qty").val();
    minutesOrHours = "minutes"
    $("#qty").after("<span class='displayed-length'></span>");
            // show hours if >= 60 minutes
    if( Number($("#qty").val()) > 60 ) {
        displayedLength = $("#qty").val() / 60;
        minutesOrHours = "hours"
    } else if ( Number($("#qty").val()) == 60) {
        displayedLength = $("#qty").val() / 60;
        minutesOrHours = "hour"
    }
    $(".displayed-length").html(displayedLength + " " + minutesOrHours)
    


    //click "+" button function
    $("form #qtyplus").click(function(){
        //console.log("click +");
        oldTime = Number($("#qty").val());
        //console.log("old time:" + oldTime)
        newTime = oldTime + defaultTime; 
        //console.log("new time:" + newTime)
        
        if (newTime >= Number(maxTime)) {  
            // if greater than max allowed time, set appointment length to maximum time
            $("#qty").val(Number(maxTime));   

            // update the "end-time" display
                //add the (maxTime-defaultTime) to the startDate minutes
                endDate = new Date();
                endDate.setHours(startDate.getHours());
                endDate.setMinutes(startDate.getMinutes());
                endDate.setMinutes(Number(maxTime));
                // convert to readable string
                endTimeString = endDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
                $(".end-time").html(endTimeString);

                if( Number($("#qty").val()) > 60 ) {
                    displayedLength = $("#qty").val() / 60;
                    minutesOrHours = "hours"
                } else if ( Number($("#qty").val()) == 60) {
                    displayedLength = $("#qty").val() / 60;
                    minutesOrHours = "hour"
                }
                $(".displayed-length").html(displayedLength + " " + minutesOrHours)

                //click last radio button
                $(".wc-pao-addon-radio")[2].click();


        } else {                   
           $("#qty").val(newTime);
           
           //update the "end-time" display
            //reset time to starting time
            endDate = new Date();
            endDate.setHours(startDate.getHours());
            endDate.setMinutes(startDate.getMinutes());
            //add minutes value to resetted time
            endDate.setMinutes(newTime);
           //convert to nice looking time string    
           plusDateString = endDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
           //display time string
            $(".end-time").html(plusDateString);    
            
            if( Number($("#qty").val()) > 60 ) {
                displayedLength = $("#qty").val() / 60;
                minutesOrHours = "hours"
            } else if ( Number($("#qty").val()) == 60) {
                displayedLength = $("#qty").val() / 60;
                minutesOrHours = "hour"
            }
            $(".displayed-length").html(displayedLength + " " + minutesOrHours)

            selectedTime = $(".wc-pao-addon-radio:checked")
            //console.log(selectedTime)
            nextTime = selectedTime.parentsUntil("div").next().find(".wc-pao-addon-radio");
            //console.log(nextTime)
            nextTime[0].click();
            
        }
        });
    
    // click "-" button function
    $("#qtyminus").click(function(){
        console.log("click -");
        oldTime = Number($("#qty").val());
        newTime = oldTime - defaultTime; 
        
    if (newTime <= defaultTime) {  
        // if appointment length is less than or equal to minimum time...
        $("#qty").val(defaultTime); 
        $(".wc-pao-addon-input-multiplier").val(0);   
        
        // update the "end-time" display
        //add the (maxTime-defaultTime) to the startDate minutes
        endDate = new Date();
        endDate.setHours(startDate.getHours());
        endDate.setMinutes(startDate.getMinutes() + defaultTime);
        // convert to readable string
        endTimeString = endDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
        $(".end-time").html(endTimeString);

        // display time length 
        minutesOrHours = "minutes"
        $(".displayed-length").html(defaultTime + " " + minutesOrHours)

        $(".wc-pao-addon-radio")[0].click();
    }
     else {                   
         // if appointment length is greater than minimum time..
       $("#qty").val(newTime);
       $(".wc-pao-addon-input-multiplier").val(newTime - defaultTime); 

       // update the "end-time" display
           //reset time to starting time
           endDate.setHours(startDate.getHours());
           endDate.setMinutes(startDate.getMinutes());
           //add minutes value to resetted time
           endDate.setMinutes(newTime);
           //convert to nice looking time string    
             minusDateString = endDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            //display end time string
             $(".end-time").html(minusDateString);

             // display time length string
             if( Number($("#qty").val()) > 60 ) {
                displayedLength = $("#qty").val() / 60;
                minutesOrHours = "hours"
            } else if ( Number($("#qty").val()) == 60) {
                displayedLength = $("#qty").val() / 60;
                minutesOrHours = "hour"
            }
            $(".displayed-length").html(displayedLength + " " + minutesOrHours)

        // select previous radio
        selectedTime = $(".wc-pao-addon-radio:checked")
        console.log(selectedTime)
        previousTime = selectedTime.parentsUntil("div").prev().find(".wc-pao-addon-radio");
        console.log(previousTime)
        previousTime[0].click();     
    }
    });
    }

     // create Summary container div
     appointmentSummary = $(".appointment-summary");
     timeDIV = $(".start-end-time");
     startDIV = $(".start-time");
     endDIV = $(".end-time");
     summaryDate = $(".summary-date")
     summaryProvider = $(".summary-provider")
    dateisSelected = $('li.selected')

     if( dateisSelected.length > 0 ){
     if(appointmentSummary.length == 0){
        $(".slot-picker").after("<div class='appointment-summary'><h4>Appointment Summary</h4></div>");
        // start end time
        $(".appointment-summary").append("<div class='start-end-time'></div>");
    
            $(".start-end-time").append("Start time: <div class='start-time'></div>");
    
            $(".start-end-time").append("End time:<div class='end-time'></div>");
        // date, provider
        $(".appointment-summary").append("<div class='summary-date'></div>");
        $(".appointment-summary").append("<div class='summary-provider'></div>");
    }
    }

    // display the date
    dateNumber = Number($('.ui-state-active').html());
    dateMonth = Number($('.ui-datepicker-current-day').attr("data-month"));
    dateYear = Number($('.ui-datepicker-current-day').attr("data-year"));
    summaryDateObject = new Date(dateYear, dateMonth, dateNumber)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    summaryDateString = summaryDateObject.toLocaleDateString("en-US", options);
    $(".summary-date").html("Date: " + "<span class='appointment-summary-detail'>" + summaryDateString + "</div>");
    
    // display the provider
    providerName = $("#select2-wc_appointments_field_staff-container").attr("title")
    $(".summary-provider").html("Provider: " + "<span class='appointment-summary-detail'>" + providerName+ "</div>");


    // get start time
    startTime = Number($("#wc_appointments_field_start_date").attr("data-value"));
    //create startDate object   
    startDate = new Date(0,0, 0, startTime/100, 0, 0, 0);

    //display start time
    startTimeString = startDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    $(".start-time").html(startTimeString);   
    console.log("start time:" + startTime);

    
    // end time
    
    if(startTime > 0) {

            console.log("end time reactivated")
            endDate = new Date(0,0,0,0,0,0,0);
            endDate.setHours(startDate.getHours());
            selectedTime = $(".wc-pao-addon-radio:checked")
            endDate.setMinutes(defaultTime + parseInt(selectedTime.val()))
            endTimeString = endDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            $(".end-time").html(endTimeString);

        }
    
    

}) // end ajaxStop



jQuery(document).ajaxComplete(function() {
    //console.log("ajax completed");
    //$(".wc-appointments-appointment-hook-after").after(endTime);


    
}); // end ajaxComplete

      

  jQuery(document).ajaxSuccess(function() {
    //console.log("ajax success");
    //$(".wc-pao-addon-minimum-appointment-length").after("<div class='booking-instructions'>3. Enter the length of your appointment</div>");

             
});


}



});//close all jquery 
