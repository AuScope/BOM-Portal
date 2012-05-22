/**
 * A class for creating instances of portal.layer.querier.Querier
 */
Ext.define('bom.layer.BomQuerierFactory', {

    extend : 'portal.layer.querier.QuerierFactory',


    /**
     * Creates a new instance of a Querier based on the specified values
     *
     * knownLayer can be null
     */
    _generateQuerier : function(knownLayer, wfsResources, wmsResources, wcsResources) {
        var cfg = {map : this.map};

        if (wfsResources.length > 0) {
            cfg.parser = Ext.create('bom.layer.querier.wfs.BomParser', {});
            cfg.knownLayerParser = Ext.create('bom.layer.querier.wfs.BomKnownLayerParser', {});

            return Ext.create('portal.layer.querier.wfs.WFSQuerier', cfg);
        } else if (wcsResources.length > 0) {
            return Ext.create('portal.layer.querier.coverage.WCSQuerier',cfg);
        } else if (wmsResources.length > 0) {
            return Ext.create('portal.layer.querier.wms.WMSQuerier', cfg);
        } else {
            //Worst case scenario, we render the source CSW record
            return Ext.create('portal.layer.querier.csw.CSWQuerier', cfg);
        }
    },

    /**
     * See parent class for defn
     */
    buildFromKnownLayer : function(knownLayer) {
        var allOnlineResources = knownLayer.getAllOnlineResources();

        var wmsResources = portal.csw.OnlineResource.getFilteredFromArray(allOnlineResources, portal.csw.OnlineResource.WMS);
        var wfsResources = portal.csw.OnlineResource.getFilteredFromArray(allOnlineResources, portal.csw.OnlineResource.WFS);
        var wcsResources = portal.csw.OnlineResource.getFilteredFromArray(allOnlineResources, portal.csw.OnlineResource.WCS);

        return this._generateQuerier(knownLayer, wfsResources, wmsResources, wcsResources);
    },

    /**
     * See parent class for defn
     */
    buildFromCswRecord : function(cswRecord) {
        var allOnlineResources = cswRecord.get('onlineResources');

        var wmsResources = portal.csw.OnlineResource.getFilteredFromArray(allOnlineResources, portal.csw.OnlineResource.WMS);
        var wfsResources = portal.csw.OnlineResource.getFilteredFromArray(allOnlineResources, portal.csw.OnlineResource.WFS);
        var wcsResources = portal.csw.OnlineResource.getFilteredFromArray(allOnlineResources, portal.csw.OnlineResource.WCS);

        return this._generateQuerier(null, wfsResources, wmsResources, wcsResources);
    }
});