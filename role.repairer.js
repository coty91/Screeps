/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
 
var common = require('common.actions');

var roleUpgrader = {
    run: function(creep) {
        common.moveTo(creep, FIND_SOURCES, 'repairer');
        var walls = Game.spawns.Zodiac.room.find(FIND_STRUCTURES, {
            filter: (structure) => { return (structure.structureType == STRUCTURE_WALL) },
            filter: (structure) => { return (structure.hits < 3000) }
        }); 
        var error = creep.repair(walls[0]);
        if(error == ERR_NOT_IN_RANGE){
            creep.moveTo(walls[0]);
        }
    }
};

module.exports = roleUpgrader;