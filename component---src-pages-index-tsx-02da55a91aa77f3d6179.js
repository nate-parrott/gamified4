"use strict";(self.webpackChunkmy_gatsby_site=self.webpackChunkmy_gatsby_site||[]).push([[691],{6951:function(e,t,i){i.r(t),i.d(t,{default:function(){return Ne}});var a=i(1721),n=i(7294),c=i.p+"static/intro-688f0514cddba64963a7b701c8f18d05.svg",s=i.p+"static/workflow-8531e1668bc65918f52729f39b09eddf.svg",l=i(1562);const o=l.dq;function r(){var e,t,i="";for(e=0;e<32;e++)t=16*Math.random()|0,8!=e&&12!=e&&16!=e&&20!=e||(i+="-"),i+=(12==e?4:16==e?3&t|8:t).toString(16);return i}function d(e){return 0===e.length?null:e[Math.random()*e.length|0]}function u(e){var t,i,a;for(a=e.length-1;a>0;a--)t=Math.floor(Math.random()*(a+1)),i=e[a],e[a]=e[t],e[t]=i;return e}let m=function(e,t){this.identifier=r(),this.render=e,this.itemClass=t,this.borderless=!1},M=function(e){this.identifier=r(),this.items=e};const g=e=>{let{item:t,onBack:i,onForward:a,onDismiss:c,offset:s}=e,l=t.borderless,o="ModalItemView offset_"+s+" "+(t.itemClass||"");l&&(o+=" borderless");let r=t.render({full:0===s,onForward:a});return n.createElement("div",{className:o},n.createElement("div",{className:"content"},r),i&&!l?n.createElement("div",{className:"control back",onClick:i,key:"back"}):null,a&&!l?n.createElement("div",{className:"control forward",onClick:a,key:"forward"}):null)};let I=function(e){function t(t){var i;return(i=e.call(this,t)||this).state={itemIndex:0},i}(0,a.Z)(t,e);var i=t.prototype;return i.componentDidUpdate=function(e,t,i){(e.playlist?e.playlist.identifier:null)!==(this.props.playlist?this.props.playlist.identifier:null)&&0!==this.state.index&&this.setState({itemIndex:0})},i.render=function(){let{playlist:e}=this.props,{itemIndex:t}=this.state,i=e?e.items:[],a=[0,1,2].map((e=>{let a=t+e;if(a<0||a>=i.length)return null;let c={};return 0===e&&(c={onBack:this.back.bind(this),onForward:this.forward.bind(this),onDismiss:this.dismiss.bind(this)}),n.createElement(g,Object.assign({key:a,className:"ModalPlayer",item:i[a],offset:e},c))}));return n.createElement("div",{className:"ModalPlayer",onClick:e=>{e.currentTarget===e.target&&this.dismiss()}},a)},i.back=function(){this.advance(-1)},i.forward=function(){this.advance(1)},i.advance=function(e){let{playlist:t}=this.props,{itemIndex:i}=this.state,a=t?t.items:[],n=i+e;n<0||n>=a.length?this.props.onDone():this.setState({itemIndex:n})},i.dismiss=function(){this.props.onDone()},t}(n.Component);var N=e=>{let{children:t}=e;return n.createElement("div",{className:"hscroll"},t)},h=i.p+"static/snapcodeBitmoji-321358d9896745c4749f2bdfb23d37a4.svg";const y=e=>{let{emoji:t,name:i,desc:a,value:c,action:s,unlocked:l}=e;return n.createElement("div",{className:"trophy "+(l?"unlocked":"locked"),onClick:s},n.createElement("div",{className:"emoji"},n.createElement("span",null,t)),n.createElement("div",{className:"name"},i),n.createElement("div",{className:"desc"},a),n.createElement(w,{hasAction:!!s,unlocked:l}))},w=e=>{let{hasAction:t,unlocked:i}=e;return i?n.createElement("div",{className:"unlocked"},"Unlocked!"):t?n.createElement("div",{className:"unlock"},"Click here!"):n.createElement("div",{className:"not-unlocked"},"Not unlocked")};let D=e=>{let{bigText:t,bigTextUrl:i,bigImage:a,title:c,subtitle:s,nextButtonTitle:l,pageClass:o}=e;return new m((e=>{let{full:o,onForward:r}=e,d=null;return o&&(d=[t?n.createElement("a",{key:"bigText",className:"bigText",href:i,target:"_blank"},t):null,a?n.createElement("img",{key:"bigImage",className:"bigImage",src:a}):null,c?n.createElement("h1",{key:"title",className:"title"},c):null,s?n.createElement("div",{key:"subtitle",className:"subtitle"},s):null,l?n.createElement("div",{key:"nextButton",className:"nextButton",onClick:r},l):null]),n.createElement("div",null,d)}),"BasicPageItem "+(o||""))},p=()=>D({title:"👮‍♀️ Hey you!",subtitle:"I can’t actually check if you’ve done this before giving you the coins. But if I realize you’ve lied...",nextButtonTitle:"I Promise! 🤝"}),j=()=>{let e="nates_linkedin";return D({bigText:"@"+e,bigTextUrl:"https://instagram.com/"+e,subtitle:"Go ahead, smash the follow button...",nextButtonTitle:"I did, I promise 👮‍♀️",pageClass:"instagram"})},v=e=>{let{activityStore:t,playWithRewards:i}=e;return n.createElement(N,null,n.createElement(y,{emoji:"🌈",name:"Reading Rainbow",desc:"Read 5 pieces of content!",value:10,unlocked:t.hasAward("reading-rainbow")}),n.createElement(y,{emoji:"🕹",name:"Clicker Clique",desc:"Click 20 times anywhere!",value:5,unlocked:t.hasAward("clicker-clique")}),n.createElement(y,{emoji:"🤞",name:"Big Click Energy",desc:"Click 100 times anywhere!",value:5,unlocked:t.hasAward("big-click-energy")}),n.createElement(y,{emoji:"👀",name:"Eyewitness",desc:"Follow me on Instagram!",value:5,unlocked:t.hasAward("instagram"),action:()=>i("instagram",[p(),j()],{coins:5})}),n.createElement(y,{emoji:"👻",name:"Toasty Ghost",desc:"Add me on the Snapchat!",value:7,unlocked:t.hasAward("snapchat"),action:()=>i("snapchat",[p(),D({bigImage:h,subtitle:"Go ahead, scan that code...",nextButtonTitle:"Did it! 👮‍♀️",pageClass:"snapchat"})],{coins:5})}),n.createElement(y,{emoji:"🐮",name:"Cash Cow",desc:"Send me $3 on Square Cash",value:10,unlocked:t.hasAward("cashApp"),action:()=>i("cashApp",[p(),D({bigText:"$n8p",bigTextUrl:"https://cash.me/$n8p",subtitle:"Go ahead, send that $3...",nextButtonTitle:"Sent! 👮‍♀️",pageClass:"cashApp"})],{coins:7})}))};const T="undefined"!=typeof window&&window;let A=e=>T&&(/iPad|iPhone|iPod/.test(T.navigator.userAgent)&&!T.MSStream||T.innerWidth<500)?(T.open(e,"_blank"),null):new m((t=>{let{full:i}=t;return i?n.createElement("iframe",{src:e}):null}),"web"),E=function(){function e(){this.lastCallbackId=0,this.callbacks={}}var t=e.prototype;return t.listen=function(e){let t=this.lastCallbackId++;return this.callbacks[t]=e,()=>{delete this.callbacks[t]}},t.announce=function(e){for(let t of Object.values(this.callbacks))t(e)},e}();const b="undefined"!=typeof window&&window;let k=[{clicks:20,award:{id:"clicker-clique",name:"Clicker Clique",coins:10,activityText:"🕹 Nice clicking! You’ve unlocked the CLICKER CLIQUE trophy for clicking 20 times. Here’s 10 coins."}},{clicks:100,award:{id:"big-click-energy",coins:20,activityText:"🤞 Finger-clickin’ good! You’ve unlocked the BIG CLICK ENERGY trophy for clicking 100 times. Enjoy the prestige and luxury that comes with 25 COINS!",name:"Big Click Energy"}}],x=[{category:"content",count:5,award:{id:"reading-rainbow",name:"Reading Rainbow",coins:30,activityText:"🌈 Looks like you love reading! Here’s a READING RAINBOW badge for reading 5 pieces of content. I know knowledge is the real reward, but here’s 30 coins on the side."}}],C=function(){function e(e){this.activityStore=e;let t=b?b.document.body:null;t&&t.addEventListener("click",(()=>{this.click()})),e.newAwardAnnouncer.listen((e=>{setTimeout((()=>{this.triggerCategoryAwards()}),1200)}))}var t=e.prototype;return t.click=function(){this.activityStore.values.clicks=(this.activityStore.values.clicks||0)+1;for(let e of k)this.activityStore.hasAward(e.award.id)||this.activityStore.values.clicks>=e.clicks&&this.activityStore.unlockAward(e.award)},t.triggerCategoryAwards=function(){let e={};for(let t of Object.values(this.activityStore.awards))t.category&&(e[t.category]=(e[t.category]||0)+1);for(let t of x)this.activityStore.hasAward(t.award.id)||e[t.category]>=t.count&&this.activityStore.unlockAward(t.award)},e}();const S="undefined"!=typeof window&&window;function z(){let e=S?S.activityStore:null;return e||(e=new L(new f("activity")),S&&(S.activityStore=e)),e}let f=function(){function e(e){this.key=e}var t=e.prototype;return t.read=function(){return S&&S.localStorage[this.key]?JSON.parse(S.localStorage[this.key]):{}},t.write=function(e){S&&(S.localStorage[this.key]=JSON.stringify(e))},e}(),L=function(){function e(e){this.storage=e;let t=this.storage.read();this.awards=t.awards||{},this.messages=t.messages||[],this.values=t.values||{},this.unlockedIncentives=t.unlockedIncentives||{},this.changeAnnouncer=new E,this.newAwardAnnouncer=new E,0===this.messages.length&&this.sendOnboardingMessages(),this.trophyLogicTracker=new C(this);for(let i of this.messages)this.processMessageDirectives(i)}var t=e.prototype;return t.save=function(){this.storage.write({awards:this.awards,messages:this.messages,values:this.values,unlockedIncentives:this.unlockedIncentives})},t.unsave=function(){this.storage.write({})},t.coinBalance=function(){let e=0,t=1;for(let i of this.messages){let a=i.coins||0;a>0&&(a*=t),e+=a,t*=i.coinMultiplier||1}return e},t.sendOnboardingMessages=function(){this.addMessage({type:"admin",text:"On my site, everything’s a ~game~. Go explore, earn coins, and they’ll show up here..."}),this.addMessage({type:"admin",text:"👋 Hey! I’m Nate."}),this.addMessage({type:"divider"})},t.onChange=function(e){return this.changeAnnouncer.listen(e)},t.hasAward=function(e){return!!this.awards[e]},t.unlockAward=function(e){this.hasAward(e.id)||(this.awards[e.id]=e,this.coins+=e.coins||0,this.addMessage({text:e.activityText,coins:e.coins,type:"admin"}),this.changeAnnouncer.announce(this),this.newAwardAnnouncer.announce(e),this.save())},t.hasIncentive=function(e){return!!this.unlockedIncentives[e]},t.unlockIncentive=function(e){this.hasIncentive(e.id)||(this.unlockedIncentives[e.id]=1,e.activityText&&this.addMessage({type:"admin",text:e.activityText,coins:-e.cost,coinMultiplier:e.coinMultiplier||1,cssUnlock:e.cssUnlock}),this.changeAnnouncer.announce(this),this.save())},t.addMessage=function(e){this.messages.push({...e,id:r()}),this.processMessageDirectives(this.messages[this.messages.length-1]),this.changeAnnouncer.announce(this),this.save()},t.mostRecentMessagesReversed=function(){const e=Math.min(60,this.messages.length);let t=this.messages.slice(this.messages.length-e);return t.reverse(),t},t.processMessageDirectives=function(e){e.cssUnlock&&S&&S.document.body.classList.add(e.cssUnlock)},e}();var Y=i(5785),O=i.p+"static/coin-696a81db382fddd7c4e88bef2f0d1edf.png";let U=function(e){function t(){return e.apply(this,arguments)||this}return(0,a.Z)(t,e),t.prototype.render=function(){let{coins:e,title:t,subtitle:i,onDismiss:a}=this.props;return n.createElement("div",{className:"EarnedCoinsModal"},n.createElement(G,{count:e}),n.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMiIgaGVpZ2h0PSIxMjAyIiB2aWV3Qm94PSIwIDAgMTIwMiAxMjAyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY3OS41NTIgNS41Mjg2M0w2MDIuNDcxIDU5Ny4wMkw2MDIuNDQ4IDBDNjI4LjEzMSAwLjE4MDI5OCA2NTMuODgxIDIuMDAxMTMgNjc5LjU1MiA1LjUyODYzWk02MDEuMjQzIDU5Ni4xMzFMNTIyLjc2NSA2LjAyMTQ1QzQ5Ni45NjEgOS4yMzUwMiA0NzEuNjc0IDE0LjA4MzggNDQ2Ljk5MiAyMC40NjI1TDYwMS4yNDMgNTk2LjEzMVpNNTk4LjUxMyA1OTcuMTE5TDIzNS40OTUgMTI1LjMwOEMyMTQuNzU0IDE0MC45OTMgMTk1LjI4IDE1Ny44MzYgMTc3LjA5NCAxNzUuN0w1OTguNTEzIDU5Ny4xMTlaTTYwNS44NTMgNTk3Ljg4M0w2MDkuMTY5IDU5NS45NjlMMTAyNy4zMiAxNzcuODE5QzEwNDUuMTggMTk2LjAwNCAxMDYyLjAzIDIxNS40NzkgMTA3Ny43MSAyMzYuMjE5TDYxMy4wOTMgNTkzLjcwNEwxMTIxLjM5IDMwMC4yMzdDMTEzNC4zOCAzMjIuMzI1IDExNDYgMzQ1LjMwMyAxMTU2LjEzIDM2OS4wODFMNjA5Ljc4NSA1OTYuMjQ5TDYwNS45IDU5OS4yMzdMNjA4LjI1MiA1OTYuODg2TDYwNS44NTMgNTk3Ljg4M1pNNjA2LjI2NiA1OTkuMDY3TDExODIuNSA0NDQuNjY2QzExODkuMjcgNDY5LjI5NSAxMTk0LjUzIDQ5NC41NTkgMTE5OC4xNCA1MjAuMzQ1TDYwNi4yNjYgNTk5LjA2N1pNNTk2Ljg1OCA2MDAuOTQ0TDYuNzQ3NDQgNjc5LjQyMkM5Ljk2MDk0IDcwNS4yMjYgMTQuODA5OCA3MzAuNTEzIDIxLjE4ODUgNzU1LjE5NUw1OTYuODU4IDYwMC45NDRaTTQ2LjM3MDggODMxLjE1NUw1OTcuMTU4IDYwMi4xNjVMODAuMTM1NSA5MDAuNjk0QzY3LjQ1NTMgODc4LjM2NCA1Ni4xNTU1IDg1NS4xNTIgNDYuMzcwOCA4MzEuMTU1Wk0xMjAxLjk4IDU5OS45MzRINjA2LjY4N0wxMTk3LjY1IDY3Ni45MjRDMTIwMC43NiA2NTEuMjY4IDEyMDIuMTkgNjI1LjU1NiAxMjAxLjk4IDU5OS45MzRaTTYwNi40NTMgNjAxLjE2NUwxMTgyLjY5IDc1NS41NjZDMTE3Ni4yNCA3ODAuMjgyIDExNjguMTYgODA0Ljc5MSAxMTU4LjM5IDgyOC45MjdMNjA2LjQ1MyA2MDEuMTY1Wk01OTcuMzY3IDU5OC4wODdMNDcuMDc3NCAzNzAuOTk1QzM2Ljk1ODMgMzk0Ljk1IDI4LjUxNCA0MTkuMjczIDIxLjY5NzEgNDQzLjgzN0w1OTcuMzY3IDU5OC4wODdaTTUuNTIyNTggNTIyLjIxMUw1OTcuMDE1IDU5OS4yOTJMMCA1OTkuMzE2QzAuMTgwMjk4IDU3My42MzggMi4wMDExIDU0Ny44ODggNS41MjI1OCA1MjIuMjExWk0xMTIxLjIgOTAxLjAyNUw2MDUuNjYyIDYwMy4zNzhMMTA3OC45NSA5NjUuNTMzQzEwOTQuNDggOTQ0Ljg3MiAxMTA4LjU3IDkyMy4zMTcgMTEyMS4yIDkwMS4wMjVaTTYwNC44NDQgNjA0LjMyOEwxMDI2LjY4IDEwMjYuMTZDMTAwOC43MyAxMDQ0LjM0IDk4OS40ODQgMTA2MS41MyA5NjguOTU3IDEwNzcuNTVMNjA0Ljg0NCA2MDQuMzI4Wk0xMjMuOTAxIDIzNS40OUw1OTcuNjA3IDU5Ny45ODlMODAuNTYxMyAyOTkuNUM5My41NTkzIDI3Ny4zNTMgMTA4LjAxMiAyNTUuOTYxIDEyMy45MDEgMjM1LjQ5Wk05MDEuOTUgMTEyMC42Nkw2MDQuMzAzIDYwNS4xMjZMODMzLjEwNiAxMTU1LjQxQzg1Ni44ODQgMTE0NS4yOCA4NzkuODYzIDExMzMuNjUgOTAxLjk1IDExMjAuNjZaTTYwMy4xMjEgNjA1LjUzOUw3NTcuNTIxIDExODEuNzdDNzMyLjg5MiAxMTg4LjU1IDcwNy42MjkgMTE5My44IDY4MS44NDIgMTE5Ny40MUw2MDMuMTIxIDYwNS41MzlaTTM3MS4wMzEgNDUuNjQ2NUw2MDAuMDIgNTk2LjQzMUwzMDEuNDkxIDc5LjQxMjVDMzIzLjgyMiA2Ni43MjY5IDM0Ny4wMzUgNTUuNDI5NCAzNzEuMDMxIDQ1LjY0NjVaTTYwMS44MzQgMTIwMS45OFY2MDYuNjg4TDUyNC44NDMgMTE5Ny42NUM1NTAuNDk5IDEyMDAuNzYgNTc2LjIxMSAxMjAyLjE5IDYwMS44MzQgMTIwMS45OFpNNjAwLjYwMyA2MDYuNDU1TDQ0Ni4yMDEgMTE4Mi42OUM0MjEuNDg0IDExNzYuMjQgMzk2Ljk3NiAxMTY4LjE2IDM3Mi44MzkgMTE1OC4zOUw2MDAuNjAzIDYwNi40NTVaTTYwMy42OCA1OTcuMzY4TDgzMC43NzIgNDcuMDc5M0M4MDYuODE4IDM2Ljk2MDEgNzgyLjQ5NCAyOC41MTU5IDc1Ny45MyAyMS42OTkyTDYwMy42OCA1OTcuMzY4Wk0zMDEuOTk0IDExMjEuOTJMNTk5LjY0MSA2MDYuMzg2TDIzNy40ODYgMTA3OS42N0MyNTguMTQ2IDEwOTUuMiAyNzkuNzAyIDExMDkuMjkgMzAxLjk5NCAxMTIxLjkyWk01OTguNjkxIDYwNS41NjhMMTc2Ljg1OSAxMDI3LjRDMTU4LjY3OCAxMDA5LjQ2IDE0MS40OTIgOTkwLjIwNyAxMjUuNDczIDk2OS42OEw1OTguNjkxIDYwNS41NjhaTTk2Ny41MjkgMTI0LjYyNkw2MDUuMDMxIDU5OC4zM0w5MDMuNTE4IDgxLjI4NzRDOTI1LjY2OCA5NC4yODU1IDk0Ny4wNTUgMTA4LjczOCA5NjcuNTI5IDEyNC42MjZaIiBmaWxsPSIjMDBGRkUwIi8+Cjwvc3ZnPgo=",className:"sunburst"}),n.createElement("div",{className:"blurb"},n.createElement("div",{className:"dummy"},n.createElement("div",{className:"title"},t),n.createElement("div",{className:"subtitle"},i),n.createElement("div",{className:"doneButton",onClick:a},"Let’s get more!")),n.createElement("div",{className:"count"},e," coins!"),n.createElement("div",{className:"title"},t),n.createElement("div",{className:"subtitle"},i),n.createElement("div",{className:"doneButton",onClick:a},"Let’s get more!")))},t}(n.Component);const G=e=>{let{count:t}=e,i=.6/t*100,a=[];for(let c=0;c<t;c++){let e=(c+.5)/t*100;a.push(n.createElement(Z,{key:c,widthPercent:i,centerXPercent:e}))}return n.createElement("div",{className:"FallingCoins"},a)};let Z=function(e){function t(t){var i;return(i=e.call(this,t)||this).startAngle=Math.random()*Math.PI*2,i.endAngle=i.startAngle+2*Math.PI*(Math.random()<.5?-1:1),i.state={angle:i.startAngle,bottom:"100%"},i}(0,a.Z)(t,e);var i=t.prototype;return i.componentDidMount=function(){let e=.5*Math.random()+.2;setTimeout((()=>{this.setState({angle:this.endAngle,bottom:"-50%"})}),1e3*e)},i.render=function(){let{widthPercent:e,centerXPercent:t}=this.props,{angle:i,bottom:a}=this.state,c={left:t+"%",width:e+"%",marginLeft:-e/2+"%",transform:"rotate("+i+"rad)",bottom:a};return n.createElement("img",{src:O,style:c})},t}(n.Component);let W=e=>{let{activityStore:t}=e;return n.createElement(Q,{formFieldType:"email",awardId:"tradeEmailData",placeholder:"What’s your email?",activityTextGenerator:e=>"Thanks, "+e+"! Here’s 7 coins. 🙃",activityStore:t,valueKey:"email"})},R=e=>{let{activityStore:t}=e;return n.createElement(Q,{formFieldType:"text",awardId:"tradeNameData",placeholder:"What’s your name?",activityTextGenerator:e=>"Nice to meet you, "+e+"! 7 coins for the data. 💸🤑",activityStore:t,valueKey:"name"})},Q=e=>{let{activityStore:t,header:i,placeholder:a,formFieldType:c,activityTextGenerator:s,awardId:l,valueKey:o}=e,r=null;if(t.hasAward(l))r=n.createElement("div",{className:"data-collected"},n.createElement("h4",null,"Data collected"),n.createElement("div",{className:"data"},t.values[o]),n.createElement("h4",null,"Thanks! Your data is safe with me. 🙊"));else{let e=e=>{e.preventDefault();let i=e.target.elements.namedItem("value").value;t.unlockAward({id:l,coins:7,activityText:s(i),suppressDefaultNotification:!1}),t.values[o]=i};r=n.createElement("form",{className:"trade-data",onSubmit:e},n.createElement("input",{name:"value",type:c,placeholder:a}),n.createElement("input",{type:"submit",value:"Earn 7 free coins!"}))}return n.createElement("div",{className:"readable-width boxed-content section"},n.createElement("h3",null,"Sharing is caring!"),n.createElement("div",{className:"two-pane"},n.createElement("div",{className:"hides-on-phone"},n.createElement("div",{className:"free-points-graphic",alt:"Free coins for sharing your data!"})),r))};var P=i.p+"static/unlock-card-front-326d87768e1c41e1a7c941d97111ef34.svg",B=i.p+"static/unlock-card-nope-f971dd01c4757221a0137b649537ddf4.svg";let V=function(e){function t(t){var i;return(i=e.call(this,t)||this).state={stage:"preAppear"},i}(0,a.Z)(t,e);var i=t.prototype;return i.componentDidMount=function(){setTimeout((()=>{this.setState({stage:"appear"})}),50)},i.render=function(){let{onForward:e,nopeState:t}=this.props,{stage:i}=this.state,a=null;"appear"===i&&(a=()=>{this.setState({stage:"disappear"}),setTimeout((()=>{e()}),700)});let c="CoinUnlockModalContainer stage-"+i;return t?n.createElement("div",{className:c,onClick:a},n.createElement("img",{src:B,className:"nope"})):n.createElement("div",{className:c,onClick:a},n.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzA2IiBoZWlnaHQ9IjMwNCIgdmlld0JveD0iMCAwIDMwNiAzMDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNyA5MS41NzQ4QzE3IDkxLjU3NDggNzEuMDQyOSA4Mi41NDg1IDE1My41IDgyLjU0ODVDMjMzLjE3MSA4Mi41NDg1IDI5MCA5MS41NzQ4IDI5MCA5MS41NzQ4VjE1NS41NDlIMTdWOTEuNTc0OFoiIGZpbGw9IiM1NDIzRTIiLz4KPHBhdGggZD0iTTE3IDk2LjU0ODVMMjkwIDkxLjU0ODVMMjkzIDk0LjU0ODVWMjkxLjU0OUgxOEwxNSAyODguMDQ5TDE3IDk2LjU0ODVaIiBmaWxsPSIjNTQyM0UyIi8+Cjwvc3ZnPgo=",className:"coinBack"}),n.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzA2IiBoZWlnaHQ9IjMwNCIgdmlld0JveD0iMCAwIDMwNiAzMDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMCkiPgo8Y2lyY2xlIGN4PSIxNTEuNSIgY3k9IjYwLjUiIHI9IjU3LjUiIHRyYW5zZm9ybT0icm90YXRlKC0yNC44MzE5IDE1MS41IDYwLjUpIiBmaWxsPSIjRkZFODE3Ii8+CjxjaXJjbGUgY3g9IjE1MS41IiBjeT0iNjAuNSIgcj0iNTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTI0LjgzMTkgMTUxLjUgNjAuNSkiIGZpbGw9InVybCgjcGFpbnQwX2FuZ3VsYXIpIi8+CjxjaXJjbGUgY3g9IjE1MS41IiBjeT0iNjAuNSIgcj0iNTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTU1LjE2OCAxNTEuNSA2MC41KSIgZmlsbD0idXJsKCNwYWludDFfYW5ndWxhcikiLz4KPGNpcmNsZSBjeD0iMTUxLjUiIGN5PSI2MC41IiByPSI1Mi41IiB0cmFuc2Zvcm09InJvdGF0ZSgtMjQuODMxOSAxNTEuNSA2MC41KSIgZmlsbD0iI0ZGRTgxNyIvPgo8Y2lyY2xlIGN4PSIxNTEuNSIgY3k9IjYwLjUiIHI9IjQ3LjUiIHRyYW5zZm9ybT0icm90YXRlKC0yNC44MzE5IDE1MS41IDYwLjUpIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXIpIi8+CjxjaXJjbGUgY3g9IjE1MS41IiBjeT0iNjAuNSIgcj0iNDciIHRyYW5zZm9ybT0icm90YXRlKC0yNC44MzE5IDE1MS41IDYwLjUpIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIvPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9paSkiPgo8cGF0aCBkPSJNMTYxLjE4IDY0LjYxNTJDMTU3LjgzNCA1MS45ODYyIDE1NC4zNTUgNDEuNzY5MyAxNTAuNzQzIDMzLjk2NDRDMTUwLjQ2MyAzMy4zNTk0IDE1MC4yMTIgMzIuODE0OSAxNDkuOTg4IDMyLjMzMDhMMTQ4LjIxIDI4Ljk2NjJDMTU2IDI4LjgxNDEgMTYyLjQwMiAyOC4yMDI1IDE2Ny40MTUgMjcuMTMxMkMxNzAuMTYxIDM0Ljk2OTUgMTcyLjUxOCA0Mi44NDA5IDE3NC40ODYgNTAuNzQ1MUMxNzYuNDg2IDU4LjU2MDkgMTc3Ljc3IDY0LjQzMTEgMTc4LjMzOCA2OC4zNTU3TDE3OS4yNzkgNzQuMjAwN0MxNzUuMTY1IDc2LjEwNDUgMTcxLjE3NSA3OC44MzIzIDE2Ny4zMDkgODIuMzg0MkwxNjUuMzc2IDg0LjE2MDFMMTQ1LjA3IDYwLjI3OTlDMTQ2LjM2NyA2Ny42ODY3IDE0OC43NDcgNzcuNzUxIDE1Mi4yMSA5MC40NzNDMTQ5LjQ1OSA5MC43MTc4IDE0Ni40NDggOTAuNjQxNyAxNDMuMTc5IDkwLjI0NDVDMTM5Ljg4MiA4OS43ODY4IDEzNy4yMDQgODkuMDc5NCAxMzUuMTQ1IDg4LjEyMjJDMTMzLjA5NSA4MS45NDU1IDEzMS40MDggNzUuNjAwNyAxMzAuMDg0IDY5LjA4OEMxMjguODIgNjIuNTQ3MyAxMjguMDc3IDU3LjUyODYgMTI3Ljg1NSA1NC4wMzIxTDEyNy40NzMgNDguOTE5OUMxMzEuMjg3IDQ1LjA5OCAxMzYuMTI4IDQxLjM1MiAxNDEuOTk2IDM3LjY4MThMMTYxLjE4IDY0LjYxNTJaIiBmaWxsPSIjRkZFODE3Ii8+CjwvZz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9paSIgeD0iMTE0LjkwMyIgeT0iMjEuMzIyOSIgd2lkdGg9IjczLjk3MTciIGhlaWdodD0iNzUuMjM5NCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR4PSIwLjUiIGR5PSItMC41Ii8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvdyIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR4PSItMC41IiBkeT0iMC41Ii8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iZWZmZWN0MV9pbm5lclNoYWRvdyIgcmVzdWx0PSJlZmZlY3QyX2lubmVyU2hhZG93Ii8+CjwvZmlsdGVyPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9hbmd1bGFyIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MS41IDYwLjUpIHJvdGF0ZSg5MCkgc2NhbGUoNTcuNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwIi8+CjxzdG9wIG9mZnNldD0iMC40MjU0MTQiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAuNDUxOTIzIi8+CjxzdG9wIG9mZnNldD0iMC41NzQ1ODYiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAuOCIvPgo8c3RvcCBvZmZzZXQ9IjAuNjg1MDgzIiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQxX2FuZ3VsYXIiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUxLjUgNjAuNSkgcm90YXRlKDkwKSBzY2FsZSg1Ny41KSI+CjxzdG9wIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiLz4KPHN0b3Agb2Zmc2V0PSIwLjQyNTQxNCIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMC40NTE5MjMiLz4KPHN0b3Agb2Zmc2V0PSIwLjU3NDU4NiIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMC44Ii8+CjxzdG9wIG9mZnNldD0iMC42ODUwODMiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyIiB4MT0iMTcyLjc1IiB5MT0iOC4wMDAwMSIgeDI9IjEzMC4yNSIgeTI9IjExNC4yNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRTlEMzEyIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDQzgwQyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwIj4KPHJlY3Qgd2lkdGg9IjMwNiIgaGVpZ2h0PSIzMDQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==",className:"coin"}),n.createElement("img",{src:P,className:"coinFront"}))},t}(n.Component),J=(e,t)=>{let i=new m((i=>{let{full:a,onForward:c}=i;return n.createElement(V,{nopeState:t,onForward:()=>{c(),e()}})}),"CoinUnlockModal");return i.borderless=!0,i},F=[{cost:5,id:"resume",name:"Download my Resume",playlist:[D({title:"Here's my (2018) resume!",bigText:"📄 Resume",bigTextUrl:o("/Resume2018.pdf"),nextButtonTitle:"Fine, whatever"})],activityText:"You paid 5 coins to download my resume!"},{cost:15,id:"email",name:"Send Me an Email",playlist:[D({title:"Send me an email!",bigText:"💌 nate@nateparrott.com",bigTextUrl:"mailto:nate@nateparrott.com",nextButtonTitle:"Ok..."})],activityText:"You paid 15 coins to send me an email!"},{cost:24,id:"2x",name:"Earn 2x for every Coin",playlist:[D({title:"Double coins bonus unlocked!",subtitle:"Move over, Mr. Moneybags.",bigText:"🤑🤑🤑",nextButtonTitle:"Take advantage!"})],activityText:"Paid 24 coins to unlock 💰 DOUBLE COINS 💰 going forward",coinMultiplier:2},{cost:42,id:"chatroom",name:"Join the VIP Chatroom",playlist:[D({bigText:"🤝 Join",title:"Please don’t be weird.",nextButtonTitle:"Done"})],activityText:"You paid 42 coins to join the exclusive VIP chatroom. Why would you do that?"},{cost:56,id:"goldmode",name:"Unlock 🏆Gold Mode🏆",playlist:[D({bigText:"🏆 Gold Mode 🏆",title:"You’ve unlocked gold mode.",subtitle:'This is what the kids would call a "weird flex."',nextButtonTitle:"Swoosh"})],activityText:"You paid 56 coins to unlock 🏆 Gold Mode 🏆!",cssUnlock:"goldMode"},{cost:152,id:"sticker",name:"Get a Sticker in the Mail",playlist:[D({title:"Email me, and I’ll send you a sticker!",subtitle:"Just tell me where to send it.",bigText:"📭 Request",bigTextUrl:"mailto:nate@nateparrott.com?subject=I%20want%20a%20sticker",nextButtonTitle:"Done"})],activityText:"You paid 152 coins to send me an email requesting a sticker. Good luck receiving it."}];const H=e=>{let{name:t,cost:i,unlocked:a,onClick:c}=e,s="IncentiveView "+(a?"unlocked":"");return n.createElement("div",{className:s,onClick:c},n.createElement("div",{className:"lock"},n.createElement("label",null,i)),n.createElement("h6",null,t))};var X=e=>{let{playPlaylist:t,activityStore:i}=e;return n.createElement(N,null,F.map(((e,a)=>{let c=i.hasIncentive(e.id);return n.createElement(H,{key:a,name:e.name,cost:e.cost,onClick:()=>{let a=()=>{t(new M(e.playlist))};if(i.hasIncentive(e.id))return void a();let n=i.coinBalance()>=e.cost;t(new M([J((()=>{n&&(i.unlockIncentive(e),setTimeout((()=>{a()}),200))}),!n)]))},unlocked:c})})))};let K=[{id:"middlename",q:"What is my middle name?",correct:"Plattus",incorrect:["Percival","Penzance","Petrol"]},{id:"squares",q:"Which company have I never interned at?",correct:"Square Enix",incorrect:["Squarespace","Square","Foursquare"]},{id:"born",q:"Where was I born?",correct:"Mt. Sinai Hospital",incorrect:["Methodist Hospital","The USS Intrepid","Berlin"]}];for(let ye of K)ye.correctAward={id:"quiz-"+ye.id,name:"Quiz Question",coins:10,activityText:"10 coins for answering a quiz question right!",category:"quiz"},ye.incorrectAward={id:"quiz-"+ye.id,name:"Quiz Question",coins:1,activityText:"You answered a quiz question wrong! 1 coin for trying, though.",category:"quiz"},ye.options=[ye.correct].concat((0,Y.Z)(ye.incorrect)),u(ye.options);let q=e=>{let{title:t,subtitle:i,options:a,correctOption:c,selectedOption:s,onSelectOption:l,nextButton:o}=e;return l||(l=e=>{}),n.createElement("div",{className:"QuizCell "+(s?"answered":"unanswered")},n.createElement("div",{className:"q"},n.createElement("h4",null,t),n.createElement("p",null,i)),n.createElement("div",{className:"right-pane"},n.createElement("div",{className:"options"},a.map(((e,t)=>{a.length;let i=[];return e===c&&i.push("correct"),e===s&&i.push("selected"),n.createElement("div",{onClick:()=>l(e),className:i.join(" "),key:t},n.createElement("div",null,e))}))),o))},_=function(e){function t(t){var i;return(i=e.call(this,t)||this).state={currentQuestionId:null,selectedOption:null},i}(0,a.Z)(t,e);var i=t.prototype;return i.componentDidMount=function(){this.advanceQuestion()},i.advanceQuestion=function(){this.setState({currentQuestionId:this.getNextQuestion(),selectedOption:null})},i.getNextQuestion=function(){let{activityStore:e}=this.props,t=K.filter((t=>!e.hasAward(t.correctAward.id)));return t.length?t[0].id:null},i.render=function(){let{activityStore:e}=this.props,{currentQuestionId:t,selectedOption:i}=this.state;if(!t)return n.createElement(q,{title:"No more questions!",subtitle:"Come back later, maybe?",options:[]});let a=K.filter((e=>e.id===t))[0],c=null,s=null;i?s=()=>this.advanceQuestion():c=t=>{e.unlockAward(t===a.correct?a.correctAward:a.incorrectAward),this.setState({selectedOption:t})};let l=n.createElement("div",{className:s?"next":"next disabled",onClick:s},"Next");return n.createElement(q,{title:i?i===a.correct?"Correct!":"Incorrect!":"Question:",subtitle:a.q,options:a.options,selectedOption:i,correctOption:i?a.correct:null,onSelectOption:c,nextButton:l})},t}(n.Component),$=function(e){function t(){return e.apply(this,arguments)||this}return(0,a.Z)(t,e),t.prototype.render=function(){let{activityStore:e}=this.props;return n.createElement("div",{className:"readable-width boxed-content section"},n.createElement("h3",null,"Quiz!"),n.createElement(_,{activityStore:e}))},t}(n.Component);const ee="undefined"!=typeof window&&window,te=e=>{let{message:t,activityStore:i}=e;return"divider"===t.type?n.createElement("div",{className:"divider"}):n.createElement("div",{className:"message type-"+t.type},n.createElement("div",{className:"bubble"},t.text))};let ie=function(e){function t(t){var i;return(i=e.call(this,t)||this).state={messages:[],expanded:!1},i.coinImageRef=null,i}(0,a.Z)(t,e);var i=t.prototype;return i.componentDidMount=function(){let{activityStore:e}=this.props;this.cancelChangeListener=e.onChange((()=>{this.setState({messages:e.messages})})),this.cancelNewAwardListener=e.newAwardAnnouncer.listen((e=>{e.suppressDefaultNotification||this.playCoinAnimation(e.coins)}))},i.componentWillUnmount=function(){this.cancelChangeListener&&(this.cancelChangeListener(),this.cancelChangeListener=null),this.cancelNewAwardListener&&(this.cancelNewAwardListener(),this.cancelNewAwardListener=null)},i.toggleExpanded=function(){this.setState({expanded:!this.state.expanded})},i.render=function(){let{activityStore:e}=this.props,{expanded:t}=this.state,{messages:i}=e,a=e.coinBalance();return n.createElement("div",{className:t?"activity expanded":"activity"},n.createElement("div",{className:"coin-count activity-header",onClick:()=>this.toggleExpanded()},n.createElement("img",{src:O,className:"coin",ref:e=>{this.coinImageRef=e}}),n.createElement("label",null,a," coins"),n.createElement("div",{className:"flex-space"}),n.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAzNSAzNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik00LjQ0MzY2IDIzTDE3LjcyMTggMTIuNzIxOEwzMSAyMyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iMzUiIGhlaWdodD0iMzUiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==",className:"chevron"})),n.createElement("div",{className:"chat"},e.mostRecentMessagesReversed().map((t=>n.createElement(te,{key:t.id,message:t,activityStore:e})))))},i.playCoinAnimation=function(e){const t=this.coinImageRef;if(!t)return;let i=Math.min(e,10),a=Math.min(200*i,1e3)/i;for(let n=0;n<i;n++)ae(t,n*a)},t}(n.Component);const ae=(e,t)=>{if(!ee)return;let i=ee.document.body,a=e.getBoundingClientRect(),n=document.createElement("div");n.setAttribute("class","coinAnimationContainer");let c=document.createElement("img");c.src=e.src,n.appendChild(c),c.style.left=a.left+"px",c.style.top=a.top+"px",c.style.width=a.width+"px",c.style.height=a.height+"px",i.appendChild(n),setTimeout((()=>{n.setAttribute("class","coinAnimationContainer started")}),t)};let ne=function(e){function t(){return e.apply(this,arguments)||this}return(0,a.Z)(t,e),t.prototype.render=function(){let{children:e}=this.props;return n.createElement("div",null,n.createElement("div",{className:"content"},e,n.createElement(ie,{activityStore:z()})))},t}(n.Component);var ce=ne,se=i.p+"static/hab-ae3c09d898c42a983f4e7eb9969818d1.svg",le=i.p+"static/flashlight-bfdd60f778a82d263d3a81572cf14199.svg",oe=i.p+"static/zest-7fa9c8b5a946b8f94084d8c32211d025.svg",re=i.p+"static/subway-f80a5da70c613b18b4c6b835aaabf6c4.svg",de=i.p+"static/stacks-1f102c84c267559a4849db62604d7bd6.svg",ue=i.p+"static/rwr-d829ac5b644e319b83debff208e37b48.svg",me=i.p+"static/babynames-d11496f2440369ad02ec879c52fbce61.svg",Me=i.p+"static/table-b7baf242cf1b6b3b87d942977c7ec4ad.svg",ge=i.p+"static/instagrade-fa7d1390ff35a9783a5cec8556ab7159.svg",Ie=i.p+"static/content-cdf617521e3bd3967abb463659823db9.svg";let Ne=function(e){function t(t){var i;return(i=e.call(this,t)||this).activityStore=z(),i.state={playlist:null},i}(0,a.Z)(t,e);var i=t.prototype;return i.componentDidMount=function(){this.cancelActivityStoreListener=this.activityStore.changeAnnouncer.listen((()=>{this.forceUpdate()}))},i.componentWillUnmount=function(){this.cancelActivityStoreListener&&(this.cancelActivityStoreListener(),this.cancelActivityStoreListener=void 0)},i.playWithRewards=function(e,t,i){let a=function(e,t,i,a,c){let{coins:s,category:l}=c||{};s=s||5;let o=d(["💅","👌","💋","🌝","💕","✨","🌈","💰","💸","😻","🤑"]),r=d(["Nice going!","Wow!","Keep it up!","You got it!","As promised!","Exceptional!","Wild!"]);if(!i.hasAward(e)){let c=new m((t=>{let{full:c}=t;if(!c)return;i.hasAward(e)||setTimeout((()=>{i.unlockAward({id:e,coins:s,activityText:"🤑 You earned "+s+" coins for content consumption!",suppressDefaultNotification:!0,category:l})}),0);let d=o+" "+r;return n.createElement(U,{coins:s,title:d,subtitle:"You’ve earned "+s+" coins for viewing!",onDismiss:a})}),"earnedCoinsModalItem");t=[].concat((0,Y.Z)(t),[c])}return new M(t)}(e,t=t.filter((e=>null!==e)),this.activityStore,(()=>this.setState({playlist:null})),i);0!==a.items.length&&this.setState({playlist:a})},i.playPlaylist=function(e){this.setState({playlist:e})},i.render=function(){return n.createElement(ce,null,n.createElement("div",{className:"index-page"},n.createElement(I,{playlist:this.state.playlist,onDone:()=>this.setState({playlist:null})}),n.createElement("div",{className:"intro",onClick:()=>this.setState({playlist:new M([J((()=>{}),!1)])})},n.createElement("img",{className:"readable-width",src:c,alt:"Nate Parrott dot com: developer, designer and gamification enthusiast."})),n.createElement("div",{className:"readable-width boxed-content workflow section"},n.createElement("h3",null,"How this site works"),n.createElement("img",{src:s,alt:"Consume content, earn points, get exclusive experiences!"})),n.createElement("div",{className:"readable-width section"},n.createElement("h3",null,"Learn about ",n.createElement("span",{className:"nowrap"},"things I’ve made! ",n.createElement("div",{className:"tooltip"},"1 point per click"))),n.createElement("div",{className:"content-tiles"},n.createElement(he,{src:se,alt:"Design and branding for a beginner-friendly hackathon",onClick:()=>this.playWithRewards("hab",[A((0,l.dq)("/hab/index.html"))],{category:"content"})}),n.createElement(he,{src:le,alt:"A popular natural-language interface to Mac OS",onClick:()=>this.playWithRewards("flashlight",[A((0,l.dq)("/flashlight/index.html"))],{category:"content"})}),n.createElement(he,{src:ge,alt:"An app that grades paper quizzes instantly",onClick:()=>this.playWithRewards("instagrade",[A((0,l.dq)("/instagrade/index.html"))],{category:"content"})}),n.createElement(he,{src:oe,alt:"A spice rack powered by computer vision",onClick:()=>this.playWithRewards("zest",[A("http://zest.nateparrott.com/")],{category:"content"})}))),n.createElement("div",{className:"cashcash section"},n.createElement("div",{className:"bg"}),n.createElement("div",{className:"readable-width"},n.createElement("h3",null,"Exclusive unlockable content!"),n.createElement(X,{activityStore:this.activityStore,playPlaylist:this.playPlaylist.bind(this)}))),n.createElement("div",{className:"readable-width section"},n.createElement("h3",null,"Why not ",n.createElement("span",{className:"nowrap"},"consume more content? ",n.createElement("div",{className:"tooltip"},"5 coins per click"))),n.createElement("div",{className:"content-tiles"},n.createElement(he,{src:Me,alt:"An augmented-reality table prototype",onClick:()=>this.playWithRewards("table",[A("http://table.nateparrott.com/")])}),n.createElement(he,{src:re,alt:"An subway map that visualizes travel time",onClick:()=>this.playWithRewards("subway",[A("http://subway.nateparrott.com/")])}))),n.createElement(R,{activityStore:this.activityStore}),n.createElement("div",{className:"trophies section"},n.createElement("div",{className:"bg"}),n.createElement("div",{className:"readable-width"},n.createElement("h3",null,"Why not earn some trophies??"),n.createElement(v,{activityStore:this.activityStore,playWithRewards:this.playWithRewards.bind(this)}))),n.createElement("div",{className:"readable-width section"},n.createElement("h3",null,"There’s so ",n.createElement("span",{className:"nowrap"},"much rewarding content!",n.createElement("div",{className:"tooltip"},"5 coins per click"))),n.createElement("div",{className:"content-tiles"},n.createElement(he,{src:Ie,alt:"An app for creating exciting animations",onClick:()=>this.playWithRewards("content",[A("http://content.nateparrott.com/")],{category:"content"})}),n.createElement(he,{src:de,alt:"An app for making your own social network",onClick:()=>this.playWithRewards("stacks",[A((0,l.dq)("/stacks/index.html"))],{category:"content"})}))),n.createElement($,{activityStore:this.activityStore}),n.createElement("div",{className:"readable-width section"},n.createElement("h3",null,n.createElement("span",{className:"nowrap"},"Read more!",n.createElement("div",{className:"tooltip"},"5 coins per click"))),n.createElement("div",{className:"content-tiles"},n.createElement(he,{src:ue,alt:"An online vocabulary workbook based on hip-hop lyrics",onClick:()=>this.playWithRewards("rwr",[D({title:"Coming soon!",subtitle:"I guess you can have the coins anyway, though.",nextButtonTitle:"Whatever"})],{category:"content"})}),n.createElement(he,{src:me,alt:"A neural network for generating new baby names",onClick:()=>this.playWithRewards("names",[A((0,l.dq)("/names/index.html"))],{category:"content"})}))),n.createElement(W,{activityStore:this.activityStore}),n.createElement("div",{className:"readable-width section footer"},"October 2018. Made with ",n.createElement("a",{href:"https://www.gatsbyjs.org/"},"Gatsby")," and React. ",n.createElement("a",{href:".",onClick:this.reset.bind(this)},"Reset")," Thanks for reading!")))},i.reset=function(){this.activityStore.unsave()},t}(n.Component),he=e=>{let{src:t,alt:i,onClick:a}=e;return n.createElement("div",{className:"tile hover-offset",style:{backgroundImage:"url("+t+")"},alt:i,onClick:a})}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-02da55a91aa77f3d6179.js.map