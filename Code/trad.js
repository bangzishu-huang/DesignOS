// setting up
const navTabs = document.querySelectorAll('.navTab')
const tabSections = document.querySelectorAll('.tabSection')

navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        navTabs.forEach(t => t.classList.remove('active'));
        tabSections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList('active');
        window.scrollTo({top: 0, behavior: 'instant'})
    })
})