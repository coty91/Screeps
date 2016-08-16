/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('common.actions');
 * mod.thing == 'a thing'; // true
 */

var commonActions = {
    moveTo: function(creep, find, role) {
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.work || creep.carry.energy == 0) {
            creep.memory.work = false;
             var sources = creep.room.find(find);
             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(sources[0]);
             }
        } else {
            creep.memory.work = true;
            switch(role) {
                 case 'harvester':
                    switch(creep.transfer(Game.spawns['Zodiac'], RESOURCE_ENERGY)) {
                        case ERR_NOT_IN_RANGE:
                            creep.moveTo(Game.spawns['Zodiac']);
                            break;
                        case ERR_FULL:
                            creep.moveTo(32, 23);
                            break;
                    }
                    break;
                 case 'upgrader':
                    if(creep.moveTo(18,22)==ERR_NOT_IN_RANGE) {
                        creep.moveTo(18,22);
                    } else {
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    }
                    break;
                case 'builder':
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        switch (creep.build(targets[0])) {
                            case ERR_RCL_NOT_ENOUGH:
                                this.moveTo(creep, FIND_SOURCES, 'upgrader');
                                break;
                            case ERR_NOT_IN_RANGE:
                                creep.moveTo(targets[0]);
                                break;
                        }
                    }
                    break;
            }
        }
        if (creep.ticksToLive < 100 && !creep.memory.renewed) {
            creep.memory.role = 'harvester';
            this.renew(creep, role, [WORK,CARRY,MOVE], 'force');
        }
    },
    renew: function(creep, role, body, max) {
        var roleToRenew = _.filter(Game.creeps, (creep) => creep.memory.role == role)
        if (max == 'force' || roleToRenew.length < max) {
            var newCreep = Game.spawns['Zodiac'].createCreep(body, null, {role: role});
            if (max == 'force') {
                creep.memory.renewed = true;
            }
        }
    }
};

module.exports = commonActions;