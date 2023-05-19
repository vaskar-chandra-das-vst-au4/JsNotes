"use strict";
document.querySelector("li:nth-child(2)").textContent = "I am changed now.";
document.querySelector("li:nth-child(2)").style.fontSize = "30px";
document.querySelector("li:nth-child(2)").style.color = "blue";
document.querySelector("li:nth-child(2)").style.border =
  "2px solid rgb(102, 172, 93)";
document.querySelector("li a").style.color = "green";
document.querySelector("li a").style.fontSize = "20px";
document.querySelector("button").style.backgroundColor = "yellow";
document.querySelector("input").click();

//difference_between_.textContent_and_innerHTML---------------------------------
document.querySelector("h1").textContent = " <em> Hello Changed </em>"; //Here the whole thing written within inverted commas after equal is all just plain text.
document.querySelector("h1").innerHTML = " <em> Hello Changed </em>"; //By using innerHTML we can aslo manupulate the tags within the selected tag.
//add_remove_and_toggle_classes-----------------------------------------------
document.querySelector("button").classList.add("jsClass");
// document.querySelector("button").classList.remove("jsClass");
// document.querySelector("button").classList.toggle("jsClass"); //if on then it will off or vice versa
//classList is a method use to add a class into a selected html tag.

// manupulating html attricutes-------------------
//below is the code use to check all the attributes related the selected object or element
// console.log(document.querySelector("a").attributes);
//below is the code use to get the value of the specified attribute.
// console.log(document.querySelector("a").getAttribute("href"));
//below is the code for setting or manupulating a target attribute.
document.querySelector("a").setAttribute("href", "https://www.facebook.com");
// ----------------------------------------------
// document.querySelector(".testClass") //it will select only the first tag with this class.
// document.querySelectorAll(".testClass") //it will select all the tags with class testClass.
// document.querySelectorAll(".testClass")[1] //it will select the tag with index 1 in the node array.
