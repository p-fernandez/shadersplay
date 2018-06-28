import classicNoise3D from '../../webgl/ashima/classicNoise3D';

const vertexShader = `
${classicNoise3D}

varying vec2 vUv;
varying float noise;

uniform float time;

float turbulence( vec3 p ) {
    float w = 10.0;
    float t = -.5;
    for (float f = 1.0 ; f <= 10.0 ; f++ ){
        float power = pow( 2.0, f );
        t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
    }
    return t;
}

void main() {

    vUv = uv;

    // get a turbulent 3d noise using the normal, normal to high freq
    noise = 10.0 *  -.10 * turbulence( .7 * normal );
    // get a 3d noise using the position, low frequency
    float b = (0.1 * time) * pnoise( 0.10 * position, vec3( 100.0 ) );
    // compose both noises
    float displacement = - 10. * noise + b;
    
    // move the position along the normal and transform it
    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

}
`;

export default vertexShader;
