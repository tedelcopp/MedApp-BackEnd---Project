import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import process from "process";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "../config/config.json");
const configFile = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = {};

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== path.basename(__filename) &&
    file.slice(-3) === ".js" &&
    !file.includes(".test.js")
  );
});

for (const file of files) {
  const moduleURL = pathToFileURL(path.join(__dirname, file)).href;
  const module = await import(moduleURL);

  const model = module.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}
db.Patient.hasMany(db.Shift);

db.Shift.belongsTo(db.Patient, {
  foreignKey: "patientId",
  as: "PatientData",
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export const {
  Patient,
  Shift,
  sequelize: sequelizeInstance,
  Sequelize: SequelizeClass,
} = db;
