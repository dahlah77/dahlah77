import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
import clipMap from './clips.json';
import transcript from './transcript.json';

const allWords=(transcript.segments||[]).flatMap(s=>(s.words||[]))
  .filter(w=>Number.isFinite(w.start)&&Number.isFinite(w.end)&&w.word)
  .map(w=>({...w,word:String(w.word).trim()}));

const important = new Set(['uang','bisnis','modal','bakso','korea','us','amerika','investasi','risiko','bitcoin','saham','dca','bca','mandiri','s&p','etf','bank','dividen','capital','gain','ai','skill','karier','dokter','klinik','juta','miliar','portofolio','return','indeks','index','s&p500','kpr','rumah','bunga','suku','karyawan','marketplace','brand','affiliate','barbershop','auditor','akuntan','ojol','snowball']);
const norm=s=>s.toLocaleLowerCase().replace(/[^a-z0-9à-ÿ&p]/gi,'');
const fix=s=>({folkliffe:'forklift',bitkoin:'Bitcoin',bitcoin:'Bitcoin',sp500:'S&P 500',kriptó:'crypto'}[norm(s)]||s);

function makePages(clip) {
  const ws=allWords.filter(w=>w.start>=clip.start-0.14 && w.end<=clip.end+0.17);
  const pages=[];let current=[];
  for (const w of ws) {
    if (!current.length){current.push(w);continue;}
    const gap=w.start-current[current.length-1].end;
    const elapsed=w.end-current[0].start;
    const punctuation=/[.!?]$/.test(current[current.length-1].word);
    if(current.length>=4 || gap>0.48 || elapsed>1.72 || (punctuation && current.length>=2)){
      pages.push(current);current=[w];
    } else current.push(w);
  }
  if(current.length) pages.push(current);
  return pages.map(group=>({
    start:group[0].start,end:group[group.length-1].end,
    words:group
  }));
}

export const Timothy5Clip=({clipId})=>{
  const clip=clipMap.find(c=>c.id===clipId)||clipMap[0];
  const frame=useCurrentFrame();
  const {fps,durationInFrames}=useVideoConfig();
  const t=frame/fps, absoluteTime=clip.start+t;
  const pages=useMemo(()=>makePages(clip),[clip.id]);
  let pg=null;
  // Binary search so captions are efficient over long discussions.
  let lo=0,hi=pages.length-1;
  while(lo<=hi){
    const mid=Math.floor((lo+hi)/2),p=pages[mid];
    if(absoluteTime<p.start-0.06) hi=mid-1;
    else if(absoluteTime>p.end+0.12) lo=mid+1;
    else {pg=p;break;}
  }

  const progress=Math.min(1,Math.max(0,frame/Math.max(1,durationInFrames-1)));
  const hookOpacity=interpolate(frame,[0,6,62,78],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const intro=spring({fps,frame,config:{mass:0.9,damping:17,stiffness:160}});
  const zoom=1.02+0.008*Math.sin(frame/60);

  return <AbsoluteFill style={{backgroundColor:'#07090b',overflow:'hidden',fontFamily:'Arial,DejaVu Sans,sans-serif'}}>
    <Video
      src={staticFile('source.mp4')}
      trimBefore={Math.round(clip.start*fps)}
      style={{
        position:'absolute',width:'100%',height:'100%',
        objectFit:'cover',objectPosition:'50% 50%',
        transform:`scale(${zoom})`,
        filter:'contrast(1.055) saturate(1.03)'
      }}
    />
    <AbsoluteFill style={{
      background:'linear-gradient(to bottom,rgba(0,0,0,0.14) 0%,transparent 42%,transparent 52%,rgba(0,0,0,0.42) 100%)'
    }} />
    <div style={{position:'absolute',left:0,top:0,height:5,width:(100*progress)+'%',backgroundColor:'#FFD447'}}/>
    <div style={{position:'absolute',left:34,top:25,color:'rgba(255,255,255,.84)',fontSize:20,fontWeight:900,letterSpacing:1}}>TIMOTHY RONALD</div>
    <div style={{
      position:'absolute',top:80,left:32,right:32,
      display:'flex',justifyContent:'center',opacity:hookOpacity,
      transform:`translateY(${(1-intro)*-14}px) scale(${0.94+intro*0.06})`
    }}>
      <div style={{
        padding:'14px 17px',maxWidth:634,textAlign:'center',
        borderRadius:16,background:'rgba(0,0,0,0.75)',
        border:'1px solid rgba(255,255,255,.16)',
        color:'#FFFFFF',fontSize:42,fontWeight:950,lineHeight:1.05,
        textTransform:'uppercase',letterSpacing:-0.9,
        textShadow:'0 3px 6px rgba(0,0,0,.9)'
      }}>{clip.title}</div>
    </div>
    {pg ? <div style={{
      position:'absolute',left:36,right:36,bottom:191,
      display:'flex',justifyContent:'center',alignItems:'center',
      flexWrap:'wrap',gap:'1px 11px',maxHeight:290,
      fontSize:52,fontWeight:950,lineHeight:1.14,textAlign:'center',
      textTransform:'uppercase',textShadow:'0 3px 7px rgba(0,0,0,.96)',
      filter:'drop-shadow(0 4px 5px rgba(0,0,0,.75))'
    }}>
      {pg.words.map((w,i)=>{
        const highlight=absoluteTime>=w.start && absoluteTime<=w.end+0.08;
        const special=important.has(norm(w.word));
        return <span key={i} style={{
          color:highlight?'#FFD447':(special?'#FFF1AA':'#FFFFFF'),
          WebkitTextStroke:'2px rgba(0,0,0,.93)',
          transform:highlight?'scale(1.06)':'scale(1)'
        }}>{fix(w.word)}</span>
      })}
    </div>:null}
    <div style={{position:'absolute',right:32,bottom:78,color:'rgba(255,255,255,.60)',fontSize:17,fontWeight:800,letterSpacing:0.9}}>TIMOTHY 5</div>
  </AbsoluteFill>;
};
