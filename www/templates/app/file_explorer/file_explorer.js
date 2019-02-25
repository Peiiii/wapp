cimport('file');
function runFileExplorer(app){
    default_path='e:/wapp/www';
    dir=getDir(default_path);
    fe=new Vue({
        delimiters:['<%','%>'],
        el:'#'+app.id,
        data:{
            path:dir,
            path_history:[default_path],
            his_length:1
        },
        methods:{
            pathForward:function(e){
                //log(e);
                var path=e.target.getAttribute('path');
                var p=getDir(path);
                //log(this);
                this.$data.path=p;
//                var len=this.$data.his_length;
                this.$data.path_history.push(path);
                this.$data.his_length++;
            },
            pathBackward:function(e){
                //log(e);
                if(this.$data.his_length==1)return false;
                this.$data.path_history.pop();
                this.$data.his_length--;
                var path=this.$data.path_history.slice(-1)[0];
                //log(path)
                var dir=getDir(path);
                this.$data.path=dir;
            },
            toPathTop:function(e){
                var path=this.$data.path_history[0];
                var dir=getDir(path);
                this.$data.path_history.push(path);
                this.$data.his_length++;
                this.$data.path=dir;
            }
        },
        created:function(){
        }
    })
}

$(document).ready(function(){
    var app=trash.app['file_explorer'].slice(-1)[0];
    runFileExplorer(app);
})