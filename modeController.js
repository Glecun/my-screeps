var modeController = {

    getMode: function(infos) {
        
        if (Object.keys(infos['spawn']['room']['creeps']).length <= 7)
			return 'crisis';
		if (infos['spawn']['room']['constructionSites'].length >= 10)
			return 'build';
		if (infos['spawn']['room']['constructionSites'].length == 0)
			return 'upgrade';
		
		return 'normal';
	}
	
};

module.exports = modeController;