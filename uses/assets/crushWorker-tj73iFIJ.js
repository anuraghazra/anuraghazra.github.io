(function(){let e=1024,t=globalThis.CRUSH_LITE??(/Mobi|Android|iPhone|iPad/.test(navigator.userAgent)||navigator.maxTouchPoints>1&&!/Windows/.test(navigator.userAgent)),n=t?45e3:22e4,r=t?1.7:1,i=.3,a=3e5,o={E:2e11,sy:3e8,H:.03,ef:.25,t:8e-4,h:.003,flanged:.004},s={...o,t:.0012,flanged:.006},c={E:22e9,sy:28e7,H:0,ef:.09,t:.0016,h:.005},l={E:7e10,sy:2e8,H:.02,ef:.3,t:.01,h:.006,block:!0},u={E:24e8,sy:45e6,H:0,ef:.12,t:.002,h:.005},d={"Case - Chassis":[s,5],"Case - Top Panel":[o,.6],"Case - Right Panel":[o,.8],"Case - Mesh Panel":[o,.4],"Case - Rear Wall":[o,.7],"Case - Front IO":[u,.2],"Case - HDD Cage":[o,.3],"Case - Fans":[u,.5],"Case - Rear Fan":[u,.17],"AIO Cooler":[l,1.2],"Graphics Card":[l,1.6],Motherboard:[c,.9],RAM:[c,.1],CPU:[{E:13e10,sy:4e8,H:0,ef:.02,t:.003,h:.003},.08],SSD:[c,.01]},f=(e,t,n)=>e+1024+(t+1024)*2048+(n+1024)*4194304,p=[[1,0,0],[0,1,0],[0,0,1],[1,1,0],[1,-1,0],[1,0,1],[1,0,-1],[0,1,1],[0,1,-1],[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1]],m=.012,h=(e,t,n)=>Math.imul(e,73856093)^Math.imul(t,19349663)^Math.imul(n,83492791);var g=class{constructor(){this.size=0,this.grow(4096)}grow(e){let{ci:t,cj:n,ck:r,sum:i}=this;if(this.capacity=e,this.ci=new Int32Array(e),this.cj=new Int32Array(e),this.ck=new Int32Array(e),this.sum=new Float64Array(e*4),this.slots=new Int32Array(e*2).fill(-1),this.mask=e*2-1,t){this.ci.set(t),this.cj.set(n),this.ck.set(r),this.sum.set(i);for(let e=0;e<this.size;e++)this.slots[this.slotOf(this.ci[e],this.cj[e],this.ck[e])]=e}}slotOf(e,t,n){let{slots:r,mask:i,ci:a,cj:o,ck:s}=this,c=h(e,t,n)&i;for(;;){let l=r[c];if(l<0||a[l]===e&&o[l]===t&&s[l]===n)return c;c=c+1&i}}find(e,t,n){return this.slots[this.slotOf(e,t,n)]}add(e,t,n,r,i,a){let o=this.slotOf(e,t,n),s=this.slots[o];s<0&&(this.size===this.capacity&&(this.grow(this.capacity*2),o=this.slotOf(e,t,n)),s=this.size++,this.slots[o]=s,this.ci[s]=e,this.cj[s]=t,this.ck[s]=n);let c=this.sum;c[s*4]+=r,c[s*4+1]+=i,c[s*4+2]+=a,c[s*4+3]++}};function _(e,t,n,r){let{rest:i,index:a}=e,o=(a?a.length:i.length/3)/3,s=(e,t)=>(a?a[e*3+t]:e*3+t)*3;for(let e=0;e<o;e++){if(n.size>r)return!1;let a=s(e,0),o=s(e,1),c=s(e,2),l=i[a],u=i[a+1],d=i[a+2],f=i[o],p=i[o+1],m=i[o+2],h=i[c],g=i[c+1],_=i[c+2],v=Math.max(Math.hypot(l-f,u-p,d-m),Math.hypot(l-h,u-g,d-_),Math.hypot(f-h,p-g,m-_)),y=Math.max(1,Math.ceil(v/(t*.5)));for(let e=0;e<=y;e++)for(let r=0;r<=y-e;r++){let i=e/y,a=r/y,o=1-i-a,s=l*o+f*i+h*a,c=u*o+p*i+g*a,v=d*o+m*i+_*a;n.add(Math.floor(s/t),Math.floor(c/t),Math.floor(v/t),s,c,v)}}return n.size<=r}function v(e,t,n){let r=e.length/t,i=new Uint32Array(n),a=new Uint32Array(n),o=new Uint8Array(r),s=0;for(let n=0;n<r;n++){let r=0,c=0;for(let o=0;o<t;o++){let s=e[n*t+o];r|=i[s],c|=a[s]}let l=0;for(;l<32?r>>>l&1:c>>>l-32&1;)l++;if(l>=64)throw Error(`more than 64 colours`);o[n]=l,s=Math.max(s,l+1);for(let r=0;r<t;r++){let o=e[n*t+r];l<32?i[o]|=1<<l:a[o]|=1<<l-32}}let c=new Uint32Array(s+1);for(let e=0;e<r;e++)c[o[e]+1]++;for(let e=0;e<s;e++)c[e+1]+=c[e];let l=Array.from({length:s},(e,t)=>[c[t],c[t+1]-c[t]]),u=new Uint32Array(r),d=c.slice();for(let e=0;e<r;e++)u[d[o[e]]++]=e;return{order:u,ranges:l}}function y(e,t,n,r){let i=.012,a=/* @__PURE__ */ new Map,o=[],s=t=>f(Math.floor(e[t*3]/i),Math.floor(e[t*3+1]/i),Math.floor(e[t*3+2]/i));for(let e=0;e<r;e++){let t=s(e);(a.get(t)??a.set(t,[]).get(t)).push(e)}let c=/* @__PURE__ */ new Set;for(let i=0;i<r;i+=7){let r=s(i),l=!1;for(let s=-1;s<=1&&!l;s++)for(let u=-1;u<=1&&!l;u++)for(let d=-1;d<=1&&!l;d++)for(let f of a.get(r+s+u*2048+d*4194304)??[])if(!(n[f]===n[i]||c.has(f))&&!(Math.hypot(e[i*3]-e[f*3],e[i*3+1]-e[f*3+1],e[i*3+2]-e[f*3+2])>(t[i]+t[f])*.9)){o.push(i,f),c.add(f),l=!0;break}}return o}function b(e,t,n,r){let i=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(let r=t;r<n;r++)for(let t=0;t<3;t++)i[t]=Math.min(i[t],e[r*3+t]),a[t]=Math.max(a[t],e[r*3+t]);let o=r*2,s,c;for(;s=i.map(e=>Math.floor(e/o)),c=a.map((e,t)=>Math.floor(e/o)-s[t]+1),!(c[0]*c[1]*c[2]<=4e6);)o*=1.5;let[l,u,d]=c,f=l*u*d,p=new Int32Array(n-t),m=new Int32Array(f+1);for(let r=t;r<n;r++){let n=Math.floor(e[r*3]/o)-s[0]+l*(Math.floor(e[r*3+1]/o)-s[1]+u*(Math.floor(e[r*3+2]/o)-s[2]));p[r-t]=n,m[n+1]++}for(let e=0;e<f;e++)m[e+1]+=m[e];let h=new Int32Array(n-t),g=m.slice(0,f);for(let e=t;e<n;e++)h[g[p[e-t]]++]=e;return{s:o,origin:s,nx:l,ny:u,nz:d,start:m,items:h}}function x(e,t,n){let r=/* @__PURE__ */ new Map,i=0;for(let e of t)e.size&&r.set(e.name,{body:e,...b(n,e.first,e.first+e.size,e.material.h)});let a=e.map(e=>{let t=e.rest.length/3,a=new Float32Array(t*4),o=new Float32Array(t*4),s=r.get(e.part),c=[0,0,0,0],l=[0,0,0,0],u=new Uint32Array(e.rest.buffer,e.rest.byteOffset,e.rest.length),d=new Uint8Array(t),f=1;for(;f<t*2;)f*=2;let p=new Int32Array(f).fill(-1),g=f-1;for(let r=0;s&&r<t;r++){let t=u[r*3],f=u[r*3+1],_=u[r*3+2],v=h(t,f,_)&g,y=-1;for(;;){let e=p[v];if(e<0){p[v]=r;break}if(u[e*3]===t&&u[e*3+1]===f&&u[e*3+2]===_){y=e;break}v=v+1&g}if(y>=0){for(let e=0;e<4;e++)a[r*4+e]=a[y*4+e],o[r*4+e]=o[y*4+e];d[r]=d[y],i+=d[r];continue}let b=e.rest[r*3],x=e.rest[r*3+1],S=e.rest[r*3+2],{s:C,origin:w,nx:T,ny:E,nz:D,start:O,items:k}=s,A=s.body.material.h,j=Math.floor(b/C)-w[0],M=Math.floor(x/C)-w[1],N=Math.floor(S/C)-w[2],P=Math.max(j,T-1-j,M,E-1-M,N,D-1-N);l.fill(1/0);for(let e=0;e<=P;e++){for(let t=-e;t<=e;t++){let r=N+t;if(!(r<0||r>=D))for(let i=-e;i<=e;i++){let a=M+i;if(a<0||a>=E)continue;let o=e===0||t===-e||t===e||i===-e||i===e?1:2*e;for(let t=-e;t<=e;t+=o){let e=j+t;if(e<0||e>=T)continue;let i=e+T*(a+E*r);for(let e=O[i];e<O[i+1];e++){let t=k[e],r=(n[t*3]-b)**2+(n[t*3+1]-x)**2+(n[t*3+2]-S)**2;if(r>=l[3])continue;let i=3;for(;i>0&&r<l[i-1];)l[i]=l[i-1],c[i]=c[i-1],i--;l[i]=r,c[i]=t}}}}if(l[0]===1/0)continue;let t=Math.min(b-(w[0]+j-e)*C,(w[0]+j+e+1)*C-b,x-(w[1]+M-e)*C,(w[1]+M+e+1)*C-x,S-(w[2]+N-e)*C,(w[2]+N+e+1)*C-S);if(t*t>=Math.min(l[3],l[0]*4+A*A*2))break}d[r]=+(l[0]>m*m),i+=d[r];let F=(A*.3)**2,I=0;for(let e=0;e<4;e++){let t=l[e]<l[0]*4+A*A*2?1/(l[e]+F):0;o[r*4+e]=t,a[r*4+e]=t?c[e]:0,I+=t}for(let e=0;e<4;e++)o[r*4+e]/=I}let _=new Float32Array(t*2),v=e.index?e.index.length:t;for(let t=0;t+2<v;t+=3){let n=e.index?[e.index[t],e.index[t+1],e.index[t+2]]:[t,t+1,t+2];for(let e=0;e<3;e++)_[n[e]*2]=a[n[(e+1)%3]*4],_[n[e]*2+1]=a[n[(e+2)%3]*4]}return{ids:a,weights:o,mates:_}});return x.unbound=i,a}function S(t,o){let s=[...new Set(t.map(e=>e.part))],c=r,l;for(let e=!1;!e;){l=[];let r=0;e=!0;for(let i of s){let[a,o]=d[i]??[u,.3],s={...a,h:a.h*c},f=new g;for(let a of t)if(a.part===i&&!(e=_(a,s.h,f,n-r)))break;if(!e)break;r+=f.size,l.push({name:i,material:s,kg:o,cells:f})}e||(c*=1.08)}let f=l.reduce((e,t)=>e+t.cells.size,0),m=new Float64Array(f*3),h=new Float64Array(f),b=new Float64Array(f),S=new Int32Array(f),C=[],w=[],T=0;l.forEach((e,t)=>{let{cells:n}=e,{sum:r,ci:i,cj:a,ck:o}=n,s=e.kg/n.size;e.first=T,e.size=n.size;for(let i=0;i<n.size;i++,T++){let n=r[i*4+3];m[T*3]=r[i*4]/n,m[T*3+1]=r[i*4+1]/n,m[T*3+2]=r[i*4+2]/n,h[T]=1/s,b[T]=e.material.h*.6,S[T]=t}for(let r=0;r<n.size;r++)for(let s=0;s<p.length;s++){let[c,l,u]=p[s],d=n.find(i[r]+c,a[r]+l,o[r]+u);if(d<0)continue;C.push(e.first+r,e.first+d,t);let f=s<9?n.find(i[r]+c*2,a[r]+l*2,o[r]+u*2):-1;f>=0&&w.push(e.first+r,e.first+d,e.first+f,t)}e.cells=null});let E=y(m,b,S,f),D=new Uint32Array(l.length);for(let e of E)D[S[e]]++;let O=(e,t)=>Math.hypot(m[e*3]-m[t*3],m[e*3+1]-m[t*3+1],m[e*3+2]-m[t*3+2]),k=C.length/3+E.length/2,A=new Uint32Array(k*2),j=new Int32Array(k).fill(-1);for(let e=0;e<C.length/3;e++)A[e*2]=C[e*3],A[e*2+1]=C[e*3+1],j[e]=C[e*3+2];for(let e=0;e<E.length/2;e++){let t=C.length/3+e;A[t*2]=E[e*2],A[t*2+1]=E[e*2+1]}let M=v(A,2,f),N=new Uint32Array(k*4),P=new Float32Array(k*4),F=new Float32Array(N.buffer);M.order.forEach((e,t)=>{let n=A[e*2],r=A[e*2+1],i=O(n,r),o=j[e];if(N[t*4]=n,N[t*4+1]=r,P[t*4]=i,P[t*4+1]=i,o<0)N[t*4+2]=2,P[t*4+2]=1/a,F[t*4+3]=900/a;else{let e=l[o].material;N[t*4+2]=1,P[t*4+2]=1/(e.E*e.t),P[t*4+3]=Math.max(e.sy/e.E,.01),F[t*4+3]=e.ef}});let I=new Uint32Array(f+1),L=new Uint32Array(C.length/3*2);for(let e=0;e<C.length;e+=3)I[C[e]+1]++,I[C[e+1]+1]++;for(let e=0;e<f;e++)I[e+1]+=I[e];let R=I.slice(0,f);for(let e=0;e<C.length;e+=3)L[R[C[e]]++]=C[e+1],L[R[C[e+1]]++]=C[e];let z=e=>I[e+1]-I[e],B=new Uint8Array(f).fill(255),V=[];for(let e=0;e<w.length;e+=4){let t=w[e],n=w[e+1],r=w[e+2],i=O(t,n),a=0;for(let e=0;e<3;e++)a+=(m[t*3+e]+m[r*3+e]-2*m[n*3+e])**2;Math.sqrt(a)>i*.8&&B[n]&&(B[n]=0,V.push(n))}for(let e=0;e<f;e++)z(e)<=3&&z(e)>0&&B[e]&&(B[e]=0,V.push(e));for(let e=1;e<=1&&V.length;e++){let t=[];for(let n of V)for(let r=I[n];r<I[n+1];r++){let n=L[r];B[n]===255&&(B[n]=e,t.push(n))}V=t}let H=w.length/4,ee=new Uint32Array(H*3);for(let e=0;e<H;e++)for(let t=0;t<3;t++)ee[e*3+t]=w[e*4+t];let te=v(ee,3,f),U=new Uint32Array(H*4),W=new Float32Array(H*4),G=new Float32Array(H*4);te.order.forEach((e,t)=>{let n=w[e*4],r=w[e*4+1],a=w[e*4+2],o=l[w[e*4+3]].material;U[t*4]=n,U[t*4+1]=r,U[t*4+2]=a;for(let e=0;e<3;e++)W[t*4+e]=m[n*3+e]+m[a*3+e]-2*m[r*3+e];let s=o.flanged&&B[r]<=1?o.flanged:o.t,c=O(n,r),u=o.E*s**3/(12*(1-i*i)),d=o.sy*s*s/4;W[t*4+3]=c*c/u,G[t*4]=d/u*c*c,G[t*4+1]=o.H,G[t*4+3]=2*o.ef/o.t*c*c});let K=0;for(let e=0;e<f;e++)K=Math.max(K,z(e));let q=new Uint32Array(f+1),J=new Int32Array(f).fill(-1),Y=new Uint32Array(K+K*K),X=new Uint32Array(f*17),ne=0;for(let e=0;e<f;e++){let t=0;J[e]=e;for(let n=I[e];n<I[e+1];n++){let r=L[n];J[r]!==e&&(J[r]=e,Y[t++]=r)}for(let n=I[e];n<I[e+1];n++){let r=L[n];for(let n=I[r];n<I[r+1];n++){let r=L[n];J[r]!==e&&(J[r]=e,Y[t++]=r)}}let n=Math.max(1,t/16);for(let e=0;e<t;e+=n)X[ne++]=Y[Math.floor(e)];q[e+1]=ne}X=X.slice(0,ne);let Z=new Float32Array(f*4),Q=new Float32Array(f*4),re=0;for(let e=0;e<f;e++){for(let t=0;t<3;t++)Z[e*4+t]=m[e*3+t]-o[t];Z[e*4+3]=b[e],Q[e*4]=h[e],Q[e*4+1]=S[e],Q[e*4+3]=z(e),re=Math.max(re,m[e*3+1]+b[e])}let ie=0;for(let e=0;e<f;e++)ie=Math.max(ie,Z[e*4]+b[e]+.17);let ae=x(t,l,m),oe=Math.ceil(f/e),$=new Float32Array(e*oe*4);for(let e=0;e<f;e++)$[e*4]=m[e*3],$[e*4+1]=m[e*3+1],$[e*4+2]=m[e*3+2],$[e*4+3]=1;return{sideTop:ie,bodyFasteners:D,count:f,height:oe,top:re,restLocal:Z,meta:Q,restTexture:$,bindings:ae,ringStart:q,ringList:X,linkIndex:N,linkData:P,linkRanges:M.ranges,hingeIndex:U,hingeShape:W,hingeLimits:G,hingeRanges:te.ranges,stats:{flanged:B.reduce((e,t)=>e+ +(t<=1),0),unbound:x.unbound,links:k,hinges:H,fasteners:E.length/2,scale:c}}}let C=Number(globalThis.XPBD_SUBSTEPS??(t?12:32)),w=1/(60*C),T=.995**(16/C),E=Number(globalThis.XPBD_ZETA??.1),D=Number(globalThis.XPBD_START??1.8),O=Number(globalThis.XPBD_GROWTH??.5),k=.02,A=Number(globalThis.XPBD_MIN_LINKS??2),j=Number(globalThis.XPBD_MASS??2e3),M=.08,N=.15,P=t?.0135:.0085,F=t?17:19,I=30*C,L=1e6,R=`0.17`,z={plate:0,round:1,wedge:2,dome:3,crosswedge:4},B=`
struct Params { ram: f32, dt: f32, idt2: f32, damp: f32, gravity: f32, plastic: f32, shape: f32, size: f32,
  maxLink: f32, maxHinge: f32, maxContact: f32, maxSpeed: f32, friction: f32, ramFriction: f32, floorFriction: f32, count: f32 };
struct Range { start: u32, count: u32 };
@group(1) @binding(0) var<uniform> P: Params;
@group(1) @binding(1) var<uniform> R: Range;
fn turn(q: vec4f, v: vec3f) -> vec3f { return v + 2. * cross(q.xyz, cross(q.xyz, v) + q.w * v); }
fn cellOf(p: vec3f) -> vec3i { return vec3i(floor(p / ${P})); }
fn hashOf(c: vec3i) -> u32 { return ((u32(c.x) * 73856093u) ^ (u32(c.y) * 19349663u) ^ (u32(c.z) * 83492791u)) & ${(1<<F)-1}u; }
`,V=`@group(0) @binding(15) var<storage, read_write> stats: array<atomic<u32>>;`,H={predict:`
@group(0) @binding(18) var<storage, read> support: array<f32>;
@group(0) @binding(0) var<storage, read> x: array<vec4f>;
@group(0) @binding(1) var<storage, read_write> p: array<vec4f>;
@group(0) @binding(2) var<storage, read_write> v: array<vec4f>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3u) {
  let n = g.x; if (n >= u32(P.count)) { return; }
  var u = v[n].xyz;
  // What is still joined to the floor is carried by the structure; its weight is nothing beside a press.
  if (support[n] < ${k}) { u.y -= P.gravity * P.dt; }
  v[n] = vec4f(u, 0.);
  p[n] = vec4f(x[n].xyz + u * P.dt, 0.);
}`,links:`
${V}
@group(0) @binding(0) var<storage, read> x: array<vec4f>;
@group(0) @binding(1) var<storage, read_write> p: array<vec4f>;
@group(0) @binding(5) var<storage, read_write> info: array<vec4f>;
@group(0) @binding(18) var<storage, read_write> support: array<f32>;
@group(0) @binding(8) var<storage, read_write> index: array<vec4u>;
@group(0) @binding(9) var<storage, read_write> data: array<vec4f>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3u) {
  if (g.x >= R.count) { return; }
  let i = g.x + R.start; let id = index[i]; if (id.z == 0u) { return; }
  var d = data[i];
  let held = max(support[id.x], support[id.y]) - 0.002;
  if (held > support[id.x]) { support[id.x] = held; }
  if (held > support[id.y]) { support[id.y] = held; }
  let delta = p[id.y].xyz - p[id.x].xyz; let len = length(delta); if (len < 1e-9) { return; }
  let wa = info[id.x].x; let wb = info[id.y].x; let C = len - d.x;
  let compliance = d.z * P.idt2; let normal = delta / len; let w = wa + wb;
  // Eq. 26, with beta set to a share of critical damping for this constraint's mass and stiffness.
  let gamma = compliance * P.dt * 2. * ${E.toFixed(4)} * sqrt(1. / (w * d.z));
  let moved = dot(normal, (p[id.y].xyz - x[id.y].xyz) - (p[id.x].xyz - x[id.x].xyz));
  let k = clamp(C + gamma * moved, -P.maxLink, P.maxLink) / ((1. + gamma) * w + compliance) / len;
  p[id.x] = vec4f(p[id.x].xyz + delta * k * wa, 0.); p[id.y] = vec4f(p[id.y].xyz - delta * k * wb, 0.);
  if (P.plastic < .5) { return; }
  let limit = bitcast<f32>(id.w);
  if (id.z == 2u) { // a fastener lets go at a force
    if (C > limit) { index[i].z = 0u; atomicAdd(&stats[2], 1u); }
    return;
  }
  let y = d.w * d.x;
  if (abs(C) > y) { d.x = max(d.x + sign(C) * (abs(C) - y), d.y * .9); data[i].x = d.x; }
  // Ductile fracture: drawn past its limit, sooner where a crease has already used the metal up.
  let damage = max(info[id.x].z, info[id.y].z);
  // info.w packs the original link count (hundreds) and the live count.
  let ax = info[id.x].w; let ay = info[id.y].w; let da = floor(ax / 100.); let db = floor(ay / 100.); let la = ax - da * 100.; let lb = ay - db * 100.;
  let lost = max(1. - la / max(da, 1.), 1. - lb / max(db, 1.));
  let tip = smoothstep(0.02, 0.3, lost);
  let keeps = la > ${A.toFixed(1)} && lb > ${A.toFixed(1)};
  if (keeps && d.x / d.y - 1. > limit * mix(${D.toFixed(3)}, ${O.toFixed(3)}, tip) * (1. - .85 * min(damage, 1.))) {
    index[i].z = 0u; atomicAdd(&stats[3], 1u);
    info[id.x].w -= 1.; info[id.y].w -= 1.;
  }
}`,hinges:`
${V}
@group(0) @binding(0) var<storage, read> x: array<vec4f>;
@group(0) @binding(1) var<storage, read_write> p: array<vec4f>;
@group(0) @binding(3) var<storage, read> q: array<vec4f>;
@group(0) @binding(5) var<storage, read_write> info: array<vec4f>;
@group(0) @binding(10) var<storage, read> index: array<vec4u>;
@group(0) @binding(11) var<storage, read_write> shape: array<vec4f>;
@group(0) @binding(12) var<storage, read_write> limits: array<vec4f>;
@group(0) @binding(17) var<storage, read> base: array<vec4f>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3u) {
  if (g.x >= R.count) { return; }
  let i = g.x + R.start; let id = index[i]; let frame = q[id.y]; var s = shape[i];
  let curve = p[id.x].xyz + p[id.z].xyz - 2. * p[id.y].xyz;
  let error = curve - turn(frame, s.xyz); let C = length(error); if (C < 1e-10) { return; }
  let wa = info[id.x].x; let wm = info[id.y].x; let wb = info[id.z].x; let n = error / C;
  let compliance = s.w * P.idt2; let w = wa + wb + 4. * wm;
  let gamma = compliance * P.dt * 2. * ${E.toFixed(4)} * sqrt(1. / (w * s.w));
  let moved = dot(n, (p[id.x].xyz - x[id.x].xyz) + (p[id.z].xyz - x[id.z].xyz) - 2. * (p[id.y].xyz - x[id.y].xyz));
  let k = min(C + gamma * moved, P.maxHinge) / ((1. + gamma) * w + compliance);
  p[id.x] = vec4f(p[id.x].xyz - n * k * wa, 0.); p[id.z] = vec4f(p[id.z].xyz - n * k * wb, 0.); p[id.y] = vec4f(p[id.y].xyz + 2. * n * k * wm, 0.);
  if (P.plastic < .5) { return; }
  var l = limits[i];
  let y = l.x * (1. + l.y * l.z / l.x); // work hardening: bent metal is stronger
  if (C <= y) { return; }
  let flow = C - y;
  s = vec4f(s.xyz + turn(vec4f(-frame.xyz, frame.w), n) * flow, s.w); shape[i] = s;
  l.z += flow; limits[i] = l;
  atomicAdd(&stats[0], u32(flow * (y / s.w) * ${L}));
  let sharp = length(s.xyz - base[i].xyz) / l.w; // net permanent bend: vibration is never counted as damage
  if (sharp > info[id.y].z) { info[id.y].z = sharp; }
}`,rotate:`
@group(0) @binding(0) var<storage, read> x: array<vec4f>;
@group(0) @binding(3) var<storage, read_write> q: array<vec4f>;
@group(0) @binding(4) var<storage, read> rest: array<vec4f>;
@group(0) @binding(13) var<storage, read> start: array<u32>;
@group(0) @binding(14) var<storage, read> list: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3u) {
  let n = g.x; if (n >= u32(P.count)) { return; }
  var a0 = vec3f(0.); var a1 = vec3f(0.); var a2 = vec3f(0.);
  for (var r = start[n]; r < start[n + 1u]; r++) {
    let j = list[r]; let c = x[j].xyz - x[n].xyz; let o = rest[j].xyz - rest[n].xyz;
    a0 += c * o.x; a1 += c * o.y; a2 += c * o.z;
  }
  var f = q[n];
  let r0 = turn(f, vec3f(1., 0., 0.)); let r1 = turn(f, vec3f(0., 1., 0.)); let r2 = turn(f, vec3f(0., 0., 1.));
  let w = (cross(r0, a0) + cross(r1, a1) + cross(r2, a2)) / (abs(dot(r0, a0) + dot(r1, a1) + dot(r2, a2)) + 1e-12);
  let angle = length(w);
  if (angle > 1e-7) {
    let half_ = min(angle, 1.) * .5; let b = vec4f(w / angle * sin(half_), cos(half_));
    f = normalize(vec4f(b.w * f.xyz + f.w * b.xyz + cross(b.xyz, f.xyz), b.w * f.w - dot(b.xyz, f.xyz)));
    q[n] = f;
  }
}`,grid:`
@group(0) @binding(0) var<storage, read> x: array<vec4f>;
@group(0) @binding(6) var<storage, read_write> counts: array<atomic<u32>>;
@group(0) @binding(7) var<storage, read_write> slots: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3u) {
  let n = g.x; if (n >= u32(P.count)) { return; }
  let c = hashOf(cellOf(x[n].xyz)); let i = atomicAdd(&counts[c], 1u);
  if (i < 12u) { slots[c * 12u + i] = n; }
}`,contact:`
${V}
@group(0) @binding(0) var<storage, read> x: array<vec4f>;
@group(0) @binding(1) var<storage, read> p: array<vec4f>;
@group(0) @binding(4) var<storage, read> rest: array<vec4f>;
@group(0) @binding(5) var<storage, read> info: array<vec4f>;
@group(0) @binding(6) var<storage, read_write> counts: array<atomic<u32>>;
@group(0) @binding(7) var<storage, read> slots: array<u32>;
@group(0) @binding(16) var<storage, read_write> out: array<vec4f>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3u) {
  let n = g.x; if (n >= u32(P.count)) { return; }
  let me = p[n].xyz; let home = rest[n]; let mine = info[n]; let centre = cellOf(me);
  var shift = vec3f(0.); var hits = 0.; var deep = false;
  for (var dz = -1; dz <= 1; dz++) { for (var dy = -1; dy <= 1; dy++) { for (var dx = -1; dx <= 1; dx++) {
    let c = hashOf(centre + vec3i(dx, dy, dz));
    let size = min(atomicLoad(&counts[c]), 12u);
    for (var s = 0u; s < size; s++) {
      let m = slots[c * 12u + s]; if (m == n) { continue; }
      let there = p[m].xyz; let delta = me - there; let d2 = dot(delta, delta);
      let reach = home.w + rest[m].w; if (d2 >= reach * reach || d2 < 1e-14) { continue; }
      let other = info[m]; let far = rest[m].xyz - home.xyz; let apart = dot(far, far);
      let keep = select(reach, reach * 2.2, other.y == mine.y); // neighbours are held apart by their own links
      if (apart < keep * keep) { continue; }
      let d = sqrt(d2); let normal = delta / d; let overlap = reach - d; let push = min(overlap, P.maxContact);
      let share = mine.x / (mine.x + other.x);
      if (overlap > reach * .5) { deep = true; }
      var slip = (me - x[n].xyz) - (there - x[m].xyz); slip -= normal * dot(slip, normal);
      let size2 = length(slip);
      var step = normal * push * share;
      if (size2 > 1e-12) { step -= slip * min(1., P.friction * push / size2) * share; }
      shift += step; hits += 1.;
    }
  } } }
  if (deep) { atomicAdd(&stats[1], 1u); }
  out[n] = vec4f(shift / max(1., hits * .5), 0.);
}`,apply:`
@group(0) @binding(1) var<storage, read_write> p: array<vec4f>;
@group(0) @binding(16) var<storage, read> out: array<vec4f>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3u) {
  let n = g.x; if (n >= u32(P.count)) { return; }
  p[n] = vec4f(p[n].xyz + out[n].xyz, 0.);
}`,finish:`
@group(0) @binding(0) var<storage, read_write> x: array<vec4f>;
@group(0) @binding(1) var<storage, read_write> p: array<vec4f>;
@group(0) @binding(2) var<storage, read_write> v: array<vec4f>;
@group(0) @binding(4) var<storage, read> rest: array<vec4f>;
@group(0) @binding(16) var<storage, read> out: array<vec4f>;
@group(0) @binding(18) var<storage, read_write> support: array<f32>;
@group(0) @binding(5) var<storage, read> info: array<vec4f>;
const OFF = 1e6;
// A shape of 10 or more drives the ram along x against an anvil, instead of down onto the floor.
fn sideways() -> bool { return P.shape > 9.5; }
fn travel(a: vec3f) -> f32 { return select(a.y, a.x + ${R}, sideways()); } // the ram's axis, measured from what it presses against
fn across(a: vec3f) -> vec3f { return select(a, vec3f(a.y - 0.22, 0., a.z), sideways()); } // the two axes across the head
fn face(a: vec3f) -> f32 {
  let shape = P.shape % 10.; let k = P.size; let d2 = a.x * a.x + a.z * a.z;
  if (shape > 3.5) { return select(OFF, abs(a.z), abs(a.z) < .13 * k && abs(a.x) < .25 * k); }
  if (shape < .5) { return select(OFF, 0., abs(a.x) < .18 * k && abs(a.z) < .25 * k); }
  if (shape < 1.5) { return select(OFF, 0., d2 < (.11 * k) * (.11 * k)); }
  if (shape < 2.5) { return select(OFF, abs(a.x), abs(a.x) < .13 * k && abs(a.z) < .25 * k); }
  let r = .14 * k; return select(OFF, r - sqrt(max(r * r - d2, 0.)), d2 < r * r);
}
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3u) {
  let n = g.x; if (n >= u32(P.count)) { return; }
  var a = p[n].xyz; let old = x[n].xyz; let r = rest[n].w; var held = support[n] * (1. - 0.0015);
  let limit = P.ram - r + face(across(a)); let side = sideways();
  if (travel(a) > limit) {
    if (face(across(old)) > 1e5) { a = select(vec3f(old.x, a.y, old.z), vec3f(a.x, old.y, old.z), side); } // ran into the side of the head
    else if (side) { a = vec3f(a.x + limit - travel(a), mix(a.y, old.y, P.ramFriction), mix(a.z, old.z, P.ramFriction)); }
    else { a = vec3f(mix(a.x, old.x, P.ramFriction), limit, mix(a.z, old.z, P.ramFriction)); }
  }
  if (side) {
    let anvil = min(r - ${R}, rest[n].x);
    if (a.x < anvil) { a = vec3f(anvil, mix(a.y, old.y, P.floorFriction), mix(a.z, old.z, P.floorFriction)); held = 1.; }
  }
  let floorY = min(r, rest[n].y);
  if (a.y < floorY + .0005) { held = 1.; }
  if (a.y < floorY) { a = vec3f(mix(a.x, old.x, P.floorFriction), floorY, mix(a.z, old.z, P.floorFriction)); }
  var u = (a - old) / P.dt * P.damp;
  // The velocity pass of Mueller et al. 2020 (Eq. 34), with no restitution: a contact push fixes an overlap, and must
  // not become speed. Without this, every squeezed particle is fired apart and a packed pile behaves like a fluid.
  let pushed = out[n].xyz; let amount = length(pushed);
  if (amount > 1e-9) { let normal = pushed / amount; u -= normal * dot(u, normal); }
  support[n] = held;
  let top = select(1, P.maxSpeed, held < ${k}); let speed = length(u); if (speed > top) { u *= top / speed; }
  v[n] = vec4f(u, 0.); x[n] = vec4f(a, info[n].z); p[n] = vec4f(a, 0.); // x.w carries the fold to the renderer
}`},ee={predict:{18:`read`,0:`read`,1:`rw`,2:`rw`},links:{15:`rw`,0:`read`,1:`rw`,5:`rw`,8:`rw`,9:`rw`,18:`rw`},hinges:{15:`rw`,0:`read`,1:`rw`,3:`read`,5:`rw`,10:`read`,11:`rw`,12:`rw`,17:`read`},rotate:{0:`read`,3:`rw`,4:`read`,13:`read`,14:`read`},grid:{0:`read`,6:`rw`,7:`rw`},contact:{15:`rw`,0:`read`,1:`read`,4:`read`,5:`read`,6:`rw`,7:`read`,16:`rw`},apply:{1:`rw`,16:`read`},finish:{0:`rw`,1:`rw`,2:`rw`,4:`read`,16:`read`,18:`rw`,5:`read`}};var te=class t{static async create(e,n){let r=await e.requestAdapter({powerPreference:`high-performance`});if(!r)return null;let i=await r.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:Math.min(10,r.limits.maxStorageBuffersPerShaderStage),maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize}});return new t(i,n)}constructor(e,t){Object.assign(this,{device:e,model:t,frames:0,head:{shape:`plate`,size:1},mode:`idle`});let{count:n}=t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC,i=t=>e.createBuffer({size:Math.max(16,t),usage:r}),a=t=>{let n=i(t.byteLength);return e.queue.writeBuffer(n,0,t),n};this.buffers={0:i(n*16),1:i(n*16),2:i(n*16),3:i(n*16),4:a(t.restLocal),5:i(n*16),6:i(4<<F),7:i(48<<F),8:i(t.linkIndex.byteLength),9:i(t.linkData.byteLength),10:a(t.hingeIndex),11:i(t.hingeShape.byteLength),12:i(t.hingeLimits.byteLength),13:a(t.ringStart),14:a(t.ringList),15:i(128),16:i(n*16),17:a(t.hingeShape),18:i(n*4)},this.params=e.createBuffer({size:256*(C+1),usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let o=[...t.linkRanges,...t.hingeRanges];this.linkOffsets=t.linkRanges.map((e,t)=>t*256),this.hingeOffsets=t.hingeRanges.map((e,n)=>(n+t.linkRanges.length)*256);let s=new Uint32Array(o.length*256/4);o.forEach(([e,t],n)=>{s[n*256/4]=e,s[n*256/4+1]=t}),this.ranges=e.createBuffer({size:s.byteLength+256,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(this.ranges,0,s);let c=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:64}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:8}}]});this.uniformGroup=e.createBindGroup({layout:c,entries:[{binding:0,resource:{buffer:this.params,size:64}},{binding:1,resource:{buffer:this.ranges,size:8}}]}),this.passes={};for(let[t,n]of Object.entries(H)){let r=ee[t],i=e.createBindGroupLayout({entries:Object.entries(r).map(([e,t])=>({binding:Number(e),visibility:GPUShaderStage.COMPUTE,buffer:{type:t===`rw`?`storage`:`read-only-storage`}}))}),a=e.createComputePipeline({layout:e.createPipelineLayout({bindGroupLayouts:[i,c]}),compute:{module:e.createShaderModule({code:B+n}),entryPoint:`main`}}),o=e.createBindGroup({layout:i,entries:Object.keys(r).map(e=>({binding:Number(e),resource:{buffer:this.buffers[e]}}))});this.passes[t]={pipeline:a,group:o}}this.staging=[0,1].map(()=>e.createBuffer({size:n*32+128,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST})),this.reset()}reset(){let{model:e,device:t}=this,{count:n,restLocal:r}=e,i=t.queue,a=r.slice(),o=()=>{let e=[Math.random()-.5,Math.random()-.5,Math.random()-.5],t=Math.hypot(...e)||1;return e.map(e=>e/t)};for(let e=0;e<7;e++){let e=o(),t=o(),i=Math.random()*7,s=Math.PI*2/(.18+Math.random()*.42);for(let o=0;o<n;o++){let n=o*4,c=Math.sin((r[n]*e[0]+r[n+1]*e[1]+r[n+2]*e[2])*s+i)*15e-5;a[n]+=c*t[0],a[n+1]+=c*t[1],a[n+2]+=c*t[2]}}for(let e=0;e<n;e++)a[e*4+3]=0;let s=new Float32Array(n*4),c=e.meta.slice();for(let e=0;e<n;e++)s[e*4+3]=1,c[e*4]/=j,c[e*4+3]*=101;i.writeBuffer(this.buffers[18],0,new Float32Array(n).fill(1)),i.writeBuffer(this.buffers[0],0,a),i.writeBuffer(this.buffers[1],0,a),i.writeBuffer(this.buffers[2],0,new Float32Array(n*4)),i.writeBuffer(this.buffers[3],0,s),i.writeBuffer(this.buffers[5],0,c),i.writeBuffer(this.buffers[8],0,e.linkIndex),i.writeBuffer(this.buffers[9],0,e.linkData),i.writeBuffer(this.buffers[11],0,e.hingeShape),i.writeBuffer(this.buffers[12],0,e.hingeLimits);let l=/* @__PURE__ */ new Uint32Array(32);l.set(e.bodyFasteners,4),i.writeBuffer(this.buffers[15],0,l),Object.assign(this,{topStrokes:0,sideStrokes:0,low:N,ram:e.top+.002,tick:0,mode:`idle`,held:0,stalling:!1,lastWork:0,broken:0,screws:0,jammed:0,bottomed:!1})}start(e){this.head=e,this.mode=`down`,this.ram=(e.side?this.model.sideTop:this.model.top)+.002;let t=e.side?.15:N,n=(e.side?this.sideStrokes++:this.topStrokes++)*.03;this.low=Math.max(.05,t-n),this.bottomed=!1,this.stalling=!1,this.held=0}lift(){this.mode=`up`,this.liftFrames=200}run(e,t,n,r){let{pipeline:i,group:a}=this.passes[t];e.setPipeline(i),e.setBindGroup(0,a),e.setBindGroup(1,this.uniformGroup,n),e.dispatchWorkgroups(r)}async frame(){let{device:t,model:n,buffers:r}=this,{count:i}=n,a=new Float32Array(256*C/4),o=Math.ceil(i/256),s=this.ram;for(let e=0;e<C;e++){this.mode===`down`&&!this.stalling?this.ram=Math.max(this.low,this.ram-M*w):this.mode===`up`&&(this.ram+=.08*w);let t=+(this.tick+e>I&&this.mode!==`up`);a.set([this.ram,w,1/(w*w),this.mode===`up`?.97:T,9.81,t,z[this.head.shape]+(this.head.side?10:0),this.head.size,1,1,2e-4,3,.35,.25,.8,i],e*256/4)}t.queue.writeBuffer(this.params,0,a);let c=t.createCommandEncoder();for(let e=0;e<C;e++){let t=e*256;if(this.tick%4==0){c.clearBuffer(r[6]);let e=c.beginComputePass();this.run(e,`grid`,[t,0],o),e.end()}let i=c.beginComputePass();this.run(i,`predict`,[t,0],o);for(let e=0;e<n.linkRanges.length;e++)this.run(i,`links`,[t,this.linkOffsets[e]],Math.ceil(n.linkRanges[e][1]/256));for(let e=0;e<n.hingeRanges.length;e++)this.run(i,`hinges`,[t,this.hingeOffsets[e]],Math.ceil(n.hingeRanges[e][1]/256));this.run(i,`contact`,[t,0],o),this.run(i,`apply`,[t,0],o),this.run(i,`finish`,[t,0],o),this.tick%2==0&&this.run(i,`rotate`,[t,0],o),i.end(),this.tick++}let l=this.staging[this.frames++%2];c.copyBufferToBuffer(r[0],0,l,0,i*16),c.copyBufferToBuffer(r[3],0,l,i*16,i*16),c.copyBufferToBuffer(r[15],0,l,i*32,128),c.clearBuffer(r[15],4,4),t.queue.submit([c.finish()]),await l.mapAsync(GPUMapMode.READ);let u=new Float32Array(l.getMappedRange()),d=new Uint32Array(u.buffer,u.byteOffset+i*32,8),f=new Float32Array(e*n.height*4),p=new Float32Array(f.length);f.set(u.subarray(0,i*4)),p.set(u.subarray(i*4,i*8));let m=(d[0]-this.lastWork>>>0)/L;this.lastWork=d[0],this.jammed=d[1],this.screws=d[2],this.broken=d[3],l.unmap();let h=m/Math.max(s-this.ram,M*C*w)/9810;return this.mode===`down`?(this.stalling=h>1e3,this.held=this.stalling?this.held+1:Math.max(0,this.held-1),(this.ram===this.low||this.held>60)&&(this.bottomed=!0)):this.mode===`up`&&--this.liftFrames<=0&&(this.mode=`idle`),{position:f,rotation:p,ram:this.ram,tons:h,bottomed:this.bottomed&&this.mode===`down`,broken:this.broken,screws:this.screws}}};let U=[1.415,0,-.21],W=!1,G=null,K=null,q=!1,J=0;async function Y(e){for(;q&&e===J;){let t=await G.frame();if(e!==J)return;let{position:n,rotation:r}=t;for(let e=0;e<K.count;e++)n[e*4]+=U[0],n[e*4+2]+=U[2];postMessage({type:`frame`,...t},[n.buffer,r.buffer]),G.mode===`idle`&&(q=!1)}}onmessage=async({data:t})=>{if(t.type===`prepare`){try{if(!navigator.gpu)throw Error(`this browser has no WebGPU in workers`);if(K=S(t.meshes,U),G=await te.create(navigator.gpu,K),!G)throw Error(`no WebGPU adapter`)}catch(e){G=null,postMessage({type:`unsupported`,reason:e.message});return}console.info(`Crush solver xpbd-73: ${K.count} particles, ${K.stats.fasteners} fasteners, ${K.stats.unbound} unbound vertices`),postMessage({type:`ready`,bindings:K.bindings,rest:K.restTexture,width:e,height:K.height,particles:K.count})}else G&&(t.type===`reset`&&(J++,q=!1,W=!1,G.reset()),t.type===`pause`&&q&&(W=!0,q=!1,J++),t.type===`resume`&&W&&(W=!1,q=!0,Y(++J)),t.type===`go`&&(W=!1,G.start(t.head),q=!0,Y(++J)),t.type===`lift`&&G.lift())}})();