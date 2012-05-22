package org.auscope.portal.server.web.controllers;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.auscope.portal.core.server.controllers.BasePortalController;
import org.auscope.portal.core.services.responses.wfs.WFSTransformedResponse;
import org.auscope.portal.server.web.service.WFSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SurfaceReservoirController extends BasePortalController {

    /** Log object for this class. */
    protected final Log log = LogFactory.getLog(getClass());

    private WFSService wfsService;

    @Autowired
    public SurfaceReservoirController(WFSService wfsService) {
        this.wfsService = wfsService;
    }

    @RequestMapping("/getSurfaceReservoirFeature.do")
    public ModelAndView doSurfaceReservoirFeature(@RequestParam("serviceUrl") final String serviceUrl,
                                           @RequestParam("typeName") final String featureType,
                                           @RequestParam(required=false, value="maxFeatures", defaultValue="0") int maxFeatures,
                                           HttpServletRequest request) throws Exception {
        try{
            WFSTransformedResponse response = wfsService.getWfsResponseAsKml(serviceUrl, "slake:SurfaceReservoir" , "", maxFeatures, "EPSG:4326");

            return generateJSONResponseMAV(true, response.getGml(), response.getTransformed(), response.getMethod());
        }catch (Exception e) {
            return this.generateExceptionResponse(e, serviceUrl);
        }
    }
}

