document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC REFERENCES
    ====================================================== */

    const body = document.body;

    const loader = document.getElementById("loader");
    const loaderPercent = document.getElementById("loaderPercent");
    const loaderLine = loader
        ? loader.querySelector(".loader-line span")
        : null;

    const hero = document.querySelector(".hero");

    const navbar = document.querySelector(".navbar");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    /* =====================================================
       FOOTER YEAR
    ====================================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       LOADING SCREEN
    ====================================================== */

    let loaderValue = 0;

    const loaderDuration = 1800;

    const loaderStart =
        performance.now();


    function animateLoader(currentTime) {

        const elapsed =
            currentTime - loaderStart;

        const progress =
            Math.min(
                elapsed / loaderDuration,
                1
            );

        /*
         * Smooth loading curve
         */
        const eased =
            1 - Math.pow(1 - progress, 3);

        loaderValue =
            Math.floor(eased * 100);


        if (loaderPercent) {

            loaderPercent.textContent =
                loaderValue;

        }


        if (loaderLine) {

            loaderLine.style.width =
                `${loaderValue}%`;

        }


        if (progress < 1) {

            requestAnimationFrame(
                animateLoader
            );

        } else {

            finishLoader();

        }

    }


    function finishLoader() {

        if (hero) {

            hero.classList.add(
                "is-loaded"
            );

        }


        /*
         * Small delay creates the
         * cinematic transition.
         */

        setTimeout(() => {

            if (loader) {

                loader.classList.add(
                    "loaded"
                );

            }

        }, 250);

    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        if (loaderPercent) {

            loaderPercent.textContent =
                "100";

        }

        if (loaderLine) {

            loaderLine.style.width =
                "100%";

        }

        if (hero) {

            hero.classList.add(
                "is-loaded"
            );

        }

        if (loader) {

            loader.classList.add(
                "loaded"
            );

        }

    } else {

        requestAnimationFrame(
            animateLoader
        );

    }


    /* =====================================================
       CUSTOM CURSOR
    ====================================================== */

    const cursor =
        document.querySelector(".cursor");

    const follower =
        document.querySelector(
            ".cursor-follower"
        );


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        cursor &&
        follower &&
        finePointer
    ) {

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let followerX =
            mouseX;

        let followerY =
            mouseY;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursor.style.left =
                    `${mouseX}px`;

                cursor.style.top =
                    `${mouseY}px`;

            }
        );


        function moveFollower() {

            followerX +=
                (mouseX - followerX) *
                0.12;

            followerY +=
                (mouseY - followerY) *
                0.12;


            follower.style.left =
                `${followerX}px`;

            follower.style.top =
                `${followerY}px`;


            requestAnimationFrame(
                moveFollower
            );

        }


        moveFollower();


        const interactiveElements =
            document.querySelectorAll(
                `
                a,
                button,
                .technology-card,
                .roadmap-card,
                .skill-row,
                .project,
                .certificate-row,
                .experience-tags span
                `
            );


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        body.classList.add(
                            "cursor-active"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        body.classList.remove(
                            "cursor-active"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       NAVBAR SCROLL
    ====================================================== */

    function updateNavbar() {

        if (!navbar) {
            return;
        }


        if (
            window.scrollY > 60
        ) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    if (
        menuToggle &&
        mobileMenu
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    body.classList.toggle(
                        "menu-open"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close menu"
                        : "Open menu"
                );

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll(
                "a"
            );


        mobileLinks.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        body.classList.remove(
                            "menu-open"
                        );


                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        menuToggle.setAttribute(
                            "aria-label",
                            "Open menu"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       ESCAPE CLOSE MOBILE MENU
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            if (
                !body.classList.contains(
                    "menu-open"
                )
            ) {
                return;
            }


            body.classList.remove(
                "menu-open"
            );


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        }
    );


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -70px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =====================================================
       TECHNOLOGY STAGGER
    ====================================================== */

    const technologyCards =
        document.querySelectorAll(
            ".technology-card"
        );


    technologyCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        }
    );


    /* =====================================================
       ROADMAP STAGGER
    ====================================================== */

    const roadmapCards =
        document.querySelectorAll(
            ".roadmap-card"
        );


    roadmapCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        }
    );


    /* =====================================================
       SKILL STAGGER
    ====================================================== */

    const skillRows =
        document.querySelectorAll(
            ".skill-row"
        );


    skillRows.forEach(
        (row, index) => {

            row.style.transitionDelay =
                `${index * 0.07}s`;

        }
    );


    /* =====================================================
       PROJECT STAGGER
    ====================================================== */

    const projects =
        document.querySelectorAll(
            ".project"
        );


    projects.forEach(
        (project, index) => {

            project.style.transitionDelay =
                `${index * 0.12}s`;

        }
    );


    /* =====================================================
       CERTIFICATE STAGGER
    ====================================================== */

    const certificates =
        document.querySelectorAll(
            ".certificate-row"
        );


    certificates.forEach(
        (certificate, index) => {

            certificate.style.transitionDelay =
                `${index * 0.08}s`;

        }
    );


    /* =====================================================
       HERO MOUSE PARALLAX
    ====================================================== */

    const heroTitle =
        document.querySelector(
            ".hero-title"
        );

    const heroPortrait =
        document.querySelector(
            ".hero-portrait"
        );

    const heroGrid =
        document.querySelector(
            ".hero-grid"
        );


    if (
        hero &&
        heroTitle &&
        heroPortrait &&
        heroGrid &&
        finePointer
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;


                heroTitle.style.transform =
                    `
                    translate3d(
                        ${x * -9}px,
                        ${y * -5}px,
                        0
                    )
                    `;


                heroPortrait.style.marginLeft =
                    `${x * 8}px`;


                heroGrid.style.transform =
                    `
                    translate3d(
                        ${x * 14}px,
                        ${y * 9}px,
                        0
                    )
                    `;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroTitle.style.transform =
                    "translate3d(0,0,0)";


                heroPortrait.style.marginLeft =
                    "0px";


                heroGrid.style.transform =
                    "translate3d(0,0,0)";

            }
        );

    }


    /* =====================================================
       PROJECT INTERACTION
    ====================================================== */

    if (finePointer) {

        projects.forEach(
            (project) => {

                const content =
                    project.querySelector(
                        ".project-content"
                    );


                if (!content) {
                    return;
                }


                project.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            project.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width -
                            0.5;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height -
                            0.5;


                        content.style.transform =
                            `
                            translate3d(
                                ${x * 5}px,
                                ${y * 3}px,
                                0
                            )
                            `;

                    }
                );


                project.addEventListener(
                    "mouseleave",
                    () => {

                        content.style.transform =
                            "translate3d(0,0,0)";

                    }
                );

            }
        );

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ====================================================== */

    if (finePointer) {

        const magneticButtons =
            document.querySelectorAll(
                `
                .hero-cta,
                .hero-secondary,
                .project-button,
                .nav-resume,
                .contact-resume
                `
            );


        magneticButtons.forEach(
            (button) => {

                button.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            button.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        button.style.transform =
                            `
                            translate(
                                ${x * 0.07}px,
                                ${y * 0.07}px
                            )
                            `;

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    () => {

                        button.style.transform =
                            "translate(0,0)";

                    }
                );

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (
        navLinks.length &&
        sections.length &&
        "IntersectionObserver"
        in window
    ) {

        const navObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const currentId =
                                entry.target.getAttribute(
                                    "id"
                                );


                            navLinks.forEach(
                                (link) => {

                                    const target =
                                        link.getAttribute(
                                            "href"
                                        );


                                    link.classList.toggle(
                                        "active",
                                        target ===
                                        `#${currentId}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    threshold: 0.30
                }
            );


        sections.forEach(
            (section) => {

                navObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       PROFILE IMAGE LOAD
    ====================================================== */

    const profileImage =
        document.querySelector(
            ".portrait-frame img"
        );


    if (profileImage) {

        if (
            profileImage.complete
        ) {

            profileImage.classList.add(
                "loaded"
            );

        } else {

            profileImage.addEventListener(
                "load",
                () => {

                    profileImage.classList.add(
                        "loaded"
                    );

                },
                {
                    once: true
                }
            );

        }

    }


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    let scrollTicking = false;


    function updateScrollProgress() {

        if (scrollTicking) {
            return;
        }


        scrollTicking = true;


        window.requestAnimationFrame(
            () => {

                const documentHeight =
                    document.documentElement
                        .scrollHeight -
                    window.innerHeight;


                const progress =
                    documentHeight > 0
                        ? window.scrollY /
                          documentHeight
                        : 0;


                document.documentElement.style
                    .setProperty(
                        "--scroll-progress",
                        progress
                    );


                scrollTicking = false;

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );


    updateScrollProgress();


    /* =====================================================
       EXPERIENCE TAG INTERACTION
    ====================================================== */

    const experienceTags =
        document.querySelectorAll(
            ".experience-tags span"
        );


    experienceTags.forEach(
        (tag) => {

            tag.addEventListener(
                "mouseenter",
                () => {

                    tag.style.transform =
                        "translateY(-3px)";

                }
            );


            tag.addEventListener(
                "mouseleave",
                () => {

                    tag.style.transform =
                        "translateY(0)";

                }
            );

        }
    );


    /* =====================================================
       IMAGE TILT
    ====================================================== */

    const portraitFrame =
        document.querySelector(
            ".portrait-frame"
        );


    if (
        portraitFrame &&
        finePointer
    ) {

        portraitFrame.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    portraitFrame
                        .getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;


                portraitFrame.style.transform =
                    `
                    perspective(900px)
                    rotateX(${y * -3}deg)
                    rotateY(${x * 3}deg)
                    translateY(-4px)
                    `;

            }
        );


        portraitFrame.addEventListener(
            "mouseleave",
            () => {

                portraitFrame.style.transform =
                    "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

            }
        );

    }


    /* =====================================================
       RESIZE SAFETY
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 700 &&
                body.classList.contains(
                    "menu-open"
                )
            ) {

                body.classList.remove(
                    "menu-open"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                }

            }

        }
    );


    /* =====================================================
       REDUCED MOTION
    ====================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );


        if (hero) {

            hero.classList.add(
                "is-loaded"
            );

        }

    }

});
/* =========================================================
   HERO 360° PHOTO ROTATION — SCROLL CONTROL
========================================================= */

const hero360Images = [
    "./assets/hero-360/frame-001.jpg",
    "./assets/hero-360/frame-002.jpg",
    "./assets/hero-360/frame-003.jpg",
    "./assets/hero-360/frame-004.jpg",
    "./assets/hero-360/frame-005.jpg"
];

const hero360Image = document.querySelector(".portrait-frame img");
const heroSection = document.querySelector(".hero");

if (hero360Image && heroSection) {

    // Preload all frames
    hero360Images.forEach((src) => {
        const image = new Image();
        image.src = src;
    });

    let activeFrame = 0;

    function rotateHeroPhoto() {

        const sectionTop = heroSection.offsetTop;
        const sectionHeight = heroSection.offsetHeight;
        const viewportHeight = window.innerHeight;

        const scrollDistance =
            sectionHeight - viewportHeight;

        if (scrollDistance <= 0) return;

        const currentScroll =
            window.scrollY - sectionTop;

        const progress =
            Math.max(
                0,
                Math.min(
                    1,
                    currentScroll / scrollDistance
                )
            );

        const newFrame = Math.min(
            hero360Images.length - 1,
            Math.floor(
                progress * hero360Images.length
            )
        );

        if (newFrame !== activeFrame) {

            activeFrame = newFrame;

            hero360Image.src =
                hero360Images[activeFrame];
        }
    }

    window.addEventListener(
        "scroll",
        rotateHeroPhoto,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        rotateHeroPhoto
    );

    rotateHeroPhoto();
}