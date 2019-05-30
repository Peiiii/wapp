

function initTest(){
    var btn=$('#btn-submit');
    var input=$('#addr-input');
    var buf=$('#link-buffer');
    input.on("propertychange focus input",()=>{
        var addr=input.val();log(addr)
        buf.attr('href',addr);
    });
}
$(document).ready(()=>{
    initTest();
});