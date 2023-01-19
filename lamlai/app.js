var $=document.querySelector.bind(document);
var $$=document.querySelectorAll.bind(document);

var menuBtn=$('.menu');
var menuItem=$('.menu-item');
var menuClose=$('.menu-item-close');

menuBtn.onclick=function(){
    menuBtn.classList.toggle('active');
}


var header=$('.header');

///scroll into view
function checkElement(element){
    var react=element.getBoundingClientRect();
    var windowHeight=window.innerHeight;
    if(react.top>windowHeight || react.bottom<0){
        element.classList.remove("start");
    }else{
        element.classList.add("start");
    }
}

function checkAnimation(){
    var list=document.querySelectorAll('.show');
    list.forEach(function(element){
        checkElement(element);
    })

    
    var y=this.pageYOffset;
    if(y>0){
        header.classList.add('active');
    }
    else{
        header.classList.remove('active');
    }
}
window.onscroll=checkAnimation;
checkAnimation();



// main-menu
var mainMenuControls=$$('.main-menu-control span');
var mainMenuItems=$$('.main-menu-item');

mainMenuControls.forEach(function(item1){
    item1.onclick=function(){
        var type1=item1.getAttribute('type');
        $('.main-menu-control span.active').classList.remove('active');
        item1.classList.add('active');
        mainMenuItems.forEach(function(item2){
            var type2=item2.getAttribute('type');
            if(type1===type2){
                item2.classList.add('active');
            }else{
               item2.classList.remove('active');
            }
        })
    }
});