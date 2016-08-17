var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWarrior = require('role.warrior');
var common = require('common.actions');

module.exports.loop = function() {

    var roles = {
        'warrior': 3,
        'builder': 3,
        'repairer': 3,
        'upgrader': 2, 
        'harvester': 2
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
            case 'repairer':
                roleRepairer.run(creep);
                break;
            case 'warrior':
                roleWarrior.run(creep);
                break;
                
        }
    }
    
    for (var role in roles) {
        if (role != 'warrior') {
            common.renew(creep, role, [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], roles[role]);
        } else {
            common.renew(creep, role, [ATTACK, ATTACK, ATTACK, RANGED_ATTACK,MOVE,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH], roles[role]);
        }
    }
    

};