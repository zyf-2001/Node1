Array.from(document.getElementsByClassName('link-del')).forEach(i=>{
    i.onclick = function(){
        var i = this.getAttribute("data-id");
        window.location.href='/del/'+i;
    }
})

Array.from(document.getElementsByClassName('link-update')).forEach(i=>{
    i.onclick = function(){
        var i = this.getAttribute("data-id");
        window.location.href='/update/'+i;
    }
})