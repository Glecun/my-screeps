var roleCommon = require('role.roleCommon');
var utilsController = require('utils.utilsController');

var roleBuilder = {

    run: function(creep,infos) {
        var constructionSites = infos['spawn']['room']['constructionSites'];
        constructionSites = constructionSites.concat(infos['spawnToBuild']);
		var structuresToRepair = _.filter(infos['spawn']['room']['structuresToRepair'], (aStructure) => aStructure.hits < aStructure.hitsMax);
		
        this.getDecision(creep,constructionSites,structuresToRepair);
        this.action(creep,constructionSites,structuresToRepair,infos);
    },

    getDecision: function(creep,constructionSites,structuresToRepair){
        if(creep.memory.decision!='harvest' && creep.carry.energy == 0) {
			creep.memory.decision = 'harvest';
            creep.say('🔄 harvest');
            return;
        }

        if( (creep.memory.decision!='repair' && creep.memory.decision!='build' ) && _.sum(creep.carry) == creep.carryCapacity && (constructionSites.length>0 || structuresToRepair>0) ) {
			var constructionSite = null;
			if(constructionSites.length) 
					constructionSite = utilsController.getMostAdvancedConstructionSite(constructionSites);
			var structureToRepair = null;
			if(structuresToRepair.length) 
					structureToRepair = utilsController.getMostAdvancedStructureToRepair(structuresToRepair);
			
			if ( (structureToRepair==null && constructionSite!=null) || 
			     ( (constructionSite!=null && structureToRepair!=null) && (constructionSite.progress/constructionSite.progressTotal<structuresToRepair.hits/structuresToRepair.hitsTotal))) {
					creep.memory.decision = 'build';
					creep.say('🚧 build');
					return;
			} else {
					creep.memory.decision = 'repair';
					creep.say('🚧 repair');
					return;
			}					
        }
		
        if(creep.memory.decision!='repair' && creep.memory.decision!='build' && creep.memory.decision!='transfer' && _.sum(creep.carry) == creep.carryCapacity){
            creep.memory.decision = 'transfer';
            creep.say('🚚 transfer');
            return;
        }
		
		if(creep.memory.decision=='upgrade'){
			creep.memory.decision = 'harvest';
            creep.say('🔄 harvest');
            return;
		}
    },

    action: function(creep,constructionSites,structuresToRepair,infos){
        if (creep.memory.decision=='harvest') {
            roleCommon.harvest(creep,infos);
        }

        if (creep.memory.decision=='build') {
			var constructionSite = null;
			if (infos['spawnToBuild'].length>0)
			    constructionSite = infos['spawnToBuild'][0];
			else 
			    constructionSite = utilsController.getMostAdvancedConstructionSite(constructionSites);
            if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) 
                creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffffff'}});
			if (constructionSite==null || (constructionSite.progress==constructionSite.progressTotal)){
				creep.memory.decision = 'harvest';
                creep.say('🔄 harvest');
                return;
			}
        }
        if (creep.memory.decision=='repair') {
			var structureToRepair = utilsController.getMostAdvancedStructureToRepair(structuresToRepair);
			if (creep.repair(structureToRepair) == ERR_NOT_IN_RANGE) 
				creep.moveTo(structureToRepair, {visualizePathStyle: {stroke: '#ffffff'}});
			if (structureToRepair==null || (structureToRepair.hits==structureToRepair.hitsMax)){
				creep.memory.decision = 'harvest';
                creep.say('🔄 harvest');
                return;
			}
        }
        if (creep.memory.decision=='transfer') {
            roleCommon.transfer(creep);
        }
    }

};

module.exports = roleBuilder;