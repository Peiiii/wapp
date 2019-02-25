trash.modules.push('request');
function getJson(url){
    r=$.get({url:url,async:false});
    return r.responseJSON;
}