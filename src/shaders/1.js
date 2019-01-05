import React from 'react';
import styled from 'styled-components';
import {
  Color,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  Scene,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

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
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas = this.container.appendChild(this.renderer.domElement);

    // Initialize Scenes
    this.scene = new Scene();
    this.renderer.setClearColor(0xeeeeee, 1);

    // Initialize Camera
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 0, 50);
    this.camera.lookAt(new Vector3(0,0,0));

    // Create Material
    const a = new Color( 0xffd700 );
    const b = new Color( 0xdaa520 );
    const material = new MeshPhongMaterial({ color: a.getHex(), shininess: 20, specular: b.getHex(), wireframe: true });
    const material2 = new MeshPhongMaterial({ color: b.getHex(), shininess: 20, specular: a.getHex() });
    const geometry = new TorusGeometry(20, 5, 20, 100);
    const oct = new OctahedronGeometry( 15 );

    this.mesh = new Mesh(geometry, material);
    this.mesh2 = new Mesh(oct, material2);
    this.scene.add(this.mesh);
    this.scene.add(this.mesh2);

    const light = new DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    this.scene.add( light );

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
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    this.mesh2.rotation.x -= 0.01;
    this.mesh2.rotation.y -= 0.01;
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
          ref={node => this.container = node}
        />
    );
  }
}

export default Shader;
