package org.auscope.portal.server.web.service;

import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
     * Given a list of parameters, call a service and get the climate summary GML
     *
     * @param serviceUrl the url of the service to query
     * @param stationId the id of the station to query for
     * @param cql the cql filter string
     * @param maxFeatures 
     * @return The GML result from the service query
     * @throws Exception
     */
    public String getClimateSummaryGML(String featureType, String serviceURL, String cql, int maxFeatures) throws Exception {

        log.debug("\n" + serviceURL + "\n" + cql);

        //create a GetFeature request with filter constraints on a query
        HttpMethodBase method = methodMaker.makeMethod(serviceURL, featureType, cql, maxFeatures);

        //call the service, and get the summary
        return httpServiceCaller.getMethodResponseAsString(method, httpServiceCaller.getHttpClient());
    }
}
