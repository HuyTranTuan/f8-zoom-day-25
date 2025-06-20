const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tabs = $('.list-tab')
Object.assign(tabs.style, {
    "list-style-type" : "none",
    'display': 'flex',
    'justify-content': 'center',
})

const items =  $$('.list-item');
Object.assign(tabs.style, {
    "list-style-type" : "none",
    'display': 'flex',
    'justify-content': 'center',
    'margin' : '0',
})
const itemsContent =  $$('.item');

items.forEach((element, index) => {
    if(Array.from(element.classList).includes('active')){
        setActiveTabClick(index, items, itemsContent)
    }
    element.addEventListener('click', function(e){
        setActiveTabClick(index, items, itemsContent)
    });
});

document.addEventListener("keydown", function(event){
    let key = event.key
    if(key>=0 && key < items.length) {
        setActiveTabKeyboard(event, items, itemsContent);
    }
})

function setActiveTabKeyboard(event, items, itemsContent){
    removeActiveStatus(items, itemsContent, isRemove = true);
    setContentStyle(items, itemsContent, event.key)
    setTabStyle(items[event.key])
}
function setActiveTabClick(index, items, itemsContent){
    removeActiveStatus(items, itemsContent, isRemove = true);
    setContentStyle(items, itemsContent, index)
    setTabStyle(items[index])
}

function removeActiveStatus(items, itemsContent, isRemove = false){
    if(isRemove){
        items.forEach(item => {
            item.classList.remove('active')
            Object.assign(item.style, {
                'background-color' : 'transparent',
                'padding' : '10px 15px',
                'border-bottom' :  '2px solid #444',
                'border-top' :  '1px solid #fff',
                'border-left' :  '1px solid #fff',
                'border-right' :  '1px solid #fff',
            })
        })
        itemsContent.forEach(item => {
            item.classList.remove('active')
            item.style.display = 'none'
        })
    }
}

function setTabStyle(item){
    if(Array.from(item.classList).includes('active')){
        Object.assign(item.style, {
            'background-color' : '#ddd',
            'border-bottom' :  '2px solid transparent',
            'border-top' :  '1px solid #444',
            'border-left' :  '1px solid #444',
            'border-right' :  '1px solid #444',
        })
    }
}

function setContentStyle(items, itemsContent, index){
    items[index].classList.add("active");
    itemsContent[index].classList.add("active");
    Object.assign(itemsContent[index].style, {
        'display' : 'block',
        'width' : '70%',
        'background-color' : '#ddd',
        'margin' : 'auto',
        'padding' : '10px',
    })
}