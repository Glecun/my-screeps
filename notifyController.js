var notifyController = {

    run: function(infos) {
		this.notifyIfAttacked(infos);
	},
	
	notifyIfAttacked: function(infos) {
		var hostiles = infos['spawn']['room']['room'].find(FIND_HOSTILE_CREEPS);
		var attackers = [];
		for (hostile in hostiles) {
			if (!(hostiles[hostile].id in attackers)){
			    if( hostiles[hostile].owner.username!='Invader')
				    attackers.push(hostiles[hostile].owner.username);
			}
		}
		if (Memory.notifyMailNbHostiles != attackers.length){
    	    Memory.notifyMailNbHostiles = attackers.length;
		    if (attackers.length!=0){
    		    var msg ="WARNING - You are attacked by "+attackers.length.toString()+" ennemies:";
    			for (attacker in attackers) {
    				msg=msg+"<br> - "+attackers[attacker];
    			}
    			Game.notify(msg);
		    }
		}
	}
	
};

module.exports = notifyController;