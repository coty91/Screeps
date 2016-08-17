/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
 
var common = require('common.actions');

var roleHarvester = {
    run: function(creep) {
        common.moveTo(creep, FIND_SOURCES, 'harvester');
        if(Game.spawns.Zodiac.energy < Game.spawns.Zodiac.energyCapacity) {
            if (creep.transfer(Game.spawns['Zodiac'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Zodiac']);
            }
        } else {
            var exts = Game.spawns.Zodiac.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION) },
                filter: (structure) => { return (structure.energy < structure.energyCapacity) }
            });
            var error = creep.transfer(exts[0], RESOURCE_ENERGY);
            if(error == ERR_NOT_IN_RANGE){
                creep.moveTo(exts[0]);
            }
        }
    }
};
 
module.exports = roleHarvester;