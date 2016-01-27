export default class CannonBodyEditor {

  tbody: HTMLTableSectionElement;
  fields: { [name: string]: HTMLInputElement|HTMLSelectElement };
  projectClient: SupClient.ProjectClient;
  editConfig: any;
  orientationRow: SupClient.table.RowParts;
  halfSizeRow: SupClient.table.RowParts;
  radiusRow: SupClient.table.RowParts;
  heightRow: SupClient.table.RowParts;
  segmentsRow: SupClient.table.RowParts;

  constructor(tbody: HTMLTableSectionElement, config: any, projectClient: SupClient.ProjectClient, editConfig: any) {
    this.projectClient = projectClient;
    this.editConfig = editConfig;
    this.tbody = tbody;
    this.fields = {};
    let massRow = SupClient.table.appendRow(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.mass"));
    this.fields["mass"] = SupClient.table.appendNumberField(massRow.valueCell, config.mass, { min: 0 });
    this.fields["mass"].addEventListener(
      "change", (event) => {
        this.editConfig("setProperty", "mass", parseFloat((<HTMLInputElement>event.target).value));
      });

    let fixedRotationRow = SupClient.table.appendRow(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.fixedRotation"));
    this.fields["fixedRotation"] = SupClient.table.appendBooleanField(fixedRotationRow.valueCell, config.fixedRotation);
    this.fields["fixedRotation"].addEventListener("click", (event) => {
      this.editConfig("setProperty", "fixedRotation", (<HTMLInputElement>event.target).checked);
    });

    SupClient.table.appendHeader(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.shape"));
    let shapeTypeRow = SupClient.table.appendRow(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.shapeType"));
    this.fields["shape"] = SupClient.table.appendSelectBox(shapeTypeRow.valueCell, {
      "box": SupClient.i18n.t("componentEditors:CannonBody.shapeOptions.box"),
      "sphere": SupClient.i18n.t("componentEditors:CannonBody.shapeOptions.sphere"),
      "cylinder": SupClient.i18n.t("componentEditors:CannonBody.shapeOptions.cylinder")
    });
    this.fields["shape"].value = config.shape;
    this.fields["shape"].addEventListener("change", (event) => {
      this.editConfig("setProperty", "shape", (<HTMLInputElement>event.target).value);
    });

    let offsetRow = SupClient.table.appendRow(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.offset"));
    let offsetFields = SupClient.table.appendNumberFields(offsetRow.valueCell, [ config.offset.x, config.offset.y, config.offset.z ]);
    this.fields["offset.x"] = offsetFields[0];
    this.fields["offset.y"] = offsetFields[1];
    this.fields["offset.z"] = offsetFields[2];
    this.fields["offset.x"].addEventListener("change", (event) => {
        this.editConfig("setProperty", "offset.x", parseFloat((<HTMLInputElement>event.target).value));
    });
    this.fields["offset.y"].addEventListener("change", (event) => {
        this.editConfig("setProperty", "offset.y", parseFloat((<HTMLInputElement>event.target).value));
    });
    this.fields["offset.z"].addEventListener("change", (event) => {
        this.editConfig("setProperty", "offset.z", parseFloat((<HTMLInputElement>event.target).value));
    });

    this.orientationRow = SupClient.table.appendRow(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.orientation"));
    let orientationFields = SupClient.table.appendNumberFields(this.orientationRow.valueCell, [ config.orientation.x, config.orientation.y, config.orientation.z ], { min: -360, max: 360 });
    this.fields["orientation.x"] = orientationFields[0];
    this.fields["orientation.y"] = orientationFields[1];
    this.fields["orientation.z"] = orientationFields[2];
    this.fields["orientation.x"].addEventListener("change", (event) => {
        this.editConfig("setProperty", "orientation.x", parseFloat((<HTMLInputElement>event.target).value));
    });
    this.fields["orientation.y"].addEventListener("change", (event) => {
      this.editConfig("setProperty", "orientation.y", parseFloat((<HTMLInputElement>event.target).value));
    });
    this.fields["orientation.z"].addEventListener("change", (event) => {
      this.editConfig("setProperty", "orientation.z", parseFloat((<HTMLInputElement>event.target).value));
    });

    // Box
    this.halfSizeRow = SupClient.table.appendRow(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.halfSize"));
    let halfSizeFields = SupClient.table.appendNumberFields(this.halfSizeRow.valueCell, [ config.halfSize.x, config.halfSize.y, config.halfSize.z ], { min: 0 });
    this.fields["halfSize.x"] = halfSizeFields[0];
    this.fields["halfSize.y"] = halfSizeFields[1];
    this.fields["halfSize.z"] = halfSizeFields[2];
    this.fields["halfSize.x"].addEventListener("change", (event) => {
        this.editConfig("setProperty", "halfSize.x", parseFloat((<HTMLInputElement>event.target).value));
    });
    this.fields["halfSize.y"].addEventListener("change", (event) => {
      this.editConfig("setProperty", "halfSize.y", parseFloat((<HTMLInputElement>event.target).value));
    });
    this.fields["halfSize.z"].addEventListener("change", (event) => {
      this.editConfig("setProperty", "halfSize.z", parseFloat((<HTMLInputElement>event.target).value));
    });

    // Sphere / Cylinder
    this.radiusRow = SupClient.table.appendRow(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.radius"));
    this.fields["radius"] = SupClient.table.appendNumberField(this.radiusRow.valueCell, config.radius, { min: 0 });
    this.fields["radius"].addEventListener("change", (event) => {
      this.editConfig("setProperty", "radius", parseFloat((<HTMLInputElement>event.target).value));
    });

    this.heightRow = SupClient.table.appendRow(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.height"));
    this.fields["height"] = SupClient.table.appendNumberField(this.heightRow.valueCell, config.height, { min: 0 });
    this.fields["height"].addEventListener("change", (event) => {
      this.editConfig("setProperty", "height", parseFloat((<HTMLInputElement>event.target).value));
    });

    this.segmentsRow = SupClient.table.appendRow(this.tbody, SupClient.i18n.t("componentEditors:CannonBody.segments"));
    this.fields["segments"] = SupClient.table.appendNumberField(this.segmentsRow.valueCell, config.segments, { min: 3 });
    this.fields["segments"].addEventListener("change", (event) => {
      this.editConfig("setProperty", "segments", parseInt((<HTMLInputElement>event.target).value));
    });

    this.updateShapeInput(config.shape);
  }

  updateShapeInput(shape: string) {
    switch (shape) {
      case "box":
        this.orientationRow.row.hidden = false;
        this.halfSizeRow.row.hidden = false;
        this.radiusRow.row.hidden = true;
        this.heightRow.row.hidden = true;
        this.segmentsRow.row.hidden = true;
        break;
      case "sphere":
        this.orientationRow.row.hidden = true;
        this.halfSizeRow.row.hidden = true;
        this.radiusRow.row.hidden = false;
        this.heightRow.row.hidden = true;
        this.segmentsRow.row.hidden = true;
        break;
      case "cylinder":
        this.orientationRow.row.hidden = false;
        this.halfSizeRow.row.hidden = true;
        this.radiusRow.row.hidden = false;
        this.heightRow.row.hidden = false;
        this.segmentsRow.row.hidden = false;
        break;
    }
  }

  destroy() { /* Nothing to do here */ }

  config_setProperty(path: string, value: any) {
    if (path === "fixedRotation") (<HTMLInputElement>this.fields["fixedRotation"]).checked = value;
    else this.fields[path].value = value;

    if (path === "shape") this.updateShapeInput(value);
  }
}
