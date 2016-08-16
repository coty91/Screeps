var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var common = require('common.actions');

module.exports.loop = function() {

    var roles = {
        'harvester': 2, 
        'upgrader': 2, 
        'builder': 8
    }

    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name]; 
        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
        }
    }
    
    for (var role in roles) {
        common.renew(creep, role, [WORK, CARRY, MOVE], roles[role]);
    }
    

};