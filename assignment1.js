/// <reference path="libs/three.min.js" />
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
var controls,
    buldLight,
    hemiLight,
    sun,
    planets = [],
    mercurySpeed=0.00,
    venusSpeed=0.00,
    earthSpeed=0.00,
    marsSpeed=0.00,
    jupiterSpeed=0.00,
    saturnSpeed=0.00,
    uranusSpeed=0.00,
    neptuneSpeed=0.00,
    plutoSpeed=0.00,
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
    //setup the dat-gui widget
    control = new function () {
        this.MercurySpeed=0;
        this.VenusSpeed=0;
        this.EarthSpeed=0;
        this.MarsSpeed=0;
        this.JupterSpeed=0;
        this.SaturnSpeed=0;
        this.UranusSpeed=0;
        this.NeptuneSpeed=0;
        this.PlutoSpeed=0;
    }
    gui = new dat.GUI();
    gui.add(control,"MercurySpeed",0.00,100.00,87.97).onChange((value)=>{
        mercurySpeed=parseFloat(value);
    });
    gui.add(control,"VenusSpeed",0.00,0.005,0.002247).onChange((value)=>{
        venusSpeed=value;
    });
    gui.add(control,"EarthSpeed",0.00,0.005,0.00036526).onChange((value)=>{
        earthSpeed=value;
    });
    gui.add(control,"MarsSpeed",0.00,0.005,0.000068698).onChange((value)=>{
        marsSpeed=value;
    });
    gui.add(control,"JupterSpeed",0.00,0.005,0.00000433282).onChange((value)=>{
        jupiterSpeed=value;
    });
    gui.add(control,"SaturnSpeed",0.00,0.005,0.00000001075570).onChange((value)=>{
        saturnSpeed=value;
    });
    gui.add(control,"UranusSpeed",0.00,0.005,0.0000000003068715).onChange((value)=>{
        uranusSpeed=value;
    });
    gui.add(control,"NeptuneSpeed",0.00,0.005,0.000000000006019003).onChange((value)=>{
        neptuneSpeed=value;
    });
    gui.add(control,"PlutoSpeed",0.00,0.005,0.000000000000090500).onChange((value)=>{
        plutoSpeed=value;
    });

    controls = new THREE.OrbitControls(camera,renderer.domElement);
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
    let light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );
}
function createSun() {
    sun = new THREE.PointLight(0xFFFFFF, 2, 0,2);
    let sunGeometry = new THREE.SphereBufferGeometry(150, 32, 50);
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
    sun.add(plutoOrbit);
}
function createMercury(){
    let mercuryGeometry = new THREE.SphereGeometry(3.5,32,50);
    let mercuryMaterial = new THREE.MeshLambertMaterial({color: 0xA9A9A9});
    let mercury = new THREE.Mesh(mercuryGeometry,mercuryMaterial);

    mercury.position.x=200;

    scene.add(mercury); 
    mercuryOrbit.add(mercury);
}
function createVenus(){
    let venusGeometry = new THREE.SphereGeometry(8.7,32,50);
    let venusMaterial = new THREE.MeshLambertMaterial({color: 0xa13d2d});
    let venus = new THREE.Mesh(venusGeometry,venusMaterial);

    venus.position.x=300;
    scene.add(venus);
    venusOrbit.add(venus);
}
function createEarth(){
    let geometry = new THREE.SphereGeometry(9.2,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0x008080});
    let planet = new THREE.Mesh(geometry,material);

    planet.position.x=(sun.position.x + 400);
    scene.add(planet);
    earthOrbit.add(planet);
}
function createMars(){
    let geometry = new THREE.SphereGeometry(4.9,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xb7410e});
    let mars = new THREE.Mesh(geometry,material);
    
    mars.position.x=(sun.position.x + 500);
    scene.add(mars);
    marsOrbit.add(mars)
}
function createJupiter(){
    let geometry = new THREE.SphereGeometry(100,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xA52A2A});
    let jupiter = new THREE.Mesh(geometry,material);
    
    jupiter.position.x=(sun.position.x + 700);
    scene.add(jupiter);
    jupiterOrbit.add(jupiter);
}
function createSaturn(){
    let geometry = new THREE.SphereGeometry(97,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xfde522});
    let satrun = new THREE.Mesh(geometry,material);
    
    satrun.position.x=(sun.position.x + 1000);
    scene.add(satrun);
    saturnOrbit.add(satrun);
}
function createUranus(){
    let geometry = new THREE.SphereGeometry(37,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xd1e7e7});
    let uranus = new THREE.Mesh(geometry,material);
    
    uranus.position.x=(sun.position.x + 1200);
    scene.add(uranus);
    uranusOrbit.add(uranus);
}
function createNeptune(){
    let geometry = new THREE.SphereGeometry(36,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0x44667f});
    let neptune = new THREE.Mesh(geometry,material);
    
    neptune.position.x=(sun.position.x + 1400);
    scene.add(neptune);
    neptuneOrbit.add(neptune);
}
function createPluto(){
    let geometry = new THREE.SphereGeometry(5,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xF4A460});
    let pluto = new THREE.Mesh(geometry,material);
    console.log("creating pluto");
    pluto.position.x=(sun.position.x + 1500);
    scene.add(pluto);
    plutoOrbit.add(pluto);
}
function addaxesHelper() {

    scene.add(axesHelper);
}
function render() {
    //update the controlls
    //trackballControls.update(clock.getDelta());
    controls.update(clock.getDelta());
    renderer.render(scene, camera);

    var time = Date.now() * 0.0005;

    sun.position.x = Math.cos( time * 10 ) * 5;
	sun.position.y = Math.cos( time * 7 ) * 3;
	sun.position.y = Math.cos( time * 7 ) * 3;
   
    mercuryOrbit.rotation.y += mercurySpeed;
    venusOrbit.rotation.y += venusSpeed;
    earthOrbit.rotation.y += earthSpeed;
    marsOrbit.rotation.y += marsSpeed;
    jupiterOrbit.rotation.y += jupiterSpeed;
    saturnOrbit.rotation.y += saturnSpeed;
    uranusOrbit.rotation.y += uranusSpeed;
    neptuneOrbit.rotation.y += neptuneSpeed;
    plutoOrbit.rotation.y += plutoSpeed;



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