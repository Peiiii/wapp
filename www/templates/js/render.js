//base: page_control
function renderApp(){
    var list=$('.app-list');
    list.css({
        padding:'20px',
        width:'100%'
    })
    apps=$('.app');
    apps.map(function(n,a){
        //log(a);log(b);log(c);
        $(a).prepend(config.app.icon);
        imgs=$(a).find('img');
        imgs.css({width:'90%',height:'60%'});
        imgs.attr({draggable:false});
        $(a).css({
            display:'inline-block',
            overflow:'hidden',
            "font-size":'10px',
            margin:'0px',
        });
        //log(a)
        a.draggable=true;
        a.ondragstart=onDragStart;

//        $(a)[0].ondrag=function(){console.log(this.style.top)}
    })
}
function renderGrid(){
    grids=$('.grid');
    grids.map(function(n,g){
        g.ondragover=onDragOver;
        g.ondrop=onDrop;
    })
}
function renderWindow(){
    wins=$('.window');
    wins.map(function(n,w){
        w.ondragstart=onDragStart;

    })
}
function renderAll(){
    renderApp();
    renderGrid();
}