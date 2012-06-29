package org.auscope.portal.server.web.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.auscope.portal.core.cloud.CloudJob;
import org.auscope.portal.core.server.controllers.BasePortalController;
import org.auscope.portal.core.services.SOSService;
import org.auscope.portal.core.services.responses.sos.SOSResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller interface into SOS services
 * @author Josh Vote
 *
 */
public class SOSController extends BasePortalController {
    private SOSService sosService;

    @Autowired
    public SOSController(SOSService sosService) {
        this.sosService = sosService;
    }

    /**
     * This is for converting our String dates (frontend) to actual data objects (backend).
     *
     * Date format will match "yyyyMMdd_HHmmss"
     * @param binder
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        CustomDateEditor editor = new CustomDateEditor(new SimpleDateFormat("yyyyMMdd_HHmmss"), true);
        binder.registerCustomEditor(Date.class, editor);
    }

    @RequestMapping("/getObservationsForFeature.do")
    public ModelAndView getObservationsForFeature(@RequestParam(value="serviceUrl", required=true) String serviceUrl,
            @RequestParam(value="featureOfInterest", required=true) String featureOfInterest,
            @RequestParam(value="start", required=false) Date start,
            @RequestParam(value="end", required=false) Date end,
            @RequestParam(value="bbox", required=false) String bboxJson) {
        SOSResponse response = new SOSResponse("<todo/>", null);
        return generateJSONResponseMAV(false, response, "");
    }
}
