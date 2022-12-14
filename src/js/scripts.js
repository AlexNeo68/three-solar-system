import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import earthTexture from '../img/earth.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import marsTexture from '../img/mars.jpg';
import mercuryTexture from '../img/mercury.jpg';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';
import saturnRingTexture from '../img/saturn_ring.png';
import saturnTexture from '../img/saturn.jpg';
import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import uranusRingTexture from '../img/uranus_ring.png';
import uranusTexture from '../img/uranus.jpg';
import venusTexture from '../img/venus.jpg';

const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(-90, 140, 140);
orbit.update();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun)

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

function createPlanet(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if (ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32
        );

        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -Math.PI / 2;
    }
    scene.add(obj);
    mesh.position.x = position;
    return { mesh, obj }
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnTexture
});
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusTexture
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);

scene.background = cubeTextureLoader.load([starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture]);
function animate() {
    sun.rotateY(.004)
    //self rotation
    mercury.mesh.rotateY(0.004)
    venus.mesh.rotateY(0.002)
    earth.mesh.rotateY(0.02)
    mars.mesh.rotateY(0.018)
    jupiter.mesh.rotateY(0.004)
    saturn.mesh.rotateY(0.038)
    uranus.mesh.rotateY(0.003)
    neptune.mesh.rotateY(0.032)
    pluto.mesh.rotateY(0.008)

    //sun rotation
    mercury.obj.rotateY(0.04)
    venus.obj.rotateY(0.015)
    earth.obj.rotateY(0.01)
    mars.obj.rotateY(0.008)
    jupiter.obj.rotateY(0.002)
    saturn.obj.rotateY(0.0009)
    uranus.obj.rotateY(0.0004)
    neptune.obj.rotateY(0.0001)
    pluto.obj.rotateY(0.00007)
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});