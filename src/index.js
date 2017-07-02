
const THREE = require('./assets/three.js');
const CanvasRenderer = require('./assets/CanvasRenderer.js');
const Projector = require('./assets/Projector.js');
const Stats = require('./assets/stats.min.js');
const Earth = require('./assets/land_ocean_ice_cloud_2048.jpg');

var container, stats;
var camera, scene, renderer;
var group;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

    container = document.getElementById('container');

    // 相机
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000); // 远景相机(视角, 长宽比, 近裁剪面, 远裁剪面)
    camera.position.z = 500;

    // 场景
    scene = new THREE.Scene();

    // 对象组
    group = new THREE.Group();
    scene.add(group);

    var loader = new THREE.TextureLoader(); // 纹理
    loader.load(Earth, function(texture){
        // 球体模型
        var geometry = new THREE.SphereGeometry(200, 200, 200);

        // 材料
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            overdraw: 0.5
        }); // 基础网孔材料，设置纹理贴图 overdraw过渡描绘，如果用THREE.CanvasRenderer对象，多边形渲染会偏大

        var mesh = new THREE.Mesh(geometry, material); // 网孔对象
        group.add(mesh);
    })

    // 阴影
    var canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;

    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
    ); // 创建放射状/环形的渐变
    gradient.addColorStop(0.1, 'rgba(210,210,210,1)'); // 规定渐变对象中的颜色和停止位置
    gradient.addColorStop(1, 'rgba(255,255,255,1)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    var texture = new THREE.CanvasTexture(canvas);

    var geometry = new THREE.PlaneBufferGeometry(300, 300, 3, 3);// 平面缓存模型
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5
    }); // 基础网孔材料，设置纹理贴图

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -250;
    mesh.rotation.x = -Math.PI / 2;

    group.add(mesh);

    // 渲染器
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xffffff); // 清除其颜色渲染缓冲的清除色
    renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于HiDPI设备防止模糊输出canvas
    renderer.setSize(window.innerWidth, window.innerHeight); // 调整输出canvas尺寸（宽度，高度），要考虑设备像素比，并且设置视口（viewport）以匹配该尺寸
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
}
function animate() {
    requestAnimationFrame( animate );

    render();
    stats.update();
}
function render() {
    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );

    group.rotation.y -= 0.005;

    renderer.render( scene, camera ); // 渲染
}

