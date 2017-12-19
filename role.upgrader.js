var roleCommon = require('role.roleCommon');

var roleUpgrader = {

    run: function(creep,infos) {
        this.getDecision(creep);
        this.action(creep,infos);
    },

    getDecision: function(creep){
        if(creep.memory.decision!='harvest' && creep.carry.energy == 0) {
            creep.memory.decision = 'harvest';
            creep.say('🔄 harvest');
        }
        if(creep.memory.decision!='upgrade' && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.decision = 'upgrade';
            creep.say('🆙 upgrade');
        }
		if(creep.memory.decision=='transfer' || creep.memory.decision=='repair' || creep.memory.decision=='build'){
			creep.memory.decision = 'harvest';
            creep.say('🔄 harvest');
            return;
		}
    },

    action: function(creep,infos){
        if (creep.memory.decision=='harvest') {
            roleCommon.harvest(creep,infos);
        }
        if (creep.memory.decision=='upgrade') {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }

};

module.exports = roleUpgrader;