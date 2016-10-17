package org.dicadeveloper.weplantaforest.views;

public interface Views {

    /*
     * Tree.id, Tree.amount, Tree.description, Tree.imagePath, Tree.latitude,
     * Tree.longitude,Tree.plantedOn, Tree.submittedOn, Tree.owner.name,
     * Tree.projectArticle.project.name, Tree.treeType.imageFile,
     * Tree.treeType.name
     */
    public static interface PlantedTree {
    }

    /*
     * ProjectArticle.alreadyPlanted, ProjectArticle.amount,
     * ProjectArticle.price.priceAsLong, ProjectArticle.treeType.name,
     * ProjectArticle.treeType.imageFile
     */
    public interface ProjectArticle {

    }

    /*
     * Cart.id, Cart.timeStamp, Cart.totalPrice, Cart.treeCount
     */
    public static interface ShortCart {

    }

    /*
     * Gift.id, Gift.code.code, Gift.consignor.name, Gift.recipient.name, Gift.
     * status
     */
    public static interface OverviewGift {

    }

    public static interface AboOverview {

    }

    /*
     * Receipt.receiptId, Receipt.createdOn, Receipt.invoiceNumber
     */
    public static interface ReceiptOverview {

    }

    public static interface ShortTreeType {

    }

    /*
     * Certificate.creator.name, Certificate.text
     */
    public static interface CertificateSummary {

    }
}