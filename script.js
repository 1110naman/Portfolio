/* =====================================================
   YEAR
===================================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();



/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 15px 50px rgba(0,0,0,.3)";

    } else {

        navbar.style.boxShadow =
            "none";

    }

});



/* =====================================================
   NUMBER COUNTER
===================================================== */

const metrics =
    document.querySelectorAll(
        ".metric strong"
    );


const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                const element =
                    entry.target;

                const target =
                    Number(
                        element.dataset.target
                    );


                let current = 0;

                const duration = 1300;

                const start =
                    performance.now();


                function animate(time) {

                    const progress =
                        Math.min(
                            (time - start) /
                            duration,
                            1
                        );


                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    current =
                        Math.floor(
                            eased * target
                        );


                    element.textContent =
                        current.toLocaleString();


                    if (progress < 1) {

                        requestAnimationFrame(
                            animate
                        );

                    }

                }


                requestAnimationFrame(
                    animate
                );


                observer.unobserve(element);

            });

        },
        {
            threshold: .6
        }
    );


metrics.forEach(metric => {

    counterObserver.observe(metric);

});



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".career-card, .work-card, .player, .trophy-list article, .education-card"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) return;


                entry.target.style.opacity =
                    "1";


                entry.target.style.transform =
                    "translateY(0)";


                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                navLinks.forEach(link => {

                    link.style.color =
                        "";

                });


                const active =
                    document.querySelector(
                        `.navbar nav a[href="#${entry.target.id}"]`
                    );


                if (active) {

                    active.style.color =
                        "var(--green)";

                }

            });

        },
        {
            threshold: .35
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});
