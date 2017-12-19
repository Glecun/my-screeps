var roleCommon = {

    transfer : function(creep,infos){
        var extensionsAndSpawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: function(structure) {
                return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
            }
        });
	    var turrets = _.filter(infos['spawn']['room']['towers'], (aTower) => aTower.energy < aTower.energyCapacity);
		var targets = null; 
		if(infos['mode']=='crisis') {
		    turrets.unshift(extensionsAndSpawn);
		    targets = turrets;
		} else{ 
		    targets = turrets.concat(extensionsAndSpawn);
		}
		
		var creepCarryMinerals =  _.filter(Object.keys(creep.carry), (aResource) => aResource!=RESOURCE_ENERGY);
		if(creepCarryMinerals.length>0 && infos['spawn']['room']['containers'].length>0){
		    for(var resourceType in creepCarryMinerals) {
                if(creep.transfer(infos['spawn']['room']['containers'][0], creepCarryMinerals[resourceType]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(infos['spawn']['room']['containers'][0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
		}
		else if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    },

    harvest: function (creep,infos) {
        var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        if(source!=null) {
            if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else{
            source = _.filter(infos['spawn']['room']['towers'], (aTower) => aTower.energy > (aTower.energyCapacity/2));
            if (source[0]!=null && infos['mode']=='crisis'){
                if(creep.withdraw(source[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source[0]);
                }
            } else {
                source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    },

	flagAttack: function(creep,flagsAttack){
		var structures = flagsAttack[0].pos.lookFor(LOOK_STRUCTURES);
		var creeps = flagsAttack[0].pos.lookFor(LOOK_CREEPS);
		var sources = flagsAttack[0].pos.lookFor(LOOK_SOURCES);
		var found = creeps.concat(structures).concat(sources);
		if (found.length>0){
			if(creep.rangedAttack(found[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(found[0]);
			}
		} else {
			flagsAttack[0].remove();
		}
	},
	
	flagMove: function (creep, flagsMove) {
		creep.moveTo(flagsMove[0]);
	},
	
	standBy: function (creep,x,y,roomName) {
		creep.moveTo(new RoomPosition(x,y,roomName));
	},
	
	attack: function(creep,target){
		if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
			creep.moveTo(target);
		}
	}
}
module.exports = roleCommon;