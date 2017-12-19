var utilsController = {
    cleanNonExistingcreep: function(infos) {
        for(var name in infos['memory']['creeps']) {
            if(!infos['creeps'][name]) {
                delete infos['memory']['creeps'][name];
            }
        }
    },

    getCpuLimitReached: function (infos) {
        if(infos['cpuUsed'] > infos['cpuLimit'] * 0.80) {
            return true;
        } else {
            return false;
        }
    },
	
	getMostAdvancedConstructionSite: function(construtionSites){
		var bestConstrutionSite= construtionSites[0];
		for (constructionSite in construtionSites){
			if((construtionSites[constructionSite].progress/construtionSites[constructionSite].progressTotal)>(bestConstrutionSite.progress/bestConstrutionSite.progressTotal))
				bestConstrutionSite=construtionSites[constructionSite];
		}
		return bestConstrutionSite;
	},
	
	getMostAdvancedStructureToRepair: function(structuresToRepair){
		var bestStructureToRepair= structuresToRepair[0];
		for (structureToRepair in structuresToRepair){
			if((structuresToRepair[structureToRepair].hits/structuresToRepair[structureToRepair].hitsMax)>(bestStructureToRepair.hits/bestStructureToRepair.hitsMax))
				bestStructureToRepair=structuresToRepair[structureToRepair];
		}
		return bestStructureToRepair;
	}

};

module.exports = utilsController;