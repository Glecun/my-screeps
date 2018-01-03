var infosController = {

    getInfos: function() {
		return {
						memory : {creeps:Memory.creeps},
						creeps : Game.creeps,
						cpuLimitReached : false,
						time : Game.time,
						cpuUsed : Game.cpu.getUsed(),
						cpuLimit : Game.cpu.limit,
						flags: Game.flags,
						spawnToBuild : _.filter(Game.constructionSites, (aConstructionSite) => aConstructionSite.structureType==STRUCTURE_SPAWN )
					};
	},

    getInfosSpawn: function(spawn) {
		return {
					spawn : spawn,
					room : { 
									room:spawn.room,
									creeps: spawn.room.find(FIND_MY_CREEPS),
									creepsNames:spawn.room.find(FIND_MY_CREEPS).map(creep => creep.name),
									energyCapacityAvailable: spawn.room.energyCapacityAvailable,
									towers: spawn.room.find(FIND_MY_STRUCTURES, {
																filter: (structure) => {
																	return structure.structureType == STRUCTURE_TOWER
																}
												}),
									flagBlueRed : spawn.room.find(FIND_FLAGS, {
										filter: function(object) {
											return object.color==COLOR_BLUE && object.secondaryColor==COLOR_RED;
										}
									}),
									flagBlueBlue : spawn.room.find(FIND_FLAGS, {
										filter: function(object) {
											return object.color==COLOR_BLUE && object.secondaryColor==COLOR_BLUE;
										}
									}),
									extensionsAndSpawn: spawn.room.find(FIND_STRUCTURES, {
												filter: (structure) => {
													return (structure.structureType == STRUCTURE_EXTENSION ||
														structure.structureType == STRUCTURE_SPAWN );
												}
									}),
									constructionSites : spawn.room.find(FIND_CONSTRUCTION_SITES),
									structuresToRepair : spawn.room.find(FIND_STRUCTURES),
							        containers : spawn.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType === STRUCTURE_CONTAINER })
								}
					};

    }
	
	
};

module.exports = infosController;