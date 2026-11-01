(function(){let e=1024,t=globalThis.CRUSH_LITE??(/Mobi|Android|iPhone|iPad/.test(navigator.userAgent)||navigator.maxTouchPoints>1&&!/Windows/.test(navigator.userAgent)),n=t?45e3:22e4,r=t?1.7:1,i=.3,a=3e5,o={E:2e11,sy:3e8,H:.03,ef:.25,t:8e-4,h:.003,flanged:.004},s={...o,t:.0012,flanged:.006},c={E:22e9,sy:28e7,H:0,ef:.09,t:.0016,h:.005},l={E:7e10,sy:2e8,H:.02,ef:.3,t:.01,h:.006,block:!0},u={E:24e8,sy:45e6,H:0,ef:.12,t:.002,h:.005},d={"Case - Chassis":[s,5],"Case - Top Panel":[o,.6],"Case - Right Panel":[o,.8],"Case - Mesh Panel":[o,.4],"Case - Rear Wall":[o,.7],"Case - Front IO":[u,.2],"Case - HDD Cage":[o,.3],"Case - Fans":[u,.5],"Case - Rear Fan":[u,.17],"AIO Cooler":[l,1.2],"Graphics Card":[l,1.6],Motherboard:[c,.9],RAM:[c,.1],CPU:[{E:13e10,sy:4e8,H:0,ef:.02,t:.003,h:.003},.08],SSD:[c,.01]},f=(e,t,n)=>e+1024+(t+1024)*2048+(n+1024)*4194304,p=[[1,0,0],[0,1,0],[0,0,1],[1,1,0],[1,-1,0],[1,0,1],[1,0,-1],[0,1,1],[0,1,-1],[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1]];function m(e,t,n){let{rest:r,index:i}=e,a=(i?i.length:r.length/3)/3,o=(e,t)=>(i?i[e*3+t]:e*3+t)*3;for(let e=0;e<a;e++){let i=o(e,0),a=o(e,1),s=o(e,2),c=r[i],l=r[i+1],u=r[i+2],d=r[a],p=r[a+1],m=r[a+2],h=r[s],g=r[s+1],_=r[s+2],v=Math.max(Math.hypot(c-d,l-p,u-m),Math.hypot(c-h,l-g,u-_),Math.hypot(d-h,p-g,m-_)),y=Math.max(1,Math.ceil(v/(t*.5)));for(let e=0;e<=y;e++)for(let r=0;r<=y-e;r++){let i=e/y,a=r/y,o=1-i-a,s=c*o+d*i+h*a,v=l*o+p*i+g*a,b=u*o+m*i+_*a,x=f(Math.floor(s/t),Math.floor(v/t),Math.floor(b/t)),S=n.get(x);S||n.set(x,S=[0,0,0,0]),S[0]+=s,S[1]+=v,S[2]+=b,S[3]++}}}function h(e,t,n){let r=e.length/t,i=new Uint32Array(n),a=new Uint32Array(n),o=new Uint8Array(r),s=0;for(let n=0;n<r;n++){let r=0,c=0;for(let o=0;o<t;o++){let s=e[n*t+o];r|=i[s],c|=a[s]}let l=0;for(;l<32?r>>>l&1:c>>>l-32&1;)l++;if(l>=64)throw Error(`more than 64 colours`);o[n]=l,s=Math.max(s,l+1);for(let r=0;r<t;r++){let o=e[n*t+r];l<32?i[o]|=1<<l:a[o]|=1<<l-32}}let c=new Uint32Array(s+1);for(let e=0;e<r;e++)c[o[e]+1]++;for(let e=0;e<s;e++)c[e+1]+=c[e];let l=Array.from({length:s},(e,t)=>[c[t],c[t+1]-c[t]]),u=new Uint32Array(r),d=c.slice();for(let e=0;e<r;e++)u[d[o[e]]++]=e;return{order:u,ranges:l}}function g(e,t,n,r){let i=.012,a=/* @__PURE__ */ new Map,o=[],s=t=>f(Math.floor(e[t*3]/i),Math.floor(e[t*3+1]/i),Math.floor(e[t*3+2]/i));for(let e=0;e<r;e++){let t=s(e);(a.get(t)??a.set(t,[]).get(t)).push(e)}let c=/* @__PURE__ */ new Set;for(let i=0;i<r;i+=7){let r=s(i),l=!1;for(let s=-1;s<=1&&!l;s++)for(let u=-1;u<=1&&!l;u++)for(let d=-1;d<=1&&!l;d++)for(let f of a.get(r+s+u*2048+d*4194304)??[])if(!(n[f]===n[i]||c.has(f))&&!(Math.hypot(e[i*3]-e[f*3],e[i*3+1]-e[f*3+1],e[i*3+2]-e[f*3+2])>(t[i]+t[f])*.9)){o.push(i,f),c.add(f),l=!0;break}}return o}function _(e,t,n,r,i){let a=.012,o=/* @__PURE__ */ new Map;for(let e of t)o.set(e.name,{grid:/* @__PURE__ */ new Map,body:e,first:1/0,last:0});let s=0,c=(e,t,n)=>f(Math.floor(e/a),Math.floor(t/a),Math.floor(n/a));for(let e=0;e<i;e++){let i=o.get(t[r[e]].name),a=i.grid,s=c(n[e*3],n[e*3+1],n[e*3+2]);(a.get(s)??a.set(s,[]).get(s)).push(e),i.first=Math.min(i.first,e),i.last=Math.max(i.last,e+1)}let l=e.map(e=>{let t=e.rest.length/3,r=new Float32Array(t*4),i=new Float32Array(t*4),a=o.get(e.part),l=[0,0,0,0],u=[0,0,0,0];for(let o=0;o<t;o++){let t=e.rest[o*3],d=e.rest[o*3+1],f=e.rest[o*3+2];u.fill(1/0);let p=c(t,d,f);for(let e=-1;e<=1;e++)for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){let o=a.grid.get(p+e+r*2048+i*4194304);if(o)for(let e of o){let r=(n[e*3]-t)**2+(n[e*3+1]-d)**2+(n[e*3+2]-f)**2;if(r>=u[3])continue;let i=3;for(;i>0&&r<u[i-1];)u[i]=u[i-1],l[i]=l[i-1],i--;u[i]=r,l[i]=e}}if(u[0]===1/0){s++;for(let e=a.first;e<a.last;e++){let r=(n[e*3]-t)**2+(n[e*3+1]-d)**2+(n[e*3+2]-f)**2;if(r>=u[3])continue;let i=3;for(;i>0&&r<u[i-1];)u[i]=u[i-1],l[i]=l[i-1],i--;u[i]=r,l[i]=e}if(u[0]===1/0)continue}let m=a.body.material.h,h=(m*.3)**2,g=0;for(let e=0;e<4;e++){let t=u[e]<u[0]*4+m*m*2?1/(u[e]+h):0;i[o*4+e]=t,r[o*4+e]=t?l[e]:0,g+=t}for(let e=0;e<4;e++)i[o*4+e]/=g}let d=new Float32Array(t*2),f=e.index?e.index.length:t;for(let t=0;t+2<f;t+=3){let n=e.index?[e.index[t],e.index[t+1],e.index[t+2]]:[t,t+1,t+2];for(let e=0;e<3;e++)d[n[e]*2]=r[n[(e+1)%3]*4],d[n[e]*2+1]=r[n[(e+2)%3]*4]}return{ids:r,weights:i,mates:d}});return _.unbound=s,l}function v(t,o){let s=[...new Set(t.map(e=>e.part))],c=r,l;for(;l=s.map(e=>{let[n,r]=d[e]??[u,.3],i={...n,h:n.h*c},a=/* @__PURE__ */ new Map;for(let n of t)n.part===e&&m(n,i.h,a);return{name:e,material:i,kg:r,cells:a}}),!(l.reduce((e,t)=>e+t.cells.size,0)<=n);)c*=1.08;let f=l.reduce((e,t)=>e+t.cells.size,0),v=new Float64Array(f*3),y=new Float64Array(f),b=new Float64Array(f),x=new Int32Array(f),S=[],C=[],w=0;l.forEach((e,t)=>{let n=e.kg/e.cells.size;for(let r of e.cells.values())v[w*3]=r[0]/r[3],v[w*3+1]=r[1]/r[3],v[w*3+2]=r[2]/r[3],y[w]=1/n,b[w]=e.material.h*.6,x[w]=t,r.id=w++;let r=(t,n,r,i)=>e.cells.get(t+n+r*2048+i*4194304);for(let[n,i]of e.cells)for(let e=0;e<p.length;e++){let[a,o,s]=p[e],c=r(n,a,o,s);if(!c)continue;S.push(i.id,c.id,t);let l=e<9&&r(n,a*2,o*2,s*2);l&&C.push(i.id,c.id,l.id,t)}});let T=g(v,b,x,f),E=new Uint32Array(l.length);for(let e of T)E[x[e]]++;let D=(e,t)=>Math.hypot(v[e*3]-v[t*3],v[e*3+1]-v[t*3+1],v[e*3+2]-v[t*3+2]),O=S.length/3+T.length/2,k=new Uint32Array(O*2),A=new Int32Array(O).fill(-1);for(let e=0;e<S.length/3;e++)k[e*2]=S[e*3],k[e*2+1]=S[e*3+1],A[e]=S[e*3+2];for(let e=0;e<T.length/2;e++){let t=S.length/3+e;k[t*2]=T[e*2],k[t*2+1]=T[e*2+1]}let j=h(k,2,f),M=new Uint32Array(O*4),N=new Float32Array(O*4),P=new Float32Array(M.buffer);j.order.forEach((e,t)=>{let n=k[e*2],r=k[e*2+1],i=D(n,r),o=A[e];if(M[t*4]=n,M[t*4+1]=r,N[t*4]=i,N[t*4+1]=i,o<0)M[t*4+2]=2,N[t*4+2]=1/a,P[t*4+3]=900/a;else{let e=l[o].material;M[t*4+2]=1,N[t*4+2]=1/(e.E*e.t),N[t*4+3]=Math.max(e.sy/e.E,.01),P[t*4+3]=e.ef}});let F=new Uint8Array(f).fill(255),I=Array.from({length:f},()=>[]);for(let e=0;e<S.length;e+=3)I[S[e]].push(S[e+1]),I[S[e+1]].push(S[e]);let L=[];for(let e=0;e<C.length;e+=4){let t=C[e],n=C[e+1],r=C[e+2],i=D(t,n),a=0;for(let e=0;e<3;e++)a+=(v[t*3+e]+v[r*3+e]-2*v[n*3+e])**2;Math.sqrt(a)>i*.8&&F[n]&&(F[n]=0,L.push(n))}for(let e=0;e<f;e++)I[e].length<=3&&I[e].length>0&&F[e]&&(F[e]=0,L.push(e));for(let e=1;e<=1&&L.length;e++){let t=[];for(let n of L)for(let r of I[n])F[r]===255&&(F[r]=e,t.push(r));L=t}let R=C.length/4,z=new Uint32Array(R*3);for(let e=0;e<R;e++)for(let t=0;t<3;t++)z[e*3+t]=C[e*4+t];let B=h(z,3,f),V=new Uint32Array(R*4),H=new Float32Array(R*4),U=new Float32Array(R*4);B.order.forEach((e,t)=>{let n=C[e*4],r=C[e*4+1],a=C[e*4+2],o=l[C[e*4+3]].material;V[t*4]=n,V[t*4+1]=r,V[t*4+2]=a;for(let e=0;e<3;e++)H[t*4+e]=v[n*3+e]+v[a*3+e]-2*v[r*3+e];let s=o.flanged&&F[r]<=1?o.flanged:o.t,c=D(n,r),u=o.E*s**3/(12*(1-i*i)),d=o.sy*s*s/4;H[t*4+3]=c*c/u,U[t*4]=d/u*c*c,U[t*4+1]=o.H,U[t*4+3]=2*o.ef/o.t*c*c});let W=Array.from({length:f},()=>[]);for(let e=0;e<S.length;e+=3)W[S[e]].push(S[e+1]),W[S[e+1]].push(S[e]);let G=new Uint32Array(f+1),K=[];for(let e=0;e<f;e++){let t=new Set(W[e]);for(let n of W[e])for(let r of W[n])r!==e&&t.add(r);let n=[...t],r=Math.max(1,n.length/16);for(let e=0;e<n.length;e+=r)K.push(n[Math.floor(e)]);G[e+1]=K.length}let q=new Float32Array(f*4),J=new Float32Array(f*4),Y=0;for(let e=0;e<f;e++){for(let t=0;t<3;t++)q[e*4+t]=v[e*3+t]-o[t];q[e*4+3]=b[e],J[e*4]=y[e],J[e*4+1]=x[e],J[e*4+3]=W[e].length,Y=Math.max(Y,v[e*3+1]+b[e])}let X=0;for(let e=0;e<f;e++)X=Math.max(X,q[e*4]+b[e]+.17);let Z=_(t,l,v,x,f),Q=Math.ceil(f/e),$=new Float32Array(e*Q*4);for(let e=0;e<f;e++)$[e*4]=v[e*3],$[e*4+1]=v[e*3+1],$[e*4+2]=v[e*3+2],$[e*4+3]=1;return{sideTop:X,bodyFasteners:E,count:f,height:Q,top:Y,restLocal:q,meta:J,restTexture:$,bindings:Z,ringStart:G,ringList:Uint32Array.from(K),linkIndex:M,linkData:N,linkRanges:j.ranges,hingeIndex:V,hingeShape:H,hingeLimits:U,hingeRanges:B.ranges,stats:{flanged:F.reduce((e,t)=>e+ +(t<=1),0),unbound:_.unbound,links:O,hinges:R,fasteners:T.length/2,scale:c}}}let y=Number(globalThis.XPBD_SUBSTEPS??(t?12:32)),b=1/(60*y),x=.995**(16/y),S=Number(globalThis.XPBD_ZETA??.1),C=Number(globalThis.XPBD_START??1.8),w=Number(globalThis.XPBD_GROWTH??.5),T=.02,E=Number(globalThis.XPBD_MIN_LINKS??2),D=Number(globalThis.XPBD_MASS??2e3),O=.08,k=.15,A=t?.0135:.0085,j=t?17:19,M=30*y,N=1e6,P=`0.17`,F={plate:0,round:1,wedge:2,dome:3,crosswedge:4},I=`
struct Params { ram: f32, dt: f32, idt2: f32, damp: f32, gravity: f32, plastic: f32, shape: f32, size: f32,
  maxLink: f32, maxHinge: f32, maxContact: f32, maxSpeed: f32, friction: f32, ramFriction: f32, floorFriction: f32, count: f32 };
struct Range { start: u32, count: u32 };
@group(1) @binding(0) var<uniform> P: Params;
@group(1) @binding(1) var<uniform> R: Range;
fn turn(q: vec4f, v: vec3f) -> vec3f { return v + 2. * cross(q.xyz, cross(q.xyz, v) + q.w * v); }
fn cellOf(p: vec3f) -> vec3i { return vec3i(floor(p / ${A})); }
fn hashOf(c: vec3i) -> u32 { return ((u32(c.x) * 73856093u) ^ (u32(c.y) * 19349663u) ^ (u32(c.z) * 83492791u)) & ${(1<<j)-1}u; }
`,L=`@group(0) @binding(15) var<storage, read_write> stats: array<atomic<u32>>;`,R={predict:`
@group(0) @binding(18) var<storage, read> support: array<f32>;
@group(0) @binding(0) var<storage, read> x: array<vec4f>;
@group(0) @binding(1) var<storage, read_write> p: array<vec4f>;
@group(0) @binding(2) var<storage, read_write> v: array<vec4f>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3u) {
  let n = g.x; if (n >= u32(P.count)) { return; }
  var u = v[n].xyz;
  // What is still joined to the floor is carried by the structure; its weight is nothing beside a press.
  if (support[n] < ${T}) { u.y -= P.gravity * P.dt; }
  v[n] = vec4f(u, 0.);
  p[n] = vec4f(x[n].xyz + u * P.dt, 0.);
}`,links:`
${L}
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
  let gamma = compliance * P.dt * 2. * ${S.toFixed(4)} * sqrt(1. / (w * d.z));
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
  let keeps = la > ${E.toFixed(1)} && lb > ${E.toFixed(1)};
  if (keeps && d.x / d.y - 1. > limit * mix(${C.toFixed(3)}, ${w.toFixed(3)}, tip) * (1. - .85 * min(damage, 1.))) {
    index[i].z = 0u; atomicAdd(&stats[3], 1u);
    info[id.x].w -= 1.; info[id.y].w -= 1.;
  }
}`,hinges:`
${L}
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
  let gamma = compliance * P.dt * 2. * ${S.toFixed(4)} * sqrt(1. / (w * s.w));
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
  atomicAdd(&stats[0], u32(flow * (y / s.w) * ${N}));
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
${L}
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
fn travel(a: vec3f) -> f32 { return select(a.y, a.x + ${P}, sideways()); } // the ram's axis, measured from what it presses against
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
    let anvil = min(r - ${P}, rest[n].x);
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
  let top = select(1, P.maxSpeed, held < ${T}); let speed = length(u); if (speed > top) { u *= top / speed; }
  v[n] = vec4f(u, 0.); x[n] = vec4f(a, info[n].z); p[n] = vec4f(a, 0.); // x.w carries the fold to the renderer
}`},z={predict:{18:`read`,0:`read`,1:`rw`,2:`rw`},links:{15:`rw`,0:`read`,1:`rw`,5:`rw`,8:`rw`,9:`rw`,18:`rw`},hinges:{15:`rw`,0:`read`,1:`rw`,3:`read`,5:`rw`,10:`read`,11:`rw`,12:`rw`,17:`read`},rotate:{0:`read`,3:`rw`,4:`read`,13:`read`,14:`read`},grid:{0:`read`,6:`rw`,7:`rw`},contact:{15:`rw`,0:`read`,1:`read`,4:`read`,5:`read`,6:`rw`,7:`read`,16:`rw`},apply:{1:`rw`,16:`read`},finish:{0:`rw`,1:`rw`,2:`rw`,4:`read`,16:`read`,18:`rw`,5:`read`}};var B=class t{static async create(e,n){let r=await e.requestAdapter({powerPreference:`high-performance`});if(!r)return null;let i=await r.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:Math.min(10,r.limits.maxStorageBuffersPerShaderStage),maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize}});return new t(i,n)}constructor(e,t){Object.assign(this,{device:e,model:t,frames:0,head:{shape:`plate`,size:1},mode:`idle`});let{count:n}=t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC,i=t=>e.createBuffer({size:Math.max(16,t),usage:r}),a=t=>{let n=i(t.byteLength);return e.queue.writeBuffer(n,0,t),n};this.buffers={0:i(n*16),1:i(n*16),2:i(n*16),3:i(n*16),4:a(t.restLocal),5:i(n*16),6:i(4<<j),7:i(48<<j),8:i(t.linkIndex.byteLength),9:i(t.linkData.byteLength),10:a(t.hingeIndex),11:i(t.hingeShape.byteLength),12:i(t.hingeLimits.byteLength),13:a(t.ringStart),14:a(t.ringList),15:i(128),16:i(n*16),17:a(t.hingeShape),18:i(n*4)},this.params=e.createBuffer({size:256*(y+1),usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let o=[...t.linkRanges,...t.hingeRanges];this.linkOffsets=t.linkRanges.map((e,t)=>t*256),this.hingeOffsets=t.hingeRanges.map((e,n)=>(n+t.linkRanges.length)*256);let s=new Uint32Array(o.length*256/4);o.forEach(([e,t],n)=>{s[n*256/4]=e,s[n*256/4+1]=t}),this.ranges=e.createBuffer({size:s.byteLength+256,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(this.ranges,0,s);let c=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:64}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:8}}]});this.uniformGroup=e.createBindGroup({layout:c,entries:[{binding:0,resource:{buffer:this.params,size:64}},{binding:1,resource:{buffer:this.ranges,size:8}}]}),this.passes={};for(let[t,n]of Object.entries(R)){let r=z[t],i=e.createBindGroupLayout({entries:Object.entries(r).map(([e,t])=>({binding:Number(e),visibility:GPUShaderStage.COMPUTE,buffer:{type:t===`rw`?`storage`:`read-only-storage`}}))}),a=e.createComputePipeline({layout:e.createPipelineLayout({bindGroupLayouts:[i,c]}),compute:{module:e.createShaderModule({code:I+n}),entryPoint:`main`}}),o=e.createBindGroup({layout:i,entries:Object.keys(r).map(e=>({binding:Number(e),resource:{buffer:this.buffers[e]}}))});this.passes[t]={pipeline:a,group:o}}this.staging=[0,1].map(()=>e.createBuffer({size:n*32+128,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST})),this.reset()}reset(){let{model:e,device:t}=this,{count:n,restLocal:r}=e,i=t.queue,a=r.slice(),o=()=>{let e=[Math.random()-.5,Math.random()-.5,Math.random()-.5],t=Math.hypot(...e)||1;return e.map(e=>e/t)};for(let e=0;e<7;e++){let e=o(),t=o(),i=Math.random()*7,s=Math.PI*2/(.18+Math.random()*.42);for(let o=0;o<n;o++){let n=o*4,c=Math.sin((r[n]*e[0]+r[n+1]*e[1]+r[n+2]*e[2])*s+i)*15e-5;a[n]+=c*t[0],a[n+1]+=c*t[1],a[n+2]+=c*t[2]}}for(let e=0;e<n;e++)a[e*4+3]=0;let s=new Float32Array(n*4),c=e.meta.slice();for(let e=0;e<n;e++)s[e*4+3]=1,c[e*4]/=D,c[e*4+3]*=101;i.writeBuffer(this.buffers[18],0,new Float32Array(n).fill(1)),i.writeBuffer(this.buffers[0],0,a),i.writeBuffer(this.buffers[1],0,a),i.writeBuffer(this.buffers[2],0,new Float32Array(n*4)),i.writeBuffer(this.buffers[3],0,s),i.writeBuffer(this.buffers[5],0,c),i.writeBuffer(this.buffers[8],0,e.linkIndex),i.writeBuffer(this.buffers[9],0,e.linkData),i.writeBuffer(this.buffers[11],0,e.hingeShape),i.writeBuffer(this.buffers[12],0,e.hingeLimits);let l=/* @__PURE__ */ new Uint32Array(32);l.set(e.bodyFasteners,4),i.writeBuffer(this.buffers[15],0,l),Object.assign(this,{topStrokes:0,sideStrokes:0,low:k,ram:e.top+.002,tick:0,mode:`idle`,held:0,stalling:!1,lastWork:0,broken:0,screws:0,jammed:0,bottomed:!1})}start(e){this.head=e,this.mode=`down`,this.ram=(e.side?this.model.sideTop:this.model.top)+.002;let t=e.side?.15:k,n=(e.side?this.sideStrokes++:this.topStrokes++)*.03;this.low=Math.max(.05,t-n),this.bottomed=!1,this.stalling=!1,this.held=0}lift(){this.mode=`up`,this.liftFrames=200}run(e,t,n,r){let{pipeline:i,group:a}=this.passes[t];e.setPipeline(i),e.setBindGroup(0,a),e.setBindGroup(1,this.uniformGroup,n),e.dispatchWorkgroups(r)}async frame(){let{device:t,model:n,buffers:r}=this,{count:i}=n,a=new Float32Array(256*y/4),o=Math.ceil(i/256),s=this.ram;for(let e=0;e<y;e++){this.mode===`down`&&!this.stalling?this.ram=Math.max(this.low,this.ram-O*b):this.mode===`up`&&(this.ram+=.08*b);let t=+(this.tick+e>M&&this.mode!==`up`);a.set([this.ram,b,1/(b*b),this.mode===`up`?.97:x,9.81,t,F[this.head.shape]+(this.head.side?10:0),this.head.size,1,1,2e-4,3,.35,.25,.8,i],e*256/4)}t.queue.writeBuffer(this.params,0,a);let c=t.createCommandEncoder();for(let e=0;e<y;e++){let t=e*256;if(this.tick%4==0){c.clearBuffer(r[6]);let e=c.beginComputePass();this.run(e,`grid`,[t,0],o),e.end()}let i=c.beginComputePass();this.run(i,`predict`,[t,0],o);for(let e=0;e<n.linkRanges.length;e++)this.run(i,`links`,[t,this.linkOffsets[e]],Math.ceil(n.linkRanges[e][1]/256));for(let e=0;e<n.hingeRanges.length;e++)this.run(i,`hinges`,[t,this.hingeOffsets[e]],Math.ceil(n.hingeRanges[e][1]/256));this.run(i,`contact`,[t,0],o),this.run(i,`apply`,[t,0],o),this.run(i,`finish`,[t,0],o),this.tick%2==0&&this.run(i,`rotate`,[t,0],o),i.end(),this.tick++}let l=this.staging[this.frames++%2];c.copyBufferToBuffer(r[0],0,l,0,i*16),c.copyBufferToBuffer(r[3],0,l,i*16,i*16),c.copyBufferToBuffer(r[15],0,l,i*32,128),c.clearBuffer(r[15],4,4),t.queue.submit([c.finish()]),await l.mapAsync(GPUMapMode.READ);let u=new Float32Array(l.getMappedRange()),d=new Uint32Array(u.buffer,u.byteOffset+i*32,8),f=new Float32Array(e*n.height*4),p=new Float32Array(f.length);f.set(u.subarray(0,i*4)),p.set(u.subarray(i*4,i*8));let m=(d[0]-this.lastWork>>>0)/N;this.lastWork=d[0],this.jammed=d[1],this.screws=d[2],this.broken=d[3],l.unmap();let h=m/Math.max(s-this.ram,O*y*b)/9810;return this.mode===`down`?(this.stalling=h>1e3,this.held=this.stalling?this.held+1:Math.max(0,this.held-1),(this.ram===this.low||this.held>60)&&(this.bottomed=!0)):this.mode===`up`&&--this.liftFrames<=0&&(this.mode=`idle`),{position:f,rotation:p,ram:this.ram,tons:h,bottomed:this.bottomed&&this.mode===`down`,broken:this.broken,screws:this.screws}}};let V=[1.415,0,-.21],H=!1,U=null,W=null,G=!1,K=0;async function q(e){for(;G&&e===K;){let t=await U.frame();if(e!==K)return;let{position:n,rotation:r}=t;for(let e=0;e<W.count;e++)n[e*4]+=V[0],n[e*4+2]+=V[2];postMessage({type:`frame`,...t},[n.buffer,r.buffer]),U.mode===`idle`&&(G=!1)}}onmessage=async({data:t})=>{if(t.type===`prepare`){try{if(!navigator.gpu)throw Error(`this browser has no WebGPU in workers`);if(W=v(t.meshes,V),U=await B.create(navigator.gpu,W),!U)throw Error(`no WebGPU adapter`)}catch(e){U=null,postMessage({type:`unsupported`,reason:e.message});return}console.info(`Crush solver xpbd-71: ${W.count} particles, ${W.stats.fasteners} fasteners, ${W.stats.unbound} unbound vertices`),postMessage({type:`ready`,bindings:W.bindings,rest:W.restTexture,width:e,height:W.height,particles:W.count})}else U&&(t.type===`reset`&&(K++,G=!1,H=!1,U.reset()),t.type===`pause`&&G&&(H=!0,G=!1,K++),t.type===`resume`&&H&&(H=!1,G=!0,q(++K)),t.type===`go`&&(H=!1,U.start(t.head),G=!0,q(++K)),t.type===`lift`&&U.lift())}})();