/**
 * Builds a form panel for BOM Extreme filters
 * 
 * @param {number} id of this formpanel instance
 * @param {string} the service url for submit
 */
BomExtremeFilterForm = function(id) {
    
var now = new Date();
	
	// -------- combo box values
	// comparison operator selection values
	var compOpTypes =  [
   		 ['=','='],
   		 ['>','>'],
   		 ['<','<']                       
   	];
	
	// logical operator selection values
	var logOpTypes =  [
   		 ['AND',' AND '],
   		 ['OR',' OR ']                       
   	];
	
	var compOpTypeStore = new Ext.data.SimpleStore({
		fields : ['type','value'],
        data   : compOpTypes
    });
	
	var logOpTypeStore = new Ext.data.SimpleStore({
		fields : ['type','value'],
        data   : logOpTypes
    });
	
	// ---------- combo boxes
	var logOpCombo = buildCombo('Logical Operator', logOpTypeStore, 'xOpLogic', ' AND ', 50);
	var opStation = buildCombo('', compOpTypeStore, 'xOpStation', '=', 35);
	var opMaxTemp = buildCombo('', compOpTypeStore, 'xOpMaxTemp', '=', 35);
	var opMinTemp = buildCombo('', compOpTypeStore, 'xOpMinTemp', '=', 35);
	var opMaxAirPressure = buildCombo('', compOpTypeStore, 'xOpMaxAirPressure', '=', 35);
	var opMinAirPressure = buildCombo('', compOpTypeStore, 'xOpMinAirPressure', '=', 35);
	var opMaxWindSpeed = buildCombo('', compOpTypeStore, 'xOpMaxWindSpeed', '=', 35);
	var opMinWindSpeed = buildCombo('', compOpTypeStore, 'xOpMinWindSpeed', '=', 35);
	var opMaxWindDirection = buildCombo('', compOpTypeStore, 'xOpMaxWindDirection', '=', 35);
	var opMinWindDirection = buildCombo('', compOpTypeStore, 'xOpMinWindDirection', '=', 35);
	var opMaxMonthlyRainfall = buildCombo('', compOpTypeStore, 'xOpMaxMonthlyRainfall', '=', 35);
	var opMaxDailyRainfall = buildCombo('', compOpTypeStore, 'xOpMaxDailyRainfall', '=', 35);
	
	var cqlField = new Ext.form.TextArea({  
        fieldLabel : 'CQL',
        name       : 'cql_filter',
        id		   : 'xCql',
        width	   : 260
    });
	
	// ----------- main panel
    Ext.FormPanel.call(this, {
        id          : String.format('{0}',id),
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Station',
                          name       : 'wml:station',
                          id		 : 'xStation',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Max Temp',
                          name       : 'wml:max_temp',
                          id		 : 'xMaxTemp',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Min Temp',
                          name       : 'wml:min_temp',
                          id		 : 'xMinTemp',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Max Air Pressure',
                          name       : 'wml:max_air_pressure',
                          id		 : 'xMaxAirPressure',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Min Air Pressure',
                          name       : 'wml:min_air_pressure',
                          id		 : 'xMinAirPressure',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Max Wind Speed',
                          name       : 'wml:max_wind_speed',
                          id		 : 'xMaxWindSpeed',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Min Wind Speed',
                          name       : 'wml:min_wind_speed',
                          id		 : 'xMinWindSpeed',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Max Wind Direction',
                          name       : 'wml:max_wind_direction',
                          id		 : 'xMaxWindDirection',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Min Wind Direction',
                          name       : 'wml:min_wind_direction',
                          id		 : 'xMinWindDirection',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Max Monthly Rainfall',
                          name       : 'wml:ttl_mo_prcp',
                          id		 : 'xMaxMonthlyRainfall',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Max Daily Rainfall',
                          name       : 'wml:ttl_day_prcp',
                          id		 : 'xMaxDailyRainfall',
                          submitValue: false
                      }]
                  },{
                      // right column
                      width: 40,
                      border: false,
                      items:[opMaxDailyRainfall]
                  }]
              },{
            	  layout	:'form',
            	  border	: false,
            	  bodyStyle:'margin:0 3px 0 0',
            	  items		:[
            		  logOpCombo
            	  ]
              },{
            	  layout	:'form',
            	  border	: false,
            	  labelWidth: 30,
            	  items		:[
            	       cqlField
            	  ]
              }]
        }]
    });
    
    // add listeners to all the fields so we can construct the cql and display it
    fieldArray = this.findByType("field");
	
	for (key in fieldArray){
		// we want to exclude the last 2 array items which are the cql textarea and a remove function 
		if (key < fieldArray.length - 1){
			
			var field = fieldArray[key];
			field.addListener("change", extremeChangeHandler);
		}
	}
};

function buildCombo(label, store, id, displayValue, width) {
	var compOpCombo = new Ext.form.ComboBox({  
		tpl: '<tpl for="."><div ext:qtip="{type}" class="x-combo-list-item">{type}</div></tpl>',
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
        value          : displayValue,
        id			   : id,
        submitValue	   : false
    });
	
	return compOpCombo;
}

BomExtremeFilterForm.prototype = new Ext.FormPanel();
