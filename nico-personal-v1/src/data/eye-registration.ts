import type { EyeDirection } from './assets'

// Pixel offsets in the 1086×1448 source coordinate system, measured against
// the canonical base after its shared 0.948 Y normalization. Separate windows
// keep the nose, hair, mouth and silhouette identical in every gaze state.
export const eyeRegistration:Record<Exclude<EyeDirection,'center'>,readonly [readonly [number,number],readonly [number,number]]>={
  cross:[[-8,11],[-3,12]],
  'down-left':[[-7,-10],[-6,-13]],
  'down-right':[[-13,6],[-6,6]],
  down:[[-9,-13],[-6,-12]],
  left:[[-7,-5],[-6,-6]],
  right:[[-8,7],[-7,8]],
  'up-left':[[-7,12],[-3,12]],
  'up-right':[[-7,-6],[-5,-5]],
  up:[[-9,12],[-5,13]],
}
