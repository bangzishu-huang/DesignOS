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

// video mutes for autoplay
document.querySelectorAll('video[autoplay]').forEach(video => {
    video.muted = true;
    video.play().catch(() => {

    })
});