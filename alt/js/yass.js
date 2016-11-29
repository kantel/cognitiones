/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */

window.matchMedia = window.matchMedia || (function(doc, undefined){
  
  var bool,
      docElem  = doc.documentElement,
      refNode  = docElem.firstElementChild || docElem.firstChild,
      // fakeBody für <FF4 bei Ausführung im <head> erforderlich
      fakeBody = doc.createElement('body'),
      div      = doc.createElement('div');
  
  div.id = 'mq-test-1';
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.style.background = "none!important";
  fakeBody.appendChild(div);
  
  return function(q){

    div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';
    
    docElem.insertBefore(fakeBody, refNode);
    bool = div.offsetWidth == 42;
    docElem.removeChild(fakeBody);
    
    return { matches: bool, media: q };
  };
  
})(document);

var Utils = {
	classToggle : function(element, tclass) {
		var classes = element.className,
		pattern = new RegExp( tclass );
		hasClass = pattern.test( classes );
		// Klasse umschalten
		classes = hasClass ? classes.replace( pattern, '' ) : classes + ' ' + tclass;
		element.className = classes.trim();
	},
	q : function(q, res) {
		if (document.querySelectorAll) {
          res = document.querySelectorAll(q);
        } else {
			var d = document,
            a = d.styleSheets[0] || d.createStyleSheet();
          a.addRule(q,'f:b');
          for(var l=d.all,b=0,c=[],f=l.length;b<f;b++)
            l[b].currentStyle.f && c.push(l[b]);

          a.removeRule(0);
          res = c;
        }
        return res;
	},
	getEmbed : function(url){
		var output = '';
        
		var youtubeUrl = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
		var vimeoUrl = url.match(/^http:\/\/(www\.)?vimeo\.com\/(clip\:)?(\d+).*$/);
		if(youtubeUrl){
			output = '<div class="vid-wrapper"><iframe src="http://www.youtube.com/embed/'+youtubeUrl[1]+'?rel=0" frameborder="0" allowfullscreen></iframe></div>';
		} else if(vimeoUrl){
			output =  '<div class="vid-wrapper"><iframe src="http://player.vimeo.com/video/'+vimeoUrl[3]+'" frameborder="0"></iframe></div>';
		}

		return output;

    }
}
window.onload = function() {

	var nav = document.getElementById('nav');
	var navItem = nav.getElementsByTagName('li');
	// Ist es gefloated?
	var floated = navItem[0].currentStyle ? navItem[0].currentStyle['float'] : document.defaultView.getComputedStyle(navItem[0],null).getPropertyValue('float');
	
	// Navigation verbessern
	if (floated != 'left') {
		var collapse = document.getElementById('nav-collapse');
		
		Utils.classToggle(nav, 'hide');
		Utils.classToggle(collapse, 'active');
		collapse.onclick = function() {
			Utils.classToggle(nav, 'hide');
			return false;
		};
	}

	// Bilder verbessern
	if (window.matchMedia("(min-width: 37.5em)").matches) {
		// Bilder laden
		
		var lazy = Utils.q('[data-src]');
		for (var i = 0; i < lazy.length; i++) {
			var source = lazy[i].getAttribute('data-src');
			// Bild erstellen
			var img = new Image();
			img.src = source;
			// Innerhalb des Links einfügen
			lazy[i].insertBefore(img, lazy[i].firstChild);
		};

		// Video-Embed laden
		var videoLink = document.getElementById('video');
		if (videoLink) {
			var linkHref = videoLink.getAttribute('href');

			var result = Utils.getEmbed(linkHref);

			var parent = videoLink.parentNode;

			parent.innerHTML = result + videoLink.parentNode.innerHTML;

			parent.removeChild(document.getElementById('video'));
		}
		

	}
};