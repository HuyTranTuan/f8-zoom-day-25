const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const items = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg']
const showBtn = $('.btn-show-slider');

showBtn.addEventListener('mouseenter', function(){
    showBtn.style.backgroundColor = 'deepblue';
    showBtn.style.color = 'white';
    showBtn.style.border = '1px solid white';
})
showBtn.addEventListener('mouseleave', function(){
    showBtn.style.backgroundColor = 'royalblue';
    showBtn.style.color = 'black';
    showBtn.style.border = '1px solid black';
})
showBtn.addEventListener('click', function(){
    $(".slider-container").style.visibility = 'visible';
    $(".slider-container").style.opacity = '1';
})

window.onload = function(){
    $('.img-slider').classList.add('active')
    $('.page-slider').classList.add('active')
    $('.page-slider').style.backgroundColor = '#aaa';
}

function createSlider(sliderName, items, closeBtn = true, prevBtn = true, nextBtn = true ){
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
    sliderContainer.id = sliderName;

    Object.assign(sliderContainer.style, {
        'width' : "640px",
        'height' : "470px",
        'visibility': 'visible',
        'opacity' : "1",
        'align-items' : 'center',
        "position": "relative",
        'margin' : 'auto',
        "overflow" : 'hidden',
        "transition": 'opacity, visibility',
        "transition-duration" : '0.3s',
        "transition-timing-function" : "ease-in"
    })
    if(items){
        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';

        Object.assign(imgContainer.style, {
            'width' : "100%",
            'height' : "430px",
            'display' : "flex",
            "flex-wrap": "nowrap",
            "transition": 'transform',
            "transition-duration" : '0.3s',
            "transition-timing-function" : "ease-in"
        })
        for(let i = 0; i< items.length; i++){
            let img = document.createElement('img')
            img.src = `./img/${items[i]}`;
            if(i == 0){
            }
            img.classList = i==0 ? 'img-slider active' : 'img-slider';
            img.tabIndex = i;
            Object.assign(img.style, {
                'min-width' : "100%",
                'object-fit' : 'cover',
                "object-position": "center",
            })
            imgContainer.appendChild(img);
        }
        sliderContainer.appendChild(imgContainer);

        const pageContainer = document.createElement('div');
        pageContainer.className = 'page-container';

        Object.assign(pageContainer.style, {
            'width' : "100%",
            'padding' : "10px",
            'display' : "flex",
            'justify-content' : "center",
            'gap' : "10px",
            "flex-wrap": "nowrap",
            "transition": 'transform',
            "transition-duration" : '0.3s',
            "transition-timing-function" : "ease-in"
        })
        for(let i = 0; i< items.length; i++){
            let page = document.createElement('div')
            page.className = 'page-slider'
            page.tabIndex = i;
            Object.assign(page.style, {
                'width' : "30px",
                'height' : "10px",
                'border-radius' : "5px",
                'background-color' : "#ddd",
                'object-fit' : 'cover',
                "object-position": "center",
            })

            page.addEventListener('click', function(e){
                $$('.page-slider').forEach(element => {
                    element.classList.remove('active')
                    element.style.backgroundColor = '#ddd';
                });
                e.target.classList.add('active')
                e.target.style.backgroundColor = '#aaa';
                imgContainer.style.transform  = `translateX(-${this.tabIndex * 100}%)`;
            })

            pageContainer.appendChild(page);
        }
        sliderContainer.appendChild(pageContainer);

        if(closeBtn){
            const closeBtnElement = document.createElement('button');
            Object.assign(closeBtnElement.style, {
                'width' : "20px",
                'height' : "20px",
                "border-radius": '50%',
                "position": 'absolute',
                "top": "10px",
                "right" : "10px",
                'display' : 'flex',
                'justify-content' : 'center',
            })
            closeBtnElement.textContent = "X"
            sliderContainer.appendChild(closeBtnElement)
    
            closeBtnElement.addEventListener('click', function(){
                $(".slider-container").style.visibility = 'hidden';
                $(".slider-container").style.opacity = '0';
            })
        }

        if(prevBtn){
            const prevBtnElement = document.createElement('button');
            prevBtnElement.classList = 'prev-btn';
            Object.assign(prevBtnElement.style, {
                'width' : "40px",
                'height' : "40px",
                "border-radius": '50%',
                "position": 'absolute',
                "top": "50%",
                "left" : "10px",
                "transform": "translateY(-50%)",
            })
            prevBtnElement.textContent = "<"
            sliderContainer.appendChild(prevBtnElement);
        }
        if(nextBtn){
            const nextBtnElement = document.createElement('button');
            nextBtnElement.classList = 'next-btn';
            Object.assign(nextBtnElement.style, {
                'width' : "40px",
                'height' : "40px",
                "border-radius": '50%',
                "position": 'absolute',
                "top": "50%",
                "right" : "10px",
                "transform": "translateY(-50%)",
            })
            nextBtnElement.textContent = ">"
            sliderContainer.appendChild(nextBtnElement);
        }
    }

    document.body.appendChild(sliderContainer);

    let lastClickTime = 0;
    const clickInterval = 500; 

    if(prevBtn){
        const prevBtnElement = $('.prev-btn')
        prevBtnElement.addEventListener("click", function(e){
            const currentTime = new Date().getTime(); 
            if (currentTime - lastClickTime < clickInterval) {
                console.log("wait!!!");
            } else {
                slidePrevious()
                lastClickTime = currentTime;
            }
        })
    }
    
    if(nextBtn){
        const nextBtnElement = $('.next-btn')
        nextBtnElement.addEventListener("click", function(e){
            const currentTime = new Date().getTime(); 
            if (currentTime - lastClickTime < clickInterval) {
                console.log("wait!!!");
            } else {
                slideNext()
                lastClickTime = currentTime;
            }
        })
    }
}

function slidePrevious(){
    let imgContainer = $('.img-container')
    let imgList = $$('.img-slider')
    let pageList = $$('.page-slider')
    let activePage = $('.page-slider.active')
    let activeImg = $('.img-slider.active');
    if(activeImg){
        removeActiveClass(pageList, imgList);
        if(activeImg.tabIndex === 0){
            slidePositionEnd(imgList, imgContainer, pageList, imgList.length - 1)
        } else {
            slideActiveClass(activeImg, imgContainer, activePage, 'previous')
        }
    }
}

function slideNext(){
    let imgContainer = $('.img-container')
    let imgList = $$('.img-slider')
    let activeImg = $('.img-slider.active');
    let pageList = $$('.page-slider')
    let activePage = $('.page-slider.active')
    if(activeImg){
        removeActiveClass(pageList, imgList);
        if(activeImg.tabIndex === imgList.length - 1){
            slidePositionEnd(imgList, imgContainer, pageList, 0)
        } else {
            slideActiveClass(activeImg, imgContainer, activePage, 'next')
        }
    }
}

function removeActiveClass(pageList, imgList){
    pageList.forEach(element => {
        element.classList.remove('active')
        element.style.backgroundColor = '#ddd';
    });
    imgList.forEach(element => {
        element.classList.remove('active')
    });
}

function slideActiveClass(activeImg, imgContainer, activePage, status){
    let actionStatus = status === 'next' ?activeImg.nextSibling : activeImg.previousSibling
    let pageStatus = status === 'next' ?activePage.nextSibling : activePage.previousSibling
    actionStatus.classList.add('active');
    imgContainer.style.transform  = `translateX(-${(actionStatus.tabIndex) * 100}%)`

    pageStatus.classList.add('active')
    pageStatus.style.backgroundColor = '#aaa';
}

function slidePositionEnd(imgList, imgContainer, pageList, index){
    imgList[index].classList.add('active');
    imgContainer.style.transform  = index === 0
        ? `translateX(${index})`
        : `translateX(-${(imgList.length - 1) * 100}%)`;

    pageList[index].classList.add('active')
    pageList[index].style.backgroundColor = '#aaa';
}


setInterval(()=>{
    slideNext();
}, 5000);

createSlider("slider",items)