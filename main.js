var roleController = require('role.roleController');
var towerController = require('tower.towerController');
var utilsController = require('utils.utilsController');
var generatorController = require('generator.generatorController');
var infosController = require('infosController');
var modeController = require('modeController');
var notifyController = require('notifyController');

module.exports.loop = function () {
	var infos = infosController.getInfos();
	
	for(var mySpawnIndex in Game.spawns){
		
		infos['spawn'] = infosController.getInfosSpawn(Game.spawns[mySpawnIndex]);
		infos['mode'] = modeController.getMode(infos);

		notifyController.run(infos);
		
		utilsController.cleanNonExistingcreep(infos);

		generatorController.run(infos);

		towerController.run(infos);

		roleController.run(infos);

		infos['cpuLimitReached'] = utilsController.getCpuLimitReached(infos);
	}
}