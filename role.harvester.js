var roleCommon = require('role.roleCommon');

var roleHarvester = {

    run: function(creep,infos) {
        this.getDecision(creep);
        this.action(creep,infos);
    },

    getDecision: function(creep){
        if(creep.memory.decision!='harvest' && creep.carry.energy == 0) {
            creep.memory.decision = 'harvest';
            creep.say('🔄 harvest');
        }
        if(creep.memory.decision!='transfer' && _.sum(creep.carry) == creep.carryCapacity){
            creep.memory.decision = 'transfer';
            creep.say('🚚 transfer');
        }
    },

    action: function(creep,infos){
        if (creep.memory.decision=='harvest') {
            roleCommon.harvest(creep,infos);
        }

        if (creep.memory.decision=='transfer') {
            roleCommon.transfer(creep,infos);
        }
    }
};

module.exports = roleHarvester;