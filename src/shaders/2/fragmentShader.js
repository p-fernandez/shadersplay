const fragmentShader = `
varying vec2 vUv;
varying float noise;

uniform float colorVar;

void main() {

    // compose the colour using the UV coordinate
    // and modulate it with the noise like ambient occlusion
    vec3 color = vec3( vUv * ( 1. - 2. * noise ), tan(colorVar) );
    gl_FragColor = vec4( color.rgb, 1.0 );

}
`;

export default fragmentShader;
