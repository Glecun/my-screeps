var rolesSpawnPercent = {
    harvester:40,
    upgrader:20,
    builder:20,
	guard:10,
	attacker:10
};

var rolesLevelCrisis = {
    harvester:{
        "200":[WORK,CARRY,MOVE],
        "350":[WORK,WORK,CARRY,CARRY,MOVE]
    },
    upgrader:{
       "200":[WORK,CARRY,MOVE],
        "350":[WORK,WORK,CARRY,CARRY,MOVE],
        "450":[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]
    },
    builder:{
       "200":[WORK,CARRY,MOVE],
        "350":[WORK,WORK,CARRY,CARRY,MOVE],
        "450":[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]
    },
	guard:{
        "250":[RANGED_ATTACK,MOVE,MOVE]
    },
	attacker:{
        "250":[RANGED_ATTACK,MOVE,MOVE]
    },

};

var rolesLevel = {
    harvester:{
        "200":[WORK,CARRY,MOVE],
        "350":[WORK,WORK,CARRY,CARRY,MOVE],
        "450":[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
        "550":[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
        "650":[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        "750":[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
		"850":[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
		"950":[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
    },
    upgrader:{
       "200":[WORK,CARRY,MOVE],
        "350":[WORK,WORK,CARRY,CARRY,MOVE],
        "450":[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
        "550":[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
        "650":[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        "750":[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
		"850":[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
		"950":[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
    },
    builder:{
       "200":[WORK,CARRY,MOVE],
        "350":[WORK,WORK,CARRY,CARRY,MOVE],
        "450":[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
        "550":[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
        "650":[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        "750":[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
		"850":[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
		"950":[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
    },
	guard:{
        "250":[RANGED_ATTACK,MOVE,MOVE],
        "400":[RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE],
        "550":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE],
        "600":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE],
        "650":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE],
		"700":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE],
		"850":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE]
    },
	attacker:{
        "250":[RANGED_ATTACK,MOVE,MOVE],
        "400":[RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE],
        "550":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE],
        "600":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE],
        "650":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE],
		"700":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE],
		"850":[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE]
    },

};

//Command to generate a claimer
//Game.spawns['Spawn'].spawnCreep([CLAIM, MOVE], 'Claimer1',{memory: {role: 'claimer'}});

var generatorController = {
    run: function(infos) {
        if(infos['cpuLimitReached']) {
			console.log('suicide');
            var whichRoleErase = this.getWhichRoleToCreateOrErase(infos,'erase');
            this.removeOlderCreep(infos,whichRoleErase);
        } else {
            var whichRoleCreate = this.getWhichRoleToCreateOrErase(infos,'create');
            if(infos['mode']=='crisis') whichRoleCreate='harvester';
            this.createCreep(whichRoleCreate,infos);
            this.infoIfSpawning(infos);
        }

    },

    getWhichRoleToCreateOrErase: function (infos,createOrErase) {

        var nbCreeps = Object.keys(infos['spawn']['room']['creeps']).length;
        if (nbCreeps==0) nbCreeps=1; // prevent division by zero

        var rolesNbTab =  {};
        for ( aRole in rolesSpawnPercent){
            rolesNbTab[aRole] = _.filter(infos['spawn']['room']['creeps'], (aCreep) => aCreep.memory.role == aRole).length;
        }

        var rolesValTab =  [];
        for ( aRole in rolesSpawnPercent) {
            rolesValTab[aRole] = rolesSpawnPercent[aRole] - ((rolesNbTab[aRole] / nbCreeps)*100);
        }
        if(createOrErase=='create')
            var theValue = Math.max.apply(null,Object.keys(rolesValTab).map(function(e) { return rolesValTab[e]; }))
        if(createOrErase=='erase')
            var theValue = Math.min.apply(null,Object.keys(rolesValTab).map(function(e) { return rolesValTab[e]; }))
        var whichRoleCreate = _.get(  _.invert( rolesValTab ), theValue, false );

        return whichRoleCreate;
    },

    createCreep: function(role,infos){
        var newName = role + infos['time'];
        var arrayBoost = this.getBestCreepToCreate(role,infos);
        infos['spawn']['spawn'].spawnCreep(arrayBoost, newName,
            {memory: {role: role}});
    },

    removeOlderCreep:function(infos,aRole){
        var creepsRole = _.filter(infos['spawn']['room']['creeps'], (aCreep) => aCreep.memory.role == aRole);
        console.log(creepsRole[0].name);
        creepsRole[0].suicide();
    },


    infoIfSpawning: function (infos) {
        if(infos['spawn']['spawn'].spawning) {
            var spawningCreep = infos['creeps'][infos['spawn']['spawn'].spawning.name];
            infos['spawn']['spawn'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                infos['spawn']['spawn'].pos.x + 1,
                infos['spawn']['spawn'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    },

    getBestCreepToCreate:function(role,infos){
        var energyMaxAvailable = infos['spawn']['room']['energyCapacityAvailable'];
        var arrayToReturn ;
        var rolesLevelUsed = null;
        if(infos['mode']!='crisis')
            rolesLevelUsed=rolesLevel;
        else
            rolesLevelUsed=rolesLevelCrisis;
        for (energyTaken in rolesLevelUsed[role] ){
			if (infos['spawn']['room']['creeps'].length==0){ return rolesLevelUsed[role][energyTaken];}
			
            if(energyTaken<=energyMaxAvailable){
                arrayToReturn = rolesLevelUsed[role][energyTaken];
            } else {
                break;
			}
        }
        return arrayToReturn;
    }

};

module.exports = generatorController;