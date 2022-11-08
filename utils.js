var highlightFeature = (function () {
  
  var feature = { 
    attributes:{
      ObjectId: -1 
    }
  };

  var pub = {};

  pub.queryFeatures = function(opts){
    const mappoint = opts.view.toMap(opts.evt)
    const query = {
      geometry: mappoint,
      returnGeometry: true,
      outFields: ["*"]
    };

    opts.lview.queryFeatures(query).then((response)=>{
      if(response.features.length > 0)
      {
        if(response.features[0].attributes.ObjectId != feature.attributes.ObjectId){
          opts.graphicsLayer.graphics.removeAll();
          feature = response.features[0];
          feature.symbol = {
            type: "simple-fill",
            color: "rgba(0, 255, 255, 1)",
            outline: null
          };
          opts.graphicsLayer.graphics.add(feature);
          feature.popupTemplate = {
            title:"{nom}",
            content:"Median income: {medianIncome2015}"               
          }
          opts.view.popup.open({
              features:response.features,
              location: mappoint
          });
        }
      }   
    });
  }
  return pub
  
  
})();