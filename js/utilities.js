const createCube = (width, height, depth, color = Math.random() * 0xffffff) => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshPhongMaterial({ color: color })
  );
  return cube;
};
