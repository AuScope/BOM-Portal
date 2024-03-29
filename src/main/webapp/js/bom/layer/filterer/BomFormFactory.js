/**
 * AuScope implementation of the core portal FormFactory
 */
Ext.define('bom.layer.filterer.BomFormFactory', {
    extend : 'portal.layer.filterer.FormFactory',

    /**
     * map : [Required] an instance of portal.map.BaseMap
     */
    constructor : function(config) {
        this.callParent(arguments);
    },

    /**
     * Given an portal.layer.Layer, work out whether there is an appropriate portal.layer.filterer.BaseFilterForm to show
     *
     * Returns a response in the form
     * {
     *    form : Ext.FormPanel - the formpanel to be displayed when this layer is selected (can be EmptyFilterForm)
     *    supportsFiltering : boolean - whether this formpanel supports the usage of the filter button
     *    layer : portal.layer.Layer that was used to generate this object
     * }
     *
     */
    getFilterForm : function(layer) {
        var baseFilterForm = null;
        var baseFilterFormCfg = {
            layer : layer,
            map : this.map
        };

        //A number of known layer's have specific filter forms
        if (layer.get('sourceType') === portal.layer.Layer.KNOWN_LAYER) {
            switch (layer.get('source').get('id')) {
            case 'wml-monthly_climate_summary':
                baseFilterForm = Ext.create('bom.layer.filterer.forms.BomMonthlySummaryFilterForm', baseFilterFormCfg);
                return this._generateResult(baseFilterForm, true);
            case 'wml-daily_climate_summary':
                baseFilterForm = Ext.create('bom.layer.filterer.forms.BomDailySummaryFilterForm', baseFilterFormCfg);
                return this._generateResult(baseFilterForm, true);
            case 'wml-extreme':
                baseFilterForm = Ext.create('bom.layer.filterer.forms.BomExtremeFilterForm', baseFilterFormCfg);
                return this._generateResult(baseFilterForm, true);
            case 'wml-high_quality_data_network_view':
                baseFilterForm = Ext.create('bom.layer.filterer.forms.BomHighQualityDataFilterForm', baseFilterFormCfg);
                return this._generateResult(baseFilterForm, true);
            case 'reports-anzcw':
                baseFilterForm = Ext.create('bom.layer.filterer.forms.ReportFilterForm', baseFilterFormCfg);
                return this._generateResult(baseFilterForm, true);
            case 'reports-sims':
                baseFilterForm = Ext.create('bom.layer.filterer.forms.ReportFilterForm', baseFilterFormCfg);
                return this._generateResult(baseFilterForm, true);
            }
        }

        //otherwise let's see if we can guess an appropriate filter based on layer renderer
        if (layer.get('renderer') instanceof portal.layer.renderer.wms.LayerRenderer) {
            baseFilterForm = Ext.create('portal.layer.filterer.forms.WMSLayerFilterForm', baseFilterFormCfg);
            //VT: Filtering is support but for WMS, we want the image to be displayed immediately after it has been added and
            //the opacity can be adjusted from there on
            return this._generateResult(baseFilterForm, false);
        }

        //And otherwise we just show the empty filter form
        return this._generateResult(Ext.create('portal.layer.filterer.forms.EmptyFilterForm', baseFilterFormCfg), false);
    }
});