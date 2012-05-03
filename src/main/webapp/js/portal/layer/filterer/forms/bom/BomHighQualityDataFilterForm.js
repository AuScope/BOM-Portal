/**
 * Builds a form panel for BOM High Quality Data filter
 */
Ext.define('portal.layer.filterer.forms.bom.BomHighQualityDataFilterForm', {
    extend: 'portal.layer.filterer.forms.bom.BomFilterForm',

    constructor : function(config) {
        var now = new Date();

        var dataTypeStore = Ext.create('Ext.data.Store', {
            fields : ['type', 'value'],
            data : [{type : 'Rainfall', value : '1|1'},
                    {type : 'Maximum Temperature', value : '4|7'},
                    {type : 'Minimun Temperature', value : '4|9'},
                    {type : 'Mean Temperature', value : '4|8'},
                    {type : 'Diurnal Temperature Range', value : '4|6'},
                    {type : 'Pan Evaporation', value : '2|2'},
                    {type : 'Cloud Daytime', value : '3|5'},
                    {type : '9am Cloud', value : '3|4'},
                    {type : '3pm Cloud', value : '3|3'}]
        });

        var periodTypeStore = Ext.create('Ext.data.Store', {
            fields : ['type', 'value'],
            data : [{type : 'Annual', value : 'ann|1'},
                    {type : 'Summer', value : 'sum|6'},
                    {type : 'Autumn', value : 'aut|3'},
                    {type : 'Winter', value : 'win|4'},
                    {type : 'Spring', value : 'spr|5'},
                    {type : 'Monthly', value : 'mon|2'},
                    {type : 'Daily', value : 'day|7'}]
        });

        var dataCombo = this._buildHQComboCfg('Data', dataTypeStore, 'dataType', 'Select', 160, 'data', dataTypes[0]);
        var periodCombo = this._buildHQComboCfg('Period', periodTypeStore, 'periodType', 'Select', 160, 'period', periodTypes[0]);

        Ext.apply(config, {
            border      : false,
            autoScroll  : true,
            hideMode    :'offsets',
            width       :'100%',
            buttonAlign :'right',
            labelAlign  :'right',
            labelWidth  : 40,
            timeout     : 180, //should not time out before the server does
            bodyStyle   :'padding:5px',
            autoHeight: true,
            items       : [{
                xtype      :'fieldset',
                title      : 'High Quality Data Filter Properties',
                autoHeight : true,
                labelWidth: 128,
                items      : [
                  {
                    xtype      : 'hidden',
                    name       : 'typeName',
                    value: 'wml:high_quality_data_network_view'
                  },{
                      layout    :'form',
                      border    : false,
                      bodyStyle:'margin:0 3px 0 0',
                      items     :[
                          dataCombo,
                          periodCombo
                      ]
                  }]
            }]
        });

        this.callParent(arguments);
    },

    _buildHQComboCfg : function(label, store, id, emptyText, width, hiddenName, defaultValues) {
        return {
            xtype          : 'combo',
            hiddenName     : hiddenName,
            allowBlank     : false,
            width          : width,
            editable       : false,
            forceSelection : true,
            fieldLabel     : label,
            mode           : 'local',
            store          : store,
            triggerAction  : 'all',
            typeAhead      : false,
            displayField   : 'type',
            valueField     : 'value',
            value          : defaultValues[0],
            hiddenValue    : defaultValues[1],
            autoSelect     : true,
            itemId         : id
        };
    }
});
