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

    /*var light = new THREE.PointLight(0xCCCC00, 1, 100);
    //light.position.set(0,0,0);
    var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    light.add(new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
    scene.add(light);
    //Color,intensity,distance,decay*/
}
function CreateSun() {
    var light = new THREE.PointLight(0xCCCC00, 1, 100);
    //let sunGeometry = new THREE.SphereBufferGeometry(0.5, 16, 8);
    let sunGeometry = new THREE.SphereBufferGeometry(20, 32, 50);
    let sunMaterial = new THREE.MeshLambertMaterial({ color: 0xCCCC00 });
    light.add(new THREE.Mesh( sunGeometry, new THREE.MeshBasicMaterial( { color: 0xCCCC00 } )));
    
    //sun.castShadow=false;
    scene.add(light);
    //scene.add(sun);
}
function CreateMercury(){
    let mercuryGeometry = new THREE.SphereGeometry(5,32,50);
    let mercuryMaterial = new THREE.MeshLambertMaterial({color: 0xA9A9A9});
    let mercury = new THREE.Mesh(mercuryGeometry,mercuryMaterial);

    mercury.position.set.x=-50;

    scene.add(mercury);
    
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
    addaxesHelper();
    CreateSun();
    //CreateMercury();
    render();
}