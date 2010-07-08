package org.auscope.portal.bom;

import org.auscope.portal.mineraloccurrence.IFilter;

/**
 * Class that represents ogc:Filter markup for climate summary queries
 * 
 * @author Shane Bailie
 * @version $Id$
 */
public class BomClimateSummaryFilter implements IFilter {
    private String stationId;
    private String maxTemp;
    private String minTemp;
    private String rainfall;
    private String airPressure;
    private String windSpeed;
    private String startDate;
    private String endDate;
    private boolean manyParameters;

    /**
     * Given search parameters, this object will build
     * a filter to search for climate summary data
     * 
     * @param stationId the id of the station to query for
     * @param maxTemp the max temperature to query for
     * @param minTemp the min temperature to query for
     * @param rainfall the rainfall amount to query for
     * @param airPressure the air pressure amount to query for
     * @param windSpeed the wind speed to query for
     * @param startDate the start date range to query for
     * @param endDate the end date range to query for
     */
    public BomClimateSummaryFilter(String stationId, 
    							   String maxTemp, 
    							   String minTemp,
    							   String rainfall, 
    							   String airPressure, 
    							   String windSpeed, 
    							   String startDate, 
    							   String endDate) {
    	this.stationId = stationId;
    	this.maxTemp = maxTemp;
    	this.minTemp = minTemp;
    	this.rainfall = rainfall;
    	this.airPressure = airPressure;
    	this.windSpeed = windSpeed;
    	this.startDate = startDate;
    	this.endDate = endDate;     
    	this.manyParameters = getParameterIndicator();
    }

    public String getFilterString() {  
    	
    	String result = "";
        StringBuffer filterClause = new StringBuffer();
        StringBuffer filterExpression  = new StringBuffer();
        
        filterClause.append("    <ogc:Filter>\n");

        if (manyParameters)
            filterExpression.append("      <ogc:And>\n");
        
        if(!this.stationId.equals("")) {
            filterExpression.append("        <ogc:PropertyIsEqualTo>\n");
            filterExpression.append("          <ogc:PropertyName>wml:station</ogc:PropertyName>\n");
            filterExpression.append("          <ogc:Literal>" + this.stationId + "</ogc:Literal>\n");
            filterExpression.append("        </ogc:PropertyIsEqualTo>\n");
        }
        if(!this.maxTemp.equals("")) {
            filterExpression.append("        <ogc:PropertyIsGreaterThan>\n");
            filterExpression.append("          <ogc:PropertyName>wml:max_temp</ogc:PropertyName>\n");
            filterExpression.append("          <ogc:Literal>" + this.maxTemp + "</ogc:Literal>\n");
            filterExpression.append("        </ogc:PropertyIsGreaterThan>");
        }
        if(!this.minTemp.equals("")) {
            filterExpression.append("        <ogc:PropertyIsLessThan>\n");
            filterExpression.append("          <ogc:PropertyName>wml:min_temp</ogc:PropertyName>\n");
            filterExpression.append("          <ogc:Literal>" + this.minTemp + "</ogc:Literal>\n");
            filterExpression.append("        </ogc:PropertyIsLessThan>");
        }
        if(!this.rainfall.equals("")) {
            filterExpression.append("        <ogc:PropertyIsGreaterThan>\n");
            filterExpression.append("          <ogc:PropertyName>wml:prce</ogc:PropertyName>\n");
            filterExpression.append("          <ogc:Literal>" + this.rainfall + "</ogc:Literal>\n");
            filterExpression.append("        </ogc:PropertyIsGreaterThan>");
        }
        if(!this.airPressure.equals("")) {
            filterExpression.append("        <ogc:PropertyIsGreaterThan>\n");
            filterExpression.append("          <ogc:PropertyName>wml:max_air_pressure</ogc:PropertyName>\n");
            filterExpression.append("          <ogc:Literal>" + this.airPressure + "</ogc:Literal>\n");
            filterExpression.append("        </ogc:PropertyIsGreaterThan>");
        }
        if(!this.windSpeed.equals("")) {
            filterExpression.append("        <ogc:PropertyIsGreaterThan>\n");
            filterExpression.append("          <ogc:PropertyName>wml:max_wind_speed</ogc:PropertyName>\n");
            filterExpression.append("          <ogc:Literal>" + this.windSpeed + "</ogc:Literal>\n");
            filterExpression.append("        </ogc:PropertyIsGreaterThan>");
        }
        if(!this.startDate.equals("")) {
            filterExpression.append("        <ogc:PropertyIsGreaterThanOrEqualTo>\n");
            filterExpression.append("          <ogc:PropertyName>wml:date</ogc:PropertyName>\n");
            filterExpression.append("          <ogc:Literal>" + this.startDate + "</ogc:Literal>\n");
            filterExpression.append("        </ogc:PropertyIsGreaterThanOrEqualTo>\n");
        }
        if(!this.endDate.equals("")) {
            filterExpression.append("        <ogc:PropertyIsLessThanOrEqualTo>\n");
            filterExpression.append("          <ogc:PropertyName>wml:date</ogc:PropertyName>\n");
            filterExpression.append("          <ogc:Literal>" + this.endDate + "</ogc:Literal>\n");
            filterExpression.append("        </ogc:PropertyIsLessThanOrEqualTo>\n");
        }
        
        if(manyParameters)
            filterExpression.append("      </ogc:And>\n");

        // If there are no query parameters and the query sting is empty, we are 
        // returning an empty string. In this case GetFeature request will be
        // sent without ogc:Filter clause
        if (filterExpression.length() != 0)  {
            filterExpression.append("    </ogc:Filter>\n");
            result = filterClause.append(filterExpression).toString();
        }
        
        return result;
    }
    
// -------------------------------------------------------- Private Methods
    
    /*
     * Checks if more than one query parameter have a value.   
     * @return <tt>true</tt> if more than one parameter is found
     */
    private boolean getParameterIndicator() {
        int howManyHaveaValue = 0;

        if(!this.stationId.equals(""))
            howManyHaveaValue++;
        if(!this.maxTemp.equals(""))
            howManyHaveaValue++;
        if(!this.minTemp.equals(""))
            howManyHaveaValue++;
        if(!this.rainfall.equals(""))
            howManyHaveaValue++;
        if(!this.airPressure.equals(""))
            howManyHaveaValue++;
        if(!this.windSpeed.equals(""))
            howManyHaveaValue++;
        if(!this.startDate.equals(""))
            howManyHaveaValue++;
        if(!this.endDate.equals(""))
            howManyHaveaValue++;

        if(howManyHaveaValue >= 2)
            return true;

        return false;
    }
}
