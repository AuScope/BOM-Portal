package org.auscope.portal.knownlayers;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.auscope.portal.core.services.responses.csw.CSWRecord;
import org.auscope.portal.core.view.knownlayer.KnownLayerSelector;

/**
 * A selector for matching CSW records using a regex on the ID field
 * @author Josh Vote
 *
 */
public class IdPatternSelector implements KnownLayerSelector {

    Pattern pattern;

    /**
     * Creates a new selector from a regular expression (as a String)
     * @param regex A regular expression
     */
    public IdPatternSelector(String regex) {
        this(Pattern.compile(regex));
    }

    /**
     * Creates a new selector from a regular expression (as a String)
     * @param regex A regular expression
     */
    public IdPatternSelector(Pattern pattern) {
        this.pattern = pattern;
    }

    @Override
    public RelationType isRelatedRecord(CSWRecord record) {
        Matcher matcher = this.pattern.matcher(record.getFileIdentifier());

        if (matcher.matches()) {
            return RelationType.Belongs;
        }

        return RelationType.NotRelated;
    }

}
