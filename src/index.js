
const THREE = require('./assets/three.js');
const CanvasRenderer = require('./assets/CanvasRenderer.js');
const Projector = require('./assets/Projector.js');
const stats = require('./assets/stats.min.js');

// var camera, scene, renderer;
// var mesh;

// init();
// animate();

// function init() {

//     // 相机
//     camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000); // 远景相机(视角, 长宽比, 近裁剪面, 远裁剪面)
//     camera.position.z = 500;

//     // 场景
//     scene = new THREE.Scene();

//     // 几何模型
//     var geometry = new THREE.BoxGeometry(200, 200, 200);

//     // 材料
//     var texture = new THREE.TextureLoader().load(IMG); // 纹理
//     var material = new THREE.MeshBasicMaterial({
//         map: texture
//     }); // 基础网孔材料，设置纹理贴图

//     mesh = new THREE.Mesh(geometry, material); // 网孔对象
//     scene.add(mesh);

//     // 渲染器
//     renderer = new THREE.WebGLRenderer();
//     renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于HiDPI设备防止模糊输出canvas
//     renderer.setSize(window.innerWidth, window.innerHeight); // 调整输出canvas尺寸（宽度，高度），要考虑设备像素比，并且设置视口（viewport）以匹配该尺寸
//     document.body.appendChild(renderer.domElement);

//     window.addEventListener('resize', onWindowResize, false);
// }

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight; // 重新设置相机视锥体宽高比
//     camera.updateProjectionMatrix(); // 更新相机投影矩阵

//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate(){
//     requestAnimationFrame(animate);
//     mesh.rotation.x += 0.005;
//     mesh.rotation.y += 0.01;

//     renderer.render(scene, camera); // 渲染
// }

