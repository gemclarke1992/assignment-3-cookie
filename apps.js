console.log("hello");
var seconds = 1000 * 60; //1000 = 1 second in JS
var min = seconds * 60;
document.getElementById("img").onclick = function () {
  myFunction();
};

function myFunction() {
  if (seconds >= 0) {
    seconds = seconds--;
  } else {
    clearInterval("timer");
    alert("You clicked X cookies!!!");
  }
  document.getElementById("timer").innerHTML = "0:" + seconds;
}
