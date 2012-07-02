/**
 * A factory for parsing a bom high quality data element.
 */
Ext.define('bom.layer.querier.wfs.factories.HighQualityDataFactory', {
    extend : 'portal.layer.querier.wfs.factories.BaseFactory',

    /**
     * Accepts all GenericParser.Factory.BaseFactory configuration options
     */
    constructor : function(cfg) {
        this.callParent(arguments);
    },

    supportsNode : function(domNode) {
        return domNode.namespaceURI === 'http://bom.gov.au' &&
               portal.util.xml.SimpleDOM.getNodeLocalName(domNode) === 'high_quality_data_network_view';
    },

    /**
     * Generates a simple panel that represents the specified borehole node
     */
    parseNode : function(domNode, wfsUrl) {
        var gmlId = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, '@gml:id');
        var stationId = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:station');
        var stationName = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:station_name');
        var stationState = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'wml:station_state');


        //Build our component
        return Ext.create('portal.layer.querier.BaseComponent', {
            border : false,
            layout : 'fit',
            items : [{
                xtype : 'fieldset',
                title : 'High Quality Data',
                labelWidth : 75,
                autoScroll : true,
                items : [{
                    xtype : 'displayfield',
                    fieldLabel : 'Station ID',
                    value : stationId
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Station Name',
                    value : stationName
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Station State',
                    value : stationState
                }]
            }],
            buttonAlign : 'right',
            buttons : [{
                text : 'Download Station View',
                iconCls : 'download',
                handler : function() {
                    var getXmlUrl = bf._makeFeatureRequestUrl(wfsUrl, 'wml:high_quality_data_network_view', gmlId);
                    var url = 'downloadGMLAsZip.do?serviceUrls=' + escape(getXmlUrl);
                    portal.util.FileDownloader.downloadFile(url);
                }
            }]
        });
    }
});