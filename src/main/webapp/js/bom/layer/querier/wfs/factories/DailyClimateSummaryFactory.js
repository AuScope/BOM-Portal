/**
 * A factory for parsing a bom daily data element.
 */
Ext.define('bom.layer.querier.wfs.factories.DailyClimateSummaryFactory', {
    extend : 'portal.layer.querier.wfs.factories.BaseFactory',

    /**
     * Accepts all GenericParser.Factory.BaseFactory configuration options
     */
    constructor : function(cfg) {
        this.callParent(arguments);
    },

    supportsNode : function(domNode) {
        return domNode.namespaceURI === 'http://bom.gov.au' &&
               portal.util.xml.SimpleDOM.getNodeLocalName(domNode) === 'daily_climate_summary';
    },

    /**
     * Generates a simple panel that represents the specified borehole node
     */
    parseNode : function(domNode, wfsUrl) {
        var me = this;
        var gmlId = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, '@gml:id');
        var stationId = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:station');
        var date = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:date');
        var maxTemp = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:max_temp');
        var minTemp = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:min_temp');
        var precipitation = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:precipitation');

        //Build our component
        return Ext.create('portal.layer.querier.BaseComponent', {
            border : false,
            layout : 'fit',
            items : [{
                xtype : 'fieldset',
                title : 'Daily Summary Data',
                labelWidth : 75,
                autoScroll : true,
                items : [{
                    xtype : 'displayfield',
                    fieldLabel : 'Station ID',
                    value : stationId
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Date',
                    value : date
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Max Temp',
                    value : maxTemp
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Min Temp',
                    value : minTemp
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Precipitation',
                    value : precipitation
                }]
            }],
            buttonAlign : 'right',
            buttons : [{
                text : 'Download Daily Data',
                iconCls : 'download',
                handler : function() {
                    var getXmlUrl = me._makeFeatureRequestUrl(wfsUrl, 'wml:daily_climate_summary', gmlId);
                    var url = 'downloadGMLAsZip.do?serviceUrls=' + escape(getXmlUrl);
                    portal.util.FileDownloader.downloadFile(url);
                }
            }]
        });
    }
});