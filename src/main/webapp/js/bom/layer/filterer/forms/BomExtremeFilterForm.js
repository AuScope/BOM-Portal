/**
 * Builds a form panel for BOM Extreme filters
 *
 *
 */
Ext.define('bom.layer.filterer.forms.BomExtremeFilterForm', {
    extend: 'bom.layer.filterer.forms.BomFilterForm',

    constructor : function(config) {
        var startDate = new Date(2009, 0, 0);
        var endDate = new Date();

        var logOpCombo = this._buildComboCfg('Logical Operator', bom.layer.filterer.forms.BomFilterForm.logOpTypeStore, 'xOpLogic', ' AND ', 50);
        var opStation = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpStation', '=', 35);
        var opMaxTemp = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMaxTemp', '=', 35);
        var opMinTemp = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMinTemp', '=', 35);
        var opMaxAirPressure = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMaxAirPressure', '=', 35);
        var opMinAirPressure = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMinAirPressure', '=', 35);
        var opMaxWindSpeed = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMaxWindSpeed', '=', 35);
        var opMinWindSpeed = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMinWindSpeed', '=', 35);
        var opMaxWindDirection = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMaxWindDirection', '=', 35);
        var opMinWindDirection = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMinWindDirection', '=', 35);
        var opMaxMonthlyRainfall = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMaxMonthlyRainfall', '=', 35);
        var opMaxDailyRainfall = this._buildComboCfg('', bom.layer.filterer.forms.BomFilterForm.compOpTypeStore, 'xOpMaxDailyRainfall', '=', 35);

        var cqlField = {
            xtype      : 'textareafield',
            fieldLabel : 'CQL',
            name       : 'cql_filter',
            itemId     : 'xCql',
            value      : "",
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
                title      : 'Extremes Filter Properties',
                autoHeight : true,
                labelWidth : 128,
                items      : [
                  {
                      xtype      : 'hidden',
                      name       : 'typeName',
                      value: 'wml:extreme'
                    },{
                      // column layout with 2 columns
                      layout:'column',
                      border: false,
                      items:[{
                          // left column
                          border: false,
                          layout:'form',
                          bodyStyle:'margin:0 3px 0 0px',
                          columnWidth: 1.0,
                          items:[{
                              xtype      : 'numberfield',
                              fieldLabel : 'Station',
                              name       : 'wml:station',
                              id         : 'xStation',
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
                              fieldLabel : 'Max Temp',
                              name       : 'wml:max_temp',
                              id         : 'xMaxTemp',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMaxTemp]
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
                              fieldLabel : 'Min Temp',
                              name       : 'wml:min_temp',
                              id         : 'xMinTemp',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMinTemp]
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
                              id         : 'xMaxAirPressure',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMaxAirPressure]
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
                              fieldLabel : 'Min Air Pressure',
                              name       : 'wml:min_air_pressure',
                              id         : 'xMinAirPressure',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMinAirPressure]
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
                              id         : 'xMaxWindSpeed',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMaxWindSpeed]
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
                              fieldLabel : 'Min Wind Speed',
                              name       : 'wml:min_wind_speed',
                              id         : 'xMinWindSpeed',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMinWindSpeed]
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
                              id         : 'xMaxWindDirection',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMaxWindDirection]
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
                              fieldLabel : 'Min Wind Direction',
                              name       : 'wml:min_wind_direction',
                              id         : 'xMinWindDirection',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMinWindDirection]
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
                              fieldLabel : 'Max Monthly Rainfall',
                              name       : 'wml:ttl_mo_prcp',
                              id         : 'xMaxMonthlyRainfall',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMaxMonthlyRainfall]
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
                              fieldLabel : 'Max Daily Rainfall',
                              name       : 'wml:ttl_day_prcp',
                              id         : 'xMaxDailyRainfall',
                              submitValue: false
                          }]
                      },{
                          // right column
                          columnWidth: 40,
                          width: 40,
                          border: false,
                          items:[opMaxDailyRainfall]
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
                field.addListener("change", Ext.bind(extremeChangeHandler, this, [this], false));
            }
        }
    }
});
