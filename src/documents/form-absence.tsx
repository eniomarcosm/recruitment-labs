/* eslint-disable @next/next/no-head-element */

import React from 'react'
import penalizations from 'src/constants/penalizations'
import { PrintDataProps, abbreviateName } from 'src/types/pages/generalData'

interface AbsenceFormProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PrintDataProps
}

export const AbsenceForm = React.forwardRef<HTMLDivElement, AbsenceFormProps>((props, ref) => {
  const { data, ...rest } = props

  const {
    name,
    department,
    staff_code,
    request_date,
    reason,
    start_date,
    end_date,
    return_time,
    superior,
    human_resources,
    director
  } = data

  const sactions = human_resources?.sactions || []

  return (
    <div ref={ref} {...rest}>
      <html key='1'>
        <head>
          <meta charSet='utf-8' />
          <meta content='pdf2htmlEX' name='generator' />
          <meta content='IE=edge,chrome=1' httpEquiv='X-UA-Compatible' />
          <style
            dangerouslySetInnerHTML={{
              __html:
                "/*!  * Base CSS for pdf2htmlEX * Copyright 2012,2013 Lu Wang <coolwanglu@gmail.com>  * https://github.com/pdf2htmlEX/pdf2htmlEX/blob/master/share/LICENSE */#sidebar{position:absolute;top:0;left:0;bottom:0;width:250px;padding:0;margin:0;overflow:auto}#page-container{position:absolute;top:0;left:0;margin:0;padding:0;border:0}@media screen{#sidebar.opened+#page-container{left:250px}#page-container{bottom:0;right:0;overflow:auto}.loading-indicator{display:none}.loading-indicator.active{display:block;position:absolute;width:64px;height:64px;top:50%;left:50%;margin-top:-32px;margin-left:-32px}.loading-indicator img{position:absolute;top:0;left:0;bottom:0;right:0}}@media print{@page{margin:0}html{margin:0}body{margin:0;-webkit-print-color-adjust:exact}#sidebar{display:none}#page-container{width:auto;height:auto;overflow:visible;background-color:transparent}.d{display:none}}.pf{position:relative;background-color:white;overflow:hidden;margin:0;border:0}.pc{position:absolute;border:0;padding:0;margin:0;top:0;left:0;width:100%;height:100%;overflow:hidden;display:block;transform-origin:0 0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0}.pc.opened{display:block}.bf{position:absolute;border:0;margin:0;top:0;bottom:0;width:100%;height:100%;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;user-select:none}.bi{position:absolute;border:0;margin:0;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;user-select:none}@media print{.pf{margin:0;box-shadow:none;page-break-after:always;page-break-inside:avoid}@-moz-document url-prefix(){.pf{overflow:visible;border:1px solid #fff}.pc{overflow:visible}}}.c{position:absolute;border:0;padding:0;margin:0;overflow:hidden;display:block}.t{position:absolute;white-space:pre;font-size:1px;transform-origin:0 100%;-ms-transform-origin:0 100%;-webkit-transform-origin:0 100%;unicode-bidi:bidi-override;-moz-font-feature-settings:\"liga\" 0}.t:after{content:''}.t:before{content:'';display:inline-block}.t span{position:relative;unicode-bidi:bidi-override}._{display:inline-block;color:transparent;z-index:-1}::selection{background:rgba(127,255,255,0.4)}::-moz-selection{background:rgba(127,255,255,0.4)}.pi{display:none}.d{position:absolute;transform-origin:0 100%;-ms-transform-origin:0 100%;-webkit-transform-origin:0 100%}.it{border:0;background-color:rgba(255,255,255,0.0)}.ir:hover{cursor:pointer}"
            }}
            type='text/css'
          />
          <style
            dangerouslySetInnerHTML={{
              __html:
                '/*!  * Fancy styles for pdf2htmlEX * Copyright 2012,2013 Lu Wang <coolwanglu@gmail.com>  * https://github.com/pdf2htmlEX/pdf2htmlEX/blob/master/share/LICENSE */@keyframes fadein{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadein{from{opacity:0}to{opacity:1}}@keyframes swing{0{transform:rotate(0)}10%{transform:rotate(0)}90%{transform:rotate(720deg)}100%{transform:rotate(720deg)}}@-webkit-keyframes swing{0{-webkit-transform:rotate(0)}10%{-webkit-transform:rotate(0)}90%{-webkit-transform:rotate(720deg)}100%{-webkit-transform:rotate(720deg)}}@media screen{#sidebar{background-color:#2f3236;background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjNDAzYzNmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiMxZTI5MmQiPjwvcGF0aD4KPC9zdmc+")}#outline{font-family:Georgia,Times,"Times New Roman",serif;font-size:13px;margin:2em 1em}#outline ul{padding:0}#outline li{list-style-type:none;margin:1em 0}#outline li>ul{margin-left:1em}#outline a,#outline a:visited,#outline a:hover,#outline a:active{line-height:1.2;color:#e8e8e8;text-overflow:ellipsis;white-space:nowrap;text-decoration:none;display:block;overflow:hidden;outline:0}#outline a:hover{color:#0cf}#page-container{background-color:#9e9e9e;background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=");-webkit-transition:left 500ms;transition:left 500ms}.pf{margin:13px auto;box-shadow:1px 1px 3px 1px #333;border-collapse:separate}.pc.opened{-webkit-animation:fadein 100ms;animation:fadein 100ms}.loading-indicator.active{-webkit-animation:swing 1.5s ease-in-out .01s infinite alternate none;animation:swing 1.5s ease-in-out .01s infinite alternate none}.checked{background:no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3goQDSYgDiGofgAAAslJREFUOMvtlM9LFGEYx7/vvOPM6ywuuyPFihWFBUsdNnA6KLIh+QPx4KWExULdHQ/9A9EfUodYmATDYg/iRewQzklFWxcEBcGgEplDkDtI6sw4PzrIbrOuedBb9MALD7zv+3m+z4/3Bf7bZS2bzQIAcrmcMDExcTeXy10DAFVVAQDksgFUVZ1ljD3yfd+0LOuFpmnvVVW9GHhkZAQcxwkNDQ2FSCQyRMgJxnVdy7KstKZpn7nwha6urqqfTqfPBAJAuVymlNLXoigOhfd5nmeiKL5TVTV+lmIKwAOA7u5u6Lped2BsbOwjY6yf4zgQQkAIAcedaPR9H67r3uYBQFEUFItFtLe332lpaVkUBOHK3t5eRtf1DwAwODiIubk5DA8PM8bYW1EU+wEgCIJqsCAIQAiB7/u253k2BQDDMJBKpa4mEon5eDx+UxAESJL0uK2t7XosFlvSdf0QAEmlUnlRFJ9Waho2Qghc1/U9z3uWz+eX+Wr+lL6SZfleEAQIggA8z6OpqSknimIvYyybSCReMsZ6TislhCAIAti2Dc/zejVNWwCAavN8339j27YbTg0AGGM3WltbP4WhlRWq6Q/btrs1TVsYHx+vNgqKoqBUKn2NRqPFxsbGJzzP05puUlpt0ukyOI6z7zjOwNTU1OLo6CgmJyf/gA3DgKIoWF1d/cIY24/FYgOU0pp0z/Ityzo8Pj5OTk9PbwHA+vp6zWghDC+VSiuRSOQgGo32UErJ38CO42wdHR09LBQK3zKZDDY2NupmFmF4R0cHVlZWlmRZ/iVJUn9FeWWcCCE4ODjYtG27Z2Zm5juAOmgdGAB2d3cBADs7O8uSJN2SZfl+WKlpmpumaT6Yn58vn/fs6XmbhmHMNjc3tzDGFI7jYJrm5vb29sDa2trPC/9aiqJUy5pOp4f6+vqeJ5PJBAB0dnZe/t8NBajx/z37Df5OGX8d13xzAAAAAElFTkSuQmCC)}}'
            }}
            type='text/css'
          />
          <style
            dangerouslySetInnerHTML={{
              __html:
            }}
            type='text/css'
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                '/* Copyright 2012 Mozilla Foundation  Copyright 2013 Lu Wang <coolwanglu@gmail.com> Apachine License Version 2.0 */(function(){function b(a,b,e,f){var c=(a.className||"").split(/s+/g);""===c[0]&&c.shift();var d=c.indexOf(b);0>d&&e&&c.push(b);0<=d&&f&&c.splice(d,1);a.className=c.join(" ");return 0<=d}if(!("classList"in document.createElement("div"))){var e={add:function(a){b(this.element,a,!0,!1)},contains:function(a){return b(this.element,a,!1,!1)},remove:function(a){b(this.element,a,!1,!0)},toggle:function(a){b(this.element,a,!0,!0)}};Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){if(this._classList)return this._classList;var a=Object.create(e,{element:{value:this,writable:!1,enumerable:!0}});Object.defineProperty(this,"_classList",{value:a,writable:!1,enumerable:!1});return a},enumerable:!0})}})();'
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                '(function(){/* pdf2htmlEX.js: Core UI functions for pdf2htmlEX  Copyright 2012,2013 Lu Wang <coolwanglu@gmail.com> and other contributors  https://github.com/pdf2htmlEX/pdf2htmlEX/blob/master/share/LICENSE */var pdf2htmlEX=window.pdf2htmlEX=window.pdf2htmlEX||{},CSS_CLASS_NAMES={page_frame:"pf",page_content_box:"pc",page_data:"pi",background_image:"bi",link:"l",input_radio:"ir",__dummy__:"no comma"},DEFAULT_CONFIG={container_id:"page-container",sidebar_id:"sidebar",outline_id:"outline",loading_indicator_cls:"loading-indicator",preload_pages:3,render_timeout:100,scale_step:0.9,key_handler:!0,hashchange_handler:!0,view_history_handler:!0,__dummy__:"no comma"},EPS=1E-6;function invert(a){var b=a[0]*a[3]-a[1]*a[2];return[a[3]/b,-a[1]/b,-a[2]/b,a[0]/b,(a[2]*a[5]-a[3]*a[4])/b,(a[1]*a[4]-a[0]*a[5])/b]}function transform(a,b){return[a[0]*b[0]+a[2]*b[1]+a[4],a[1]*b[0]+a[3]*b[1]+a[5]]}function get_page_number(a){return parseInt(a.getAttribute("data-page-no"),16)}function disable_dragstart(a){for(var b=0,c=a.length;b<c;++b)a[b].addEventListener("dragstart",function(){return!1},!1)}function clone_and_extend_objs(a){for(var b={},c=0,e=arguments.length;c<e;++c){var h=arguments[c],d;for(d in h)h.hasOwnProperty(d)&&(b[d]=h[d])}return b}function Page(a){if(a){this.shown=this.loaded=!1;this.page=a;this.num=get_page_number(a);this.original_height=a.clientHeight;this.original_width=a.clientWidth;var b=a.getElementsByClassName(CSS_CLASS_NAMES.page_content_box)[0];b&&(this.content_box=b,this.original_scale=this.cur_scale=this.original_height/b.clientHeight,this.page_data=JSON.parse(a.getElementsByClassName(CSS_CLASS_NAMES.page_data)[0].getAttribute("data-data")),this.ctm=this.page_data.ctm,this.ictm=invert(this.ctm),this.loaded=!0)}}Page.prototype={hide:function(){this.loaded&&this.shown&&(this.content_box.classList.remove("opened"),this.shown=!1)},show:function(){this.loaded&&!this.shown&&(this.content_box.classList.add("opened"),this.shown=!0)},rescale:function(a){this.cur_scale=0===a?this.original_scale:a;this.loaded&&(a=this.content_box.style,a.msTransform=a.webkitTransform=a.transform="scale("+this.cur_scale.toFixed(3)+")");a=this.page.style;a.height=this.original_height*this.cur_scale+"px";a.width=this.original_width*this.cur_scale+"px"},view_position:function(){var a=this.page,b=a.parentNode;return[b.scrollLeft-a.offsetLeft-a.clientLeft,b.scrollTop-a.offsetTop-a.clientTop]},height:function(){return this.page.clientHeight},width:function(){return this.page.clientWidth}};function Viewer(a){this.config=clone_and_extend_objs(DEFAULT_CONFIG,0<arguments.length?a:{});this.pages_loading=[];this.init_before_loading_content();var b=this;document.addEventListener("DOMContentLoaded",function(){b.init_after_loading_content()},!1)}Viewer.prototype={scale:1,cur_page_idx:0,first_page_idx:0,init_before_loading_content:function(){this.pre_hide_pages()},initialize_radio_button:function(){for(var a=document.getElementsByClassName(CSS_CLASS_NAMES.input_radio),b=0;b<a.length;b++)a[b].addEventListener("click",function(){this.classList.toggle("checked")})},init_after_loading_content:function(){this.sidebar=document.getElementById(this.config.sidebar_id);this.outline=document.getElementById(this.config.outline_id);this.container=document.getElementById(this.config.container_id);this.loading_indicator=document.getElementsByClassName(this.config.loading_indicator_cls)[0];for(var a=!0,b=this.outline.childNodes,c=0,e=b.length;c<e;++c)if("ul"===b[c].nodeName.toLowerCase()){a=!1;break}a||this.sidebar.classList.add("opened");this.find_pages();if(0!=this.pages.length){disable_dragstart(document.getElementsByClassName(CSS_CLASS_NAMES.background_image));this.config.key_handler&&this.register_key_handler();var h=this;this.config.hashchange_handler&&window.addEventListener("hashchange",function(a){h.navigate_to_dest(document.location.hash.substring(1))},!1);this.config.view_history_handler&&window.addEventListener("popstate",function(a){a.state&&h.navigate_to_dest(a.state)},!1);this.container.addEventListener("scroll",function(){h.update_page_idx();h.schedule_render(!0)},!1);[this.container,this.outline].forEach(function(a){a.addEventListener("click",h.link_handler.bind(h),!1)});this.initialize_radio_button();this.render()}},find_pages:function(){for(var a=[],b={},c=this.container.childNodes,e=0,h=c.length;e<h;++e){var d=c[e];d.nodeType===Node.ELEMENT_NODE&&d.classList.contains(CSS_CLASS_NAMES.page_frame)&&(d=new Page(d),a.push(d),b[d.num]=a.length-1)}this.pages=a;this.page_map=b},load_page:function(a,b,c){var e=this.pages;if(!(a>=e.length||(e=e[a],e.loaded||this.pages_loading[a]))){var e=e.page,h=e.getAttribute("data-page-url");if(h){this.pages_loading[a]=!0;var d=e.getElementsByClassName(this.config.loading_indicator_cls)[0];"undefined"===typeof d&&(d=this.loading_indicator.cloneNode(!0),d.classList.add("active"),e.appendChild(d));var f=this,g=new XMLHttpRequest;g.open("GET",h,!0);g.onload=function(){if(200===g.status||0===g.status){var b=document.createElement("div");b.innerHTML=g.responseText;for(var d=null,b=b.childNodes,e=0,h=b.length;e<h;++e){var p=b[e];if(p.nodeType===Node.ELEMENT_NODE&&p.classList.contains(CSS_CLASS_NAMES.page_frame)){d=p;break}}b=f.pages[a];f.container.replaceChild(d,b.page);b=new Page(d);f.pages[a]=b;b.hide();b.rescale(f.scale);disable_dragstart(d.getElementsByClassName(CSS_CLASS_NAMES.background_image));f.schedule_render(!1);c&&c(b)}delete f.pages_loading[a]};g.send(null)}void 0===b&&(b=this.config.preload_pages);0<--b&&(f=this,setTimeout(function(){f.load_page(a+1,b)},0))}},pre_hide_pages:function(){var a="@media screen{."+CSS_CLASS_NAMES.page_content_box+"{display:none;}}",b=document.createElement("style");b.styleSheet?b.styleSheet.cssText=a:b.appendChild(document.createTextNode(a));document.head.appendChild(b)},render:function(){for(var a=this.container,b=a.scrollTop,c=a.clientHeight,a=b-c,b=b+c+c,c=this.pages,e=0,h=c.length;e<h;++e){var d=c[e],f=d.page,g=f.offsetTop+f.clientTop,f=g+f.clientHeight;g<=b&&f>=a?d.loaded?d.show():this.load_page(e):d.hide()}},update_page_idx:function(){var a=this.pages,b=a.length;if(!(2>b)){for(var c=this.container,e=c.scrollTop,c=e+c.clientHeight,h=-1,d=b,f=d-h;1<f;){var g=h+Math.floor(f/2),f=a[g].page;f.offsetTop+f.clientTop+f.clientHeight>=e?d=g:h=g;f=d-h}this.first_page_idx=d;for(var g=h=this.cur_page_idx,k=0;d<b;++d){var f=a[d].page,l=f.offsetTop+f.clientTop,f=f.clientHeight;if(l>c)break;f=(Math.min(c,l+f)-Math.max(e,l))/f;if(d===h&&Math.abs(f-1)<=EPS){g=h;break}f>k&&(k=f,g=d)}this.cur_page_idx=g}},schedule_render:function(a){if(void 0!==this.render_timer){if(!a)return;clearTimeout(this.render_timer)}var b=this;this.render_timer=setTimeout(function(){delete b.render_timer;b.render()},this.config.render_timeout)},register_key_handler:function(){var a=this;window.addEventListener("DOMMouseScroll",function(b){if(b.ctrlKey){b.preventDefault();var c=a.container,e=c.getBoundingClientRect(),c=[b.clientX-e.left-c.clientLeft,b.clientY-e.top-c.clientTop];a.rescale(Math.pow(a.config.scale_step,b.detail),!0,c)}},!1);window.addEventListener("keydown",function(b){var c=!1,e=b.ctrlKey||b.metaKey,h=b.altKey;switch(b.keyCode){case 61:case 107:case 187:e&&(a.rescale(1/a.config.scale_step,!0),c=!0);break;case 173:case 109:case 189:e&&(a.rescale(a.config.scale_step,!0),c=!0);break;case 48:e&&(a.rescale(0,!1),c=!0);break;case 33:h?a.scroll_to(a.cur_page_idx-1):a.container.scrollTop-=a.container.clientHeight;c=!0;break;case 34:h?a.scroll_to(a.cur_page_idx+1):a.container.scrollTop+=a.container.clientHeight;c=!0;break;case 35:a.container.scrollTop=a.container.scrollHeight;c=!0;break;case 36:a.container.scrollTop=0,c=!0}c&&b.preventDefault()},!1)},rescale:function(a,b,c){var e=this.scale;this.scale=a=0===a?1:b?e*a:a;c||(c=[0,0]);b=this.container;c[0]+=b.scrollLeft;c[1]+=b.scrollTop;for(var h=this.pages,d=h.length,f=this.first_page_idx;f<d;++f){var g=h[f].page;if(g.offsetTop+g.clientTop>=c[1])break}g=f-1;0>g&&(g=0);var g=h[g].page,k=g.clientWidth,f=g.clientHeight,l=g.offsetLeft+g.clientLeft,m=c[0]-l;0>m?m=0:m>k&&(m=k);k=g.offsetTop+g.clientTop;c=c[1]-k;0>c?c=0:c>f&&(c=f);for(f=0;f<d;++f)h[f].rescale(a);b.scrollLeft+=m/e*a+g.offsetLeft+g.clientLeft-m-l;b.scrollTop+=c/e*a+g.offsetTop+g.clientTop-c-k;this.schedule_render(!0)},fit_width:function(){var a=this.cur_page_idx;this.rescale(this.container.clientWidth/this.pages[a].width(),!0);this.scroll_to(a)},fit_height:function(){var a=this.cur_page_idx;this.rescale(this.container.clientHeight/this.pages[a].height(),!0);this.scroll_to(a)},get_containing_page:function(a){for(;a;){if(a.nodeType===Node.ELEMENT_NODE&&a.classList.contains(CSS_CLASS_NAMES.page_frame)){a=get_page_number(a);var b=this.page_map;return a in b?this.pages[b[a]]:null}a=a.parentNode}return null},link_handler:function(a){var b=a.target,c=b.getAttribute("data-dest-detail");if(c){if(this.config.view_history_handler)try{var e=this.get_current_view_hash();window.history.replaceState(e,"","#"+e);window.history.pushState(c,"","#"+c)}catch(h){}this.navigate_to_dest(c,this.get_containing_page(b));a.preventDefault()}},navigate_to_dest:function(a,b){try{var c=JSON.parse(a)}catch(e){return}if(c instanceof Array){var h=c[0],d=this.page_map;if(h in d){for(var f=d[h],h=this.pages[f],d=2,g=c.length;d<g;++d){var k=c[d];if(null!==k&&"number"!==typeof k)return}for(;6>c.length;)c.push(null);var g=b||this.pages[this.cur_page_idx],d=g.view_position(),d=transform(g.ictm,[d[0],g.height()-d[1]]),g=this.scale,l=[0,0],m=!0,k=!1,n=this.scale;switch(c[1]){case "XYZ":l=[null===c[2]?d[0]:c[2]*n,null===c[3]?d[1]:c[3]*n];g=c[4];if(null===g||0===g)g=this.scale;k=!0;break;case "Fit":case "FitB":l=[0,0];k=!0;break;case "FitH":case "FitBH":l=[0,null===c[2]?d[1]:c[2]*n];k=!0;break;case "FitV":case "FitBV":l=[null===c[2]?d[0]:c[2]*n,0];k=!0;break;case "FitR":l=[c[2]*n,c[5]*n],m=!1,k=!0}if(k){this.rescale(g,!1);var p=this,c=function(a){l=transform(a.ctm,l);m&&(l[1]=a.height()-l[1]);p.scroll_to(f,l)};h.loaded?c(h):(this.load_page(f,void 0,c),this.scroll_to(f))}}}},scroll_to:function(a,b){var c=this.pages;if(!(0>a||a>=c.length)){c=c[a].view_position();void 0===b&&(b=[0,0]);var e=this.container;e.scrollLeft+=b[0]-c[0];e.scrollTop+=b[1]-c[1]}},get_current_view_hash:function(){var a=[],b=this.pages[this.cur_page_idx];a.push(b.num);a.push("XYZ");var c=b.view_position(),c=transform(b.ictm,[c[0],b.height()-c[1]]);a.push(c[0]/this.scale);a.push(c[1]/this.scale);a.push(this.scale);return JSON.stringify(a)}};pdf2htmlEX.Viewer=Viewer;})();'
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: 'try{pdf2htmlEX.defaultViewer = new pdf2htmlEX.Viewer({});}catch(e){}'
            }}
          />
          <title />
        </head>
        <body>
          <div id='sidebar'>
            <div id='outline' />
          </div>
          <div id='page-container'>
            <div className='pf w0 h0' data-page-no='1' id='pf1'>
              <div className='pc pc1 w0 h0'>
                <img
                  alt=''
                  className='bi x0 y0 w1 h1'
                  src='data:image/png;base64,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ABhlbwnL8Ws6wPs4IQLwJvaWAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAAC8324EsJokhgAAQC/2lgAAAIyyt4SFVJUhAADQkb0lAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAAObZjQCA7pIYQjtVZQgAT2JvCQAAwCh7SwAewh6sC3tmgEeytwQAAEBbAgAAoC0BAADQlgAAAHy6ls/y8QwA4H6eEwMA8AN7SwAAAEY1fgeJHQJwD2clAAD+yd4SAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYLUcf4AAACyklEQVQAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAID/tfe99CTuH3DzZ05VGQUAwKPaEuBOqhIA4Glt6RseAH9zngUAJvJ/SwAAAEY5EwtAe86zAIC2BIDXXdd1HIc5+C0AgOmyyOe7BzACAAD0zSv/twQAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAADM5f2WAADANH/elsFrlnqJo7YEAADUEaOciQUAAEBbAgAAMJszsQAA7+KPZAxyXhRtCQCAMAA+iDOxAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAgLnWegfJeZ5uCQAAQDv2lgAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAADQWapqietItm1b5GIAAAAaZ96MvLK3BAAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAACfYV/qapK4JQAAAO3YWwIAADAqVWUKAAAAjLC3BAAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAACAFyUxBAAAAEZ9AZKAwX6w+V7xAAAAAElFTkSuQmCC'
                />
                <div className='t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0'>
                  SECÇAO
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='ls2 ws2'>DE</span> <span className='_ _0' />
                    <span className='ls2 ws2'>
                      RECURS
                      <span className='_ _1' />
                      OS
                      <span className='ls1 ws1'>
                        {' '}
                        <span className='ls3 ws3'>
                          HUM
                          <span className='_ _1' />
                          ANOS
                        </span>{' '}
                      </span>
                    </span>
                  </span>
                </div>
                <div className='t m0 x2 h2 y2 ff1 fs0 fc0 sc0 ls4 ws4'>
                  MO
                  <span className='_ _1' />
                  DE
                  <span className='_ _1' />
                  LO
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='ls2 ws2'>DE</span> <span className='ls0 ws0'>PEDIDO</span>{' '}
                    <span className='ls3 ws3'>DE</span> <span className='ls0 ws0'>DISPENSA</span>{' '}
                    <span className='_ _2' />E{' '}
                    <span className='ls5 ws5'>
                      JU
                      <span className='_ _1' />
                      S
                      <span className='_ _1' />
                      T
                      <span className='_ _1' />
                      I
                      <span className='_ _1' />
                      F
                      <span className='_ _1' />
                      I
                      <span className='_ _1' />
                      C
                      <span className='_ _3' />
                      AÇ
                      <span className='_ _1' />
                      ÃO
                      <span className='_ _3' />
                    </span>{' '}
                    <span className='ls2 ws2'>DE</span> <span className='_ _0' />
                    <span className='ls6 ws6'>
                      F
                      <span className='_ _1' />
                      AL
                      <span className='_ _3' />
                      T
                      <span className='_ _1' />
                      AS
                      <span className='_ _3' />
                      <span className='ls1 ws1'> </span>
                    </span>
                  </span>
                </div>
                <div className='t m0 x3 h3 y3 ff2 fs1 fc0 sc0 ls7 ws7'>
                  CODIGO
                  <span className='ws8'> T</span>
                  RAB:
                  <span className='ls1 ws9'>{staff_code} </span>
                </div>
                <div className='t m0 x4 h3 y4 ff2 fs1 fc0 sc0 ls7 wsa'>
                  NOME
                  <span className='ff3'>:</span>
                  <span style={{ marginLeft: '10px', fontWeight: 'normal', fontFamily: 'serif' }} className='ls1 wsb'>
                    {name}
                    <span className='_ _4' />
                    <span className='ff4 ws1'> </span>
                  </span>
                </div>
                <div className='t m0 x5 h3 y5 ff2 fs1 fc0 sc0 ls7 wsc'>CATEGORIA PROFISSIONAL/OCUPACIONAL: </div>
                <span>Helo</span>

                <div className='t m0 x5 h3 y6 ff2 fs1 fc0 sc0 ls7 wsa'>
                  DIRECÇÃO/DEPTº
                  <span className='ff3'>:</span>
                </div>
                <div
                  style={{ marginLeft: '10px', fontWeight: 'normal', fontFamily: 'serif' }}
                  className='t m0 x6 h3 y7 ff2 fs1 fc0 sc0 ls1 wsd'
                >
                  {department}
                  <span className='_ _5' />
                  <span className='ff4 ws1'> </span>
                </div>
                <div className='t m0 x7 h3 y8 ff2 fs1 fc0 sc0 ls7 wsa'>
                  DATA
                  <span className='ff3'>:</span>
                  {request_date}
                </div>
                <div className='t m0 x8 h3 y9 ff2 fs1 fc0 sc0 ls8 wse'>
                  Descriçâo
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='_ _0' />
                    <span className='ls9 wsf'>
                      dos
                      <span className='ls1 ws1'>
                        {' '}
                        <span className='lsa ws10'>
                          m
                          <span className='_ _0' />
                          otivos
                          <span className='_ _0' />
                          <span className='ls1 ws1'>
                            {' '}
                            <span className='_ _0' />
                            <span className='ls9 wsf'>
                              de
                              <span className='ls1 ws1'>
                                {' '}
                                <span className='lsb ws11'>ausência:</span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span
                    style={{
                      position: 'fixed',
                      left: '10px',
                      top: '70px',
                      width: '254%',
                      fontWeight: 'normal',
                      fontFamily: 'serif',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                      whiteSpace: 'normal',
                      padding: '10px'
                    }}
                  >
                    {reason}
                  </span>
                </div>
                <div className='t m0 x9 h3 ya ff2 fs1 fc0 sc0 ls7 wsa'>
                  DATAS
                  <span className='ls1 ws12'> </span>
                  DE
                  <span className='ls1 ws13'>
                    {' '}
                    <span className='lsc ws14'>
                      AUSÊNCIA
                      <span className='ff3'>:</span>
                    </span>
                    <span className='ws15'></span>
                  </span>
                  <span style={{ position: 'fixed', right: '140px', top: '70px' }}>{start_date}</span>
                </div>
                <div className='t m0 xa h3 yb ff2 fs1 fc0 sc0 lsd ws16'>
                  AO
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='lse ws17'>DIA</span>
                  </span>
                  <span style={{ position: 'fixed', right: '-45px', top: '81px' }}>{end_date}</span>
                </div>
                <div className='t m0 xb h3 yc ff2 fs1 fc0 sc0 lsd ws16'>
                  HORAS
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='_ _0' />
                    <span className='lsd ws16'>
                      DE
                      <span className='ls1 ws1'>
                        {' '}
                        <span className='_ _0' />
                        <span className='ls9 wsf'>
                          REGRESSO:
                          <span className='_ _1' />
                          <span className='ls1 ws1'>
                            {return_time}
                            <span className='ff4'> </span>
                            HR
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </div>
                <div className='t m0 xc h4 yd ff5 fs2 fc0 sc0 ls10 ws19'>
                  Assinatu
                  <span className='_ _1' />
                  ra
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='ls11 ws1a'>do</span> <span className='_ _0' />
                    <span className='ls11 ws1a'>
                      Trabal
                      <span className='_ _1' />
                      hado
                      <span className='_ _1' />
                      r:
                      <span className='ls1 ws1'>
                        <span className='ff4'>
                          <span
                            style={{
                              paddingLeft: '25px',
                              bottom: '2px',
                              width: '780px',

                              position: 'fixed',
                              fontWeight: 'normal',
                              fontFamily: 'serif',
                              fontStyle: 'italic',
                              wordWrap: 'break-word',
                              wordBreak: 'break-all',
                              whiteSpace: 'normal'
                            }}
                          >
                            {abbreviateName(name)}
                          </span>{' '}
                        </span>
                      </span>
                    </span>
                  </span>
                </div>
                <div className='t m0 xd h5 ye ff2 fs2 fc0 sc0 ls12 ws1b'>
                  DATA
                  <span className='ff3'>:</span>
                </div>
                <div className='t m0 xe h5 yd ff2 fs2 fc0 sc0 ls1 ws1c'>{request_date} </div>
                <div className='t m0 xf h3 yf ff2 fs1 fc0 sc0 lsb ws11'>
                  Parecer
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='_ _0' />
                    <span className='ls13 ws1d'>
                      do
                      <span className='ls1 ws1'>
                        {' '}
                        <span className='_ _0' />
                        <span className='ls13 ws1d'>
                          Superio
                          <span className='_ _1' />r
                          <span className='ls1 ws1'>
                            {' '}
                            <span className='lsb ws11'>Hierárquico:</span>{' '}
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span
                    style={{
                      position: 'fixed',
                      left: '10px',
                      top: '70px',
                      width: '380%',
                      fontWeight: 'normal',
                      fontFamily: 'serif',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                      whiteSpace: 'normal',
                      padding: '10px'
                    }}
                  >
                    {superior?.comment}
                  </span>
                </div>
                <div className='t m0 x10 h6 y10 ff5 fs1 fc0 sc0 ls14 ws1e'>
                  Assi
                  <span className='_ _1' />
                  natu
                  <span className='_ _1' />
                  ra:
                  <span className='_ _1' />
                  <span
                    className='ls1 ws1'
                    style={{
                      paddingLeft: '25px',
                      width: '780px',
                      position: 'fixed',
                      fontWeight: 'normal',
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                      whiteSpace: 'normal'
                    }}
                  >
                    {abbreviateName(superior?.name)}
                  </span>
                </div>
                <div className='t m0 x11 h3 y11 ff2 fs1 fc0 sc0 ls15 ws1f'>
                  DATA
                  <span className='ff3'>:</span>
                </div>
                <div style={{ marginLeft: '8px' }} className='t m0 x12 h3 y10 ff2 fs1 fc0 sc0 ls1 ws20'>
                  {superior?.updated_at?.toDate().toLocaleDateString('pt-BR')}
                </div>
                <div className='t m0 x5 h3 y12 ff2 fs1 fc0 sc0 lsa ws10'>Inf</div>
                <div className='t m0 x13 h3 y13 ff2 fs1 fc0 sc0 lsa ws10'>
                  ormaç
                  <span className='_ _0' />
                  âo
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='_ _0' />
                    <span className='ls9 wsf'>
                      dos
                      <span className='ls1 ws1'>
                        {' '}
                        <span className='_ _0' />
                        <span className='ls8 wse'>
                          Recursos
                          <span className='ls1 ws1'>
                            {' '}
                            <span className='_ _0' />
                            <span className='ls16 ws21'>
                              Hu
                              <span className='_ _1' />
                              ma
                              <span className='_ _3' />
                              no
                              <span className='_ _1' />
                              s:
                              <span className='_ _1' />
                              <span className='ls1 ws1'> </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span
                      style={{
                        position: 'fixed',
                        left: '-80px',
                        top: '60px',
                        width: '290%',
                        fontWeight: 'normal',
                        fontFamily: 'serif',
                        wordWrap: 'break-word',
                        wordBreak: 'break-all',
                        whiteSpace: 'normal',
                        padding: '10px'
                      }}
                    >
                      {human_resources?.comment}
                    </span>
                  </span>
                </div>
                <div className='t m0 x14 h3 y14 ff2 fs1 fc0 sc0 ls8 wse'>
                  Penalizaçôes
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='_ _2' />
                    <span className='ls13 ws1d'>
                      Consequ
                      <span className='_ _1' />
                      ente
                      <span className='_ _1' />s
                    </span>
                  </span>
                </div>
                <div className='t m0 x15 h3 y13 ff2 fs1 fc0 sc0 ls1 ws1'></div>
                <div className='t m0 x16 h7 y15 ff4 fs1 fc0 sc0 ls17 ws22'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={sactions.includes(penalizations?.admoestacao_verbal)}
                  />
                  Admoestaçâo Verbal
                </div>
                <div className='t m0 x16 h7 y16 ff4 fs1 fc0 sc0 ls17 ws22'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={sactions.includes(penalizations?.repreensao_registada)}
                  />
                  Repreensâo
                  <span className='ls1 ws25'>
                    {' '}
                    <span className='ls19 ws26'>Registada </span>
                  </span>
                </div>
                <div className='t m0 x16 h7 y17 ff4 fs1 fc0 sc0 ls17 ws27'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={sactions.includes(penalizations?.desconto_ferias)}
                  />
                  Desconto
                  <span className='ws28'> n</span>
                  as
                  <span className='ws29'> F</span>
                  érias{' '}
                </div>
                <div className='t m0 x16 h7 y18 ff4 fs1 fc0 sc0 ls17 ws27'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={sactions.includes(penalizations?.desconto_salarial)}
                  />
                  Descontos
                  <span className='ws2a'> </span>
                  no
                  <span className='ws2b'> S</span>
                  alário{' '}
                </div>
                <div className='t m0 x16 h7 y19 ff4 fs1 fc0 sc0 ls17 ws22'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                  />
                  Desconto
                  <span className='ls1a ws2c'> </span>
                  Férias
                  <span className='ls1b ws2d'>
                    {' '}
                    <span className='ls1 ws1'>
                      e
                      <span className='ls1c ws2e'>
                        {' '}
                        <span className='ls1d ws2f'>Salário</span>
                      </span>{' '}
                    </span>
                  </span>
                </div>
                <div className='t m0 x17 h7 y1a ff4 fs1 fc0 sc0 ls17 ws22'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={sactions.includes(penalizations?.proceder_disciplinarmente)}
                  />
                  Proceder Disciplinarmente
                </div>
                <div className='t m0 x16 h7 y1c ff4 fs1 fc0 sc0 ls1f ws30'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={sactions.includes(penalizations?.arquivar)}
                  />
                  Arquivar
                </div>
                <div className='t m0 x19 h8 y1d ff6 fs2 fc0 sc0 ls20 ws31'>Chefe de Secçâo de RH</div>
                <div className='t m0 x1a h9 y1e ff3 fs2 fc0 sc0 ls12 ws1b'>
                  DATA: {human_resources?.updated_at?.toDate().toLocaleDateString('pt-BR')}
                </div>
                <div className='t m0 x1b h4 y1f ff4 fs2 fc0 sc0 ls1 ws2d'></div>

                <div className='t m0 x1c ha y20 ff7 fs1 fc0 sc0 ls19 ws26'>
                  DESPACHO
                  <span className='ff8 ws1'>:</span>
                  <span
                    style={{
                      position: 'fixed',
                      left: '10px',
                      top: '60px',
                      width: '450%',
                      fontWeight: 'normal',
                      fontFamily: 'serif',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                      whiteSpace: 'normal',
                      padding: '0px',
                      hyphens: 'auto',
                      letterSpacing: '2px',
                      lineHeight: 1
                    }}
                  >
                    {director?.comment}
                  </span>
                </div>
                <div></div>

                <div className='t m0 x1d h4 y21 ff4 fs2 fc0 sc0 ls23 ws38'>
                  {' '}
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                  />
                  Dispensa
                </div>

                <div className='c x1f y23 w2 hb'>
                  <div className='t m0 x20 h4 y24 ff4 fs2 fc0 sc0 ls24 ws39'>Tomei Conhecimento do Despacho</div>
                </div>
                <div className='t m0 x21 h8 y25 ff6 fs2 fc0 sc0 ls10 ws19'>
                  Assinatura
                  <span
                    className='ls1 ws3a'
                    style={{
                      left: '25px',
                      bottom: '40px',
                      width: '780px',

                      position: 'fixed',
                      fontWeight: 'normal',
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                      whiteSpace: 'normal'
                    }}
                  >
                    {abbreviateName(director?.name)}
                  </span>
                  <span className='ff9'>Reitor/VRA/VRT/Director/</span>
                  Gestor
                  <span className='ls1 ws3b'>
                    {' '}
                    <span className='ls21 ws33'>de</span>
                    <span className='ws3c'>
                      {' '}
                      <span className='ls20 ws31'>Centro</span>
                      <span className='ws3d'>
                        {' '}
                        <span className='ls21 ws33'>de</span>
                        <span className='ws3e'>
                          {' '}
                          <span className='ls23 ws38'>Recursos </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </div>
                <div className='t m0 x22 h4 y26 ff4 fs2 fc0 sc0 ls12 ws1b'>
                  DATA
                  <span className='ffa'>
                    :
                    <span
                      style={{
                        position: 'fixed',
                        left: '160px',
                        top: '-5px',
                        width: '380%',
                        fontWeight: 'normal',
                        fontFamily: 'serif',
                        wordWrap: 'break-word',
                        wordBreak: 'break-all',
                        whiteSpace: 'normal',
                        padding: '10px'
                      }}
                    >
                      {director?.updated_at?.toDate().toLocaleDateString('pt-BR')}
                    </span>
                  </span>
                  <span className='ls1 ws2d'></span>
                </div>
                <div className='t m0 x23 h4 y27 ff6 fs2 fc0 sc0 ls10 ws19'>
                  Ass.:
                  <span className='ls1 ws1'>
                    {' '}
                    <span className='_ _0' />
                    <span className='ff4'> </span>
                  </span>
                </div>
                <div className='t m0 x24 h4 y28 ff4 fs2 fc0 sc0 ls10 ws19'>
                  DATA
                  <span className='ls1 ws1'> </span>
                </div>
                <div className='c x1f y29 w2 hc'>
                  <div className='t m0 x25 hd y2a ffb fs3 fc0 sc0 ls25 ws3f'>
                    Nb:
                    <span className='ls1 ws1'>
                      {' '}
                      <span className='_ _7'> </span>O <span className='_ _0' />
                      <span className='ls26 ws40'>
                        trabalhador
                        <span className='ls1 ws1'>
                          {' '}
                          <span className='ls27 ws41'>
                            tem
                            <span className='_ _1' />
                          </span>{' '}
                        </span>
                        por
                        <span className='ls1 ws1'>
                          {' '}
                          <span className='_ _0' />
                          <span className='ls26 ws40'>
                            obrigaçâo
                            <span className='ls1 ws1'>
                              {' '}
                              <span className='ls28 ws42'>
                                jus
                                <span className='_ _0' />
                                tificar
                                <span className='ls1 ws1'>
                                  {' '}
                                  <span className='_ _0' />a <span className='_ _0' />
                                  <span className='ls29 ws43'>
                                    falta
                                    <span className='_ _0' />
                                    <span className='ls1 ws1'>
                                      {' '}
                                      <span className='_ _0' />
                                      <span className='ls27 ws41'>
                                        com
                                        <span className='_ _1' />
                                        <span className='ls1 ws1'>
                                          {' '}
                                          <span className='ls26 ws40'>suporte</span>{' '}
                                        </span>
                                        docu
                                        <span className='_ _0' />
                                        ment
                                        <span className='_ _1' />
                                        al.
                                        <span className='ls1 ws1'> </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
                <div className='t m0 x26 he y2b ff4 fs3 fc0 sc0 ls2a ws44'>
                  Deve
                  <span className='ls1 ws45'> </span>
                </div>
                <div className='t m0 x27 he y2c ff4 fs3 fc0 sc0 ls2a ws44'>
                  ser
                  <span className='ls1 ws46'>
                    {' '}
                    <span className='ls2b ws47'>preenchido</span>
                    <span className='ws48'> </span>
                  </span>
                  em
                  <span className='ls1 ws49'>
                    {' '}
                    <span className='ls2b ws47'>duplicado,</span>
                    <span className='ws4a'>
                      {' '}
                      <span className='ls2c ws4b'>original</span>
                      <span className='ws4c'>
                        {' '}
                        <span className='ls19 ws26'>para</span>
                        <span className='ws4d'>
                          {' '}
                          <span className='ffc ls2d ws4e'>
                            Depto <span className='ff4 ws4f'>RH</span>
                          </span>
                          <span className='ws50'>
                            {' '}
                            <span className='ws51'>
                              e <span className='ls2e ws52'>Cópia</span>
                              <span className='ws53'>
                                {' '}
                                <span className='ls2c ws4b'>para</span>
                                <span className='ws54'>
                                  {' '}
                                  <span className='ws1'>o </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </div>
                <div className='t m0 x26 he y2d ff4 fs3 fc0 sc0 ls2e ws52'>trabalhador. </div>
                <div className='c x1f y29 w2 hc'>
                  <div className='t m0 x0 hd y2e ffb fs3 fc0 sc0 ls25 ws3f'>No</div>
                </div>
                <div className='t m0 x28 hd y2f ffb fs3 fc0 sc0 ls1 ws1'>
                  {' '}
                  <span className='_ _0' />
                  <span className='ls2f ws55'>
                    caso
                    <span className='_ _0' />
                    <span className='ls1 ws1'>
                      {' '}
                      <span className='_ _0' />
                      <span className='ls26 ws40'>
                        de
                        <span className='ls1 ws1'> </span>
                        au
                        <span className='_ _0' />
                        sência
                        <span className='ls1 ws1'> </span>
                        prévia
                        <span className='ls1 ws1'>
                          {' '}
                          o
                          <span className='_ _0' /> <span className='ls26 ws40'>trabalhador</span>{' '}
                          <span className='_ _0' />
                          <span className='ls26 ws40'>
                            deve
                            <span className='ls1 ws1'>
                              {' '}
                              <span className='_ _0' />
                              <span className='ls26 ws40'>
                                preencher
                                <span className='ls1 ws1'>
                                  {' '}
                                  o <span className='_ _0' />
                                  <span className='ls26 ws40'>
                                    presente
                                    <span className='ls1 ws1'>
                                      {' '}
                                      <span className='ls27 ws41'>documento.</span>{' '}
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </div>

                <div className='t m0 x29 h7 y30 ffd fs1 fc0 sc0 ls1d ws1' style={{ marginInline: '-7px' }}>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={human_resources?.is_approved === 1 ? true : false}
                  />
                  Faltas Justificadas
                </div>
                <div className='t m0 x2a h7 y31 ffe fs1 fc0 sc0 ls1d ws1' style={{ marginInline: '-4px' }}>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={human_resources?.is_approved === 2 ? true : false}
                  />
                  Faltas Injustificadas
                  <span className='ffd'> </span>
                </div>
                <div className='t m0 x2b h7 y32 fff fs1 fc0 sc0 ls1d ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={human_resources?.reason === '1' ? true : false}
                  />
                  Faltas Por Doenças
                  <span className='ffd'> </span>
                </div>
                <div className='t m0 x2b h7 y33 ff10 fs1 fc0 sc0 ls1d ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={human_resources?.reason === '2' ? true : false}
                  />
                  Dias de Nojo/Falecimento
                </div>
                <div className='t m0 x2c hf y34 ff11 fs1 fc0 sc0 ls18 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                  />
                  Licença de Maternidade/Paternidade
                </div>
                <div className='t m0 x2c h7 y35 ff12 fs1 fc0 sc0 ls18 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={human_resources?.reason === '4' ? true : false}
                  />
                  Licença sem Venc.
                  <span className='ffc'> </span>
                </div>
                <div className='t m0 x2c h7 y36 ff13 fs1 fc0 sc0 ls18 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={human_resources?.reason === '5' ? true : false}
                  />
                  Desconto de Férias{' '}
                </div>
                <div className='t m0 x2c h7 y37 ff14 fs1 fc0 sc0 ls18 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={human_resources?.reason === '6' ? true : false}
                  />
                  Abandono de Lugar
                  <span className='ffc'> </span>
                </div>
                <div className='t m0 x2c h4 y38 ff15 fs2 fc0 sc0 ls20 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={human_resources?.reason === '7' ? true : false}
                  />
                  Outras Autorizadas
                </div>
                <div className='t m0 x2d h10 y39 ff16 fs2 fc0 sc0 ls30 ws1'>
                  Assinatura:
                  <span
                    className='ff17'
                    style={{
                      left: '15px',
                      bottom: '40px',
                      width: '780px',
                      position: 'fixed',
                      fontWeight: 'normal',
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                      whiteSpace: 'normal'
                    }}
                  >
                    {abbreviateName(human_resources?.name)}
                  </span>
                </div>

                <div className='t m0 x1d h8 y3b ff18 fs2 fc0 sc0 ls30 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={director?.is_approved === 1 ? true : false}
                  />
                  Autorizo
                </div>
                <div className='t m0 x1d h8 y3c ff19 fs2 fc0 sc0 ls30 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                    checked={director?.is_approved === 2 ? true : false}
                  />
                  N/Autorizo
                </div>
                <div className='t m0 x30 h8 y3e ff1a fs2 fc0 sc0 ls30 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                  />
                  Falta Justificada
                </div>
                <div className='t m0 x30 h4 y40 ff1b fs2 fc0 sc0 ls30 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                  />
                  Falta Injustificada
                </div>
                <div className='t m0 x30 h8 y42 ff1c fs2 fc0 sc0 ls23 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                  />
                  Falta por Doença
                </div>
                <div className='t m0 x1d h4 y43 ff1d fs2 fc0 sc0 ls23 ws1'>
                  <input
                    style={{
                      position: 'fixed',
                      left: '-50px',
                      bottom: '4px',
                      width: '20px',
                      height: '20px',
                      transform: 'scale(1.5)',
                      transformOrigin: 'top left'
                    }}
                    type='checkbox'
                  />
                  Falta por Nojo
                </div>
                <div className='t m0 x1d h10 y45 ff1e fs2 fc0 sc0 ls12 ws1'>Ou</div>
                <div className='t m0 x2e h10 y46 ff1e fs2 fc0 sc0 ls12 ws1'>tras</div>
              </div>
              <div className='pi' data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}' />
            </div>
          </div>
        </body>
      </html>
    </div>
  )
})