"use strict";(self.webpackChunkddr_card_draw=self.webpackChunkddr_card_draw||[]).push([[483],{1483:(e,t,n)=>{n.r(t),n.d(t,{Peer:()=>U,Utils:()=>B,default:()=>N});var i=Object.create,r=Object.defineProperty,s=Object.defineProperties,o=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyDescriptors,c=Object.getOwnPropertyNames,h=Object.getOwnPropertySymbols,d=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,p=(e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,f=(e,t)=>{for(var n in t||(t={}))u.call(t,n)&&p(e,n,t[n]);if(h)for(var n of h(t))l.call(t,n)&&p(e,n,t[n]);return e},_=(e,t)=>s(e,a(t)),g=(e,t)=>function(){return t||(0,e[c(e)[0]])((t={exports:{}}).exports,t),t.exports},y=(e,t)=>{return((e,t,n,i)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let n of c(t))u.call(e,n)||"default"===n||r(e,n,{get:()=>t[n],enumerable:!(i=o(t,n))||i.enumerable});return e})((n=r(null!=e?i(d(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0}),r(n,"__esModule",{value:!0})),e);var n},b=(e,t,n)=>new Promise(((i,r)=>{var s=e=>{try{a(n.next(e))}catch(e){r(e)}},o=e=>{try{a(n.throw(e))}catch(e){r(e)}},a=e=>e.done?i(e.value):Promise.resolve(e.value).then(s,o);a((n=n.apply(e,t)).next())})),k=g({"node_modules/peerjs-js-binarypack/lib/bufferbuilder.js"(e,t){var n={};n.useBlobBuilder=function(){try{return new Blob([]),!1}catch(e){return!0}}(),n.useArrayBufferView=!n.useBlobBuilder&&function(){try{return 0===new Blob([new Uint8Array([])]).size}catch(e){return!0}}(),t.exports.binaryFeatures=n;var i=t.exports.BlobBuilder;function r(){this._pieces=[],this._parts=[]}"undefined"!=typeof window&&(i=t.exports.BlobBuilder=window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder||window.BlobBuilder),r.prototype.append=function(e){"number"==typeof e?this._pieces.push(e):(this.flush(),this._parts.push(e))},r.prototype.flush=function(){if(this._pieces.length>0){var e=new Uint8Array(this._pieces);n.useArrayBufferView||(e=e.buffer),this._parts.push(e),this._pieces=[]}},r.prototype.getBuffer=function(){if(this.flush(),n.useBlobBuilder){for(var e=new i,t=0,r=this._parts.length;t<r;t++)e.append(this._parts[t]);return e.getBlob()}return new Blob(this._parts)},t.exports.BufferBuilder=r}}),w=g({"node_modules/peerjs-js-binarypack/lib/binarypack.js"(e,t){var n=k().BufferBuilder,i=k().binaryFeatures,r={unpack:function(e){return new s(e).unpack()},pack:function(e){var t=new o;return t.pack(e),t.getBuffer()}};function s(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}function o(){this.bufferBuilder=new n}function a(e){var t=e.charCodeAt(0);return t<=2047?"00":t<=65535?"000":t<=2097151?"0000":t<=67108863?"00000":"000000"}t.exports=r,s.prototype.unpack=function(){var e,t=this.unpack_uint8();if(t<128)return t;if((224^t)<32)return(224^t)-32;if((e=160^t)<=15)return this.unpack_raw(e);if((e=176^t)<=15)return this.unpack_string(e);if((e=144^t)<=15)return this.unpack_array(e);if((e=128^t)<=15)return this.unpack_map(e);switch(t){case 192:return null;case 193:case 212:case 213:case 214:case 215:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 216:return e=this.unpack_uint16(),this.unpack_string(e);case 217:return e=this.unpack_uint32(),this.unpack_string(e);case 218:return e=this.unpack_uint16(),this.unpack_raw(e);case 219:return e=this.unpack_uint32(),this.unpack_raw(e);case 220:return e=this.unpack_uint16(),this.unpack_array(e);case 221:return e=this.unpack_uint32(),this.unpack_array(e);case 222:return e=this.unpack_uint16(),this.unpack_map(e);case 223:return e=this.unpack_uint32(),this.unpack_map(e)}},s.prototype.unpack_uint8=function(){var e=255&this.dataView[this.index];return this.index++,e},s.prototype.unpack_uint16=function(){var e=this.read(2),t=256*(255&e[0])+(255&e[1]);return this.index+=2,t},s.prototype.unpack_uint32=function(){var e=this.read(4),t=256*(256*(256*e[0]+e[1])+e[2])+e[3];return this.index+=4,t},s.prototype.unpack_uint64=function(){var e=this.read(8),t=256*(256*(256*(256*(256*(256*(256*e[0]+e[1])+e[2])+e[3])+e[4])+e[5])+e[6])+e[7];return this.index+=8,t},s.prototype.unpack_int8=function(){var e=this.unpack_uint8();return e<128?e:e-256},s.prototype.unpack_int16=function(){var e=this.unpack_uint16();return e<32768?e:e-65536},s.prototype.unpack_int32=function(){var e=this.unpack_uint32();return e<Math.pow(2,31)?e:e-Math.pow(2,32)},s.prototype.unpack_int64=function(){var e=this.unpack_uint64();return e<Math.pow(2,63)?e:e-Math.pow(2,64)},s.prototype.unpack_raw=function(e){if(this.length<this.index+e)throw new Error("BinaryPackFailure: index is out of range "+this.index+" "+e+" "+this.length);var t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t},s.prototype.unpack_string=function(e){for(var t,n,i=this.read(e),r=0,s="";r<e;)(t=i[r])<128?(s+=String.fromCharCode(t),r++):(192^t)<32?(n=(192^t)<<6|63&i[r+1],s+=String.fromCharCode(n),r+=2):(n=(15&t)<<12|(63&i[r+1])<<6|63&i[r+2],s+=String.fromCharCode(n),r+=3);return this.index+=e,s},s.prototype.unpack_array=function(e){for(var t=new Array(e),n=0;n<e;n++)t[n]=this.unpack();return t},s.prototype.unpack_map=function(e){for(var t={},n=0;n<e;n++){var i=this.unpack(),r=this.unpack();t[i]=r}return t},s.prototype.unpack_float=function(){var e=this.unpack_uint32(),t=(e>>23&255)-127;return(0==e>>31?1:-1)*(8388607&e|8388608)*Math.pow(2,t-23)},s.prototype.unpack_double=function(){var e=this.unpack_uint32(),t=this.unpack_uint32(),n=(e>>20&2047)-1023;return(0==e>>31?1:-1)*((1048575&e|1048576)*Math.pow(2,n-20)+t*Math.pow(2,n-52))},s.prototype.read=function(e){var t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")},o.prototype.getBuffer=function(){return this.bufferBuilder.getBuffer()},o.prototype.pack=function(e){var t=typeof e;if("string"===t)this.pack_string(e);else if("number"===t)Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if("boolean"===t)!0===e?this.bufferBuilder.append(195):!1===e&&this.bufferBuilder.append(194);else if("undefined"===t)this.bufferBuilder.append(192);else{if("object"!==t)throw new Error('Type "'+t+'" not yet supported');if(null===e)this.bufferBuilder.append(192);else{var n=e.constructor;if(n==Array)this.pack_array(e);else if(n==Blob||n==File||e instanceof Blob||e instanceof File)this.pack_bin(e);else if(n==ArrayBuffer)i.useArrayBufferView?this.pack_bin(new Uint8Array(e)):this.pack_bin(e);else if("BYTES_PER_ELEMENT"in e)i.useArrayBufferView?this.pack_bin(new Uint8Array(e.buffer)):this.pack_bin(e.buffer);else if(n==Object||n.toString().startsWith("class"))this.pack_object(e);else if(n==Date)this.pack_string(e.toString());else{if("function"!=typeof e.toBinaryPack)throw new Error('Type "'+n.toString()+'" not yet supported');this.bufferBuilder.append(e.toBinaryPack())}}}this.bufferBuilder.flush()},o.prototype.pack_bin=function(e){var t=e.length||e.byteLength||e.size;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this.bufferBuilder.append(218),this.pack_uint16(t);else{if(!(t<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(219),this.pack_uint32(t)}this.bufferBuilder.append(e)},o.prototype.pack_string=function(e){var t=function(e){return e.length>600?new Blob([e]).size:e.replace(/[^\u0000-\u007F]/g,a).length}(e);if(t<=15)this.pack_uint8(176+t);else if(t<=65535)this.bufferBuilder.append(216),this.pack_uint16(t);else{if(!(t<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(217),this.pack_uint32(t)}this.bufferBuilder.append(e)},o.prototype.pack_array=function(e){var t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this.bufferBuilder.append(220),this.pack_uint16(t);else{if(!(t<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(221),this.pack_uint32(t)}for(var n=0;n<t;n++)this.pack(e[n])},o.prototype.pack_integer=function(e){if(e>=-32&&e<=127)this.bufferBuilder.append(255&e);else if(e>=0&&e<=255)this.bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this.bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this.bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this.bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this.bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this.bufferBuilder.append(210),this.pack_int32(e);else if(e>=-0x8000000000000000&&e<=0x8000000000000000)this.bufferBuilder.append(211),this.pack_int64(e);else{if(!(e>=0&&e<=0x10000000000000000))throw new Error("Invalid integer");this.bufferBuilder.append(207),this.pack_uint64(e)}},o.prototype.pack_double=function(e){var t=0;e<0&&(t=1,e=-e);var n=Math.floor(Math.log(e)/Math.LN2),i=e/Math.pow(2,n)-1,r=Math.floor(i*Math.pow(2,52)),s=Math.pow(2,32),o=t<<31|n+1023<<20|r/s&1048575,a=r%s;this.bufferBuilder.append(203),this.pack_int32(o),this.pack_int32(a)},o.prototype.pack_object=function(e){var t=Object.keys(e).length;if(t<=15)this.pack_uint8(128+t);else if(t<=65535)this.bufferBuilder.append(222),this.pack_uint16(t);else{if(!(t<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(223),this.pack_uint32(t)}for(var n in e)e.hasOwnProperty(n)&&(this.pack(n),this.pack(e[n]))},o.prototype.pack_uint8=function(e){this.bufferBuilder.append(e)},o.prototype.pack_uint16=function(e){this.bufferBuilder.append(e>>8),this.bufferBuilder.append(255&e)},o.prototype.pack_uint32=function(e){var t=4294967295&e;this.bufferBuilder.append((4278190080&t)>>>24),this.bufferBuilder.append((16711680&t)>>>16),this.bufferBuilder.append((65280&t)>>>8),this.bufferBuilder.append(255&t)},o.prototype.pack_uint64=function(e){var t=e/Math.pow(2,32),n=e%Math.pow(2,32);this.bufferBuilder.append((4278190080&t)>>>24),this.bufferBuilder.append((16711680&t)>>>16),this.bufferBuilder.append((65280&t)>>>8),this.bufferBuilder.append(255&t),this.bufferBuilder.append((4278190080&n)>>>24),this.bufferBuilder.append((16711680&n)>>>16),this.bufferBuilder.append((65280&n)>>>8),this.bufferBuilder.append(255&n)},o.prototype.pack_int8=function(e){this.bufferBuilder.append(255&e)},o.prototype.pack_int16=function(e){this.bufferBuilder.append((65280&e)>>8),this.bufferBuilder.append(255&e)},o.prototype.pack_int32=function(e){this.bufferBuilder.append(e>>>24&255),this.bufferBuilder.append((16711680&e)>>>16),this.bufferBuilder.append((65280&e)>>>8),this.bufferBuilder.append(255&e)},o.prototype.pack_int64=function(e){var t=Math.floor(e/Math.pow(2,32)),n=e%Math.pow(2,32);this.bufferBuilder.append((4278190080&t)>>>24),this.bufferBuilder.append((16711680&t)>>>16),this.bufferBuilder.append((65280&t)>>>8),this.bufferBuilder.append(255&t),this.bufferBuilder.append((4278190080&n)>>>24),this.bufferBuilder.append((16711680&n)>>>16),this.bufferBuilder.append((65280&n)>>>8),this.bufferBuilder.append(255&n)}}}),v=g({"node_modules/eventemitter3/index.js"(e,t){var n=Object.prototype.hasOwnProperty,i="~";function r(){}function s(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function o(e,t,n,r,o){if("function"!=typeof n)throw new TypeError("The listener must be a function");var a=new s(n,r||e,o),c=i?i+t:t;return e._events[c]?e._events[c].fn?e._events[c]=[e._events[c],a]:e._events[c].push(a):(e._events[c]=a,e._eventsCount++),e}function a(e,t){0==--e._eventsCount?e._events=new r:delete e._events[t]}function c(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(i=!1)),c.prototype.eventNames=function(){var e,t,r=[];if(0===this._eventsCount)return r;for(t in e=this._events)n.call(e,t)&&r.push(i?t.slice(1):t);return Object.getOwnPropertySymbols?r.concat(Object.getOwnPropertySymbols(e)):r},c.prototype.listeners=function(e){var t=i?i+e:e,n=this._events[t];if(!n)return[];if(n.fn)return[n.fn];for(var r=0,s=n.length,o=new Array(s);r<s;r++)o[r]=n[r].fn;return o},c.prototype.listenerCount=function(e){var t=i?i+e:e,n=this._events[t];return n?n.fn?1:n.length:0},c.prototype.emit=function(e,t,n,r,s,o){var a=i?i+e:e;if(!this._events[a])return!1;var c,h,d=this._events[a],u=arguments.length;if(d.fn){switch(d.once&&this.removeListener(e,d.fn,void 0,!0),u){case 1:return d.fn.call(d.context),!0;case 2:return d.fn.call(d.context,t),!0;case 3:return d.fn.call(d.context,t,n),!0;case 4:return d.fn.call(d.context,t,n,r),!0;case 5:return d.fn.call(d.context,t,n,r,s),!0;case 6:return d.fn.call(d.context,t,n,r,s,o),!0}for(h=1,c=new Array(u-1);h<u;h++)c[h-1]=arguments[h];d.fn.apply(d.context,c)}else{var l,p=d.length;for(h=0;h<p;h++)switch(d[h].once&&this.removeListener(e,d[h].fn,void 0,!0),u){case 1:d[h].fn.call(d[h].context);break;case 2:d[h].fn.call(d[h].context,t);break;case 3:d[h].fn.call(d[h].context,t,n);break;case 4:d[h].fn.call(d[h].context,t,n,r);break;default:if(!c)for(l=1,c=new Array(u-1);l<u;l++)c[l-1]=arguments[l];d[h].fn.apply(d[h].context,c)}}return!0},c.prototype.on=function(e,t,n){return o(this,e,t,n,!1)},c.prototype.once=function(e,t,n){return o(this,e,t,n,!0)},c.prototype.removeListener=function(e,t,n,r){var s=i?i+e:e;if(!this._events[s])return this;if(!t)return a(this,s),this;var o=this._events[s];if(o.fn)o.fn!==t||r&&!o.once||n&&o.context!==n||a(this,s);else{for(var c=0,h=[],d=o.length;c<d;c++)(o[c].fn!==t||r&&!o[c].once||n&&o[c].context!==n)&&h.push(o[c]);h.length?this._events[s]=1===h.length?h[0]:h:a(this,s)}return this},c.prototype.removeAllListeners=function(e){var t;return e?(t=i?i+e:e,this._events[t]&&a(this,t)):(this._events=new r,this._eventsCount=0),this},c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,c.prefixed=i,c.EventEmitter=c,void 0!==t&&(t.exports=c)}}),m=y(w()),C={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"turn:0.peerjs.com:3478",username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},B=new class{constructor(){this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedMTU=16300,this.defaultConfig=C,this.pack=m.pack,this.unpack=m.unpack,this._dataCount=1}validateId(e){return!e||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e)}chunk(e){const t=[],n=e.size,i=Math.ceil(n/B.chunkedMTU);let r=0,s=0;for(;s<n;){const o=Math.min(n,s+B.chunkedMTU),a=e.slice(s,o),c={__peerData:this._dataCount,n:r,data:a,total:i};t.push(c),s=o,r++}return this._dataCount++,t}blobToArrayBuffer(e,t,n){const i=new e;return i.onload=function(e){e.target&&n(e.target.result)},i.readAsArrayBuffer(t),i}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=255&e.charCodeAt(n);return t.buffer}randomToken(){return Math.random().toString(36).substr(2)}isSecure(){return"https:"===location.protocol}},S=y(v()),E=new class{constructor(){this._logLevel=0}get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const n=["PeerJS: ",...t];for(let e in n)n[e]instanceof Error&&(n[e]="("+n[e].name+") "+n[e].message);e>=3?console.log(...n):e>=2?console.warn("WARNING",...n):e>=1&&console.error("ERROR",...n)}},T=y(v()),I=class extends T.EventEmitter{constructor({secure:e,host:t,port:n,path:i,key:r,pingInterval:s=5e3,polyfills:o}){var a;super(),this._disconnected=!0,this._id=null,this._messagesQueue=[],this.alive=!1,this._destroyed=!1,this.pingInterval=s;const c=e?"wss://":"ws://";this._baseUrl=c+t+":"+n+i+"peerjs?key="+r,this.WebSocketConstructor=null!=(a=null==o?void 0:o.WebSocket)?a:window.WebSocket}get messagesQueue(){return this._messagesQueue}get destroyed(){return this._destroyed}start(e,t){if(this._destroyed)throw new Error("Socket was destroyed!");if(this._id=e,this._socket||!this._disconnected)return;const n=`${this._baseUrl}&id=${e}&token=${t}`;this._socket=new this.WebSocketConstructor(n),this._disconnected=!1,this._socket.onmessage=e=>{if(this._destroyed)return;let t;try{t=JSON.parse(e.data),E.log("Server message received:",t)}catch(t){return void E.log("Invalid server message",e.data)}this.emit("message",t)},this._socket.onclose=e=>{this._disconnected||this._destroyed||(E.log("Socket closed.",e),this._cleanup(),this._disconnected=!0,this.emit("disconnected"))},this._socket.onopen=()=>{this._disconnected||this._destroyed||(E.log("Socket open"),this.emit("open"),this._sendQueuedMessages(),this._scheduleHeartbeat())}}_scheduleHeartbeat(){this._wsPingTimer=setTimeout((()=>{this._sendHeartbeat()}),this.pingInterval)}_sendHeartbeat(){if(this._destroyed)return;if(!this._wsOpen())return void E.log("Cannot send heartbeat, because socket closed");const e=JSON.stringify({type:"HEARTBEAT"});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&1===this._socket.readyState}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t);e.length>0&&E.log(`${e.length} queued messages was sent`)}send(e){if(this._destroyed)throw new Error("Socket was destroyed!");if(!e.type)return void this.emit("error","Invalid message");if(!this.alive)return;if(null==this._id||!this._wsOpen())return void this._messagesQueue.push(e);const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._id=null,this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}destroy(){this._destroyed||(this.close(),this._messagesQueue.length=0,this._destroyed=!0)}};function D(){}var M=class{constructor(e){this.connection=e}get webRtc(){var e,t;return null!=(t=null==(e=this.connection.provider.options.polyfills)?void 0:e.WebRTC)?t:window}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,"media"===this.connection.type&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){if("data"===this.connection.type){const n=this.connection,i={ordered:!!e.reliable},r=t.createDataChannel(n.label,i);n.initialize(r)}this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){E.log("Creating RTCPeerConnection.");const e=new(0,this.webRtc.RTCPeerConnection)(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,n=this.connection.connectionId,i=this.connection.type,r=this.connection.provider;E.log("Listening for ICE candidates, remote streams and data channels."),e.onicecandidate=e=>{e.candidate&&e.candidate.candidate&&(E.log(`Received ICE candidates for ${t}:`,e.candidate),r.socket.send({type:"CANDIDATE",payload:{candidate:e.candidate,type:i,connectionId:n},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":E.log("iceConnectionState is failed, closing connections to "+t),this.connection.emit("error",new Error("Negotiation of connection to "+t+" failed.")),this.connection.close();break;case"closed":E.log("iceConnectionState is closed, closing connections to "+t),this.connection.emit("error",new Error("Connection to "+t+" closed.")),this.connection.close();break;case"connected":E.log("iceConnectionState changed to connected on the connection with "+t);break;case"disconnected":E.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":E.log("iceConnectionState changed to completed on the connection with "+t),e.onicecandidate=D}this.connection.emit("iceStateChanged",e.iceConnectionState)},e.ondatachannel=e=>{E.log("Received data channel");const i=e.channel;r.getConnection(t,n).initialize(i)},e.ontrack=e=>{E.log("Received remote stream");const i=e.streams[0],s=r.getConnection(t,n);if("media"===s.type){const e=s;this._addStreamToMediaConnection(i,e)}}}cleanup(){E.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=null;const t="closed"!==e.signalingState;let n=!1;if("data"===this.connection.type){const e=this.connection.dataChannel;e&&(n=!!e.readyState&&"closed"!==e.readyState)}(t||n)&&e.close()}_makeOffer(){return b(this,null,(function*(){const e=this.connection.peerConnection,t=this.connection.provider;try{const n=yield e.createOffer(this.connection.options.constraints);if("closed"===e.signalingState)return;E.log("Created offer."),this.connection.options.sdpTransform&&"function"==typeof this.connection.options.sdpTransform&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{yield e.setLocalDescription(n),E.log("Set localDescription:",n,`for:${this.connection.peer}`);let i={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if("data"===this.connection.type){const e=this.connection;i=_(f({},i),{label:e.label,reliable:e.reliable,serialization:e.serialization})}t.socket.send({type:"OFFER",payload:i,dst:this.connection.peer})}catch(e){"OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"!=e&&(t.emitError("webrtc",e),E.log("Failed to setLocalDescription, ",e))}}catch(e){t.emitError("webrtc",e),E.log("Failed to createOffer, ",e)}}))}_makeAnswer(){return b(this,null,(function*(){const e=this.connection.peerConnection,t=this.connection.provider;try{const n=yield e.createAnswer();if("closed"===e.signalingState)return;E.log("Created answer."),this.connection.options.sdpTransform&&"function"==typeof this.connection.options.sdpTransform&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{yield e.setLocalDescription(n),E.log("Set localDescription:",n,`for:${this.connection.peer}`),t.socket.send({type:"ANSWER",payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(e){t.emitError("webrtc",e),E.log("Failed to setLocalDescription, ",e)}}catch(e){t.emitError("webrtc",e),E.log("Failed to create answer, ",e)}}))}handleSDP(e,t){return b(this,null,(function*(){const n=this.webRtc.RTCSessionDescription;t=new n(t);const i=this.connection.peerConnection,r=this.connection.provider;E.log("Setting remote description",t);const s=this;try{yield i.setRemoteDescription(t),E.log(`Set remoteDescription:${e} for:${this.connection.peer}`),"OFFER"===e&&(yield s._makeAnswer())}catch(e){r.emitError("webrtc",e),E.log("Failed to setRemoteDescription, ",e)}}))}handleCandidate(e){return b(this,null,(function*(){E.log("handleCandidate:",e);const t=e.candidate,n=e.sdpMLineIndex,i=e.sdpMid,r=this.connection.peerConnection,s=this.connection.provider;try{const e=this.webRtc.RTCIceCandidate;yield r.addIceCandidate(new e({sdpMid:i,sdpMLineIndex:n,candidate:t})),E.log(`Added ICE candidate for:${this.connection.peer}`)}catch(e){s.emitError("webrtc",e),E.log("Failed to handleCandidate, ",e)}}))}_addTracksToConnection(e,t){if(E.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return E.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach((n=>{t.addTrack(n,e)}))}_addStreamToMediaConnection(e,t){E.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}},O=y(v()),P=class extends O.EventEmitter{constructor(e,t,n){super(),this.peer=e,this.provider=t,this.options=n,this._open=!1,this.metadata=n.metadata}get open(){return this._open}},A=class extends P{get type(){return"media"}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,n){super(e,t,n),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||A.ID_PREFIX+B.randomToken(),this._negotiator=new M(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}addStream(e){E.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,n=e.payload;switch(e.type){case"ANSWER":this._negotiator.handleSDP(t,n.sdp),this._open=!0;break;case"CANDIDATE":this._negotiator.handleCandidate(n.candidate);break;default:E.warn(`Unrecognized message type:${t} from peer:${this.peer}`)}}answer(e,t={}){if(this._localStream)return void E.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection(_(f({},this.options._payload),{_stream:e}));const n=this.provider._getMessages(this.connectionId);for(let e of n)this.handleMessage(e);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}},R=A;R.ID_PREFIX="mc_";var x=y(v()),L=class extends x.EventEmitter{constructor(e){super(),this.fileReader=e,this._queue=[],this._processing=!1,this.fileReader.onload=e=>{this._processing=!1,e.target&&this.emit("done",e.target.result),this.doNextTask()},this.fileReader.onerror=e=>{E.error("EncodingQueue error:",e),this._processing=!1,this.destroy(),this.emit("error",e)}}get queue(){return this._queue}get size(){return this.queue.length}get processing(){return this._processing}enque(e){this.queue.push(e),this.processing||this.doNextTask()}destroy(){this.fileReader.abort(),this._queue=[]}doNextTask(){0!==this.size&&(this.processing||(this._processing=!0,this.fileReader.readAsArrayBuffer(this.queue.shift())))}},F=class extends P{constructor(e,t,n){var i,r;super(e,t,n),this.stringify=JSON.stringify,this.parse=JSON.parse,this._buffer=[],this._bufferSize=0,this._buffering=!1,this._chunkedData={},this.connectionId=this.options.connectionId||F.ID_PREFIX+B.randomToken(),this.label=this.options.label||this.connectionId,this.serialization=this.options.serialization||"binary",this.reliable=!!this.options.reliable,this.FileReaderCtr=null!=(r=null==(i=t.options.polyfills)?void 0:i.FileReader)?r:window.FileReader,this._encodingQueue=new L(new this.FileReaderCtr),this._encodingQueue.on("done",(e=>{this._bufferedSend(e)})),this._encodingQueue.on("error",(()=>{E.error(`DC#${this.connectionId}: Error occured in encoding from blob to arraybuffer, close DC`),this.close()})),this._negotiator=new M(this),this._negotiator.startConnection(this.options._payload||{originator:!0})}get type(){return"data"}get dataChannel(){return this._dc}get bufferSize(){return this._bufferSize}initialize(e){this._dc=e,this._configureDataChannel()}_configureDataChannel(){this.provider.features.binaryBlob&&!this.provider.features.reliable||(this.dataChannel.binaryType="arraybuffer"),this.dataChannel.onopen=()=>{E.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=e=>{E.log(`DC#${this.connectionId} dc onmessage:`,e.data),this._handleDataMessage(e)},this.dataChannel.onclose=()=>{E.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}_handleDataMessage({data:e}){const t=e.constructor;let n=e;if("binary"===this.serialization||"binary-utf8"===this.serialization){if(t===Blob)return void B.blobToArrayBuffer(this.FileReaderCtr,e,(e=>{const t=B.unpack(e);this.emit("data",t)}));if(t===ArrayBuffer)n=B.unpack(e);else if(t===String){const t=B.binaryStringToArrayBuffer(e);n=B.unpack(t)}}else"json"===this.serialization&&(n=this.parse(e));n.__peerData?this._handleChunk(n):super.emit("data",n)}_handleChunk(e){const t=e.__peerData,n=this._chunkedData[t]||{data:[],count:0,total:e.total};if(n.data[e.n]=e.data,n.count++,this._chunkedData[t]=n,n.total===n.count){delete this._chunkedData[t];const e=new Blob(n.data);this._handleDataMessage({data:e})}}close(){this._buffer=[],this._bufferSize=0,this._chunkedData={},this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this._dc=null),this._encodingQueue&&(this._encodingQueue.destroy(),this._encodingQueue.removeAllListeners(),this._encodingQueue=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t){if(this.open)if("json"===this.serialization)this._bufferedSend(this.stringify(e));else if("binary"===this.serialization||"binary-utf8"===this.serialization){const n=B.pack(e);if(!t&&n.size>B.chunkedMTU)return void this._sendChunks(n);this.provider.features.binaryBlob?this._bufferedSend(n):this._encodingQueue.enque(n)}else this._bufferedSend(e);else super.emit("error",new Error("Connection is not open. You should listen for the `open` event before sending messages."))}_bufferedSend(e){!this._buffering&&this._trySend(e)||(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>F.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout((()=>{this._buffering=!1,this._tryBuffer()}),50),!1;try{this.dataChannel.send(e)}catch(e){return E.error(`DC#:${this.connectionId} Error when sending:`,e),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open)return;if(0===this._buffer.length)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}_sendChunks(e){const t=B.chunk(e);E.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(let e of t)this.send(e,!0)}handleMessage(e){const t=e.payload;switch(e.type){case"ANSWER":this._negotiator.handleSDP(e.type,t.sdp);break;case"CANDIDATE":this._negotiator.handleCandidate(t.candidate);break;default:E.warn("Unrecognized message type:",e.type,"from peer:",this.peer)}}},$=F;$.ID_PREFIX="dc_",$.MAX_BUFFERED_AMOUNT=8388608;var j={isUnifiedPlanSupported(e){if(e||"undefined"==typeof window||(e=window),void 0===e.RTCRtpTransceiver||!("currentDirection"in e.RTCRtpTransceiver.prototype))return!1;let t,n=!1;try{t=new e.RTCPeerConnection,t.addTransceiver("audio"),n=!0}catch(e){}finally{t&&t.close()}return n}},z=class extends S.EventEmitter{constructor(e,t){var n;let i;super(),this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map,e&&e.constructor==Object?t=e:e&&(i=e.toString()),t=f({debug:0,host:B.CLOUD_HOST,port:B.CLOUD_PORT,path:"/",key:z.DEFAULT_KEY,token:B.randomToken(),config:B.defaultConfig},t),this._options=t,"undefined"!=typeof window&&"/"===this._options.host&&(this._options.host=window.location.hostname),this._options.path&&("/"!==this._options.path[0]&&(this._options.path="/"+this._options.path),"/"!==this._options.path[this._options.path.length-1]&&(this._options.path+="/")),void 0===this._options.secure&&this._options.host!==B.CLOUD_HOST?this._options.secure=B.isSecure():this._options.host==B.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&E.setLogFunction(this._options.logFunction),E.logLevel=this._options.debug||0,this._api=new class{constructor(e){this._options=e}_request(e){var t,n;return(null!=(n=null==(t=this._options.polyfills)?void 0:t.fetch)?n:window.fetch)(e)}_buildUrl(e){let t=(this._options.secure?"https://":"http://")+this._options.host+":"+this._options.port+this._options.path+this._options.key+"/"+e;return t+="?ts="+(new Date).getTime()+Math.random(),t}retrieveId(){return b(this,null,(function*(){const e=this._buildUrl("id");try{const t=yield this._request(e);if(200!==t.status)throw new Error(`Error. Status:${t.status}`);return t.text()}catch(e){E.error("Error retrieving ID",e);let t="";throw"/"===this._options.path&&this._options.host!==B.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}))}listAllPeers(){return b(this,null,(function*(){const e=this._buildUrl("peers");try{const t=yield this._request(e);if(200!==t.status){if(401===t.status){let e="";throw e=this._options.host===B.CLOUD_HOST?"It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":"You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+e)}throw new Error(`Error. Status:${t.status}`)}return t.json()}catch(e){throw E.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}))}}(t),this._socket=this._createServerConnection(),this.features=z.getFeatures(null==(n=this._options.polyfills)?void 0:n.WebRTC),this.features.audioVideo||this.features.data?!i||B.validateId(i)?(this.socket.alive=!0,i?this._initialize(i):this._api.retrieveId().then((e=>this._initialize(e))).catch((e=>this._abort("server-error",e)))):this._delayedAbort("invalid-id",`ID "${i}" is invalid`):this._delayedAbort("browser-incompatible","The current browser does not support WebRTC")}get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(let[t,n]of this._connections)e[t]=n;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}_createServerConnection(){const e=new I(this._options);return e.on("message",(e=>{this._handleMessage(e)})),e.on("error",(e=>{this._abort("socket-error",e)})),e.on("disconnected",(()=>{this.disconnected||(this.emitError("network","Lost connection to server."),this.disconnect())})),e.on("close",(()=>{this.disconnected||this._abort("socket-closed","Underlying socket is already closed.")})),e}_initialize(e){this.destroyed||(this._id=e,this.socket.start(e,this._options.token))}_handleMessage(e){const t=e.type,n=e.payload,i=e.src;switch(t){case"OPEN":this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case"ERROR":this._abort("server-error",n.msg);break;case"ID-TAKEN":this._abort("unavailable-id",`ID "${this.id}" is taken`);break;case"INVALID-KEY":this._abort("invalid-key",`API KEY "${this._options.key}" is invalid`);break;case"LEAVE":E.log(`Received leave message from ${i}`),this._cleanupPeer(i),this._connections.delete(i);break;case"EXPIRE":this.emitError("peer-unavailable",`Could not connect to peer ${i}`);break;case"OFFER":{const e=n.connectionId;let t=this.getConnection(i,e);if(t&&(t.close(),E.warn(`Offer received for existing Connection ID:${e}`)),"media"===n.type)t=new R(i,this,{connectionId:e,_payload:n,metadata:n.metadata}),this._addConnection(i,t),this.emit("call",t);else{if("data"!==n.type)return void E.warn(`Received malformed connection type:${n.type}`);t=new $(i,this,{connectionId:e,_payload:n,metadata:n.metadata,label:n.label,serialization:n.serialization,reliable:n.reliable}),this._addConnection(i,t),this.emit("connection",t)}const r=this._getMessages(e);for(let e of r)t.handleMessage(e);break}default:{if(!n)return void E.warn(`You received a malformed message from ${i} of type ${t}`);const r=n.connectionId,s=this.getConnection(i,r);s&&s.peerConnection?s.handleMessage(e):r?this._storeMessage(r,e):E.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(this.disconnected)return E.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),void this.emitError("disconnected","Cannot connect to new Peer after disconnecting from server.");const n=new $(e,this,t);return this._addConnection(e,n),n}call(e,t,n={}){if(this.disconnected)return E.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),void this.emitError("disconnected","Cannot connect to new Peer after disconnecting from server.");if(!t)return void E.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");n._stream=t;const i=new R(e,this,n);return this._addConnection(e,i),i}_addConnection(e,t){E.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const n=t.indexOf(e);-1!==n&&(t.splice(n,1),0===t.length&&this._connections.delete(e.peer))}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const n=this._connections.get(e);if(!n)return null;for(let e of n)if(e.connectionId===t)return e;return null}_delayedAbort(e,t){setTimeout((()=>{this._abort(e,t)}),0)}_abort(e,t){E.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}emitError(e,t){let n;E.error("Error:",t),n="string"==typeof t?new Error(t):t,n.type=e,this.emit("error",n)}destroy(){this.destroyed||(E.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this.socket.destroy(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(let e of t)e.close()}disconnect(){if(this.disconnected)return;const e=this.id;E.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.alive=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)E.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this.socket.alive=!0,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(this.disconnected||this.open)throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`);E.error("In a hurry? We're still trying to make the initial connection!")}}listAllPeers(e=(e=>{})){this._api.listAllPeers().then((t=>e(t))).catch((e=>this._abort("server-error",e)))}static getFeatures(e){return e||"undefined"==typeof window||(e=window),z._features||(z._features=z.checkFeatures(e)),z._features}static checkFeatures(e){e||"undefined"==typeof window||(e=window);const t={webRTC:void 0!==e.RTCPeerConnection,audioVideo:!0,data:!1,binaryBlob:!1,reliable:!1,unifiedPlan:!1};if(!t.webRTC)return t;let n;try{let i;n=new e.RTCPeerConnection(B.defaultConfig);try{i=n.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!i.ordered;try{i.binaryType="blob",t.binaryBlob=!0}catch(e){}}catch(e){}finally{i&&i.close()}}catch(e){}finally{n&&n.close()}return t.unifiedPlan=j.isUnifiedPlanSupported(e),t}},U=z;U.DEFAULT_KEY="peerjs";var N=U;"undefined"!=typeof window&&(window.Peer=U)}}]);
//# sourceMappingURL=483.5c1bb.js.map