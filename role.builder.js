/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var common = require('common.actions');

var roleBuilder = {
    run: function(creep) {
        common.moveTo(creep, FIND_SOURCES, 'builder'); 
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
    }
}

module.exports = roleBuilder;