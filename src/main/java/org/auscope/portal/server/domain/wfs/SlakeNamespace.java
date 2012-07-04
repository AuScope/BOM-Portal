package org.auscope.portal.server.domain.wfs;

import org.auscope.portal.core.services.namespaces.IterableNamespace;

/**
 * Namespace specific to the Surface Lake dataset
 * @author Josh Vote
 *
 */
public class SlakeNamespace extends IterableNamespace {
    public SlakeNamespace() {
        map.put("wfs", "http://www.opengis.net/wfs");
        map.put("ogc", "http://www.opengis.net/ogc");
        map.put("gml", "http://www.opengis.net/gml/3.2");
        map.put("slake", "http://xlmns.siss.csiro.au/slake/0.2");
    }
}
