/**
 * A factory for parsing WFS features from the high quality known layer.
 */
Ext.define('bom.layer.querier.wfs.knownlayerfactories.HighQualityDataFactory', {
    extend : 'portal.layer.querier.wfs.knownlayerfactories.BaseFactory',

    constructor : function(cfg) {
        this.callParent(arguments);
    },

    /**
     * Overrides abstract supportsKnownLayer. Supports only the High Quality known layer
     */
    supportsKnownLayer : function(knownLayer) {
        return knownLayer.getId() === 'wml-high_quality_data_network_view';
    },

    /**
     * Overrides abstract parseKnownLayerFeature
     */
    parseKnownLayerFeature : function(featureId, parentKnownLayer, parentOnlineResource, parentLayer) {
        var me = this;
        var filterer = parentLayer.get('filterer');
        var dataType = filterer.getParameter('data');
        var periodType = filterer.getParameter('period');

        var normalQuery = Ext.Object.toQueryString({
            sliderValue : 0,
            ReportName : 'HighQualityData.rptdesign',
            m_type : dataType.split('|')[1],
            p_type : periodType.split('|')[1],
            a_type : 0,
            stn_num : featureId
        });
        var normalUrl = Ext.urlAppend(CLIMATE_REPORTS_URL, normalQuery);

        var anomalyQuery = Ext.Object.toQueryString({
            sliderValue : 0,
            ReportName : 'HighQualityData.rptdesign',
            m_type : dataType.split('|')[1],
            p_type : periodType.split('|')[1],
            a_type : 1,
            stn_num : featureId
        });
        var anomalyUrl = Ext.urlAppend(CLIMATE_REPORTS_URL, normalQuery);

        //Load the form in full - when it renders we'll actually check what is available.
        //The user won't be able to interact with the form prior to load due to the loading mask
        return Ext.create('portal.layer.querier.BaseComponent', {
            border : false,
            tabTitle : 'Report URL',
            items : [{
                xtype : 'fieldset',
                title : 'Available Reports',
                items : [{
                    xtype : 'displayfield',
                    fieldLabel : 'Report',
                    value : Ext.DomHelper.markup({
                        tag : 'a',
                        target : '_blank',
                        href : normalUrl,
                        html : 'Normal'
                    })
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Report',
                    value : Ext.DomHelper.markup({
                        tag : 'a',
                        target : '_blank',
                        href : anomalyUrl,
                        html : 'Anomaly'
                    })
                }]
            }]
        });
    }
});