//working of modals

const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

let closeModal = (modal) => {
    if (modal == null)
        return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
})


closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
})

//completed

//CRUD

window.onload = () => {
    if (localStorage.length !== 0) {
        let c = new Date();
        let d = c.getDate();
        let m = c.getMonth() + 1;
        let todayDate = `${d}-${m}`;
        // let todayDate = "12-12";
        let count = 0;
        Object.keys(localStorage).forEach(function (key) {
            let index = localStorage.getItem(key).indexOf("@");
            let date = localStorage.getItem(key).slice(index + 1);
            if (todayDate !== date) {
                count++;
            }
        });

        let b1, div1;
        let b, div;
        if (localStorage.length - count !== 0) {
            b1 = document.getElementById("objects");
            div1 = document.createElement("div");  //to contain date
            let h3 = document.createElement("div");
            h3.innerHTML = 'Today';
            div1.append(h3);
        }
        if (count != 0) {
            b = document.getElementById("prev");
            div = document.createElement("div");
            let h3 = document.createElement("div");
            h3.innerHTML = `Previous`;
            div.append(h3);
        }
        let j = 0;
        let i = 1;
        let k = 0;
        Object.keys(localStorage).forEach(function (key) {
            let index = localStorage.getItem(key).indexOf("@");
            let value;
            if(index===0)
            value="";
            else
            value = localStorage.getItem(key).slice(0, index);
            let date = localStorage.getItem(key).slice(index + 1);
            if(value!=="")
            key += ":";
            if (todayDate !== date) {
                let note = document.createElement("div");
                note.innerHTML = `
                <button class="button button5" id="0-${j}" onclick="Delete1(this.id)"></button>
                <div >
                <span id="0-${j}-1" onclick="edit(this.id)" >${key}${value}</span><p class="date">${date}</p>
                </div>`;
                note.classList.add("note");
                div.append(note);
                j++;
            }
            else {
                let note = document.createElement("div");
                note.innerHTML = `
                <button class="button button5" id = "${i}-${k}" onclick="Delete(this.id)"> </button>
                <span id="${i}-${k}-1"onclick="edit(this.id)" >${key}${value}</span>`;
                div1.append(note);
                k++;
            }

        });
        if (localStorage.length - count !== 0)
            b1.append(div1); // added to object
        if (count != 0)
            b.append(div);

    }
};

//function to delete the note in prev
let Delete1 = (num) => {
    let button = document.getElementById(num);
    let note_div = button.parentElement;//note div
    console.log(note_div);
    let prev_div = note_div.parentElement;
    console.log(prev_div);
    let child = note_div.lastElementChild;  //inner div
    let span = child.firstElementChild;
    console.log(span);
    let text = span.innerHTML;//key value
    // console.log(text);
    let index = text.indexOf(":");
    if(index==-1)
    index=text.length;
    let key = text.slice(0, index);
    child.innerHTML = `<del>${text}</del>`;
    button.style.backgroundColor = '#F65A83';
    button.style.borderColor = '#000000';
    setTimeout(() => {
        note_div.remove();
        localStorage.removeItem(key);
        if (prev_div.childElementCount == 1)
            prev_div.remove();
    }, 1000);
}

//on clicking on the text

let edit = (num) => {
    let span = document.getElementById(num);
    let text = span.innerHTML;
    let index = text.indexOf(":");
    if(index===-1)
    index=text.length;
    let old_key = text.slice(0, index);
    let index1 = localStorage.getItem(old_key).indexOf("@");
    let old_value;
    if(index1==0)
    old_value="";
    else
    old_value = localStorage.getItem(old_key).slice(0, index1);
    let date = localStorage.getItem(old_key).slice(index1);
    let modal = document.getElementById('modal2');
    modal.classList.add('active');
    overlay.classList.add('active');
    document.getElementById('new_title').value = old_key;
    document.getElementById('new_dis').value = old_value;
    document.getElementById('date').value = date;
    document.getElementById('num').value = num;
    document.getElementById('old_key').value = old_key;
}

const form2 = document.getElementById('form2');

form2.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let num = document.getElementById('num').value;
    let span = document.getElementById(num);
    let key = document.getElementById('new_title').value;
    let old_key = document.getElementById('old_key').value;
    localStorage.removeItem(old_key);
    let value = document.getElementById('new_dis').value;
    let date = document.getElementById('date').value;
    let key1=key;
    if(value!=="")
    key1+=":";
    span.innerHTML = `${key1}${value}`;
    value += date;
    localStorage.setItem(key, value);
    const modal = document.getElementById('modal2');
    closeModal(modal);
});


//function to delete the note in today
let Delete = async (num) => {
    let button = document.getElementById(num);
    let parent = button.parentElement;//note div
    let grandparent = parent.parentElement;
    let child = parent.lastElementChild; //span
    let text = child.innerHTML;
    let index = text.indexOf(":");
    if(index==-1)
    index=text.length;
    let key = text.slice(0, index);
    child.innerHTML = `<del>${text}</del>`;
    button.style.backgroundColor = '#F65A83';
    button.style.borderColor = '#000000';
    setTimeout(() => {
        parent.remove();
        localStorage.removeItem(key);
        if (grandparent.childElementCount == 1)
            grandparent.remove();
    }, 1000);

}

//for "Do you want to add new note"
const form1 = document.getElementById('form1');

form1.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let key = document.getElementById('title').value;
    let value = document.getElementById('dis').value;
    let valueshow = value;
    let flag = false;
    if (value == "")
        flag = true;
    // console.log(key, value);
    let c = new Date();
    let d = c.getDate();
    let m = c.getMonth() + 1;
    value += "@";
    value += `${d}-${m}`;
    localStorage.setItem(key, value);
    document.forms[0].reset();
    const modal = document.getElementById('modal1');
    closeModal(modal);
    if (!flag)
        key += ":";
    //we get the key and valueshow
    let b = document.getElementById("objects");
    if (b.childElementCount == 0) {
        let i = 1;
        let j = 0;
        let div = document.createElement("div");  //to contain date
        let h3 = document.createElement("div");
        h3.innerHTML = `Today`;
        div.append(h3);
        //still now if objects is empty todays date is created  
        //we are going to add the msg
        let div1 = document.createElement("div");
        div1.innerHTML = `
        <button class="button button5" id = "${i}-${j}" onclick="Delete(this.id)"> </button>
        <span id="${i}-${j}-1"onclick="edit(this.id)">${key}${valueshow}</span>
        `;
        div.append(div1);
        b.append(div); // added to object
    }
    else {
        //if that date is present

        let i = b.childElementCount + 1;
        let node = document.getElementById("objects").lastElementChild;
        // console.log(node);
        let j = node.childElementCount - 1;
        node.innerHTML += `
            <div><button class="button button5" id = "${i}-${j}" onclick="Delete(this.id)">
             </button><span style="padding: 0px 6px;" id="${i}-${j}-1" onclick="edit(this.id)">${key}${valueshow}</span>
             </div>`;
    }
})


let a = document.getElementById("btn");   //this is the button
a.onclick = () => {         //  //removed the async
    //opening the modal1
    let modal = document.getElementById('modal1');
    modal.classList.add('active');
    overlay.classList.add('active');
}



