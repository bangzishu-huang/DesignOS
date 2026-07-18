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


// grabbing ids and setup
const timenow = document.getElementById("timenow")
const intro = document.getElementById("intro")
const project1header = document.getElementById("project1header")
const project2header = document.getElementById("project2header")
const project3header = document.getElementById("project3header")
const resumeheader = document.getElementById("resumeheader")
const notesheader = document.getElementById("notesheader")

const project1 = document.getElementById("project1")
const project2 = document.getElementById("project2")
const project3 = document.getElementById("project3")
const resume = document.getElementById("resume")
const notes = document.getElementById("notes")

const openintrobtn = document.querySelector("#openintro")
const closeintrobtn = document.querySelector("#closeintro")
const openicon1 = document.querySelector("#icon1")
const openicon2 = document.querySelector("#icon2")
const openicon3 = document.querySelector("#icon3")
const openicon4 = document.querySelector("#icon4")
const openicon5 = document.querySelector("#icon5")


// setting display time
function updateTime() {
    timenow.innerHTML = new Date().toLocaleTimeString();
}

updateTime();
setInterval(updateTime, 1000);


// simple opening windows
function openWindow(open) {
  open.style.top = "50%"
  open.style.left = "50%"
  open.style.display = "flex";
  handletap(open);
  requestAnimationFrame(() => {
    open.classList.add("open");
  })
}


// intro screen
function hideintro() {
  intro.classList.remove("open");
  intro.addEventListener("transitionend", () => {
    intro.style.display = "none";
  }, { once: true });
}

openintrobtn.addEventListener("click", () => openWindow(intro))
closeintrobtn.addEventListener("click", hideintro)


// icon windows
openicon1.addEventListener("click", () => openWindow(project1))
openicon2.addEventListener("click", () => openWindow(project2))
openicon3.addEventListener("click", () => openWindow(project3))
openicon4.addEventListener("click", () => openWindow(resume))
openicon5.addEventListener("click", () => openWindow(notes))

document.querySelectorAll('.closeButton').forEach(btn => {
    btn.addEventListener('click', () => {
      const win = btn.closest('.projectWindow');
      win.classList.remove('open');
      win.addEventListener('transitionend'), () => {
        win.style.display = 'none'
      }, {once: true};
    })
})

document.querySelectorAll('.closeButton').forEach(btn => {
    btn.addEventListener('click', () => {
      const wnn = btn.closest('.notesWindow');
      wnn.classList.remove('open');
      wnn.addEventListener('transitionend'), () => {
        wnn.style.display = 'none'
      }, {once: true};
    })
})


// project sidebar functions
document.querySelectorAll('.projectWindow').forEach(win => {
  const sidebarItems = win.querySelectorAll('.sidebarItem');
  const content = win.querySelector('.projectContent');
  const firstItem = win.querySelector('.sidebarItem.active') || sidebarItems[0];

  // loading project stuff 
  function loadProject(item) {
    const template = document.getElementById(item.dataset.key);
    if (template) {
      content.innerHTML = '';
      content.appendChild(template.content.cloneNode(true));
    }
  }

  // loading first content
  if (firstItem) loadProject(firstItem);

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      loadProject(item)
    })
  })
})


// not hardcoding email due to bot concerns
document.getElementById("email").href = "mailto:" + "bangzishu" + "@" + "gmail.com"

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
initialize(resume)
initialize(notes)