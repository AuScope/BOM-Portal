package org.auscope.portal.server.web.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.auscope.portal.core.server.controllers.BasePortalController;
import org.auscope.portal.core.services.CSWCacheService;
import org.auscope.portal.core.services.PortalServiceException;
import org.auscope.portal.core.services.SOSService;
import org.auscope.portal.core.services.methodmakers.filter.FilterBoundingBox;
import org.auscope.portal.core.services.methodmakers.filter.SimpleBBoxFilter;
import org.auscope.portal.core.services.responses.csw.AbstractCSWOnlineResource;
import org.auscope.portal.core.services.responses.csw.AbstractCSWOnlineResource.OnlineResourceType;
import org.auscope.portal.core.services.responses.csw.CSWRecord;
import org.auscope.portal.core.services.responses.sos.SOSResponse;
import org.auscope.portal.core.services.responses.wfs.WFSTransformedResponse;
import org.auscope.portal.server.web.service.SlakeService;
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

    private SlakeService slakeService;
    private SOSService sosService;
    private CSWCacheService cswCacheService;

    @Autowired
    public SurfaceReservoirController(SlakeService slakeService, SOSService sosService, CSWCacheService cswCacheService) {
        this.slakeService = slakeService;
        this.sosService = sosService;
        this.cswCacheService = cswCacheService;
    }

    @RequestMapping("/getSurfaceReservoirFeature.do")
    public ModelAndView doSurfaceReservoirFeature(@RequestParam("serviceUrl") final String serviceUrl,
                                           @RequestParam(required=false, value="bbox") String bboxJson,
                                           @RequestParam(required=false, value="maxFeatures") Integer maxFeatures,
                                           HttpServletRequest request) throws Exception {
        //Disabled bbox filtering for the time being
        //FilterBoundingBox bbox = FilterBoundingBox.attemptParseFromJSON(bboxJson);
        //String filter = new SimpleBBoxFilter().getFilterStringBoundingBox(bbox);

        try {
            WFSTransformedResponse response = slakeService.getSlakeResponseAsKml(serviceUrl, "", maxFeatures);

            return generateJSONResponseMAV(true, response.getGml(), response.getTransformed(), response.getMethod());
        } catch (Exception e) {
            log.warn(String.format("Error making service request to %1$s: %2$s", serviceUrl, e.getMessage()));
            log.debug("Exception: ", e);
            return this.generateExceptionResponse(e, serviceUrl);
        }
    }

    private String getSosUrl() {
        List<CSWRecord> recs = cswCacheService.getRecordCache();
        for (CSWRecord rec : recs) {
            AbstractCSWOnlineResource[] resources = rec.getOnlineResourcesByType(OnlineResourceType.SOS);
            if (resources.length > 0) {
                return resources[0].getLinkage().toString();
            }
        }

        return null;
    }

    @RequestMapping("/getSurfaceReservoirObservations.do")
    public ModelAndView doSurfaceReservoirObservations(HttpServletResponse response,
            @RequestParam("featureId") String featureId) throws Exception {
        String endpoint = getSosUrl();

        try {
            SOSResponse sosResponse = sosService.getObservationsForFeature(endpoint, featureId, null, null, null);
            return generateJSONResponseMAV(true, sosResponse.getSos(), sosResponse.getSos(), null);
        } catch (Exception ex) {
            log.warn("Exception downloading SOS: " + endpoint + " - " + featureId);
            log.debug("Exception:", ex);

            return generateJSONResponseMAV(false, null, "Error downloading SOS response.");
        }
    }
}

