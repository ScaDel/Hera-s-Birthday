/* ==========================
   ELEMENTS
========================== */

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

const countdownScene = document.getElementById("countdownScene");
const transitionScene = document.getElementById("transitionScene");
const birthdayScene = document.getElementById("birthdayScene");

const spark = document.getElementById("spark");
const music = document.getElementById("music");
const photo = document.getElementById("birthdayPhoto");
const birthdayTitle = document.getElementById("birthdayTitle");

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const poemOverlay = document.getElementById("poemOverlay");
const poemParts = document.querySelectorAll(".poem-part");


/* ==========================
   STATE
========================== */

let timer = null;

let birthdayLaunched = false;

let experienceStarted = false;

let soundUnlocked = false;


/* ==========================
   TARGET DATE
========================== */

const birthday =
    new Date("October 6, 2026 09:30:00").getTime();


/* ==========================
   SOUND UNLOCK
========================== */

function unlockSound() {

    if (soundUnlocked) return;

    music.volume = 0;

    music.loop = true;

    /*
       The user has directly interacted
       with the Begin button.

       Playing audio here gives the browser
       permission to allow later playback.
    */

    music.play()
        .then(() => {

            soundUnlocked = true;

            music.pause();

            music.currentTime = 0;

        })
        .catch(error => {

            console.log(
                "Sound unlock failed:",
                error
            );

        });

}


/* ==========================
   START EXPERIENCE
========================== */

function startExperience() {

    if (experienceStarted) return;

    experienceStarted = true;


    /*
       IMPORTANT:
       This happens directly inside
       the user's button click.

       Therefore the browser treats it
       as a legitimate audio interaction.
    */

    unlockSound();


    /*
       Fade out opening screen
    */

    startScreen.classList.add("hide");


    /*
       Start countdown AFTER the
       opening interaction.
    */

    updateCountdown();

    timer = setInterval(
        updateCountdown,
        1000
    );

}


/* ==========================
   START BUTTON
========================== */

startButton.addEventListener(
    "click",
    startExperience
);


/* ==========================
   DEVELOPER MODE
   Press "B" to launch
========================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase() === "b"
        ) {

            /*
               Unlock audio from the
               keyboard interaction.
            */

            unlockSound();

            clearInterval(timer);

            startScreen.classList.add("hide");

            launchBirthday();

        }

    }
);


/* ==========================
   COUNTDOWN
========================== */

function updateCountdown() {

    const now = Date.now();

    const distance =
        birthday - now;


    /* ==========================
       BIRTHDAY REACHED
    ========================== */

    if (distance <= 0) {

        clearInterval(timer);

        launchBirthday();

        return;

    }


    /* ==========================
       CALCULATE TIME
    ========================== */

    const d =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const h =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            )
            /
            (1000 * 60 * 60)
        );


    const m =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            )
            /
            (1000 * 60)
        );


    const s =
        Math.floor(
            (
                distance %
                (1000 * 60)
            )
            /
            1000
        );


    /* ==========================
       DISPLAY
    ========================== */

    days.textContent =
        String(d).padStart(2, "0");

    hours.textContent =
        String(h).padStart(2, "0");

    minutes.textContent =
        String(m).padStart(2, "0");

    seconds.textContent =
        String(s).padStart(2, "0");

}


/* ==========================
   LAUNCH BIRTHDAY
========================== */

function launchBirthday() {

    /*
       Prevent multiple launches
    */

    if (birthdayLaunched) return;

    birthdayLaunched = true;


    /* ==========================
       FADE OUT COUNTDOWN
    ========================== */

    countdownScene.style.opacity = "0";


    /* ==========================
       BLACK TRANSITION
    ========================== */

    setTimeout(() => {

        countdownScene.style.display =
            "none";

        transitionScene.style.opacity =
            "1";


        /* ==========================
           GOLDEN SPARK
        ========================== */

        setTimeout(() => {

            spark.style.animation =
                "sparkBurst .9s ease-out forwards";


            /* ==========================
               SHOW BIRTHDAY
            ========================== */

            setTimeout(() => {

                transitionScene.style.opacity =
                    "0";

                birthdayScene.style.opacity =
                    "1";


                /* ==========================
                   CONFETTI
                ========================== */

                startConfetti();


                /* ==========================
                   MUSIC
                ========================== */

                music.volume = 0;

                music.loop = true;

                music.play()
                    .then(() => {

                        fadeMusic();

                    })
                    .catch(error => {

                        console.log(
                            "Music playback blocked:",
                            error
                        );

                    });


                /* ==========================
                   FLOATING 20s
                ========================== */

                createTwenties();


                /* ==========================
                   PHOTO
                ========================== */

                photo.style.animation =
                    "revealPhoto 2.5s ease forwards";


                /* ==========================
                   TITLE
                ========================== */

                setTimeout(() => {

                    birthdayTitle.style.animation =
                        "revealTitle 1.5s ease forwards";

                }, 800);


            }, 900);

        }, 500);

    }, 1500);


    /* ==========================
       POEM
    ========================== */

    setTimeout(() => {

        revealPoem();


        document
            .querySelectorAll(".number20")
            .forEach(num => {

                num.style.opacity = ".05";

            });

    }, 10000);

}


/* ==========================
   CREATE STARS
========================== */

const stars =
    document.getElementById("stars");

for (let i = 0; i < 120; i++) {

    const star =
        document.createElement("div");

    star.classList.add("star");

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    star.style.animationDelay =
        Math.random() * 4 + "s";

    stars.appendChild(star);

}


/* ==========================
   CREATE PARTICLES
========================== */

const particles =
    document.getElementById("particles");

for (let i = 0; i < 35; i++) {

    const particle =
        document.createElement("div");

    particle.classList.add("particle");

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (8 + Math.random() * 8) + "s";

    particle.style.animationDelay =
        Math.random() * 8 + "s";

    particles.appendChild(particle);

}


/* ==========================
   CONFETTI
========================== */

function startConfetti() {

    const duration = 6000;

    const end =
        Date.now() + duration;


    (function frame() {

        confetti({

            particleCount: 4,

            angle: 60,

            spread: 70,

            origin: {
                x: 0
            },

            colors: [
                "#FFD700",
                "#5E2A84",
                "#FFFFFF"
            ]

        });


        confetti({

            particleCount: 4,

            angle: 120,

            spread: 70,

            origin: {
                x: 1
            },

            colors: [
                "#FFD700",
                "#5E2A84",
                "#FFFFFF"
            ]

        });


        if (Date.now() < end) {

            requestAnimationFrame(frame);

        }

    })();

}


/* ==========================
   FADE MUSIC
========================== */

function fadeMusic() {

    let volume = 0;


    const fade =
        setInterval(() => {

            volume += 0.02;

            music.volume =
                Math.min(volume, 1);


            if (volume >= 1) {

                clearInterval(fade);

            }

        }, 120);

}


/* ==========================
   CREATE FLOATING 20s
========================== */

function createTwenties() {

    for (let i = 0; i < 8; i++) {

        const twenty =
            document.createElement("div");

        twenty.classList.add(
            "number20"
        );

        twenty.textContent = "20";

        twenty.style.top =
            Math.random() * 100 + "%";

        twenty.style.animationDuration =
            (
                10 +
                Math.random() * 10
            ) + "s";

        twenty.style.animationDelay =
            Math.random() * 5 + "s";

        document.body.appendChild(
            twenty
        );

    }

}


/* ==========================
   REVEAL POEM
========================== */

function revealPoem() {

    poemOverlay.style.opacity = "1";


    poemParts.forEach(
        (part, index) => {

            setTimeout(() => {

                part.style.animation =
                    "revealPoem 1.5s ease forwards";

            }, index * 2500);

        }
    );


    setTimeout(() => {

        hidePoem();

    }, 50000);

}


/* ==========================
   HIDE POEM
========================== */

function hidePoem() {

    poemOverlay.style.opacity = "0";


    document
        .querySelectorAll(".number20")
        .forEach(num => {

            num.style.opacity = ".15";

        });

}
