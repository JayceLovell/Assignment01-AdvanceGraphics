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
    earth,
    earthMoonSpeed=0.00,
    marsMoonSpeed=0.00,
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
    plutoOrbit = new THREE.Object3D(),
    earthMoonOrbit = new THREE.Object3D(),
    marsMoonOrbit1 = new THREE.Object3D(),
    marsMoonOrbit2 = new THREE.Object3D(),
    jupiterMoonsOrbits=[];

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
        this.EarthMoonSpeed=0.001;
        this.MarsMoonSpeed=0.001;
    }
    gui = new dat.GUI();
    let planets = gui.addFolder('Planets');
    let earthMoon = gui.addFolder('EarthMoon');
    let marsMoon = gui.addFolder('MarsMoon');
    planets.add(control,"MercurySpeed",0.00,100.00,87.97).onChange((value)=>{
        mercurySpeed=parseFloat(value);
    });
    planets.add(control,"VenusSpeed",0.00,0.005,0.002247).onChange((value)=>{
        venusSpeed=value;
    });
    planets.add(control,"EarthSpeed",0.00,0.005,0.00036526).onChange((value)=>{
        earthSpeed=value;
    });
    planets.add(control,"MarsSpeed",0.00,0.005,0.000068698).onChange((value)=>{
        marsSpeed=value;
    });
    planets.add(control,"JupterSpeed",0.00,0.005,0.00000433282).onChange((value)=>{
        jupiterSpeed=value;
    });
    planets.add(control,"SaturnSpeed",0.00,0.005,0.00000001075570).onChange((value)=>{
        saturnSpeed=value;
    });
    planets.add(control,"UranusSpeed",0.00,0.005,0.0000000003068715).onChange((value)=>{
        uranusSpeed=value;
    });
    planets.add(control,"NeptuneSpeed",0.00,0.005,0.000000000006019003).onChange((value)=>{
        neptuneSpeed=value;
    });
    planets.add(control,"PlutoSpeed",0.00,0.005,0.000000000000090500).onChange((value)=>{
        plutoSpeed=value;
    });
    earthMoon.add(control,"EarthMoonSpeed",0.00,0.01,0.001).onChange((value)=>{
        earthMoonSpeed=value;
    });
    marsMoon.add(control,"MarsMoonSpeed",0.00,0.005,0.001).onChange((value)=>{
        marsMoonSpeed=value;
    });

    controls = new THREE.OrbitControls(camera,renderer.domElement);
}

function setupCamera() {
    camera.position.x = 0;
    camera.position.y = 100000;
    camera.position.z = 100;
    camera.lookAt(scene.position);
    /*var topSpotLight = new THREE.SpotLight( 0xffffff );
    var bottomSpotLight = new THREE.SpotLight( 0xffffff );
    topSpotLight.position.set(0,500000,0);
    bottomSpotLight.position.set(0,-500000,0);
    topSpotLight.castShadow=false;
    bottomSpotLight.castShadow=false;

    scene.add(topSpotLight);
    scene.add(bottomSpotLight);*/
    let light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );
}
function createSun() {
    sun = new THREE.PointLight(0xFFFFFF, 2, 0,2);
    let sunGeometry = new THREE.SphereBufferGeometry(10000, 32, 50);
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
//multiply by 10000
function createMercury(){
    let mercuryGeometry = new THREE.SphereGeometry(350,32,50);
    let mercuryMaterial = new THREE.MeshLambertMaterial({color: 0xA9A9A9});
    let mercury = new THREE.Mesh(mercuryGeometry,mercuryMaterial);
    createRing((sun.position.x + 57910));
    mercury.position.x=(sun.position.x + 57910);
    scene.add(mercury); 
    mercuryOrbit.add(mercury);
}
function createVenus(){
    let venusGeometry = new THREE.SphereGeometry(880,32,50);
    let venusMaterial = new THREE.MeshLambertMaterial({color: 0xa13d2d});
    let venus = new THREE.Mesh(venusGeometry,venusMaterial);

    createRing((sun.position.x + 108200));

    venus.position.x =(sun.position.x + 108200);
    scene.add(venus);
    venusOrbit.add(venus);
}
function createEarth(){
    let geometry = new THREE.SphereGeometry(920,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0x008080});
    earth = new THREE.Mesh(geometry,material);

    earth.position.x=(sun.position.x + 149600);
    //scene.add(earth);
    earthOrbit.add(earth);
    createMoons("Earth",earth,1,earthMoonOrbit);
    createRing((sun.position.x+149600));
}
function createMars(){
    let geometry = new THREE.SphereGeometry(500,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xb7410e});
    let mars = new THREE.Mesh(geometry,material);
    
    mars.position.x=(sun.position.x + 227900);
    scene.add(mars);
    marsOrbit.add(mars)
    createMoons("Mars",mars,2);
    createRing((sun.position.x+227900));
}
function createJupiter(){
    let geometry = new THREE.SphereGeometry(10360,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xA52A2A});
    let jupiter = new THREE.Mesh(geometry,material);
    
    jupiter.position.x=(sun.position.x + 300000);
    scene.add(jupiter);
    jupiterOrbit.add(jupiter);
    //createMoons("Jupiter",jupiter,79,0);
    createRing((sun.position.x+300000));
}
function createSaturn(){
    let geometry = new THREE.SphereGeometry(8710,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xfde522});
    let saturn = new THREE.Mesh(geometry,material);
    
    saturn.position.x=(sun.position.x + 400000);
    scene.add(saturn);
    saturnOrbit.add(saturn);
    createMoons("Saturn",saturn,53);
    createRing((sun.position.x + 400000));
}
function createUranus(){
    let geometry = new THREE.SphereGeometry(3710,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xd1e7e7});
    let uranus = new THREE.Mesh(geometry,material);
    
    uranus.position.x=(sun.position.x + 500000);
    scene.add(uranus);
    uranusOrbit.add(uranus);
    createMoons("Uranus",uranus,27);
    createRing((sun.position.x + 500000));
}
function createNeptune(){
    let geometry = new THREE.SphereGeometry(3600,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0x44667f});
    let neptune = new THREE.Mesh(geometry,material);
    
    neptune.position.x=(sun.position.x + 600000);
    scene.add(neptune);
    neptuneOrbit.add(neptune);
    createMoons("Neptune",neptune,13);
    createRing((sun.position.x + 600000));
}
function createPluto(){
    let geometry = new THREE.SphereGeometry(1600,32,50);
    let material = new THREE.MeshLambertMaterial({color: 0xF4A460});
    let pluto = new THREE.Mesh(geometry,material);
    pluto.position.x=(sun.position.x + 700000);
    scene.add(pluto);
    plutoOrbit.add(pluto);
    createRing((sun.position.x + 700000));
}
function addaxesHelper() {

    scene.add(axesHelper);
}
function createMoons(name,planet,numberOfMoons,planetOrbit){
    for(i=0; i<numberOfMoons;i++){
        let geometry = new THREE.SphereGeometry(150,32,50);
        let material = new THREE.MeshLambertMaterial({color: 0xDCDCDC});
        let moon = new THREE.Mesh(geometry,material);
        moon.position.x = 1500;
        console.log(name);
        switch(name){
            case 'Mars':
            {
                switch(i)
                {
                    case 0:
                    planet.add(marsMoonOrbit1);
                    marsMoonOrbit1.add(moon);
                    break;
                    case 1:
                    marsMoonOrbit2.rotation.y += 4;
                    planet.add(marsMoonOrbit2);
                    marsMoonOrbit2.add(moon);
                    break;
                }
            }
            case "Jupiter":
            {
                /*var orbit = new THREE.Object3D();
                orbit.add(moon);
                planet.add(orbit);
                //planet.add(jupiterMoonsOrbits[i]);
                jupiterMoonsOrbits[i].push(orbit);
                //jupiterMoonsOrbits[i].push(moon);*/
            }
            break;
            case "Saturn":
            {

            }
            break;
            case "Uranus":
            {

            }
            break;
            case "Neptune":
            {

            }
            break;
            default:
            {
            planet.add(planetOrbit);
            planetOrbit.add(moon);
            }
            break;
        }
        
    }
}
function createRing(distance){
    var geometry = new THREE.RingGeometry(distance,(distance+10), 100);
    var material = new THREE.MeshBasicMaterial( { color: 0xA9A9A9, side: THREE.DoubleSide } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);
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
   
    mercuryOrbit.rotation.z += mercurySpeed;
    venusOrbit.rotation.z += venusSpeed;
    earthOrbit.rotation.z += earthSpeed;
    marsOrbit.rotation.z += marsSpeed;
    jupiterOrbit.rotation.z += jupiterSpeed;
    saturnOrbit.rotation.z += saturnSpeed;
    uranusOrbit.rotation.z += uranusSpeed;
    neptuneOrbit.rotation.z += neptuneSpeed;
    plutoOrbit.rotation.z += plutoSpeed;
    earthMoonOrbit.rotation.z +=earthMoonSpeed;
    marsMoonOrbit1.rotation.z += marsMoonSpeed;
    marsMoonOrbit2.rotation.z += marsMoonSpeed;



    //to call itself
    requestAnimationFrame(render);
}
//launch
window.onload = () => {

    init();
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
    setupCamera();
    render();
}