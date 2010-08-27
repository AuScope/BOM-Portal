/**
 * Builds a form panel for BOM High Quality Data filter
 * 
 * @param {number} id of this formpanel instance
 * @param {string} the service url for submit
 */
BomHighQualityDataFilterForm = function(id, serviceUrl) {
    
var now = new Date();
	
	// -------- combo box values
	// data type selection values
	var dataTypes =  [
         ['Rainfall','1|1'],
         ['Maximum Temperature','4|7'],
         ['Minimun Temperature','4|9'],
         ['Mean Temperature','4|8'],
         ['Diurnal Temperature Range','4|6'],
         ['Pan Evaporation','2|2'],
         ['Cloud Daytime','3|5'],
         ['9am Cloud','3|4'],
         ['3pm Cloud','3|3']
    ];
	
	// period type selection values
	var periodTypes =  [
          ['Annual','ann|1'],
          ['Summer','sum|6'],
          ['Autumn','aut|3'],
          ['Winter','win|4'],
          ['Spring','spr|5'],
          ['Monthly','mon|2'],
          ['Daily','day|7']
     ];
	
	// ---------- stores
	var dataTypeStore = new Ext.data.SimpleStore({
        fields : ['type','value'],
        data   : dataTypes
    });
	
	var periodTypeStore = new Ext.data.SimpleStore({
        fields : ['type','value'],
        data   : periodTypes
    });
	
	// ---------- combo boxes
	var dataCombo = buildHQCombo('Data', dataTypeStore, 'dataType', 'Select', 160, 'data', dataTypes[0]);
	var periodCombo = buildHQCombo('Period', periodTypeStore, 'periodType', 'Select', 160, 'period', periodTypes[0]);
	
	// ----------- main panel
    Ext.FormPanel.call(this, {
        id          : String.format('{0}',id),
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
            	  layout	:'form',
            	  border	: false,
            	  bodyStyle:'margin:0 3px 0 0',
            	  items		:[
            		  dataCombo,
            		  periodCombo
            	  ]
              }]
        }]
    });
};

function buildHQCombo(label, store, id, emptyText, width, hiddenName, defaultValues) {
	var combo = new Ext.form.ComboBox({  
		tpl: '<tpl for="."><div ext:qtip="{type}" class="x-combo-list-item">{type}</div></tpl>',
		hiddenName     : hiddenName,
		allowBlank	   : false,
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
        autoSelect	   : true,
        id			   : id
    });
	
	return combo;
}

BomHighQualityDataFilterForm.prototype = new Ext.FormPanel();
