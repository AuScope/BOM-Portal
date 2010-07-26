FormFactory = function() {};

FormFactory.prototype.getFilterForm = function(record, map) {
	
    if (record.get('serviceType') == 'wms') {
        return new WMSLayerFilterForm(record, map);
    } else {
        switch (record.get('typeName')) {            
            case 'wml:monthly_climate_summary': return new BomMonthlySummaryFilterForm(record.get('id')); break;
            case 'wml:daily_climate_summary': return new BomDailySummaryFilterForm(record.get('id')); break;
            case 'wml:extreme': return new BomExtremeFilterForm(record.get('id')); break;
            default: return null; break;
        }
    }
};