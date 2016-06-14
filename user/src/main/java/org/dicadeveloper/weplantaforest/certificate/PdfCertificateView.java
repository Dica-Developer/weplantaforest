package org.dicadeveloper.weplantaforest.certificate;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

import com.itextpdf.text.BadElementException;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class PdfCertificateView {

    private String _imagePath;

    private static final Font NUM_TREES_TEXT_FONT = new Font(FontFamily.HELVETICA, 13, Font.BOLD, BaseColor.GRAY);

    private static final Font NUM_TREES_VALUE_FONT = new Font(FontFamily.HELVETICA, 18f, Font.BOLD, BaseColor.BLACK);

    private static final Font USER_TEXT_FONT = new Font(FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);

    private static final Font REGULAR_TEXT_FONT = new Font(FontFamily.HELVETICA, 9, Font.NORMAL, BaseColor.GRAY);

    private static final Font SIGNATURE_TEXT_FONT = new Font(FontFamily.HELVETICA, 7, Font.NORMAL, BaseColor.GRAY);

    private static final Font FOOTER_FONT_BOLD = new Font(FontFamily.HELVETICA, 7, Font.BOLD, BaseColor.GRAY);

    private static final Font FOOTER_FONT = new Font(FontFamily.HELVETICA, 7, Font.NORMAL, BaseColor.GRAY);

    public File buildPdfDocument(final int treeCount, final String text, final String name, final String number, String gfxPath) throws Exception {
        // create pdf
        final Document doc = new Document();
//         final File file = File.createTempFile(treeCount + "-" + name,
//         ".pdf");
        File file = new File(treeCount + "-" + name + ".pdf");
        final PdfWriter pdfWriter = PdfWriter.getInstance(doc, new FileOutputStream(file));
        pdfWriter.setEncryption(null, null, PdfWriter.ALLOW_DEGRADED_PRINTING | PdfWriter.ALLOW_PRINTING, PdfWriter.STANDARD_ENCRYPTION_128);

        final Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT+2"), Locale.GERMAN);
        cal.setTimeInMillis(System.currentTimeMillis());
        final String date = cal.get(Calendar.DAY_OF_MONTH) + "." + (cal.get(Calendar.MONTH) + 1) + "." + cal.get(Calendar.YEAR);

        _imagePath = gfxPath;
        composeDocument(doc, String.valueOf(treeCount), text, name, date, number);
        return file;
    }

    private void composeDocument(final Document doc, final String numberOfTrees, final String userText, final String userName, final String date, final String number)
            throws DocumentException, BadElementException, MalformedURLException, IOException {

        doc.open();
        doc.setPageSize(PageSize.A4);
        doc.setMargins(40f, 40f, 40f, 40f);
        doc.newPage();

        final PdfPTable outerTable = new PdfPTable(1);
        outerTable.setWidthPercentage(100f);
        outerTable.setWidths(new float[] { 100f });

        // top picture
        final PdfPCell imageCell = new PdfPCell();
        final Image image = Image.getInstance(_imagePath + "/Certificate_pic1.jpg");
        imageCell.setBorderWidth(0);
        imageCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        imageCell.setVerticalAlignment(Element.ALIGN_CENTER);
        imageCell.setImage(image);
        imageCell.setFixedHeight(200f);

        outerTable.addCell(imageCell);

        // small space
        final PdfPCell spaceCell_20 = new PdfPCell();
        spaceCell_20.setBorderWidth(0);
        spaceCell_20.setFixedHeight(20);

        // number of trees
        final PdfPTable numTreesTable = new PdfPTable(3);
        numTreesTable.setWidthPercentage(100f);
        numTreesTable.setWidths(new float[] { 40f, 20f, 40f });

        final PdfPCell numTreesLeftCell = new PdfPCell(new Paragraph("\t\t\u00FCber die Pflanzung von", NUM_TREES_TEXT_FONT));
        numTreesLeftCell.setBorderWidth(0);
        numTreesLeftCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        numTreesLeftCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        numTreesLeftCell.setFixedHeight(80f);
        numTreesTable.addCell(numTreesLeftCell);

        final PdfPCell numTreesMiddleCell = new PdfPCell(new Paragraph(numberOfTrees, NUM_TREES_VALUE_FONT));
        numTreesMiddleCell.setBorderWidth(0);
        numTreesMiddleCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        numTreesMiddleCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        numTreesMiddleCell.setFixedHeight(80f);
        numTreesTable.addCell(numTreesMiddleCell);

        final PdfPCell numTreesRightCell = new PdfPCell(new Paragraph("B\u00E4umen", NUM_TREES_TEXT_FONT));
        numTreesRightCell.setBorderWidth(0);
        numTreesRightCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        numTreesRightCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        numTreesRightCell.setFixedHeight(80f);
        numTreesTable.addCell(numTreesRightCell);

        final PdfPCell numTreesTableCell = new PdfPCell(numTreesTable);
        numTreesTableCell.setBackgroundColor(new BaseColor(0.733f, 0.898f, 0.98f));
        numTreesTableCell.setBorderWidth(0);
        // mini space
        final PdfPCell spaceCell_2 = new PdfPCell();
        spaceCell_2.setBorderWidth(0);
        spaceCell_2.setFixedHeight(2);

        // user text
        PdfPCell userTextTableCell = null;
        if (userText != null && !"".equals(userText.trim())) {
            final PdfPTable userTextTable = new PdfPTable(3);
            userTextTable.setWidthPercentage(100f);
            userTextTable.setWidths(new float[] { 4f, 92f, 4f });

            final PdfPCell userTextCellLeft = new PdfPCell();
            userTextCellLeft.setBorderWidth(0);
            userTextCellLeft.setFixedHeight(80f);
            userTextCellLeft.setBackgroundColor(new BaseColor(0.733f, 0.898f, 0.98f));
            userTextTable.addCell(userTextCellLeft);

            final PdfPCell userTextCell = new PdfPCell(new Paragraph(userText.trim(), USER_TEXT_FONT));
            userTextCell.setBorderWidth(0);
            userTextCell.setHorizontalAlignment(Element.ALIGN_LEFT);
            userTextCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            userTextCell.setFixedHeight(80f);
            userTextCell.setBackgroundColor(new BaseColor(0.733f, 0.898f, 0.98f));
            userTextTable.addCell(userTextCell);

            final PdfPCell userTextCellRight = new PdfPCell();
            userTextCellRight.setBorderWidth(0);
            userTextCellRight.setFixedHeight(80f);
            userTextCellRight.setBackgroundColor(new BaseColor(0.733f, 0.898f, 0.98f));
            userTextTable.addCell(userTextCellRight);

            userTextTableCell = new PdfPCell(userTextTable);
            userTextTableCell.setBorderWidth(0);
            userTextTableCell.setBackgroundColor(new BaseColor(0.733f, 0.898f, 0.98f));
        }

        // large space
        final PdfPCell spaceCell_60 = new PdfPCell();
        spaceCell_60.setBorderWidth(0);
        spaceCell_60.setFixedHeight(60);

        // regular text line 1
        final PdfPCell regularTextCell1 = new PdfPCell(new Paragraph("Hiermit wird die Pflanzung dieser B\u00E4ume bescheinigt. Die Pflanzung erfolgt durch die Wald 1.1 gGmbH", REGULAR_TEXT_FONT));
        regularTextCell1.setBorderWidth(0);
        regularTextCell1.setHorizontalAlignment(Element.ALIGN_LEFT);
        regularTextCell1.setVerticalAlignment(Element.ALIGN_MIDDLE);
        regularTextCell1.setFixedHeight(15f);

        // regular text line 2
        final PdfPCell regularTextCell2 = new PdfPCell(
                new Paragraph("und kann im Internet unter www.iplantatree.org \u00FCber die Zertifikat-Nummer #" + number + " abgerufen bzw. nachvollzogen werden.", REGULAR_TEXT_FONT));
        regularTextCell2.setBorderWidth(0);
        regularTextCell2.setHorizontalAlignment(Element.ALIGN_LEFT);
        regularTextCell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
        regularTextCell2.setFixedHeight(15f);

        // medium space
        final PdfPCell spaceCell_6 = new PdfPCell();
        spaceCell_6.setBorderWidth(0);
        spaceCell_6.setFixedHeight(6);

        // regular text line 3
        final PdfPCell regularTextCell3 = new PdfPCell(
                new Paragraph("Dieses Zertifikat ist keine Best\u00E4tigung \u00FCber Geldzuwendungen im Sinne des \u00A7 10 b des Einkommensteuergesetzes an", REGULAR_TEXT_FONT));
        regularTextCell3.setBorderWidth(0);
        regularTextCell3.setHorizontalAlignment(Element.ALIGN_LEFT);
        regularTextCell3.setVerticalAlignment(Element.ALIGN_MIDDLE);
        regularTextCell3.setFixedHeight(15f);

        // regular text line 4
        final PdfPCell regularTextCell4 = new PdfPCell(
                new Paragraph("eine der in \u00A7 5 Abs. 1 Nr. 9 des K\u00F6rperschaftsteuergesetzes bezeichneten K\u00F6rperschaften, Personenvereinigungen oder", REGULAR_TEXT_FONT));
        regularTextCell4.setBorderWidth(0);
        regularTextCell4.setHorizontalAlignment(Element.ALIGN_LEFT);
        regularTextCell4.setVerticalAlignment(Element.ALIGN_MIDDLE);
        regularTextCell4.setFixedHeight(15f);

        // regular text line 5
        final PdfPCell regularTextCell5 = new PdfPCell(new Paragraph("Verm\u00F6gensmassen.", REGULAR_TEXT_FONT));
        regularTextCell5.setBorderWidth(0);
        regularTextCell5.setHorizontalAlignment(Element.ALIGN_LEFT);
        regularTextCell5.setVerticalAlignment(Element.ALIGN_MIDDLE);
        regularTextCell5.setFixedHeight(15f);

        // regular text line 6
        final PdfPCell regularTextCell6 = new PdfPCell(new Paragraph("Datum der Ausstellung: " + date, REGULAR_TEXT_FONT));
        regularTextCell6.setBorderWidth(0);
        regularTextCell6.setHorizontalAlignment(Element.ALIGN_LEFT);
        regularTextCell6.setVerticalAlignment(Element.ALIGN_MIDDLE);
        regularTextCell6.setFixedHeight(15f);

        // signatureField
        final PdfPCell signatureChopCell = new PdfPCell();
        signatureChopCell.setBorder(0);
        signatureChopCell.setFixedHeight(50);
        final Image chopImage = Image.getInstance(_imagePath + "/stamp.jpg");
        signatureChopCell.setImage(chopImage);

        final PdfPCell signatureImageCell = new PdfPCell();
        signatureImageCell.setBorder(0);
        signatureImageCell.setFixedHeight(50);
        signatureImageCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        signatureImageCell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        final Image signatureImage = Image.getInstance(_imagePath + "/Unterschrift150.jpg");
        signatureImageCell.setImage(signatureImage);

        // dotted line
        final PdfPCell imageCell2 = new PdfPCell();
        final Image image2 = Image.getInstance(_imagePath + "/Certificate_pic2.jpg");
        imageCell2.setBorderWidth(0);
        imageCell2.setHorizontalAlignment(Element.ALIGN_LEFT);
        imageCell2.setVerticalAlignment(Element.ALIGN_CENTER);
        imageCell2.setImage(image2);
        imageCell2.setFixedHeight(9f);

        // signature statement
        final PdfPCell signatureStatement = new PdfPCell(new Paragraph("Unterschrift / Stempel des ausstellenden Unternehmens / der ausstellenden Person", SIGNATURE_TEXT_FONT));
        signatureStatement.setBorderWidth(0);
        signatureStatement.setHorizontalAlignment(Element.ALIGN_LEFT);
        signatureStatement.setVerticalAlignment(Element.ALIGN_MIDDLE);
        signatureStatement.setFixedHeight(15f);

        // footer
        final PdfPTable footerTable = new PdfPTable(5);
        footerTable.setWidthPercentage(100f);
        footerTable.setWidths(new float[] { 6f, 11f, 22f, 15f, 46f });

        final PdfPCell footer1Cell = new PdfPCell(new Paragraph("Wald1.1", FOOTER_FONT_BOLD));
        footer1Cell.setBorderWidth(0);
        footer1Cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        footer1Cell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        footer1Cell.setFixedHeight(15f);
        footerTable.addCell(footer1Cell);

        final PdfPCell footer2Cell = new PdfPCell(new Paragraph("gGmbH", FOOTER_FONT));
        footer2Cell.setBorderWidth(0);
        footer2Cell.setHorizontalAlignment(Element.ALIGN_LEFT);
        footer2Cell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        footer2Cell.setFixedHeight(15f);
        footerTable.addCell(footer2Cell);

        final PdfPCell footer3Cell = new PdfPCell(new Paragraph("[ Spendenkonto 222 888 ]", FOOTER_FONT_BOLD));
        footer3Cell.setBorderWidth(0);
        footer3Cell.setHorizontalAlignment(Element.ALIGN_LEFT);
        footer3Cell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        footer3Cell.setFixedHeight(15f);
        footerTable.addCell(footer3Cell);

        final PdfPCell footer4Cell = new PdfPCell(new Paragraph("www.iplantatree.org", FOOTER_FONT));
        footer4Cell.setBorderWidth(0);
        footer4Cell.setHorizontalAlignment(Element.ALIGN_LEFT);
        footer4Cell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        footer4Cell.setFixedHeight(15f);
        footerTable.addCell(footer4Cell);

        final PdfPCell logoImageCell = new PdfPCell();
        final Image logoImage = Image.getInstance(_imagePath + "/ipat_logo.jpg");
        logoImageCell.setBorderWidth(0);
        logoImageCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        logoImageCell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        logoImageCell.setImage(logoImage);
        logoImageCell.setFixedHeight(90f);
        footerTable.addCell(logoImageCell);

        final PdfPCell footerTableCell = new PdfPCell(footerTable);
        footerTableCell.setBorderWidth(0);

        // footer space
        final PdfPCell spaceCell_footer = new PdfPCell();
        spaceCell_footer.setBorderWidth(0);
        spaceCell_footer.setFixedHeight(50);

        outerTable.addCell(spaceCell_20);
        outerTable.addCell(numTreesTableCell);
        outerTable.addCell(spaceCell_2);
        if (userTextTableCell != null) {
            outerTable.addCell(userTextTableCell);
        }
        outerTable.addCell(spaceCell_20);
        outerTable.addCell(regularTextCell1);
        outerTable.addCell(spaceCell_6);
        outerTable.addCell(regularTextCell2);
        outerTable.addCell(spaceCell_20);
        outerTable.addCell(regularTextCell3);
        outerTable.addCell(spaceCell_6);
        outerTable.addCell(regularTextCell4);
        outerTable.addCell(spaceCell_6);
        outerTable.addCell(regularTextCell5);
        outerTable.addCell(spaceCell_20);
        outerTable.addCell(regularTextCell6);
        outerTable.addCell(spaceCell_20);
        outerTable.addCell(spaceCell_20);
        outerTable.addCell(signatureImageCell);
        outerTable.addCell(imageCell2);
        outerTable.addCell(signatureStatement);
        outerTable.addCell(footerTableCell);
        doc.add(outerTable);
        doc.close();
    }

}
