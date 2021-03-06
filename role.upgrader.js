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
        common.moveTo(creep, FIND_SOURCES, 'upgrader');
        if(creep.moveTo(18,22)==ERR_NOT_IN_RANGE) {
            creep.moveTo(18,22);
        } else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;