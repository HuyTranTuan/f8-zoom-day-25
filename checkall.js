const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listContent = ['hoc bai', 'lam viec', 'da banh', 'danh cau long', 'rua chen']

function createFormChecked(action, listContent){
    const form = document.createElement('form');
    Object.assign(form.style, {
        'background-color': 'pink',
    })
    form.action = `${action}`;

    const checkAll = document.createElement('input')
    checkAll.type = 'checkbox';
    form.appendChild(checkAll);

    const checkboxList = document.createElement('div');
    form.appendChild(checkboxList);

    let listLength = listContent.length;
    for (let i=0; i<listLength; i++){
        const div = document.createElement('div')
        div.className = 'form-group';

        const checkboxItem = document.createElement('input');
        checkboxItem.type = "checkbox";
        checkboxItem.name = `${listContent[i]}`;
        checkboxItem.id = `checked-${i}`;
        checkboxItem.classList = 'checkbox-item';

        const checkboxItemContent = document.createElement('label');
        checkboxItemContent.htmlFor = `checked-${i}`;
        checkboxItemContent.textContent = `${listContent[i]}`;

        div.appendChild(checkboxItem);
        div.appendChild(checkboxItemContent);
        form.appendChild(div);
    }

    checkAll.addEventListener('click', function(e){
        let listCheckbox = $$('.checkbox-item');
        listCheckbox.forEach(element => {
            element.checked = e.target.checked ? true : false;
        });
    })

    form.addEventListener("click", function(event){
        let listCheckbox = $$('.checkbox-item');
        let unCheckedItems = Array.from(listCheckbox).filter(element => element.checked === false);

        if(unCheckedItems.length === listCheckbox.length) {
            checkAll.checked = false
        }
        if(unCheckedItems.length > 0 && unCheckedItems.length < listCheckbox.length){
            checkAll.indeterminate = true;
        }
        if(unCheckedItems.length === 0){
            checkAll.indeterminate = false;
            checkAll.checked = true;
        } 
    })

    document.body.appendChild(form)
}

createFormChecked('https://www.w3schools.com/tags/att_input_checked.asp', listContent)