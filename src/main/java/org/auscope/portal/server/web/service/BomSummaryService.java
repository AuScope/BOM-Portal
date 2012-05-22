package org.auscope.portal.server.web.service;

import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.auscope.portal.core.server.http.HttpServiceCaller;
import org.auscope.portal.core.services.BaseWFSService;
import org.auscope.portal.core.services.methodmakers.WFSGetFeatureMethodMaker;
import org.auscope.portal.core.services.responses.wfs.WFSTransformedResponse;
import org.auscope.portal.core.xslt.WfsToKmlTransformer;
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

    private WfsToKmlTransformer gmlToKml;

    // ----------------------------------------------------------- Constructors

    @Autowired
    public BomSummaryService(HttpServiceCaller httpServiceCaller,
            WFSGetFeatureMethodMaker wfsMethodMaker,
            WfsToKmlTransformer gmlToKml) {
        super(httpServiceCaller, wfsMethodMaker);
        this.gmlToKml = gmlToKml;
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
    public WFSTransformedResponse getClimateSummaryAsKml(String featureType, String serviceURL, String cql, int maxFeatures) throws Exception {

        log.debug(serviceURL + "\n" + cql);

        //create a GetFeature request with filter constraints on a query
        HttpMethodBase method = this.wfsMethodMaker.makeGetMethod(serviceURL, featureType, cql, maxFeatures, BaseWFSService.DEFAULT_SRS);

        try {
            String wfs = this.httpServiceCaller.getMethodResponseAsString(method);
            String kml = this.gmlToKml.convert(wfs, serviceURL);
            return new WFSTransformedResponse(wfs, kml, method);
        } catch (Exception ex) {
            throw new PortalServiceException(method, "Error requesting/parsing data", ex);
        }
    }
}
