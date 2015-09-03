;(function(){
  'use strict';

  var rootLayerSets   = activeDocument.layerSets,
      removeLayerSets = [];

  if(!rootLayerSets){
    return;
  }

  checkLayers(rootLayerSets);

  for (var i = 0, len = removeLayerSets.length; i < len; i ++) {
    if( !!removeLayerSets[i] ){
      removeLayerSets[i].remove();
    }
  }


  function checkLayers (_layerSets) {

    var flg = false;

    for(var i = 0, len = _layerSets.length; i < len; i ++){

      if( _layerSets[i].layers.length === 0 ){
        removeLayerSets.push(_layerSets[i]);
        flg = true;
      } else if( _layerSets[i].layerSets.length !== 0 && checkLayers(_layerSets[i].layerSets) ){
        removeLayerSets.push(_layerSets[i]);
      } else {
        if( _layerSets[i].artLayers.length !== 0 ){
          flg = false;
        } else {
          checkLayers(_layerSets[i].layerSets);
        }
      }
    }

    return flg;
  }
})();