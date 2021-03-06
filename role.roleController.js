var roles = {
    harvester:require('role.harvester'),
    upgrader:require('role.upgrader'),
    builder:require('role.builder'),
	guard:require('role.guard'),
	attacker:require('role.attacker'),
	claimer:require('role.claimer')
};

var roleController = {
    run : function(infos){
        for(var indexcreep in infos['spawn']['room']['creeps']) {
            var creep = infos['spawn']['room']['creeps'][indexcreep];
            if(infos['mode']=='crisis' && (creep.memory.role=='builder' || creep.memory.role=='upgrader'))
                roles['harvester'].run(creep,infos);
            else if (infos['mode']=='upgrade' && creep.memory.role=='builder')
				roles['upgrader'].run(creep,infos);
			else
				roles[creep.memory.role].run(creep,infos);
        }
    }
}
module.exports = roleController;