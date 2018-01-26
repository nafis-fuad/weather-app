"use strict";

    // get the current year using the Date() constructor function.
    const currentYear = new Date().getFullYear();
    // get the <title> of the page using getElementsByTagName
    const titleOfThePage = document.getElementsByTagName("title");
    // getElementsByTagName returns an Array, so the 1st element needs to be selected and the innerHTML needs to be updated
    const updateTitle = titleOfThePage[0].innerHTML +=  ` (${currentYear})`;
    // console.log the updatedtitle.
    console.log(updateTitle);


    window.onload = pageLoader;
  
    function pageLoader(){
        
        console.log("window has loaded...");
        let timeout = setTimeout(showPage, 1100);
        
        function showPage() {
        document.getElementById("loader").style.display = "none";
        document.getElementsByClassName("wrapper")[0].style.display = "grid";
            
        }
    };