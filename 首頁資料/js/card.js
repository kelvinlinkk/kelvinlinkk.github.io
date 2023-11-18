const myadd = document.getElementById("plus")
myadd.addEventListener("click",function(){console.log(myadd.parentNode.childNodes[1].innerHTML=parseInt(myadd.parentNode.childNodes[1].innerHTML)+1)})