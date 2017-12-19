var roleCommon = require('role.roleCommon');

var roleAttacker = {

    run: function(creep,infos) {
		var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS,{filter: function(c){return c.owner.username !== "Source Keeper";}});
		var flagsMove = _.filter( infos['flags'], (aFlag) => aFlag.color == COLOR_RED);
		var flagsAttack = _.filter( infos['flags'], (aFlag) => aFlag.color==COLOR_RED && aFlag.secondaryColor==COLOR_BLUE);
		
        this.getDecision(creep,target,flagsMove,flagsAttack);
        this.action(creep,infos['spawn']['spawn'],target,flagsMove,flagsAttack);
    },

    getDecision: function(creep,target,flagsMove,flagsAttack){
		if(creep.memory.decision!='standBy' && flagsMove.length==0 && flagsAttack.length<=0 && target==null || creep.memory.decision==null){
		    creep.memory.decision = 'standBy';
            creep.say('✋ standBy');
			return;
		}
		if (creep.memory.decision!='flagAttack' && flagsAttack.length>0){
		    creep.memory.decision = 'flagAttack';
            creep.say('🚩 flagAttack');
			return;
		}
        if((creep.memory.decision!='attack' && target!=null) && flagsAttack.length<=0) {
            creep.memory.decision = 'attack';
            creep.say('🔫 attack');
			return;
        }

		if ((creep.memory.decision!='flagMove' && flagsMove.length>0) && flagsAttack.length<=0 && target==null){
		    creep.memory.decision = 'flagMove';
            creep.say('🏁 flagMove');
			return;
		}
    },

    action: function(creep,mySpawn,target,flagsMove,flagsAttack){
        if (creep.memory.decision=='attack') {
			if(target!=null){
				roleCommon.attack(creep,target);
			} 
        }
		if (creep.memory.decision=='flagMove') {
			roleCommon.flagMove(creep,flagsMove);
		}
		if (creep.memory.decision=='flagAttack') {
			roleCommon.flagAttack(creep,flagsAttack);
		}
		if (creep.memory.decision=='standBy') {
			roleCommon.standBy(creep,mySpawn.pos.x - 3, mySpawn.pos.y, mySpawn.room.name);
		}
    }
};

module.exports = roleAttacker;