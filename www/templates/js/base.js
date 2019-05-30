hi='hi'
hi1='hi1'
hi2='hi2'
hi3='hi3';
function log(text){
    console.log(text);
    return text;
}
class Trash{
    constructor(){
        this.app={
            file_explorer:[],
            notepad:[],
            link:[],
            test:[]
        };
        this.modules=[];
        this.window={};
    }
    destroyApp(app_id){this.app[app_id].destroy();}
    destroyWindow(id){this.window[id].destroy();}
}
trash=new Trash();
String.prototype.replaceAll = function(s1,s2){
return this.replace(new RegExp(s1,"gm"),s2);
}