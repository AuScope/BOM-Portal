/** 
* @fileoverview This file declares the Class BomMarker.
* An array of objects of BomMarker will be maintained in StationGroup of bom type. 
*/

/**
* @class
* This class defines information to be stored for updateCSWRecords bom marker.
*
* @constructor
* @param {DomXmlNode} pBomStationNode The XML node for the bom station.
* @param {String} psIcon The icon used to represent this marker.
* @return A new {@link BomMarker}
*/

function BomMarker (stationId, marker, description) {
    this.stationId = marker.title;
    this.moMarker = marker;
    this.msSummaryHtml = description;
}

/**
* The bom station object which conforms to the geodesy:stations schema
* @type BomStation
*/
BomMarker.prototype.stationId = null;

/**
* The Html to be displayed on the <b>Summary</b> tab
* of the information window opened for the marker.
* @type String
*/
BomMarker.prototype.msSummaryHtml = null;

/**
* The marker for the station.
* @type GMarker
*/
BomMarker.prototype.moMarker = null;

BomMarker.prototype.markerClicked = BomMarker_markerClicked;

/**
* The function called when the marker for this site is clicked.<br> 
* This creates the information window displaying climate summary information.  
*/ 
function BomMarker_markerClicked()
{
  var sId = this.stationId;
  var oMarker = this.moMarker;
  var oCql = oMarker.filterParameters;

  //show loading status
  oMarker.openInfoWindowHtml('<div > <img src="js/external/extjs/resources/images/default/grid/loading.gif"> Loading... </div>');
    
  /**
  * The popup for BOM marker contains two tabs - Summary and WFS URL
  * Summary contains Site ID, Site Name and Commenced Date
  * WFS URL contains a URL pointing to the WFS request for the selected filter criteria with 
  * the addition of the station id of the site selected.
  */
  var label1 = 'Summary';
  var label2 = 'WFS URL';
  
  // check if there are any cql parameters and add the AND if there are 
  
  var cql_filer = oCql.cql_filter;
  if (cql_filer != "") {
	  cql_filer += " AND ";
  }	   
  
  var url = oCql.serviceUrl + "?service=WFS&version=1.1.0&request=GetFeature&srsName=EPSG%3A4326&typeName=" + oCql.typeName + "&cql_filter=" + cql_filer + "wml:station=" + sId;
  var urlHtml = '<a target="_blank" href="' + url + '">WFS Request for Station '+ sId + '</a>';
  
  // Open the popup window for the marker with the tabs Main and Data
  oMarker.openInfoWindowTabsHtml([new GInfoWindowTab(label1, this.msSummaryHtml),
                                  new GInfoWindowTab(label2, urlHtml)], {autoScroll:true});
}  

String.prototype.endsWith = function(str){
	return (this.match(str+"$")==str);
};
