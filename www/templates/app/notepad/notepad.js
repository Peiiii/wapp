// base : jquery , file
//log('run module file_editor');
cimport('request');
cimport('file');
cimport('page_control');
function copyInnerContentTo(src,tar){
//log('copy')
    var text=getInnerContent(src);
    var status=tar.attr('status');
    if(status=='markdown')text=marked(text);
    tar.html(text);
//    log(html)
}
function preview(src,tar,markdown=false){
    var text=getInnerContent(src);
    if(markdown){
        tar.attr('status','markdown');
        text=marked(text);
    }
    else tar.attr('status','html');
    tar.html(text);
//    log(tar)
    src.css({
        display:"inline-block",
        width:'50%'
    })
    show(tar);
}
function exitPreview(src,tar){
    //log(hi)
    tar.html('');
    src.css({
        display:"block",
        width:'100%'
    })
    hide(tar);
}
function initEditApp(app){
    var btn_sub=app.find('.btn-submit');
    var btn_mark=app.find('.switch-viewMarkdown');
    var btn_html=app.find('.switch-viewHTML');

    var input=app.find('.notepad-text-input');
    var view_box=app.find('.view-html');

    var fn_box=app.find('.filename-box');
    var msg_box=app.find('.message-box');
    new SpeakSwitch(app.find('.switch-speak'),app.find('.speakinnertext'));
    new Switch(btn_mark,()=>preview(input,view_box,true),()=>exitPreview(input,view_box,true));
    new Switch(btn_html,()=>preview(input,view_box),()=>exitPreview(input,view_box));
    btn_sub.click(function(){
        message=writeFile(fn_box.text(),input.val());
        console.log(message);
        showMsg(msg_box,message);
    });
    input.bind('focus input propertychange',function(){
        hideMsg(msg_box);
        copyInnerContentTo(input,view_box);
    });
}
function runFileEditor(app){
    var path=app.params.fpath;
    var file=cGetFile(path);
    var vue_app=new Vue({
        delimiters:['<%','%>'],
        el:app.sel,
        data:{
            file:file
        }
    })
    var el=app.el();

    initEditApp(app.el());
    //window.location.href=editor.sel;
}
$(document).ready(function(){
    //log('ready to run');
    var app=trash.app['notepad'].slice(-1)[0];
    runFileEditor(app);
})
//log('nhjdk疯了')