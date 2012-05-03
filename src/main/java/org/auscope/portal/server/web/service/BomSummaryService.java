package org.auscope.portal.server.web.service;

import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.auscope.portal.server.domain.wfs.WFSKMLResponse;
import org.auscope.portal.server.util.GmlToHtml;
import org.auscope.portal.server.util.GmlToKml;
import org.auscope.portal.server.web.WFSGetFeatureMethodMaker;
import org.auscope.portal.server.web.WFSGetFeatureMethodMaker.ResultType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Manages BOM summary queries
 *
 * @version $Id$
 */
@Service
public class BomSummaryService extends BaseWFSService {

    // -------------------------------------------------------------- Constants

    protected final Log log = LogFactory.getLog(getClass());


    // ----------------------------------------------------------- Constructors

    @Autowired
    public BomSummaryService(HttpServiceCaller httpServiceCaller,
            WFSGetFeatureMethodMaker wfsMethodMaker,
            GmlToKml gmlToKml, GmlToHtml gmlToHtml) {
        super(httpServiceCaller, wfsMethodMaker, gmlToKml, gmlToHtml);
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
    public WFSKMLResponse getClimateSummaryAsKml(String featureType, String serviceURL, String cql, int maxFeatures) throws Exception {

        log.debug(serviceURL + "\n" + cql);

        //create a GetFeature request with filter constraints on a query
        HttpMethodBase method = this.generateWFSRequest(serviceURL, featureType, null, cql, true, maxFeatures, null, ResultType.Hits);

        return this.getWfsResponseAsKml(serviceURL, method);
    }
}
