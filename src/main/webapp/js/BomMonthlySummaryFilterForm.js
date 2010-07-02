/**
 * Builds a form panel for BOM Monthly Summary filters
 * 
 * @param {number} id of this formpanel instance
 * @param {string} the service url for submit
 */
BomMonthlySummaryFilterForm = function(id, serviceUrl) {
    
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
            items      : [
            {
                xtype      : 'textfield',
                fieldLabel : 'Station No',
                name       : 'stationId'
            },{
                xtype      : 'textfield',
                fieldLabel : 'Max Temp',
                name       : 'maxTemp'
            },{
                xtype      : 'textfield',
                fieldLabel : 'Min Temp',
                name       : 'minTemp'
            },{
                xtype      : 'textfield',
                fieldLabel : 'Rainfall',
                name       : 'rainfall'
            },{
                xtype      : 'textfield',
                fieldLabel : 'Air Pressure',
                name       : 'airPressure'
            },{
                xtype      : 'textfield',
                fieldLabel : 'Wind Speed',
                name       : 'windSpeed'
            },{
            	xtype: 'datefield',
                fieldLabel: 'Start Date',
                name: 'startDate',
                format: "Y-m-d",
                value: ''
            },{
            	xtype: 'datefield',
                fieldLabel: 'End Date',
                name: 'endDate',
                format: "Y-m-d",
                value: ''
            }
            ]
        }]
    });
};

BomMonthlySummaryFilterForm.prototype = new Ext.FormPanel();
