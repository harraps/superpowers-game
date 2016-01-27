import CannonBodyMarker from "./CannonBodyMarker";

export default class CannonBodyMarkerUpdater {
  client: SupClient.ProjectClient;
  bodyRenderer: CannonBodyMarker;
  config: any;

  constructor(client: SupClient.ProjectClient, bodyRenderer: CannonBodyMarker, config: any) {
    this.client = client;
    this.bodyRenderer = bodyRenderer;
    this.config = config;

    switch (this.config.shape) {
      case "box" :
        this.bodyRenderer.setBox(this.config.orientation, this.config.halfSize);
        break;
      case "sphere" :
        this.bodyRenderer.setSphere(this.config.radius);
        break;
      case"cylinder":
        this.bodyRenderer.setCylinder(this.config.orientation, this.config.radius, this.config.height, this.config.segments);
        break;
    }
    this.bodyRenderer.setOffset(this.config.offset);
  }

  destroy() { /* Ignore */ }

  config_setProperty(path: string, value: any) {
    if ((path.indexOf("orientation") !== -1 && this.config.shape === "box") ||path.indexOf("halfSize") !== -1 || (path === "shape" && value === "box")) {
      this.bodyRenderer.setBox(this.config.orientation, this.config.halfSize);
      this.bodyRenderer.setOffset(this.config.offset);
    }

    if (path.indexOf("offset") !== -1) {
      this.bodyRenderer.setOffset(this.config.offset);
    }

    if ((path.indexOf("orientation") !== -1 && this.config.shape === "cylinder") || (path === "radius" && this.config.shape === "cylinder") || (path === "shape" && value === "cylinder") || path === "height" || path === "segments") {
      this.bodyRenderer.setCylinder(this.config.orientation, this.config.radius, this.config.height, this.config.segments);
      this.bodyRenderer.setOffset(this.config.offset);
    }

    if ((path === "radius" && this.config.shape === "sphere") || (path === "shape" && value === "sphere")) {
      this.bodyRenderer.setSphere(this.config.radius);
      this.bodyRenderer.setOffset(this.config.offset);
    }
  }
}
