
//------------------Module
function cimport(module_name){
    if(trash.modules.indexOf(module_name)!=-1)return true;
    code=getModule(module_name);
    //console.log('code:');console.log(code);
    window.eval(code);
    console.log('run module:'+module_name);
    trash.modules.push(module_name)
}
function getModule(module_name){
    return getCloudModule(module_name)
}
function getCloudModule(module_name){
    j=getJson('/module/get/'+module_name);
    return j['data']
}


//-------------------------CloudApp
cimport('request');
class App{
    constructor(pyapp){
        this.html=pyapp.html;
        this.name=pyapp.name;
        this.id='app_'+pyapp.id;
        this.sel='#'+this.id;
        this.params={};
        trash.app[this.name].push(this);
    }
    el(){
        return $(this.sel);
    }
    hi(){console.log('Hi, my name is'+this.name);}
    run(){
        var pos_el=this.getDefaultOpenAtPosition();
        this.replace(pos_el);
    }
    getDefaultOpenAtPosition(){return $($('.app-box')[0]);}
    replace(el){el.replaceWith(this.html)}
    destroy(){
        trash.app[this.name].pop(this);
        //if(typeof this.window=="undefined"?false:true) this.window.destroy();
        delete this;
    }
}
function getApp(app_name){
    return getCloudApp(app_name);
}
function getCloudApp(app_name){
    j=getJson('/cloud_app/get/'+app_name);
    return new App(j['data']);
}
//----------------------window
cimport('page_control');
class Window{
    constructor(app){
        this.width=config.window.defaultWidth;
        this.height=config.window.defaultHeight;
        //log(app)
        this.id='window_'+app.id;
        this.sel='#'+this.id;
        //log(this.sel)
        this.openBracket=`<div id="${this.id}" class="window" draggable="true" style="position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);
        width:${this.width};height:${this.height};">
        <div class="window-ctrl-bar"><button class="btn btn-default window-ctrl-btn" onclick="trash.destroyWindow('${this.id}')"><span class="glyphicon glyphicon-remove"></span></button>
        <div class="switch-fullscreen" style="float:right;">${config.button.fullScreen}${config.button.exitFullScreen}</div>
        </div>
        <div class="window-content-box">`;
        this.closeBracket='</div></div>';
        if(arguments.length!=0)this.include(app);
    }
    toHtml(){
        return this.openBracket+this.content+this.closeBracket;
    }
    onDrag(e){
       log(e);
    }
    onDragEnd(e,self){
       //log(self.sel);
       var el=$(self.sel);
       log(e)
       el.css('left',e.pageX);
       el.css('top',e.pageY);
       log(el[0].style.left)
    }
    render(){
        this.app_el().attr('id',this.app.id);
        var wins=$('.window');
        var self=this;
        wins.map(function(n,w){
            //log(w)
            //w.ondragstart=self.onDrag;
            w.ondragend=function(e){self.onDragEnd(e,self);};
            //log(w.ondragstart)
            //log(self)
        })
        var btn=$('.switch-fullscreen');
        var tar=$(this.sel);
            //log(btn)
        var sw=new FullScreenSwitch(btn,tar);
        this.switch=sw;
    }
    include(app){
        this.content=app.html;
        this.app=app;
        app.window=this;
    }
    el(){
        return $(this.sel);
    }
    app_el(){
        return this.el().find('.running-app-box');
    }
    show(){
        trash.window[this.id]=this;
        var wl=this.getDefaultOpenAtPosition();
        //log(this.toHtml())
        wl.append(this.toHtml());
        this.render();
    }
    destroy(){
        $(this.sel).remove();
        delete trash.window[this.id];
        if(typeof this.app =="undefined"?false:true) this.app.destroy();
        delete this;
    }
    getDefaultOpenAtPosition(){return $($('.window-list')[0])}
    fullScreen(){
        fullScreen($(this.sel));
    }
    exitFullScreen(){
        exitFullScreen($(this.sel));
    }

}
//--------------------openApp

function openApp(app_name){
    app=getApp(app_name);
    var w=new Window(app);
    //log(w);
    w.show();
}
function openFileWithApp(app_name,fpath){
    var app=getApp(app_name);
    app.params['fpath']=fpath;
    var w=new Window(app);
    w.show();
}
function eventOpenFileWithApp(app_name,e){
    var fpath=e.target.getAttribute('path');
    openFileWithApp(app_name,fpath);
}















trash.modules.push('system');