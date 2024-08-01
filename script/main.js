let canvasDots = function () {
    let canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        colorDot = '#CECECE',
        color = '#CECECE';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    ctx.fillStyle = colorDot;
    ctx.lineWidth = .1;
    ctx.strokeStyle = color;

    let mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };

    let dots = {
        nb: 600,
        distance: 60,
        d_radius: 100,
        array: []
    };

    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random();
    }

    Dot.prototype = {
        create: function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        },

        animate: function () {
            for (i = 0; i < dots.nb; i++) {

                let dot = dots.array[i];

                if (dot.y < 0 || dot.y > canvas.height) {
                    dot.vx = dot.vx;
                    dot.vy = - dot.vy;
                }
                else if (dot.x < 0 || dot.x > canvas.width) {
                    dot.vx = - dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        },

        line: function () {
            for (i = 0; i < dots.nb; i++) {
                for (j = 0; j < dots.nb; j++) {
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];

                    if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance) {
                        if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius) {
                            ctx.beginPath();
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }
    };

    function createDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
            dot = dots.array[i];

            dot.create();
        }

        dot.line();
        dot.animate();
    }

    window.onmousemove = function (parameter) {
        mousePosition.x = parameter.pageX;
        mousePosition.y = parameter.pageY;
    }

    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;

    setInterval(createDots, 1000 / 30);
};
window.onload = function () {
    canvasDots();
};
let words = document.getElementsByClassName('word');
let wordArray = [];
let currentWord = 0;

words[currentWord].style.opacity = 1;
for (let i = 0; i < words.length; i++) {
    splitLetters(words[i]);
}

function changeWord() {
    let cw = wordArray[currentWord];
    let nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
    for (let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }

    for (let i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
    setTimeout(function () {
        cw[i].className = 'letter out';
    }, i * 80);
}

function animateLetterIn(nw, i) {
    setTimeout(function () {
        nw[i].className = 'letter in';
    }, 340 + (i * 80));
}

function splitLetters(word) {
    let content = word.innerHTML;
    word.innerHTML = '';
    let letters = [];
    for (let i = 0; i < content.length; i++) {
        let letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
    }

    wordArray.push(letters);
}
changeWord();
setInterval(changeWord, 4000);
const cursor = document.getElementById("cursor-custom"),
    radius = cursor.offsetHeight / 2;

document.addEventListener("mousemove", (e) => {
    let top = e.clientY - radius,
        left = e.clientX - radius;

    cursor.style = `top: ${top}px; left: ${left}px`;
});
const nav = document.querySelector(".header");
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        nav.classList.add("header-scroll");
    } else {
        nav.classList.remove("header-scroll");  
    }
});


const textInbtnFirst = document.querySelector('.HoverTextBtn'),
    textInbtnSecond = document.querySelector('.BtnPortText'),
    buttonPort = document.querySelector('.buttonPort');

buttonPort.addEventListener('mouseover', () => {
    textInbtnFirst.style.display = 'block';
    textInbtnSecond.style.display = 'none';
});

buttonPort.addEventListener('mouseout', () => {
    textInbtnFirst.style.display = 'none';
    textInbtnSecond.style.display = 'block';
});


