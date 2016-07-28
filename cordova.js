function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}
window.onload=function(){
	var oBox=document.querySelector('.box');
	var oBtn=document.querySelector('#btn');
	
	var R=5;
	var C=8;
	
	for (var i = 0; i < R; i++) {
		for (var j = 0; j < C; j++) {
			var oSpan=document.createElement('span');

			var w=(oBox.offsetWidth-4)/C;
			var h=(oBox.offsetHeight-4)/R;

			oSpan.style.width=w+'px';
			oSpan.style.height=h+'px';

			oSpan.style.left=w*j+'px';
			oSpan.style.top=h*i+'px';

			oBox.appendChild(oSpan);
			oSpan.style.backgroundPosition=(-w*j)+'px'+' '+(-h*i)+'px';

			oSpan.r=i;
			oSpan.c=j;
		}
	}
	var aSpan=oBox.children;
	var iNow=0;
	var bReady=true;
	oBtn.addEventListener("touchstart",function(){
		if (!bReady) return;
		bReady=false;
		iNow++;
		for (var i = 0; i < aSpan.length; i++) {
			aSpan[i].style.transition='0.5s all cubic-bezier(0.73, 0.07, 0.31, 0.96) '+(aSpan[i].r+aSpan[i].c)*150+'ms';
			var X=(aSpan[i].offsetLeft+aSpan[i].offsetWidth/2)-oBox.offsetWidth/2;
			var Y=(aSpan[i].offsetTop+aSpan[i].offsetHeight/2)-oBox.offsetHeight/2;

			aSpan[i].style.transform='perspective(800px) scale(1.5)    translate('+X+'px,'+Y+'px) rotateX('+rnd(0,180)+'deg) rotateY('+rnd(0,180)+'deg)';

			aSpan[i].style.opacity='0';
		}
	},false);
	aSpan[aSpan.length-1].addEventListener('transitionend',function(){
		bReady=true;
		for (var i = 0; i < aSpan.length; i++) {
			aSpan[i].style.opacity='1';
			aSpan[i].style.transition='none';
			aSpan[i].style.transform='';
			aSpan[i].style.backgroundImage='url(img/'+iNow%5+'.jpg)';
			oBox.style.backgroundImage='url(img/'+(iNow+1)%5+'.jpg)';
		}
	},false);
}