/* ============================================================
   Sivaponnuvel S — Portfolio Scripts
============================================================ */

(function () {

    "use strict";


    /* =========================================================
       REDUCED MOTION
    ========================================================= */

    var prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =========================================================
       FOOTER YEAR
    ========================================================= */

    var yearEl =
        document.getElementById("year");

    if (yearEl) {

        yearEl.textContent =
            new Date().getFullYear();

    }


    /* =========================================================
       ANIMATED PARTICLES
    ========================================================= */

    var particlesContainer =
        document.getElementById("particles");


    if (
        particlesContainer &&
        !prefersReducedMotion
    ) {

        var particleCount = 35;


        for (
            var i = 0;
            i < particleCount;
            i++
        ) {

            var particle =
                document.createElement("span");


            particle.classList.add(
                "particle"
            );


            particle.style.left =
                Math.random() * 100 + "%";


            particle.style.animationDuration =
                (8 + Math.random() * 15) + "s";


            particle.style.animationDelay =
                (-Math.random() * 15) + "s";


            particle.style.opacity =
                0.15 +
                Math.random() * 0.35;


            var size =
                2 +
                Math.random() * 3;


            particle.style.width =
                size + "px";


            particle.style.height =
                size + "px";


            particlesContainer.appendChild(
                particle
            );

        }

    }


    /* =========================================================
       NAVBAR
    ========================================================= */

    var navbar =
        document.getElementById("navbar");


    var backToTop =
        document.getElementById(
            "back-to-top"
        );


    var sections =
        document.querySelectorAll(
            "section[id]"
        );


    var navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function highlightNav() {

        var position =
            window.scrollY ||
            window.pageYOffset;


        var current = "";


        sections.forEach(
            function (section) {

                var sectionTop =
                    section.offsetTop;


                if (
                    position >=
                    sectionTop - 180
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.toggle(
                    "active",

                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                );

            }
        );

    }


    function onScroll() {

        var scrollY =
            window.scrollY ||
            window.pageYOffset;


        if (navbar) {

            navbar.classList.toggle(
                "scrolled",
                scrollY > 25
            );

        }


        if (backToTop) {

            backToTop.classList.toggle(
                "show",
                scrollY > 450
            );

        }


        highlightNav();

    }


    window.addEventListener(
        "scroll",
        onScroll,
        {
            passive: true
        }
    );


    onScroll();


    /* =========================================================
       BACK TO TOP
    ========================================================= */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    }


    /* =========================================================
       MOBILE MENU
    ========================================================= */

    var hamburger =
        document.getElementById(
            "hamburger"
        );


    var navMenu =
        document.getElementById(
            "nav-menu"
        );


    function closeMenu() {

        if (navMenu) {

            navMenu.classList.remove(
                "open"
            );

        }


        if (hamburger) {

            hamburger.classList.remove(
                "active"
            );

        }

    }


    if (hamburger && navMenu) {

        hamburger.addEventListener(
            "click",
            function () {

                navMenu.classList.toggle(
                    "open"
                );


                hamburger.classList.toggle(
                    "active"
                );

            }
        );


        navMenu
            .querySelectorAll("a")
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        closeMenu
                    );

                }
            );

    }


    /* Close menu outside */

    document.addEventListener(
        "click",
        function (event) {

            if (

                navMenu &&

                navMenu.classList.contains(
                    "open"
                ) &&

                !navMenu.contains(
                    event.target
                ) &&

                !hamburger.contains(
                    event.target
                )

            ) {

                closeMenu();

            }

        }
    );


    /* =========================================================
       SCROLL REVEAL
    ========================================================= */

    var revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (prefersReducedMotion) {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }

    else if (
        "IntersectionObserver" in window
    ) {

        var revealObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    }

    else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =========================================================
       SKILL BARS
    ========================================================= */

    var skillBars =
        document.querySelectorAll(
            ".skill-fill"
        );


    if (
        "IntersectionObserver" in window
    ) {

        var barObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                var target =
                                    parseInt(

                                        entry.target.getAttribute(
                                            "data-progress"
                                        ),

                                        10

                                    ) || 0;


                                entry.target.style.width =
                                    target + "%";


                                barObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.35
                }

            );


        skillBars.forEach(
            function (bar) {

                barObserver.observe(
                    bar
                );

            }
        );

    }

    else {

        skillBars.forEach(
            function (bar) {

                bar.style.width =

                    (

                        parseInt(

                            bar.getAttribute(
                                "data-progress"
                            ),

                            10

                        ) || 0

                    ) + "%";

            }
        );

    }


    /* =========================================================
       HERO TYPEWRITER
    ========================================================= */

    var typedElement =
        document.getElementById(
            "typed"
        );


    if (typedElement) {

        var roles = [

            "Python Full Stack Developer",

            "Python Backend Developer",

            "Software Developer"

        ];


        var roleIndex = 0;

        var charIndex = 0;

        var deleting = false;


        function typeRole() {

            var currentRole =
                roles[roleIndex];


            typedElement.textContent =
                currentRole.slice(
                    0,
                    charIndex
                );


            /* Typing */

            if (

                !deleting &&

                charIndex <
                currentRole.length

            ) {

                charIndex++;


                setTimeout(
                    typeRole,
                    70
                );

            }


            /* Wait */

            else if (!deleting) {

                deleting = true;


                setTimeout(
                    typeRole,
                    1500
                );

            }


            /* Deleting */

            else if (

                deleting &&

                charIndex > 0

            ) {

                charIndex--;


                setTimeout(
                    typeRole,
                    40
                );

            }


            /* Next role */

            else {

                deleting = false;

                roleIndex =
                    (
                        roleIndex + 1
                    ) %
                    roles.length;


                setTimeout(
                    typeRole,
                    300
                );

            }

        }


        if (prefersReducedMotion) {

            typedElement.textContent =
                roles[0];

        }

        else {

            typeRole();

        }

    }


    /* =========================================================
       SKILL FILTER
    ========================================================= */

    var filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    var skillCards =
        document.querySelectorAll(
            ".skills-card"
        );


    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    var filter =
                        button.getAttribute(
                            "data-filter"
                        );


                    /* Active button */

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    /* Filter cards */

                    skillCards.forEach(
                        function (card) {

                            var category =
                                card.getAttribute(
                                    "data-category"
                                );


                            var shouldHide =

                                filter !== "all" &&

                                category !== filter;


                            card.classList.toggle(
                                "hidden",
                                shouldHide
                            );

                        }
                    );

                }
            );

        }
    );


    /* =========================================================
       CONTACT FORM
    ========================================================= */

    var form =
        document.getElementById(
            "contact-form"
        );


    var statusElement =
        document.getElementById(
            "form-status"
        );


    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                var name =
                    form.name.value.trim();


                var email =
                    form.email.value.trim();


                var message =
                    form.message.value.trim();


                /* Required */

                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    showStatus(

                        "Please fill in all required fields.",

                        "error"

                    );

                    return;

                }


                /* Email */

                if (

                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        .test(email)

                ) {

                    showStatus(

                        "Please enter a valid email address.",

                        "error"

                    );

                    return;

                }


                var subject =
                    form.subject.value.trim() ||

                    "Portfolio contact message";


                var body =

                    "Hi Sivaponnuvel,%0D%0A%0D%0A" +

                    "Message from: " +

                    encodeURIComponent(
                        name
                    ) +

                    "%0D%0AEmail: " +

                    encodeURIComponent(
                        email
                    ) +

                    "%0D%0A%0D%0A" +

                    encodeURIComponent(
                        message
                    );


                /* Open email */

                window.location.href =

                    "mailto:sivaponnuvel7@gmail.com" +

                    "?subject=" +

                    encodeURIComponent(
                        subject
                    ) +

                    "&body=" +

                    body;


                showStatus(

                    "Opening your email app… Thanks for reaching out!",

                    "success"

                );


                form.reset();

            }
        );

    }


    /* =========================================================
       STATUS MESSAGE
    ========================================================= */

    function showStatus(
        text,
        type
    ) {

        if (!statusElement) {
            return;
        }


        statusElement.textContent =
            text;


        statusElement.className =
            "form-status " +
            type;


        setTimeout(
            function () {

                statusElement.textContent =
                    "";

                statusElement.className =
                    "form-status";

            },

            6000

        );

    }


    /* =========================================================
       MOUSE PARALLAX BACKGROUND
    ========================================================= */

    if (
        !prefersReducedMotion &&
        window.innerWidth > 768
    ) {

        var orb1 =
            document.querySelector(
                ".orb-1"
            );


        var orb2 =
            document.querySelector(
                ".orb-2"
            );


        document.addEventListener(
            "mousemove",
            function (event) {

                var x =
                    (event.clientX /
                        window.innerWidth -
                        0.5);


                var y =
                    (event.clientY /
                        window.innerHeight -
                        0.5);


                if (orb1) {

                    orb1.style.transform =
                        "translate(" +
                        x * 35 +
                        "px, " +
                        y * 35 +
                        "px)";

                }


                if (orb2) {

                    orb2.style.transform =
                        "translate(" +
                        x * -25 +
                        "px, " +
                        y * -25 +
                        "px)";

                }

            }
        );

    }


})();