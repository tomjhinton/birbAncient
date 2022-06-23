varying float vTime;


void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (vTime * .25));
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (vTime * .25));
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (vTime * .25));
}



void main() {

  float alpha = 1.;
  float distanceToCenter = distance(gl_PointCoord, vec2(.5));
  alpha =  0.05 / distanceToCenter - 0.1 * 2.;




  vec3 color = vec3(gl_PointCoord.x, gl_PointCoord.y, 1.);
  coswarp(color, 3.);


  gl_FragColor = vec4(color, alpha);
}
