<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rotating Cylinder Shadows</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background-color: #111;
      font-family: sans-serif;
    }
    canvas {
      display: block;
    }
    #instructions {
      position: absolute;
      top: 20px;
      left: 20px;
      color: white;
      background: rgba(0, 0, 0, 0.6);
      padding: 10px 20px;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div id="instructions">
    <h3>Perspective & Truth</h3>
    <p>Rotate the cylinder and observe how its shadow changes.<br>Is it a circle? A rectangle? Or something in between?</p>
  </div>
  <script type="module">
    import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';
    import { OrbitControls } from 'https://cdn.skypack.dev/three@0.150.1/examples/jsm/controls/OrbitControls.js';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#111');

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.set(5, 5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);

    const ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.4 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const geometry = new THREE.CylinderGeometry(1, 1, 2, 64);
    const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.castShadow = true;
    cylinder.receiveShadow = false;
    scene.add(cylinder);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>
