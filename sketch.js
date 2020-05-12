let PI = Math.PI;

let width = window.innerWidth,
    height = window.innerHeight;
    

let scene,
    camera,
    renderer,
    controls;

let planes = [1, 2, 3, 4];

let tessCount = 0;


function millis() {
  return new Date().getTime();
}


function setup() {
  scene = new THREE.Scene({ antialias: true });
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
  camera.position.set(0, 150, 400);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.enableZoom = true;
  controls.enableKeys = false;


  slides[0]();

  setup2();
  draw();
}
setup();








function draw() {

  if(animating.length > 0) {
    animating.forEach(obj => obj.update());
  }
  
  if(animateTess && tess) {
    tess.go(
      1200,
      tessCount,
      10
    );
    
    tessCount += 0.01;
  }

  
  if(lines.length > 0 && index == 1) {
    lines.forEach(line => {
      line.geometry.vertices = [
        line.targets[0].position.clone(),
        line.targets[1].position.clone()
      ];
      line.geometry.verticesNeedUpdate = true;
    });
  }
  

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
}


function checkObject() {
  if(!(target && intersec && plane)) return;

  if(target.type == 'Box') {
    if((target.position.y - target.height/2 <= plane.position.y)
    && (target.position.y + target.height/2 >= plane.position.y)) {
      intersec.visible = true;
    }
    else {
      intersec.visible = false;
    }
    draw2();
  }

  else if((target.OBJ || target).type == 'Sphere') {
    if((target.OBJ.position.y - target.OBJ.radius <= plane.position.y)
    && (target.OBJ.position.y + target.OBJ.radius >= plane.position.y)) {
      scene.remove(intersec);
      let r = Math.sqrt((target.OBJ.radius*target.OBJ.radius) - target.OBJ.position.y*target.OBJ.position.y) - 0.5;
      intersec = new Circle(target.OBJ.position.x, 0.1, target.OBJ.position.z, r, 32, '#ff0');

      draw2(r);
    }

    else if(intersec.visible) {
      intersec.visible = false;
      draw2();
    }
  }
}




window.addEventListener('keydown', e => {

  if(!(e.key == 'ArrowUp' || e.key == 'ArrowDown')) return;

  if(e.key == 'ArrowUp' && target) (target.OBJ || target).position.y += 3;
  else if(e.key == 'ArrowDown' && target) (target.OBJ || target).position.y -= 3;

  checkObject();
});




window.addEventListener('keyup', e => {
  if(e.key == 'ArrowLeft' && index > 0) slideChange(-1);
  else if(e.key == 'ArrowRight' && index < slides.length-1) slideChange(1);
  else if(e.keyCode == 49) camera.position.set(550, 0, 0);
});
window.addEventListener('resize', () => updateScreen());

function updateScreen() {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}



let easing = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t*t,
  // decelerating to zero velocity
  easeOutQuad: t => t*(2-t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
  // accelerating from zero velocity 
  easeInCubic: t => t*t*t,
  // decelerating to zero velocity 
  easeOutCubic: t => (--t)*t*t+1,
  // acceleration until halfway, then deceleration 
  easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  // accelerating from zero velocity 
  easeInQuart: t => t*t*t*t,
  // decelerating to zero velocity 
  easeOutQuart: t => 1-(--t)*t*t*t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
  // accelerating from zero velocity
  easeInQuint: t => t*t*t*t*t,
  // decelerating to zero velocity
  easeOutQuint: t => 1+(--t)*t*t*t*t,
  // acceleration until halfway, then deceleration 
  easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
}
