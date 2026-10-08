import React from 'react';
import {Composition} from 'remotion';
import {Timothy5Clip} from './Timothy5Clip.jsx';
import clips from './clips.json';
const FPS=24;
export const RemotionRoot=()=> <>{clips.map(clip=><Composition
  key={clip.id}
  id={'T5-'+String(clip.id).padStart(2,'0')}
  component={Timothy5Clip}
  width={720}
  height={1280}
  fps={FPS}
  durationInFrames={Math.ceil((clip.end-clip.start)*FPS)}
  defaultProps={{clipId:clip.id}}
/>)}</>;
