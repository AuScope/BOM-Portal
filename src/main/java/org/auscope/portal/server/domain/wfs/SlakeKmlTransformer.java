package org.auscope.portal.server.domain.wfs;

import org.auscope.portal.core.xslt.WfsToKmlTransformer;
import org.springframework.stereotype.Component;

/**
 * Simple specialisation of the WfsToKml transformer for usage with slake-kml.xsl
 * @author Josh Vote
 *
 */
public class SlakeKmlTransformer extends WfsToKmlTransformer {
    public SlakeKmlTransformer() {
        super("/slake-kml.xsl");
    }
}
