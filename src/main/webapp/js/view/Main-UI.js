//this runs on DOM load - you can access all the good stuff now.
var theglobalexml;
Ext.Ajax.timeout = 180000; //3 minute timeout for ajax calls

Ext.onReady(function() {
    var map;
    var downloadUrls = new Hashtable();

    var dataSourcesStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: '/getDataSources.do'}),
        reader: new Ext.data.ArrayReader({}, [
            {name:'title'},
            {name:'description'},
            {name:'serviceURL'},
            {name: 'type'},
            {name: 'id'},
            {name: 'featureType'}    
        ])
    });

    dataSourcesStore.load();

    var dataSourcesRowExpander = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p><b>Description:</b> {description}</p><br>'
        )
    });
    
    var dataSourcePanel = new Ext.grid.GridPanel({
        store: dataSourcesStore,
        columns: [
            dataSourcesRowExpander,
            {id:'title',header: "Title", width: 160, sortable: true, dataIndex: 'title'}
        ],
        bbar: [{
            text:'Add Layer to Map',
            tooltip:'Add Layer to Map',
            iconCls:'add',
            handler: function() {
                layersStore.add(dataSourcePanel.getSelectionModel().getSelected());
            }
        }],

        stripeRows: true,
        autoExpandColumn: 'title',
        plugins: [dataSourcesRowExpander],
        viewConfig: {scrollOffset: 0},

        title: 'Themes',
        region:'north',
        split: true,
        height: 300,
        autoScroll: true
    });

    /**
     * Used to show extra details for querying services
     */
    var filterPanel = new Ext.Panel({
        title: "Filter Properties",
        region: 'south',
        split: true,
        width: '100%',
        layout: 'card',
        activeItem: 0,
        height: 300,
        items: [{html: '<p style="margin:15px;padding:15px;border:1px dotted #999;color:#555;background: #f9f9f9;"> Filter options will be shown here for special services.</p>'}],
        bbar: ['->', {
            text:'Apply Filter >>',
            tooltip:'Apply Filter',
            //iconCls:'remove',
            handler: function() {
                filterPanel.getLayout().activeItem.runFilter();
            }
        }]

    });

    /*var Layer = Ext.data.Record.create([
        {name: 'title'},
        {name: 'description'},
        {name: 'layerVisible', type:'bool'}
    ]);*/

    var layersStore = new Ext.data.Store({
        //baseParams: {serviceUrl: serviceUrl},
        //proxy: new Ext.data.HttpProxy({url: '/getDataSources.do'}),
        reader: new Ext.data.ArrayReader({}, [
            {name:'title'},
            {name:'description'},
            {name: 'serviceURL'},    
            {name:'layerVisible'}
        ])
    });

    // custom column plugin example
    var layersPanelCheckColumn = new Ext.grid.CheckColumn({
       header: "Visible",
       dataIndex: 'layerVisible',
       width: 55,
       handler: function(record, isChecked) {
           if(isChecked) {
                filterPanel.add(buildMineralOccurrenceFilterForm(2, "/getMineNames.do", "/doMineralOccurrenceFilter.do", "", function(form, action) {
                        addKmlLayer(node, action.result.data.kml, viewport, map, statusBar);
                    }, function() {
                        if (node.attributes.tileOverlay instanceof GeoXml) {
                            node.attributes.tileOverlay.clear();
                            node.attributes.tileOverlay = null;
                        }
                    }));
                filterPanel.doLayout();
                filterPanel.getLayout().setActiveItem(2);
            } else {
                filterPanel.getLayout().setActiveItem(0);
            }
       }
    });

    var layersPanelExpander = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p><b>Description:</b> {description}</p><br>'
        )
    });

    var layersPanel = new Ext.grid.GridPanel({
        store: layersStore,
        columns: [
            layersPanelExpander,
            {id:'title',header: "Title", width: 160, sortable: true, dataIndex: 'title'},
            layersPanelCheckColumn
            //{header: "Price", width: 75, sortable: true, dataIndex: 'price'},
            //{header: "Change", width: 75, sortable: true, dataIndex: 'change'},
            //{header: "% Change", width: 75, sortable: true, dataIndex: 'pctChange'},
            //{header: "Last Updated", width: 85, sortable: true, dataIndex: 'lastChange'}
        ],
        bbar: [{
            text:'Remove Layer',
            tooltip:'Remove Layer',
            iconCls:'remove',
            handler: function() {
                layersStore.remove(layersPanel.getSelectionModel().getSelected());
            }
        }],

        plugins: [layersPanelCheckColumn, layersPanelExpander],

        stripeRows: true,
        autoExpandColumn: 'title',
        viewConfig: {scrollOffset: 0},
        
        title: 'Layers',
        region:'center',
        split: true,
        height: 300,
        autoScroll: true
    });

    /**
     * Buttons for things like downloading datasets
     */
    /*var buttonsPanel = new Ext.FormPanel({
        region: 'south',
        autoScroll:true,
        width: '100%',
        items: [{border: false}],
        buttons: [{text: "Download Datasets", handler: function() {downloadController(downloadUrls);} }]
    });*/

    /**
     * Used as a placeholder for the tree and details panel on the left of screen
     */
    var westPanel = {
        layout: 'border',
        region:'west',
        border: false,
        split:true,
        margins: '100 0 0 0',
        width: 350,

        items:[dataSourcePanel, layersPanel, filterPanel]
    };

    /**
     * This center panel will hold the google maps
     */

    var centerPanel = new Ext.Panel({region:"center", margins:'100 0 0 0', cmargins:'100 0 0 0'});

    /**
     * Used for notifications of activity
     */
    var statusBar = new Ext.StatusBar({
        region: "south",
        id: 'my-status',
        hidden: true,

        // defaults to use when the status is cleared:
        defaultText: 'Default status text',
        defaultIconCls: 'default-icon',

        // values to set initially:
        text: 'Ready',
        iconCls: 'ready-icon'
    });

    /**
     * Add all the panels to the viewport
     */
    var viewport = new Ext.Viewport({
        layout:'border',
        items:[westPanel, centerPanel, statusBar]
    });

    // Is user's browser suppported by Google Maps?
    if (GBrowserIsCompatible()) {
        map = new GMap2(centerPanel.body.dom);
        map.setUIToDefault();

        //add google earth
        map.addMapType(G_SATELLITE_3D_MAP);

        // Large pan and zoom control
        //map.addControl(new GLargeMapControl(),  new GControlPosition(G_ANCHOR_TOP_LEFT));

        // Toggle between Map, Satellite, and Hybrid types
        map.addControl(new GMapTypeControl());

        var startZoom = 4;
        map.setCenter(new google.maps.LatLng(-26, 133.3), 4);
        map.setMapType(G_SATELLITE_MAP);

        //Thumbnail map
        var Tsize = new GSize(150, 150);
        map.addControl(new GOverviewMapControl(Tsize));

        map.addControl(new DragZoomControl(), new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(345, 7)));

    }

    //a dud gloabal for geoxml class
    theglobalexml = new GeoXml("theglobalexml", map, null, null);

    //event handlers and listeners
    //tree.on('click', function(node, event) { treeNodeOnClickController(node, event, viewport, filterPanel); });
    //tree.on('checkchange', function(node, isChecked) { treeCheckChangeController(node, isChecked, map, statusBar, viewport, downloadUrls, filterPanel); });

    //when a person clicks on a marker then do something
    GEvent.addListener(map, "click", function(overlay, latlng) { gMapClickController(map, overlay, latlng, statusBar, viewport); });

});









