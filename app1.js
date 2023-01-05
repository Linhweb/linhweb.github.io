var container=document.querySelector('.container');
var input=document.querySelector('input');
var form=document.querySelector('form');
var button=document.querySelector('button');
var todos=document.querySelector('.todos');


form.onsubmit = function(e){
    e.preventDefault();
    var value=input.value.trim();
    if(value){
        add({
            text:value,
        })
        save();
    }
    input.value=null;
    input.focus();
}

function add(todo){
    // todo={
    //     text:
    //     status
    // }

    var li=document.createElement('li');
    li.innerHTML=`
        <span>${todo.text}</span>
        <i class="fa-solid fa-trash delete"></i>
    `

    if(todo.status==='cancel'){
        li.setAttribute('class', 'cancel');
    }

    li.querySelector('i').onclick=function(){
        todos.removeChild(li);
        save();
    }

    li.onclick=function(){
        li.classList.toggle('cancel');
        save();
    }

    todos.appendChild(li);
}

function save(){
    var list=document.querySelectorAll('li');//mảng
    var listStorage=Array.from(list).map(function(item){
        var text=item.querySelector('span').innerText;
        var status=item.getAttribute('class');
        return{
            text,
            status
        }
    })
    localStorage.setItem('list',JSON.stringify(listStorage));
}
function init(){
    var data=JSON.parse(localStorage.getItem('list'));
    data.forEach(function(item){
        add(item);
    })
}
init();

