

function showYesForm(){
    var firstQuestion = document.querySelector("#firstQuestion");
    var yesForm = document.querySelector(".yes-form");
    yesForm.style.display = "block";
    firstQuestion.style.display = "none";
}

function showNoForm(){
    var firstQuestion = document.querySelector("#firstQuestion");
    var noForm = document.querySelector(".no-form");
    noForm.style.display = "block";
    firstQuestion.style.display = "none";
}

/*
 INTAKE FORM 
*/
// get the modal element


/**
///// INTAKE FORM FIELDS 
*/

//change My NDIS number info
const myNDISnumberDescription = document.querySelector("#wppb-form-element-30 .wppb-description-delimiter");
myNDISnumberDescription.innerText = "Required NDIS number format: ##########";

jQuery(document).ready(function($) {
    if ( $('body.page-id-1188').length ){
        $('input').removeAttr('maxlength');
        jQuery(document).ajaxStop(function() {
            myNDISErrorMessage = $('#wppb-form-element-30 .wppb-form-error');
            myNDISErrorMessage.text("Incorrect NDIS number");

            $('input').removeAttr('maxlength');



        })
}
})
