package org.auscope.portal.server;

import java.util.Arrays;

import org.auscope.portal.core.server.PortalProfileXmlWebApplicationContext;

/**
 * A Web Application Context that extends the PortalProfileXmlWebApplicationContext
 * with new config locations
 * @author Josh Vote
 *
 */
public class BomWebAppContext extends PortalProfileXmlWebApplicationContext {
    @Override
    protected String[] getDefaultConfigLocations() {
        String[] locations = super.getDefaultConfigLocations();

        String[] bomLocations = Arrays.copyOf(locations, locations.length + 2);
        bomLocations[bomLocations.length - 1] = DEFAULT_CONFIG_LOCATION_PREFIX + "bom-known-layers.xml";
        bomLocations[bomLocations.length - 2] = DEFAULT_CONFIG_LOCATION_PREFIX + "bom-registries.xml";

        return bomLocations;
    }
}
