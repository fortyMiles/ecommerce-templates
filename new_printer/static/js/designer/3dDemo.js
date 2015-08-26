// 准备底部托盘颜色
// var colors = [
//     0xFF62B0,
//     0x9A03FE,
//     0x62D0FF,
//     0x48FB0D,
//     0xDFA800,
//     0xC27E3A,
//     0x990099,
//     0x9669FE,
//     0x23819C,
//     0x01F33E,
//     0xB6BA18,
//     0xFF800D,
//     0xB96F6F,
//     0x4A9586
// ];
function Describe3d(url){

    var particleLight;

    var _obj = {
        scene: null,
        camera: null,
        renderer: null,
        container: null,
        controls: null,
        clock: null,
        stats: null,

        init: function() { // 初始化

            // 创建主要场景
            this.scene = new THREE.Scene();  // 实例化3D对象

            var SCREEN_WIDTH = 574,
                SCREEN_HEIGHT = 735;  // 设置宽高

            // 准备相机
            var VIEW_ANGLE = 15, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 10000;
            this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
            this.scene.add(this.camera);
            this.camera.position.set(-1000, 1000, 0);
            this.camera.lookAt(new THREE.Vector3(0,0,0));

            // 准备渲染
            this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: false});
            this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
            this.renderer.setClearColor(0xffffff);

            this.renderer.shadowMapEnabled = true;
            this.renderer.shadowMapSoft = true;

            // 准备容器
            // this.container = document.createElement('div');
            document.getElementById('show-3d').appendChild(this.renderer.domElement);
            // this.container.appendChild(this.renderer.domElement);

            // 事件
            // THREEx.WindowResize(this.renderer, this.camera);

            // 准备控制器 (OrbitControls)
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.target = new THREE.Vector3(0, 0, 0);

            // 准备计时器
            this.clock = new THREE.Clock();

            // 准备统计
            // this.stats = new Stats();
            // this.stats.domElement.style.position = 'absolute';
            // this.stats.domElement.style.bottom = '0px';
            // this.stats.domElement.style.zIndex = 10;
            // this.container.appendChild( this.stats.domElement );

            // 添加定向光线
            var dLight = new THREE.DirectionalLight(0xffffff);
            dLight.position.set(1, 1000, 1);
            dLight.castShadow = true;
            // dLight.shadowCameraVisible = true;
            dLight.shadowDarkness = 0.2;
            dLight.shadowMapWidth = dLight.shadowMapHeight = 1000;
            this.scene.add(dLight);

            // 添加粒子光线
            // particleLight = new THREE.Mesh( new THREE.SphereGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x44ff44 }));
            // particleLight.position = dLight.position;
            // this.scene.add(particleLight);

            // 添加简单的场地
            // var groundGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);  // 设置底部托盘大小
            // ground = new THREE.Mesh(groundGeometry, new THREE.MeshLambertMaterial({
            //     color: this.getRandColor()
            // }));
            // ground.position.y = 0;
            // ground.rotation.x = - Math.PI / 2;
            // ground.receiveShadow = true;
            // this.scene.add(ground);

            // 开始画3D图

            // ASCII file
            var _this = this;
            var loader = new THREE.STLLoader();
            loader.addEventListener('load', function(event) {
                var geometry = event.content;
                var material = new THREE.MeshPhongMaterial({
                    ambient: 0xff5533,
                    color: 0xff5533,
                    specular: 0x111111,
                    shininess: 200
                });
                var mesh = new THREE.Mesh(geometry, material);

                mesh.position.set(0, -0.25, 0.6);
                mesh.rotation.set(0, -Math.PI / 2, 0);
                mesh.scale.set(0.5, 0.5, 0.5);

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                _this.scene.add(mesh);
            });
            loader.load(url);   // 3D图对应的 .stl 文件地址

            // Binary files
            var material = new THREE.MeshPhongMaterial({
                ambient: 0x555555,
                color: 0xAAAAAA,
                specular: 0x111111,
                shininess: 200
            });

            var loader = new THREE.STLLoader();
            loader.addEventListener('load', function(event) {

                var geometry = event.content;
                var mesh = new THREE.Mesh(geometry, material);

                mesh.position.set(0, -0.37, -0.6);
                mesh.rotation.set(-Math.PI / 2, 0, 0);
                mesh.scale.set(2, 2, 2);

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                _this.scene.add(mesh);

            });
            loader.load(url);

            var loader = new THREE.STLLoader();
            loader.addEventListener('load', function(event) {

                var geometry = event.content;
                var mesh = new THREE.Mesh(geometry, material);

                mesh.position.set(0.136, -0.37, -0.6);
                mesh.rotation.set(-Math.PI / 2, 0.3, 0);
                mesh.scale.set(2, 2, 2);

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                _this.scene.add(mesh);

            });
            loader.load(url);

            // Colored binary STL
            var loaderColored = new THREE.STLLoader();
            loaderColored.addEventListener('load', function(event) {

                var geometry = event.content;

                var meshMaterial = material;
                if (geometry.hasColors) {
                    meshMaterial = new THREE.MeshPhongMaterial({
                        opacity: geometry.alpha,
                        vertexColors: THREE.VertexColors
                    });
                }

                var mesh = new THREE.Mesh(geometry, meshMaterial);

                mesh.position.set(0.5, 0.2, 0);
                mesh.rotation.set(-Math.PI / 2, Math.PI / 2, 0);
                mesh.scale.set(0.3, 0.3, 0.3);

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                _this.scene.add(mesh);

            });
            loaderColored.load(url);
        },
        // getRandColor: function() {
        //     return colors[Math.floor(Math.random() * colors.length)];   // 底部托盘随机颜色
        // }
    };

    // 动画
    function animate() {
        requestAnimationFrame(animate);
        render();
        // update();
    }

    // 更新控制器状态
    // function update() {
    //     // _obj.controls.update(_obj.clock.getDelta());
    //     // _obj.stats.update();

    //     // smoothly move the particleLight
    //     // var timer = Date.now() * 0.000025;
    //     // particleLight.position.x = Math.sin(timer * 5) * 300;
    //     // particleLight.position.z = Math.cos(timer * 5) * 300;
    // }

    // 渲染场景
    function render() {
        if (_obj.renderer) {
            _obj.renderer.render(_obj.scene, _obj.camera);
        }
    }

    // 在页面加载时初始化 _obj 对象
    function initializeObj() {
        _obj.init();
        animate();
    }

    if (window.addEventListener)
        window.addEventListener('load', initializeObj, false);
    else if (window.attachEvent)
        window.attachEvent('onload', initializeObj);
    else window.onload = initializeObj;
}