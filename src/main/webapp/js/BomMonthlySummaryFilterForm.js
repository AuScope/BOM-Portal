/**
 * Builds a form panel for BOM Monthly Summary filters
 * 
 * @param {number} id of this formpanel instance
 */
BomMonthlySummaryFilterForm = function(id) {
    
	var now = new Date();
	
	// -------- combo box values
	// temperature selection values
	var tempTypes =  [
         ['Mean Max Temp','wml:mn_max_air_temp'],    
         ['Mean Min Temp','wml:mn_min_air_temp'],
         ['Highest Temp','wml:max_temp'],
         ['Lowest Temp','wml:min_temp'],
         ['Highest Max Temp','wml:max_max_air_temp'],
         ['Lowest Max Temp','wml:min_max_air_temp']                       
    ];
	
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
	
	// ---------- stores
	var tempTypeStore = new Ext.data.SimpleStore({
        fields : ['type','value'],
        data   : tempTypes
    });
	
	var compOpTypeStore = new Ext.data.SimpleStore({
		fields : ['type','value'],
        data   : compOpTypes
    });
	
	var logOpTypeStore = new Ext.data.SimpleStore({
		fields : ['type','value'],
        data   : logOpTypes
    });
	
	// ---------- combo boxes
	var tempCombo = buildCombo('', tempTypeStore, 'monTempType', 'Select', 130);
	var logOpCombo = buildCombo('Logical Operator', logOpTypeStore, 'monOpLogic', ' AND ', 50);
	var opStation = buildCombo('', compOpTypeStore, 'monOpStation', '=', 35);
	var opTemp = buildCombo('', compOpTypeStore, 'monOpTemp', '=', 35);
	var opRainfall = buildCombo('', compOpTypeStore, 'monOpRainfall', '=', 35);
	var opAirPressure = buildCombo('', compOpTypeStore, 'monOpAirPressure', '=', 35);
	var opWindSpeed = buildCombo('', compOpTypeStore, 'monOpWindSpeed', '=', 35);
	var opWindDirection = buildCombo('', compOpTypeStore, 'monOpWindDirection', '=', 35);
	
	var cqlField = new Ext.form.TextArea({  
        fieldLabel : 'CQL',
        name       : 'cql_filter',
        id		   : 'monCql',
        value	   : "wml:date>='" + now.format("Y-m-d") + "' AND wml:date<='" + now.format("Y-m-d" + "'"), 
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Station',
                          name       : 'wml:station',
                          id		 : 'monStation',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      border: false,
                      items: [tempCombo]
                  },{
                      width: 130,
                      border: false,
                      items: [{
                    	  xtype      : 'numberfield',
                    	  name       : 'tempValue',
                    	  id		 : 'monTempValue',
                    	  submitValue: false
                      }]
                  },{
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Rainfall',
                          name       : 'wml:precipitation',
                          id		 : 'monRainfall',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Max Air Pressure',
                          name       : 'wml:max_air_pressure',
                          id		 : 'monAirPressure',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Max Wind Speed',
                          name       : 'wml:max_wind_speed',
                          id		 : 'monWindSpeed',
                          submitValue: false
                      }]
                  },{
                      // right column
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
                      items:[{
                    	  xtype      : 'numberfield',
                          fieldLabel : 'Max Wind Direction',
                          name       : 'wml:max_wind_direction',
                          id		 : 'monWindDirection',
                          submitValue: false
                      }]
                  },{
                      // right column
                      width: 40,
                      border: false,
                      items:[opWindDirection]
                  }]
              },{
            	  layout	:'form',
            	  border: false,
            	  bodyStyle:'margin:0 3px 0 0',
            	  items		:[{
            		  xtype		 : 'datefield',
                      fieldLabel : 'Start Date',
                      name		 : 'wml:date',
                      format 	 : "Y-m-d",
                      value		 : now.format("Y-m-d"),
                      blankText	 : now.format("Y-m-d"),
                      editable   : false,
                      id		 : 'monStartDate',
                      submitValue: false
            	  }]
              },{
            	  layout	:'form',
            	  border: false,
            	  bodyStyle:'margin:0 3px 0 0',
            	  items		:[{
            		  xtype		 : 'datefield',
                      fieldLabel : 'End Date',
                      name		 : 'wml:date',
                      format	 : "Y-m-d",
                      value		 : now.format("Y-m-d"),
                      editable   : false,
                      id		 : 'monEndDate',
                      submitValue: false
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
			field.addListener("change", monthlySummaryChangeHandler);
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
        submitValue    : false
    });
	
	return compOpCombo;
}

BomMonthlySummaryFilterForm.prototype = new Ext.FormPanel();
