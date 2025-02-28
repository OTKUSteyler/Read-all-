(function(e,o){"use strict";function c(){return o.useEffect(function(){const l=setInterval(function(){const n=document.querySelector(".notifications-class");if(n){const t=document.createElement("div");t.innerHTML=`
          <button onclick="markAllRead()" style="padding: 10px; background-color: #4CAF50; color: white; border: none;">Mark All as Read</button>
        `,n.appendChild(t),clearInterval(l)}},1e3)},[]),null}return e.default=c,Object.defineProperty(e,"__esModule",{value:!0}),e})({},vendetta.metro.common);
