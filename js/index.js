$(function(){

//   头部导航下拉
//    var header_nav=$(".header-nav")[0];
//    var header_nav_h=$(".header-nav-h")[0];
//    header_nav.onmouseover = function(){
//        animate(header_nav_h,{height:240},200)
//        header_nav_h.style.borderBottom="1px solid #eee";
//        this.style.backgroundColor="#fff";
//    }
//    header_nav.onmouseout=function(){
//        animate(header_nav_h,{height:0},50);
//        this.style.backgroundColor="#F5F5F5";
//        header_nav_h.style.borderBottom="0px solid #eee";
//
//
//    }



// 头部下拉

    function xia(num,height){
        var header_list=$(".header-list")[num];
        var header_hd=$(".header-hd")[num];
        header_list.onmouseover = function(){
            animate(header_hd,{height:height},200)
            header_hd.style.borderBottom="1px solid #eee";
            this.style.backgroundColor="#fff";
        }
        header_list.onmouseout=function(){
            animate(header_hd,{height:0},50);
            this.style.backgroundColor="#F5F5F5";
            header_hd.style.borderBottom="0px solid #eee";


        }
    }
    xia(1,100);
    xia(0,240);
    xia(2,120);
    xia(3,180);
})