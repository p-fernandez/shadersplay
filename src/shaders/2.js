import React from 'react';
import styled from 'styled-components';
import {
  Color,
  IcosahedronGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  TorusKnotGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

/**
 * https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js.html
 * Based on this tutorial
 */
import vertexShader from './2/vertexShader';
import fragmentShader from './2/fragmentShader';

const Canvas = styled.div.attrs({
    style: props => ({
      height: `${props.height}`,
      width: `${props.width}`,
    })
  })`
  position: absolute;
`;

class Shader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };

    this.animate = this.animate.bind(this);
    this.detectWebGL = this.detectWebGL.bind(this);
    this.init = this.init.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    this.detectWebGL();
    this.init();
    window.addEventListener('resize', this.onWindowResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  detectWebGL() {
    if (!window.WebGLRenderingContext) {
      this.setState({ error: true });
    }
  }

  init() {
    this.positionX = 30;
    this.positionY = 30;
    this.positionZ = 30;
    this.torus = new TorusKnotGeometry(20, 5, 200, 12);
    this.ico = new IcosahedronGeometry(20, 4);
    this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas = this.container.appendChild(this.renderer.domElement);

    this.r = 255;
    this.g = 215;
    this.b = 0;
    // Initialize Scenes
    this.scene = new Scene();
    this.scene.background = new Color(`rgb(${this.r}, ${this.g}, ${this.b})`);
    this.renderer.setClearColor(0xeeeeee, 1);

    // Initialize Camera
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(this.positionX, this.positionY, this.positionZ);
    this.camera.lookAt(new Vector3(0,0,0));

    this.scene.add(this.camera);

    this.material = new ShaderMaterial({
      uniforms: { 
        colorVar: {
          type: "f",
          value: 0.0,
        },
        time: { // float initialized to 0
          time: "f", 
          value: 0, 
        }
      },
      vertexShader,
      fragmentShader,
    });

    this.figure = this.ico; 
    this.mesh = new Mesh(
      this.figure,
      this.material
    );

    this.scene.add(this.mesh);

    this.tanFOV = Math.tan( ( ( Math.PI / 180 ) * this.camera.fov / 2 ) );
    this.windowHeight = window.innerHeight;

    // Render the Scene
    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    
    // adjust the FOV
    this.camera.fov = ( 360 / Math.PI ) * Math.atan( this.tanFOV * ( window.innerHeight / this.windowHeight ) );
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.scene.position);

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.positionX = Math.cos(this.positionX) * 10;
    this.positionY = Math.tan(this.positionY) * 10;
    this.positionZ = Math.sin(this.positionZ) * 10;
    const rand = Math.floor(Math.random()*(Date.now() / 10000000000));
    const colorVar = Math.floor(Math.random() * (20 + 1));
    const date = new Date();
    date.setTime(date.getTime());
    const min = date.getMinutes();
    const millisec = date.getMilliseconds();
    this.b = Math.floor(millisec / 11.76);
    const color = `rgb(${this.r}, ${this.g}, ${this.b})`;
    this.scene.background = new Color(color); 
    this.figure = min % 2 ? this.torus : this.ico;
    this.material.uniforms[ 'time' ].value = rand;
    this.material.uniforms[ 'colorVar' ].value = colorVar;
    this.mesh.rotation.x += Math.random();
    this.mesh.rotation.y += Math.random();
    this.mesh.rotation.z += Math.random();
    this.renderCanvas();
  }

  renderCanvas() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    const { error } = this.state;
    if (error) return(<div>NO WEBGL</div>);
    return (
        <Canvas
          innerRef={node => this.container = node}
        />
    );
  }
}

export default Shader;
