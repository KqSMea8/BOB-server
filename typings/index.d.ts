import "egg";
import "egg-sequelize";
import ExportDefault from "../../../app/io/controller/default";

declare module "egg" {
  interface CustomController {
    default: ExportDefault;
  }
}

declare module "*.json";
