/// <reference path="libs/three.min.js" />
/// <reference path="libs/trackballcontrols.js" />
//name: Jayce
//date: Febuary 05, 2019
//file: Assignment1.js
//Lost in the Echo
//But still giving it a try

//recurrent const
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
const axesHelper = new THREE.AxesHelper(10);

//global variables
var trackballControls,
    buldLight,
    hemiLight;

//function definitions
function init() {
    //the renderer
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    trackballControls = new THREE.TrackballControls(camera, renderer.domElement)
}

function setupCameraAndLight() {
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    //https://threejs.org/docs/#examples/objects/Lensflare
    var light = new THREE.PointLight(0xCCCC00, 100,100,100);
    light.position.set(0,0,0);
    scene.add(light);
    //Color,intensity,distance,decay
}
function CreateSun() {
    let sunGeometry = new THREE.SphereGeometry(20, 32, 50);
    let sunMaterial = new THREE.MeshLambertMaterial({ color: 0xCCCC00 });
    let sun = new THREE.Mesh(sunGeometry, sunMaterial);
    
    sun.castShadow=false;

    scene.add(sun);
}
function CreateMercury(){
    
}
function addaxesHelper() {

    scene.add(axesHelper);
}
function render() {
    //update the controlls
    trackballControls.update(clock.getDelta());
    renderer.render(scene, camera);

    //to call itself
    requestAnimationFrame(render);
}
//launch
window.onload = () => {

    init();
    setupCameraAndLight();
    render();
    addaxesHelper();
    CreateSun();
}