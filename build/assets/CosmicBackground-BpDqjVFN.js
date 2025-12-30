import{j as t,r as a}from"./index-RvkOQh1s.js";function w(){const f=a.useRef(null),h=a.useRef([]),s=a.useRef();return a.useEffect(()=>{const e=f.current;if(!e)return;const i=e.getContext("2d");if(!i)return;const r=()=>{e.width=window.innerWidth,e.height=window.innerHeight};r(),window.addEventListener("resize",r);const m=800;h.current=Array.from({length:m},()=>({x:Math.random()*e.width,y:Math.random()*e.height,z:Math.random()*1e3,size:Math.random()*2}));const d=()=>{i.fillStyle="rgba(10, 10, 26, 0.1)",i.fillRect(0,0,e.width,e.height),h.current.forEach(n=>{n.z-=.5,n.z<=0&&(n.z=1e3,n.x=Math.random()*e.width,n.y=Math.random()*e.height);const o=1e3/n.z,l=(n.x-e.width/2)*o+e.width/2,c=(n.y-e.height/2)*o+e.height/2,u=n.size*o;if(l>=0&&l<=e.width&&c>=0&&c<=e.height){const x=Math.min(1,(1e3-n.z)/1e3);i.fillStyle=`rgba(255, 255, 255, ${x})`,i.beginPath(),i.arc(l,c,u,0,Math.PI*2),i.fill()}}),s.current=requestAnimationFrame(d)};return d(),()=>{window.removeEventListener("resize",r),s.current&&cancelAnimationFrame(s.current)}},[]),t.jsx("canvas",{ref:f,className:"absolute inset-0 w-full h-full",style:{background:"#0a0a1a"}})}function g(){return t.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[t.jsx("div",{className:"absolute top-[20%] left-[15%] w-32 h-32 opacity-10 animate-float-slow",style:{animation:"float 20s ease-in-out infinite, rotate 30s linear infinite"},children:t.jsx("svg",{viewBox:"0 0 100 100",className:"w-full h-full",children:t.jsx("polygon",{points:"50,5 95,75 5,75",fill:"none",stroke:"#a78bfa",strokeWidth:"1",className:"animate-pulse"})})}),t.jsx("div",{className:"absolute top-[60%] right-[20%] w-24 h-24 opacity-10",style:{animation:"float 15s ease-in-out infinite reverse, rotate 25s linear infinite reverse"},children:t.jsxs("svg",{viewBox:"0 0 100 100",className:"w-full h-full",children:[t.jsx("circle",{cx:"50",cy:"50",r:"45",fill:"none",stroke:"#a78bfa",strokeWidth:"1"}),t.jsx("circle",{cx:"50",cy:"50",r:"30",fill:"none",stroke:"#a78bfa",strokeWidth:"1"})]})}),t.jsx("div",{className:"absolute top-[40%] right-[10%] w-28 h-28 opacity-10",style:{animation:"float 18s ease-in-out infinite, rotate 20s linear infinite"},children:t.jsx("svg",{viewBox:"0 0 100 100",className:"w-full h-full",children:t.jsx("rect",{x:"10",y:"10",width:"80",height:"80",fill:"none",stroke:"#a78bfa",strokeWidth:"1",transform:"rotate(45 50 50)"})})}),t.jsx("style",{children:`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `})]})}function p(){return t.jsxs("div",{className:"absolute inset-0 -z-10",children:[t.jsx(w,{}),t.jsx(g,{})]})}export{p as CosmicScene};
