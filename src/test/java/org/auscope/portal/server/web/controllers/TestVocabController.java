package org.auscope.portal.server.web.controllers;

import org.apache.commons.httpclient.HttpMethodBase;
import org.auscope.portal.core.server.PortalPropertyPlaceholderConfigurer;
import org.auscope.portal.core.services.PortalServiceException;
import org.auscope.portal.core.services.SISSVocService;
import org.auscope.portal.core.services.responses.vocab.Concept;
import org.auscope.portal.core.test.PortalTestClass;
import org.jmock.Expectations;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;


/**
 * User: Michael Stegherr
 * Date: Sep 14, 2009
 * Time: 11:28:47 AM.
 */
public class TestVocabController extends PortalTestClass {

    /**
     * Main object we are testing.
     */
    private VocabController vocabController;


    /**
     * Mock property configure-er.
     */
    private PortalPropertyPlaceholderConfigurer propertyConfigurer = context.mock(PortalPropertyPlaceholderConfigurer.class);

    private SISSVocService mockService = context.mock(SISSVocService.class);

    /**
     * Setup.
     *
     * @throws Exception the exception
     */
    @Before
    public void setUp() throws Exception {
        this.vocabController = new VocabController(propertyConfigurer, mockService);
    }

    @Test
    public void testGetScalarQuery() throws Exception {
        final String url = "http://example.org";
        final String repository = "repo";
        final String label = "label";

        final Concept concept = new Concept("urn:value");
        final Concept[] concepts = new Concept[] {concept};

        concept.setPreferredLabel("pref-label");
        concept.setDefinition("defn");

        context.checking(new Expectations() {{
            oneOf(propertyConfigurer).resolvePlaceholder("HOST.vocabService.url");will(returnValue(url));
            oneOf(mockService).getConceptByLabel(url, repository, label);will(returnValue(concepts));
        }});

        ModelAndView mav = vocabController.getScalarQuery(repository, label);
        Assert.assertNotNull(mav);
        Assert.assertTrue((Boolean) mav.getModel().get("success"));
        ModelMap data = (ModelMap)mav.getModel().get("data");
        Assert.assertNotNull(data);
        Assert.assertEquals(concept.getPreferredLabel(), data.get("label"));
        Assert.assertEquals(concept.getDefinition(), data.get("definition"));
        Assert.assertEquals(concept.getDefinition(), data.get("scopeNote"));
    }

    @Test
    public void testGetScalarQueryError() throws Exception {
        final String url = "http://example.org";
        final String repository = "repo";
        final String label = "label";

        context.checking(new Expectations() {{
            oneOf(propertyConfigurer).resolvePlaceholder("HOST.vocabService.url");will(returnValue(url));
            oneOf(mockService).getConceptByLabel(url, repository, label);will(throwException(new PortalServiceException((HttpMethodBase)null)));
        }});

        ModelAndView mav = vocabController.getScalarQuery(repository, label);
        Assert.assertNotNull(mav);
        Assert.assertFalse((Boolean) mav.getModel().get("success"));
    }
}
