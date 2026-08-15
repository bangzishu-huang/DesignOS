let lastscroll = window.scrollY
let ticking = false
const params = new URLSearchParams(window.location.search)
const projectid = params.get('id')
const container = document.getElementById('projectDetailContent')
const template = document.getElementById(projectid)
const topNav = document.getElementById('topNav')
const projectDetail = document.querySelector('.projectDetail')

// error page if project not found
if (template) {
    container.appendChild(template.content.cloneNode(true))
    
    // autoplay fixes
    container.querySelectorAll('video[autoplay]').forEach(video => {
        video.muted = true;
        video.play().catch(() => {
        });
    });
    container.querySelectorAll('.carousel').forEach(initCarousel)
} else {
    container.innerHTML = '<h2> Project not found</h2><p>This project may still be a placeholder.</p>'
}

// fade up for project detail content
requestAnimationFrame(() => {
    projectDetail.classList.add('visible')
})

// top nav up animations
window.addEventListener('scroll', () => {
    if(!ticking) {
        requestAnimationFrame(() => {
            const currentscroll = window.scrollY;
            if (currentscroll > lastscroll && currentscroll > 80) {
                topNav.classList.add('hidden');
            } else {
                topNav.classList.remove('hidden');
            }
            lastscroll = currentscroll;
            ticking = false;
        })
        ticking = true;
    }
})

// carousel 
function initCarousel(carouselE1) {
    const prevBtn = carouselE1.querySelector('.prev')
    const nextBtn = carouselE1.querySelector('.next')
    const slides = carouselE1.querySelectorAll('.carouselSlide')

    let current = 0
    let autoTimer = null

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'))
        current = (index + slides.length) % slides.length
        slides[current].classList.add('active')
    }

    function startAuto() {
        autoTimer = setInterval(() => showSlide(current + 1), 2000)
    }

    function stopAuto() {
        clearInterval(autoTimer)
    }

    nextBtn.addEventListener('click', () => {
        showSlide(current + 1)
        stopAuto()
        startAuto()
    })

    prevBtn.addEventListener('click', () => {
        showSlide(current - 1)
        stopAuto()
        startAuto()
    })

    carouselE1.addEventListener('mouseenter', stopAuto)
    carouselE1.addEventListener('mouseleave', startAuto)

    startAuto()
}

