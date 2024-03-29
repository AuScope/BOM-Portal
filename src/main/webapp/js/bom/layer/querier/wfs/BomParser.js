/**
 * Class for transforming a W3C DOM Document into a GenericParserComponent
 * by utilising a number of 'plugin' factories.
 */
Ext.define('bom.layer.querier.wfs.BomParser', {
    extend: 'portal.layer.querier.wfs.Parser',

    /**
     * Builds a new Parser from a list of factories. Factories in factoryList will be tested before
     * the items in factoryNames
     *
     * {
     *  factoryNames : String[] - an array of class names which will be instantiated as portal.layer.querier.wfs.factories.BaseFactory objects
     *  factoryList : portal.layer.querier.wfs.factories.BaseFactory[] - an array of already instantiated factory objects
     * }
     */
    constructor : function(config) {
        Ext.apply(config, {
            factoryNames : [
                'bom.layer.querier.wfs.factories.ExtremesFactory',
                'bom.layer.querier.wfs.factories.HighQualityDataFactory',
                'bom.layer.querier.wfs.factories.DailyClimateSummaryFactory',
                'bom.layer.querier.wfs.factories.MonthlyClimateSummaryFactory',
                'bom.layer.querier.wfs.factories.SlakeReservoirFactory',
                'portal.layer.querier.wfs.factories.SimpleFactory' //The simple factory should always go last
            ]
        });

        this.callParent(arguments);
    }
});