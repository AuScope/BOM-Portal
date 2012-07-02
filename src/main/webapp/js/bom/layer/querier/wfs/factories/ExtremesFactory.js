/**
 * A factory for parsing a bom extremes data element.
 */
Ext.define('bom.layer.querier.wfs.factories.ExtremesFactory', {
    extend : 'portal.layer.querier.wfs.factories.BaseFactory',

    /**
     * Accepts all GenericParser.Factory.BaseFactory configuration options
     */
    constructor : function(cfg) {
        this.callParent(arguments);
    },

    supportsNode : function(domNode) {
        return domNode.namespaceURI === 'http://bom.gov.au' &&
               portal.util.xml.SimpleDOM.getNodeLocalName(domNode) === 'extreme';
    },

    /**
     * Generates a simple panel that represents the specified borehole node
     */
    parseNode : function(domNode, wfsUrl) {
        var me = this;
        var gmlId = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, '@gml:id');
        var stationId = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:station');
        var maxTemp = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:max_temp');
        var maxTempDate = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:max_temp_lst');
        var minTemp = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:min_temp');
        var minTempDate = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:min_temp_lst');
        var maxAirPressure = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:max_air_pressure');
        var minAirPressure = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:min_air_pressure');
        var maxDailyRain = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:ttl_day_prcp');
        var maxDailyRainDate = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:ttl_day_prcp_lst');

        //Build our component
        return Ext.create('portal.layer.querier.BaseComponent', {
            border : false,
            layout : 'fit',
            items : [{
                xtype : 'fieldset',
                title : 'Extremes Data',
                labelWidth : 75,
                autoScroll : true,
                items : [{
                    xtype : 'displayfield',
                    fieldLabel : 'Station ID',
                    value : stationId
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Max Temp',
                    value : Ext.util.Format.format('{0} on {1}', maxTemp, maxTempDate)
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Min Temp',
                    value : Ext.util.Format.format('{0} on {1}', minTemp, minTempDate)
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Max Total Daily Precipitation',
                    value : Ext.util.Format.format('{0} on {1}', maxDailyRain, maxDailyRainDate)
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Max Air Pressure',
                    value : maxAirPressure
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Min Air Pressure',
                    value : minAirPressure
                }]
            }],
            buttonAlign : 'right',
            buttons : [{
                text : 'Download Extremes Data',
                iconCls : 'download',
                handler : function() {
                    var getXmlUrl = me._makeFeatureRequestUrl(wfsUrl, 'wml:extreme', gmlId);
                    var url = 'downloadGMLAsZip.do?serviceUrls=' + escape(getXmlUrl);
                    portal.util.FileDownloader.downloadFile(url);
                }
            }]
        });
    }
});