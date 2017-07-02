
const THREE = require('./assets/three.js');
const CanvasRenderer = require('./assets/CanvasRenderer.js');
const Projector = require('./assets/Projector.js');
const Stats = require('./assets/stats.min.js');
const Earth = require('./assets/land_ocean_ice_cloud_2048.jpg');

var container, stats;
var camera, scene, renderer;
var cube, plane;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();

function init() {

    container = document.getElementById('container');

    // 相机
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000); // 远景相机(视角, 长宽比, 近裁剪面, 远裁剪面)
    camera.position.y = 150;
    camera.position.z = 500;

    // 场景
    scene = new THREE.Scene();

    // cube
    // 盒子模型
    var geometry = new THREE.BoxGeometry(200, 200, 200);

    for ( var i = 0; i < geometry.faces.length; i += 2 ) {
        var hex = Math.random() * 0xffffff;
        geometry.faces[ i ].color.setHex( hex );
        geometry.faces[ i + 1 ].color.setHex( hex );
    } // faces:三角面数组 

    // 材料
    var material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        overdraw: 0.5
    }); // 基础网孔材料，设置纹理贴图 overdraw过渡描绘，如果用THREE.CanvasRenderer对象，多边形渲染会偏大

    cube = new THREE.Mesh(geometry, material); // 网孔对象
    cube.position.y = 150;
    scene.add(cube);

    // 阴影
    var geometry = new THREE.PlaneBufferGeometry(200, 200);// 平面缓存模型
    geometry.rotateX(-Math.PI / 2);

    var material = new THREE.MeshBasicMaterial({
        color: 0xe0e0e0,
        overdraw: 0.5
    }); // 基础网孔材料，设置纹理贴图

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // 渲染器
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xf0f0f0); // 清除其颜色渲染缓冲的清除色
    renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于HiDPI设备防止模糊输出canvas
    renderer.setSize(window.innerWidth, window.innerHeight); // 调整输出canvas尺寸（宽度，高度），要考虑设备像素比，并且设置视口（viewport）以匹配该尺寸
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener( 'mousedown', onDocumentMouseDown, false ); // PC
    document.addEventListener( 'touchstart', onDocumentTouchStart, false ); // 移动端
    document.addEventListener( 'touchmove', onDocumentTouchMove, false ); // 移动端

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
// PC
function onDocumentMouseDown( event ) {
    event.preventDefault();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    console.log('clientX: '+event.clientX);
    console.log('windowHalfX: '+windowHalfX);
    targetRotationOnMouseDown = targetRotation;
}
function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}
function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
function onDocumentMouseOut( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
function onDocumentTouchStart( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
}
function onDocumentTouchMove( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
    }
}
function animate() {
    requestAnimationFrame( animate );

    stats.begin();
    render();
    stats.end();
}
function render() {
    plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05; // 使模型绕Y轴旋转

    renderer.render( scene, camera ); // 渲染
}

