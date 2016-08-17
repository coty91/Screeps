/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('common.actions');
 * mod.thing == 'a thing'; // true
 */

var commonActions = {
    wallHit: 3000,
    isSourceCrowded: function(source) {
        var walls = Game.spawns.Zodiac.room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_WALL }
        });
    },
    moveTo: function(creep, find, role) { 
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.work || creep.carry.energy == 0) {
            creep.memory.work = false;
             var sources = creep.room.find(find);
             this.isSourceCrowded(sources[0]);
             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(sources[0]);
             }
        } else {
            creep.memory.work = true;
            creep.memory.fillingExt = false;
        }
        if (creep.ticksToLive < 100 && !creep.memory.renewed) {
            creep.memory.role = 'harvester';
            this.renew(creep, role, [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], 'force');
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