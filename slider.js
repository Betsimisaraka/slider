function Slider(slider) {
    if (!(slider instanceof Element)) {
        throw new Error('No slider passed in');
    }
    //create some variables for working with the slider
    let prev;
    let current; 
    let next;

    // Select the element that we needed for the slider
    const slides = slider.querySelector('.slides');
    const prevButton = slider.querySelector('.goToPrev');
    const nextButton = slider.querySelector('.goToNext');

    //future function
    function startSlider() {
        current = slider.querySelector('.current') || slides.firstElementChild;
        prev = current.previousElementSibling || slides.lastElementChild;
        next = current.nextElementSibling || slides.firstElementChild;
    }

    function applyClasses() {
        current.classList.add('current');
        prev.classList.add('prev');
        next.classList.add('next');
    }

    function move(direction) {
        const classesToRemove = ['prev', 'current', 'next'];
        // [prev, current, next].forEach(el => el.classList.remove(...classesToRemove));
        current.classList.remove(...classesToRemove);
        prev.classList.remove(...classesToRemove);
        next.classList.remove(...classesToRemove);

        if (direction === 'back') {
            //swap the variable when we go backwards
            [prev, current, next] = [
                prev.previousElementSibling || slides.lastElementChild, 
                prev, 
                current,
            ];
        } else {
            //do the opposite if we go forward
            [prev, current, next] = [
                current, 
                next, 
                next.nextElementSibling || slides.firstElementChild,
            ];
        }
        applyClasses();
    }

    startSlider();
    applyClasses();

    // Event listeners
    prevButton.addEventListener('click', () => move('back'));
    nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));