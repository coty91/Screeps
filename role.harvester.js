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
    }
};
 
module.exports = roleHarvester;