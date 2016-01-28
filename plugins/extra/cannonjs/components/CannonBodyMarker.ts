let THREE = SupEngine.THREE;

import CannonBodyMarkerUpdater from "./CannonBodyMarkerUpdater";

export default
class CannonBodyMarker extends SupEngine.ActorComponent {
  static Updater = CannonBodyMarkerUpdater;

  mesh: THREE.Mesh;

  constructor(actor: SupEngine.Actor) {
    super(actor, "CannonBodyMarker");
  }

  setIsLayerActive(active: boolean) { if (this.mesh != null) this.mesh.visible = active; }

  setBox(orientation: any, halfSize: any) {
    if (this.mesh != null) this._clearRenderer();
    let geometry = new THREE.BoxGeometry(halfSize.x * 2, halfSize.y * 2, halfSize.z * 2);
    let material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xf459e4, transparent: true, opacity: 0.2 });
    this.mesh = new THREE.Mesh(geometry, material);
    let radian = Math.PI/180;
    this.mesh.quaternion.setFromEuler(new THREE.Euler(orientation.x*radian, orientation.y*radian, orientation.z*radian));
    this.actor.threeObject.add(this.mesh);
    this.mesh.updateMatrixWorld(false);
  }
  setSphere(radius: number) {
    if (this.mesh != null) this._clearRenderer();
    let geometry = new THREE.SphereGeometry(radius);
    let material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xf459e4, transparent: true, opacity: 0.2 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.actor.threeObject.add(this.mesh);
    this.mesh.updateMatrixWorld(false);
  }
  setCylinder(orientation: any, radius: number, height: number, segments: number) {
    if (this.mesh != null) this._clearRenderer();
    let geometry = new THREE.CylinderGeometry(radius, radius, height, segments);
    let material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xf459e4, transparent: true, opacity: 0.2 });
    this.mesh = new THREE.Mesh(geometry, material);
    let radian = Math.PI/180;
    this.mesh.quaternion.setFromEuler(new THREE.Euler((orientation.x+90)*radian, orientation.y*radian, orientation.z*radian));
    this.actor.threeObject.add(this.mesh);
    this.mesh.updateMatrixWorld(false);
  }

  setOffset(offset: any) {
    this.mesh.position.copy(offset);
    this.mesh.updateMatrixWorld(false);
  }

  _clearRenderer() {
    this.actor.threeObject.remove(this.mesh);
    this.mesh.traverse((obj: any) => {
     if(obj.dispose != null) obj.dispose();
    });
    this.mesh = null;
  }

  _destroy() {
    if (this.mesh != null) this._clearRenderer();
    super._destroy();
  }
}
