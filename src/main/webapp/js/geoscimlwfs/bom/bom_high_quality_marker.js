/** 
* @fileoverview This file declares the Class BomHighQualityMarker.
* An array of objects of BomHighQualityMarker will be maintained in StationGroup of bom type. 
*/

/**
* @class
* This class defines information to be stored for updateCSWRecords bom high quality data marker.
*
* @constructor
* @param {DomXmlNode} pBomStationNode The XML node for the bom station.
* @param {String} psIcon The icon used to represent this marker.
* @return A new {@link BomHighQualityMarker}
*/

function BomHighQualityMarker (stationId, marker, description) {
    this.stationId = marker.title;
    this.moMarker = marker;
    this.msSummaryHtml = description;    
}

/**
* The bom station object which conforms to the geodesy:stations schema
* @type BomStation
*/
BomHighQualityMarker.prototype.stationId = null;

/**
* The Html to be displayed on the <b>Summary</b> tab
* of the information window opened for the marker.
* @type String
*/
BomHighQualityMarker.prototype.msSummaryHtml = null;

/**
* The marker for the station.
* @type GMarker
*/
BomHighQualityMarker.prototype.moMarker = null;

BomHighQualityMarker.prototype.markerClicked = BomHighQualityMarker_markerClicked;

/**
* The function called when the marker for this site is clicked.<br> 
* This creates the information window displaying high quality data information.  
*/ 
function BomHighQualityMarker_markerClicked()
{
  var sId = this.stationId;
  var oMarker = this.moMarker;
  
  //show loading status
  oMarker.openInfoWindowHtml('<div > <img src="js/external/extjs/resources/images/default/grid/loading.gif"> Loading... </div>');
    
  /**
  * The popup for BOM high quality data marker contains two tabs - Summary and BIRT URL
  * Summary contains Site ID, Site Name and Commenced Date
  * BIRT URL contains a URL pointing to the BIRT reporting tool for the selected filter criteria for the site selected.
  */
  var label1 = 'Summary';
  var label2 = 'BIRT URL';
  var normalUrl = oMarker.birtViewerUrl + "HighQualityData.rptdesign&m_type="+oMarker.birtMType+"&p_type="+oMarker.birtPType+"&a_type=0&stn_num="+sId;
  var anomalyUrl = oMarker.birtViewerUrl + "HighQualityData.rptdesign&m_type="+oMarker.birtMType+"&p_type="+oMarker.birtPType+"&a_type=1&stn_num="+sId;
  var urlHtml = '<a target="_blank" href="' + normalUrl + '">Normal</a> <br/> <a target="_blank" href="' + anomalyUrl + '">Anomaly</a>';
  
  // Open the popup window for the marker with the tabs Main and Data
  oMarker.openInfoWindowTabsHtml([new GInfoWindowTab(label1, this.msSummaryHtml),
                                  new GInfoWindowTab(label2, urlHtml)], {autoScroll:true});
}  

String.prototype.endsWith = function(str){
	return (this.match(str+"$")==str);
};
