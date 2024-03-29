package org.auscope.portal.server.web.controllers;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.httpclient.URI;
import org.auscope.portal.core.services.PortalServiceException;
import org.auscope.portal.core.services.methodmakers.filter.SimplePropertyFilter;
import org.auscope.portal.core.services.responses.wfs.WFSCountResponse;
import org.auscope.portal.core.services.responses.wfs.WFSTransformedResponse;
import org.auscope.portal.core.test.ByteBufferedServletOutputStream;
import org.auscope.portal.core.test.PortalTestClass;
import org.auscope.portal.server.web.service.WFSService;
import org.jmock.Expectations;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;
/**
 * Unit tests for GSMLController
 *
 * @author Matthew Wyatt
 * @author Josh Vote
 */
public class TestWFSController extends PortalTestClass {

    /**
     * The controller to test
     */
    private WFSController wfsController;


    private HttpMethodBase mockMethod = context.mock(HttpMethodBase.class);

    private WFSService mockWfsService = context.mock(WFSService.class);

    private HttpServletResponse mockResponse = context.mock(HttpServletResponse.class);

    @Before
    public void setUp() {
        wfsController = new WFSController(mockWfsService);
    }

    /**
     * Test that all classes are invoked correctly and return valid JSON
     */
    @Test
    public void testGetAllFeatures() throws Exception {
        final String gmlBlob = "gmlBlob";
        final String kmlBlob = "kmlBlob";
        final String wfsUrl = "http://service/wfs";
        final String featureType = "type:name";
        final int maxFeatures = 1234;
        final String srs = null;
        final String bboxJsonString = null;

        context.checking(new Expectations() {{
            oneOf(mockWfsService).getWfsResponseAsKml(with(equal(wfsUrl)), with(equal(featureType)), with(any(String.class)), with(equal(maxFeatures)), with(equal(srs)));will(returnValue(new WFSTransformedResponse(gmlBlob, kmlBlob, mockMethod)));

            allowing(mockMethod).getURI();will(returnValue(new URI("http://service.wfs/wfs", false)));
        }});

        ModelAndView modelAndView = wfsController.requestAllFeatures(wfsUrl, featureType, bboxJsonString, maxFeatures);
        ModelMap dataObj = (ModelMap) modelAndView.getModel().get("data");
        Assert.assertTrue((Boolean) modelAndView.getModel().get("success"));
        Assert.assertNotNull(dataObj);
        Assert.assertEquals(gmlBlob, dataObj.get("gml"));
        Assert.assertEquals(kmlBlob, dataObj.get("kml"));
    }

    @Test
    public void testGetAllFeaturesInBbox() throws Exception {
        final String gmlBlob = "gmlBlob";
        final String kmlBlob = "kmlBlob";
        final String wfsUrl = "http://service/wfs";
        final String featureType = "type:name";
        final int maxFeatures = 1234;
        final String srs = null;
        final String bboxJsonString = "{\"bboxSrs\":\"http://www.opengis.net/gml/srs/epsg.xml%234326\",\"lowerCornerPoints\":[-5,-6],\"upperCornerPoints\":[7,8]}";

        context.checking(new Expectations() {{
            oneOf(mockWfsService).getWfsResponseAsKml(with(equal(wfsUrl)), with(equal(featureType)), with(any(String.class)), with(equal(maxFeatures)), with(equal(srs)));will(returnValue(new WFSTransformedResponse(gmlBlob, kmlBlob, mockMethod)));

            allowing(mockMethod).getURI();will(returnValue(new URI("http://service.wfs/wfs", false)));
        }});

        ModelAndView modelAndView = wfsController.requestAllFeatures(wfsUrl, featureType, bboxJsonString, maxFeatures);
        ModelMap dataObj = (ModelMap) modelAndView.getModel().get("data");
        Assert.assertTrue((Boolean) modelAndView.getModel().get("success"));
        Assert.assertNotNull(dataObj);
        Assert.assertEquals(gmlBlob, dataObj.get("gml"));
        Assert.assertEquals(kmlBlob, dataObj.get("kml"));
    }

    @Test
    public void testRequestFeature() throws Exception {
        final String gmlBlob = "gmlBlob";
        final String kmlBlob = "kmlBlob";
        final String wfsUrl = "http://service/wfs";
        final String featureType = "type:name";
        final String featureId = "feature-id";
        final String outputFormat = "of";

        context.checking(new Expectations() {{
            oneOf(mockWfsService).getWfsResponseAsKml(wfsUrl, featureType, featureId, outputFormat);will(returnValue(new WFSTransformedResponse(gmlBlob, kmlBlob, mockMethod)));

            allowing(mockMethod).getURI();will(returnValue(new URI("http://service.wfs/wfs", false)));
        }});

        ModelAndView modelAndView = wfsController.requestFeature(wfsUrl, featureType, featureId, outputFormat);
        ModelMap dataObj = (ModelMap) modelAndView.getModel().get("data");
        Assert.assertTrue((Boolean) modelAndView.getModel().get("success"));
        Assert.assertNotNull(dataObj);
        Assert.assertEquals(gmlBlob, dataObj.get("gml"));
        Assert.assertEquals(kmlBlob, dataObj.get("kml"));
    }

    @Test
    public void testRequestFeatureByProperty() throws Exception {
        final String gmlBlob = "gmlBlob";
        final String kmlBlob = "kmlBlob";
        final String wfsUrl = "http://service/wfs";
        final String featureType = "type:name";
        final String featureProperty = "feature/property";
        final String propertyValue = "comparison value";

        final String filterString = new SimplePropertyFilter(featureProperty, propertyValue).getFilterStringAllRecords();

        context.checking(new Expectations() {{
            oneOf(mockWfsService).getWfsResponseAsKml(wfsUrl, featureType, filterString, null, null);will(returnValue(new WFSTransformedResponse(gmlBlob, kmlBlob, mockMethod)));

            allowing(mockMethod).getURI();will(returnValue(new URI("http://service.wfs/wfs", false)));
        }});

        ModelAndView modelAndView = wfsController.requestFeatureByProperty(wfsUrl, featureType, featureProperty, propertyValue);
        ModelMap dataObj = (ModelMap) modelAndView.getModel().get("data");
        Assert.assertTrue((Boolean) modelAndView.getModel().get("success"));
        Assert.assertNotNull(dataObj);
        Assert.assertEquals(gmlBlob, dataObj.get("gml"));
        Assert.assertEquals(kmlBlob, dataObj.get("kml"));
    }

    /**
     * Tests get feature count works as expected
     * @throws Exception
     */
    @Test
    public void testGetFeatureCount() throws Exception {
        final String wfsUrl = "http://service/wfs";
        final String featureType = "type:name";
        final String bboxJsonString = "{\"bboxSrs\":\"http://www.opengis.net/gml/srs/epsg.xml%234326\",\"lowerCornerPoints\":[-5,-6],\"upperCornerPoints\":[7,8]}";
        final int maxFeatures = 12315;
        final int featureCount = 21;

        context.checking(new Expectations() {{
            oneOf(mockWfsService).getWfsFeatureCount(with(equal(wfsUrl)), with(equal(featureType)), with(any(String.class)), with(equal(maxFeatures)), with(equal((String) null)));will(returnValue(new WFSCountResponse(featureCount)));
        }});
        ModelAndView modelAndView = wfsController.requestFeatureCount(wfsUrl, featureType, bboxJsonString, maxFeatures);
        Integer dataObj = (Integer) modelAndView.getModel().get("data");
        Assert.assertTrue((Boolean) modelAndView.getModel().get("success"));
        Assert.assertNotNull(dataObj);
        Assert.assertEquals(new Integer(featureCount), dataObj);
    }

    /**
     * Tests get feature count works as expected
     * @throws Exception
     */
    @Test
    public void testGetFeatureCountException() throws Exception {
        final String wfsUrl = "http://service/wfs";
        final String featureType = "type:name";
        final String bboxJsonString = "{\"bboxSrs\":\"http://www.opengis.net/gml/srs/epsg.xml%234326\",\"lowerCornerPoints\":[-5,-6],\"upperCornerPoints\":[7,8]}";
        final int maxFeatures = 12315;

        context.checking(new Expectations() {{
            oneOf(mockWfsService).getWfsFeatureCount(with(equal(wfsUrl)), with(equal(featureType)), with(any(String.class)), with(equal(maxFeatures)), with(equal((String)null)));will(throwException(new PortalServiceException((HttpMethodBase)null)));
        }});
        ModelAndView modelAndView = wfsController.requestFeatureCount(wfsUrl, featureType, bboxJsonString, maxFeatures);
        Assert.assertFalse((Boolean) modelAndView.getModel().get("success"));
    }
}
