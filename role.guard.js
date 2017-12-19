var roleCommon = require('role.roleCommon');

var roleGuard = {

    run: function(creep,infos) {
		var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS,{filter: function(c){return c.owner.username !== "Source Keeper";}});
		var flagsAttack = infos['spawn']['room']['flagBlueRed'];
        var flagsMove = infos['spawn']['room']['flagBlueBlue'];
		
        this.getDecision(creep,target,flagsAttack,flagsMove);
        this.action(creep,infos['spawn']['spawn'],target,flagsAttack,flagsMove);
    },

    getDecision: function(creep,target,flagsAttack,flagsMove){
        if(creep.memory.decision!='guard' && (target!=null || ( flagsAttack.length==0 && flagsMove.length==0)  )) {
            creep.memory.decision = 'guard';
            creep.say('🛡️ guard');
			return;
        }
		if (creep.memory.decision!='flagAttack' && flagsAttack.length>0 && target==null){
		    creep.memory.decision = 'flagAttack';
            creep.say('🚩 flagAttack');
			return;
		}
        if (creep.memory.decision!='flagMove' && flagsMove.length>0 && target==null){
            creep.memory.decision = 'flagMove';
            creep.say('🏁 flagMove');
            return;
        }
    },

    action: function(creep,mySpawn,target,flagsAttack,flagsMove){
        if (creep.memory.decision=='guard') {
			if(target!=null){
				roleCommon.attack(creep,target);
			} else {
			    roleCommon.standBy(creep,mySpawn.pos.x , mySpawn.pos.y-3, mySpawn.room.name);
			}
        }
		if (creep.memory.decision=='flagAttack') {
			roleCommon.flagAttack(creep,flagsAttack);
		}
        if (creep.memory.decision=='flagMove') {
            roleCommon.flagMove(creep,flagsMove);
        }
    }
};

module.exports = roleGuard;