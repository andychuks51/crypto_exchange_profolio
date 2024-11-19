document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".header__menu-toggle");
    const navMenu = document.querySelector(".header__menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".header__menu-item").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active"); 
        navMenu.classList.remove("active");
    }))

});