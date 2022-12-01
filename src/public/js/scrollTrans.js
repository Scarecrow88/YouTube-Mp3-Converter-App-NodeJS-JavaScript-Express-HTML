window.addEventListener ('scroll', function () {
    let header = document.querySelector ('.navheader');
    header.classList.toggle ('down', window.scrollY > 25);
});