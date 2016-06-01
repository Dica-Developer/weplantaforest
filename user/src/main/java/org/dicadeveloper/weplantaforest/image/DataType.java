package org.dicadeveloper.weplantaforest.image;

public enum DataType {
    /***/
    REMOVED__PLACEHOLDER_FOR_ORDINAL1("removed", null),
    /***/
    TREE_IMAGE("treeImages", "jpg"),
    /***/
    ARTICLE_IMAGE("articleImages", null),
    /***/
    PLANT_IMAGE_IMAGE("plantImages", null),
    /***/
    PLANT_IMAGE("plantImages", null),
    /***/
    TTYPE_IMAGE("treetypeImages", null),
    /***/
    TEAM_IMAGE("teamImages", "jpg"),
    /***/
    ATTACHMENTS("attachments", null),
    /***/
    GOOGLE_MAPS_PROJECT_OVERLAY("googleMapsProjectOverlay", null),
    /***/
    USER_DEFAULT_IMAGE("userDefaultImages", "jpg"),
    /***/
    PARAGRAPH_IMAGE("paragraphImages", null), RECEIPT_PDF("receipts", "pdf");

    private final String _directoryName;
    private final String _fileExtension;

    private DataType(final String directoryName, final String fileExtension) {
        _directoryName = directoryName;
        _fileExtension = fileExtension;
    }

    public String getDirectoryName() {
        return _directoryName;
    }

    public String getFileExtension() {
        return _fileExtension;
    }
}
