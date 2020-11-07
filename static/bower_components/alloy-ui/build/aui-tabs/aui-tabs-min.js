AUI.add("aui-tabs-base",function(o){var g=o.Lang,i=o.getClassName,f="tab",u="tabview",v="boundingBox",n="contentBox",e="contentNode",r=i(f),c=i(f,"content"),k=i(f,"label"),d=i(f,"disabled"),t=i(f,"active"),h=[i(u,"list"),i("widget","hd")].join(" "),s=[i(u,"content"),i("widget","bd")].join(" "),w=i("helper-hidden"),x="<div></div>",q="<ul></ul>",m="<em></em>",l=q,p=x,b=x;var j=o.Component.create({NAME:f,ATTRS:{label:{lazyAdd:false,valueFn:function(){var y=this;var A=y.get(v);var z=A.one("."+k);var B;if(z){B=z.html();y.set("labelNode",z);}else{B=A.html();A.html("");}return B;},setter:function(A){var y=this;var z=y.get("labelNode");z.html(A);return A;}},labelNode:{valueFn:function(){var y=this;var z=y.get(v).one("."+k);if(!z){z=y._createDefaultLabel();}y.get(n).appendChild(z);return z;},setter:function(A){var y=this;var z=o.one(A);if(!z){z=y._createDefaultLabel();y.get(n).appendChild(z);}z.addClass(k);return z;}},contentNode:{value:null,setter:function(A){var y=this;var z=o.one(A);if(!z){z=y._createDefaultContentEl();y.get(n).prepend(z);}z.addClass(s);var B=y.get(e);if(B){if(!y.get("active")){z.addClass(w);}var C=z.html();y.set("content",C);}return z;}},content:{lazyAdd:false,valueFn:function(){var z=this;var A="";var y=z.get(e);if(y){A=y.html();}return A;},setter:function(A){var y=this;var z=y.get(e);var B=z.html();if(B!=A){z.html(A);}return A;}},active:{valueFn:function(){var y=this;return y.get(v).hasClass(t);},validator:function(z){var y=this;return g.isBoolean(z)&&!y.get("disabled");},setter:function(B){var y=this;var A="addClass";var z=y.get(v);if(B===false){A="removeClass";}y.StateInteraction.set("active",B);z[A](t);y.set("contentVisible",B);return B;}},disabled:{valueFn:function(){var y=this;return y.get(v).hasClass(d);},setter:function(B){var y=this;var A="addClass";var z=y.get(v);if(B===false){A="removeClass";}z[A](d);return B;}},contentVisible:{value:false,setter:function(B){var z=this;var A="addClass";var y=z.get(e);if(B===true){A="removeClass";}if(!z.get("active")){y[A](w);}return B;}},tabView:{value:null}},prototype:{BOUNDING_TEMPLATE:"<li></li>",CONTENT_TEMPLATE:"<span></span>",bindUI:function(){var y=this;var z=y.get(v);z.plug(o.Plugin.StateInteraction,{bubbleTarget:y});z.StateInteraction.on("click",y._onActivateTab,y);y.StateInteraction=z.StateInteraction;y.get("labelNode").on("click",y._onLabelClick,y);},_createDefaultLabel:function(){var y=this;return o.Node.create(m);},_createDefaultContentEl:function(){var y=this;return o.Node.create(p);},_onActivateTab:function(A){var y=this;A.halt();if(y.get("disabled")){return;}var z=y.get("tabView");z.set("activeTab",y);},_onLabelClick:function(y){y.preventDefault();}}});o.Tab=j;var a=o.Component.create({NAME:u,ATTRS:{listNode:{value:null,setter:function(A){var y=this;var z=o.one(A);if(!z){z=y._createDefaultList();}y.get(n).prepend(z);z.addClass(h);return z;}},contentNode:{value:null,setter:function(A){var y=this;var z=o.one(A);if(!z){z=y._createDefaultContentContainer();}y.get(n).appendChild(z);z.addClass(s);return z;}},items:{value:[]},activeTab:{value:null,setter:function(A){var z=this;var y=z.get("activeTab");if(y){if(y!=A){y.set("active",false);}else{if(y.get("disabled")){A=null;}}}return A;}}},prototype:{renderUI:function(){var y=this;y.after("activeTabChange",y._onActiveTabChange);y._renderContentSections();y._renderTabs();},addTab:function(z,B){var F=this;var E=F.getTab(B);var D=F.get("items");if(g.isUndefined(B)){B=o.Array.indexOf(D,z);}var G=B>-1;if(!G){B=D.length;D.splice(B,0,z);}if(!F.get("rendered")&&!G){return;}if(!(z instanceof j)){z=new j(z);D.splice(B,1,z);}var A=F.get("listNode");z.render(A);z.set("tabView",F);if(E){A.insert(z.get(v),E.get(v));}else{A.appendChild(z.get(v));}var y=z.get(e);var C=F.get(e);if(!C.contains(y)){C.appendChild(y);}if(z.get("active")){F.set("activeTab",z);}},deselectTab:function(z){var y=this;if(y.getTab(z)===y.get("activeTab")){y.set("activeTab",null);}},disableTab:function(z){var y=this;var A;if(g.isNumber(z)){A=y.getTab(z);}else{A=z;}if(A){A.set("disabled",true);}},enableTab:function(z){var y=this;var A;if(g.isNumber(z)){A=y.getTab(z);}else{A=z;}if(A){A.set("disabled",false);}},getTab:function(z){var y=this;return y.get("items")[z];},getTabIndex:function(A){var y=this;var z=y.get("items");return o.Array.indexOf(z,A);},removeTab:function(B){var y=this;var C;if(g.isNumber(B)){C=y.getTab(B);}else{C=B;B=y.getTabIndex(C);}if(C){var z=y.get("items");var A=z.length;if(C===y.get("activeTab")){if(A>1){if(B+1===A){y.selectTab(B-1);}else{y.selectTab(B+1);}}else{y.set("activeTab",null);}}C.destroy();z.splice(B,1);}},selectTab:function(A){var y=this;var z=y.getTab(A);y.set("activeTab",z);},_createDefaultList:function(){var y=this;return o.Node.create(l);},_createDefaultContentContainer:function(){var y=this;return o.Node.create(b);},_onActiveTabChange:function(z){var y=this;var A=z.prevVal;var B=z.newVal;if(B){B.set("active",true);}if(B!=A){if(A){A.set("active",false);}}},_renderContentSections:function(){var y=this;y._renderSection("list");y._renderSection("content");},_renderSection:function(z){var y=this;y.get(z+"Node");},_renderTabs:function(){var G=this;var C=G.get(e);var A=G.get("listNode");var E=A.get("children");var z=C.get("children");var D=G.get("items");var F="."+c;E.each(function(K,J,I){var H={boundingBox:K,contentBox:K.one(F),contentNode:z.item(J)};D.splice(J,0,H);});var y=D.length;for(var B=0;B<D.length;B++){G.addTab(D[B]);}if(!G.get("activeTab")){G.selectTab(0);}}}});o.TabView=a;},"@VERSION@",{skinnable:true,requires:["aui-component","aui-state-interaction"]});AUI.add("aui-tabs-menu-plugin",function(m){var f=m.Lang,i=m.getClassName,d="tab",w="tabview",g="tabviewmenu",c="TabViewMenuPlugin",b="contentNode",v="host",j="listNode",a="rendered",r=i(d),h=i(w,"list"),s=i(w,"list","content"),o=i(g,"item"),p=i(g,"item","label"),n=i(g,"list"),k=i(g,"trigger"),u=i(w,"wrapper"),l="first",q="last",t="<ul></ul>",y='<li class="'+o+'" data-index="{0}"><a href="javascript:;" class="'+p+'">{1}</a></li>',e="<div></div>";
var x=m.Component.create({NAME:c,NS:g,EXTENDS:m.Plugin.Base,prototype:{initializer:function(){var z=this;z.afterHostMethod("renderUI",z.renderUI);z.afterHostMethod("bindUI",z.bindUI);z.afterHostMethod("addTab",z.addTab);z.afterHostMethod("removeTab",z.removeTab);z.afterHostMethod("selectTab",z.selectTab);z.afterHostMethod("_onActiveTabChange",z._onActiveTabChange);z.afterHostMethod("_renderTabs",z._renderTabs);z._updateMenuTask=m.debounce(z._updateMenu,1,z);z._updateUITask=m.debounce(z._updateUI,1,z);},bindUI:function(){var z=this;var A=z.get(v);m.on("windowresize",z._onWindowResize,z);},renderUI:function(){var z=this;var B=z.get(v);var A=B.get(j);var C=z._wrapper;z._listNodeOuterWidth=(parseFloat(A.getComputedStyle("marginLeft"))+parseFloat(C.getComputedStyle("borderLeftWidth"))+parseFloat(A.getComputedStyle("paddingLeft"))+parseFloat(A.getComputedStyle("paddingRight"))+parseFloat(C.getComputedStyle("borderRightWidth"))+parseFloat(A.getComputedStyle("marginRight")));z._updateUITask();},addTab:function(B,A){var z=this;var C=z.get(v);if(C.get(a)){z._updateUITask();}},removeTab:function(A){var z=this;var B=z.get(v);if(B.get(a)){z._updateUITask();}},selectTab:function(A){var z=this;z._updateMenuTask();z.fire("selectTab",{index:A});},_hideMenu:function(){var z=this;var B=z.get(v);var A=B.get(j);A.all("."+r).show();if(z._menuOverlay){z._menuOverlay.hide();z._triggerNode.hide();}},_onActiveTabChange:function(A){var z=this;z._updateMenuTask();},_onWindowResize:function(B){var A=this;if(A._menuNode){var z=A.get(v).get(b);A._contentWidth=z.get("offsetWidth")-A._listNodeOuterWidth;A._updateMenuTask();}else{A._updateUITask();}},_renderMenu:function(){var z=this;var A=m.Node.create(e);var B=m.Node.create(t);A.addClass(k);z._wrapper.append(A);var D=new m.OverlayContext({align:{points:["tr","br"]},contentBox:B,cancellableHide:true,cssClass:n,hideDelay:1000,hideOn:"mouseout",showDelay:0,showOn:"click",trigger:A}).render();D.refreshAlign();z._menuNode=B;z._triggerNode=A;z._menuOverlay=D;z.after("selectTab",D.hide,D);var C=z.get(v);B.delegate("click",function(F){var E=F.currentTarget.get("parentNode").attr("data-index");C.selectTab(E);},"li a");},_renderTabs:function(){var A=this;var E=A.get(v);var z=E.get(b);var D=E.get(j);D.removeClass(h);D.addClass(s);var C=E._createDefaultContentContainer();C.addClass(h);var B=E._createDefaultContentContainer();B.addClass(u);B.append(C);z.insert(B,D);C.append(D);A._wrapper=B;A._content=C;},_updateMenu:function(){var N=this;var O=N.get(v);var I=N._menuNode;var C=N._wrapper;if(I){var M=true;var G=C.get("offsetWidth");var J=N._itemsWidth;if(J[J.length-1]>N._contentWidth){var H=O.get(j);var L=H.all("."+r);var F=O.getTabIndex(O.get("activeTab"));var E=(F!=0?J[F]-J[F-1]:0);var z=N._contentWidth;var K=O.selectTab;var D=[];var B=[];L.each(function(Q,P,T){var S=(P<F?E:0);if(P!=F&&J[P]+S>z){Q.hide();D[0]=P;D[1]=Q.get("text");var R=f.sub(y,D);B.push(R);M=false;}else{Q.show();}});I.setContent(B.join(""));var A=I.all("li");A.first().addClass(l);A.last().addClass(q);}if(M){N._hideMenu();}else{N._triggerNode.show();}}},_updateUI:function(){var A=this;var D=A.get(v);A._hideMenu();var z=D.get(b);var C=D.get(j);var B=C.all("."+r);A._contentWidth=z.get("offsetWidth")-A._listNodeOuterWidth;A._itemsWidth=[];var G=A._itemsWidth;var E=(parseFloat(C.getComputedStyle("paddingLeft"))+parseFloat(C.getComputedStyle("paddingRight")));var F=B.size()-1;B.each(function(I,H,K){var L=(parseFloat(I.getComputedStyle("marginRight"))+parseFloat(I.getComputedStyle("marginLeft")));var J=H-1;if(H>0){G[J]=E+L+I.get("offsetLeft");}if(H==F){G[H]=G[J]+I.get("offsetWidth");}});if(G[G.length-1]>A._contentWidth){if(!A._menuOverlay){A._renderMenu();}A._updateMenuTask();}}}});m.namespace("Plugin").TabViewMenu=x;},"@VERSION@",{requires:["aui-component","aui-state-interaction","aui-tabs-base","aui-overlay-context","plugin"]});AUI.add("aui-tabs",function(a){},"@VERSION@",{skinnable:true,use:["aui-tabs-base","aui-tabs-menu-plugin"]});