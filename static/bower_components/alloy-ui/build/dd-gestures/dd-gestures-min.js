/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("dd-gestures",function(a){a.DD.Drag.START_EVENT="gesturemovestart";a.DD.Drag.prototype._prep=function(){this._dragThreshMet=false;var c=this.get("node"),b=a.DD.DDM;c.addClass(b.CSS_PREFIX+"-draggable");c.on(a.DD.Drag.START_EVENT,a.bind(this._handleMouseDownEvent,this),{minDistance:0,minTime:0});c.on("gesturemoveend",a.bind(this._handleMouseUp,this),{standAlone:true});c.on("dragstart",a.bind(this._fixDragStart,this));};a.DD.DDM._setupListeners=function(){var b=a.DD.DDM;this._createPG();this._active=true;a.one(a.config.doc).on("gesturemove",a.throttle(a.bind(b._move,b),b.get("throttleTime")),{standAlone:true});};},"3.4.0",{skinnable:false,requires:["dd-drag","event-synthetic","event-gestures"]});