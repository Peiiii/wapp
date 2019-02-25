class Button{
    constructor(content=''){

        this.tag='button';
        this.class=['btn','btn-default'];
        this.content=content;
        this.close=`</${this.tag}>`;
    }
    getClass(){
        return this.class.join(' ');
    }
    open(){
        return `<${this.tag} class="${this.getClass()}">`;
    }
    html(){
        return this.open()+this.content+this.close;
    }
    new(content){
        return this.open()+content+this.close;
    }
    addClass(list){
        this.class=this.class.concat(list);
    }
}
class Config{
    constructor(){
        this.app={icon:'<img src="/imgs/app.ico"'};
        this.window={
            defaultWidth:"600px",
            defaultHeight:"400px"
        };
        var btn1=new Button('<span class="glyphicon glyphicon-resize-full"></span>');
        btn1.addClass(['switch-on window-ctrl-btn']);
        var btn2=new Button('<span class="glyphicon glyphicon-resize-small"></span>');
        btn2.addClass(['switch-off window-ctrl-btn']);
        this.button={
            fullScreen:btn1.html(),
            exitFullScreen:btn2.html()
        }
    }
}
config=new Config();