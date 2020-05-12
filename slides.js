let index = 0;
let plane, target, intersec, circle, sphere;
let num = 1;
let tess = null;
let animateTess = false;

let spheres = [];
let lines = [];


function slideChange(i) {
    // console.log('Slide changed to: ' + (index + i));
    document.querySelector('#title').style.display = 'none';
    document.querySelector('#canvas2').style.display = 'none';

    while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
    }

    width = window.innerWidth;
    height = window.innerHeight;

    animating = [];
    lines = [];
    spheres = [];

    target = null;
    l1 = null;
    l2 = null;
    plane = null;
    intersec = null;
    circle = null;
    sphere = null;
    tess = null;
    animateTess = false;
    num = 1;

    if(intersec2) scene2.remove(intersec2);


    document.querySelector('#_2d').style.display = 'none';
    document.querySelector('#_3d').style.display = 'none';
    document.querySelector('#_4d').style.display = 'none';

    camera.position.set(0, 150, 400);

    index += i;
    slides[index]();
}


let slides = [
    (function() {
        document.querySelector('#title').display = 'none';
        // plane = new Plane(0, 0, 0, 500, 400, '#fff');
        // addLight(-75, 180, 200);
        // addLight(75, -180, -200);

        // var dir = new THREE.Vector3(1, 0, 0);

        // dir.normalize();

        // var origin = new THREE.Vector3(-240, 2, 190);
        // var length = 100;
        // var hex = '#f00';

        // var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
        // scene.add(arrowHelper);
    }),

    (function() {
        camera.position.y = 140;
        spheres[0] = new Sphere(0, 0, 0, 10, 10, '#66c', 0.6);
        addLight(-50, 180, 400);
        addLight(50, -180, -400);

        window.addEventListener('keyup', e => {
            if (e.code != 'Space' || index != 1) return;

            // Create tesseract
            if (num == 8) {
                for (let i = 0; i < num; i++) {
                    let s = new Sphere(
                    spheres[i].OBJ.position.x,
                    spheres[i].OBJ.position.y,
                    spheres[i].OBJ.position.z,
                    10,
                    8,
                    '#66c',
                    0.6
                    );

                    spheres.push(s);
                    spheres[i].connect(s);
                }

                spheres[0].setGoal(150, 150, 150, 500, easing.easeInOutCubic);
                spheres[1].setGoal(-150, 150, 150, 500, easing.easeInOutCubic);
                spheres[2].setGoal(150, -150, 150, 500, easing.easeInOutCubic);
                spheres[3].setGoal(-150, -150, 150, 500, easing.easeInOutCubic);
                spheres[4].setGoal(150, 150, -150, 500, easing.easeInOutCubic);
                spheres[5].setGoal(-150, 150, -150, 500, easing.easeInOutCubic);
                spheres[6].setGoal(150, -150, -150, 500, easing.easeInOutCubic);
                spheres[7].setGoal(-150, -150, -150, 500, easing.easeInOutCubic);

                spheres[8].setGoal(50, 50, 50, 500, easing.easeInOutCubic);
                spheres[9].setGoal(-50, 50, 50, 500, easing.easeInOutCubic);
                spheres[10].setGoal(50, -50, 50, 500, easing.easeInOutCubic);
                spheres[11].setGoal(-50, -50, 50, 500, easing.easeInOutCubic);
                spheres[12].setGoal(50, 50, -50, 500, easing.easeInOutCubic);
                spheres[13].setGoal(-50, 50, -50, 500, easing.easeInOutCubic);
                spheres[14].setGoal(50, -50, -50, 500, easing.easeInOutCubic);
                spheres[15].setGoal(-50, -50, -50, 500, easing.easeInOutCubic);
            }


            if(num < 8) {
                for (let i = 0; i < num; i++) {
                    let s = new Sphere(
                        spheres[i].OBJ.position.x,
                        spheres[i].OBJ.position.y,
                        spheres[i].OBJ.position.z,
                        10,
                        8,
                        '#66c',
                        1
                    );

                    spheres.push(s);
                    spheres[i].connect(s);
                }
            }

            let i = 0;

            if(num < 8) {
                spheres.forEach(sphere => {
                    sphere.setGoal(
                        (num == 1 ? (i <= spheres.length / 2 - 1 ? 100 : -100) : sphere.OBJ.position.clone().x),
                        (num == 2 ? (i <= spheres.length / 2 - 1 ? 100 : -100) : sphere.OBJ.position.clone().y),
                        (num == 4 ? (i <= spheres.length / 2 - 1 ? 100 : -100) : sphere.OBJ.position.clone().z),
                        500,
                        easing.easeInOutCubic
                    );
                    i++;
                });
            }


            // Adding lines

            // 1D -> 2D
            if(num == 2) {
                spheres[2].connect(spheres[3]);
            }

            // 2D -> 3D
            else if(num == 4) {
                spheres[4].connect(spheres[5]);
                spheres[4].connect(spheres[6]);

                spheres[5].connect(spheres[7]);

                spheres[6].connect(spheres[7]);
            }

            // 3D -> 4D
            else if(num == 8) {
                spheres[8].connect(spheres[9]);
                spheres[8].connect(spheres[10]);
                spheres[8].connect(spheres[12]);
                spheres[9].connect(spheres[11]);
                spheres[9].connect(spheres[13]);
                spheres[10].connect(spheres[11]);
                spheres[10].connect(spheres[14]);
                spheres[11].connect(spheres[15]);
                spheres[12].connect(spheres[13]);
                spheres[12].connect(spheres[14]);
                spheres[13].connect(spheres[15]);
                spheres[14].connect(spheres[15]);
            }

            // Animate tess
            else if (num == 16) {
                tess = new Tesseract();
                animateTess = true;

                tessPoints.push(...spheres);

                return;
            }

            num *= 2;
        });
    }),

    (function() {
        document.querySelector('#_2d').style.display = 'block';
        document.querySelector('#_3d').style.display = 'block';

        plane = new Plane(0, 0, 0, 500, 400, '#fff');
        target = new Box(0, 101, 0, 100, 100, 100, '#66c', true, 0.7);
        intersec = new Plane(0, 0.1, 0, 100, 100, '#ff0');
        intersec.visible = false;

        intersec2 = new Plane2(0, 0, 0, 50, 50, '#ff0');
        intersec2.visible = false;

        width *= 0.6;
        document.querySelector('#canvas2').style['display'] = 'block';
        updateScreen();
        draw2();

        addLight(-75, 180, 200);
        addLight(75, -180, -200);

        window.addEventListener('keyup', e => {
            if (e.code != 'Space' || index != 2) return;

            scene.remove(target);
            scene.remove(intersec);
            scene2.remove(intersec2);

            draw2();

            target = new Sphere(0, 101, 0, 50, 32, '#66c', true, 0.7);
            intersec = new Circle(0, 0.1, 0, 50, 32, '#ff0');
            intersec.visible = false;
        });
    }),

    (function() {
        document.querySelector('#_3d').style.display = 'block';
        document.querySelector('#_3d').style.left = '';
        document.querySelector('#_3d').style.transform = 'translate(50%)';
        document.querySelector('#_3d').style.right = '20vw';

        document.querySelector('#_4d').style.display = 'block';

        plane = new Plane(0, 0, 0, 500, 400, '#fff');
        target = new Box(0, 101, 0, 100, 100, 100, '#66c', true, 0.7);
        intersec = new Plane(0, 0.1, 0, 100, 100, '#ff0', true, 0.7);
        intersec.visible = false;

        intersec2 = new Box2(0, 0, 0, 50, 50, 50, '#ff0', true, 0.7);
        camera2.position.set(0, 50, 100);

        width *= 0.6;
        document.querySelector('#canvas2').style['display'] = 'block';
        updateScreen();
        draw2();


        addLight(-75, 180, 200);
        addLight(75, -180, -200);


        window.addEventListener('keyup', e => {
            if (e.code != 'Space' || index != 3) return;

            scene.remove(target);
            scene.remove(intersec);

            target = new Sphere(0, 101, 0, 50, 32, '#66c', true, 0.7);
            intersec = new Circle(0, 0, 0, 50, 32, '#ff0');
            intersec.visible = false;

            scene2.remove(intersec2);
            intersec2 = new Sphere2(0, 0, 0, 50, 40, '#ff0', true, 0.7);

            draw2();
        });
    }),
]