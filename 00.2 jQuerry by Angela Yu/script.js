let h1 = $("h1");
//! $ will select all it is like querySelectorAll.
const buttons = $("button");
console.log(buttons);
//! Getting CSS properties ->
console.log($("h1").css("fontSize"));
console.log($("h1").css("color"));
console.log($("h1").css("fontWeight"));
//! Setting CSS properties ->
// $("h1").css("color", "red");
console.log($("h1").css("fontSize", "5rem"));
console.log($("h1").css("textDecoration", "underline"));
//! Adding CSS class to an Element ->
$("h1").addClass("big-title");
$("h1").removeClass("big-title");
//! Adding multiple CSS class ->
$("h1").addClass("big-title test");
//! Checking For class ->
console.log($("h1").hasClass("test"));
console.log($("h1").hasClass("hero"));

//! Manupulating Text ->
h1.text("Heading 1");
//@ Same as .innerHTML method ->
// buttons.html("<strong>HEY!</strong>");
buttons.html("Show/Hide");

//! Getting Attributes ->
console.log($("img").attr("src"));
//! Setting Attributes ->
$("a").attr("href", "https://www.youtube.com");
//! Getting all classes ->
console.log(h1.attr("class"));

//! Adding Event Listener ->
h1.removeClass("big-title");
let statuS = false;
const colorChange = function () {
  if (!statuS) {
    h1.css("color", "rgb(238, 83, 83)");
    statuS = true;
  } else {
    h1.css("color", "grey");
    statuS = false;
  }
};
h1.click(colorChange);
// $(document).keydown(function (e) {
//   h1.text(e.key);
// });

const mouseColor = function () {
  $("p").css("color", `${this}`);
};
$("p").on("mouseover", mouseColor.bind("blue"));
$("p").on("mouseout", mouseColor.bind("grey"));
$("img").on("mouseover", function () {
  $("img").css("transform", "scale(2,2)");
});
$("img").on("mouseout", function () {
  $("img").css("transform", "scale(1,1)");
  $("img").css("transition", "all 1s");
});
buttons.on("click", function () {
  // h1.hide();
  // h1.show();
  // h1.toggle();
  // h1.fadeOut();
  // h1.fadeIn();
  h1.fadeToggle();
});
