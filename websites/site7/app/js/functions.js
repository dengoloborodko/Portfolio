const addClassForElements = (className, ...elements) => {
    elements.forEach(element => element.classList.add(className));
};

const removeClassForElements = (className, ...elements) => {
    elements.forEach(element => element.classList.remove(className));
};

const getElementPosition = element => {
    const elementYCoordinate = element.getBoundingClientRect().top;

    return elementYCoordinate + pageYOffset;
};

const controlPreloader = () => {
    const hidePreloader = () => {
        const fadeTarget = document.querySelector('.preloader-wrapper');
        let opacityValue = 1;

        const changeOpacityOrDisplayPropertyValue = () => {
            if (opacityValue > 0) {
                opacityValue -= 0.1;
                fadeTarget.style.opacity = String(opacityValue);
            } else {
                clearInterval(fadeEffect);
                fadeTarget.style.display = 'none';
            }
        };

        const fadeEffect = setInterval(changeOpacityOrDisplayPropertyValue, 70);
    };

    window.addEventListener('load', hidePreloader);
};

const createImagesInWorkSection = (imagesAmount, hiddenImagesAmount) => {
    const workSectionImagesWrapper = document.querySelector('.section-works__grid');

    for (let i = 1; i <= imagesAmount; i++) {
        const indexOfLastVisibleImage = imagesAmount - hiddenImagesAmount;
        const className = 'section-works__grid-image';
        const classList = (i > indexOfLastVisibleImage) ? `${className} ${className}--hidden` : className;

        workSectionImagesWrapper.innerHTML += `
            <a href="#">
                <img src="./images/work-section-images/grid-${i}.jpg" class="${classList}" alt="our works">
            </a>
        `;
    }
};

const makeSlider = (className, type) => {
    const slider = new Glide(className, {type});
    slider.mount();
};

const controlShowingOfNavigationList = () => {
    const navigationList = document.querySelector('.header-inner__nav-list');
    const openNavigationListBtn = document.querySelector('.nav-btn');
    const closeNavigationListBtn = document.querySelector('.nav-btn-close');

    openNavigationListBtn.addEventListener('click', () => {
        addClassForElements('flex', navigationList, closeNavigationListBtn);
    });

    closeNavigationListBtn.addEventListener('click', () => {
        removeClassForElements('flex', navigationList, closeNavigationListBtn);
    });
};

const performScrollingToAnchors = () => {
    const navigationList = document.querySelector('.header-inner__nav-list');

    const handleClickOnNavigationList = e => {
        e.preventDefault();
        const clickedElement = e.target;

        if (!clickedElement.classList.contains('header-inner__nav-link')) {
            return;
        }

        const anchorId = clickedElement.getAttribute('href');
        const anchor = document.querySelector(`${anchorId}`);
        const anchorPosition = getElementPosition(anchor);

        window.scrollTo({
            top: anchorPosition,
            behavior: 'smooth'
        });
    };

    navigationList.addEventListener('click', handleClickOnNavigationList);
};

const performParallaxEffect = parallaxMultiplier => {
    const getArrOfBackgroundImagesByClassNames = (...classNames) => {
        return classNames.map(className => document.querySelector(className));
    };

    const arrOfBackgroundImages = getArrOfBackgroundImagesByClassNames('.header', '.section-video',
        '.section-team', '.section-quotes');

    const handleScrollOnWindow = () => {
        arrOfBackgroundImages.forEach(item => {
            const elementPosition = getElementPosition(item);
            const value = (pageYOffset - elementPosition) * parallaxMultiplier;
            item.style.backgroundPosition = `center ${value}px`;
        });
    };

    window.addEventListener('scroll', handleScrollOnWindow);
};

const controlAppearingAndClicksOnScrollToTopBtn = () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

    const handleScrollOnWindow = () => {
        const modifierClassName = 'scroll-to-top-btn--shift';

        if(pageYOffset > window.innerHeight) {
            addClassForElements(modifierClassName, scrollToTopBtn);
        } else {
            removeClassForElements(modifierClassName, scrollToTopBtn);
        }
    };

    const handleClickOnScrollToTopBtn = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', handleScrollOnWindow);
    scrollToTopBtn.addEventListener('click', handleClickOnScrollToTopBtn);
};

const controlShowingOfModalWindow = () => {
    const modalWrapper = document.querySelector('.modal-wrapper');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.querySelector('.modal-form__close-btn');

    const handleKeydownOnDocument = e => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    const showModal = () => {
        addClassForElements('modal-wrapper--flex', modalWrapper);
        document.addEventListener('keydown', handleKeydownOnDocument);
    };

    const closeModal = () => {
        removeClassForElements('modal-wrapper--flex', modalWrapper);
        document.removeEventListener('keydown', handleKeydownOnDocument);
    };

    openModalBtn.addEventListener('click', showModal);
    closeModalBtn.addEventListener('click', closeModal);
};

const controlShowingOfAllWorks = () => {
    const showAllWorksBtn = document.querySelector('#btn-show-all-works');
    const hiddenImagesClassName = 'section-works__grid-image--hidden';
    const imagesCollection = document.querySelectorAll('.section-works__grid-image');

    const handleClickOnShowAllWorksBtn = () => {
        imagesCollection.forEach(image => {
            if (image.classList.contains(hiddenImagesClassName)) {
                removeClassForElements(hiddenImagesClassName, image);
            }
        });

        showAllWorksBtn.style.display = 'none';
    };

    showAllWorksBtn.addEventListener('click', handleClickOnShowAllWorksBtn);
};

const controlUserSubscription = () => {
    const subscribeBtn = document.querySelector('.footer-inner__social-input-button');
    const subscribeInput = document.querySelector('.footer-inner__social-input');
    const successMessageSpan = document.querySelector('.footer-inner__social-success');
    const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;

    const handleClickOnSubscribeBtn = e => {
        e.preventDefault();

        const emailValue = subscribeInput.value;

        const showSubscribeMessage = (message, className) => {
            successMessageSpan.textContent = message;

            addClassForElements(className, successMessageSpan);
            setTimeout(removeClassForElements, 1500,
                className, successMessageSpan
            );
        };

        if (emailRegExp.test(emailValue)) {
            showSubscribeMessage('Subscribed successfully!', 'footer-inner__social-success--approved');
        } else {
            showSubscribeMessage('Please, enter a valid email', 'footer-inner__social-success--rejected');
        }
    };

    subscribeBtn.addEventListener('click', handleClickOnSubscribeBtn);
};
