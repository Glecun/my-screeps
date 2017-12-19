var simpleTower = require('tower.simpleTower');

var towerController = {

    run: function(infos) {

        var towers = infos['spawn']['room']['towers']

        for (var towerIterator = 0; towerIterator < towers.length; towerIterator++) {
            simpleTower.run(towers[towerIterator]);
        }

    }
};

module.exports = towerController;