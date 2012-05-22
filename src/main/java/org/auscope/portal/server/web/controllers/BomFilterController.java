package org.auscope.portal.server.web.controllers;

import javax.servlet.http.HttpServletRequest;

import org.auscope.portal.core.server.PortalPropertyPlaceholderConfigurer;
import org.auscope.portal.core.server.controllers.BasePortalController;
import org.auscope.portal.core.services.responses.wfs.WFSTransformedResponse;
import org.auscope.portal.server.web.service.BomSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
 * <li>high_quality_data_network_view</li>
 * </ul>
 * </p>
 *
 * @author Shane Bailie
 * @version $Id$
 */
@Controller
public class BomFilterController extends BasePortalController {

    // ----------------------------------------------------- Instance variables

    private BomSummaryService bomSummaryService;
    private PortalPropertyPlaceholderConfigurer hostConfigurer;

    // ----------------------------------------------------------- Constructors

    @Autowired
    public BomFilterController( BomSummaryService bomSummaryService,
                                PortalPropertyPlaceholderConfigurer hostConfigurer) {

        this.bomSummaryService = bomSummaryService;
        this.hostConfigurer = hostConfigurer;
    }

    // ------------------------------------------- Property Setters and Getters

    /**
     * Handles the BOM Climate Summary filter queries.
     *
     * @param featureType the feature type we are querying
     * @param serviceUrl the url of the service to query
     * @param cql the cql filter to apply to the query
     * @param request the HTTP client request
     * @return a WFS response converted into KML
     */
    @RequestMapping("/doBomClimateSummaryFilter.do")
    public ModelAndView doBomClimateSummaryFilter(
            @RequestParam("typeName") String featureType,
            @RequestParam("serviceUrl") String serviceUrl,
            @RequestParam("cql_filter") String cql,
            @RequestParam(required=false, value="maxFeatures", defaultValue="0") int maxFeatures,
            HttpServletRequest request) {

        try {
            WFSTransformedResponse response = this.bomSummaryService.getClimateSummaryAsKml(featureType, serviceUrl, cql, maxFeatures);
            return generateJSONResponseMAV(true, response.getGml(), response.getTransformed(), response.getMethod());
        } catch (Exception e) {
            return this.generateExceptionResponse(e, serviceUrl);
        }
    }

    /**
     * Handles the BOM Climate Summary filter queries.
     *
     * @param featureType the feature type we are querying
     * @param serviceUrl the url of the service to query
     * @param data the data type value to query on
     * @param period the period value to query on
     * @param request the HTTP client request
     * @return a WFS response converted into KML
     */
    @RequestMapping("/doBomHighQualityDataFilter.do")
    public ModelAndView doBomHighQualityDataFilter(
            @RequestParam("typeName") String featureType,
            @RequestParam("serviceUrl") String serviceUrl,
            @RequestParam("data") String data,
            @RequestParam("period") String period,
            @RequestParam(required=false, value="maxFeatures", defaultValue="0") int maxFeatures,
            HttpServletRequest request) {

        try {
            StringBuffer cql = new StringBuffer();
            String climateReportDataType = "0";
            String climateReportPeriod = "0";

            // we will need to construct 2 urls: 1 for the WFS request and another for a Climate report.
            // data and period are in the format wfsType|climateReportType as the mappings for each are different.
            // we need to split these into individual parameters.
            if (data != null) {
                String[] dataArray = data.split("\\|");
                cql.append("measurement_type=" + dataArray[0] + " AND ");
                climateReportDataType = dataArray[1];
            }
            if (period != null) {
                String[] periodArray = period.split("\\|");
                cql.append(periodArray[0] + "='Y'");
                climateReportPeriod = periodArray[1];
            }
            else {
                // remove the trailing AND
                cql.delete(cql.length()-3, cql.length());
            }

            WFSTransformedResponse response = this.bomSummaryService.getClimateSummaryAsKml(featureType, serviceUrl, cql.toString(), maxFeatures);
            ModelAndView mav = generateJSONResponseMAV(true, response.getGml(), response.getTransformed(), response.getMethod());

            mav.addObject("climateReportUrl", hostConfigurer.resolvePlaceholder("HOST.climatereport.url"));
            mav.addObject("climateReportMType", climateReportDataType);
            mav.addObject("climateReportPType", climateReportPeriod);

            return mav;
        } catch (Exception e) {
            return this.generateExceptionResponse(e, serviceUrl);
        }
    }
}
