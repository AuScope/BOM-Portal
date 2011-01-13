FormFactory = function() {};

FormFactory.prototype.internalGenerateResult = function(form, supportsFiltering) {
	return {
		form				: form,
		supportsFiltering	: supportsFiltering
	};
};	

/**
 * Given an activeLayersRecord, work out whether there is an appropriate filter form
 *
 * Returns a response in the form
 * {
 *    form : Ext.FormPanel - can be null - the formpanel to be displayed when this layer is selected
 *    supportsFiltering : boolean - whether this formpanel supports the usage of the filter button
 * }
 *
 */
FormFactory.prototype.getFilterForm = function(activeLayersRecord, map, cswRecordStore) {

	var cswRecords = activeLayersRecord.getCSWRecords();


    //We simplify things by treating the record list as a single type of WFS, WCS or WMS
    //So lets find the first record with a type we can choose (Prioritise WFS -> WCS -> WMS)
    if (cswRecords.length > 0) {
    	var cswRecord = cswRecords[0];
    	var id = activeLayersRecord.getId();
    	var parentKnownLayer = activeLayersRecord.getParentKnownLayer();
    	//a Known WFS may have a custom filter form
    	if (parentKnownLayer && parentKnownLayer.getType() === 'KnownLayerWFS') {    		
            switch (parentKnownLayer.getFeatureTypeName()) {              
            case 'wml:monthly_climate_summary': return this.internalGenerateResult(new BomMonthlySummaryFilterForm(id),true);
            case 'wml:daily_climate_summary': return this.internalGenerateResult(new BomDailySummaryFilterForm(id),true);
            case 'wml:extreme': return this.internalGenerateResult(new BomExtremeFilterForm(id),true);
            case 'wml:high_quality_data_network_view': return this.internalGenerateResult(new BomHighQualityDataFilterForm(id),true);
            default: return this.internalGenerateResult(null, false); 
            }
    	}

    	//Otherwise we may show opacity if there is an associated WMS (whether it is known or not)
    	var onlineResources = cswRecord.getFilteredOnlineResources('WMS');
    	if (onlineResources.length !== 0) {
    		return this.internalGenerateResult(new WMSLayerFilterForm(activeLayersRecord, map), false);
    	}

    	//WCS Records have no filter applied
    	onlineResources = cswRecord.getFilteredOnlineResources('WCS');
    	if (onlineResources.length !== 0) {
    		return this.internalGenerateResult(null, false);
    	}

    	//Otherwise we may just have a boring old metadata record
    	if (parentKnownLayer && parentKnownLayer.getType() === 'KnownLayerKeywords') {
	    	switch (parentKnownLayer.getDescriptiveKeyword()) {
	    		case 'Report':return this.internalGenerateResult(new ReportFilterForm(id, parentKnownLayer, cswRecordStore), true); 
	    		default: return this.internalGenerateResult(null, false); 
	    	}
    	}
    }

    return this.internalGenerateResult(null, false);
};