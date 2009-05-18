package org.auscope.portal.csw;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;
import javax.xml.xpath.XPathConstants;
import javax.xml.namespace.NamespaceContext;
import java.net.URL;
import java.net.MalformedURLException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;

/**
 * User: Mathew Wyatt
 * Date: 11/02/2009
 * Time: 10:41:30 AM
 */
public class CSWClient {
    private String serviceUrl = "";
    private String constraint;

    public CSWClient(String serviceUrl) {
        this.serviceUrl = serviceUrl;
    }

    public CSWClient(String serviceUrl, String constraint) {
        this.serviceUrl = serviceUrl;
        this.constraint = constraint;
    }

    public CSWGetRecordResponse getRecordResponse() throws IOException, ParserConfigurationException, SAXException {
        URL cswQuery = buildQueryUrl();
        BufferedReader responseReader = new BufferedReader(new InputStreamReader(cswQuery.openStream()));

        String inputLine;
        StringBuffer xmlResponse = new StringBuffer();
        while ((inputLine = responseReader.readLine()) != null) {
            xmlResponse.append(inputLine);
        }

        return new CSWGetRecordResponse(buildDom(xmlResponse.toString()));
    }

    private URL buildQueryUrl() throws MalformedURLException {
        return new URL(serviceUrl+"?request=GetRecords&service=CSW&version=2.0.2&resultType=results&namespace=csw:http://www.opengis.net/cat/csw/2.0.2&outputSchema=csw:IsoRecord&constraint=" + constraint);
    }

    private Document buildDom(String xmlString) throws ParserConfigurationException, IOException, SAXException {
        //build the XML dom
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true); // never forget this!
        DocumentBuilder builder = factory.newDocumentBuilder();
        InputSource inputSource = new InputSource(new StringReader(xmlString.toString()));
        Document doc = builder.parse(inputSource);

        return doc;
    }
}
