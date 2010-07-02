package org.auscope.portal.server.web.service;

import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.auscope.portal.bom.BomMonthlySummaryFilter;
import org.auscope.portal.server.web.IWFSGetFeatureMethodMaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Manages BOM summary queries
 *
 * @version $Id$
 */
@Service
public class BomSummaryService {

    // -------------------------------------------------------------- Constants
    
    protected final Log log = LogFactory.getLog(getClass());
    
    // ----------------------------------------------------- Instance variables
    
    private HttpServiceCaller httpServiceCaller;
    private IWFSGetFeatureMethodMaker methodMaker;

    
    // ----------------------------------------------------------- Constructors

    @Autowired
    public BomSummaryService( HttpServiceCaller httpServiceCaller,                                      
                                     IWFSGetFeatureMethodMaker methodMaker ) {
        this.httpServiceCaller = httpServiceCaller;
        this.methodMaker = methodMaker;
    }

    
    // ------------------------------------------- Property Setters and Getters 
    
    /**
     * Given a list of parameters, call a service and get the monthly summary GML
     *
     * @param serviceUrl the url of the service to query
     * @param stationId the id of the station to query for
     * @param maxTemp the max temperature to query for
     * @param minTemp the min temperature to query for
     * @param rainfall the rainfall amount to query for
     * @param airPressure the air pressure amount to query for
     * @param windSpeed the wind speed to query for
     * @param startDate the start date range to query for
     * @param endDate the end date range to query for
     * @return The GML result from the service query
     * @throws Exception
     */
    public String getMonthlySummaryGML(String serviceURL, String stationId, String maxTemp, String minTemp,
    		String rainfall, String airPressure, String windSpeed, String startDate, String endDate) throws Exception {
        //create a filter for the specified search parameters
        BomMonthlySummaryFilter summaryFilter = new BomMonthlySummaryFilter(stationId, maxTemp, minTemp,
            	rainfall, airPressure, windSpeed, startDate, endDate);

        log.debug("\n" + serviceURL + "\n" + summaryFilter.getFilterString());

        //create a GetFeature request with filter constraints on a query
        HttpMethodBase method = methodMaker.makeMethod(serviceURL, "wml:monthly_climate_summary_loc", summaryFilter.getFilterString());

        //call the service, and get the summary
        return httpServiceCaller.getMethodResponseAsString(method, httpServiceCaller.getHttpClient());
    }
}
