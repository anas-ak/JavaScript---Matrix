class MatrixAnimation {
    /* 
        @param {object} element HTML Object in which the effect should be rendered
        @param {string} lettersColor - Font Color
        @param {number} letterSize - Font Size
        @param {*} - Font Family
        @param {*} - Animation Speed
    */
    constructor(element, lettersColor, letterSize, font, speed) {
        this.element = element;
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        this.lettersColor = lettersColor;
        this.letterSize = letterSize;
        this.font = font;
        this.speed = speed < 24 ? 24 : speed;
        this.status = true;
        this.ctx = undefined;
        this.letters = undefined;
    }

    drawAnimation() {

        if(this.status) {
            this.ctx.fillStyle = this.lettersColor;
            this.ctx.font = `${this.letterSize}pt ${this.font}`;

            this.letters.forEach((y, index) => {

                // assigns a random character to a variable
                const randomSymbol = String.fromCharCode(Math.random() * 128);
                const x = index * this.letterSize;

                this.ctx.fillText(randomSymbol, x, y);

                if(y > 250 + Math.random() * 15000) this.letters[index] = 0;else this.letters[index] = y + this.letterSize;
            });

            this.ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    createCanvas(element) {
        this.element.innerHTML = '';

        this.width = element ? element.offsetWidth : this.width;
        this.height = element ? element.offsetHeight : this.height;

        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'canvas');
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);

        this.ctx = canvas.getContext('2d');

        // create a column variable based on characters' dimensions
        const col = Math.floor(this.width / this.letterSize);

        // Populate column with letters
        this.letters = Array(col).fill(0);

        this.element.append(canvas);
    }

    init() {
        this.createCanvas();

        setInterval(() => {
            this.drawAnimation();        
        }, this.speed);
    }

    pausePlay() {this.status = this.status ? false : true;
    }}

//Declare a matrix variable
const matrix = new MatrixAnimation(document.querySelector('#matrix'), '#03fc35', 10, 'monospace', 80);

// Initialise the matrix 
matrix.init();

// Callback function in case window is resized
window.addEventListener('resize', () => {
    matrix.createCanvas(document.querySelector('#matrix'));
});

