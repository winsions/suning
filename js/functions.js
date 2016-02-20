/*通过$操作*/
function $(classname, context) {
    if(!classname){
        return;
    }
    var obj = context||document;
    if (typeof classname == "string") {
        var classname = trim(classname);
        if (classname.charAt(0) == ".") {
            return getClass(classname.substr(1), obj);
        } else if (classname.charAt(0) == "#") {
            return document.getElementById(classname.substr(1));
        } else if (/^[a-z][a-z1-9]{0,10}$/.test(classname)) {
            return obj.getElementsByTagName(classname);
        } else if(/^<[a-z][a-z1-9]{0,10}>$/.test(classname)){
            return document.createElement(classname.slice(1,-1));
        }
    }else if(typeof classname == "function"){
        // window.onload = function(){
        //     classname();
        // }
        return addEvent(window,"load",classname);
    }
}
/*通过getClass获取对象（解决ie兼容性）*/
function getClass(classname, context) {
    var obj = context || document;
    if (obj.getElementsByClassName) {
        return obj.getElementsByClassName(classname);
    } else {
        var arr = [];
        var all = obj.getElementsByTagName('*');
        for (var i = 0; i < all.length; i++) {
            if (checkClass(all[i].className, classname)) {
                arr.push(all[i]);
            }
        }
        return arr;
    }
}
/*检测class*/
function checkClass(class1, class2) {
    var arr = class1.split(" ");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == class2) {
            return true;
        }
    }
    return false;
}
/*-------去空格-------*/
function trim(str, type) {
    var type = type || 'b';
    if (type == 'b') {
        return str.replace(/^\s*|\s*$/g, "");
    } else if (type == 'a') {
        return str.replace(/\s*/g,"");
    } else if (type == 'l') {
        return str.replace(/^\s*/g,"");
    } else if (type == 'r') {
        return str.replace(/\s*$/g,"");
    }
}

/*通过getName获取对象*/
function getName(name,context) {
    var obj = context || document;
    if (obj.getElementsByClassName) {
        return obj.getElementsByName(name);
    } else {
        var arr = [];
        var all = obj.getElementsByTagName("*");
        for (var i = 0; i < all.length; i++) {
            if (all[i].getAttribute("name") == name) {
                arr.push(all[i]);
            }
        }
        return arr;
    }
}
/*获取或者是设置纯文本*/
function getText(obj,val){
    if(val){
        if(obj.innerText = undefined){
            return obj.textContent = val;
        }else{
            return obj.innerText = val;
        }
    }else{
        if(obj.textContent == undefined){
            return obj.innerText;
        }else{
            return obj.textContent;
        }
    }
}
/*解决获取样式属性值兼容性*/
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}
/*动画函数*/
//function animate(obj,attr,end,speed,callback){
//    var start = parseInt(getStyle(obj,attr));
//    var t;
//    if(start>=end){
//        t = setInterval(function(){
//            start-=speed;
//            if(start<=end){
//                start = end;
//                clearInterval(t);
//                if(callback){
//                    callback.call(obj);
//                }
//            }else{
//                obj.style[attr] = start + 'px';
//            }
//        },50);
//    }else{
//        t = setInterval(function(){
//            start+=speed;
//            if(start>=end){
//                start = end;
//                clearInterval(t);
//                if(callback){
//                    callback.call(obj);
//                }
//            }else{
//                obj.style[attr] = start + 'px';
//            }
//        },50);
//    }
//}
/*动画函数  多个*/
function animates(obj,attrobj){
    clearInterval(obj.t);
    obj.t = setInterval(function(){
        for(var i in attrobj){
            var start = parseInt(getStyle(obj,i));
            var end = parseInt(attrobj[i]);
            var speed = (end - start)/10;
            if(speed>0&&speed<1){
                Math.ceil(speed);
            }
            if(speed<0&&speed>-1){
                Math.floor(speed);
            }
            var len = start + speed;
            obj.style[i] = len + 'px';
        }
    },45)
}
/*获取所有子元素*/
function getChild(obj,type){
    var type = type==undefined?true:type;
    var children = obj.childNodes;
    var arr = [];
    for(var i=0;i<children.length;i++){
        if(type == true) {
            if (!(children[i].nodeType == 3 || children[i].nodeType == 8)) {
                arr.push(children[i]);
            }
        }else if(type == false){
            if(!((children[i].nodeType == 3&&trim(children[i].nodeValue)=="") || children[i].nodeType == 8)){
                arr.push(children[i]);
            }
        }
    }
    return arr;
}
/*获取第一个子元素*/
function getFirst(obj,type){
    return getChild(obj,type)[0];
}
/*获取最后一个子元素*/
function getLast(obj,type){
    return getChild(obj,type)[getChild(obj,type).length-1];
}
/*获取第几个子元素*/
function getNum(obj,n,type){
    return getChild(obj,type)[n];
}
/*获取下一个兄弟元素*/
function getNext(obj,type){
    var type = type==undefined?true:type;
    var next = obj.nextSibling;
    if(next==null){
        return false;
    }else if(type==true) {
        while (next.nodeType == 3 || next.nodeType == 8) {
            next = next.nextSibling;
            if(next==null){
                return false;
            }
        }
        return next;
    }else if(type == false){
        while((next.nodeType == 3&&trim(next.nodeValue)=="") || next.nodeType == 8) {
            next = next.nextSibling;
            if(next==null){
                return false;
            }
        }
        return next;
    }
}
/*获取上一个兄弟元素*/
function getUp(obj,type){
    var type = type==undefined?true:type;
    var up = obj.previousSibling;
    if(up==null){
        return false;
    }else if(type==true) {
        while (up.nodeType == 3 || up.nodeType == 8) {
            up = up.previousSibling;
            if(up==null){
                return false;
            }
        }
        return up;
    }else if(type == false){
        while((up.nodeType == 3&&trim(up.nodeValue)=="") || up.nodeType == 8) {
            up = up.previousSibling;
            if(up==null){
                return false;
            }
        }
        return up;
    }
}
/*插入到某个对象之后*/
function insertAfter(obj,obj1){
    var parent = obj1.parentNode;
    var obj1 = getNext(obj1);
    if(obj1 == null){
        parent.appendChild(obj);
    }else{
        parent.insertBefore(obj,obj1);
    }
}
/*给对象添加事件   同一个对象的多个事件可都运行*/
function addEvent(obj,event,callback){
    if(obj.addEventListener){
        obj.addEventListener(event,callback,false);
    }else if(obj.attachEvent){
        obj.attachEvent("on"+event,callback);
    }
}
/*给对象删除事件  callback函数必须有名字*/
function removeEvent(obj,event,callback){
    if(obj.removeEventListener){
        obj.removeEventListener(event,callback,false);
    }else if(obj.detachEvent){
        obj.detachEvent("on"+event,callback);
    }
}
/*获取对象距离body的实际left top*/
function offset(obj){
    var result = {left:0,top:0};
    var arr = [];
    arr.push(obj);
    while(obj.nodeName!='BODY'){
        var obj = obj.parentNode;
        if(getStyle(obj,'position')=='relative'||getStyle(obj,'position')=='absolute'){
            arr.push(obj);
        }
    }
    for (var i = 0; i < arr.length; i++) {
        var borderL = parseInt(getStyle(arr[i],'borderLeftWidth'))?parseInt(getStyle(arr[i],'borderLeftWidth')):0;
        var borderT = parseInt(getStyle(arr[i],'border-top-width'))?parseInt(getStyle(arr[i],'border-left-top')):0;
        result.left+=arr[i].offsetLeft+borderL;
        result.top+=arr[i].offsettop+borderT;
    };
    return result;
}
/*解决IE不支持position:fixed;*/
function setFixed(obj,left,top){
    if(window.ActiveXObject&&!window.XMLHttpRequest){
        obj.style.position = 'absolute';
        setInterval(function(){
            var scrollLeft = document.documentElement.scrollLeft;
            var scrollTop = document.documentElement.scrollTop;
            obj.style.left = left + scrollLeft + 'px';
            obj.style.top = top + scrollTop + 'px';
        },45);
    }else{
        obj.style.position = "fixed";
        obj.style.left = left + 'px';
        obj.style.top = top + 'px';
    }
}
/*滚轮事件*/
function wheelscroll(obj,upfun,downfun){
    if(obj.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn);  //IE、opera
    }else if(obj.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);  
        //chrome,safari    -webkit-
        obj.addEventListener("DOMMouseScroll",scrollFn,false);  
        //firefox     -moz-
    }
    function scrollFn(e){
        var ev = e||window.event;
        var num = ev.wheelDelta||ev.detail;
        if(num==120||num==-3){
            if(upfun){
                upfun.call(obj);
            }   
        }else if(num==-120||num==3){
            if(downfun){
                downfun.call(obj);
            }
        }
        if (ev.preventDefault)
            ev.preventDefault();
        else
            ev.returnValue = false;
    }
}
/*拖拽*/
function drag(obj,options){
  new drags(obj,options);

}
function drags(obj,options){
   var options=options||{};
   this.obj=obj;
   this.obj.that=this;
   document.that=this;
   this.dragX=options.dragX==undefined?true:options.dragX;
   this.dragY=options.dragY==undefined?true:options.dragY;
   this.sideX=options.sideX==undefined?false:options.sideX;
   this.sideY=options.sideY==undefined?false:options.sideY;
   this.animate=options.animate==undefined?true:options.animate;
   this.speed=0.8;
   this.play();
}
drags.prototype={
    play:function(){
        addEvent(this.obj,"mousedown",this.downFun)
    },
    downFun:function(e){
      var that=this.that;
      var e=that.getEvent(e);
      that.ox=that.getOx(e);
      that.oy=that.getOy(e);
      that.startX=that.ox;
      that.startY=that.oy;
      addEvent(document,"mousemove",that.moveFun);
      addEvent(document,"mouseup",that.upFun);

    },
    moveFun:function(e){
     var that=this.that;
     var e=that.getEvent(e);
     var cx= e.clientX;
     var cy= e.clientY;
     that.moveX=cx;
     that.moveY=cy;
     var lefts=cx-(offset(that.obj).left-that.obj.offsetLeft)-that.ox;
     var tops=cy-(offset(that.obj).top-that.obj.offsetTop)-that.oy;
     if(that.sideX){
         if(lefts<that.sideX[0]){
             lefts=that.sideX[0];
         }
         if(lefts>that.sideX[1]){
             lefts=that.sideX[1]
         }
     }

        if(that.sideY){
            if(tops<that.sideY[0]){
                tops=that.sideY[0];
            }
            if(tops>that.sideY[1]){
                tops=that.sideY[1]
            }
        }


     if(that.dragX==true) {
         that.obj.style.left = lefts + "px";
     }
     if(that.dragY==true) {
         that.obj.style.top = tops + "px";
     }
     if (e.preventDefault ) {
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
        that.endX=that.moveX-that.startX;
        that.endY=that.moveY-that.startY;
        that.startX=that.moveX;
        that.startY=that.moveY;
    },
    upFun:function(e){
     var that=this.that;
        if(that.animate) {
            that.move();
        }
        removeEvent(document,"mousemove",that.moveFun);
        removeEvent(document,"mouseup",that.upFun);
    },
    getEvent:function(e){
        return e||window.event;
    },
    getOx:function (e){
        return e.layerX|| e.offsetX||0
    },
    getOy:function (e){
        return e.layerY|| e.offsetY||0
    },
    move:function(){
       var that=this;
       var flag;
       if(Math.abs(this.endX)>Math.abs(this.endY)){
           flag=true;
       }else{
           flag=false;
       }
        var t=setInterval(function(){
            if(flag){
                if(Math.abs(that.endX)<1){
                    clearInterval(t)
                }
            }else{
                if(Math.abs(that.endY)<1){
                    clearInterval(t)
                }
            }
            that.endX*=that.speed;
            that.endY*=that.speed;
            var x=that.obj.offsetLeft+that.endX;
            var y=that.obj.offsetTop+that.endY;
            if(that.sideX){
                if(x<that.sideX[0]){
                    x=that.sideX[0];
                }
                if(x>that.sideX[1]){
                    x=that.sideX[1]
                }
            }

            if(that.sideY){
                if(y<that.sideY[0]){
                    y=that.sideY[0];
                }
                if(y>that.sideY[1]){
                    y=that.sideY[1]
                }
            }
            that.obj.style.left=x+"px";
            that.obj.style.top=y+"px";
        },50)
    }

}