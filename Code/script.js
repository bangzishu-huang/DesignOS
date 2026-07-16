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


// intro screen
function showintro() {
    intro.style.top = "50%"
    intro.style.left = "50%"
    intro.style.display = "flex";
    requestAnimationFrame(() => {
      intro.classList.add("open");
    })
}

function hideintro() {
  intro.classList.remove("open");
  intro.addEventListener("transitionend", () => {
    intro.style.display = "none";
  }, { once: true });
}

openintrobtn.addEventListener("click", showintro)
closeintrobtn.addEventListener("click", hideintro)


// icon windows
function showicon1() {
    project1.style.top = "50%";
    project1.style.left = "50%";
    project1.style.display = "flex";
    requestAnimationFrame(() => {
      project1.classList.add("open");
    })
}
openicon1.addEventListener("click", showicon1)

function showicon2() {
    project2.style.top = "50%";
    project2.style.left = "50%";
    project2.style.display = "flex";
    requestAnimationFrame(() => {
      project2.classList.add("open");
    })
}
openicon2.addEventListener("click", showicon2)

function showicon3() {
    project3.style.top = "50%";
    project3.style.left = "50%";
    project3.style.display = "flex";
    requestAnimationFrame(() => {
      project3.classList.add("open");
    })
}
openicon3.addEventListener("click", showicon3)

function showicon4() {
    resume.style.top = "50%";
    resume.style.left = "50%";
    resume.style.display = "flex";
    requestAnimationFrame(() => {
      resume.classList.add("open");
    })
}
openicon4.addEventListener("click", showicon4)

function showicon5() {
    notes.style.top = "50%";
    notes.style.left = "50%";
    notes.style.display = "flex";
    requestAnimationFrame(() => {
      notes.classList.add("open");
    })
}
openicon5.addEventListener("click", showicon5)


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
const projectData = {

  // ui projects
 "ui-1": {
    title: "UI/XI Project 1",
    desc: "<p>Project 1 stuff over here</p>"
  }, 

 "ui-2": {
    title: "UI/XI Project 2",
    desc: "<p>Project 2 stuff over here</p>"
  },

 "ui-3": {
    title: "UI/XI Project 3",
    desc: "<p>Project 3 stuff over here</p>"
  },

  // hardware projects
 "hardware-1": {
    title: "Hardware Project 1",
    desc: "<p>Project 1 stuff over here</p>"
  }, 

 "hardware-2": {
    title: "Hardware Project 2",
    desc: "<p>Project 2 stuff over here</p>"
  },

 "hardware-3": {
    title: "Hardware Project 3",
    desc: "<p>Project 3 stuff over here</p>"
  },


  // software projects
 "software-1": {
    title: "Software Project 1",
    desc: "<p>Project 1 stuff over here</p>"
  }, 

 "software-2": {
    title: "Software Project 2",
    desc: "<p>Project 2 stuff over here</p>"
  },

 "software-3": {
    title: "Software Project 3",
    desc: "<p>Project 3 stuff over here</p>"
  },

}


document.querySelectorAll('.projectWindow').forEach(win => {
  const sidebarItems = win.querySelectorAll('.sidebarItem');
  const content = win.querySelector('.projectContent');
  const firstProject = win.querySelector('.sidebarItem.active') || sidebarItems[0];

  // loading first content
  if (firstProject) {
    const data = projectData[firstProject.dataset.key];
    if (data) {
      content.innerHTML = `<h2>${data.title}</h2>${data.desc}`;
    }
  }

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const data = projectData[item.dataset.key];
      if (data) {
        content.innerHTML = `<h2>${data.title}</h2>${data.desc}`;
      }
    })
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
initialize(resume)
initialize(notes)