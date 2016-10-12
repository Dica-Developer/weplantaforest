package org.dicadeveloper.weplantaforest.certificate;

import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

import org.dicadeveloper.weplantaforest.support.PdfHelper;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Image;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class PdfCertificateView2 {

    private String _imagePath;

    private final static Font textFontForCircle = new Font(FontFamily.TIMES_ROMAN, 26, Font.ITALIC, BaseColor.WHITE);

    PdfHelper pdfHelper = new PdfHelper();
    
    public void writePdfDataToOutputStream(OutputStream toWrite, final int treeCount, final String text, final String name, final String number, String imagePath) throws Exception {
        // create pdf
        final Document doc = new Document();
        final PdfWriter pdfWriter = PdfWriter.getInstance(doc, toWrite);
        pdfWriter.setEncryption(null, null, PdfWriter.ALLOW_DEGRADED_PRINTING | PdfWriter.ALLOW_PRINTING, PdfWriter.STANDARD_ENCRYPTION_128);

        final Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT+2"), Locale.GERMAN);
        cal.setTimeInMillis(System.currentTimeMillis());
        final String date = cal.get(Calendar.DAY_OF_MONTH) + "." + (cal.get(Calendar.MONTH) + 1) + "." + cal.get(Calendar.YEAR);

        _imagePath = imagePath;

        doc.open();

        PdfContentByte cb = pdfWriter.getDirectContent();
        PdfHelper.createHeaderBlock(cb);
        PdfHelper.createCircleAndText(cb, "Zertifikat", 298f, 665f, 75f, textFontForCircle, 0x9E, 0x3C, 0x59);
        createTreeCountAndCustomTextBlock(cb, text, treeCount);
        createLawTextDateAndSignatureBlock(cb, number, date);
        pdfHelper.addLogo(cb, _imagePath, 262f, 20f);

        doc.close();
    }

    private void createTreeCountAndCustomTextBlock(PdfContentByte cb, String customText, int treeCount) throws DocumentException {
        Font textFont = new Font(FontFamily.TIMES_ROMAN, 16, Font.ITALIC, BaseColor.WHITE);
        Font textFontTreeCount = new Font(FontFamily.HELVETICA, 30, Font.BOLD, BaseColor.BLACK);
        Font customTextFont = new Font(FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);

        cb.saveState();
        cb.setRGBColorFill(0x64, 0xA7, 0xBD);
        cb.rectangle(0.0f, 325.0f, 595.0f, 205.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        Integer treeCountAsObj = treeCount;

        PdfPTable table = new PdfPTable(1);
        float[] rows = { 595f };
        table.setTotalWidth(rows);
        table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.getDefaultCell().setFixedHeight(35);
        table.addCell(new Phrase(new Chunk("über die Pflanzung von", textFont)));
        table.addCell(new Phrase(new Chunk(treeCountAsObj.toString(), textFontTreeCount)));
        table.addCell(new Phrase(new Chunk("Bäumen", textFont)));
        table.writeSelectedRows(0, 3, 0, 520, cb);

        cb.saveState();
        cb.setRGBColorFill(0xF7, 0xF2, 0xF4);
        cb.rectangle(50.0f, 345.0f, 495.0f, 60.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        PdfPTable textTable = new PdfPTable(1);
        float[] textRows = { 475f };
        textTable.setTotalWidth(textRows);
        textTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        textTable.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        textTable.getDefaultCell().setFixedHeight(40);
        textTable.addCell(new Phrase(new Chunk(customText, customTextFont)));
        textTable.writeSelectedRows(0, 1, 60, 395, cb);
    }

    private void createLawTextDateAndSignatureBlock(PdfContentByte cb, String number, String date) throws DocumentException, MalformedURLException, IOException {
        Font textFont = new Font(FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
        Font textFontBold = new Font(FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.BLACK);
        Font textFontSmall = new Font(FontFamily.HELVETICA, 6, Font.NORMAL, BaseColor.BLACK);

        cb.saveState();
        cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
        cb.rectangle(0.0f, 195.0f, 595.0f, 130.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        cb.saveState();
        cb.setRGBColorFill(0x64, 0xA7, 0xBD);
        cb.moveTo(275f, 326f);
        cb.lineTo(321f, 326f);
        cb.lineTo(298f, 315f);
        cb.lineTo(275f, 326f);
        cb.fill();
        cb.closePathStroke();
        cb.restoreState();

        PdfPTable table = new PdfPTable(2);
        float[] rows = { 247.5f, 247.5f };
        table.setTotalWidth(rows);
        table.getDefaultCell().setBorder(Rectangle.BOTTOM);
        table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
        table.getDefaultCell().setVerticalAlignment(Element.ALIGN_TOP);

        table.getDefaultCell().setFixedHeight(75);

        Phrase leftPhrase = new Phrase();
        leftPhrase.add(new Chunk(
                "Hiermit wird die Pflanzung dieser Bäume bescheinigt. Die Pflanzung erfolgt durch die Wald 1.1 gGmbH und kann im Internet unter www.iplantatree.org über die Zertifikat-Nummer #",
                textFont));
        leftPhrase.add(new Chunk(number, textFontBold));
        leftPhrase.add(new Chunk(" abgerufen bzw. nachvollzogen werden.", textFont));

        Phrase rightPhrase = new Phrase(10f);
        rightPhrase.add(new Chunk(
                "Dieses Zertifikat ist keine Bestätigung über Geldzuwendungen im Sinne des § 10 b des Einkommensteuergesetzes an eine der in § 5 Abs. 1 Nr. 9 des Körperschaftsteuergesetzes bezeichneten Körperschaften, Personenvereinigungen oder Vermögensmassen.",
                textFont));

        PdfPCell rightCell = new PdfPCell();
        rightCell.setPaddingLeft(10.0f);
        rightCell.setBorder(Rectangle.BOTTOM);
        rightCell.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
        rightCell.setVerticalAlignment(Element.ALIGN_TOP);
        rightCell.addElement(rightPhrase);

        PdfPCell dateCell = new PdfPCell();
        dateCell.setPaddingTop(10.0f);
        dateCell.setBorder(Rectangle.NO_BORDER);
        dateCell.addElement(new Phrase(new Chunk("Datum der Ausstellung: " + date, textFont)));

        PdfPCell emptyCell = new PdfPCell();
        emptyCell.setBorder(Rectangle.NO_BORDER);

        final Image signatureImage = Image.getInstance(_imagePath + "/Unterschrift150.jpg");

        PdfPCell underSignatureCell = new PdfPCell();
        underSignatureCell.setBorder(Rectangle.NO_BORDER);
        underSignatureCell.setPadding(0f);

        Phrase underSignaturePhrase = new Phrase(10f);
        underSignaturePhrase.add(new Chunk("Unterschrift / Stempel des ausstellenden Unternehmens / der ausstellenden Person", textFontSmall));

        underSignatureCell.addElement(underSignaturePhrase);
        underSignatureCell.setVerticalAlignment(Element.ALIGN_TOP);

        PdfPCell spacerCell = new PdfPCell();
        spacerCell.setBorder(Rectangle.NO_BORDER);
        spacerCell.setFixedHeight(15f);

        table.addCell(leftPhrase);
        table.addCell(rightCell);

        table.addCell(dateCell);
        table.addCell(emptyCell);

        table.addCell(spacerCell);
        table.addCell(spacerCell);

        table.addCell(signatureImage);
        table.addCell(emptyCell);

        table.addCell(underSignatureCell);
        table.addCell(emptyCell);

        table.writeSelectedRows(0, 4, 50, 305, cb);
    }

}
