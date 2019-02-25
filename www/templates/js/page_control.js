


function getInnerContent(el){
    var tag=el.prop('nodeName').toLowerCase();
//    log('get :');log(el.prop('nodeName'))
    if(tag==='textarea' || tag==='input' ){return el.val();}
    return el.html();
}

//----------------Drag

function onDragStart(ev){
  //log(ev);
  ev.dataTransfer.setData("text/plain", ev.target.id);
//  a=ev.dataTransfer.getData('text/plain');
//  log(a)
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.dataTransfer.dropEffect = "copy";
}
function onDragOver(ev) {
//log(ev);
ev.preventDefault();
 //log(ev.defaultPrevented)
 // Set the dropEffect to move
 ev.dataTransfer.dropEffect = "move";
}
function onDrop(ev) {
//log(ev);
 ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
 var data = ev.dataTransfer.getData("text/plain");
//log(data)
 t=document.getElementById(data)
 //log(t)
 ev.target.appendChild(t);
}
//----------------Message Show

function show(el){
    el.removeClass('hidden');

}
function hide(el){
    el.addClass('hidden');
}
function showMsg(msg_box,msg){
    msg_box.css('display','block');
    msg_box.html(msg);
}
function hideMsg(msg_box){
    msg_box.css('display','none');
}

//---------------------Switch
{%include "js/switch.js"%}


trash.modules.push('page_control');