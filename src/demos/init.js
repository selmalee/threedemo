
const THREE = require('./assets/three.js');

// 1. 创建一个场景

var scene = new THREE.Scene(); // 场景

var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000); // 相机 远景相机(视角, 长宽比, 近裁剪面, 远裁剪面)
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer(); // 渲染器
renderer.setSize(window.innerWidth, window.innerHeight); // 调整输出canvas尺寸（宽度，高度），要考虑设备像素比，并且设置视口（viewport）以匹配该尺寸。

document.body.appendChild(renderer.domElement); // renderer.domElement: 一个用来绘制输出的 Canvas 对象

// “演员”
var geometry = new THREE.BoxGeometry(1, 1, 1); // 盒子模型 BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
for ( var i = 0; i < geometry.faces.length; i += 2 ) {
    var hex = Math.random() * 0xffffff;
    geometry.faces[ i ].color.setHex( hex );
    geometry.faces[ i + 1 ].color.setHex( hex );
}
var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5  }); // 网孔基础材料 对其着色
material.wireframe = false;
var cube = new THREE.Mesh(geometry, material); //网孔，承载几何模型，把材料应用到上面
scene.add(cube); // 添加到场景中

// 光
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );


// 2. 渲染场景

function render(){
    requestAnimationFrame(render); // 创建一个循环，60次/s绘制场景

    // 3. 创建动画

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera); // 渲染
}
render();
