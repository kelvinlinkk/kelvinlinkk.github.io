function pose(ele){
    window.scrollBy({top:ele.getBoundingClientRect().top, behavior:"smooth"})
};

function myMove(elem) {
    var elem = document.getElementById(elem); 
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++; 
        
      }
    }
}

function set(t, IDname){
    var section = document.getElementById(IDname);
    var i = 0;
    if(t == 0){
        section.style.visibility = "hidden";
        for(i=0; i<300;i++){
            section.style.width = i + 'px' ;
        }
    }
    if(t == 1){
        section.style.visibility = "visible";
        myMove(IDname);
    }
}