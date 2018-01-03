var roleCommon = require('role.roleCommon');

var roleClaimer = {

    run: function(creep,infos) {
		var flagsClaim = _.filter( infos['flags'], (aFlag) => aFlag.color == COLOR_GREEN);
		
        this.getDecision(creep,flagsClaim);
        this.action(creep,infos['spawn']['spawn'],flagsClaim);
    },

    getDecision: function(creep,flagsClaim){
		if(creep.memory.decision!='standBy' && flagsClaim.length==0){
		    creep.memory.decision = 'standBy';
            creep.say('✋ standBy');
			return;
		}
		if (creep.memory.decision!='claim' && flagsClaim.length>0){
		    creep.memory.decision = 'claim';
            creep.say('🏁 claim');
			return;
		}
    },

    action: function(creep,mySpawn,flagsClaim){
		if (creep.memory.decision=='claim') {
		    if(flagsClaim[0].room==null) {
		        roleCommon.flagMove(creep,flagsClaim);
		    } else {
                if(creep.claimController(flagsClaim[0].room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(flagsClaim[0].room.controller);
                }
            }
		}

		if (creep.memory.decision=='standBy') {
			roleCommon.standBy(creep,mySpawn.pos.x - 3, mySpawn.pos.y, mySpawn.room.name);
		}
    }
};

module.exports = roleClaimer;