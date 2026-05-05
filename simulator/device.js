const createDevice = () => ({
  hostname: "Switch1",
  mode: "privileged",
  currentInterface: null,
  interfaces: {
    "GigabitEthernet0/0": { status:"up", protocol:"up", ip:"192.168.1.1", mask:"255.255.255.0", speed:"1000Mb/s" },
    "GigabitEthernet0/1": { status:"down", protocol:"down", ip:"unassigned", mask:null, speed:"auto" },
    "GigabitEthernet0/2": { status:"down", protocol:"down", ip:"unassigned", mask:null, speed:"auto" },
    "GigabitEthernet0/3": { status:"up", protocol:"up", ip:"10.0.0.1", mask:"255.255.255.0", speed:"100Mb/s" },
    "Vlan1": { status:"up", protocol:"up", ip:"192.168.100.1", mask:"255.255.255.0", speed:"auto" },
  },
  vlanTable: {
    1: { name:"default", status:"active", ports:["Gi0/0","Gi0/1","Gi0/2","Gi0/3"] },
    10: { name:"Management", status:"active", ports:[] },
    20: { name:"Sales", status:"active", ports:[] },
  },
});
module.exports = { createDevice };
