let animating = [];


class Plane {
  constructor(x, y, z, width, height, color = '#fff', transparent = false, opacity = 1) {
    let OBJ = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(width, height),
      // new THREE.MeshBasicMaterial({
      new THREE.MeshPhongMaterial({
        color,
        side: THREE.DoubleSide,
        transparent
      })
    );
    OBJ.position.set(x, y, z);
    OBJ.rotation.set(PI / 2, 0, 0);

    OBJ.width = width;
    OBJ.height = height;
    OBJ.type = 'Plane';
    OBJ.material.opacity = opacity;

    scene.add(OBJ);

    return OBJ;
  }
}
class Plane2 {
    constructor(x, y, z, width, height, color = '#fff', transparent = false, opacity = 1) {
      let OBJ = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(width, height),
        // new THREE.MeshBasicMaterial({
        new THREE.MeshPhongMaterial({
          color,
          side: THREE.DoubleSide,
          transparent,
          opacity
        })
      );
      OBJ.position.set(x, y, z);
    //   OBJ.rotation.set(0, 0, 0);
  
      OBJ.width = width;
      OBJ.height = height;
      OBJ.type = 'Plane';
  
      scene2.add(OBJ);
  
      return OBJ;
    }
}



function addLight(...pos) {
  let light = new THREE.DirectionalLight('#fff', 1);
  light.position.set(...pos);
  scene.add(light);
  return light;
}



class Sphere {
  constructor(x, y, z, radius, segments = 16, color = '#66c', transparent = false, opacity = 1) {
    let OBJ = new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshPhongMaterial({
        color,
        opacity,
        transparent
      })
    );
    OBJ.position.set(x, y, z);

    OBJ.radius = radius;
    OBJ.type = 'Sphere';
    OBJ.material.opacity = opacity;

    scene.add(OBJ);

    this.OBJ = OBJ;

    return this;
  }

  setGoal(x, y, z, time, func) {
    this.goal = new THREE.Vector3(x, y, z);
    this.start = this.OBJ.position.clone();

    this.startTime = millis();
    this.goalTime = time;

    this.func = func;

    animating.push(this);
  }


  update() {
    if (!this.goal) {
        animating.splice(animating.indexOf(this), 1);
    }

    let prog = (millis() - this.startTime) / this.goalTime;

    if (prog >= 1) {
      animating.splice(animating.indexOf(this), 1);

      this.OBJ.position.set(this.goal.x, this.goal.y, this.goal.z);
      this.goal = null;
      this.start = null;
      this.startTime = null;
      this.goalTime = null;
      this.func = null;

      return;
    }

    prog = this.func(prog);

    let pos = new THREE.Vector3().subVectors(this.goal, this.start).multiplyScalar(prog).add(this.start);
    this.OBJ.position.set(pos.x, pos.y, pos.z);
  }
  
  
  
  connect(other) {
    
    var lineGeometry = new THREE.Geometry();

    lineGeometry.vertices.push(
        this.OBJ.position.clone().addScalar(100),
        other.OBJ.position.clone()
    );

    lineGeometry.verticesNeedUpdate = true;

    var lineMaterial = new THREE.LineBasicMaterial({
        color: '#666',
        linewidth: 3,
    });


    var line = new THREE.Line(lineGeometry, lineMaterial);
    line.targets = [this.OBJ, other.OBJ];

    lines.push(line);

    scene.add(line);
    
  }
}
class Sphere2 {
    constructor(x, y, z, radius, segments = 16, color = '#66c', transparent = false, opacity = 1) {
      let OBJ = new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshPhongMaterial({
          color,
          opacity,
          transparent
        })
      );
      OBJ.position.set(x, y, z);
  
      OBJ.radius = radius;
      OBJ.type = 'Sphere';
      OBJ.material.opacity = opacity;
  
      scene2.add(OBJ);
  
      return OBJ;
    }
  }



class Box {
  constructor(x, y, z, width, height, depth, color = 0xffffff, transparent = false, opacity = 1) {
    let OBJ = new THREE.Mesh(
      new THREE.BoxBufferGeometry(width, height, depth),
      new THREE.MeshLambertMaterial({
        color,
        opacity,
        transparent
      })
    );
    OBJ.position.set(x, y, z);

    OBJ.width = width;
    OBJ.height = height;
    OBJ.depth = depth;
    OBJ.type = 'Box';

    scene.add(OBJ);

    return OBJ;
  }
}
class Box2 {
    constructor(x, y, z, width, height, depth, color = 0xffffff, transparent = false, opacity = 1) {
      let OBJ = new THREE.Mesh(
        new THREE.BoxBufferGeometry(width, height, depth),
        new THREE.MeshLambertMaterial({
          color,
          opacity,
          transparent
        })
      );
      OBJ.position.set(x, y, z);
  
      OBJ.width = width;
      OBJ.height = height;
      OBJ.depth = depth;
      OBJ.type = 'Box';
  
      scene2.add(OBJ);
  
      return OBJ;
    }
}


class Circle {
  constructor(x, y, z, radius, segments = 32, color = '#fff', transparent = false, opacity = 1) {
    let OBJ = new THREE.Mesh(
      new THREE.CircleGeometry(
        radius,
        segments
      ),
      new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent,
        opacity
      })
    );
    OBJ.position.set(x, y, z);
    OBJ.rotation.set(-PI / 2, 0, 0);

    OBJ.radius = radius;
    OBJ.type = 'Circle';

    scene.add(OBJ);

    return OBJ;
  }
}
class Circle2 {
    constructor(x, y, z, radius, segments = 32, color = '#fff', transparent = false, opacity = 1) {
      let OBJ = new THREE.Mesh(
        new THREE.CircleGeometry(
          radius,
          segments
        ),
        new THREE.MeshBasicMaterial({
          color,
          side: THREE.DoubleSide,
          transparent,
          opacity
        })
      );
      OBJ.position.set(x, y, z);
  
      OBJ.radius = radius;
      OBJ.type = 'Circle';
  
      scene2.add(OBJ);
  
      return OBJ;
    }
  }
