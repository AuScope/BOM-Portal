// Builds a cql filter string based on user input and displays it in an
// editable textarea for manipulation if required
var cqlString;


function dailySummaryChangeHandler(formPanel)
{
    // get the input values
    cqlString = "";
    var station = formPanel.query("#dayStation")[0];
    var opStation = formPanel.query("#dayOpStation")[0];
    var tempType = formPanel.query("#dayTempType")[0];
    var tempValue = formPanel.query("#dayTempValue")[0];
    var opTemp = formPanel.query("#dayOpTemp")[0];
    var rainfall = formPanel.query("#dayRainfall")[0];
    var opRainfall = formPanel.query("#dayOpRainfall")[0];
    //var airPressure = formPanel.query("#dayAirPressure")[0];
    //var opAirPressure = formPanel.query("#dayOpAirPressure")[0];
    var windSpeed = formPanel.query("#dayWindSpeed")[0];
    var opWindSpeed = formPanel.query("#dayOpWindSpeed")[0];
    var windDirection = formPanel.query("#dayWindDirection")[0];
    var opWindDirection = formPanel.query("#dayOpWindDirection")[0];
    var startDate = formPanel.query("#dayStartDate")[0];
    var endDate = formPanel.query("#dayEndDate")[0];
    var opLogic = formPanel.query("#dayOpLogic")[0];
    var opLogicString = opLogic.getValue();
    var cql = formPanel.query("#dayCql")[0];
    var stringComparitor = " like '";

    // string the entered values together to construct the cql
    appendNumberFieldCql(station, opStation, opLogicString);

    // specific processing for the temp select input
    if (tempType.getValue() && tempType.getValue().length > 0 && tempValue.getValue() && tempValue.getValue().length != 0){
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

function monthlySummaryChangeHandler(formPanel)
{
    // get the input values
    cqlString = "";
    var station = formPanel.query("#monStation")[0];
    var opStation = formPanel.query("#monOpStation")[0];
    var tempType = formPanel.query("#monTempType")[0];
    var tempValue = formPanel.query("#monTempValue")[0];
    var opTemp = formPanel.query("#monOpTemp")[0];
    var rainfall = formPanel.query("#monRainfall")[0];
    var opRainfall = formPanel.query("#monOpRainfall")[0];
    var airPressure = formPanel.query("#monAirPressure")[0];
    var opAirPressure = formPanel.query("#monOpAirPressure")[0];
    var windSpeed = formPanel.query("#monWindSpeed")[0];
    var opWindSpeed = formPanel.query("#monOpWindSpeed")[0];
    var windDirection = formPanel.query("#monWindDirection")[0];
    var opWindDirection = formPanel.query("#monOpWindDirection")[0];
    var startDate = formPanel.query("#monStartDate")[0];
    var endDate = formPanel.query("#monEndDate")[0];
    var opLogic = formPanel.query("#monOpLogic")[0];
    var opLogicString = opLogic.getValue();
    var cql = formPanel.query("#monCql")[0];
    var stringComparitor = " like '";

    // string the entered values together to construct the cql
    appendNumberFieldCql(station, opStation, opLogicString);

    // specific processing for the temp select input
    if (tempType.getValue() && tempValue.getValue()) {
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

function extremeChangeHandler(formPanel)
{
    // get the input values
    cqlString = "";
    var station = formPanel.query("#xStation")[0];
    var opStation = formPanel.query("#xOpStation")[0];
    var maxTemp = formPanel.query("#xMaxTemp")[0];
    var opMaxTemp = formPanel.query("#xOpMaxTemp")[0];
    var minTemp = formPanel.query("#xMinTemp")[0];
    var opMinTemp = formPanel.query("#xOpMinTemp")[0];
    var maxAirPressure = formPanel.query("#xMaxAirPressure")[0];
    var opMaxAirPressure = formPanel.query("#xOpMaxAirPressure")[0];
    var minAirPressure = formPanel.query("#xMinAirPressure")[0];
    var opMinAirPressure = formPanel.query("#xOpMinAirPressure")[0];
    var maxWindSpeed = formPanel.query("#xMaxWindSpeed")[0];
    var opMaxWindSpeed = formPanel.query("#xOpMaxWindSpeed")[0];
    var minWindSpeed = formPanel.query("#xMinWindSpeed")[0];
    var opMinWindSpeed = formPanel.query("#xOpMinWindSpeed")[0];
    var maxWindDirection = formPanel.query("#xMaxWindDirection")[0];
    var opMaxWindDirection = formPanel.query("#xOpMaxWindDirection")[0];
    var minWindDirection = formPanel.query("#xMinWindDirection")[0];
    var opMinWindDirection = formPanel.query("#xOpMinWindDirection")[0];
    var maxMonthlyRainfall = formPanel.query("#xMaxMonthlyRainfall")[0];
    var opMaxMonthlyRainfall = formPanel.query("#xOpMaxMonthlyRainfall")[0];
    var maxDailyRainfall = formPanel.query("#xMaxDailyRainfall")[0];
    var opMaxDailyRainfall = formPanel.query("#xOpMaxDailyRainfall")[0];
    var opLogic = formPanel.query("#xOpLogic")[0];
    var opLogicString = opLogic.getValue();
    var cql = formPanel.query("#xCql")[0];
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
    if (numberField.getValue() !== null && numberField.getValue() !== undefined){
        cqlString += numberField.getName() + comparisonOp.getValue() + numberField.getValue() + logicalOp;
    }
}

//adds the cql filter for a date range
function appendDateRangeCql(startDate, endDate){

    if (startDate.getValue().length != 0){
        var dateString = "'" + Ext.util.Format.date(startDate.getValue(), "Y-m-d") + "'";
        cqlString += startDate.getName() + ">=" + dateString + " AND ";
    }
    if (endDate.getValue().length != 0){
        var dateString = "'" + Ext.util.Format.date(endDate.getValue(), "Y-m-d") + "'";
        cqlString += endDate.getName() + "<=" + dateString;
    }
}

// removes any trailing logical operator from the cql string
function trimCql(logicalOp){
    var opLength = logicalOp.length;

    if(cqlString.substr(cqlString.length - opLength) === logicalOp) {
        cqlString = cqlString.substring(0, cqlString.length - opLength);
    }
}
