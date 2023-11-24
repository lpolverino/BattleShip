(()=>{"use strict";const e=(e,t)=>{const r=document.createElement("td");return r.dataset.column=e,r.dataset.row=t,r.classList.add(e+"-"+t),r.innerText="#"===e?t:"-",r},t=(t,r,a)=>{const n=document.createElement("tr");for(let o=0;o<a;o++){const a=e(r[o],t);n.appendChild(a)}return n},r=(e,t,r,a)=>{const n=t+"-"+(r+1);let o;o="player"===e?document.getElementsByClassName(n)[1]:document.getElementsByClassName(n)[0],o.classList.add(((e,t)=>"player"===e?t.ship?t.shot?"hit":"ship":"water":t.ship&&t.shot?"hit":"water")(e,a))},a=(e,a)=>{const o=(t,a,n)=>{r(e,t,a,n)},i=document.createElement("div");i.classList.add("gameboard");const c=(()=>{const e=document.createElement("table"),r=["#","a","b","c","d","e","f","g","h","i","j"],a=(e=>{const t=document.createElement("tr");return e.forEach((e=>{const r=document.createElement("td");r.innerText=e,t.appendChild(r)})),t})(r);e.appendChild(a);for(let a=1;a<=10;a++){const n=t(a,r,11);e.appendChild(n)}return e})();return setTimeout((()=>n(e,o,a)),0),i.appendChild(c),i},n=(e,t,r)=>{r("player"===e,t)},o=(e,t,r=!1)=>{t(r,e)},i={createComputerGameboard:(e,t)=>{const r=a("enemy",e),n=(e,r,a)=>{const n=e+"-"+(r+1);document.getElementsByClassName(n)[0].addEventListener("click",(a=>{a.preventDefault(),t(e,r)}))};return setTimeout((()=>{o(n,e)})),r},createPlayeGameboard:(e,t)=>{const r=a("player",e),n=(e,r,a)=>{const n=e+"-"+(r+1);let o=document.getElementsByClassName(n)[1];o.ondragover=function(e){e.preventDefault()},o.addEventListener("drop",(e=>{e.preventDefault(),t(e)}))};return setTimeout((()=>{o(n,e,!0)})),r},createMessage:e=>{const t=document.createElement("div");t.classList.add("message");const r=document.createElement("p");return r.innerText=e,t.appendChild(r),t},createButton:(e,t)=>{const r=document.createElement("div");r.id=t;const a=document.createElement("button");return a.innerText=t,a.onclick=e,r.appendChild(a),r.classList.add("btn"),r},fillBoard:n,fillCell:r,createShips:(e,t,r)=>{const a=document.createElement("div");return a.id="ships",r.forEach((r=>{const n=((e,t,r)=>{const a=document.createElement("div");return a.dataset.position=e.position,a.dataset.size=e.size,a.innerText=e.name+" "+e.size,a.id=e.name,a.draggable=!0,a.onclick=r,a.ondragstart=t,a})(r,e,t);a.appendChild(n)})),a}};const c=()=>{const e=[],t=(t,r)=>!!e.some((e=>e.column===t&&e.row===r));return{attack:(r,a)=>{if(t(r,a))throw new Error("Already shooted in that position");e.push({column:r,row:a})},hasAttacked:t}},s=()=>{let e=(()=>{let e={};return["a","b","c","d","e","f","g","h","i","j"].forEach((t=>{e[t]=new Array(10).fill({ocupied:!1,receivedAttack:!1})})),e})(),t=!1;const r=(t,r)=>e[t][r].ocupied,a=e=>({ocupied:!0,ship:e}),n=(t,r,a,n)=>{let o=0,i=!0;if("horizontal"===r)for(;o<t;)i=i&&!e[a][n+o].ocupied,o++;else{const r=["a","b","c","d","e","f","g","h","i","j"];for(;o<t;)i=i&&!e[r[a+o]][n].ocupied,o++}if(!i)throw new Error("Bad request")},o=(e,t,r,a)=>{((e,t,r)=>{i(t,r+e-1)})(e,t,r);const n=(e=>{if(e<1||e>4)throw new Error("Invalid length provided");const t=e;let r=0;return{length:()=>t,isSunked:()=>t===r,hit:()=>{r++}}})(e);((e,t)=>{let r=0;for(;r<e;)t(r),r++})(e,(e=>a(e,n)))},i=(t,r)=>{if(!e.hasOwnProperty(t)||r>9)throw new Error("invalid cordinate")};return{hasShip:r,deployHorizontalShip:(t,r,i)=>{n(t,"horizontal",r,i),o(t,r,i,((t,n)=>{e[r][i+t]=a(n)}))},deployVerticalShip:(t,r,i)=>{const c=["a","b","c","d","e","f","g","h","i","j"];let s=c.indexOf(r);n(t,"vertical",s,i),o(t,r,s,((t,r)=>{e[c[s+t]][i]=a(r)}))},receiveAttack:(r,a)=>{i(r,a),e[r][a].ocupied&&(e[r][a].ship.hit(),e[r][a].ship.isSunked()&&(()=>{let t=!0;const r=e=>!e.ocupied||e.ship.isSunked();for(const a in e)t=t&&e[a].every(r);return t})()&&(t=!0)),e[r][a].receivedAttack=!0},hasBeenAtacked:(t,r)=>(i(t,r),e[t][r].receivedAttack),wippedBoard:()=>t,iterateMap:t=>{for(const a in e)e[a].forEach(((e,n)=>{t(a,n,{shot:e.receivedAttack,ship:!!e.receivedAttack&&r(a,n)})}))},iterateShipMap:t=>{for(const r in e)e[r].forEach(((e,a)=>{t(r,a,{ship:e.ocupied,shot:e.receivedAttack})}))}}},d=(e,t)=>{t.forEach((t=>{"Horizontal"===t.direction||1===t.direction?e.deployHorizontalShip(t.size,t.column,t.row):e.deployVerticalShip(t.size,t.column,t.row)}))};function l(e,t){let r=(()=>{let e=0;return{currentTurn:()=>e+1,pass:()=>{e=(e+1)%2}}})(),a={gameboard:s(),player:c()},n={gameboard:s(),player:c(),shots:0};d(a.gameboard,e),d(n.gameboard,t);const o=()=>a.gameboard.wippedBoard()||n.gameboard.wippedBoard(),i=()=>1===r.currentTurn();return{hasWinner:o,isPlayerTurn:i,playTurn:(e,t)=>{if(o())throw new Error("Cant play turn if the game  is over");i()?(a.player.attack(e,t),n.gameboard.receiveAttack(e,t)):(n.player.attack(e,t),a.gameboard.receiveAttack(e,t)),r.pass()},winner:()=>o()?a.gameboard.wippedBoard()?1:0:-1,gameboards:()=>({player:a.gameboard,computer:n.gameboard}),getComputerPlay:()=>(n.shots++,{column:"a",row:n.shots}),iterateMap:(e,t)=>e?a.gameboard.iterateShipMap(t):n.gameboard.iterateMap(t),addShip:(e,t,r,n)=>{d(a.gameboard,[{direction:"H"===e?1:2,size:t,column:r,row:n}])}}}const p=[{name:"Destroyer",size:4,position:"H"},{name:"AirShip",size:3,position:"H"},{name:"Submarine",size:3,position:"H"},{name:"Ship",size:2,position:"H"},{name:"Boat",size:1,position:"H"}];!async function(){let e,t=function(e){let t=document.getElementById("player"),r=document.getElementById("enemy"),a=document.getElementById("drag-section");const n=document.getElementById("content");let o,c;const s=e=>{for(;e.firstChild;)e.removeChild(e.lastChild)},d=()=>{s(t),s(r),s(a),document.querySelectorAll(".message").forEach((e=>{e.remove()})),document.querySelectorAll(".btn").forEach((e=>{e.remove()}))};return{intialize:(n,s,l,p,m)=>{o=s,c=n,d();const u=i.createComputerGameboard(c,o),h=i.createPlayeGameboard(c,p),f=i.createShips(l,m,e);t.appendChild(u),r.appendChild(h),a.appendChild(f)},renderEnemy:()=>{i.fillBoard("enemy",((e,t,r)=>{i.fillCell("enemy",e,t,r)}),c)},renderPlayer:()=>{i.fillBoard("player",((e,t,r)=>{i.fillCell("player",e,t,r)}),c)},renderGameOver:(e,t)=>{d();const r=i.createMessage("Game Over: "+e+" Wins!"),a=i.createButton(t,"btn-reply");n.appendChild(r),n.appendChild(a)},renderStart:e=>{const t=i.createButton(e,"btn-start");a.appendChild(t)}}}(p),r=!1,a=0;function n(e){e.dataTransfer.setData("position",e.target.dataset.position),e.dataTransfer.setData("size",e.target.dataset.size)}function o(e){e.preventDefault();var r={direction:e.dataTransfer.getData("position"),size:Number(e.dataTransfer.getData("size")),column:e.target.dataset.column,row:Number(e.target.dataset.row)};return a++,5===a&&t.renderStart(m),r}function c(e){e.preventDefault(),e.target.dataset.position="H"===e.target.dataset.position?"V":"H"}const s=()=>{e=l([],[{direction:1,size:2,column:"a",row:1}]),t.intialize(e.iterateMap,h,n,o,c)},d=()=>!!e.hasWinner()&&(u(),t.renderGameOver(0===e.winner()?"Player":"Computer",s),!0),m=()=>{r=!0},u=()=>{r=!1},h=(a,n)=>{if(r){try{console.log("player attack column: "+a+" row: "+n),e.playTurn(a,n)}catch(e){console.log(e)}if(!d()){t.renderPlayer();const r=e.getComputerPlay();console.log("IA attack column: "+r.column+" row: "+r.row),e.playTurn(r.column,r.row),d()||t.renderEnemy()}}};e=l([],[{direction:1,size:2,column:"a",row:1}]),t.intialize(e.iterateMap,h,n,(a=>{if(!r){const{direction:r,size:n,column:i,row:c}=o(a);try{e.addShip(r,n,i,c-1),t.renderPlayer()}catch(e){console.log("Error bad request")}}}),c)}()})();