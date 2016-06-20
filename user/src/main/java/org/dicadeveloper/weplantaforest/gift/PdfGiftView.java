package org.dicadeveloper.weplantaforest.gift;

import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;

import org.dicadeveloper.weplantaforest.support.Uris;

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

public class PdfGiftView {
    private String _imagePath;
    
    private final String ENTER_CODE_URL = Uris.HOST + Uris.GIFT_REDEEM;

    private static final Font NUM_TREES_TEXT_FONT = new Font(FontFamily.TIMES_ROMAN, 13, Font.BOLD, new BaseColor(0f, 0.40f, 0.50f));

    private static final Font NUM_TREES_VALUE_FONT = new Font(FontFamily.HELVETICA, 18, Font.BOLD, new BaseColor(0f, 0.50f, 0.60f));

    public void buildPdfDocument(OutputStream toWrite, final String name, final int treeCount,  String[] codeFragments,
            String imagePath) throws Exception {
        // create pdf        
        final Document doc = new Document();
        final PdfWriter pdfWriter = PdfWriter.getInstance(doc, toWrite);
        pdfWriter.setEncryption(null, null, PdfWriter.ALLOW_DEGRADED_PRINTING | PdfWriter.ALLOW_PRINTING, PdfWriter.STANDARD_ENCRYPTION_128);
        _imagePath = imagePath;
        composeDocument(doc, String.valueOf(treeCount), ENTER_CODE_URL, codeFragments);
    }

    private void composeDocument(final Document doc, final String numberOfTrees, final String address, String[] codeFragments)
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
        final Image image = Image.getInstance(_imagePath + "/Coupon_pic1.jpg");
        imageCell.setBorderWidth(0);
        imageCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        imageCell.setVerticalAlignment(Element.ALIGN_CENTER);
        imageCell.setImage(image);

        // number of trees
        final PdfPTable numTreesTable = new PdfPTable(5);
        numTreesTable.setWidthPercentage(100f);
        numTreesTable.setWidths(new float[] { 3f, 27f, 3f, 64f, 3f });

        final PdfPCell horizontalLeftSpaceCell = new PdfPCell(new Paragraph("", NUM_TREES_VALUE_FONT));
        horizontalLeftSpaceCell.setBorderWidth(0);
        horizontalLeftSpaceCell.setBackgroundColor(BaseColor.WHITE);
        horizontalLeftSpaceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        horizontalLeftSpaceCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        numTreesTable.addCell(horizontalLeftSpaceCell);

        final PdfPCell numTreesLeftCell = new PdfPCell(new Paragraph(numberOfTrees, NUM_TREES_VALUE_FONT));
        numTreesLeftCell.setBorderWidth(3);
        numTreesLeftCell.setBorderColor(BaseColor.WHITE);
        numTreesLeftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        numTreesLeftCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        numTreesTable.addCell(numTreesLeftCell);

        final PdfPCell horizontalMiddleSpaceCell = new PdfPCell(new Paragraph("", NUM_TREES_VALUE_FONT));
        horizontalMiddleSpaceCell.setBorderWidth(3);
        horizontalMiddleSpaceCell.setBorderColor(BaseColor.WHITE);
        horizontalMiddleSpaceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        horizontalMiddleSpaceCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        numTreesTable.addCell(horizontalMiddleSpaceCell);

        final PdfPCell numTreesRightCell = new PdfPCell(new Paragraph("Bäume wurden für Sie gepflanzt!", NUM_TREES_TEXT_FONT));
        numTreesRightCell.setBorderWidth(3);
        numTreesRightCell.setBorderColor(BaseColor.WHITE);
        numTreesRightCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        numTreesRightCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        numTreesTable.addCell(numTreesRightCell);

        final PdfPCell horizontalRightSpaceCell = new PdfPCell(new Paragraph("", NUM_TREES_VALUE_FONT));
        horizontalRightSpaceCell.setBorderWidth(0);
        horizontalRightSpaceCell.setBorderWidthLeft(2);
        horizontalRightSpaceCell.setBorderColor(BaseColor.WHITE);
        horizontalRightSpaceCell.setBackgroundColor(BaseColor.WHITE);
        horizontalRightSpaceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        horizontalRightSpaceCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        numTreesTable.addCell(horizontalRightSpaceCell);

        final PdfPCell numTreesTableCell = new PdfPCell(numTreesTable);
        numTreesTableCell.setBorderWidth(0);

        // second image
        final PdfPCell image2Cell = new PdfPCell();
        final Image image2 = Image.getInstance(_imagePath + "/Coupon_pic2.jpg");
        image2Cell.setBorderWidth(0);
        image2Cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        image2Cell.setVerticalAlignment(Element.ALIGN_CENTER);
        image2Cell.setImage(image2);

        // address
        final PdfPTable addressTable = new PdfPTable(1);
        addressTable.setWidthPercentage(100f);
        addressTable.setWidths(new float[] { 100f });

        final PdfPCell addressCell = new PdfPCell(new Paragraph(address, NUM_TREES_TEXT_FONT));
        addressCell.setBorderWidth(0);
        addressCell.setBorderColor(BaseColor.WHITE);
        addressCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        addressCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        addressTable.addCell(addressCell);

        // third image
        final PdfPCell image3Cell = new PdfPCell();
        final Image image3 = Image.getInstance(_imagePath + "/Coupon_pic3.jpg");
        image3Cell.setBorderWidth(0);
        image3Cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        image3Cell.setVerticalAlignment(Element.ALIGN_CENTER);
        image3Cell.setImage(image3);

        // code
        final PdfPTable codeTable = new PdfPTable(9);
        codeTable.setWidthPercentage(100f);
        codeTable.setWidths(new float[] { 15f, 15f, 3f, 15f, 3f, 15f, 3f, 15f, 11f });

        final PdfPCell horizontalLeftCodeSpaceCell = new PdfPCell(new Paragraph("", NUM_TREES_VALUE_FONT));
        horizontalLeftCodeSpaceCell.setBorderWidth(0);
        codeTable.addCell(horizontalLeftCodeSpaceCell);

        final PdfPCell code1Cell = new PdfPCell(new Paragraph(codeFragments[0], NUM_TREES_VALUE_FONT));
        code1Cell.setBorderWidth(0);
        code1Cell.setBackgroundColor(new BaseColor(0.8f, 0.93f, 0.92f));
        code1Cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        code1Cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        codeTable.addCell(code1Cell);

        final PdfPCell horizontalMiddleCodeSpaceCell = new PdfPCell(new Paragraph("", NUM_TREES_VALUE_FONT));
        horizontalMiddleCodeSpaceCell.setBorderWidth(0);
        codeTable.addCell(horizontalMiddleCodeSpaceCell);

        final PdfPCell code2Cell = new PdfPCell(new Paragraph(codeFragments[1], NUM_TREES_VALUE_FONT));
        code2Cell.setBorderWidth(0);
        code2Cell.setBackgroundColor(new BaseColor(0.8f, 0.93f, 0.92f));
        code2Cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        code2Cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        codeTable.addCell(code2Cell);

        codeTable.addCell(horizontalMiddleCodeSpaceCell);

        final PdfPCell code3Cell = new PdfPCell(new Paragraph(codeFragments[2], NUM_TREES_VALUE_FONT));
        code3Cell.setBorderWidth(0);
        code3Cell.setBackgroundColor(new BaseColor(0.8f, 0.93f, 0.92f));
        code3Cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        code3Cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        codeTable.addCell(code3Cell);

        codeTable.addCell(horizontalMiddleCodeSpaceCell);

        final PdfPCell code4Cell = new PdfPCell(new Paragraph(codeFragments[3], NUM_TREES_VALUE_FONT));
        code4Cell.setBorderWidth(0);
        code4Cell.setBackgroundColor(new BaseColor(0.8f, 0.93f, 0.92f));
        code4Cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        code4Cell.setVerticalAlignment(Element.ALIGN_JUSTIFIED_ALL);
        codeTable.addCell(code4Cell);

        codeTable.addCell(horizontalMiddleCodeSpaceCell);

        final PdfPCell codeTableCell = new PdfPCell(codeTable);
        codeTableCell.setBackgroundColor(BaseColor.WHITE);
        codeTableCell.setBorderWidth(0);

        // fourth image
        final PdfPCell image4Cell = new PdfPCell();
        final Image image4 = Image.getInstance(_imagePath + "/Coupon_pic4.jpg");
        image4Cell.setBorderWidth(0);
        image4Cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        image4Cell.setVerticalAlignment(Element.ALIGN_CENTER);
        image4Cell.setImage(image4);

        outerTable.addCell(imageCell);
        outerTable.addCell(numTreesTableCell);
        outerTable.addCell(image2Cell);
        outerTable.addCell(addressCell);
        outerTable.addCell(image3Cell);
        outerTable.addCell(codeTableCell);
        outerTable.addCell(image4Cell);

        doc.add(outerTable);
        doc.close();
    }
}
