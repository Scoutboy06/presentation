
let width2 = window.innerWidth * 0.4,
    height2 = window.innerHeight;

let scene2,
    camera2,
    renderer2,
    controls2;

let intersec2, box2, sphere2;

function setup2() {
    scene2 = new THREE.Scene({ antialias: true });
    camera2 = new THREE.PerspectiveCamera(75, width2 / height2, 0.1, 2000);
    camera2.position.set(0, 0, 150);

    renderer2 = new THREE.WebGLRenderer();
    renderer2.setSize(width2, height2);

    renderer2.domElement.id = 'canvas2';
    renderer2.domElement.style = 'display: none;'

    document.body.appendChild(renderer2.domElement);


    controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
    controls2.enableDamping = true;
    controls2.dampingFactor = 0.1;
    controls2.enableZoom = true;
    controls2.enableKeys = false;



    let light = new THREE.DirectionalLight('#fff', 1);
    light.position.set(-75, 180, 200);
    scene2.add(light);

    light = new THREE.DirectionalLight('#fff', 1);
    light.position.set(75, -180, -200);
    scene2.add(light);

    draw2();
}



function draw2(r = null) {
    if(index == 2) {
        if(intersec.visible == true) {
            if((target.OBJ || target).type == 'Sphere') {
                if(intersec2) scene2.remove(intersec2);
                intersec2 = new Circle2(0, 0, 0, r, 50, '#ff0', true, 0.7);
            }

            else if((target.OBJ || target).type == 'Box') {
                intersec2.visible = true;
            }
        }
        else {
            if(intersec2) intersec2.visible = false;
        }
    }

    else if(index == 3) {
        if((target.OBJ || target).type == 'Sphere') {
            if(intersec.visible == true) {
                // if(intersec2) scene2.remove(intersec2);
                // intersec2 = new Sphere2(0, 0, 0, r, Math.max(r-10, 0), '#ff0', true, 0.7);
                intersec2.visible = true;
                let s = r / 50;
                intersec2.scale.set(s, s, s);
            }
            else {
                // if(intersec2) scene2.remove(intersec2);
                intersec2.visible = false;
            }
        }

        else if((target.OBJ || target).type == 'Box') {
            if(intersec.visible == true) {
                intersec2.visible = true;
            }

            else {
                intersec2.visible = false;
            }
        }
    }

    

    controls2.update();
    renderer2.render(scene2, camera2);
    // requestAnimationFrame(draw2);
}