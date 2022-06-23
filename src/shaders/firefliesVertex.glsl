
uniform float uPixelRatio;
uniform float uSize;

uniform float uTime;
varying float vTime;

attribute float aScale;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.);
  modelPosition.y += (sin(uTime  + modelPosition.x) +1.)/2. * aScale * .2;
  modelPosition.z += (cos(uTime  + modelPosition.y) +1.)/2. * aScale * .3;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
  gl_PointSize = uSize * aScale * uPixelRatio;
  gl_PointSize *= (1.0/ -viewPosition.z);

  vTime = uTime;
}
