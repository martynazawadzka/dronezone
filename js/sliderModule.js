const Slider = function (slider) {
    this.slidesCollection = slider.querySelectorAll('.slider__slide');
    this.slidesNumber = this.slidesCollection.length;
    this.interval = null;
    this.touchDirection = 0;
    const _this = this;

    this.setDataAttributes = function () {
        for (let i = 0; i < this.slidesNumber; i++) {
            this.slidesCollection[i].setAttribute('data-slide', i);
        }
    }

    this.changeSlide = function (slideNumber) {
        const currentSlide = slider.querySelector('.slider__slide--show');
        currentSlide.classList.remove('slider__slide--show');
        const newSlide = slider.querySelector('[data-slide="' + slideNumber + '"]');
        newSlide.classList.add('slider__slide--show');
    }

    this.nextSlide = function () {
        const currentDataSlide = slider.querySelector('.slider__slide--show').getAttribute('data-slide');
        const currentDataSlideNumber = parseInt(currentDataSlide);
        if (currentDataSlideNumber !== this.slidesNumber - 1) {
            this.changeSlide(currentDataSlideNumber + 1);
        } else {
            this.changeSlide(0);
        }
    }

    this.prevSlide = function () {
        const currentDataSlide = slider.querySelector('.slider__slide--show').getAttribute('data-slide');
        const currentDataSlideNumber = parseInt(currentDataSlide);
        if (currentDataSlideNumber !== 0) {
            this.changeSlide(currentDataSlideNumber - 1);
        } else {
            this.changeSlide(this.slidesNumber - 1);
        }
    }

    this.init = function () {
        this.setDataAttributes();
        this.interval = setInterval(function () {
            _this.nextSlide();
        }, 3000);

        slider.querySelector('.slider__arrow--left').addEventListener('click', () => {
            this.prevSlide();
            clearInterval(this.interval);
            this.interval = setInterval(function () {
                _this.nextSlide();
            }, 3000)
        });

        slider.querySelector('.slider__arrow--right').addEventListener('click', () => {
            this.nextSlide();
            clearInterval(this.interval);
            this.interval = setInterval(function () {
                _this.nextSlide();
            }, 3000);
        });

        slider.addEventListener('touchstart', (event) => {
            this.touchDirection = event.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', (event) => {
            this.touchDirection -= event.changedTouches[0].screenX;
            if (this.touchDirection > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
            clearInterval(this.interval);
            this.interval = setInterval(this.nextSlide, 3000);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const slider1 = new Slider(document.querySelector('.slider'));
    slider1.init();
})
