package org.auscope.portal.server.web.controllers;

import java.io.InputStream;
import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.httpclient.ConnectTimeoutException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.auscope.portal.server.util.GmlToKml;
import org.auscope.portal.server.web.ErrorMessages;
import org.auscope.portal.server.web.service.BomSummaryService;
import org.auscope.portal.server.web.view.JSONModelAndView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller that handles all Bureau of Meteorology related requests
 * <p>
 * It handles the following WML features:
 * <ul>
 * <li>monthly_climate_summary</li>
 * <li>daily_climate_summary</li>
 * <li>extreme</li>
 * </ul>
 * </p>
 * 
 * @author Shane Bailie
 * @version $Id$
 */
@Controller
public class BomFilterController {

    // -------------------------------------------------------------- Constants
    
    /** Log object for this class. */
    protected final Log log = LogFactory.getLog(getClass());
    
    // ----------------------------------------------------- Instance variables
    
    private BomSummaryService bomSummaryService;
    private GmlToKml gmlToKml;

    // ----------------------------------------------------------- Constructors
    
    @Autowired
    public BomFilterController
        ( BomSummaryService bomSummaryService,
          GmlToKml gmlToKml) {
        
        this.bomSummaryService = bomSummaryService;
        this.gmlToKml = gmlToKml;
    }

    // ------------------------------------------- Property Setters and Getters   
    
    /**
     * Handles the BOM Climate Summary filter queries.
     * 
     * @param featureType the feature type we are querying
     * @param serviceUrl the url of the service to query
     * @param stationId the id of the station to query for
     * @param maxTemp the max temperature to query for
     * @param minTemp the min temperature to query for
     * @param rainfall the rainfall amount to query for
     * @param airPressure the air pressure amount to query for
     * @param windSpeed the wind speed to query for
     * @param startDate the start date range to query for
     * @param endDate the end date range to query for
     * @param request the HTTP client request
     * @return a WFS response converted into KML
     */
    @RequestMapping("/doBomClimateSummaryFilter.do")
    public ModelAndView doBomClimateSummaryFilter(
    		@RequestParam("typeName") String featureType,
            @RequestParam("serviceUrl") String serviceUrl,
    		@RequestParam("cql_filter") String cql,
            HttpServletRequest request) {

        try {
            String gmlBlob;

            System.out.println("cql: " + cql);
            gmlBlob = this.bomSummaryService.getClimateSummaryGML(featureType, serviceUrl, cql);
            String kmlBlob =  convertToKml(gmlBlob, request, serviceUrl);
            //log.debug(kmlBlob);
            
            //This failure test should be made a little bit more robust
            //And should probably try to extract an error message
            if (kmlBlob == null || kmlBlob.length() == 0) {
            	return makeModelAndViewFailure(ErrorMessages.OPERATION_FAILED);
            } else {
            	return makeModelAndViewKML(kmlBlob, gmlBlob);
            }
        } catch (Exception e) {
            return this.handleExceptionResponse(e);
        }
    }
    
    /**
     * Exception resolver that maps exceptions to views presented to the user
     * @param exception
     * @return ModelAndView object with error message 
     */
    public ModelAndView handleExceptionResponse(Exception e) {

        log.error(e);

        // Service down or host down
        if(e instanceof ConnectException || e instanceof UnknownHostException) {
            return this.makeModelAndViewFailure(ErrorMessages.UNKNOWN_HOST_OR_FAILED_CONNECTION);
        }

        // Timouts
        if(e instanceof ConnectTimeoutException) {
            return this.makeModelAndViewFailure(ErrorMessages.OPERATION_TIMOUT);
        }
        
        if(e instanceof SocketTimeoutException) {
            return this.makeModelAndViewFailure(ErrorMessages.OPERATION_TIMOUT);
        }        

        // An error we don't specifically handle or expect
        return makeModelAndViewFailure(ErrorMessages.FILTER_FAILED);
    } 
   

    // ------------------------------------------------------ Protected Methods

    // ------------------------------------------------------ Private Methods
    /**
     * Create a new ModelAndView given a kml block and serialised xml document.
     * @param kmlBlob
     * @param gmlBlob
     * @return ModelAndView JSON response object
     */
    private ModelAndView makeModelAndViewKML(final String kmlBlob, final String gmlBlob) {
        final Map<String,String> data = new HashMap<String,String>();
        data.put("kml", kmlBlob);
        data.put("gml", gmlBlob);
        
        ModelMap model = new ModelMap();
        model.put("success", true);
        model.put("data", data);

        return new JSONModelAndView(model);
    }
    
    
    /**
     * Create a failure response
     *
     * @param message
     * @return
     */
    private ModelAndView makeModelAndViewFailure(final String message) {
        ModelMap model = new ModelMap();
        model.put("success", false);
        model.put("msg", message);                      
  
        return new JSONModelAndView(model);
    }
    
    
    /**
     * Assemble a call to convert GeoSciML into kml format 
     * @param geoXML
     * @param httpRequest
     * @param serviceUrl
     */
    private String convertToKml(String geoXML, HttpServletRequest httpRequest, String serviceUrl) {
        InputStream inXSLT = httpRequest.getSession().getServletContext().getResourceAsStream("/WEB-INF/xsl/kml.xsl");
        return gmlToKml.convert(geoXML, inXSLT, serviceUrl);
    }
}
