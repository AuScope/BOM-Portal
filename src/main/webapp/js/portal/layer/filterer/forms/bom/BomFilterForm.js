Ext.define('portal.layer.filterer.forms.bom.BomFilterForm', {
    extend: 'portal.layer.filterer.BaseFilterForm',

    statics : {
        /**
         * Comparison operations store
         */
        compOpTypeStore : Ext.create('Ext.data.Store', {
            fields : ['type', 'value'],
            data : [{type : '=', value : '='},
                    {type : '>', value : '>'},
                    {type : '<', value : '<'}]
        }),

        /**
         * Logical operations store
         */
        logOpTypeStore : Ext.create('Ext.data.Store', {
            fields : ['type', 'value'],
            data : [{type : 'AND', value : ' AND '},
                    {type : 'OR', value : ' OR '}]
        })
    },

    /**
     * Utility function for creating a combobox constructor
     */
    _buildComboCfg : function(label, store, id, displayValue, width) {
        return {
            xtype          : 'combo',
            itemId         : id,
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
            submitValue    : false
        };
    }
});