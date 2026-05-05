const fs = require("fs");
const path = require("path");
const os = require("os");

const defaultData = {
  devices: [
    { id:"sw1", type:"switch", name:"Switch1", model:"Cisco 2960-24TT", x:300, y:200 },
    { id:"rt1", type:"router", name:"Router1", model:"Cisco 2911", x:520, y:180 },
    { id:"pc1", type:"pc", name:"PC1", model:"PC (Windows)", x:160, y:340 },
    { id:"pc2", type:"pc", name:"PC2", model:"PC (Windows)", x:320, y:360 },
  ],
  links: [
    { id:"l1", from:"pc1", to:"sw1" },
    { id:"l2", from:"pc2", to:"sw1" },
    { id:"l3", from:"sw1", to:"rt1" },
  ],
};

const load = () => {
  try {
    const FILE = path.join(__dirname, "topology.json");
    if (fs.existsSync(FILE)) {
      return JSON.parse(fs.readFileSync(FILE, "utf8"));
    }
  } catch(e) { console.error("Load error:", e); }
  return defaultData;
};

const save = (data, fileName) => {
  try {
    const name = fileName ? fileName.replace(/[^a-zA-Z0-9_-]/g, "_") : "topology";
    const desktop = path.join(os.homedir(), "Desktop");
   const FILE = path.join(desktop, name + ".ciscolab");
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
    console.log("Saved to:", FILE);
    return true;
  } catch(e) {
    console.error("Save error:", e);
    return false;
  }
};

module.exports = { load, save };