// Builds a cql filter string based on user input and displays it in an
// editable textarea for manipulation if required 

var formPanel;
var cqlString;

function setFormPanel(panel){
	formPanel = panel;
}

function dailySummaryChangeHandler()
{
	// get the input values
	cqlString = "";
	var station = formPanel.findById("dayStation");
	var opStation = formPanel.findById("dayOpStation");
	var tempType = formPanel.findById("dayTempType");
	var tempValue = formPanel.findById("dayTempValue");
	var opTemp = formPanel.findById("dayOpTemp");
	var rainfall = formPanel.findById("dayRainfall");
	var opRainfall = formPanel.findById("dayOpRainfall");
	//var airPressure = formPanel.findById("dayAirPressure");
	//var opAirPressure = formPanel.findById("dayOpAirPressure");
	var windSpeed = formPanel.findById("dayWindSpeed");
	var opWindSpeed = formPanel.findById("dayOpWindSpeed");
	var windDirection = formPanel.findById("dayWindDirection");
	var opWindDirection = formPanel.findById("dayOpWindDirection");
	var startDate = formPanel.findById("dayStartDate");
	var endDate = formPanel.findById("dayEndDate");
	var opLogic = formPanel.findById("dayOpLogic");
	var opLogicString = opLogic.getValue();
	var cql = formPanel.findById("dayCql");
	var stringComparitor = " like '";
	
	// string the entered values together to construct the cql
	appendNumberFieldCql(station, opStation, opLogicString);
	
	// specific processing for the temp select input
	if (tempType.getValue().length > 0 && tempValue.getValue().length != 0){
		cqlString += tempType.getValue() + opTemp.getValue() + tempValue.getValue() + opLogicString;
	}
	
	appendNumberFieldCql(rainfall, opRainfall, opLogicString);
	//appendNumberFieldCql(airPressure, opAirPressure, opLogicString);
	appendNumberFieldCql(windSpeed, opWindSpeed, opLogicString);
	appendNumberFieldCql(windDirection, opWindDirection, opLogicString);
	appendDateRangeCql(startDate, endDate);
	
	// display the cql in the text area
	cql.setValue(cqlString);
}

function monthlySummaryChangeHandler()
{
	// get the input values
	cqlString = "";
	var station = formPanel.findById("monStation");
	var opStation = formPanel.findById("monOpStation");
	var tempType = formPanel.findById("monTempType");
	var tempValue = formPanel.findById("monTempValue");
	var opTemp = formPanel.findById("monOpTemp");
	var rainfall = formPanel.findById("monRainfall");
	var opRainfall = formPanel.findById("monOpRainfall");
	var airPressure = formPanel.findById("monAirPressure");
	var opAirPressure = formPanel.findById("monOpAirPressure");
	var windSpeed = formPanel.findById("monWindSpeed");
	var opWindSpeed = formPanel.findById("monOpWindSpeed");
	var windDirection = formPanel.findById("monWindDirection");
	var opWindDirection = formPanel.findById("monOpWindDirection");
	var startDate = formPanel.findById("monStartDate");
	var endDate = formPanel.findById("monEndDate");
	var opLogic = formPanel.findById("monOpLogic");
	var opLogicString = opLogic.getValue();
	var cql = formPanel.findById("monCql");
	var stringComparitor = " like '";
	
	// string the entered values together to construct the cql
	appendNumberFieldCql(station, opStation, opLogicString);
	
	// specific processing for the temp select input
	if (tempType.getValue().length > 0 && tempValue.getValue().length != 0){
		cqlString += tempType.getValue() + opTemp.getValue() + tempValue.getValue() + opLogicString;
	}
	
	appendNumberFieldCql(rainfall, opRainfall, opLogicString);
	appendNumberFieldCql(airPressure, opAirPressure, opLogicString);
	appendNumberFieldCql(windSpeed, opWindSpeed, opLogicString);
	appendNumberFieldCql(windDirection, opWindDirection, opLogicString);
	appendDateRangeCql(startDate, endDate);
	
	// display the cql in the text area
	cql.setValue(cqlString);
}

function extremeChangeHandler()
{
	// get the input values
	cqlString = "";
	var station = formPanel.findById("xStation");
	var opStation = formPanel.findById("xOpStation");
	var maxTemp = formPanel.findById("xMaxTemp");	
	var opMaxTemp = formPanel.findById("xOpMaxTemp");
	var minTemp = formPanel.findById("xMinTemp");	
	var opMinTemp = formPanel.findById("xOpMinTemp");
	var maxAirPressure = formPanel.findById("xMaxAirPressure");	
	var opMaxAirPressure = formPanel.findById("xOpMaxAirPressure");
	var minAirPressure = formPanel.findById("xMinAirPressure");	
	var opMinAirPressure = formPanel.findById("xOpMinAirPressure");
	var maxWindSpeed = formPanel.findById("xMaxWindSpeed");	
	var opMaxWindSpeed = formPanel.findById("xOpMaxWindSpeed");
	var minWindSpeed = formPanel.findById("xMinWindSpeed");	
	var opMinWindSpeed = formPanel.findById("xOpMinWindSpeed");
	var maxWindDirection = formPanel.findById("xMaxWindDirection");	
	var opMaxWindDirection = formPanel.findById("xOpMaxWindDirection");
	var minWindDirection = formPanel.findById("xMinWindDirection");	
	var opMinWindDirection = formPanel.findById("xOpMinWindDirection");
	var maxMonthlyRainfall = formPanel.findById("xMaxMonthlyRainfall");	
	var opMaxMonthlyRainfall = formPanel.findById("xOpMaxMonthlyRainfall");
	var maxDailyRainfall = formPanel.findById("xMaxDailyRainfall");	
	var opMaxDailyRainfall = formPanel.findById("xOpMaxDailyRainfall");
	var opLogic = formPanel.findById("xOpLogic");
	var opLogicString = opLogic.getValue();
	var cql = formPanel.findById("xCql");
	var stringComparitor = " like '";
	
	// string the entered values together to construct the cql
	appendNumberFieldCql(station, opStation, opLogicString);
	appendNumberFieldCql(maxTemp, opMaxTemp, opLogicString);
	appendNumberFieldCql(minTemp, opMinTemp, opLogicString);
	appendNumberFieldCql(maxAirPressure, opMaxAirPressure, opLogicString);
	appendNumberFieldCql(minAirPressure, opMinAirPressure, opLogicString);
	appendNumberFieldCql(maxWindSpeed, opMaxWindSpeed, opLogicString);
	appendNumberFieldCql(minWindSpeed, opMinWindSpeed, opLogicString);
	appendNumberFieldCql(maxWindDirection, opMaxWindDirection, opLogicString);
	appendNumberFieldCql(minWindDirection, opMinWindDirection, opLogicString);
	appendNumberFieldCql(maxMonthlyRainfall, opMaxMonthlyRainfall, opLogicString);
	appendNumberFieldCql(maxDailyRainfall, opMaxDailyRainfall, opLogicString);
	
	trimCql(opLogicString);
	
	// display the cql in the text area
	cql.setValue(cqlString);
}

// adds the cql filter for a textfield
function appendTextFieldCql(textField, stringComparitor, logicalOp){
	if (textField.getValue().length != 0){
		cqlString += textField.getName() + stringComparitor + textField.getValue() + "'" + logicalOp;
	}
}

//adds the cql filter for a numberfield
function appendNumberFieldCql(numberField, comparisonOp, logicalOp){
	if (numberField.getValue().length != 0){
		cqlString += numberField.getName() + comparisonOp.getValue() + numberField.getValue() + logicalOp;
	}
}

//adds the cql filter for a date range
function appendDateRangeCql(startDate, endDate){
	
	if (startDate.getValue().length != 0){
		var dateString = "'" + startDate.getValue().format("Y-m-d") + "'"; 
		cqlString += startDate.getName() + ">=" + dateString + " AND ";
	}
	if (endDate.getValue().length != 0){
		var dateString = "'" + endDate.getValue().format("Y-m-d") + "'"; 
		cqlString += endDate.getName() + "<=" + dateString;
	}
}

// removes any trailing logical operator from the cql string 
function trimCql(logicalOp){
	var opLength = logicalOp.length;
	
	if(cqlString.substr(-opLength) === logicalOp) {
		cqlString = cqlString.substring(0, cqlString.length - opLength);
	}
}
