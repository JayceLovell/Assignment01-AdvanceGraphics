/// <reference path="libs/three.min.js" />
/// <reference path="libs/trackballcontrols.js" />
//name: Jayce
//date: Febuary 05, 2019
//file: Assignment1.js
//Lost in the Echo
//But still giving it a try

//recurrent const
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
const axesHelper = new THREE.AxesHelper(10);

//global variables
var trackballControls,
    buldLight,
    hemiLight,
    sun,
    planets = [],
    mercuryOrbit = new THREE.Object3D(),
    venusOrbit = new THREE.Object3D(),
    earthOrbit = new THREE.Object3D(),
    marsOrbit = new THREE.Object3D(),
    jupiterOrbit = new THREE.Object3D(),
    saturnOrbit = new THREE.Object3D(),
    uranusOrbit = new THREE.Object3D(),
    neptuneOrbit = new THREE.Object3D(),
    plutoOrbit = new THREE.Object3D();

//function definitions
function init() {
    //the renderer
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    trackballControls = new THREE.TrackballControls(camera, renderer.domElement)
}

function setupCamera() {
    camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 100;
    camera.lookAt(scene.position);
    var topSpotLight = new THREE.SpotLight( 0xffffff );
    var bottomSpotLight = new THREE.SpotLight( 0xffffff );
    topSpotLight.position.set(0,50,0);
    bottomSpotLight.position.set(0,-50,0);
    topSpotLight.castShadow=false;
    bottomSpotLight.castShadow=false;

    scene.add(topSpotLight);
    scene.add(bottomSpotLight);
}
function createSun() {
    sun = new THREE.PointLight(0xFFFFFF, 10, 0,2);
    let sunGeometry = new THREE.SphereBufferGeometry(100, 32, 50);
    let sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFDA50F });
    sun.add(new THREE.Mesh( sunGeometry, sunMaterial));
    
    scene.add(sun);
    sun.add(mercuryOrbit);
    sun.add(venusOrbit);
    sun.add(earthOrbit);
    sun.add(marsOrbit);
    sun.add(jupiterOrbit);
    sun.add(saturnOrbit);
    sun.add(uranusOrbit);
    sun.add(neptuneOrbit);
}
function createMercury(){
    let mercuryGeometry = new THREE.SphereGeometry(0.35,32,50);
    let mercuryMaterial = new THREE.MeshLambertMaterial({color: 0xA9A9A9});
    let mercury = new THREE.Mesh(mercuryGeometry,mercuryMaterial);

    mercury.position.x=200;

    scene.add(mercury); 
    mercuryOrbit.add(mercury);
}
function createVenus(){
    let venusGeometry = new THREE.SphereGeometry(0.87,32,50);
    let venusMaterial = new THREE.MeshLambertMaterial({color: 0xa13d2d});
    let venus = new THREE.Mesh(venusGeometry,venusMaterial);

    venus.position.x=300;
    scene.add(venus);
    venusOrbit.add(venus);
}
function createEarth(){
    let geometry = new THREE.SphereGeometry(0.92,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0x008080});
    let planet = new THREE.Mesh(geometry,material);

    planet.position.x=(sun.position.x + 400);
    scene.add(planet);
    earthOrbit.add(planet);
}
function createMars(){
    let geometry = new THREE.SphereGeometry(0.49,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xb7410e});
    let mars = new THREE.Mesh(geometry,material);
    
    mars.position.x=(sun.position.x + 500);
    scene.add(mars);
    marsOrbit.add(mars)
}
function createJupiter(){
    let geometry = new THREE.SphereGeometry(10,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xA52A2A});
    let jupiter = new THREE.Mesh(geometry,material);
    
    jupiter.position.x=(sun.position.x + 600);
    scene.add(jupiter);
    jupiterOrbit.add(jupiter);
}
function createSaturn(){
    let geometry = new THREE.SphereGeometry(9.7,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xfde522});
    let satrun = new THREE.Mesh(geometry,material);
    
    satrun.position.x=(sun.position.x + 700);
    scene.add(satrun);
    saturnOrbit.add(satrun);
}
function createUranus(){
    let geometry = new THREE.SphereGeometry(3.7,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xd1e7e7});
    let uranus = new THREE.Mesh(geometry,material);
    
    uranus.position.x=(sun.position.x + 800);
    scene.add(uranus);
    uranusOrbit.add(uranus);
}
function createNeptune(){
    let geometry = new THREE.SphereGeometry(3.6,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0x44667f});
    let neptune = new THREE.Mesh(geometry,material);
    
    neptune.position.x=(sun.position.x + 900);
    scene.add(neptune);
    neptuneOrbit.add(neptune);
}
function createPluto(){
    let geometry = new THREE.SphereGeometry(0.2,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xDEB887});
    let pluto = new THREE.Mesh(geometry,material);
    
    pluto.position.x=(sun.position.x + 1000);
    scene.add(pluto);
    plutoOrbit.add(pluto);
}
function addaxesHelper() {

    scene.add(axesHelper);
}
function render() {
    //update the controlls
    trackballControls.update(clock.getDelta());
    renderer.render(scene, camera);

    /*var time = Date.now() * 0.0005;

    sun.position.x = Math.cos( time * 10 ) * 5;
	sun.position.y = Math.cos( time * 7 ) * 3;
	sun.position.y = Math.cos( time * 7 ) * 3;
    /*planets.foreach(function(planet){
      planet.rotation.y += 0.01;  
    })*/
    mercuryOrbit.rotation.y += 87.97;
    venusOrbit.rotation.y += 0.002247;
    earthOrbit.rotation.y += 0.00036526;
    marsOrbit.rotation.y += 0.000068698;
    jupiterOrbit.rotation.y += 0.00000433282;
    saturnOrbit.rotation.y += 0.00000001075570;
    uranusOrbit.rotation.y += 0.0000000003068715;
    neptuneOrbit.rotation.y += 0.000000000006019003;
    plutoOrbit.rotation.y += 0.000000000000090500;



    //to call itself
    requestAnimationFrame(render);
}
//launch
window.onload = () => {

    init();
    setupCamera();
    addaxesHelper();
    createSun();
    createMercury();
    createVenus();
    createEarth();
    createMars();
    createJupiter();
    createSaturn();
    createUranus();
    createNeptune();
    createPluto();
    render();
}