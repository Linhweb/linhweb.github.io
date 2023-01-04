var container=document.querySelector('.container');
var input=document.querySelector('input');
var form=document.querySelector('form');
var button=document.querySelector('button');
var todos=document.querySelector('.todos');


form.onsubmit=function(e){
    e.preventDefault();
    var value=input.value.trim();
    if(value){
        add({
            text: value,
        });
        save()
        input.value=null;
        input.focus();
    }
}

function add(todo){
    var li=document.createElement('li');
    li.innerHTML=`
        <span>${todo.text}</span>
        <i class="fa-solid fa-trash delete"></i>
    `;

    if(todo.status === 'cancel'){
        li.classList.add('cancel');
    }
    li.onclick =function(){
        this.classList.toggle('cancel');
        save();
    }
    li.querySelector('i').onclick =function(){
        todos.removeChild(li);
        save();
    }

    todos.appendChild(li);
}

function save(){
    var todos=document.querySelectorAll('li');
    var todoStorage=Array.from(todos).map(function(todo){
        var text=todo.querySelector('span').innerText;
        var status=todo.getAttribute('class');
        return{
            text,
            status
        }
    })
    localStorage.setItem('todos',JSON.stringify(todoStorage));
}

function init(){
    var data=JSON.parse(localStorage.getItem('todos'))//mảng chứa những obj;
    data.forEach(function(item){
        add(item);
    })
}
init();