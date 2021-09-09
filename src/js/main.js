const burgerBtn = document.querySelector('.hamburger');
const burgerMenu = document.querySelector('.navi__mobile');
const mobileNav = document.querySelector('.navi');
const logo = document.querySelector('.navi__logo');
const allNavLinks = document.querySelectorAll('.navi__mobile li');
const footerYear = document.querySelector('.footer__year');
const menuItems = document.querySelectorAll('.scrollSpyNav')
const scrollSpySections = document.querySelectorAll('section')
const firstSection = document.querySelector('.scrollSpyHome');


const handleScrollSpy = () => {
    if (document.body.classList.contains('main-page')) {
        const sections = [];

        scrollSpySections.forEach(section => {
            // console.log(window.scrollY)
            //wartość scrolla
            // console.log(section.offsetTop)
            //odelglosc danej sekcji od gornej krawedzi przegladrki
            // console.log(section.offsetHeight)
            //wysokosc kazdej z sekcji

            if (window.scrollY <= section.offsetTop + section.offsetHeight + 100) {
                sections.push(section);
                const activeSection = document.querySelector(`[href*="${sections[0].id}"]`)

                menuItems.forEach(item => item.classList.remove('active'))
                firstSection.classList.remove('active')
                activeSection.classList.add('active')
            }


            if (window.innerHeight + window.scrollY >= document.body.offsetHeight + 100) {
                const firstSection = document.querySelector('a:first-of-type')

                menuItems.forEach(item => item.classList.remove('active'))

                firstSection.classList.add('active')
            }

            if (window.scrollY == 0) {
                firstSection.classList.add('active')
                menuItems.forEach(item => item.classList.remove('active'))
            }


        })
    }
};


function removeBackgroundNavMobile() {
    if (window.scrollY >= 320) {
        mobileNav.style.background = 'transparent';
        logo.style.opacity = '0';
    } else {
        mobileNav.style.background = 'white';
        logo.style.opacity = '1';
    }
}


const handleNav = () => {
    burgerMenu.classList.toggle('active');
    // preventscroll 
    allNavLinks.forEach(el => {
        el.addEventListener('click', () => {

            burgerMenu.classList.remove('active');
        })
    })
}

const handleCurrentYear = () => {
    const year = (new Date).getFullYear();
    footerYear.innerText = year;
}
handleCurrentYear();


burgerBtn.addEventListener('click', handleNav);
window.addEventListener('scroll', removeBackgroundNavMobile);
window.addEventListener('scroll', handleScrollSpy);
