// setting up
let lastscroll = window.scrollY
let lastarrowscroll = window.scrollY

const topNav = document.getElementById('topNav')
const servos = document.getElementById('servos')
const designBuild = document.getElementById('designBuild')
const heroEnd = document.getElementById('heroEnd')
const projectsSection = document.getElementById('projects')
const row2 = document.getElementById('row2')

const fading = document.querySelectorAll('.fadeUp')
const navTabs = document.querySelectorAll('.navTab:not(.exit)')
const tabSections = document.querySelectorAll('.tabSection')
const fadeRow1Stuff = document.querySelectorAll('.fadeRow1')
const fadeRow2Stuff = document.querySelectorAll('.fadeRow2')
const topItem = document.querySelectorAll('.fadeTop')
const bottomItem = document.querySelectorAll('.fadeBottom')
const skillTaggg = document.querySelectorAll('.skillTag')

const navName = document.querySelector('.navName')
const heroCTA = document.querySelector('.heroCTA')
const heroArrow = document.querySelector('.heroArrow')
const heroIntro = document.querySelector('.heroIntro')

// matching top bar tabs
navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        if (window.location.pathname.includes('trad.html') || window.location.pathname.endsWith('/')) {
            e.preventDefault()
        
            navTabs.forEach(t => t.classList.remove('active'));
            tabSections.forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');

            if (tab.dataset.tab === 'about') {
                history.replaceState(null, null, '#about');
                heroIntro.style.display = 'none'
                initAboutFade()
                window.scrollTo({top: 0, behavior: 'smooth'})
            } else {
                history.replaceState(null, null, window.location.pathname);
                heroIntro.style.display = 'flex'
                requestAnimationFrame(() => {
                    window.scrollTo({top: projectsSection.offsetTop, behavior: 'smooth'})
                })
            }
        }
    })
})

// for the name in top bar
navName.addEventListener('click', () => {
    if (window.location.pathname.includes('trad.html') || window.location.pathname.endsWith('/')) {
        navTabs.forEach(t => t.classList.remove('active'));
        tabSections.forEach(s => s.classList.remove('active'));
        document.querySelector('[data-tab="projects"]').classList.add('active');
        document.getElementById('projects').classList.add('active');
        heroIntro.style.display = 'flex'
        history.replaceState(null, null, window.location.pathname);
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
})

// top bar animation
let ticking = false
window.addEventListener('scroll', () => {
    if(!ticking) {
        requestAnimationFrame(() => {
            const currentscroll = window.scrollY;
            if(currentscroll > lastscroll && currentscroll > 80) {
                topNav.classList.add('hidden');
            } else {
                topNav.classList.remove('hidden');
            }

            if (currentscroll > window.innerHeight * 0.8) {
                topNav.classList.add('scrolled');
            } else {
                topNav.classList.remove('scrolled');
            }
            lastscroll = currentscroll;
            ticking = false;
        })
        ticking = true;
    }
})

// fade up for hero content
const observed = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    })
}, {
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px'
})
fading.forEach(el => observed.observe(el))

// designBuild fading independently
const designBuildObserved = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            designBuild.classList.add('visible')
        } else if (entry.boundingClientRect.top > window.innerHeight / 2) {
            designBuild.classList.remove('visible')
            servos.classList.remove('visible')
        }
    })
}, {
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px'
})
designBuildObserved.observe(designBuild)

// servos fading independently + fade out together with design build
const servosObserved = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            servos.classList.add('visible')
        } else if (entry.boundingClientRect.top < window.innerHeight / 2) {
            servos.classList.remove('visible')
            designBuild.classList.remove('visible')
        }
    })
}, {
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px'
})
servosObserved.observe(servos)

// CTA fading away after a point
function checkArrowFade() {
    const rect = heroEnd.getBoundingClientRect()
    const currentscroll = window.scrollY
    const scrollingDown = currentscroll > lastarrowscroll

    if (scrollingDown) {
        if (rect.top < window.innerHeight / 2) {
            heroArrow.classList.add('fade')
        }
    } else {
        if (rect.top > 60) {
            heroArrow.classList.remove('fade')
        }
    }
    lastarrowscroll = currentscroll
}
window.addEventListener('scroll', checkArrowFade)

// expansion of CTA after scroll past
function checkArrowLocked() {
    const rect = heroEnd.getBoundingClientRect()
    const trigger = window.innerHeight - 20

    if (rect.top <= trigger) {
        heroArrow.classList.add('locked')
        heroCTA.classList.add('expanded')
    } else {
        heroArrow.classList.remove('locked')
        heroCTA.classList.remove('expanded')
    }
}

window.addEventListener('scroll', checkArrowLocked)
checkArrowLocked()

// about page
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#about') {
        navTabs.forEach(t => t.classList.remove('active'))
        tabSections.forEach(s => s.classList.remove('active'))
        document.querySelector('.navTab[data-tab="about"]').classList.add('active')
        document.getElementById('about').classList.add("active")
        heroIntro.style.display = 'none'
        initAboutFade()
    } else if (window.location.hash === '#projects') {
        setTimeout(() => {
            window.scrollTo({top: projectsSection.offsetTop, behavior: 'smooth'})
        }, 200);
    }
})

// fading on project row 1
const row1Observed = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            fadeRow1Stuff.forEach(el => el.classList.add('visible'))
        } else {
            fadeRow1Stuff.forEach(el => el.classList.remove('visible'))
        }
    })
}, {
    threshold: 0.15
})

row1Observed.observe(projectsSection)

// fading on project row 2
const row2Observed = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            fadeRow2Stuff.forEach(el => el.classList.add('visible'))
        } else {
            fadeRow2Stuff.forEach(el => el.classList.remove('visible'))
        }
    })
}, {
    threshold: 0.15
})

row2Observed.observe(row2)

// disabling native scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}

// saving scroll section
window.addEventListener('beforeunload', () => {
    const projectsTop = projectsSection.offsetTop;
    const reachedProjects = window.scrollY + window.innerHeight * 0.7 >= projectsTop;
    sessionStorage.setItem('returnToProjects', reachedProjects)
})

// clearing session storage on exit click
document.querySelector('.exit').addEventListener('click', () => {
    sessionStorage.removeItem('returnToProjects')
})

// animating scroll down on reload
window.addEventListener('load', () => {
    if (sessionStorage.getItem('returnToProjects') === 'true') {
        window.scrollTo(0, 0);
        setTimeout(() => {
            window.scrollTo({
                top: projectsSection.offsetTop,
                behavior: "smooth"
            })
        }, 200);
    }
})

// fade for About Section
function initAboutFade() {
    topItem.forEach(el => el.classList.remove('visible'))
    bottomItem.forEach(el => el.classList.remove('visible'))
    skillTaggg.forEach(el => el.classList.remove('visible'))

    setTimeout(() => {
        topItem.forEach(el => el.classList.add('visible'))
    }, 100);

    setTimeout(() => {
        bottomItem.forEach(el => el.classList.add('visible'))
        skillTaggg.forEach(el => el.classList.add('visible'))
    }, 500);
}

// mail icon
document.getElementById("email").href = "mailto:" + "bangzishu" + "@" + "gmail.com"

// crossing project section animation
const heroEndObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.body.classList.add('inHero')
        } else {
            document.body.classList.remove('inHero')
        }
    })
}, {
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px'
})
heroEndObserver.observe(heroIntro)