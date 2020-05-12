let tessPoints = [];
let first = true;

class Tesseract {
  constructor() {
    this.points = [
      new P4Vector(-1, -1, -1, 1),
      new P4Vector(1, -1, -1, 1),
      new P4Vector(1, 1, -1, 1),
      new P4Vector(-1, 1, -1, 1),
      new P4Vector(-1, -1, 1, 1),
      new P4Vector(1, -1, 1, 1),
      new P4Vector(1, 1, 1, 1),
      new P4Vector(-1, 1, 1, 1),
      new P4Vector(-1, -1, -1, -1),
      new P4Vector(1, -1, -1, -1),
      new P4Vector(1, 1, -1, -1),
      new P4Vector(-1, 1, -1, -1),
      new P4Vector(-1, -1, 1, -1),
      new P4Vector(1, -1, 1, -1),
      new P4Vector(1, 1, 1, -1),
      new P4Vector(-1, 1, 1, -1)
    ];
  }

  go(size, angle, pW, lW) {
    let projected3d = [];

    for (let i = 0; i < this.points.length; i++) {
      const v = this.points[i];

      const rotationXY = [
        [ Math.cos(angle), -Math.sin(angle), 0, 0 ],
        [ Math.sin(angle), Math.cos(angle), 0, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 0, 1 ]
      ];

      const rotationZW = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, Math.cos(angle), -Math.sin(angle)],
        [0, 0, Math.sin(angle), Math.cos(angle)]
      ];

      let rotated = matmul(rotationZW, matmul(rotationXY, v));

      let distance = 2;
      let w = 1 / (distance - rotated.w);

      const projection = [
        [w, 0, 0, 0],
        [0, w, 0, 0],
        [0, 0, w, 0]
      ];

      let projected = matmul(projection, rotated);
      projected.multiplyScalar(size / 8);
      projected3d[i] = projected;


      if(tessPoints.length != this.points.length) {
        tessPoints.push(new Sphere(
          projected.x,
          projected.y,
          projected.z,
          pW,
          10,
          '#66c',
          true,
          0.6
        ));
      }

      tessPoints[i].OBJ.position.set(
        projected.x,
        projected.y,
        projected.z
      );
    }
    


    // Connecting
    if(!first) return;
    lines.forEach(line => scene.remove(line));
    lines = [];

    for (let i = 0; i < 4; i++) {
      this.connect(0, i, (i + 1) % 4, projected3d, lW);
      this.connect(0, i + 4, ((i + 1) % 4) + 4, projected3d, lW);
      this.connect(0, i, i + 4, projected3d, lW);

      this.connect(8, i, (i + 1) % 4, projected3d, lW);
      this.connect(8, i + 4, ((i + 1) % 4) + 4, projected3d, lW);
      this.connect(8, i, i + 4, projected3d, lW);
    }

    for (let i = 0; i < 8; i++) {
      this.connect(0, i, i + 8, projected3d, lW);
    }

    first = false;
  }


  connect(offset, i, j, points, lW) {
    spheres[i + offset].connect(spheres[j + offset]);
  }
}
