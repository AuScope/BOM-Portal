/**
 * A factory for parsing a bom extremes data element.
 */
Ext.define('bom.layer.querier.wfs.factories.SlakeReservoirFactory', {
    extend : 'portal.layer.querier.wfs.factories.BaseFactory',

    /**
     * Accepts all GenericParser.Factory.BaseFactory configuration options
     */
    constructor : function(cfg) {
        this.callParent(arguments);
    },

    supportsNode : function(domNode) {
        return domNode.namespaceURI === 'http://xlmns.siss.csiro.au/slake/0.2' &&
               portal.util.xml.SimpleDOM.getNodeLocalName(domNode) === 'SurfaceReservoir';
    },

    /**
     * Generates a simple panel that represents the specified borehole node
     */
    parseNode : function(domNode, wfsUrl) {
        var me = this;
        var gmlId = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, '@gml:id');
        var name = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'slake:reservoirName/slake:ReservoirName/slake:name');
        var completedDate = portal.util.xml.SimpleXPath.evaluateXPathString(domNode, 'slake:yearOfCompletion');
        var allNames = portal.util.xml.SimpleXPath.evaluateXPathNodeArray(domNode, 'gml:name');

        var uriId = '';
        for (var i = 0; i < allNames.length; i++) {
            if (portal.util.xml.SimpleXPath.evaluateXPathString(allNames[i], '@codeSpace') === 'http://www.ietf.org/rfc/rfc2616') {
                uriId = portal.util.xml.SimpleDOM.getNodeTextContent(allNames[i]);
            }
        }



        //Build our component
        return Ext.create('portal.layer.querier.BaseComponent', {
            border : false,
            layout : 'fit',
            items : [{
                xtype : 'fieldset',
                title : 'Surface Reservoir',
                labelWidth : 75,
                autoScroll : true,
                items : [{
                    xtype : 'displayfield',
                    fieldLabel : 'Name',
                    value : name
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Id',
                    value : uriId
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Completed Date',
                    value : completedDate
                }]
            }],
            buttonAlign : 'right',
            buttons : [{
                text : 'Download SOS Observations',
                iconCls : 'download',
                handler : function() {
                    var params = {
                        serviceUrls : portal.util.URL.base + 'getSurfaceReservoirObservations.do?featureId=' + gmlId
                    };
                    var url = 'downloadGMLAsZip.do';
                    portal.util.FileDownloader.downloadFile(url, params);
                }
            }]
        });
    }
});