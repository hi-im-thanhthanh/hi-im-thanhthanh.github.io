const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    var href = jQuery(event.target).attr('href') || jQuery(event.target).closest('a').attr('href')
    window.history.pushState({}, "", href);
    handleLocation();
};

const routes = {
    404: "/404.html",
    "/privacy-policy/": "/404.html",
    "/terms-of-service/": "/terms-of-service.html",
    "/cookies-policy/": "/cookies-policy.html",
    "/capcut-materials-license-agreement/": "/capcut-materials-license-agreement.html",
    "/": "/index.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    if (route === "/index.html") {
        document.getElementById("content-home").style.display = "block";
        document.getElementById("content-other-page").style.display = "none";
        document.querySelector("body").classList.add("ast-page-builder-template")
    } else {
        const html = await fetch(route).then((data) => data.text());
        document.getElementById("content-home").style.display = "none";
        document.getElementById("content-other-page").innerHTML = html;
        document.getElementById("content-other-page").style.display = "block";
        document.querySelector("body").classList.remove("ast-page-builder-template");
    }
    jQuery('html, body').animate({scrollTop:0},'500');
};

window.onpopstate = handleLocation;
window.route = route;
