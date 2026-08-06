const params = new URLSearchParams(window.location.search)
const projectid = params.get('id')
const container = document.getElementById('projectDetailContent')
const template = document.getElementById(projectid)
const projectDetail = document.querySelector('.projectDetail')


if (template) {
    container.appendChild(template.content.cloneNode(true))
} else {
    container.innerHTML = '<h2> Project not found</h2><p>This project may still be a placeholder.</p>'
}

requestAnimationFrame(() => {
    projectDetail.classList.add('visible')
})