/**
 * A factory for parsing a monthly climate summary
 */
Ext.define('bom.layer.querier.wfs.factories.MonthlyClimateSummaryFactory', {
    extend : 'portal.layer.querier.wfs.factories.BaseFactory',

    /**
     * Accepts all GenericParser.Factory.BaseFactory configuration options
     */
    constructor : function(cfg) {
        this.callParent(arguments);
    },

    supportsNode : function(domNode) {
        return domNode.namespaceURI === 'http://bom.gov.au' &&
               portal.util.xml.SimpleDOM.getNodeLocalName(domNode) === 'monthly_climate_summary';
    },

    /**
     * Generates a simple panel that represents the specified borehole node
     */
    parseNode : function(domNode, wfsUrl) {
        var me = this;
        var gmlId = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, '@gml:id');
        var stationId = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:station');
        var date = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:date');
        var precipitation = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:precipitation');

        var maxMaxTemp = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:mn_max_air_temp');
        var minMinTemp = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:mn_min_air_temp');
        var minMaxTemp = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:min_max_air_temp');
        var maxMinTemp = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:max_min_air_temp');

        //Build our component
        return Ext.create('portal.layer.querier.BaseComponent', {
            border : false,
            layout : 'fit',
            items : [{
                xtype : 'fieldset',
                title : 'Monthly Summary Data',
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
                    fieldLabel : 'Precipitation',
                    value : precipitation
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Max Temp',
                    value : Ext.util.Format.format('{0} ranging to {1}', minMaxTemp, maxMaxTemp)
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Min Temp',
                    value : Ext.util.Format.format('{0} ranging to {1}', minMinTemp, maxMinTemp)
                }]
            }],
            buttonAlign : 'right',
            buttons : [{
                text : 'Download Monthly Data',
                iconCls : 'download',
                handler : function() {
                    var getXmlUrl = me._makeFeatureRequestUrl(wfsUrl, 'wml:monthly_climate_summary', gmlId);
                    var url = 'downloadGMLAsZip.do?serviceUrls=' + escape(getXmlUrl);
                    portal.util.FileDownloader.downloadFile(url);
                }
            }]
        });
    }
});