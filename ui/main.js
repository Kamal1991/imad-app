console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML="NEW COURSE";
//Move img
var img=document.getElementById('img');
var marginleft=0;
function moveRight()
{
    marginleft=marginleft+50;
    img.style.marginLeft=marginleft+'px';
}
img.onclick =function()
{
    var interval=setInterval(moveRight,1000);
};