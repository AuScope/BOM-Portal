package org.auscope.portal.server.web.controllers;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.auscope.portal.csw.ICSWMethodMaker;
import org.auscope.portal.server.domain.filter.FilterBoundingBox;
import org.auscope.portal.server.domain.filter.IFilter;
import org.auscope.portal.server.util.GmlToKml;
import org.auscope.portal.server.web.WFSGetFeatureMethodMakerPOST;
import org.auscope.portal.server.web.service.HttpServiceCaller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


/**
 * Acts as a proxy to WFS's
 *
 * User: Mathew Wyatt
 * @version $Id: GSMLController.java 1661 2011-04-27 05:21:43Z JoshVote $
 */

@Controller
public class GSMLController extends BaseWFSToKMLController {
    private WFSGetFeatureMethodMakerPOST methodMaker;
    private IFilter filter;
    
    @Autowired
    public GSMLController(HttpServiceCaller httpServiceCaller,
                          GmlToKml gmlToKml,
                          WFSGetFeatureMethodMakerPOST methodMaker,
                          IFilter filter
                          ) {
        this.httpServiceCaller = httpServiceCaller;
        this.gmlToKml = gmlToKml;
        this.methodMaker = methodMaker;
        this.filter = filter;
    }
    

    /**
     * Given a service Url and a feature type this will query for all of the features, then convert them into KML,
     * to be displayed, assuming that the response will be complex feature GeoSciML
     *
     * @param serviceUrl
     * @param featureType
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/getAllFeatures.do")
    public ModelAndView requestAllFeatures(@RequestParam("serviceUrl") final String serviceUrl,
                                           @RequestParam("typeName") final String featureType,
                                           @RequestParam(required=false, value="bbox") final String bboxJSONString,
                                           @RequestParam(required=false, value="maxFeatures", defaultValue="0") int maxFeatures,
                                           HttpServletRequest request) throws Exception {

        
        FilterBoundingBox bbox = FilterBoundingBox.attemptParseFromJSON(bboxJSONString);
     
        String filterString;
        
        if (bbox == null) {
            filterString = filter.getFilterStringAllRecords();
        } else {
            filterString = filter.getFilterStringBoundingBox(bbox);
        }
        HttpMethodBase method = methodMaker.makeMethod(serviceUrl, featureType, filterString, maxFeatures, "http://www.opengis.net/gml/srs/epsg.xml#4326");
        
        String gmlResponse = httpServiceCaller.getMethodResponseAsString(method, 
                                                                     httpServiceCaller.getHttpClient());

        return makeModelAndViewKML(convertToKml(gmlResponse, request, serviceUrl), gmlResponse, method);
    }
    
    
    /**
     * Given a service Url, a feature type and a specific feature ID, this function will fetch the specific feature and 
     * then convert it into KML to be displayed, assuming that the response will be complex feature GeoSciML
     * @param serviceUrl
     * @param featureType
     * @param featureId
     * @param request
     * @return
     */
    @RequestMapping("/requestFeature.do")
    public ModelAndView requestFeature(@RequestParam("serviceUrl") final String serviceUrl,
            						   @RequestParam("typeName") final String featureType,
            						   @RequestParam("featureId") final String featureId,
            						   HttpServletRequest request) throws Exception {
    	String gmlResponse = httpServiceCaller.getMethodResponseAsString(new ICSWMethodMaker() {
            public HttpMethodBase makeMethod() {
                GetMethod method = new GetMethod(serviceUrl);

                ArrayList<NameValuePair> valuePairs = new ArrayList<NameValuePair>();
                
                //set all of the parameters
                valuePairs.add(new NameValuePair("request", "GetFeature"));
                valuePairs.add(new NameValuePair("typeName", featureType));
                valuePairs.add(new NameValuePair("featureId", featureId));
                

                //attach them to the method
                method.setQueryString((NameValuePair[]) valuePairs.toArray(new NameValuePair[valuePairs.size()]));

                return method;
            }
        }.makeMethod(), httpServiceCaller.getHttpClient());

        return makeModelAndViewKML(convertToKml(gmlResponse, request, serviceUrl), gmlResponse);
    }

}
