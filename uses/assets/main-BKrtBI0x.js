var e=class{dims=[];paddedDims=[];layout=`x`;dataType=`Float32`;getByteSize(){let e=1;for(let t of this.paddedDims)e*=t;return this.dataType===`Float32`?e*=4:this.dataType===`Float16`&&(e*=2),e}},t=class{desc;data;constructor(e,t){this.desc=e,this.data=t}},n=class{_view;offset=0;constructor(e){this._view=e}read(e){let t=this._view,n=this.offset;switch(this.offset+=e,e){case 1:return t.getUint8(n);case 2:return t.getUint16(n,!0);case 4:return t.getUint32(n,!0);case 8:return Number(t.getBigUint64(n,!0));default:throw Error(`unsupported read size`)}}};function r(r){let i=new Uint8Array(r),a=new n(new DataView(r));if(a.read(2)!==16855)throw Error(`invalid or corrupted weights blob`);let o=a.read(1);if(a.read(1),o!==2)throw Error(`unsupported weights blob version`);a.offset=a.read(8);let s=a.read(4),c=new Map;for(let n=0;n<s;++n){let n=new e,r=a.read(2),o=new TextDecoder().decode(i.subarray(a.offset,a.offset+r));a.offset+=r;let s=a.read(1);for(let e=0;e<s;++e)n.dims.push(a.read(4));n.paddedDims=[...n.dims],new TextDecoder().decode(i.subarray(a.offset,a.offset+s))===`oihw`&&(n.layout=`oihw`),a.offset+=s;let l=String.fromCharCode(a.read(1));if(l===`f`)n.dataType=`Float32`;else if(l===`h`)n.dataType=`Float16`;else throw Error(`invalid tensor data type`);let u=a.read(8),d=i.slice(u,u+n.getByteSize());c.set(o,new t(n,d))}return c}function i(e,t){return e.channels===t.channels}var a=class{autoUpdateOutputBuffer=!0;_label;_device;_outputBuffers={};_pipeline;_bindGroups=[];_needsUpdatePipeline=!0;_needsResizeBuffer=!0;_inputs=[];_outputs=[];_uniforms=[];_uniformBuffers={};_width=10;_height=10;_execWidth;_execHeight;_csCode=``;_csMain;_csDefine;_groupOffsets={inputs:0,uniforms:1,outputs:2};constructor(e,t,n){this._label=e,this._device=t,this._csMain=n.csMain,this._csDefine=n.csDefine,this._inputs=n.inputs,this._outputs=n.outputs,this._uniforms=n.uniforms,this.autoUpdateOutputBuffer=n.autoUpdateOutputBuffer??!0,n.uniforms.forEach(e=>{this._uniformBuffers[e.label]=t.createBuffer({label:this._label,size:e.data.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._uniformBuffers[e.label],0,e.data)})}setCSCode({csDefine:e,csMain:t}){this._csDefine=e,this._csMain=t,this._needsUpdatePipeline=!0}setSize(e,t){e=Math.ceil(e),t=Math.ceil(t);let n=e!==this._width||t!==this._height;this._width=e,this._height=t,n&&(this._needsResizeBuffer=!0,this._needsUpdatePipeline=!0)}setExecuteSize(e,t){e=Math.ceil(e),t=Math.ceil(t),this._execWidth=e,this._execHeight=t}setOutputParams(e){this.autoUpdateOutputBuffer&&this._updateOutputBuffers(e),this._needsUpdatePipeline=!0}setOutputBuffers(e){this._outputBuffers=Object.keys(e).reduce((t,n)=>(t[n]={buffer:e[n],params:{channels:4}},t),{})}setUniform(e,t){let n=this._uniformBuffers[e];this._device.queue.writeBuffer(n,0,t)}getOutput(e){return this._needsResizeBuffer&&this.autoUpdateOutputBuffer&&(this._resizeOutputBuffers(),this._needsResizeBuffer=!1),this._outputBuffers[e].buffer}dispose(e=!0){Object.keys(this._uniformBuffers).forEach(e=>{this._uniformBuffers[e].destroy()}),e&&Object.keys(this._outputBuffers).forEach(e=>{this._outputBuffers[e].buffer.destroy()})}_createBuffer(e){let t=this._width*this._height*4*4;return this._device.createBuffer({label:this._label,size:Math.max(t,80),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})}_resizeOutputBuffers(){let e=this._outputBuffers;for(let t in e){let{buffer:n,params:r}=e[t];n.destroy(),e[t].buffer=this._createBuffer(r)}}_updateOutputBuffers(e){let t=this._outputBuffers;for(let n in e){let r=e[n];i(r,t[n]?.params||{})||(t[n]?.buffer.destroy(),t[n]={buffer:this._createBuffer(r),params:r})}}_updatePipeline(e,t){if(!this._needsUpdatePipeline)return;this._needsUpdatePipeline=!1;let n=this._device,r=this._getFullCs(e,t);r!==this._csCode&&(this._csCode=r,this._pipeline=n.createComputePipeline({label:this._label,layout:`auto`,compute:{module:n.createShaderModule({label:this._label,code:r}),entryPoint:`main`}}),this._updateBindGroups())}_getFullCs(e,t){let n=this._inputs,r=this._uniforms,i=0,a=this._groupOffsets={inputs:0,uniforms:0,outputs:0};return n.length>0&&i++,r.length>0&&(a.uniforms=i,i++),a.outputs=i,`
${n.sort().map((n,r)=>{let i=`@group(${a.inputs}) @binding(${r}) `,o=`in_${n}`;return t[n]===`texture`?`${i} var ${o}: texture_2d<f32>;`:`${i} var<storage, read> ${o}: array<vec${e[n].channels}f>;`}).join(`
`)}
${this._uniforms.map((e,t)=>`@group(${a.uniforms}) @binding(${t}) var<uniform> ${e.label}: ${e.type};`).join(`
`)}

${this._outputs.map((e,t)=>`@group(${a.outputs}) @binding(${t}) var<storage, read_write> out_${e}: array<vec${this._outputBuffers[e].params.channels}f>;`).join(`
`)}
${this._csDefine??``}
@compute @workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) globalId: vec3u) {
${this._csMain}
}
`}_updateBindGroups(){let e=[],t=this._device,n=this._groupOffsets;this._uniforms.length>0&&(e[n.uniforms]=t.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(n.uniforms),entries:this._uniforms.map((e,t)=>({binding:t,resource:{buffer:this._uniformBuffers[e.label]}}))})),this._bindGroups=e}createPass(e,t){this._needsResizeBuffer&&this.autoUpdateOutputBuffer&&(this._resizeOutputBuffers(),this._needsResizeBuffer=!1);let n=this._inputs.reduce((e,n)=>(e[n]=t[n].buffer?`buffer`:`texture`,e),{});this._updatePipeline(t,n);let r=this._groupOffsets;this._inputs.length>0&&(this._bindGroups[r.inputs]=this._device.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(r.inputs),entries:this._inputs.map((e,n)=>({binding:n,resource:t[e].buffer?{buffer:t[e].buffer}:t[e].texture.createView()}))})),this._bindGroups[r.outputs]=this._device.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(r.outputs),entries:this._outputs.map((e,t)=>({binding:t,resource:{buffer:this._outputBuffers[e].buffer}}))});let i=e.beginComputePass();i.setPipeline(this._pipeline),this._bindGroups.forEach((e,t)=>{i.setBindGroup(t,e)}),i.dispatchWorkgroups(Math.ceil((this._execWidth??this._width)/8),Math.ceil((this._execHeight??this._height)/8),1),i.end()}},o=1412.83765,s=1.64593172,c=.431384981,l=-.00294139609,u=.192653254,d=.00626026094,f=.998620152,p=15794576e-13,m=.0322087631,h=.00223151711,g=.370974749,_=x(65504),v=1/_,y=_,ee=Math.log(65505),b=1/ee;function x(e){return e<=p?o*e:e<=m?s*e**+c+l:u*Math.log(e+d)+f}function S(e){return e<=h?e/o:e<=g?((e-l)/s)**(1/c):Math.exp((e-f)/u)-d}function te(e,t){return t===`log`?Math.log(e+1)*b:x(e)*v}function ne(e,t){return t===`log`?Math.exp(e*ee)-1:S(e*y)}function C({data:e,channels:t,inputScale:n,transfer:r=`pu`}){let i=new Float32Array(e);for(let e=0;e<i.length;e+=t)for(let t=0;t<3;t++)i[e+t]=te(i[e+t]*n,r);return i}function re({data:e,channels:t,inputScale:n,transfer:r=`pu`}){let i=new Float32Array(e),a=1/n;for(let e=0;e<i.length;e+=t)for(let t=0;t<3;t++)i[e+t]=ne(i[e+t],r)*a;return i}var ie=1412.83765,ae=1.64593172,oe=.431384981,se=-.00294139609,ce=.192653254,le=.00626026094,ue=.998620152,de=15794576e-13,fe=.0322087631,pe=.00223151711,me=.370974749;function he(e){return e=e<=de?ie*e:e<=fe?ae*e**+oe+se:ce*Math.log(e+le)+ue,e}var ge=he(65504),_e=1/ge,ve=ge,ye=Math.log(65505),be=1/ye,xe=class{x;y;width;height;constructor(e,t,n,r){this.x=e,this.y=t,this.width=n,this.height=r}};function Se({data:e,channels:t}){let n=0;for(let r=0;r<e.length;r+=t){let t=e[r],i=e[r+1],a=e[r+2],o=.212671*t+.71516*i+.072169*a;n+=Math.log2(o+1e-4)}let r=e.length/t;return .18/2**(n/r)}var Ce=`
const a = ${ie};
const b = ${ae};
const c = ${oe};
const d = ${se};
const e = ${ce};
const f = ${le};
const g = ${ue};
const y0 =${de};
const y1 =${fe};
const x0 =${pe};
const x1 =${me};

const normScale = ${_e};
const rcpNormScale = ${ve};
`,we=class{_device;_isHDR;_hdrTransfer;_inputPassAux;_inputPassColor;_outputPass;_copyPass;_isInputTexture;constructor(e,t,n=`pu`){this._device=e,this._isHDR=t,this._hdrTransfer=n;let r=[{label:`inputScale`,type:`f32`,data:new Float32Array([1])},{label:`inputSize`,type:`vec2i`,data:new Int32Array(2)},{label:`outputSize`,type:`vec2i`,data:new Int32Array(2)},{label:`inputOffset`,type:`vec2i`,data:new Int32Array(2)}];this._inputPassAux=new a(`inputPassAux`,this._device,{inputs:[`color`,`albedo`,`normal`],outputs:[`color`,`albedo`,`normal`],uniforms:r,csDefine:``,csMain:``}),this._inputPassColor=new a(`inputPassColor`,this._device,{inputs:[`color`],outputs:[`color`],uniforms:r,csDefine:``,csMain:``}),this._outputPass=new a(`outputPass`,this._device,{inputs:[`color`,`raw`],outputs:[`color`],uniforms:[{label:`inputScale`,type:`f32`,data:new Float32Array([1])},{label:`inputSize`,type:`vec2i`,data:new Int32Array(2)},{label:`outputSize`,type:`vec2i`,data:new Int32Array(2)},{label:`imageSize`,type:`vec2i`,data:new Int32Array(2)},{label:`inputOffset`,type:`vec2i`,data:new Int32Array(2)},{label:`outputOffset`,type:`vec2i`,data:new Int32Array(2)}],csDefine:``,csMain:``}),this._copyPass=new a(`copyPass`,this._device,{inputs:[`color`],outputs:[`color`],autoUpdateOutputBuffer:!1,uniforms:[{label:`size`,type:`vec2i`,data:new Int32Array(2)}],csMain:`
let outIdx = i32(globalId.x + globalId.y * u32(size.x));
out_color[outIdx] = textureLoad(in_color, globalId.xy, 0);
`}),this._inputPassAux.setOutputParams({color:{channels:3},albedo:{channels:3},normal:{channels:3}}),this._inputPassColor.setOutputParams({color:{channels:3}}),this._outputPass.setOutputParams({color:{channels:4}})}_updatePasses(e,t=!1){if(this._isInputTexture!=null&&this._isInputTexture===e)return;this._isInputTexture=e;let n=this._isHDR,r=this._hdrTransfer===`log`?`fn HDRForward(y: f32) -> f32 { return log(y + 1.0) * logNormScale; }`:`fn HDRForward(y: f32) -> f32 {
  if (y <= y0) { return a * y * normScale; }
  else if (y <= y1) { return (b * pow(y, c) + d) * normScale; }
  else { return (e * log(y + f) + g) * normScale; }
}`,i=this._hdrTransfer===`log`?`fn HDRInverse(x: f32) -> f32 { return exp(x * logXMax) - 1.0; }`:`fn HDRInverse(x: f32) -> f32 {
  let y = x * rcpNormScale;
  if (y <= x0) { return y / a; }
  else if (y <= x1) { return pow((y - d) / b, 1 / c); }
  else { return exp((y - g) / e) - f; }
}`,a=`
${Ce}
const logXMax = ${ye};
const logNormScale = ${be};
${r}`;function o(t){return e?`textureLoad(in_${t}, vec2u(inputPosition), 0)`:`in_${t}[inIdx]`}let s=`
let x = i32(globalId.x);
let y = i32(globalId.y);
let inputPosition = clamp(
  vec2i(x, y) + inputOffset,
  vec2i(0),
  inputSize - vec2i(1)
);
let inIdx = inputPosition.y * inputSize.x + inputPosition.x;
let col = ${o(`color`)};

let outIdx = y * outputSize.x + x;

if (${t}) {
  // Denoise the inversed alpha. Or the anti aliased edge will be too dark after denoised
  out_color[outIdx] = vec3f(1.0 - col.a);
}
else if (${n}) {
  out_color[outIdx] = vec3f(HDRForward(col.r * inputScale), HDRForward(col.g * inputScale), HDRForward(col.b * inputScale));
}
else {
  out_color[outIdx] = col.rgb;
}
`;this._inputPassAux.setCSCode({csDefine:a,csMain:`
${s}
let alb = ${o(`albedo`)};
let nor = ${o(`normal`)};
out_normal[outIdx] = nor.rgb;
out_albedo[outIdx] = alb.rgb;
  `}),this._inputPassColor.setCSCode({csDefine:a,csMain:`
${s}
`}),this._outputPass.setCSCode({csDefine:`
${Ce}
const logXMax = ${ye};
${i}
`,csMain:`
let x = i32(globalId.x);
let y = i32(globalId.y);
if (x >= outputSize.x || y >= outputSize.y) {
  return;
}
let inIdx = (y + inputOffset.y) * inputSize.x + x + inputOffset.x;
let outIdx = (y + outputOffset.y) * imageSize.x + x + outputOffset.x;
let col = in_color[inIdx];
let raw = ${e?`textureLoad(in_raw, globalId.xy + vec2u(outputOffset), 0)`:`in_raw[outIdx]`};

if (${t}) {
  out_color[outIdx] = vec4f(raw.rgb, 1.0 - col.r);
}
else if (${n}) {
  out_color[outIdx] = vec4f(
    vec3f(HDRInverse(col.r), HDRInverse(col.g), HDRInverse(col.b)) / inputScale,
    // Pick the alpha
    raw.a
  );
}
else {
  out_color[outIdx] = vec4f(col.rgb, raw.a);
}
`})}setImageSize(e,t){this._inputPassAux.setUniform(`inputSize`,new Int32Array([e,t])),this._inputPassColor.setUniform(`inputSize`,new Int32Array([e,t])),this._outputPass.setUniform(`imageSize`,new Int32Array([e,t])),this._outputPass.setSize(e,t),this._copyPass.setSize(e,t),this._copyPass.setUniform(`size`,new Int32Array([e,t]))}setInputTile(e){let t=new Int32Array([e.width,e.height]);[this._inputPassAux,this._inputPassColor].forEach(n=>{n.setUniform(`inputOffset`,new Int32Array([e.x,e.y])),n.setUniform(`outputSize`,t),n.setSize(t[0],t[1])}),this._outputPass.setUniform(`inputSize`,t)}setOutputTile(e,t){let n=this._outputPass,r=new Int32Array([e.width,e.height]),i=e.x-t.x,a=e.y-t.y;n.setUniform(`outputSize`,r),n.setUniform(`inputOffset`,new Int32Array([i,a])),n.setUniform(`outputOffset`,new Int32Array([e.x,e.y])),n.setExecuteSize(r[0],r[1])}forward(e,t,n,r){let i=e instanceof GPUTexture;this._updatePasses(i,r);let a=this._inputPassAux,o=this._inputPassColor,s=this._device.createCommandEncoder();function c(e){return e instanceof GPUTexture?{texture:e,channels:4}:{buffer:e,channels:4}}return t&&n?a.createPass(s,{color:c(e),albedo:c(t),normal:c(n)}):o.createPass(s,{color:c(e)}),this._device.queue.submit([s.finish()]),t&&n?{color:a.getOutput(`color`),albedo:a.getOutput(`albedo`),normal:a.getOutput(`normal`)}:{color:o.getOutput(`color`)}}inverse(e,t){let n=this._device.createCommandEncoder(),r=this._outputPass;return r.createPass(n,{color:{buffer:e,channels:4},raw:t instanceof GPUBuffer?{buffer:t,channels:4}:{texture:t,channels:4}}),this._device.queue.submit([n.finish()]),r.getOutput(`color`)}copyInputDataToOutput(e){let t=this._device.createCommandEncoder(),n=this._outputPass.getOutput(`color`),r=this._copyPass;e instanceof GPUTexture?(r.setOutputBuffers({color:n}),r.createPass(t,{color:{texture:e,channels:4}})):t.copyBufferToBuffer(e,0,n,0,n.size),this._device.queue.submit([t.finish()])}dispose(){this._outputPass.dispose(),this._inputPassAux.dispose(),this._inputPassColor.dispose(),this._copyPass.dispose(!1)}},Te=256,Ee=432,De=16,Oe=16;function ke(e,t){return Math.ceil(e/t)*t}function Ae(e,t){return Math.floor(e/t)*t}function je(e,t,n){return{start:Math.round(n*e/t),end:Math.round((n+1)*e/t)}}function Me(e,t,n,r=0){let i=t-e,a=Math.max(r,ke(i,16)),o=e-Math.floor((a-i)/2);return o=Pe(o,0,Math.max(0,n-a)),{start:o,end:o+a}}function Ne(e,t,n,r){if(!Number.isInteger(e)||e<=0||!Number.isInteger(t)||t<=0)throw Error(`Tile grid dimensions must be positive integers`);if(!Number.isFinite(n)||n<=0)throw Error(`Maximum tile size must be positive`);if(!Number.isFinite(r)||r<0)throw Error(`Tile overlap must be non-negative`);let i=Math.max(16,Ae(n,16)),a=ke(r,16),o=Math.max(1,Math.ceil(e/i)),s=Math.max(1,Math.ceil(t/i)),c=[],l=0,u=0;for(let n=0;n<s;n++){let r=je(t,s,n);for(let i=0;i<o;i++){let d=je(e,o,i),f={start:i===0?d.start:Math.max(0,d.start-a),end:i===o-1?d.end:Math.min(e,d.end+a)},p={start:n===0?r.start:Math.max(0,r.start-a),end:n===s-1?r.end:Math.min(t,r.end+a)},m=Me(f.start,f.end,e),h=Me(p.start,p.end,t),g={x:d.start,y:r.start,width:d.end-d.start,height:r.end-r.start},_={x:m.start,y:h.start,width:m.end-m.start,height:h.end-h.start};l=Math.max(l,g.width),u=Math.max(u,g.height),c.push({column:i,row:n,input:_,output:g})}}let d=()=>new Set(c.map(({input:e})=>`${e.width}x${e.height}`));if(d().size>2){let n=Math.max(...c.map(({input:e})=>e.width)),r=Math.max(...c.map(({input:e})=>e.height));if(c.reduce((e,{input:t})=>e+n*t.height,0)<=c.reduce((e,{input:t})=>e+t.width*r,0))for(let t of c){let r=Me(t.input.x,t.input.x+t.input.width,e,n);t.input.x=r.start,t.input.width=r.end-r.start}else for(let e of c){let n=Me(e.input.y,e.input.y+e.input.height,t,r);e.input.y=n.start,e.input.height=n.end-n.start}}let f=d(),p=c.reduce((e,{input:t})=>e+t.width*t.height,0);return{columns:o,rows:s,overlap:a,maxOutputWidth:l,maxOutputHeight:u,inputPixelCount:p,inputShapeCount:f.size,tiles:c}}function Pe(e,t,n){return Math.min(Math.max(e,t),n)}function Fe(e,t){let n=[...e].sort((e,t)=>e-t);return n[Math.ceil(n.length*t)-1]}var Ie=class{enabled;maxTileSize;minTileSize;targetTileTimeMs;_tileSize;_adjustmentStep;_smoothedTileTimeMs;_completeExecutionsSinceChange=0;constructor(e,t=!0){let n=typeof t==`object`?t:{};this.enabled=t!==!1,this.maxTileSize=Math.max(16,Ae(e,16)),this.minTileSize=Pe(ke(n.minTileSize??Te,16),16,this.maxTileSize),this.targetTileTimeMs=Math.max(1,n.targetTileTimeMs??De),this._adjustmentStep=Math.max(16,ke(n.adjustmentStep??Oe,16)),this._tileSize=this.enabled?Pe(ke(n.initialTileSize??Ee,16),this.minTileSize,this.maxTileSize):this.maxTileSize}get tileSize(){return this._tileSize}observe(e){if(!this.enabled||e.length===0)return!1;let t=e.filter(e=>Number.isFinite(e)&&e>=0);if(t.length===0)return!1;let n=Fe(t.length>=3?t.slice(1):t,.75);if(this._smoothedTileTimeMs=this._smoothedTileTimeMs===void 0?n:this._smoothedTileTimeMs*.65+n*.35,this._completeExecutionsSinceChange++,this._completeExecutionsSinceChange<2)return!1;let r=this._tileSize;return this._smoothedTileTimeMs>this.targetTileTimeMs*1.25?r-=this._adjustmentStep:this._smoothedTileTimeMs<this.targetTileTimeMs*.65&&(r+=this._adjustmentStep),r=Pe(ke(r,16),this.minTileSize,this.maxTileSize),r!==this._tileSize&&(this._tileSize=r,this._smoothedTileTimeMs=void 0,this._completeExecutionsSinceChange=0,!0)}};function w(e,t){return{op:`conv2d`,id:e,input:t,weight:`${e}.weight`,bias:`${e}.bias`,activation:`relu`,padding:`same`}}function T(e,t){return{op:`maxPool2d`,id:e,input:t,size:2,stride:2,padding:`same`}}function E(e,t){return{op:`upsample2d`,id:e,input:t,scale:2,mode:`nearest`}}function D(e,t,n){return{op:`concat`,id:e,inputs:[t,n],axis:`channels`}}var Le=[{schemaVersion:1,id:`oidn-unet-small-v1`,family:`oidn-unet-small`,input:`input`,output:`dec_conv0`,receptiveField:174,nodes:[w(`enc_conv0`,`input`),w(`enc_conv1`,`enc_conv0`),T(`pool1`,`enc_conv1`),w(`enc_conv2`,`pool1`),T(`pool2`,`enc_conv2`),w(`enc_conv3`,`pool2`),T(`pool3`,`enc_conv3`),w(`enc_conv4`,`pool3`),T(`pool4`,`enc_conv4`),w(`enc_conv5a`,`pool4`),w(`enc_conv5b`,`enc_conv5a`),E(`up4`,`enc_conv5b`),D(`concat4`,`up4`,`pool3`),w(`dec_conv4a`,`concat4`),w(`dec_conv4b`,`dec_conv4a`),E(`up3`,`dec_conv4b`),D(`concat3`,`up3`,`pool2`),w(`dec_conv3a`,`concat3`),w(`dec_conv3b`,`dec_conv3a`),E(`up2`,`dec_conv3b`),D(`concat2`,`up2`,`pool1`),w(`dec_conv2a`,`concat2`),w(`dec_conv2b`,`dec_conv2a`),E(`up1`,`dec_conv2b`),D(`concat1`,`up1`,`input`),w(`dec_conv1a`,`concat1`),w(`dec_conv1b`,`dec_conv1a`),w(`dec_conv0`,`dec_conv1b`)]},{schemaVersion:1,id:`oidn-unet-large-v1`,family:`oidn-unet-large`,input:`input`,output:`dec_conv1c`,receptiveField:202,nodes:[w(`enc_conv1a`,`input`),w(`enc_conv1b`,`enc_conv1a`),T(`pool1`,`enc_conv1b`),w(`enc_conv2a`,`pool1`),w(`enc_conv2b`,`enc_conv2a`),T(`pool2`,`enc_conv2b`),w(`enc_conv3a`,`pool2`),w(`enc_conv3b`,`enc_conv3a`),T(`pool3`,`enc_conv3b`),w(`enc_conv4a`,`pool3`),w(`enc_conv4b`,`enc_conv4a`),T(`pool4`,`enc_conv4b`),w(`enc_conv5a`,`pool4`),w(`enc_conv5b`,`enc_conv5a`),E(`up4`,`enc_conv5b`),D(`concat4`,`up4`,`pool3`),w(`dec_conv4a`,`concat4`),w(`dec_conv4b`,`dec_conv4a`),E(`up3`,`dec_conv4b`),D(`concat3`,`up3`,`pool2`),w(`dec_conv3a`,`concat3`),w(`dec_conv3b`,`dec_conv3a`),E(`up2`,`dec_conv3b`),D(`concat2`,`up2`,`pool1`),w(`dec_conv2a`,`concat2`),w(`dec_conv2b`,`dec_conv2a`),E(`up1`,`dec_conv2b`),D(`concat1`,`up1`,`input`),w(`dec_conv1a`,`concat1`),w(`dec_conv1b`,`dec_conv1a`),w(`dec_conv1c`,`dec_conv1b`)]}];function Re(e){let t=new Set;for(let n of e.nodes)n.op===`conv2d`&&(t.add(n.weight),t.add(n.bias));return t}function ze(e){return e.desc.getByteSize()}function Be(e){return[...e].sort().join(`, `)}function Ve(e,t=Le){let n=t.filter(t=>{let n=Re(t);return[...n].some(t=>!e.has(t))?!1:t.allowAdditionalTensors===!0||[...e.keys()].every(e=>n.has(e))});if(n.length===1)return n[0];throw n.length>1?Error(`Ambiguous OIDN model topology: ${n.map(e=>e.id).join(`, `)}`):Error(`Unsupported OIDN model topology. TZA tensors: ${Be(e.keys())}`)}function He(e,t,n){let r=e.get(t);if(!r)throw Error(`Model ${n} is missing tensor ${t}`);if(r.data.byteLength!==ze(r))throw Error(`Tensor ${t} has ${r.data.byteLength} bytes, expected ${ze(r)}`);return r}function Ue(e,t=Ve(e)){if(t.schemaVersion!==1)throw Error(`Unsupported model descriptor schema ${t.schemaVersion}`);let n=Re(t);if(!t.allowAdditionalTensors){let r=[...e.keys()].filter(e=>!n.has(e));if(r.length>0)throw Error(`Model ${t.id} has unexpected tensors: ${Be(r)}`)}let r=new Map,i=new Map,a=new Map,o=new Set([t.input]),s,c,l=(e,n)=>{let i=r.get(e);if(i===void 0)throw Error(`Model ${t.id} node ${n} reads unknown or forward value ${e}`);return i};for(let n of t.nodes){if(o.has(n.id))throw Error(`Model ${t.id} produces duplicate value ${n.id}`);if(n.op===`conv2d`){let o=He(e,n.weight,t.id),u=He(e,n.bias,t.id),d=o.desc.dims;if(o.desc.layout!==`oihw`||d.length!==4)throw Error(`Tensor ${n.weight} must use OIHW layout`);if(d[2]!==3||d[3]!==3)throw Error(`Tensor ${n.weight} must use a 3x3 kernel`);if(u.desc.layout!==`x`||u.desc.dims.length!==1)throw Error(`Tensor ${n.bias} must be a one-dimensional bias`);if(u.desc.dims[0]!==d[0])throw Error(`Tensor ${n.bias} has ${u.desc.dims[0]} channels, expected ${d[0]}`);if(o.desc.dataType!==u.desc.dataType)throw Error(`Weight and bias dtype differ for ${n.id}`);if(c&&c!==o.desc.dataType)throw Error(`Mixed tensor dtypes are not supported by model ${t.id}`);c=o.desc.dataType,n.input===t.input&&s===void 0&&(s=d[1],r.set(t.input,s));let f=l(n.input,n.id);if(f!==d[1])throw Error(`Tensor ${n.weight} expects ${d[1]} input channels, but ${n.input} provides ${f}`);r.set(n.id,d[0]),i.set(n.id,{weight:o,bias:u,inputChannels:d[1],outputChannels:d[0],kernelHeight:d[2],kernelWidth:d[3]}),a.set(n.id,{inputChannels:d[1],outputChannels:d[0]})}else if(n.op===`concat`){if(n.inputs.length<2)throw Error(`Concat ${n.id} requires at least two inputs`);let e=n.inputs.reduce((e,t)=>e+l(t,n.id),0);r.set(n.id,e)}else r.set(n.id,l(n.input,n.id));o.add(n.id)}if(s===void 0||c===void 0)throw Error(`Model ${t.id} has no convolution reading its input`);let u=r.get(t.output);if(u===void 0)throw Error(`Model ${t.id} output ${t.output} is not produced`);if(u!==3)throw Error(`Model ${t.id} must produce 3 channels, got ${u}`);return{spec:t,inputChannels:s,outputChannels:u,tensorDataType:c,channelsByValue:r,convChannels:a,convTensors:i}}var We=`This is not an object`,Ge=`This is not a Float16Array object`,Ke=`This constructor is not a subclass of Float16Array`,qe=`The constructor property value is not an object`,Je=`Species constructor didn't return TypedArray object`,Ye=`Derived constructor created TypedArray object which was too small length`,Xe=`Attempting to access detached ArrayBuffer`,Ze=`Cannot convert undefined or null to object`,Qe=`Cannot mix BigInt and other types, use explicit conversions`,$e=`@@iterator property is not callable`,et=`Reduce of empty array with no initial value`,tt=`The comparison function must be either a function or undefined`,nt=`Offset is out of bounds`;function O(e){return(t,...n)=>k(e,t,n)}function rt(e,t){return O(st(e,t).get)}var{apply:k,construct:it,defineProperty:at,get:ot,getOwnPropertyDescriptor:st,getPrototypeOf:ct,has:lt,ownKeys:ut,set:dt,setPrototypeOf:ft}=Reflect,pt=Proxy,{EPSILON:mt,MAX_SAFE_INTEGER:ht,isFinite:gt,isNaN:_t}=Number,{iterator:A,species:vt,toStringTag:yt,for:bt}=Symbol,xt=Object,{create:St,defineProperty:Ct,freeze:wt,is:Tt}=xt,Et=xt.prototype,Dt=Et.__lookupGetter__?O(Et.__lookupGetter__):(e,t)=>{if(e==null)throw I(Ze);let n=xt(e);do{let e=st(n,t);if(e!==void 0)return j(e,`get`)?e.get:void 0}while((n=ct(n))!==null)},j=xt.hasOwn||O(Et.hasOwnProperty),Ot=Array,kt=Ot.isArray,At=Ot.prototype,jt=O(At.join),Mt=O(At.push),Nt=O(At.toLocaleString),Pt=At[A],Ft=O(Pt),{abs:It,trunc:Lt}=Math,Rt=ArrayBuffer,zt=Rt.isView,Bt=Rt.prototype,Vt=O(Bt.slice),Ht=rt(Bt,`byteLength`),Ut=typeof SharedArrayBuffer<`u`?SharedArrayBuffer:null,Wt=Ut&&rt(Ut.prototype,`byteLength`),Gt=ct(Uint8Array),Kt=Gt.from,M=Gt.prototype,qt=M[A],Jt=O(M.keys),Yt=O(M.values),Xt=O(M.entries),Zt=O(M.set),Qt=O(M.reverse),$t=O(M.fill),en=O(M.copyWithin),tn=O(M.sort),nn=O(M.slice),rn=O(M.subarray),N=rt(M,`buffer`),an=rt(M,`byteOffset`),P=rt(M,`length`),on=rt(M,yt),sn=Uint8Array,F=Uint16Array,cn=(...e)=>k(Kt,F,e),ln=Uint32Array,un=Float32Array,dn=ct([][A]()),fn=O(dn.next),pn=O((function*(){})().next),mn=ct(dn),hn=DataView.prototype;hn.getUint16,hn.setUint16;var I=TypeError,gn=RangeError,_n=WeakSet,vn=_n.prototype,yn=O(vn.add),bn=O(vn.has),xn=WeakMap,Sn=xn.prototype,Cn=O(Sn.get),wn=O(Sn.has),Tn=O(Sn.set),En=new xn,Dn=St(null,{next:{value:function(){return fn(Cn(En,this))}},[A]:{value:function(){return this}}});function On(e){if(e[A]===Pt&&dn.next===fn)return e;let t=St(Dn);return Tn(En,t,Ft(e)),t}var kn=new xn,An=St(mn,{next:{value:function(){return pn(Cn(kn,this))},writable:!0,configurable:!0}});for(let e of ut(dn))e!==`next`&&Ct(An,e,st(dn,e));function jn(e){let t=St(An);return Tn(kn,t,e),t}function Mn(e){return typeof e==`object`&&!!e||typeof e==`function`}function Nn(e){return typeof e==`object`&&!!e}function Pn(e){return on(e)!==void 0}function Fn(e){let t=on(e);return t===`BigInt64Array`||t===`BigUint64Array`}function In(e){try{return!kt(e)&&(Ht(e),!0)}catch{return!1}}function Ln(e){if(Ut===null)return!1;try{return Wt(e),!0}catch{return!1}}function Rn(e){return In(e)||Ln(e)}function zn(e){return kt(e)?e[A]===Pt&&dn.next===fn:!1}function Bn(e){return Pn(e)?e[A]===qt&&dn.next===fn:!1}function Vn(e){if(typeof e!=`string`)return!1;let t=+e;return e!==t+``||!gt(t)?!1:t===Lt(t)}var Hn=bt(`__Float16Array__`);function Un(e){if(!Nn(e))return!1;let t=ct(e);if(!Nn(t))return!1;let n=t.constructor;if(n===void 0)return!1;if(!Mn(n))throw I(qe);return lt(n,Hn)}var Wn=1/mt;function Gn(e){return e+Wn-Wn}var Kn=6103515625e-14,qn=65504,Jn=.0009765625,Yn=Jn*Kn,Xn=Jn*Wn;function Zn(e){let t=+e;if(!gt(t)||t===0)return t;let n=t>0?1:-1,r=It(t);if(r<Kn)return n*Gn(r/Yn)*Yn;let i=(1+Xn)*r,a=i-(i-r);return a>qn||_t(a)?n*(1/0):n*a}var Qn=new Rt(4),$n=new un(Qn),er=new ln(Qn),L=new F(512),R=new sn(512);for(let e=0;e<256;++e){let t=e-127;t<-24?(L[e]=0,L[e|256]=32768,R[e]=24,R[e|256]=24):t<-14?(L[e]=1024>>-t-14,L[e|256]=1024>>-t-14|32768,R[e]=-t-1,R[e|256]=-t-1):t<=15?(L[e]=t+15<<10,L[e|256]=t+15<<10|32768,R[e]=13,R[e|256]=13):t<128?(L[e]=31744,L[e|256]=64512,R[e]=24,R[e|256]=24):(L[e]=31744,L[e|256]=64512,R[e]=13,R[e|256]=13)}function z(e){$n[0]=Zn(e);let t=er[0],n=t>>23&511;return L[n]+((t&8388607)>>R[n])}var tr=new ln(2048);for(let e=1;e<1024;++e){let t=e<<13,n=0;for(;!(t&8388608);)t<<=1,n-=8388608;t&=-8388609,n+=947912704,tr[e]=t|n}for(let e=1024;e<2048;++e)tr[e]=939524096+(e-1024<<13);var nr=new ln(64);for(let e=1;e<31;++e)nr[e]=e<<23;nr[31]=1199570944,nr[32]=2147483648;for(let e=33;e<63;++e)nr[e]=2147483648+(e-32<<23);nr[63]=3347054592;var rr=new F(64);for(let e=1;e<64;++e)e!==32&&(rr[e]=1024);function B(e){let t=e>>10;return er[0]=tr[rr[t]+(e&1023)]+nr[t],$n[0]}function V(e){let t=+e;return _t(t)||t===0?0:Lt(t)}function ir(e){let t=V(e);return t<0?0:t<ht?t:ht}function ar(e,t){if(!Mn(e))throw I(We);let n=e.constructor;if(n===void 0)return t;if(!Mn(n))throw I(qe);return n[vt]??t}function or(e){if(Ln(e))return!1;try{return Vt(e,0,0),!1}catch{}return!0}function sr(e,t){let n=_t(e),r=_t(t);if(n&&r)return 0;if(n)return 1;if(r||e<t)return-1;if(e>t)return 1;if(e===0&&t===0){let n=Tt(e,0),r=Tt(t,0);if(!n&&r)return-1;if(n&&!r)return 1}return 0}var cr=2,lr=new xn;function ur(e){return wn(lr,e)||!zt(e)&&Un(e)}function H(e){if(!ur(e))throw I(Ge)}function dr(e,t){let n=ur(e),r=Pn(e);if(!n&&!r)throw I(Je);if(typeof t==`number`){let r;if(r=P(n?U(e):e),r<t)throw I(Ye)}if(Fn(e))throw I(Qe)}function U(e){let t=Cn(lr,e);if(t!==void 0){if(or(N(t)))throw I(Xe);return t}let n=e.buffer;if(or(n))throw I(Xe);return Cn(lr,it(W,[n,e.byteOffset,e.length],e.constructor))}function fr(e){let t=P(e),n=[];for(let r=0;r<t;++r)n[r]=B(e[r]);return n}var pr=new _n;for(let e of ut(M)){if(e===yt)continue;let t=st(M,e);j(t,`get`)&&typeof t.get==`function`&&yn(pr,t.get)}var mr=wt({get(e,t,n){return Vn(t)&&j(e,t)?B(ot(e,t)):bn(pr,Dt(e,t))?ot(e,t):ot(e,t,n)},set(e,t,n,r){return Vn(t)&&j(e,t)?dt(e,t,z(n)):dt(e,t,n,r)},getOwnPropertyDescriptor(e,t){if(Vn(t)&&j(e,t)){let n=st(e,t);return n.value=B(n.value),n}return st(e,t)},defineProperty(e,t,n){return Vn(t)&&j(e,t)&&j(n,`value`)&&(n.value=z(n.value)),at(e,t,n)}}),W=class e{constructor(e,t,n){let r;if(ur(e))r=it(F,[U(e)],new.target);else if(Mn(e)&&!Rn(e)){let t,n;if(Pn(e)){if(t=e,n=P(e),or(N(e)))throw I(Xe);if(Fn(e))throw I(Qe);r=it(F,[new Rt(n*cr)],new.target)}else{let i=e[A];if(i!=null&&typeof i!=`function`)throw I($e);i==null?(t=e,n=ir(t.length)):zn(e)?(t=e,n=e.length):(t=[...e],n=t.length),r=it(F,[n],new.target)}for(let e=0;e<n;++e)r[e]=z(t[e])}else r=it(F,arguments,new.target);let i=new pt(r,mr);return Tn(lr,i,r),i}static from(t,...n){let r=this;if(!lt(r,Hn))throw I(Ke);if(r===e){if(ur(t)&&n.length===0){let n=U(t),r=new F(N(n),an(n),P(n));return new e(N(nn(r)))}if(n.length===0)return new e(N(cn(t,z)));let r=n[0],i=n[1];return new e(N(cn(t,function(e,...t){return z(k(r,this,[e,...On(t)]))},i)))}let i,a,o=t[A];if(o!=null&&typeof o!=`function`)throw I($e);if(o!=null)zn(t)?(i=t,a=t.length):Bn(t)?(i=t,a=P(t)):(i=[...t],a=i.length);else{if(t==null)throw I(Ze);i=xt(t),a=ir(i.length)}let s=new r(a);if(n.length===0)for(let e=0;e<a;++e)s[e]=i[e];else{let e=n[0],t=n[1];for(let n=0;n<a;++n)s[n]=k(e,t,[i[n],n])}return s}static of(...t){let n=this;if(!lt(n,Hn))throw I(Ke);let r=t.length;if(n===e){let n=new e(r),i=U(n);for(let e=0;e<r;++e)i[e]=z(t[e]);return n}let i=new n(r);for(let e=0;e<r;++e)i[e]=t[e];return i}keys(){return H(this),Jt(U(this))}values(){H(this);let e=U(this);return jn((function*(){for(let t of Yt(e))yield B(t)})())}entries(){H(this);let e=U(this);return jn((function*(){for(let[t,n]of Xt(e))yield[t,B(n)]})())}at(e){H(this);let t=U(this),n=P(t),r=V(e),i=r>=0?r:n+r;if(!(i<0||i>=n))return B(t[i])}with(t,n){H(this);let r=U(this),i=P(r),a=V(t),o=a>=0?a:i+a,s=+n;if(o<0||o>=i)throw gn(nt);let c=new F(N(r),an(r),P(r)),l=new e(N(nn(c))),u=U(l);return u[o]=z(s),l}map(t,...n){H(this);let r=U(this),i=P(r),a=n[0],o=ar(r,e);if(o===e){let n=new e(i),o=U(n);for(let e=0;e<i;++e){let n=B(r[e]);o[e]=z(k(t,a,[n,e,this]))}return n}let s=new o(i);dr(s,i);for(let e=0;e<i;++e){let n=B(r[e]);s[e]=k(t,a,[n,e,this])}return s}filter(t,...n){H(this);let r=U(this),i=P(r),a=n[0],o=[];for(let e=0;e<i;++e){let n=B(r[e]);k(t,a,[n,e,this])&&Mt(o,n)}let s=new(ar(r,e))(o);return dr(s),s}reduce(e,...t){H(this);let n=U(this),r=P(n);if(r===0&&t.length===0)throw I(et);let i,a;t.length===0?(i=B(n[0]),a=1):(i=t[0],a=0);for(let t=a;t<r;++t)i=e(i,B(n[t]),t,this);return i}reduceRight(e,...t){H(this);let n=U(this),r=P(n);if(r===0&&t.length===0)throw I(et);let i,a;t.length===0?(i=B(n[r-1]),a=r-2):(i=t[0],a=r-1);for(let t=a;t>=0;--t)i=e(i,B(n[t]),t,this);return i}forEach(e,...t){H(this);let n=U(this),r=P(n),i=t[0];for(let t=0;t<r;++t)k(e,i,[B(n[t]),t,this])}find(e,...t){H(this);let n=U(this),r=P(n),i=t[0];for(let t=0;t<r;++t){let r=B(n[t]);if(k(e,i,[r,t,this]))return r}}findIndex(e,...t){H(this);let n=U(this),r=P(n),i=t[0];for(let t=0;t<r;++t)if(k(e,i,[B(n[t]),t,this]))return t;return-1}findLast(e,...t){H(this);let n=U(this),r=P(n),i=t[0];for(let t=r-1;t>=0;--t){let r=B(n[t]);if(k(e,i,[r,t,this]))return r}}findLastIndex(e,...t){H(this);let n=U(this),r=P(n),i=t[0];for(let t=r-1;t>=0;--t)if(k(e,i,[B(n[t]),t,this]))return t;return-1}every(e,...t){H(this);let n=U(this),r=P(n),i=t[0];for(let t=0;t<r;++t)if(!k(e,i,[B(n[t]),t,this]))return!1;return!0}some(e,...t){H(this);let n=U(this),r=P(n),i=t[0];for(let t=0;t<r;++t)if(k(e,i,[B(n[t]),t,this]))return!0;return!1}set(e,...t){H(this);let n=U(this),r=V(t[0]);if(r<0)throw gn(nt);if(e==null)throw I(Ze);if(Fn(e))throw I(Qe);if(ur(e))return Zt(U(this),U(e),r);if(Pn(e)&&or(N(e)))throw I(Xe);let i=P(n),a=xt(e),o=ir(a.length);if(r===1/0||o+r>i)throw gn(nt);for(let e=0;e<o;++e)n[e+r]=z(a[e])}reverse(){return H(this),Qt(U(this)),this}toReversed(){H(this);let t=U(this),n=new F(N(t),an(t),P(t)),r=new e(N(nn(n)));return Qt(U(r)),r}fill(e,...t){return H(this),$t(U(this),z(e),...On(t)),this}copyWithin(e,t,...n){return H(this),en(U(this),e,t,...On(n)),this}sort(e){H(this);let t=U(this),n=e===void 0?sr:e;return tn(t,(e,t)=>n(B(e),B(t))),this}toSorted(t){H(this);let n=U(this);if(t!==void 0&&typeof t!=`function`)throw new I(tt);let r=t===void 0?sr:t,i=new F(N(n),an(n),P(n)),a=new e(N(nn(i)));return tn(U(a),(e,t)=>r(B(e),B(t))),a}slice(t,n){H(this);let r=U(this),i=ar(r,e);if(i===e){let i=new F(N(r),an(r),P(r));return new e(N(nn(i,t,n)))}let a=P(r),o=V(t),s=n===void 0?a:V(n),c;c=o===-1/0?0:o<0?a+o>0?a+o:0:a<o?a:o;let l;l=s===-1/0?0:s<0?a+s>0?a+s:0:a<s?a:s;let u=l-c>0?l-c:0,d=new i(u);if(dr(d,u),u===0)return d;if(or(N(r)))throw I(Xe);let f=0;for(;c<l;)d[f]=B(r[c]),++c,++f;return d}subarray(t,n){H(this);let r=U(this),i=ar(r,e),a=rn(new F(N(r),an(r),P(r)),t,n),o=new i(N(a),an(a),P(a));return dr(o),o}indexOf(e,...t){H(this);let n=U(this),r=P(n),i=V(t[0]);if(i===1/0)return-1;i<0&&(i+=r,i<0&&(i=0));for(let t=i;t<r;++t)if(j(n,t)&&B(n[t])===e)return t;return-1}lastIndexOf(e,...t){H(this);let n=U(this),r=P(n),i=t.length>=1?V(t[0]):r-1;if(i===-1/0)return-1;i>=0?i=i<r-1?i:r-1:i+=r;for(let t=i;t>=0;--t)if(j(n,t)&&B(n[t])===e)return t;return-1}includes(e,...t){H(this);let n=U(this),r=P(n),i=V(t[0]);if(i===1/0)return!1;i<0&&(i+=r,i<0&&(i=0));let a=_t(e);for(let t=i;t<r;++t){let r=B(n[t]);if(a&&_t(r)||r===e)return!0}return!1}join(e){return H(this),jt(fr(U(this)),e)}toLocaleString(...e){return H(this),Nt(fr(U(this)),...On(e))}get[yt](){if(ur(this))return`Float16Array`}};Ct(W,`BYTES_PER_ELEMENT`,{value:cr}),Ct(W,Hn,{}),ft(W,Gt);var hr=W.prototype;Ct(hr,`BYTES_PER_ELEMENT`,{value:cr}),Ct(hr,A,{value:hr.values,writable:!0,configurable:!0}),ft(hr,M);var gr=8,_r=10,vr=9;function yr(e,t,n=!1){let r=e===`fp16`?2:4;return(100*t+(n?vr*t*4:0))*4*r}function br(e){return e===`fp16`?`vec4<f16>`:`vec4<f32>`}function xr(e){return e===`fp16`?`enable f16;
`:``}function Sr(e,t,n){let r=e=>`${n}[weightBase + ${e}u]`;return e===`fp16`?`
        let inputValue = vec4<f16>(${t});
        var partial = vec4<f16>(0.0h);
        partial = fma(${r(0)}, vec4<f16>(inputValue.x), partial);
        partial = fma(${r(1)}, vec4<f16>(inputValue.y), partial);
        partial = fma(${r(2)}, vec4<f16>(inputValue.z), partial);
        partial = fma(${r(3)}, vec4<f16>(inputValue.w), partial);
        acc += vec4<f32>(partial);
`:`
        let inputValue = vec4<f32>(${t});
        acc = fma(vec4<f32>(${r(0)}), vec4<f32>(inputValue.x), acc);
        acc = fma(vec4<f32>(${r(1)}), vec4<f32>(inputValue.y), acc);
        acc = fma(vec4<f32>(${r(2)}), vec4<f32>(inputValue.z), acc);
        acc = fma(vec4<f32>(${r(3)}), vec4<f32>(inputValue.w), acc);
`}function Cr(e,t,n,r=!1){if(!Number.isInteger(n)||n<1)throw Error(`Final RGB shader requires positive input blocks, got ${n}`);let i=br(e),a=100*n,o=vr*n*4,s=t===`relu`?`max(acc, vec4<f32>(0.0))`:`acc`,c=Sr(e,`inputTile[patchBase + inputBlock]`,r?`weightTile`:`weights`);return`${xr(e)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}

@group(0) @binding(0) var<storage, read> inputData: array<${i}>;
@group(0) @binding(1) var<storage, read> weights: array<${i}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<vec4<f32>>;
@group(0) @binding(4) var<uniform> params: Params;

var<workgroup> inputTile: array<${i}, ${a}>;
${r?`var<workgroup> weightTile: array<${i}, ${o}>;`:``}

@compute @workgroup_size(${gr}, ${gr}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(global_invocation_id) gid: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let localLinear = localId.y * ${gr}u + localId.x;
  for (
    var loadIndex = localLinear;
    loadIndex < ${a}u;
    loadIndex += 64u
  ) {
    let tilePixel = loadIndex / ${n}u;
    let inputBlock = loadIndex % ${n}u;
    let tileX = tilePixel % ${_r}u;
    let tileY = tilePixel / ${_r}u;
    let inputX = i32(workgroupId.x * ${gr}u + tileX) - 1;
    let inputY = i32(workgroupId.y * ${gr}u + tileY) - 1;
    var value = ${i}(0.0);
    if (
      inputX >= 0 && inputX < i32(params.inputWidth) &&
      inputY >= 0 && inputY < i32(params.inputHeight)
    ) {
      let inputIndex =
        (u32(inputY) * params.inputWidth + u32(inputX)) *
        ${n}u + inputBlock;
      value = inputData[inputIndex];
    }
    inputTile[loadIndex] = value;
  }

${r?`  for (
    var loadIndex = localLinear;
    loadIndex < ${o}u;
    loadIndex += 64u
  ) {
    weightTile[loadIndex] = weights[loadIndex];
  }

`:``}  // Out-of-range invocations must reach this barrier before returning.
  workgroupBarrier();

  let outputInBounds =
    gid.x < params.outputWidth &&
    gid.y < params.outputHeight &&
    gid.z < params.outputBlocks;
  if (!outputInBounds) {
    return;
  }

  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    if (inputY < 0 || inputY >= i32(params.inputHeight)) {
      continue;
    }
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      if (inputX < 0 || inputX >= i32(params.inputWidth)) {
        continue;
      }
      let patchBase =
        ((localId.y + ky) * ${_r}u + localId.x + kx) *
        ${n}u;
      for (var inputBlock = 0u; inputBlock < ${n}u; inputBlock++) {
        let weightBase =
          ((ky * 3u + kx) * ${n}u + inputBlock) * 4u;
        ${c}
      }
    }
  }

  let outputIndex =
    (gid.y * params.outputWidth + gid.x) * 1u + gid.z;
  outputData[outputIndex] = ${s};
}
`}function wr(e){return e.op===`concat`?e.inputs:[e.input]}function Tr(e){let t=new Map;for(let n of e.nodes)for(let e of wr(n)){let r=t.get(e)??[];r.push(n),t.set(e,r)}return t}function Er(e,t,n){let r=e.get(t);if(r?.length===1&&r[0].op===n)return r[0]}function Dr(e,t={}){let n=e.spec,r=Tr(n),i=new Map(n.nodes.map(e=>[e.id,e])),a=new Set,o=new Map,s=0,c=0;if(t.fuseConvPool!==!1)for(let e of n.nodes){if(e.op!==`conv2d`||e.activation!==`relu`)continue;let t=Er(r,e.id,`maxPool2d`);t&&t.size===2&&t.stride===2&&(a.add(e.id),o.set(t.id,{op:`fusedConvReluMaxPool2d`,id:t.id,input:e.input,conv:e,pool:t}),s++)}if(t.fuseUpsampleConcatConv!==!1)for(let t of n.nodes){if(t.op!==`conv2d`)continue;let n=i.get(t.input);if(n?.op!==`concat`||n.inputs.length!==2||Er(r,n.id,`conv2d`)!==t)continue;let s=e.channelsByValue.get(n.inputs[0]);if(s===void 0||s%4!=0)continue;let l=n.inputs.map(e=>{let t=i.get(e);return t?.op===`upsample2d`&&t.scale===2&&t.mode===`nearest`&&Er(r,t.id,`concat`)===n?{value:t.input,upsample:t}:{value:e}});if(l.filter(e=>e.upsample).length===1){a.add(n.id);for(let e of n.inputs){let t=i.get(e);t?.op===`upsample2d`&&a.add(t.id)}o.set(t.id,{op:`fusedUpsampleConcatConv2d`,id:t.id,inputs:l,conv:t}),c++}}let l=[];for(let e of n.nodes){let t=o.get(e.id);t?l.push(t):a.has(e.id)||l.push(e)}return{spec:n,nodes:l,fusions:{convPool:s,upsampleConcatConv:c}}}function Or(e){return e.op===`concat`?e.inputs:e.op===`fusedUpsampleConcatConv2d`?e.inputs.map(e=>e.value):[e.input]}function kr(e,t){return e.width===t.width&&e.height===t.height}function Ar(e,t,n,r){if(!Number.isInteger(t)||t<=0||!Number.isInteger(n)||n<=0)throw Error(`Invalid model input size ${t}x${n}`);let i=Dr(e,r),a={width:t,height:n,channels:e.inputChannels},o=new Map([[e.spec.input,a]]),s=[],c=(e,t)=>{let n=o.get(e);if(!n)throw Error(`Planned node ${t} reads missing value ${e}`);return n};for(let t of i.nodes){let n;if(t.op===`conv2d`){let r=c(t.input,t.id);n={width:r.width,height:r.height,channels:e.convChannels.get(t.id).outputChannels}}else if(t.op===`maxPool2d`){let e=c(t.input,t.id);n={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),channels:e.channels}}else if(t.op===`upsample2d`){let e=c(t.input,t.id);n={width:e.width*2,height:e.height*2,channels:e.channels}}else if(t.op===`concat`){let e=t.inputs.map(e=>c(e,t.id));if(e.some(t=>!kr(t,e[0])))throw Error(`Concat ${t.id} has mismatched spatial shapes`);n={width:e[0].width,height:e[0].height,channels:e.reduce((e,t)=>e+t.channels,0)}}else if(t.op===`fusedConvReluMaxPool2d`){let r=c(t.input,t.id);n={width:Math.ceil(r.width/2),height:Math.ceil(r.height/2),channels:e.convChannels.get(t.conv.id).outputChannels}}else{let r=t.inputs.map(e=>{let n=c(e.value,t.id);return e.upsample?{...n,width:n.width*2,height:n.height*2}:n});if(r.some(e=>!kr(e,r[0])))throw Error(`Fused decoder ${t.id} has mismatched spatial shapes`);n={width:r[0].width,height:r[0].height,channels:e.convChannels.get(t.conv.id).outputChannels}}o.set(t.id,n),s.push(n)}let l=new Map;i.nodes.forEach((e,t)=>{for(let n of Or(e))l.set(n,t)}),l.set(e.spec.output,i.nodes.length);let u=i.nodes.map((e,t)=>({node:e,outputShape:s[t],lastUse:l.get(e.id)??t}));return{...i,inputShape:a,valueShapes:o,plannedNodes:u}}var jr=class{_stats=new Map;track(e,t){let n=this._stats.get(e);return n||(n={created:0,destroyed:0,live:0,peakLive:0,resources:new Set},this._stats.set(e,n)),n.resources.has(t)||(n.resources.add(t),n.created++,n.live++,n.peakLive=Math.max(n.peakLive,n.live)),t}release(e,t,n){if(!t)return!1;let r=this._stats.get(e);if(!r?.resources.delete(t))return!1;try{n()}finally{r.destroyed++,r.live--}return!0}snapshot(e=0){let t=0,n=0,r=0,i=0,a={};for(let[e,o]of this._stats){let s={created:o.created,destroyed:o.destroyed,live:o.live,peakLive:o.peakLive};a[e]=s,t+=s.live,n+=s.created,r+=s.destroyed,i+=s.peakLive}return{live:t,created:n,destroyed:r,peakLive:i,pending:e,byKind:a}}},Mr=new WeakMap;function Nr(e){let t=Mr.get(e);return t||(t={ready:new Map,pending:new Map},Mr.set(e,t)),t}var G=8,Pr=8,K=8,Fr=10;function q(e){let[t,n]=e.workgroupSize;return{workgroupX:t,workgroupY:n,rowsPerThread:e.rowsPerThread,tileM:n*e.rowsPerThread,tileNBlocks:t,tileKBlocks:Pr}}function Ir(e){let t=q(e),n=e.sharedLayout===`padded`||e.sharedLayout===`padded-input`,r=e.sharedLayout===`padded`||e.sharedLayout===`padded-weights`;return{input:t.tileM*t.tileKBlocks+(n?t.workgroupY:0),weights:t.tileKBlocks*t.tileNBlocks*(r?5:4)}}function Lr(e,t){return t.sharedLayout===`padded`||t.sharedLayout===`padded-input`?`(${e}) + (${e}) / ${t.rowsPerThread*Pr}u`:e}function Rr(e,t){return t.sharedLayout===`padded`||t.sharedLayout===`padded-weights`?`(${e}) + (${e}) / 4u`:e}function zr(e,t){return Math.ceil(e/t)*t}function J(e){return Math.ceil(e/4)}function Br(e,t){return e.width*e.height*J(e.channels)*4*t}var Vr;function Hr(e){let t=e&32768?-1:1,n=e>>>10&31,r=e&1023;return n===0?t*r*2**-24:n===31?r===0?t*(1/0):NaN:t*(1+r/1024)*2**(n-15)}function Ur(){if(!Vr){Vr=new Float32Array(65536);for(let e=0;e<Vr.length;e++)Vr[e]=Hr(e)}return Vr}function Wr(e){if(e.desc.dataType===`Float32`)return new Float32Array(e.data.buffer,e.data.byteOffset,e.data.byteLength/4);let t=new Uint16Array(e.data.buffer,e.data.byteOffset,e.data.byteLength/2),n=new Float32Array(t.length);if(t.length<4096)for(let e=0;e<t.length;e++)n[e]=Hr(t[e]);else{let e=Ur();for(let r=0;r<t.length;r++)n[r]=e[t[r]]}return n}function Gr(e,t,n,r){let i=zr(n.byteLength,4),a=e.createBuffer({label:t,size:i,usage:r,mappedAtCreation:!0});return new Uint8Array(a.getMappedRange()).set(new Uint8Array(n.buffer,n.byteOffset,n.byteLength)),a.unmap(),a}function Kr(e,t,n){let r=new Uint32Array(zr(n.length,4));return r.set(n),Gr(e,t,r,GPUBufferUsage.UNIFORM)}function qr(e,t,n,r,i){let a=J(n.inputChannels),o=J(n.outputChannels),s=o*n.kernelHeight*n.kernelWidth*a*4*4,c=r===`fp16`&&n.weight.desc.dataType===`Float16`,l=c?new Uint16Array(s):r===`fp16`?new W(s):new Float32Array(s),u=c?new Uint16Array(n.weight.data.buffer,n.weight.data.byteOffset,n.weight.data.byteLength/2):Wr(n.weight);for(let e=0;e<o;e++)for(let t=0;t<n.kernelHeight;t++)for(let r=0;r<n.kernelWidth;r++)for(let s=0;s<a;s++)for(let c=0;c<4;c++){let d=e*4+c;for(let f=0;f<4;f++){let p=s*4+f,m=(i===`k-major`?(((t*n.kernelWidth+r)*a+s)*o+e)*16:(((e*n.kernelHeight+t)*n.kernelWidth+r)*a+s)*16)+f*4+c;d<n.outputChannels&&p<n.inputChannels&&(l[m]=u[((d*n.inputChannels+p)*n.kernelHeight+t)*n.kernelWidth+r])}}let d=new Float32Array(o*4);d.set(Wr(n.bias));let f=Gr(e,`oidn/${t}/weights/${r}/${i}`,l,GPUBufferUsage.STORAGE);try{return{weights:f,weightLayout:i,bias:Gr(e,`oidn/${t}/bias`,d,GPUBufferUsage.STORAGE)}}catch(e){throw f.destroy(),e}}function Y(e){return e===`fp16`?`vec4<f16>`:`vec4<f32>`}function X(e){return e===`fp16`?`enable f16;
`:``}function Z(e,t){return t===`fp16`?`vec4<f16>(${e})`:e}function Q(e,t){return t===`relu`?`max(${e}, vec4<f32>(0.0))`:e}function Jr(e,t,n){return n===`fp32`?`
let inputValue = vec4<f32>(${e});
let weightBase = ${t};
acc = fma(vec4<f32>(weights[weightBase]), vec4<f32>(inputValue.x), acc);
acc = fma(vec4<f32>(weights[weightBase + 1u]), vec4<f32>(inputValue.y), acc);
acc = fma(vec4<f32>(weights[weightBase + 2u]), vec4<f32>(inputValue.z), acc);
acc = fma(vec4<f32>(weights[weightBase + 3u]), vec4<f32>(inputValue.w), acc);
`:`
let inputValue = vec4<f16>(${e});
let weightBase = ${t};
var partial = vec4<f16>(0.0h);
partial = fma(weights[weightBase], vec4<f16>(inputValue.x), partial);
partial = fma(weights[weightBase + 1u], vec4<f16>(inputValue.y), partial);
partial = fma(weights[weightBase + 2u], vec4<f16>(inputValue.z), partial);
partial = fma(weights[weightBase + 3u], vec4<f16>(inputValue.w), partial);
acc += vec4<f32>(partial);
`}function Yr(e,t,n){let r=n===`fp16`?`vec4<f16>`:`vec4<f32>`;return`
let inputValue = ${r}(${e});
let weightBase = ${t};
${n===`fp16`?`var partial = vec4<f16>(0.0h);
partial = fma(subgroupBroadcast(weights[weightBase], 0u), ${r}(inputValue.x), partial);
partial = fma(subgroupBroadcast(weights[weightBase + 1u], 0u), ${r}(inputValue.y), partial);
partial = fma(subgroupBroadcast(weights[weightBase + 2u], 0u), ${r}(inputValue.z), partial);
partial = fma(subgroupBroadcast(weights[weightBase + 3u], 0u), ${r}(inputValue.w), partial);
acc += vec4<f32>(partial);`:`acc = fma(subgroupBroadcast(weights[weightBase], 0u), vec4<f32>(inputValue.x), acc);
acc = fma(subgroupBroadcast(weights[weightBase + 1u], 0u), vec4<f32>(inputValue.y), acc);
acc = fma(subgroupBroadcast(weights[weightBase + 2u], 0u), vec4<f32>(inputValue.z), acc);
acc = fma(subgroupBroadcast(weights[weightBase + 3u], 0u), vec4<f32>(inputValue.w), acc);`}
`}function Xr(e,t,n){return e===`fp16`&&(t.loadMode===`packed-all`||n&&t.loadMode===`packed-weights`)}function Zr(e,t){return t?`bitcast<vec4<f16>>(${e})`:e}function Qr(e,t){let{rowsPerThread:n,tileNBlocks:r,tileKBlocks:i}=q(t),a=Lr(`tileSpatial * ${i}u + tileK`,t),o=`(tileK * ${r}u + localId.x) * ${t.sharedLayout===`padded`||t.sharedLayout===`padded-weights`?5:4}u`;if(t.accumulationOrder===`row-major`){let t=Y(e),r=e===`fp16`?`partial`:`acc[row]`;return`
    for (var row = 0u; row < ${n}u; row++) {
      ${e===`fp16`?`var partial = vec4<f16>(0.0h);`:``}
      let tileSpatial = localId.y * ${n}u + row;
      for (var tileK = 0u; tileK < ${i}u; tileK++) {
        let weightBase = ${o};
        let inputValue = inputTile[${a}];
        ${r} = fma(weightTile[weightBase], ${t}(inputValue.x), ${r});
        ${r} = fma(weightTile[weightBase + 1u], ${t}(inputValue.y), ${r});
        ${r} = fma(weightTile[weightBase + 2u], ${t}(inputValue.z), ${r});
        ${r} = fma(weightTile[weightBase + 3u], ${t}(inputValue.w), ${r});
      }
      ${e===`fp16`?`acc[row] += vec4<f32>(partial);`:``}
    }
`}return e===`fp16`?`
    var partial: array<vec4<f16>, ${n}>;
    for (var row = 0u; row < ${n}u; row++) {
      partial[row] = vec4<f16>(0.0h);
    }
    for (var tileK = 0u; tileK < ${i}u; tileK++) {
      let weightBase =
        ${o};
      for (var row = 0u; row < ${n}u; row++) {
        let tileSpatial =
          localId.y * ${n}u + row;
        let inputValue =
          inputTile[${a}];
        partial[row] = fma(
          weightTile[weightBase],
          vec4<f16>(inputValue.x),
          partial[row]
        );
        partial[row] = fma(
          weightTile[weightBase + 1u],
          vec4<f16>(inputValue.y),
          partial[row]
        );
        partial[row] = fma(
          weightTile[weightBase + 2u],
          vec4<f16>(inputValue.z),
          partial[row]
        );
        partial[row] = fma(
          weightTile[weightBase + 3u],
          vec4<f16>(inputValue.w),
          partial[row]
        );
      }
    }
    for (var row = 0u; row < ${n}u; row++) {
      acc[row] += vec4<f32>(partial[row]);
    }
`:`
    for (var tileK = 0u; tileK < ${i}u; tileK++) {
      let weightBase =
        ${o};
      for (var row = 0u; row < ${n}u; row++) {
        let tileSpatial =
          localId.y * ${n}u + row;
        let inputValue =
          inputTile[${a}];
        acc[row] = fma(
          weightTile[weightBase],
          vec4<f32>(inputValue.x),
          acc[row]
        );
        acc[row] = fma(
          weightTile[weightBase + 1u],
          vec4<f32>(inputValue.y),
          acc[row]
        );
        acc[row] = fma(
          weightTile[weightBase + 2u],
          vec4<f32>(inputValue.z),
          acc[row]
        );
        acc[row] = fma(
          weightTile[weightBase + 3u],
          vec4<f32>(inputValue.w),
          acc[row]
        );
      }
    }
`}function $r(e,t,n,r,i){let a=Y(e),o=Y(e),s=Y(t),c=Z(Q(`acc`,n),t);return`${X(e)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}

@group(0) @binding(0) var<storage, read> inputData: array<${a}>;
@group(0) @binding(1) var<storage, read> weights: array<${o}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${s}>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${G}, ${G}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.outputWidth || gid.y >= params.outputHeight || gid.z >= ${i}u) {
    return;
  }
  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    if (inputY < 0 || inputY >= i32(params.inputHeight)) { continue; }
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      if (inputX < 0 || inputX >= i32(params.inputWidth)) { continue; }
      let pixelBase = (u32(inputY) * params.inputWidth + u32(inputX)) * ${r}u;
      for (var inputBlock = 0u; inputBlock < ${r}u; inputBlock++) {
        ${Jr(`inputData[pixelBase + inputBlock]`,`((((gid.z * 3u + ky) * 3u + kx) * ${r}u + inputBlock) * 4u)`,e)}
      }
    }
  }
  let outputIndex = (gid.y * params.outputWidth + gid.x) * ${i}u + gid.z;
  outputData[outputIndex] = ${c};
}
`}function ei(e,t,n,r,i){let a=Y(e),o=Y(e),s=Y(t),c=Z(Q(`acc`,n),t);return`${X(e)}
enable subgroups;
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${a}>;
@group(0) @binding(1) var<storage, read> weights: array<${o}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${s}>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${G}, ${G}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let outputInBounds =
    gid.x < params.outputWidth && gid.y < params.outputHeight;
  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    let clampedY = u32(clamp(inputY, 0, i32(params.inputHeight) - 1));
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      let clampedX = u32(clamp(inputX, 0, i32(params.inputWidth) - 1));
      let inputInBounds =
        outputInBounds && inputX >= 0 && inputY >= 0 &&
        inputX < i32(params.inputWidth) && inputY < i32(params.inputHeight);
      let pixelBase =
        (clampedY * params.inputWidth + clampedX) * ${r}u;
      for (var inputBlock = 0u; inputBlock < ${r}u; inputBlock++) {
        ${Yr(`select(${a}(0.0), inputData[pixelBase + inputBlock], inputInBounds)`,`((((gid.z * 3u + ky) * 3u + kx) * ${r}u + inputBlock) * 4u)`,e)}
      }
    }
  }
  if (outputInBounds) {
    let outputIndex =
      (gid.y * params.outputWidth + gid.x) * ${i}u + gid.z;
    outputData[outputIndex] = ${c};
  }
}
`}function ti(e,t,n,r,i){let a=Y(e),o=Y(t),s=Z(Q(`acc`,n),t),c=100*r;return`${X(e)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${a}>;
@group(0) @binding(1) var<storage, read> weights: array<${a}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${o}>;
@group(0) @binding(4) var<uniform> params: Params;

var<workgroup> inputPatch: array<${a}, ${c}>;

@compute @workgroup_size(${K}, ${K}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let localLinear =
    localId.y * ${K}u + localId.x;
  for (
    var loadIndex = localLinear;
    loadIndex < ${c}u;
    loadIndex += 64u
  ) {
    let patchPixel = loadIndex / ${r}u;
    let inputBlock = loadIndex % ${r}u;
    let patchX = patchPixel % ${Fr}u;
    let patchY = patchPixel / ${Fr}u;
    let inputX =
      i32(workgroupId.x * ${K}u + patchX) - 1;
    let inputY =
      i32(workgroupId.y * ${K}u + patchY) - 1;
    var value = ${a}(0.0);
    if (
      inputX >= 0 && inputX < i32(params.inputWidth) &&
      inputY >= 0 && inputY < i32(params.inputHeight)
    ) {
      let inputIndex =
        (u32(inputY) * params.inputWidth + u32(inputX)) *
        ${r}u + inputBlock;
      value = inputData[inputIndex];
    }
    inputPatch[loadIndex] = value;
  }
  workgroupBarrier();

  let outputX =
    workgroupId.x * ${K}u + localId.x;
  let outputY =
    workgroupId.y * ${K}u + localId.y;
  let outputBlock = workgroupId.z;
  if (
    outputX >= params.outputWidth || outputY >= params.outputHeight ||
    outputBlock >= ${i}u
  ) {
    return;
  }

  var acc = bias[outputBlock];
  for (var ky = 0u; ky < 3u; ky++) {
    for (var kx = 0u; kx < 3u; kx++) {
      let patchBase =
        ((localId.y + ky) * ${Fr}u + localId.x + kx) *
        ${r}u;
      for (var inputBlock = 0u; inputBlock < ${r}u; inputBlock++) {
        ${Jr(`inputPatch[patchBase + inputBlock]`,`((((outputBlock * 3u + ky) * 3u + kx) * ${r}u + inputBlock) * 4u)`,e)}
      }
    }
  }
  let outputIndex =
    (outputY * params.outputWidth + outputX) * ${i}u + outputBlock;
  outputData[outputIndex] = ${s};
}
`}function ni(e,t,n,r){let{workgroupX:i,workgroupY:a,tileM:o,tileKBlocks:s}=q(n),c=t?`params.outputWidth`:`params.inputWidth`,l=t?`params.outputHeight`:`params.inputHeight`,u=n.addressMode===`base-offset`,d=r?r.blocks.map((e,t)=>`cachedBase${t}[load] = (${t===r.upsampled?`y / 2u`:`y`} * params.source${t}Width + ${t===r.upsampled?`x / 2u`:`x`}) * ${e}u;`).join(`
    `):`cachedBase0[load] = (y * params.inputWidth + x) * ${e}u;`,f=o*s/(i*a);return`
  ${u?`var cachedBase0: array<u32, ${f}>;
  ${r?`var cachedBase1: array<u32, ${f}>;`:``}`:`var cachedX: array<u32, ${f}>;
  var cachedY: array<u32, ${f}>;`}
  var cachedMask: array<u32, ${f}>;
  for (var load = 0u; load < ${f}u; load++) {
    let loadIndex = localLinear + load * ${i*a}u;
    let spatial = workgroupId.x * ${o}u + loadIndex / ${s}u;
    let x = spatial % params.outputWidth;
    let y = spatial / params.outputWidth;
    ${u?d:`cachedX[load] = x;
    cachedY[load] = y;`}
    let columns =
      select(0u, 0x049u, x > 0u && x - 1u < ${c}) |
      select(0u, 0x092u, x < ${c}) |
      select(0u, 0x124u, x + 1u < ${c});
    let rows =
      select(0u, 0x007u, y > 0u && y - 1u < ${l}) |
      select(0u, 0x038u, y < ${l}) |
      select(0u, 0x1c0u, y + 1u < ${l});
    cachedMask[load] = select(0u, columns & rows, spatial < spatialCount)${u&&r?` | ((x & 1u) << 9u) | ((y & 1u) << 10u)`:``};
  }
  var channelBlock = (localLinear % ${s}u) % ${e}u;
  var filterPosition = (localLinear % ${s}u) / ${e}u;
`}function ri(e,t){let{tileKBlocks:n}=q(t);return`
    channelBlock += ${n%e}u;
    let carry = channelBlock >= ${e}u;
    channelBlock -= select(0u, ${e}u, carry);
    filterPosition += ${Math.floor(n/e)}u + select(0u, 1u, carry);
`}function ii(e,t,n){let{workgroupX:r,workgroupY:i,tileM:a,tileKBlocks:o}=q(n);return`
    let inputBlock = channelBlock;
    let kernelY = filterPosition / 3u;
    let kernelX = filterPosition % 3u;
    for (var load = 0u; load < ${a*o/(r*i)}u; load++) {
      let loadIndex = localLinear + load * ${r*i}u;
      var value = ${e}(0.0);
      if (filterPosition < 9u && (cachedMask[load] & (1u << filterPosition)) != 0u) {
        ${n.addressMode===`base-offset`?``:`let inputX = i32(cachedX[load]) + i32(kernelX) - 1;
        let inputY = i32(cachedY[load]) + i32(kernelY) - 1;`}
        ${t}
      }
      inputTile[${Lr(`loadIndex`,n)}] = value;
    }
`}function ai(e,t,n,r,i,a){let{workgroupX:o,workgroupY:s,rowsPerThread:c,tileM:l,tileNBlocks:u,tileKBlocks:d}=q(a),{addressMode:f,weightLayout:p}=a,m=Y(e),h=Y(t),g=Xr(e,a,!1),_=Xr(e,a,!0),v=g?`vec2<u32>`:m,y=_?`vec2<u32>`:m,ee=Z(Q(`acc`,n),t),b=o*s,x=l*d,S=d*u*4;return`${X(e)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${v}>;
@group(0) @binding(1) var<storage, read> weights: array<${y}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${h}>;
@group(0) @binding(4) var<uniform> params: Params;

var<workgroup> inputTile: array<${m}, ${Ir(a).input}>;
var<workgroup> weightTile: array<${m}, ${Ir(a).weights}>;

@compute @workgroup_size(${o}, ${s}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let spatialBase =
    workgroupId.x * ${l}u +
    localId.y * ${c}u;
  let outputBlock =
    workgroupId.y * ${u}u + localId.x;
  let spatialCount = params.outputWidth * params.outputHeight;
  var acc: array<vec4<f32>, ${c}>;
  if (outputBlock < ${i}u) {
    for (var row = 0u; row < ${c}u; row++) {
      acc[row] = bias[outputBlock];
    }
  }

  let localLinear =
    localId.y * ${o}u + localId.x;
  ${f===`analytic`?``:ni(r,!1,a)}
  let totalK = ${r*9}u;
  for (var kBase = 0u; kBase < totalK; kBase += ${d}u) {
    ${f===`analytic`?`
    for (
      var loadIndex = localLinear;
      loadIndex < ${x}u;
      loadIndex += ${b}u
    ) {
      let tileSpatial = loadIndex / ${d}u;
      let tileK = loadIndex % ${d}u;
      let inputSpatialIndex =
        workgroupId.x * ${l}u + tileSpatial;
      let kIndex = kBase + tileK;
      var value = ${m}(0.0);
      if (inputSpatialIndex < spatialCount && kIndex < totalK) {
        let outputY = inputSpatialIndex / params.outputWidth;
        let outputX = inputSpatialIndex % params.outputWidth;
        let inputBlock = kIndex % ${r}u;
        let kernelIndex = kIndex / ${r}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let inputY = i32(outputY) + i32(kernelY) - 1;
        let inputX = i32(outputX) + i32(kernelX) - 1;
        if (
          inputY >= 0 && inputY < i32(params.inputHeight) &&
          inputX >= 0 && inputX < i32(params.inputWidth)
        ) {
          let inputIndex =
            (u32(inputY) * params.inputWidth + u32(inputX)) *
            ${r}u + inputBlock;
          value = ${Zr(`inputData[inputIndex]`,g)};
        }
      }
      inputTile[${Lr(`loadIndex`,a)}] = value;
    }
    `:ii(m,`
        ${f===`base-offset`?`let offset = (i32(kernelY) - 1) * i32(params.inputWidth) + i32(kernelX) - 1;
        let inputIndex = cachedBase0[load] + u32(offset * ${r}) + inputBlock;`:`let inputIndex = (u32(inputY) * params.inputWidth + u32(inputX)) *
          ${r}u + inputBlock;`}
        value = ${Zr(`inputData[inputIndex]`,g)};
    `,a)}

    for (
      var loadIndex = localLinear;
      loadIndex < ${S}u;
      loadIndex += ${b}u
    ) {
      let tileK = loadIndex / ${u*4}u;
      let outputRemainder = loadIndex % ${u*4}u;
      let tileOutputBlock = outputRemainder / 4u;
      let outputLane = outputRemainder % 4u;
      let loadedOutputBlock =
        workgroupId.y * ${u}u + tileOutputBlock;
      let kIndex = kBase + tileK;
      var value = ${m}(0.0);
      if (loadedOutputBlock < ${i}u && kIndex < totalK) {
        ${p===`k-major`?`
        let weightIndex = (kIndex * ${i}u + loadedOutputBlock) * 4u + outputLane;
        `:f===`analytic`?`
        let inputBlock = kIndex % ${r}u;
        let kernelIndex = kIndex / ${r}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let weightIndex =
          ((((loadedOutputBlock * 3u + kernelY) * 3u + kernelX) *
            ${r}u + inputBlock) * 4u + outputLane);
        `:`
        let weightIndex = (loadedOutputBlock * ${r*9}u + kIndex) * 4u + outputLane;
        `}
        value = ${Zr(`weights[weightIndex]`,_)};
      }
      weightTile[${Rr(`loadIndex`,a)}] = value;
    }

    workgroupBarrier();
    ${Qr(e,a)}
    workgroupBarrier();
    ${f===`analytic`?``:ri(r,a)}
  }

  if (outputBlock < ${i}u) {
    for (var row = 0u; row < ${c}u; row++) {
      let spatialIndex = spatialBase + row;
      if (spatialIndex < spatialCount) {
        let outputIndex = spatialIndex * ${i}u + outputBlock;
        outputData[outputIndex] = ${ee.replaceAll(`acc`,`acc[row]`)};
      }
    }
  }
}
`}function oi(e,t,n,r){let i=Y(e),a=Q(`acc`,t);return`${X(e)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${i}>;
@group(0) @binding(1) var<storage, read> weights: array<${i}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${i}>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${G}, ${G}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.outputWidth || gid.y >= params.outputHeight || gid.z >= ${r}u) {
    return;
  }
  var pooled = vec4<f32>(-3.402823466e+38);
  for (var py = 0u; py < 2u; py++) {
    let centerY = gid.y * 2u + py;
    if (centerY >= params.inputHeight) { continue; }
    for (var px = 0u; px < 2u; px++) {
      let centerX = gid.x * 2u + px;
      if (centerX >= params.inputWidth) { continue; }
      var acc = bias[gid.z];
      for (var ky = 0u; ky < 3u; ky++) {
        let inputY = i32(centerY) + i32(ky) - 1;
        if (inputY < 0 || inputY >= i32(params.inputHeight)) { continue; }
        for (var kx = 0u; kx < 3u; kx++) {
          let inputX = i32(centerX) + i32(kx) - 1;
          if (inputX < 0 || inputX >= i32(params.inputWidth)) { continue; }
          let pixelBase = (u32(inputY) * params.inputWidth + u32(inputX)) * ${n}u;
          for (var inputBlock = 0u; inputBlock < ${n}u; inputBlock++) {
            ${Jr(`inputData[pixelBase + inputBlock]`,`((((gid.z * 3u + ky) * 3u + kx) * ${n}u + inputBlock) * 4u)`,e)}
          }
        }
      }
      pooled = max(pooled, ${a});
    }
  }
  let outputIndex = (gid.y * params.outputWidth + gid.x) * ${r}u + gid.z;
  outputData[outputIndex] = ${Z(`pooled`,e)};
}
`}function si(e,t,n){let r=Y(e);return`${X(e)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${r}>;
@group(0) @binding(1) var<storage, read_write> outputData: array<${r}>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(${G}, ${G}, 1)
fn main(
  @builtin(global_invocation_id) gid: vec3<u32>${n?`,
  @builtin(num_workgroups) groupCount: vec3<u32>`:``}
) {
  ${n?`let linearX = gid.x + gid.z * groupCount.x * ${G}u;
  let outputBlock = linearX % ${t}u;
  let outputX = linearX / ${t}u;`:`let outputBlock = gid.z;
  let outputX = gid.x;`}
  if (
    outputX >= params.outputWidth ||
    gid.y >= params.outputHeight ||
    outputBlock >= ${t}u
  ) {
    return;
  }
  var pooled = vec4<f32>(-3.402823466e+38);
  for (var py = 0u; py < 2u; py++) {
    let inputY = gid.y * 2u + py;
    if (inputY >= params.inputHeight) { continue; }
    for (var px = 0u; px < 2u; px++) {
      let inputX = outputX * 2u + px;
      if (inputX >= params.inputWidth) { continue; }
      let inputIndex =
        (inputY * params.inputWidth + inputX) * ${t}u + outputBlock;
      pooled = max(pooled, vec4<f32>(inputData[inputIndex]));
    }
  }
  let outputIndex =
    (gid.y * params.outputWidth + outputX) * ${t}u + outputBlock;
  outputData[outputIndex] = ${Z(`pooled`,e)};
}
`}function ci(e,t,n,r,i,a,o){let{workgroupX:s,workgroupY:c,rowsPerThread:l,tileM:u,tileNBlocks:d,tileKBlocks:f}=q(o),{addressMode:p,weightLayout:m}=o,h=Y(e),g=Y(t),_=Xr(e,o,!1),v=Xr(e,o,!0),y=_?`vec2<u32>`:h,ee=v?`vec2<u32>`:h,b=r[0]+r[1],x=Z(Q(`acc[row]`,n),t),S=s*c,te=u*f,ne=f*d*4,C=(e,t)=>`
          {
            let sourceBlock = ${t};
            ${p===`base-offset`?`let dx = ${e===i?`(i32((cachedMask[load] >> 9u) & 1u) + i32(kernelX) - 1) >> 1u`:`i32(kernelX) - 1`};
            let dy = ${e===i?`(i32((cachedMask[load] >> 10u) & 1u) + i32(kernelY) - 1) >> 1u`:`i32(kernelY) - 1`};
            let offset = (dy * i32(params.source${e}Width) + dx) * ${r[e]};
            let sourceIndex = cachedBase${e}[load] + u32(offset) + sourceBlock;`:`let sourceX = ${e===i?`u32(inputX) / 2u`:`u32(inputX)`};
            let sourceY = ${e===i?`u32(inputY) / 2u`:`u32(inputY)`};
            let sourceIndex =
              (sourceY * params.source${e}Width + sourceX) *
              ${r[e]}u + sourceBlock;`}
            value = ${Zr(`input${e}[sourceIndex]`,_)};
          }`;return`${X(e)}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${y}>;
@group(0) @binding(1) var<storage, read> input1: array<${y}>;
@group(0) @binding(2) var<storage, read> weights: array<${ee}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${g}>;
@group(0) @binding(5) var<uniform> params: Params;

var<workgroup> inputTile: array<${h}, ${Ir(o).input}>;
var<workgroup> weightTile: array<${h}, ${Ir(o).weights}>;

@compute @workgroup_size(${s}, ${c}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let spatialBase =
    workgroupId.x * ${u}u +
    localId.y * ${l}u;
  let outputBlock =
    workgroupId.y * ${d}u + localId.x;
  let spatialCount = params.outputWidth * params.outputHeight;
  var acc: array<vec4<f32>, ${l}>;
  if (outputBlock < ${a}u) {
    for (var row = 0u; row < ${l}u; row++) {
      acc[row] = bias[outputBlock];
    }
  }

  let localLinear =
    localId.y * ${s}u + localId.x;
  ${p===`analytic`?``:ni(b,!0,o,{blocks:r,upsampled:i})}
  let totalK = ${b*9}u;
  for (var kBase = 0u; kBase < totalK; kBase += ${f}u) {
    ${p===`analytic`?`
    for (
      var loadIndex = localLinear;
      loadIndex < ${te}u;
      loadIndex += ${S}u
    ) {
      let tileSpatial = loadIndex / ${f}u;
      let tileK = loadIndex % ${f}u;
      let outputSpatialIndex =
        workgroupId.x * ${u}u + tileSpatial;
      let kIndex = kBase + tileK;
      var value = ${h}(0.0);
      if (outputSpatialIndex < spatialCount && kIndex < totalK) {
        let outputY = outputSpatialIndex / params.outputWidth;
        let outputX = outputSpatialIndex % params.outputWidth;
        let inputBlock = kIndex % ${b}u;
        let kernelIndex = kIndex / ${b}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let inputY = i32(outputY) + i32(kernelY) - 1;
        let inputX = i32(outputX) + i32(kernelX) - 1;
        if (
          inputY >= 0 && inputY < i32(params.outputHeight) &&
          inputX >= 0 && inputX < i32(params.outputWidth)
        ) {
          if (inputBlock < ${r[0]}u) {
            ${C(0,`inputBlock`)}
          } else {
            ${C(1,`inputBlock - ${r[0]}u`)}
          }
        }
      }
      inputTile[${Lr(`loadIndex`,o)}] = value;
    }
    `:o.decoderLoad===`source-first`?`
    if (channelBlock < ${r[0]}u) {
      ${ii(h,C(0,`inputBlock`),o)}
    } else {
      ${ii(h,C(1,`inputBlock - ${r[0]}u`),o)}
    }
    `:ii(h,`
        if (inputBlock < ${r[0]}u) {
          ${C(0,`inputBlock`)}
        } else {
          ${C(1,`inputBlock - ${r[0]}u`)}
        }
    `,o)}

    for (
      var loadIndex = localLinear;
      loadIndex < ${ne}u;
      loadIndex += ${S}u
    ) {
      let tileK = loadIndex / ${d*4}u;
      let outputRemainder = loadIndex % ${d*4}u;
      let tileOutputBlock = outputRemainder / 4u;
      let outputLane = outputRemainder % 4u;
      let loadedOutputBlock =
        workgroupId.y * ${d}u + tileOutputBlock;
      let kIndex = kBase + tileK;
      var value = ${h}(0.0);
      if (loadedOutputBlock < ${a}u && kIndex < totalK) {
        ${m===`k-major`?`
        let weightIndex = (kIndex * ${a}u + loadedOutputBlock) * 4u + outputLane;
        `:p===`analytic`?`
        let inputBlock = kIndex % ${b}u;
        let kernelIndex = kIndex / ${b}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let weightIndex =
          ((((loadedOutputBlock * 3u + kernelY) * 3u + kernelX) *
            ${b}u + inputBlock) * 4u + outputLane);
        `:`
        let weightIndex = (loadedOutputBlock * ${b*9}u + kIndex) * 4u + outputLane;
        `}
        value = ${Zr(`weights[weightIndex]`,v)};
      }
      weightTile[${Rr(`loadIndex`,o)}] = value;
    }

    workgroupBarrier();
    ${Qr(e,o)}
    workgroupBarrier();
    ${p===`analytic`?``:ri(b,o)}
  }

  if (outputBlock < ${a}u) {
    for (var row = 0u; row < ${l}u; row++) {
      let spatialIndex = spatialBase + row;
      if (spatialIndex < spatialCount) {
        let outputIndex = spatialIndex * ${a}u + outputBlock;
        outputData[outputIndex] = ${x};
      }
    }
  }
}
`}function li(e,t,n,r,i,a){let o=Y(e),s=Y(t),c=r[0]+r[1],l=(t,n)=>{let a=t===i;return`
      {
        let sourceX = ${a?`u32(inputX) / 2u`:`u32(inputX)`};
        let sourceY = ${a?`u32(inputY) / 2u`:`u32(inputY)`};
        let sourcePixelBase = (sourceY * params.source${t}Width + sourceX) * ${r[t]}u;
        for (var sourceBlock = 0u; sourceBlock < ${r[t]}u; sourceBlock++) {
          let inputBlock = ${n}u + sourceBlock;
          ${Jr(`input${t}[sourcePixelBase + sourceBlock]`,`((((gid.z * 3u + ky) * 3u + kx) * ${c}u + inputBlock) * 4u)`,e)}
        }
      }
`},u=Z(Q(`acc`,n),t);return`${X(e)}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${o}>;
@group(0) @binding(1) var<storage, read> input1: array<${o}>;
@group(0) @binding(2) var<storage, read> weights: array<${o}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${s}>;
@group(0) @binding(5) var<uniform> params: Params;

@compute @workgroup_size(${G}, ${G}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.outputWidth || gid.y >= params.outputHeight || gid.z >= ${a}u) {
    return;
  }
  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    if (inputY < 0 || inputY >= i32(params.outputHeight)) { continue; }
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      if (inputX < 0 || inputX >= i32(params.outputWidth)) { continue; }
      ${l(0,0)}
      ${l(1,r[0])}
    }
  }
  let outputIndex = (gid.y * params.outputWidth + gid.x) * ${a}u + gid.z;
  outputData[outputIndex] = ${u};
}
`}function ui(e,t,n,r,i,a){let o=Y(e),s=Y(t),c=r[0]+r[1],l=100*c,u=Z(Q(`acc`,n),t),d=(e,t)=>`
      let sourceBlock = ${t};
      let sourceIndex =
        (${e===i?`u32(inputY) / 2u`:`u32(inputY)`} * params.source${e}Width + ${e===i?`u32(inputX) / 2u`:`u32(inputX)`}) *
        ${r[e]}u + sourceBlock;
      value = input${e}[sourceIndex];`;return`${X(e)}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${o}>;
@group(0) @binding(1) var<storage, read> input1: array<${o}>;
@group(0) @binding(2) var<storage, read> weights: array<${o}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${s}>;
@group(0) @binding(5) var<uniform> params: Params;

var<workgroup> inputPatch: array<${o}, ${l}>;

@compute @workgroup_size(${K}, ${K}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let localLinear =
    localId.y * ${K}u + localId.x;
  for (
    var loadIndex = localLinear;
    loadIndex < ${l}u;
    loadIndex += 64u
  ) {
    let patchPixel = loadIndex / ${c}u;
    let inputBlock = loadIndex % ${c}u;
    let patchX = patchPixel % ${Fr}u;
    let patchY = patchPixel / ${Fr}u;
    let inputX =
      i32(workgroupId.x * ${K}u + patchX) - 1;
    let inputY =
      i32(workgroupId.y * ${K}u + patchY) - 1;
    var value = ${o}(0.0);
    if (
      inputX >= 0 && inputX < i32(params.outputWidth) &&
      inputY >= 0 && inputY < i32(params.outputHeight)
    ) {
      if (inputBlock < ${r[0]}u) {
        ${d(0,`inputBlock`)}
      } else {
        ${d(1,`inputBlock - ${r[0]}u`)}
      }
    }
    inputPatch[loadIndex] = value;
  }
  workgroupBarrier();

  let outputX =
    workgroupId.x * ${K}u + localId.x;
  let outputY =
    workgroupId.y * ${K}u + localId.y;
  let outputBlock = workgroupId.z;
  if (
    outputX >= params.outputWidth || outputY >= params.outputHeight ||
    outputBlock >= ${a}u
  ) {
    return;
  }

  var acc = bias[outputBlock];
  for (var ky = 0u; ky < 3u; ky++) {
    for (var kx = 0u; kx < 3u; kx++) {
      let patchBase =
        ((localId.y + ky) * ${Fr}u + localId.x + kx) *
        ${c}u;
      for (var inputBlock = 0u; inputBlock < ${c}u; inputBlock++) {
        ${Jr(`inputPatch[patchBase + inputBlock]`,`((((outputBlock * 3u + ky) * 3u + kx) * ${c}u + inputBlock) * 4u)`,e)}
      }
    }
  }
  let outputIndex =
    (outputY * params.outputWidth + outputX) * ${a}u + outputBlock;
  outputData[outputIndex] = ${u};
}
`}function di(e,t){let n=Y(e),r=Array.from({length:t},(e,t)=>`@group(0) @binding(${t}) var<storage, read> input${t}: array<vec4<f32>>;`).join(`
`),i=Array.from({length:t},(e,t)=>{let n=t*3;return`if (channel < ${n+3}u) { return input${t}[pixel][channel - ${n}u]; }`}).join(`
  `),a=t,o=t+1;return`${X(e)}
struct Params {
  width: u32,
  height: u32,
  outputBlocks: u32,
  inputChannels: u32,
}
${r}
@group(0) @binding(${a}) var<storage, read_write> outputData: array<${n}>;
@group(0) @binding(${o}) var<uniform> params: Params;

fn readChannel(pixel: u32, channel: u32) -> f32 {
  ${i}
  return 0.0;
}

@compute @workgroup_size(${G}, ${G}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.width || gid.y >= params.height || gid.z >= params.outputBlocks) {
    return;
  }
  let pixel = gid.y * params.width + gid.x;
  let firstChannel = gid.z * 4u;
  let value = vec4<f32>(
    readChannel(pixel, firstChannel),
    readChannel(pixel, firstChannel + 1u),
    readChannel(pixel, firstChannel + 2u),
    readChannel(pixel, firstChannel + 3u)
  );
  outputData[pixel * params.outputBlocks + gid.z] = ${Z(`value`,e)};
}
`}function fi(e){return e.op===`concat`?e.inputs:e.op===`fusedUpsampleConcatConv2d`?e.inputs.map(e=>e.value):[e.input]}function pi(e,t=`auto`){let n=e.features.has(`shader-f16`);if(t===`fp16`&&!n)throw Error(`OIDN FP16 was requested but the GPUDevice does not have shader-f16 enabled`);return t===`auto`?n?`fp16`:`fp32`:t}var mi=class{_device;precision;kernelSetting;gemm;maxSpatialInputBlocks;subgroupsAvailable;_model;_gemmByOutputBlocks=new Map;_packedConvs=new Map;_pipelineCache;_pipelinePromises;_executionCache=new Map;_retiredExecutions=new Set;_clock=0;_shapeCacheSize;_profileNextExecution=!1;_lastExecutionProfile;_profileOperations=0;_resources=new jr;_disposed=!1;constructor(e,t,n={}){this._device=e;let r=Nr(e);this._pipelineCache=r.ready,this._pipelinePromises=r.pending,this.precision=pi(e,n.precision??`auto`),this.kernelSetting=n.kernel??`auto`;let i=n.gemm?.workgroupSize??[8,8];if(this.gemm=Object.freeze({tilePolicy:n.gemm?.tilePolicy??(n.gemm?.workgroupSize?`fixed`:`output-aligned`),decoderLoad:n.gemm?.decoderLoad??`per-load`,poolLayout:n.gemm?.poolLayout??`channels`,sharedLayout:n.gemm?.sharedLayout??(this.precision===`fp16`?`padded-input`:`padded`),accumulationOrder:n.gemm?.accumulationOrder??`k-major`,finalLayer:n.gemm?.finalLayer??`shared-auto`,loadMode:n.gemm?.loadMode??`native`,addressMode:n.gemm?.addressMode??`incremental`,weightLayout:n.gemm?.weightLayout??`k-major`,rowsPerThread:n.gemm?.rowsPerThread??8,workgroupSize:Object.freeze([i[0],i[1]])}),![`fixed`,`output-aligned`].includes(this.gemm.tilePolicy))throw Error(`Unsupported GEMM tile policy: ${this.gemm.tilePolicy}`);if(![`per-load`,`source-first`].includes(this.gemm.decoderLoad))throw Error(`Unsupported GEMM decoder load: ${this.gemm.decoderLoad}`);if(![`spatial`,`channels`].includes(this.gemm.poolLayout))throw Error(`Unsupported GEMM pool layout: ${this.gemm.poolLayout}`);if(![`linear`,`padded`,`padded-input`,`padded-weights`].includes(this.gemm.sharedLayout))throw Error(`Unsupported GEMM shared layout: ${this.gemm.sharedLayout}`);if(![`k-major`,`row-major`].includes(this.gemm.accumulationOrder))throw Error(`Unsupported GEMM accumulation order: ${this.gemm.accumulationOrder}`);if(![`direct`,`shared-input`,`shared-input-weights`,`shared-auto`].includes(this.gemm.finalLayer))throw Error(`Unsupported GEMM final layer: ${this.gemm.finalLayer}`);if(![`native`,`packed-weights`,`packed-all`].includes(this.gemm.loadMode))throw Error(`Unsupported GEMM load mode: ${this.gemm.loadMode}`);if(![`analytic`,`incremental`,`base-offset`].includes(this.gemm.addressMode))throw Error(`Unsupported GEMM address mode: ${this.gemm.addressMode}`);if(![`output-major`,`k-major`].includes(this.gemm.weightLayout))throw Error(`Unsupported GEMM weight layout: ${this.gemm.weightLayout}`);let a=q(this.gemm),o=(Ir(this.gemm).input+Ir(this.gemm).weights)*4*(this.precision===`fp16`?2:4);if(![2,4,8].includes(a.rowsPerThread)||![4,8,16].includes(a.workgroupX)||![4,8].includes(a.workgroupY)||i.length!==2||a.workgroupX>e.limits.maxComputeWorkgroupSizeX||a.workgroupY>e.limits.maxComputeWorkgroupSizeY||a.workgroupX*a.workgroupY>e.limits.maxComputeInvocationsPerWorkgroup||o>e.limits.maxComputeWorkgroupStorageSize)throw Error(`Unsupported GEMM tile configuration for this GPUDevice`);if(this.subgroupsAvailable=e.features.has(`subgroups`),this.maxSpatialInputBlocks=this.precision===`fp16`&&e.limits.maxComputeInvocationsPerWorkgroup>=64&&e.limits.maxComputeWorkgroupSizeX>=K&&e.limits.maxComputeWorkgroupSizeY>=K?Math.floor(e.limits.maxComputeWorkgroupStorageSize/800):0,this._shapeCacheSize=Math.max(1,n.shapeCacheSize??2),t.inputChannels%3!=0||t.inputChannels<3||t.inputChannels>9)throw Error(`Native OIDN expects 3, 6, or 9 input channels, got ${t.inputChannels}`);this._model={spec:t.spec,inputChannels:t.inputChannels,outputChannels:t.outputChannels,channelsByValue:new Map(t.channelsByValue),convChannels:new Map(t.convChannels)};for(let e of Dr(this._model,{fuseConvPool:!1}).nodes)if(e.op!==`conv2d`&&e.op!==`maxPool2d`&&e.op!==`fusedConvReluMaxPool2d`&&e.op!==`fusedUpsampleConcatConv2d`)throw Error(`Native OIDN descriptor ${t.spec.id} leaves unsupported ${e.op} node ${e.id} after graph optimization`);try{for(let[n,r]of t.convTensors){let i=this._selectConvKernel(J(r.inputChannels),n===t.spec.output)===`implicit-gemm`?this.gemm.weightLayout:`output-major`,a=qr(e,n,r,this.precision,i);this._resources.track(`gpu-buffer`,a.weights),this._resources.track(`gpu-buffer`,a.bias),this._packedConvs.set(n,a)}}catch(e){for(let e of this._packedConvs.values())this._releaseBuffer(e.weights),this._releaseBuffer(e.bias);throw this._packedConvs.clear(),e}}_pipeline(e,t){let n=this._pipelineCache.get(e);return n||(n=this._device.createComputePipeline({label:`oidn/${e}`,layout:`auto`,compute:{module:this._device.createShaderModule({label:`oidn/${e}`,code:t}),entryPoint:`main`}}),this._pipelineCache.set(e,n)),n}_pipelineAsync(e,t){let n=this._pipelineCache.get(e);if(n)return Promise.resolve(n);let r=this._pipelinePromises.get(e);if(r)return r;let i=this._device.createComputePipelineAsync({label:`oidn/${e}`,layout:`auto`,compute:{module:this._device.createShaderModule({label:`oidn/${e}`,code:t}),entryPoint:`main`}}).then(t=>(this._pipelineCache.set(e,t),this._pipelinePromises.delete(e),t),t=>{throw this._pipelinePromises.delete(e),t});return this._pipelinePromises.set(e,i),i}_nodePipelineSpec(e,t){if(e.op===`conv2d`){let n=t?`fp32`:this.precision,r=J(this._model.convChannels.get(e.id).inputChannels),i=J(this._model.convChannels.get(e.id).outputChannels),a=this._gemmForOutput(i),o=this._selectConvKernel(r,t),s=a.finalLayer===`shared-input-weights`||a.finalLayer===`shared-auto`&&yr(this.precision,r,!0)<=this._device.limits.maxComputeWorkgroupStorageSize;return t&&this._model.convChannels.get(e.id).outputChannels===3&&(this.kernelSetting===`auto`||this.kernelSetting===`implicit-gemm`)&&a.finalLayer!==`direct`&&this._device.limits.maxComputeWorkgroupSizeX>=8&&this._device.limits.maxComputeWorkgroupSizeY>=8&&this._device.limits.maxComputeInvocationsPerWorkgroup>=64&&yr(this.precision,r,s)<=this._device.limits.maxComputeWorkgroupStorageSize?{key:`conv-final-rgb/${this.precision}/${e.activation}/in${r}/weights-${s?`shared`:`storage`}`,kernel:`direct`,code:Cr(this.precision,e.activation,r,s)}:{key:`conv-${o}/${this.precision}/${n}/${e.activation}/in${r}/out${i}`+(o===`implicit-gemm`?`/address-${a.addressMode}/weights-${a.weightLayout}-v1/tile-${a.workgroupSize.join(`x`)}-r${a.rowsPerThread}/loads-${a.loadMode}/shared-${a.sharedLayout}/acc-${a.accumulationOrder}`:``),kernel:o,code:o===`implicit-gemm`?ai(this.precision,n,e.activation,r,i,a):o===`spatial`?ti(this.precision,n,e.activation,r,i):o===`subgroup`?ei(this.precision,n,e.activation,r,i):$r(this.precision,n,e.activation,r,i)}}if(e.op===`maxPool2d`){let t=J(this._model.channelsByValue.get(e.id)),n=this._coalescedPool();return{key:`max-pool/${this.precision}/out${t}/${n?`channels`:`spatial`}`,kernel:`direct`,code:si(this.precision,t,n)}}if(e.op===`fusedConvReluMaxPool2d`){let t=J(this._model.convChannels.get(e.conv.id).inputChannels),n=J(this._model.convChannels.get(e.conv.id).outputChannels);return{key:`conv-pool/${this.precision}/${e.conv.activation}/in${t}/out${n}`,kernel:`direct`,code:oi(this.precision,e.conv.activation,t,n)}}if(e.op===`fusedUpsampleConcatConv2d`){if(e.inputs.length!==2)throw Error(`Native fused decoder ${e.id} requires two inputs`);let n=e.inputs.map(e=>J(this._model.channelsByValue.get(e.value))),r=e.inputs.findIndex(e=>e.upsample);if(r!==0&&r!==1)throw Error(`Native fused decoder ${e.id} has no upsample input`);let i=n[0]+n[1],a=t?`fp32`:this.precision,o=this._selectConvKernel(i,t),s=o===`subgroup`?`direct`:o,c=J(this._model.convChannels.get(e.conv.id).outputChannels),l=this._gemmForOutput(c);return{key:`decoder-${s}/${this.precision}/${a}/${e.conv.activation}/${n.join(`+`)}/out${c}/up${r}`+(s===`implicit-gemm`?`/address-${l.addressMode}/weights-${l.weightLayout}-v1/tile-${l.workgroupSize.join(`x`)}-r${l.rowsPerThread}/loads-${l.loadMode}/shared-${l.sharedLayout}/acc-${l.accumulationOrder}/decoder-${l.decoderLoad}`:``),kernel:s,code:s===`implicit-gemm`?ci(this.precision,a,e.conv.activation,n,r,c,l):s===`spatial`?ui(this.precision,a,e.conv.activation,n,r,c):li(this.precision,a,e.conv.activation,n,r,c)}}throw Error(`Native OIDN does not implement unfused ${e.op} node ${e.id}`)}_gemmForOutput(e){if(this.gemm.tilePolicy!==`output-aligned`||this.gemm.workgroupSize[0]!==8||e<=0||e%16!=0)return this.gemm;let t=this._gemmByOutputBlocks.get(e);if(t)return t;let n=Object.freeze({...this.gemm,workgroupSize:Object.freeze([16,this.gemm.workgroupSize[1]])}),r=q(n),i=Ir(n),a=this._device.limits,o=r.workgroupX<=a.maxComputeWorkgroupSizeX&&r.workgroupY<=a.maxComputeWorkgroupSizeY&&r.workgroupX*r.workgroupY<=a.maxComputeInvocationsPerWorkgroup&&(i.input+i.weights)*4*(this.precision===`fp16`?2:4)<=a.maxComputeWorkgroupStorageSize?n:this.gemm;return this._gemmByOutputBlocks.set(e,o),o}_coalescedPool(){return this.gemm.poolLayout===`channels`&&(this.kernelSetting===`auto`||this.kernelSetting===`implicit-gemm`)}_selectConvKernel(e,t){let n=this.precision===`fp16`&&e<=this.maxSpatialInputBlocks;return this.kernelSetting===`direct`?`direct`:this.kernelSetting===`spatial`?n?`spatial`:`direct`:this.kernelSetting===`implicit-gemm`?t?`direct`:`implicit-gemm`:this.kernelSetting===`subgroup`?this.subgroupsAvailable?`subgroup`:`direct`:t?`direct`:`implicit-gemm`}_nodePipeline(e,t){let{key:n,code:r}=this._nodePipelineSpec(e,t);return this._pipeline(n,r)}async prepare(){if(this._disposed)throw Error(`Native OIDN executor is disposed`);let e=Dr(this._model,{fuseConvPool:!1}),t=this._model.inputChannels/3,n=[{key:`pack/${this.precision}/${t}`,code:di(this.precision,t)},...e.nodes.map(t=>this._nodePipelineSpec(t,t.id===e.spec.output))];await Promise.all(n.map(({key:e,code:t})=>this._pipelineAsync(e,t)))}_createExecution(e,t){let n=Ar(this._model,e,t,{fuseConvPool:!1}),r=new Map,i=[],a=new Map;n.nodes.forEach((e,t)=>{for(let n of fi(e))a.set(n,t)}),a.set(n.spec.output,n.nodes.length);let o=[],s=e=>(o.push(e),this._resources.track(`gpu-buffer`,e));try{let o=(n,o,c,l)=>{for(let e of i)e.activeValue&&(a.get(e.activeValue)??-1)<l&&(e.activeValue=void 0);let u=Br(o,c),d=i.filter(e=>!e.activeValue&&e.capacity>=u).sort((e,t)=>e.capacity-t.capacity)[0];d||(d={buffer:s(this._device.createBuffer({label:`oidn/activation/${e}x${t}/${i.length}`,size:zr(u,4),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST})),capacity:u},i.push(d)),d.activeValue=n,r.set(n,d.buffer)};o(n.spec.input,n.inputShape,this.precision===`fp16`?2:4,-1),n.plannedNodes.forEach(({node:e,outputShape:t},r)=>{let i=e.id===n.spec.output;o(e.id,t,i||this.precision===`fp32`?4:2,r)});let c=this._model.inputChannels/3,l=`pack/${this.precision}/${c}`,u=this._pipeline(l,di(this.precision,c)),d=[],f=[],p=[],m=[];n.plannedNodes.forEach(({node:i,outputShape:a},o)=>{let c=i.id===n.spec.output,l=this._nodePipelineSpec(i,c),u=this._pipeline(l.key,l.code);d.push(u),f.push(l.kernel??`direct`);let h=r.get(i.id),g,_,v;if(i.op===`conv2d`){let e=n.valueShapes.get(i.input);v=i.id,_=[e.width,e.height,a.width,a.height,J(e.channels),J(a.channels)];let t=this._packedConvs.get(v);g=[{binding:0,resource:{buffer:r.get(i.input)}},{binding:1,resource:{buffer:t.weights}},{binding:2,resource:{buffer:t.bias}},{binding:3,resource:{buffer:h}}]}else if(i.op===`maxPool2d`){let e=n.valueShapes.get(i.input);_=[e.width,e.height,a.width,a.height,J(a.channels)],g=[{binding:0,resource:{buffer:r.get(i.input)}},{binding:1,resource:{buffer:h}}]}else if(i.op===`fusedConvReluMaxPool2d`){let e=n.valueShapes.get(i.input);v=i.conv.id,_=[e.width,e.height,a.width,a.height,J(e.channels),J(a.channels)];let t=this._packedConvs.get(v);g=[{binding:0,resource:{buffer:r.get(i.input)}},{binding:1,resource:{buffer:t.weights}},{binding:2,resource:{buffer:t.bias}},{binding:3,resource:{buffer:h}}]}else if(i.op===`fusedUpsampleConcatConv2d`){v=i.conv.id;let e=n.valueShapes.get(i.inputs[0].value),t=n.valueShapes.get(i.inputs[1].value);_=[a.width,a.height,J(a.channels),J(this._model.convChannels.get(v).inputChannels),e.width,e.height,t.width,t.height];let o=this._packedConvs.get(v);g=[{binding:0,resource:{buffer:r.get(i.inputs[0].value)}},{binding:1,resource:{buffer:r.get(i.inputs[1].value)}},{binding:2,resource:{buffer:o.weights}},{binding:3,resource:{buffer:o.bias}},{binding:4,resource:{buffer:h}}]}else throw Error(`Unexpected native node ${i.op}`);let y=s(Kr(this._device,`oidn/${i.id}/params/${e}x${t}`,_));m.push(y),g.push({binding:g.length,resource:{buffer:y}}),p.push(this._device.createBindGroup({label:`oidn/${i.id}/bindings`,layout:u.getBindGroupLayout(0),entries:g}))});let h=s(Kr(this._device,`oidn/input/params/${e}x${t}`,[e,t,J(this._model.inputChannels),this._model.inputChannels]));return m.push(h),{plan:n,valueBuffers:r,slots:i,nodeBindings:p,nodePipelines:d,nodeKernels:f,inputPipeline:u,inputUniform:h,ownedBuffers:m,lastUsed:++this._clock}}catch(e){for(let e of o)this._releaseBuffer(e);throw e}}_execution(e,t){if(this._disposed)throw Error(`Native OIDN executor is disposed`);let n=`${e}x${t}`,r=this._executionCache.get(n);if(!r&&(r=this._createExecution(e,t),this._executionCache.set(n,r),this._executionCache.size>this._shapeCacheSize)){let e=[...this._executionCache.entries()].filter(([e])=>e!==n).sort((e,t)=>e[1].lastUsed-t[1].lastUsed)[0];e&&(this._executionCache.delete(e[0]),this._retiredExecutions.add(e[1]),this._device.queue.onSubmittedWorkDone().catch(()=>void 0).then(()=>{this._retiredExecutions.delete(e[1]),this._destroyExecution(e[1])}))}return r.lastUsed=++this._clock,r}prewarm(e){for(let t of e)this._execution(t.width,t.height)}profileNextExecution(){return this._device.features.has(`timestamp-query`)?(this._profileNextExecution=!0,!0):!1}getLastExecutionProfile(){return this._lastExecutionProfile}execute(e,t,n){let r=this._model.inputChannels/3;if(e.length!==r)throw Error(`Native OIDN expected ${r} input buffers, got ${e.length}`);let i=this._execution(t,n),a=[`input-pack`,...i.plan.nodes.map(e=>e.id)],o=this._profileNextExecution&&this._device.features.has(`timestamp-query`);this._profileNextExecution=!1;let s=a.length*2,c=o?this._resources.track(`gpu-query-set`,this._device.createQuerySet({type:`timestamp`,count:s})):void 0,l=s*8,u,d;try{u=o?this._resources.track(`gpu-buffer`,this._device.createBuffer({label:`oidn/profile/resolve/${t}x${n}`,size:l,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC})):void 0,d=o?this._resources.track(`gpu-buffer`,this._device.createBuffer({label:`oidn/profile/readback/${t}x${n}`,size:l,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ})):void 0}catch(e){throw this._releaseBuffer(d),this._releaseBuffer(u),this._releaseQuerySet(c),e}let f=(e,t)=>({label:e,...c?{timestampWrites:{querySet:c,beginningOfPassWriteIndex:t*2,endOfPassWriteIndex:t*2+1}}:{}});try{let a=this._device.createCommandEncoder({label:`oidn/native/${t}x${n}`}),o=e.map((e,t)=>({binding:t,resource:{buffer:e}}));o.push({binding:r,resource:{buffer:i.valueBuffers.get(i.plan.spec.input)}}),o.push({binding:r+1,resource:{buffer:i.inputUniform}});let p=this._device.createBindGroup({label:`oidn/input/bindings`,layout:i.inputPipeline.getBindGroupLayout(0),entries:o});{let e=a.beginComputePass(f(`oidn/input-pack`,0));e.setPipeline(i.inputPipeline),e.setBindGroup(0,p),e.dispatchWorkgroups(Math.ceil(t/G),Math.ceil(n/G),J(this._model.inputChannels)),e.end()}i.plan.plannedNodes.forEach(({node:e,outputShape:t},n)=>{let r=a.beginComputePass(f(`oidn/${i.plan.nodes[n].id}`,n+1));if(r.setPipeline(i.nodePipelines[n]),r.setBindGroup(0,i.nodeBindings[n]),e.op===`maxPool2d`&&this._coalescedPool()){let e=Math.ceil(t.width*J(t.channels)/G),n=this._device.limits.maxComputeWorkgroupsPerDimension;r.dispatchWorkgroups(Math.min(e,n),Math.ceil(t.height/G),Math.ceil(e/n))}else if(i.nodeKernels[n]===`implicit-gemm`){let e=q(this._gemmForOutput(J(t.channels)));r.dispatchWorkgroups(Math.ceil(t.width*t.height/e.tileM),Math.ceil(J(t.channels)/e.tileNBlocks),1)}else r.dispatchWorkgroups(Math.ceil(t.width/G),Math.ceil(t.height/G),J(t.channels));r.end()}),c&&(a.resolveQuerySet(c,0,s,u,0),a.copyBufferToBuffer(u,0,d,0,l)),this._device.queue.submit([a.finish()])}catch(e){throw this._releaseBuffer(d),this._releaseBuffer(u),this._releaseQuerySet(c),e}return c&&(this._profileOperations++,this._lastExecutionProfile=(async()=>{try{await d.mapAsync(GPUMapMode.READ);let e=new BigUint64Array(d.getMappedRange()),t=a.map((t,n)=>({id:t,durationMs:Number(e[n*2+1]-e[n*2])/1e6}));return{totalMs:t.reduce((e,t)=>e+t.durationMs,0),layers:t}}finally{d.mapState===`mapped`&&d.unmap(),this._releaseQuerySet(c),this._releaseBuffer(u),this._releaseBuffer(d),this._profileOperations--}})()),i.valueBuffers.get(i.plan.spec.output)}async executeCPU(e,t,n){let r=t*n*this._model.inputChannels;if(e.length!==r)throw Error(`Native OIDN CPU input has ${e.length} values, expected ${r}`);let i=this._execution(t,n),a=this._model.inputChannels/3,o=t*n;i.cpuInputBuffers||(i.cpuInputBuffers=Array.from({length:a},(e,r)=>{let a=this._device.createBuffer({label:`oidn/cpu-input/${t}x${n}/${r}`,size:o*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return this._resources.track(`gpu-buffer`,a),i.ownedBuffers.push(a),a}),i.cpuReadbackBuffer=this._device.createBuffer({label:`oidn/cpu-readback/${t}x${n}`,size:o*16,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),this._resources.track(`gpu-buffer`,i.cpuReadbackBuffer),i.ownedBuffers.push(i.cpuReadbackBuffer));for(let t=0;t<a;t++){let n=new Float32Array(o*4);for(let r=0;r<o;r++){let i=r*this._model.inputChannels+t*3,a=r*4;n[a]=e[i],n[a+1]=e[i+1],n[a+2]=e[i+2]}this._device.queue.writeBuffer(i.cpuInputBuffers[t],0,n)}let s=this.execute(i.cpuInputBuffers,t,n),c=this._device.createCommandEncoder({label:`oidn/cpu-readback/${t}x${n}`});c.copyBufferToBuffer(s,0,i.cpuReadbackBuffer,0,o*16),this._device.queue.submit([c.finish()]),await i.cpuReadbackBuffer.mapAsync(GPUMapMode.READ);let l=new Float32Array(i.cpuReadbackBuffer.getMappedRange()),u=new Float32Array(o*3);for(let e=0;e<o;e++)u[e*3]=l[e*4],u[e*3+1]=l[e*4+1],u[e*3+2]=l[e*4+2];return i.cpuReadbackBuffer.unmap(),u}_releaseBuffer(e){this._resources.release(`gpu-buffer`,e,()=>e.destroy())}_releaseQuerySet(e){this._resources.release(`gpu-query-set`,e,()=>e.destroy())}_destroyExecution(e){e.slots.forEach(e=>this._releaseBuffer(e.buffer)),e.ownedBuffers.forEach(e=>this._releaseBuffer(e))}getResourceInfo(){return this._resources.snapshot(this._retiredExecutions.size+this._profileOperations)}dispose(){if(!this._disposed){this._disposed=!0;for(let e of this._packedConvs.values())this._releaseBuffer(e.weights),this._releaseBuffer(e.bias);this._packedConvs.clear();for(let e of this._executionCache.values())this._destroyExecution(e);this._executionCache.clear();for(let e of this._retiredExecutions)this._destroyExecution(e);this._retiredExecutions.clear()}}},hi=new WeakMap;function gi(e,t){let n=hi.get(e);n||(n=new Map,hi.set(e,n));let r=n.get(t);if(!r){let i=e.createShaderModule({label:`oidn/webnn/input-pack/${t}`,code:Si(t)}),a=e.createShaderModule({label:`oidn/webnn/output-unpack`,code:Ci()});r={input:e.createComputePipeline({label:`oidn/webnn/input-pack/${t}`,layout:`auto`,compute:{module:i,entryPoint:`main`}}),output:e.createComputePipeline({label:`oidn/webnn/output-unpack`,layout:`auto`,compute:{module:a,entryPoint:`main`}})},n.set(t,r)}return r}var $=8;function _i(e,t){return Math.ceil(e/t)*t}function vi(e,t,n,r){let i=e.createBuffer({label:t,size:_i(n.byteLength,4),usage:r,mappedAtCreation:!0});return new Uint8Array(i.getMappedRange()).set(new Uint8Array(n.buffer,n.byteOffset,n.byteLength)),i.unmap(),i}function yi(e,t,n){let r=new Uint32Array(_i(n.length,4));return r.set(n),vi(e,t,r,GPUBufferUsage.UNIFORM)}function bi(e,t,n,r){return!!e?.[t]?.[n]?.dataTypes?.includes?.(r)}function xi(e,t){if(t===`fp16`&&e.desc.dataType===`Float16`||t===`fp32`&&e.desc.dataType===`Float32`)return new Uint8Array(e.data.buffer,e.data.byteOffset,e.data.byteLength);let n=e.desc.dataType===`Float32`?new Float32Array(e.data.buffer,e.data.byteOffset,e.data.byteLength/4):new W(e.data.buffer,e.data.byteOffset,e.data.byteLength/2),r=t===`fp16`?new W(n):new Float32Array(n);return new Uint8Array(r.buffer,r.byteOffset,r.byteLength)}function Si(e){let t=Array.from({length:e},(e,t)=>`@group(0) @binding(${t}) var<storage, read> input${t}: array<vec4<f32>>;`).join(`
`),n=Array.from({length:e},(e,t)=>{let n=t*3;return`if (channel < ${n+3}u) {
      return input${t}[pixel][channel - ${n}u];
    }`}).join(`
  `);return`enable f16;
struct Params { width: u32, height: u32, channels: u32, padding: u32 }
${t}
@group(0) @binding(${e}) var<storage, read_write> outputData: array<f16>;
@group(0) @binding(${e+1}) var<uniform> params: Params;

fn readChannel(pixel: u32, channel: u32) -> f32 {
  ${n}
  return 0.0;
}

@compute @workgroup_size(${$}, ${$}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.width || gid.y >= params.height || gid.z >= params.channels) {
    return;
  }
  let pixel = gid.y * params.width + gid.x;
  let outputIndex = (gid.z * params.height + gid.y) * params.width + gid.x;
  outputData[outputIndex] = f16(readChannel(pixel, gid.z));
}
`}function Ci(){return`enable f16;
struct Params { width: u32, height: u32, padding0: u32, padding1: u32 }
@group(0) @binding(0) var<storage, read> inputData: array<f16>;
@group(0) @binding(1) var<storage, read_write> outputData: array<vec4<f32>>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(${$}, ${$}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.width || gid.y >= params.height) { return; }
  let pixel = gid.y * params.width + gid.x;
  let plane = params.width * params.height;
  outputData[pixel] = vec4<f32>(
    f32(inputData[pixel]),
    f32(inputData[plane + pixel]),
    f32(inputData[plane * 2u + pixel]),
    0.0
  );
}
`}function wi(e,t){if(t===`fp32`)throw Error(`OIDN WebNN GPU interop currently requires FP16 exportable tensors`);if(!e.features.has(`shader-f16`))throw Error(`OIDN WebNN requires shader-f16 on the shared GPUDevice`);return`fp16`}function Ti(e,t,n){return n===`relu`?e.relu(t):t}var Ei=class{_device;_model;precision;support;_context;_builderConstructor;_shapeCache=new Map;_shapePromises=new Map;_retiredExecutions=new Set;_pendingCreationCount=0;_shapeCacheSize;_clock=0;_inputPipeline;_outputPipeline;_resources=new jr;_disposed=!1;constructor(e,t,n={}){this._device=e,this._model=t,this.precision=wi(e,n.precision??`auto`),this._shapeCacheSize=Math.max(1,n.shapeCacheSize??2),this.support={available:!1,fp16Conv:!1,gpuInterop:!1};let r=gi(e,t.inputChannels/3);this._inputPipeline=r.input,this._outputPipeline=r.output}async prepare(){if(this._disposed)throw Error(`OIDN WebNN executor is disposed`);let e=globalThis.navigator?.ml,t=globalThis.MLGraphBuilder;if(!e?.createContext||typeof t!=`function`)throw this.support.reason=`WebNN is not exposed by this browser`,Error(this.support.reason);this._builderConstructor=t;try{try{this._context=await e.createContext({deviceType:`gpu`,powerPreference:`high-performance`})}catch{this._context=await e.createContext({deviceType:`gpu`})}if(this._resources.track(`ml-context`,this._context),this._disposed)throw Error(`OIDN WebNN executor is disposed`);if(typeof this._context.createExportableTensor!=`function`||typeof this._context.exportToGPU!=`function`)throw this.support.reason=`WebNN WebGPU tensor interop is unavailable`,Error(this.support.reason);let t=this._context.opSupportLimits?.()??{};if(this.support.fp16Conv=bi(t,`conv2d`,`input`,`float16`)&&bi(t,`conv2d`,`filter`,`float16`)&&bi(t,`conv2d`,`output`,`float16`),!this.support.fp16Conv)throw this.support.reason=`WebNN does not support FP16 conv2d`,Error(this.support.reason);let n,r;try{n=this._resources.track(`ml-tensor`,await this._context.createExportableTensor({dataType:`float16`,shape:[4]},this._device)),r=this._resources.track(`gpu-buffer`,await this._context.exportToGPU(n)),this.support.gpuInterop=!0}catch(e){throw this.support.reason=`WebNN FP16 WebGPU interop failed: ${String(e)}`,Error(this.support.reason)}finally{this._releaseBuffer(r),this._releaseTensor(n)}this.support.available=!0}catch(e){throw this._releaseContext(),e}}_constant(e,t){return e.constant({dataType:`float16`,shape:[...t.desc.dims]},xi(t,this.precision))}async _createExecution(e,t){if(this._disposed)throw Error(`OIDN WebNN executor is disposed`);let n=new this._builderConstructor(this._context),r=new Map,i=new Map;r.set(this._model.spec.input,n.input(`input`,{dataType:`float16`,shape:[1,this._model.inputChannels,t,e]})),i.set(this._model.spec.input,[this._model.inputChannels,t,e]);for(let e of this._model.spec.nodes){let t,a;if(e.op===`conv2d`){let o=i.get(e.input),s=this._model.convTensors.get(e.id);t=Ti(n,n.conv2d(r.get(e.input),this._constant(n,s.weight),{bias:this._constant(n,s.bias),padding:[1,1,1,1],inputLayout:`nchw`,filterLayout:`oihw`}),e.activation),a=[s.outputChannels,o[1],o[2]]}else if(e.op===`maxPool2d`){let o=i.get(e.input);t=n.maxPool2d(r.get(e.input),{windowDimensions:[2,2],strides:[2,2],padding:[0,o[1]%2,0,o[2]%2],layout:`nchw`}),a=[o[0],Math.ceil(o[1]/2),Math.ceil(o[2]/2)]}else if(e.op===`upsample2d`){let o=i.get(e.input);t=n.resample2d(r.get(e.input),{mode:`nearest-neighbor`,axes:[2,3],scales:[2,2]}),a=[o[0],o[1]*2,o[2]*2]}else{let o=e.inputs.map(e=>i.get(e));if(o.some(e=>e[1]!==o[0][1]||e[2]!==o[0][2]))throw Error(`WebNN concat ${e.id} has mismatched spatial shapes`);t=n.concat(e.inputs.map(e=>r.get(e)),1),a=[o.reduce((e,t)=>e+t[0],0),o[0][1],o[0][2]]}r.set(e.id,t),i.set(e.id,a)}let a,o,s,c,l,u;try{return a=this._resources.track(`ml-graph`,await n.build({output:r.get(this._model.spec.output)})),o=this._resources.track(`ml-tensor`,await this._context.createExportableTensor({dataType:`float16`,shape:[1,this._model.inputChannels,t,e],writable:!0},this._device)),s=this._resources.track(`ml-tensor`,await this._context.createExportableTensor({dataType:`float16`,shape:[1,this._model.outputChannels,t,e],readable:!0},this._device)),c=this._resources.track(`gpu-buffer`,this._device.createBuffer({label:`oidn/webnn/output/${e}x${t}`,size:e*t*4*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST})),l=this._resources.track(`gpu-buffer`,yi(this._device,`oidn/webnn/input/${e}x${t}`,[e,t,this._model.inputChannels])),u=this._resources.track(`gpu-buffer`,yi(this._device,`oidn/webnn/output/${e}x${t}`,[e,t])),{graph:a,inputTensor:o,outputTensor:s,outputBuffer:c,inputUniform:l,outputUniform:u,width:e,height:t,lastUsed:++this._clock}}catch(e){throw this._releaseBuffer(u),this._releaseBuffer(l),this._releaseBuffer(c),this._releaseTensor(s),this._releaseTensor(o),this._releaseGraph(a),e}}async _execution(e,t){let n=`${e}x${t}`,r=this._shapeCache.get(n);if(!r){let i=this._shapePromises.get(n);i||(i=(async()=>{this._pendingCreationCount++;try{return await this._createExecution(e,t)}finally{this._pendingCreationCount--}})(),this._shapePromises.set(n,i));try{if(r=await i,this._disposed)throw this._destroyExecution(r),Error(`OIDN WebNN executor is disposed`);this._shapeCache.set(n,r)}finally{this._shapePromises.get(n)===i&&this._shapePromises.delete(n)}if(this._shapeCache.size>this._shapeCacheSize){let e=[...this._shapeCache.entries()].filter(([e])=>e!==n).sort((e,t)=>e[1].lastUsed-t[1].lastUsed)[0];e&&(this._shapeCache.delete(e[0]),this._retireExecution(e[1]))}}return r.lastUsed=++this._clock,r}async prewarm(e){for(let t of e)await this._execution(t.width,t.height)}async execute(e,t,n){let r=this._model.inputChannels/3;if(e.length!==r)throw Error(`OIDN WebNN expected ${r} input buffers, got ${e.length}`);let i=await this._execution(t,n),a=this._resources.track(`gpu-buffer`,await this._context.exportToGPU(i.inputTensor));try{let o=e.map((e,t)=>({binding:t,resource:{buffer:e}}));o.push({binding:r,resource:{buffer:a}}),o.push({binding:r+1,resource:{buffer:i.inputUniform}});let s=this._device.createBindGroup({label:`oidn/webnn/input-bindings`,layout:this._inputPipeline.getBindGroupLayout(0),entries:o}),c=this._device.createCommandEncoder({label:`oidn/webnn/input-pack`}),l=c.beginComputePass();l.setPipeline(this._inputPipeline),l.setBindGroup(0,s),l.dispatchWorkgroups(Math.ceil(t/$),Math.ceil(n/$),this._model.inputChannels),l.end(),this._device.queue.submit([c.finish()])}finally{this._releaseBuffer(a)}this._context.dispatch(i.graph,{input:i.inputTensor},{output:i.outputTensor});let o=this._resources.track(`gpu-buffer`,await this._context.exportToGPU(i.outputTensor));try{let e=this._device.createBindGroup({label:`oidn/webnn/output-bindings`,layout:this._outputPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}},{binding:1,resource:{buffer:i.outputBuffer}},{binding:2,resource:{buffer:i.outputUniform}}]}),r=this._device.createCommandEncoder({label:`oidn/webnn/output-unpack`}),a=r.beginComputePass();a.setPipeline(this._outputPipeline),a.setBindGroup(0,e),a.dispatchWorkgroups(Math.ceil(t/$),Math.ceil(n/$)),a.end(),this._device.queue.submit([r.finish()])}finally{this._releaseBuffer(o)}return i.outputBuffer}async executeCPU(e,t,n){let r=await this._execution(t,n),i=t*n,a=new W(i*this._model.inputChannels);for(let t=0;t<i;t++)for(let n=0;n<this._model.inputChannels;n++)a[n*i+t]=e[t*this._model.inputChannels+n];this._context.writeTensor(r.inputTensor,a),this._context.dispatch(r.graph,{input:r.inputTensor},{output:r.outputTensor});let o=new W(await this._context.readTensor(r.outputTensor)),s=new Float32Array(i*this._model.outputChannels);for(let e=0;e<i;e++)for(let t=0;t<this._model.outputChannels;t++)s[e*this._model.outputChannels+t]=o[t*i+e];return s}_destroyExecution(e){this._releaseGraph(e.graph),this._releaseTensor(e.inputTensor),this._releaseTensor(e.outputTensor),this._releaseBuffer(e.outputBuffer),this._releaseBuffer(e.inputUniform),this._releaseBuffer(e.outputUniform)}_retireExecution(e){this._retiredExecutions.add(e),this._device.queue.onSubmittedWorkDone().catch(()=>void 0).then(()=>{this._retiredExecutions.delete(e),this._destroyExecution(e)})}_releaseBuffer(e){this._resources.release(`gpu-buffer`,e,()=>e.destroy())}_releaseTensor(e){this._resources.release(`ml-tensor`,e,()=>e.destroy())}_releaseGraph(e){this._resources.release(`ml-graph`,e,()=>e.destroy?.())}_releaseContext(){this._resources.release(`ml-context`,this._context,()=>this._context.destroy?.())}getResourceInfo(){return this._resources.snapshot(this._pendingCreationCount+this._retiredExecutions.size)}dispose(){if(!this._disposed){this._disposed=!0;for(let e of this._shapeCache.values())this._destroyExecution(e);this._shapeCache.clear();for(let e of this._retiredExecutions)this._destroyExecution(e);this._retiredExecutions.clear(),this._shapePromises.clear(),this._releaseContext()}}},Di=100;function Oi(e,t){return Math.ceil(e/t)*t}function ki(e){return e.data instanceof GPUBuffer||e.data instanceof GPUTexture}var Ai=class{_device;_aux;_hdr;_hdrTransfer;_dataProcessGPU;_nativeExecutor;_webNNExecutor;_modelSpec;_inputChannels;_engine;_dynamicTileController;_lastExecution;_activeExecutionFailures=new Set;_deviceLostObserved=!1;_deviceLostSettled=!1;_deviceLostReason;constructor(e,t,n={}){this._aux=n.aux||!1,this._hdr=n.hdr||!1,this._hdrTransfer=n.hdrTransfer??`pu`,this._engine=n.engine??`auto`;let r=Ue(e,n.modelSpec??Ve(e));this._modelSpec=r.spec,this._inputChannels=r.inputChannels;let i=this._aux?9:3;if(r.inputChannels!==i)throw Error(`OIDN model expects ${r.inputChannels} input channels, but aux=${this._aux} provides ${i}`);this._dynamicTileController=new Ie(n.maxTileSize??512,n.dynamicTile),this._device=t,this._observeDeviceLoss(),this._engine===`webnn`?this._webNNExecutor=new Ei(this._device,r,{precision:n.precision}):this._nativeExecutor=new mi(this._device,r,{precision:n.precision,kernel:n.kernel,gemm:n.gemm})}getDevice(){return this._device}async prepare(){if(this._webNNExecutor){await this._webNNExecutor.prepare();let e=Oi(this._modelSpec.receptiveField/2,16),t=[this._dynamicTileController.tileSize,this._dynamicTileController.minTileSize];await this._webNNExecutor.prewarm([...new Set(t)].map(t=>({width:t+2*e,height:t+2*e})))}else await this._nativeExecutor.prepare()}async prepareForImage(e,t,n={}){let r=Oi(this._modelSpec.receptiveField/2,16),i=n.tileOverlap===void 0?r:Oi(Math.max(0,n.tileOverlap),16),a=Ne(e,t,n.wholeImage?Oi(Math.max(e,t),16):this._dynamicTileController.tileSize,i),o=[...new Map(a.tiles.map(({input:e})=>[`${e.width}x${e.height}`,{width:e.width,height:e.height}])).values()];await this._webNNExecutor?.prewarm(o),this._nativeExecutor?.prewarm(o)}getRuntimeInfo(){return{configuredEngine:this._engine,gpuEngine:this._webNNExecutor?`webnn`:`wgsl`,precision:(this._webNNExecutor??this._nativeExecutor).precision,kernel:this._nativeExecutor?{configured:this._nativeExecutor.kernelSetting,gemm:this._nativeExecutor.gemm,maxSpatialInputBlocks:this._nativeExecutor.maxSpatialInputBlocks,subgroupsAvailable:this._nativeExecutor.subgroupsAvailable}:void 0,webnn:this._webNNExecutor?.support,resources:(this._webNNExecutor??this._nativeExecutor).getResourceInfo(),model:this._modelSpec.id,modelFamily:this._modelSpec.family,inputChannels:this._inputChannels,hdrTransfer:this._hdrTransfer,dynamicTile:{enabled:this._dynamicTileController.enabled,currentTileSize:this._dynamicTileController.tileSize,minTileSize:this._dynamicTileController.minTileSize,maxTileSize:this._dynamicTileController.maxTileSize,targetTileTimeMs:this._dynamicTileController.targetTileTimeMs},lastExecution:this._lastExecution,activeExecutionCount:this._activeExecutionFailures.size}}_observeDeviceLoss(){if(this._activeExecutionFailures??=new Set,this._deviceLostObserved)return;this._deviceLostObserved=!0;let e=this._device.lost;if(!e)return;let t=e=>{if(this._deviceLostSettled)return;this._deviceLostSettled=!0,this._deviceLostReason=e;let t=[...this._activeExecutionFailures];this._activeExecutionFailures.clear();for(let n of t)n(e)};e.then(e=>t(Error(`WebGPU device lost: ${e.message}`)),t)}_registerExecutionFailure(e){return this._observeDeviceLoss(),this._activeExecutionFailures.add(e),this._deviceLostSettled&&(this._activeExecutionFailures.delete(e),queueMicrotask(()=>e(this._deviceLostReason))),()=>this._activeExecutionFailures.delete(e)}profileNextExecution(){return this._nativeExecutor?.profileNextExecution()??!1}getLastExecutionProfile(){return this._nativeExecutor?.getLastExecutionProfile()}_processImageData(e,t,n,r){let i=e.data,a=i.length/4,o=this._aux?9:3,s=new Float32Array(a*o);if(t&&!n||n&&!t)throw Error(`Normal map and albedo map are both required`);if(t&&n&&(t.width!==n.width||t.height!==n.height||e.width!==t.width||e.height!==t.height))throw Error(`Image size mismatch`);let c=t?.data,l=n?.data;for(let e=0;e<i.length;e+=4){let t=e/4*o;for(let n=0;n<3;n++)r?s[t+n]=i[e+n]:s[t+n]=i[e+n]/255,c&&(s[t+n+3]=c[e+n]/255),l&&(s[t+n+6]=l[e+n]/255)}return s}_readTile(e,t,n,r){let i=new Float32Array(n.width*n.height*t),a=e.length/(r*t);for(let o=0;o<n.height;o++)for(let s=0;s<n.width;s++){let c=Math.min(r-1,s+n.x),l=(Math.min(a-1,o+n.y)*r+c)*t,u=(o*n.width+s)*t;for(let n=0;n<t;n++)i[u+n]=e[l+n]}return i}_writeTile(e,t,n,r,i,a){let{data:o,width:s}=e,c=n.x-t.x,l=n.y-t.y;for(let t=0;t<n.height;t++)for(let u=0;u<n.width;u++){let d=((t+l)*i+u+c)*3,f=((t+n.y)*s+(u+n.x))*4;for(let e=0;e<3;e++)a?o[f+e]=r[d+e]:o[f+e]=Math.min(Math.max(r[d+e]*255,0),255);e.data[f+3]=a?1:255}}async _executeTile(e,t,n,r,i,a,o,s,c){let l=this._aux?9:3,u=new xe(r.input.x,r.input.y,r.input.width,r.input.height),d=new xe(r.output.x,r.output.y,r.output.width,r.output.height),f=u.width,p=u.height,m,h,g=1,_=this._device,v=this._dataProcessGPU;if(e instanceof Float32Array){let t=this._readTile(e,l,u,a);s&&(g=Se({data:t,channels:l}),t=C({data:t,channels:l,inputScale:g,transfer:this._hdrTransfer})),h=await(this._webNNExecutor??this._nativeExecutor).executeCPU(t,f,p)}else{v||=this._dataProcessGPU=new we(_,s,this._hdrTransfer),v.setImageSize(a,o),v.setInputTile(u),i&&v.copyInputDataToOutput(e.color);let{color:t,albedo:n,normal:r}=v.forward(e.color,this._aux?e.albedo:void 0,this._aux?e.normal:void 0,c);m=await(this._webNNExecutor??this._nativeExecutor).execute(this._aux?[t,n,r]:[t],f,p)}let y;if(e instanceof Float32Array){s&&(h=re({data:h,channels:3,inputScale:g,transfer:this._hdrTransfer})),this._writeTile(n,u,d,h,u.width,s);for(let e=0;e<d.height;e++)for(let r=0;r<d.width;r++){let i=(e*d.width+r)*4,o=((e+d.y)*a+(r+d.x))*4;for(let e=0;e<4;e++)t.data[i+e]=n.data[o+e]}}else v.setOutputTile(d,u),y=v.inverse(m,e.color);return y}tileExecute({color:e,albedo:t,normal:n,done:r,progress:i,denoiseAlpha:a,tileOverlap:o,wholeImage:s,scheduling:c=`event-loop`,error:l}){if(this._aux&&(!t||!n))throw Error(`Normal map and albedo map are both required`);if(!this._aux&&(t||n))throw Error(`Normal map and albedo map are not required`);let u=e.width,d=e.height,f=this._dynamicTileController.tileSize,p=s?Oi(Math.max(u,d),16):f,m=Oi(this._modelSpec.receptiveField/2,16),h=Ne(u,d,p,o===void 0?m:Oi(Math.max(0,o),16)),g=h.tiles.length>1,_=this._hdr||!1,v;ki(e)||(v=this._processImageData(e,t,n,_));function y(e,t){return _?{data:new Float32Array(e*t*4),width:e,height:t}:new ImageData(e,t)}let ee=ki(e)?void 0:y(u,d),b=`active`,x,S,te=()=>!1,ne=()=>typeof performance>`u`?Date.now():performance.now(),C=ne(),re=[],ie=()=>{x!==void 0&&(clearTimeout(x),x=void 0),S!==void 0&&typeof cancelAnimationFrame<`u`&&(cancelAnimationFrame(S),S=void 0)},ae=e=>{console.error(`OIDN error callback failed`,e)},oe=e=>{if(b===`active`){if(b=`settled`,ie(),te(),l)try{Promise.resolve(l(e)).catch(ae)}catch(e){ae(e)}else console.error(`OIDN execution failed`,e)}},se=e=>{if(c===`event-loop`||typeof requestAnimationFrame>`u`)x=setTimeout(()=>{x=void 0,e()},0);else{let t=()=>{ie(),e()};S=requestAnimationFrame(t),x=setTimeout(t,Di)}},ce=async o=>{if(b!==`active`)return;let s=h.tiles[o],c=ki(e)?void 0:y(s.output.width,s.output.height),l=ne(),f=await this._executeTile(ki(e)?{color:e.data,albedo:t?.data,normal:n?.data}:v,c,ee,s,o===0,u,d,_,a);if(b!==`active`)return;let p=ee||{data:f,width:u,height:d};if(i&&await i(p,c,new xe(s.output.x,s.output.y,s.output.width,s.output.height),o,h.tiles.length),b!==`active`)return;let m=o+1<h.tiles.length;await this._device.queue.onSubmittedWorkDone(),b===`active`&&await(async()=>{if(re.push(ne()-l),b===`active`){if(m)se(()=>{b===`active`&&ce(o+1).catch(oe)});else{let e=[...re].sort((e,t)=>e-t),t=Math.floor(e.length/2),n=e.length%2?e[t]:(e[t-1]+e[t])/2;this._lastExecution={width:u,height:d,tileCount:h.tiles.length,tileColumns:h.columns,tileRows:h.rows,tileOverlap:h.overlap,inputPixelCount:h.inputPixelCount,inputShapeCount:h.inputShapeCount,durationMs:ne()-C,tileTimeMs:{min:e[0],median:n,mean:e.reduce((e,t)=>e+t,0)/e.length,max:e[e.length-1]}},g&&this._dynamicTileController.observe(re),te(),await r(p),b===`active`&&(b=`settled`)}}})()};return te=this._registerExecutionFailure(oe),ce(0).catch(oe),()=>{b===`active`&&(b=`aborted`,ie(),te())}}dispose(){this._dataProcessGPU?.dispose(),this._nativeExecutor?.dispose(),this._webNNExecutor?.dispose()}};async function ji(){if(!navigator.gpu)throw Error(`WebGPU is not available`);let e=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!e)throw Error(`No WebGPU adapter is available`);let t={},n=[];e.features.has(`timestamp-query`)&&n.push(`timestamp-query`),e.features.has(`bgra8unorm-storage`)&&n.push(`bgra8unorm-storage`),e.features.has(`shader-f16`)&&n.push(`shader-f16`),t.requiredFeatures=n;let r=e.limits;return t.requiredLimits={maxComputeWorkgroupStorageSize:r.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.maxStorageBufferBindingSize,maxBufferSize:r.maxBufferSize,maxComputeWorkgroupSizeX:r.maxComputeWorkgroupSizeX,maxComputeInvocationsPerWorkgroup:r.maxComputeInvocationsPerWorkgroup},e.requestDevice(t)}async function Mi(e,t,n){let i=t?.device??await ji(),a=new Ai(r(e),i,n);return await a.prepare(),a}async function Ni(e,t,n){return fetch(e).then(e=>e.arrayBuffer()).then(e=>Mi(e,t,n))}export{Ni as initUNetFromURL};