(()=>{"use strict";const e=(e,t)=>{const r=document.createElement("td");return r.dataset.column=e,r.dataset.row=t,r.classList.add(e+"-"+t),r.innerText="#"===e?t:"-",r},t=(t,r,n)=>{const a=document.createElement("tr");for(let o=0;o<n;o++){const n=e(r[o],t);a.appendChild(n)}return a},r=(e,r)=>{const a=(e,t,n)=>{((e,t,r,n)=>{const a=t+"-"+(r+1);let o;o="player"===e?document.getElementsByClassName(a)[1]:document.getElementsByClassName(a)[0],o.innerText=e})(r,e,t)},o=document.createElement("div");o.classList.add("gameboard");const d=(()=>{const e=document.createElement("table"),r=["#","a","b","c","d","e","f","g","h","i","j"],n=(e=>{const t=document.createElement("tr");return e.forEach((e=>{const r=document.createElement("td");r.innerText=e,t.appendChild(r)})),t})(r);e.appendChild(n);for(let n=1;n<=10;n++){const a=t(n,r,11);e.appendChild(a)}return e})();return setTimeout((()=>n(e,a)),0),o.appendChild(d),o},n=(e,t)=>{e.iterateMap(t)},a=()=>{const e=[],t=(t,r)=>!!e.some((e=>e.column===t&&e.row===r));return{attack:(r,n)=>{if(t(r,n))throw new Error("Already shooted in that position");e.push({column:r,row:n})},hasAttacked:t}},o=()=>{let e=(()=>{let e={};return["a","b","c","d","e","f","g","h","i","j"].forEach((t=>{e[t]=new Array(10).fill({ocupied:!1,receivedAttack:!1})})),e})(),t=!1;const r=e=>({ocupied:!0,ship:e}),n=(e,t,r,n)=>{((e,t,r)=>{a(t,r+e-1)})(e,t,r);const o=(e=>{if(e<1||e>4)throw new Error("Invalid length provided");const t=e;let r=0;return{length:()=>t,isSunked:()=>t===r,hit:()=>{r++}}})(e);((e,t)=>{let r=0;for(;r<e;)t(r),r++})(e,(e=>n(e,o)))},a=(t,r)=>{if(!e.hasOwnProperty(t)||r>9)throw new Error("invalid cordinate")};return{hasShip:(t,r)=>e[t][r].ocupied,deployHorizontalShip:(t,a,o)=>{n(t,a,o,((t,n)=>{e[a][o+t]=r(n)}))},deployVerticalShip:(t,a,o)=>{const d=["a","b","c","d","e","f","g","h","i","j"];let c=d.indexOf(a);n(t,a,c,((t,n)=>{e[d[c+t]][o]=r(n)}))},receiveAttack:(r,n)=>{a(r,n),e[r][n].ocupied&&(e[r][n].ship.hit(),e[r][n].ship.isSunked()&&(()=>{let t=!0;const r=e=>!e.ocupied||e.ship.isSunked();for(const n in e)t=t&&e[n].every(r);return t})()&&(t=!0)),e[r][n].receivedAttack=!0},hasBeenAtacked:(t,r)=>(a(t,r),e[t][r].receivedAttack),wippedBoard:()=>t,iterateMap:t=>{for(const r in e)e[r].forEach(((e,n)=>{t(r,n,e)}))}}},d=(e,t)=>{t.forEach((t=>{"Horizontal"===t.direction||1===t.direction?e.deployHorizontalShip(t.size,t.column,t.row):e.deployVerticalShip(t.size,t.column,t.row)}))},c=()=>({column:"a",row:1});!async function(){const e=()=>!!t.hasWinner()&&(n.renderGameOver(t.winner()),!0);let t=function(e,t){let r=(()=>{let e=0;return{currentTurn:()=>e+1,pass:()=>{e=(e+1)%2}}})(),n={gameboard:o(),player:a()},i={gameboard:o(),player:a()};d(n.gameboard,[]),d(i.gameboard,[]);const l=()=>n.gameboard.wippedBoard()||i.gameboard.wippedBoard(),s=()=>1===r.currentTurn();return{hasWinner:l,isPlayerTurn:s,playTurn:(e,t)=>{if(l())throw new Error("Cant play turn if the game  is over");s()?(n.player.attack(e,t),i.gameboard.receiveAttack(e,t)):(i.player.attack(e,t),n.gameboard.receiveAttack(e,t)),r.pass()},winner:()=>l()?n.gameboard.wippedBoard()?1:0:-1,gameboards:()=>({player:n.gameboard,computer:i.gameboard}),getComputerPlay:c}}(),n=function(){let e=document.getElementById("player"),t=document.getElementById("enemy");return{intialize:(n,a)=>{const o=((e,t)=>r(e,"enemy"))(n.player),d=(e=>r(e,"player"))(n.computer);e.appendChild(o),t.appendChild(d)},render:()=>{},renderGameOver:()=>{}}}();n.intialize(t.gameboards(),((r,a)=>{try{t.playTurn(r,a)}catch(e){}if(!e()){n.render(t.gameboards());const r=t.getComputerPlay();t.playTurn(r.column,r.row),e()||n.render(t.gameboards())}}))}()})();