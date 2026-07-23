// setting up
let lastscroll = window.scrollY
let lastarrowscroll = window.scrollY
const topNav = document.getElementById('topNav')
const servos = document.getElementById('servos')
const designBuild = document.getElementById('designBuild')
const heroEnd = document.getElementById('heroEnd')
const fading = document.querySelectorAll('.fadeUp')
const navTabs = document.querySelectorAll('.navTab')
const tabSections = document.querySelectorAll('.tabSection')
const heroCTA = document.querySelector('.heroCTA')
const heroArrow = document.querySelector('.heroArrow')

// matching top bar tabs
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        navTabs.forEach(t => t.classList.remove('active'));
        tabSections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
        window.scrollTo({top: 0, behavior: 'instant'})
    })
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