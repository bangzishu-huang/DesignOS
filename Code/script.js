// Make the DIV element draggable:
function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


// grabbing ids 
const timenow = document.getElementById("timenow")
const intro = document.getElementById("intro")
const project1header = document.getElementById("project1header")
const project2header = document.getElementById("project2header")
const project3header = document.getElementById("project3header")
const project4header = document.getElementById("project4header")
const project5header = document.getElementById("project5header")

const project1 = document.getElementById("project1")
const project2 = document.getElementById("project2")
const project3 = document.getElementById("project3")
const project4 = document.getElementById("project4")


const openintrobtn = document.querySelector("#openintro")
const closeintrobtn = document.querySelector("#closeintro")
const openicon1 = document.querySelector("#icon1")
const openicon2 = document.querySelector("#icon2")
const openicon3 = document.querySelector("#icon3")
const openicon4 = document.querySelector("#icon4")


// setting display time
function updateTime() {
    timenow.innerHTML = new Date().toLocaleTimeString();
}

updateTime();
setInterval(updateTime, 1000);


// intro screen
function showintro() {
    intro.style.display = "flex";
}

function hideintro() {
    intro.style.display = "none";
}

openintrobtn.addEventListener("click", showintro)
closeintrobtn.addEventListener("click", hideintro)


// project windows
function showicon1() {
    project1.style.display = "flex";
}
openicon1.addEventListener("click", showicon1)

function showicon2() {
    project2.style.display = "flex";
}
openicon2.addEventListener("click", showicon2)

function showicon3() {
    project3.style.display = "flex";
}
openicon3.addEventListener("click", showicon3)

function showicon4() {
    project4.style.display = "flex";
}
openicon4.addEventListener("click", showicon4)


document.querySelectorAll('.closeButton').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.projectWindow').style.display = 'none';
    })
})


// windows orders
var biggestZIndex = 1;

function bringtofront(something) {
    something.addEventListener("mousedown", () =>
    handletap(something)
    )
}

function handletap(something) {
    biggestZIndex++;
    something.style.zIndex = biggestZIndex;
}


// optimizing
function initialize(something) {
    bringtofront(something);
    dragElement(something);
}

// calling commands
initialize(intro)
initialize(project1)
initialize(project2)
initialize(project3)
initialize(project4)
