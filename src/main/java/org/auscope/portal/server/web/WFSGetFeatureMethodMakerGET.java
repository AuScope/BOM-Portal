package org.auscope.portal.server.web;

import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
/**
 * User: Shane Bailie
 * 
 * @version $Id$
 */
@Repository
public class WFSGetFeatureMethodMakerGET implements IWFSGetFeatureMethodMaker {
    
    /** Log object for this class. */
    protected final Log log = LogFactory.getLog(getClass());

    
    /**
     * Creates a GetMethod given the following parameters
     * @param serviceURL - required, exception thrown if not provided
     * @param featureType - required, exception thrown if not provided
     * @param filterString - optional
     * @return
     * @throws Exception if service URL or featureType is not provided
     */
    public HttpMethodBase makeMethod(String serviceURL, String featureType, String filterString) throws Exception {

    	// Make sure the required parameters are given
        if (featureType == null || featureType.equals(""))
            throw new Exception("featureType parameter can not be null or empty.");

        if (serviceURL == null || serviceURL.equals(""))
            throw new Exception("serviceURL parameter can not be null or empty.");
        
    	GetMethod method = new GetMethod(serviceURL);
    	
        //set all of the parameters
        NameValuePair service    = new NameValuePair("service", "WFS");
        NameValuePair version    = new NameValuePair("version", "1.1.0");
        NameValuePair request    = new NameValuePair("request", "GetFeature");
        //NameValuePair maxRecords = new NameValuePair("maxFeatures", "200");
        NameValuePair typeNames  = new NameValuePair("typeName", featureType);
        NameValuePair srsName = new NameValuePair("srsName", "EPSG:4326");
        NameValuePair constraint = new NameValuePair("cql_filter", filterString);

        //attach them to the method
        method.setQueryString(new NameValuePair[]{service, version, request, /*maxRecords,*/ typeNames, srsName, constraint});
        
        String queryStr = method.getName() 
                        + " query sent to GeoNetwork: \n\t" 
                        + serviceURL + "?" + method.getQueryString();
        
        log.debug(queryStr);

        return method;
    }
}
