const THREE = require('./assets/three.js');

// 1. 创建一个场景

var scene = new THREE.Scene(); // 场景
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); // 相机 远景相机(视角, 长宽比, 近裁剪面, 远裁剪面)
var renderer = new THREE.WebGLRenderer(); // 渲染器
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// “演员”
var geometry = new THREE.BoxGeometry(1, 1, 1); // 盒子模型
var material = new THREE.MeshBasicMaterial({color: 0x00ff00 }); // 网孔基础材料 对其着色
var cube = new THREE.Mesh(geometry, material); //网孔，承载几何模型，把材料应用到上面
scene.add(cube); // 添加到场景中

camera.position.z = 5;

// 2. 渲染场景
function render(){
    requestAnimationFrame(render); // 创建一个循环，60次/s绘制场景

    // 3. 创建动画
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera); // 渲染
}
render();

