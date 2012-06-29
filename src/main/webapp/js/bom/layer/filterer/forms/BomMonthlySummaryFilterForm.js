/**
 * Builds a form panel for BOM Monthly Summary filters
 *
 */
Ext.define('bom.layer.filterer.forms.BomMonthlySummaryFilterForm', {
    extend: 'bom.layer.filterer.forms.BomFilterForm',

    constructor : function(config) {
        var startDate = new Date(2009, 0, 0);
        var endDate = new Date();

        var tempTypeStore = Ext.create('Ext.data.Store', {
            fields : ['type', 'value'],
            data : [{type : 'Mean Max Temp', value : 'wml:mn_max_air_temp'},
                    {type : 'Mean Min Temp', value : 'wml:mn_min_air_temp'},
                    {type : 'Highest Temp', value : 'wml:max_temp'},
                    {type : 'Lowest Temp', value : 'wml:min_temp'},
                    {type : 'Highest Max Temp', value : 'wml:max_max_air_temp'},
                    {type : 'Lowest Max Temp', value : 'wml:min_max_air_temp'}]
        });

        // ---------- combo boxes
        var tempCombo = this._buildComboCfg('', tempTypeStore, 'monTempType', 'Select', 130);
        var logOpCombo = this._buildComboCfg('Logical Operator', bom.layer.filterer.forms.BomFilterForm.logOpTypeStore, 'monOpLogic', ' AND ', 50);
        var opStation = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'monOpStation', '=', 35);
        var opTemp = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'monOpTemp', '=', 35);
        var opRainfall = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'monOpRainfall', '=', 35);
        var opAirPressure = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'monOpAirPressure', '=', 35);
        var opWindSpeed = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'monOpWindSpeed', '=', 35);
        var opWindDirection = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'monOpWindDirection', '=', 35);

        var cqlField = {
            xtype      : 'textareafield',
            fieldLabel : 'CQL',
            name       : 'cql_filter',
            itemId     : 'monCql',
            value      : "wml:date>='" + Ext.util.Format.date(startDate, "Y-m-d") + "' AND wml:date<='" + Ext.util.Format.date(endDate, "Y-m-d" + "'"),
            width      : 260
        };

        Ext.apply(config, {
            border      : false,
            autoScroll  : true,
            hideMode    :'offsets',
            width       :'100%',
            buttonAlign :'right',
            labelAlign  :'right',
            labelWidth  : 80,
            timeout     : 180, //should not time out before the server does
            bodyStyle   :'padding:5px',
            autoHeight: true,
            items       : [{
                xtype      :'fieldset',
                title      : 'Monthly Summary Filter Properties',
                autoHeight : true,
                labelWidth: 128,
                items      : [
                  {
                    xtype      : 'hidden',
                    name       : 'typeName',
                    value: 'wml:monthly_climate_summary'
                  },{
                      // column layout with 2 columns
                      layout:'column',
                      border: false,
                      items:[{
                          // left column
                          border: false,
                          layout:'form',
                          bodyStyle:'margin:0 3px 0 0',
                          columnWidth: 1.0,
                          items:[{
                              xtype      : 'numberfield',
                              fieldLabel : 'Station',
                              name       : 'wml:station',
                              id         : 'monStation',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opStation]
                      }]
                  },{
                      // column layout with 3 columns
                      layout:'column',
                      border: false,
                      bodyStyle:'margin:0 0 4px 0',
                      items: [{
                          width: 133,
                          columnWidth: 133,
                          border: false,
                          items: [tempCombo]
                      },{
                          columnWidth: 1.0,
                          border: false,
                          items: [{
                              xtype      : 'numberfield',
                              name       : 'tempValue',
                              id         : 'monTempValue',
                              submitValue: false
                          }]
                      },{
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items: [opTemp]
                      }]
                  },{
                      // column layout with 2 columns
                      layout:'column',
                      border: false,
                      items:[{
                          // left column
                          border: false,
                          layout:'form',
                          bodyStyle:'margin:0 3px 0 0',
                          columnWidth: 1.0,
                          items:[{
                              xtype      : 'numberfield',
                              fieldLabel : 'Rainfall',
                              name       : 'wml:precipitation',
                              id         : 'monRainfall',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opRainfall]
                      }]
                  },{
                      // column layout with 2 columns
                      layout:'column',
                      border: false,
                      items:[{
                          // left column
                          border: false,
                          layout:'form',
                          bodyStyle:'margin:0 3px 0 0',
                          columnWidth: 1.0,
                          items:[{
                              xtype      : 'numberfield',
                              fieldLabel : 'Max Air Pressure',
                              name       : 'wml:max_air_pressure',
                              id         : 'monAirPressure',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opAirPressure]
                      }]
                  },{
                      // column layout with 2 columns
                      layout:'column',
                      border: false,
                      items:[{
                          // left column
                          border: false,
                          layout:'form',
                          bodyStyle:'margin:0 3px 0 0',
                          columnWidth: 1.0,
                          items:[{
                              xtype      : 'numberfield',
                              fieldLabel : 'Max Wind Speed',
                              name       : 'wml:max_wind_speed',
                              id         : 'monWindSpeed',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opWindSpeed]
                      }]
                  },{
                      // column layout with 2 columns
                      layout:'column',
                      border: false,
                      items:[{
                          // left column
                          border: false,
                          layout:'form',
                          bodyStyle:'margin:0 3px 0 0',
                          columnWidth: 1.0,
                          items:[{
                              xtype      : 'numberfield',
                              fieldLabel : 'Max Wind Direction',
                              name       : 'wml:max_wind_direction',
                              id         : 'monWindDirection',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opWindDirection]
                      }]
                  },{
                      layout    :'form',
                      border: false,
                      bodyStyle:'margin:0 3px 0 0',
                      items     :[{
                          xtype      : 'datefield',
                          fieldLabel : 'Start Date',
                          name       : 'wml:date',
                          format     : "Y-m-d",
                          value      : Ext.util.Format.date(startDate, "Y-m-d"),
                          blankText  : Ext.util.Format.date(startDate, "Y-m-d"),
                          editable   : false,
                          id         : 'monStartDate',
                          submitValue: false
                      }]
                  },{
                      layout    :'form',
                      border: false,
                      bodyStyle:'margin:0 3px 0 0',
                      items     :[{
                          xtype      : 'datefield',
                          fieldLabel : 'End Date',
                          name       : 'wml:date',
                          format     : "Y-m-d",
                          value      : Ext.util.Format.date(endDate, "Y-m-d"),
                          editable   : false,
                          id         : 'monEndDate',
                          submitValue: false
                      }]
                  },{
                      layout    :'form',
                      border    : false,
                      bodyStyle:'margin:0 3px 0 0',
                      items     :[
                          logOpCombo
                      ]
                  },{
                      layout    :'form',
                      border    : false,
                      labelWidth: 30,
                      items     :[
                           cqlField
                      ]
                  }]
            }]
        });

        this.callParent(arguments);

        // add listeners to all the fields so we can construct the cql and display it
        fieldArray = this.query("field");

        for (key in fieldArray){
            // we want to exclude the last 2 array items which are the cql textarea and a remove function
            if (key < fieldArray.length - 1){

                var field = fieldArray[key];
                field.addListener("change", Ext.bind(monthlySummaryChangeHandler, this, [this], false));
            }
        }
    }
});
