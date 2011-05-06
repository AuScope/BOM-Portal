package org.auscope.portal.server.web.controllers;

import java.io.InputStream;
import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.httpclient.ConnectTimeoutException;
import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.auscope.portal.server.domain.filter.IFilter;
import org.auscope.portal.server.util.GmlToKml;
import org.auscope.portal.server.web.ErrorMessages;
import org.auscope.portal.server.web.IWFSGetFeatureMethodMaker;
import org.auscope.portal.server.web.service.HttpServiceCaller;
import org.auscope.portal.server.web.view.JSONModelAndView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SurfaceReservoirController {
	
	/** Log object for this class. */
    protected final Log log = LogFactory.getLog(getClass());
    
	private IWFSGetFeatureMethodMaker methodMaker;
    private IFilter filter;
    private HttpServiceCaller httpServiceCaller;
    private GmlToKml gmlToKml;
    
    @Autowired
    public SurfaceReservoirController(HttpServiceCaller httpServiceCaller,
                          GmlToKml gmlToKml,
                          IWFSGetFeatureMethodMaker methodMaker,
                          IFilter filter
                          ) {
    	this.gmlToKml = gmlToKml;
    	this.httpServiceCaller = httpServiceCaller;
        this.methodMaker = methodMaker;
        this.filter = filter;
    }
    
    @RequestMapping("/getSurfaceReservoirFeature.do")
    public ModelAndView doSurfaceReservoirFeature(@RequestParam("serviceUrl") final String serviceUrl,
                                           @RequestParam("typeName") final String featureType,
                                           @RequestParam(required=false, value="maxFeatures", defaultValue="0") int maxFeatures,
                                           HttpServletRequest request) throws Exception {

        
        
        HttpMethodBase method = null;
        try{
	        String filterString;
	            filterString = filter.getFilterStringAllRecords();
	        
	        method = methodMaker.makeMethod(serviceUrl, "slake:SurfaceReservoir" , filterString, maxFeatures, "EPSG:4326");
	        
	        String gmlResponse = httpServiceCaller.getMethodResponseAsString(method, 
	                                                                     httpServiceCaller.getHttpClient());
	        /*String kmlBlob =  convertToKml(gmlResponse, request, serviceUrl);
	        
	        if (kmlBlob == null || kmlBlob.length() == 0) {
	        	log.error(String.format("Transform failed serviceUrl='%1$s' gmlBlob='%2$s'",serviceUrl, gmlResponse));
            	return makeModelAndViewFailure(ErrorMessages.OPERATION_FAILED);
            } else {
            	return makeModelAndViewKML(kmlBlob, gmlResponse);
            }*/
	        return makeModelAndViewKML(convertToKml(gmlResponse, request, serviceUrl), gmlResponse);
        }catch (Exception e) {
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

