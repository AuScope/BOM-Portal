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
* The function called when the marker for this station is clicked.<br> 
* This creats the information window displaying station information.  
*/ 
function BomMarker_markerClicked()
{
  var sId = this.stationId;//oGeodesyStation.msId;
  var oMarker = this.moMarker;

  //show loading status
  oMarker.openInfoWindowHtml('<div > <img src="js/external/extjs/resources/images/default/grid/loading.gif"> Loading... </div>');
    
  /**
  * The popup for updateCSWRecords marker contains two tabs - Summary and Renix Files
  * Summary contains ID, Name, Location, Log Url of the station
  * Renix Files contains updateCSWRecords scrollable list of Renix file Urls for the station.
  */
  var label1 = 'Summary';
  var label2 = 'Info';
  var summaryHtml = "";
  var renixFilesHtml = "";
  
  // Open the popup window for the marker with the tabs Main and Data
  oMarker.openInfoWindowTabsHtml([new GInfoWindowTab(label1, this.msSummaryHtml),
                                  new GInfoWindowTab(label2, "")], {autoScroll:true});
}  
