var $=document.querySelector.bind(document);
var $$=document.querySelectorAll.bind(document);

//----------------XỬ LÝ FORM CHỌN TỈNH/TP--------------//
var openAddressForm=$('.nav-item:nth-child(2)');//nút mở form

var addressForm=$('.address-form')//lớp phủ

var addressFormContent=$('.address-form-content')//nội dung

var addressFormContentClose=$('.address-form-content-close')//đóng form

//mở form
openAddressForm.onclick = function(){
    addressForm.classList.add('openAddressForm');

}

//đóng form
addressFormContentClose.onclick = function(){
    addressForm.classList.remove('openAddressForm');
}   

//bấm vào lớp phủ đóng form
addressForm.onclick = function(){
    addressForm.classList.remove('openAddressForm');
}

//ngăn chặn sự kiện nổi bọt
addressFormContent.onclick = function(e){
    e.stopPropagation();
}



// ----------------------XỬ LÝ SLIDER----------------------------------

var rightBtn=$('.slider-content-left-top-btn.right');
var leftBtn=$('.slider-content-left-top-btn.left');

//danh sách tấm ảnh
var sliderList=Array.from($$('.slider-content-left-top a img'));

//danh sách tiêu đề
var titleList=Array.from($$('.slider-content-left-bottom li'));

//vị trí tấm ảnh
var sliderIndex = 0;

//vị trí tiêu đề
var titleIndex = 0;

rightBtn.onclick = function(){
    sliderIndex+=100;
    titleIndex++;
    if((sliderIndex>(sliderList.length-1)*100)){
        sliderIndex=0;
        titleIndex=0;
    }
    $('.slider-content-left-top').style.right=`${sliderIndex}%`
    $('.slider-content-left-bottom .active').classList.remove('active');
    titleList[titleIndex].classList.add('active');
}

leftBtn.onclick = function(){
    sliderIndex-=100;
    titleIndex--;
    if(sliderIndex<0){
        sliderIndex=(sliderList.length-1)*100;
        titleIndex=(sliderList.length-1);
    }
    $('.slider-content-left-top').style.right=`${sliderIndex}%`
    $('.slider-content-left-bottom .active').classList.remove('active');
    titleList[titleIndex].classList.add('active');
}

// cho nó tự chạy
setInterval(function(){
    sliderIndex+=100;
    titleIndex++;
    if((sliderIndex>(sliderList.length-1)*100)){
        sliderIndex=0;
        titleIndex=0;
    }
    $('.slider-content-left-top').style.right=`${sliderIndex}%`
    $('.slider-content-left-bottom .active').classList.remove('active');
    titleList[titleIndex].classList.add('active');
},10000)

//bấm vô danh sách tiêu đề thì nó hiện cái tương ứng

titleList.forEach(function(title,index) {
    title.onclick = function(){
        titleIndex=index;
        sliderIndex=index*100;
        $('.slider-content-left-top').style.right=`${sliderIndex}%`;
        $('.slider-content-left-bottom .active').classList.remove('active');
        titleList[titleIndex].classList.add('active');
    }
})



// ---------------ONE PRODUCT-----------------------------------
var sliderProductOneContentLeft=$('.slider-product-one-content-btn.left');
var sliderProductOneContentRight=$('.slider-product-one-content-btn.right');

//phần chứa ảnh
var sliderProductOneContentItemsContent=$('.slider-product-one-content-items-content')

var sliderProductIndex=0;

var sliderProductOneContentItems=Array.from($$('.slider-product-one-content-items'));

sliderProductOneContentRight.onclick = function(){
    sliderProductIndex+=100;
    if(sliderProductIndex>(sliderProductOneContentItems.length-1)*100){
        sliderProductIndex=0;
    }
    sliderProductOneContentItemsContent.style.right=`${sliderProductIndex}%`;
}

sliderProductOneContentLeft.onclick = function(){
    sliderProductIndex-=100;
    if(sliderProductIndex<0){
        sliderProductIndex=(sliderProductOneContentItems.length-1)*100
    }
    sliderProductOneContentItemsContent.style.right=`${sliderProductIndex}%`;

}



//------- tab product---------------//

//danh sách các nút
var productControls=$$('.product-main-control-item');

//danh sách sản phẩm tương ứng
var productContent=$$('.product-main-content');

productControls.forEach(function(control,index){
    control.onclick=function(){
        $('.product-main-control-item.active').classList.remove('active');
        control.classList.add('active');

        $('.product-main-content.active').classList.remove('active');
        productContent[index].classList.add('active');
    }
})