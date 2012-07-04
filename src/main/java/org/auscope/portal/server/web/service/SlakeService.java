package org.auscope.portal.server.web.service;

import org.apache.commons.httpclient.HttpMethodBase;
import org.auscope.portal.core.server.http.HttpServiceCaller;
import org.auscope.portal.core.services.BaseWFSService;
import org.auscope.portal.core.services.PortalServiceException;
import org.auscope.portal.core.services.methodmakers.WFSGetFeatureMethodMaker;
import org.auscope.portal.core.services.methodmakers.WFSGetFeatureMethodMaker.ResultType;
import org.auscope.portal.core.services.responses.ows.OWSExceptionParser;
import org.auscope.portal.core.services.responses.wfs.WFSCountResponse;
import org.auscope.portal.core.services.responses.wfs.WFSTransformedResponse;
import org.auscope.portal.server.domain.wfs.SlakeKmlTransformer;
import org.springframework.stereotype.Service;

/**
 * Service for interacting with a Surface Lake Reservoir WFS
 * @author Josh Vote
 *
 */
public class SlakeService extends BaseWFSService {

    public static final String OUTPUT_FORMAT = "gml32";

    private SlakeKmlTransformer transformer;

    /**
     * @param httpServiceCaller Will be used to make requests
     * @param wfsMethodMaker Will be used to generate requests
     */
    public SlakeService(HttpServiceCaller httpServiceCaller,
            WFSGetFeatureMethodMaker wfsMethodMaker,
            SlakeKmlTransformer transformer) {
        super(httpServiceCaller, wfsMethodMaker);
        this.transformer = transformer;
    }

    private WFSTransformedResponse doRequestAndKmlTransform(HttpMethodBase method, String serviceUrl) throws PortalServiceException {
        try {
            String wfs = httpServiceCaller.getMethodResponseAsString(method);
            OWSExceptionParser.checkForExceptionResponse(wfs);
            String kml = transformer.convert(wfs, serviceUrl);

            return new WFSTransformedResponse(wfs, kml, method);
        } catch (Exception ex) {
            throw new PortalServiceException(method, ex);
        }
    }

    /**
     * Gets a response from a slake service transformed into KML
     * @param wfsUrl The WFS endpoint with slake features
     * @param filter [Optional] An OGC filter string
     * @param maxFeatures [Optional] the maximum number of features to get
     * @return
     * @throws PortalServiceException
     */
    public WFSTransformedResponse getSlakeResponseAsKml(String wfsUrl, String filter, Integer maxFeatures) throws PortalServiceException {
        HttpMethodBase method = generateWFSRequest(wfsUrl, "slake:SurfaceReservoir", null, filter, maxFeatures, "EPSG:4326", ResultType.Results, OUTPUT_FORMAT);
        return doRequestAndKmlTransform(method, wfsUrl);
    }

    /**
     * Gets a response from a slake service as a count of all matching reservoirs
     * @param wfsUrl The WFS endpoint with slake features
     * @param filter [Optional] An OGC filter string
     * @param maxFeatures [Optional] the maximum number of features to get
     * @return
     * @throws PortalServiceException
     */
    public WFSCountResponse getSlakeCount(String wfsUrl, String filter, Integer maxFeatures) throws PortalServiceException {
        HttpMethodBase method = generateWFSRequest(wfsUrl, "slake:SurfaceReservoir", null, filter, maxFeatures, "EPSG:4326", ResultType.Hits, OUTPUT_FORMAT);
        return getWfsFeatureCount(method);
    }
}
