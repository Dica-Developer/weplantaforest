package org.dicadeveloper.weplantaforest.certificate;

import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.util.Calendar;
import java.util.Locale;
import java.util.Map;
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

public class PdfCertificateView {

    private String _imagePath;

    private final static Font textFontForCircle = new Font(FontFamily.TIMES_ROMAN, 26, Font.ITALIC, BaseColor.WHITE);

    PdfHelper pdfHelper = new PdfHelper();

    public void writePdfDataToOutputStream(OutputStream toWrite, Map<String, String> pdfTexts, String imagePath, String languageShortname) throws Exception {
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
        pdfHelper.createHeaderBlock(cb, pdfTexts);
        createTreeCountAndCustomTextBlock(cb, pdfTexts);
        createLawTextDateAndSignatureBlock(cb, pdfTexts, date);
        pdfHelper.createCertificateImage(cb, imagePath, languageShortname, 165f, 550f);
        pdfHelper.addLogo(cb, imagePath, 262f, 20f);

        doc.close();
    }

    private void createTreeCountAndCustomTextBlock(PdfContentByte cb, Map<String, String> pdfTexts) throws DocumentException {
        Font textFont = new Font(FontFamily.TIMES_ROMAN, 16, Font.ITALIC, BaseColor.BLACK);
        Font textFontTreeCount = new Font(FontFamily.HELVETICA, 30, Font.BOLD, BaseColor.BLACK);
        Font customTextFont = new Font(FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);

        cb.saveState();
        cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
        cb.rectangle(0.0f, 325.0f, 595.0f, 205.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        PdfPTable table = new PdfPTable(1);
        float[] rows = { 595f };
        table.setTotalWidth(rows);
        table.getDefaultCell()
             .setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell()
             .setHorizontalAlignment(Element.ALIGN_CENTER);
        table.getDefaultCell()
             .setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.getDefaultCell()
             .setFixedHeight(35);
        table.addCell(new Phrase(new Chunk(pdfTexts.get("certificate.about"), textFont)));
        table.addCell(new Phrase(new Chunk(pdfTexts.get("treeCount"), textFontTreeCount)));
        table.addCell(new Phrase(new Chunk(pdfTexts.get("certificate.trees"), textFont)));
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
        textTable.getDefaultCell()
                 .setBorder(Rectangle.NO_BORDER);
        textTable.getDefaultCell()
                 .setVerticalAlignment(Element.ALIGN_MIDDLE);
        textTable.getDefaultCell()
                 .setFixedHeight(40);
        textTable.addCell(new Phrase(new Chunk(pdfTexts.get("certificateText"), customTextFont)));
        textTable.writeSelectedRows(0, 1, 60, 395, cb);
    }

    private void createLawTextDateAndSignatureBlock(PdfContentByte cb, Map<String, String> pdfTexts, String date) throws DocumentException, MalformedURLException, IOException {
        Font textFont = new Font(FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
        Font textFontBold = new Font(FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.BLACK);
        Font textFontSmall = new Font(FontFamily.HELVETICA, 8, Font.NORMAL, BaseColor.BLACK);

        PdfPTable table = new PdfPTable(2);
        float[] rows = { 247.5f, 247.5f };
        table.setTotalWidth(rows);
        table.getDefaultCell()
             .setBorder(Rectangle.BOTTOM);
        table.getDefaultCell()
             .setHorizontalAlignment(Element.ALIGN_LEFT);
        table.getDefaultCell()
             .setVerticalAlignment(Element.ALIGN_TOP);

        table.getDefaultCell()
             .setFixedHeight(75);

        Phrase leftPhrase = new Phrase();
        leftPhrase.add(new Chunk(pdfTexts.get("certificate.certify_text"), textFont));
        leftPhrase.add(new Chunk(pdfTexts.get("certificate.planted_from"), textFont));
        leftPhrase.add(new Chunk(Chunk.NEWLINE));
        leftPhrase.add(new Chunk("#" + pdfTexts.get("certificateNumber"), textFontBold));

        Phrase rightPhrase = new Phrase(10f);
        rightPhrase.add(new Chunk(pdfTexts.get("certificate.no_confirmation"), textFont));

        PdfPCell rightCell = new PdfPCell();
        rightCell.setPaddingLeft(10.0f);
        rightCell.setBorder(Rectangle.BOTTOM);
        rightCell.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
        rightCell.setVerticalAlignment(Element.ALIGN_TOP);
        rightCell.addElement(rightPhrase);

        PdfPCell dateCell = new PdfPCell();
        dateCell.setPaddingTop(10.0f);
        dateCell.setBorder(Rectangle.NO_BORDER);
        dateCell.addElement(new Phrase(new Chunk(pdfTexts.get("certificate.halle") + " " + date, textFont)));

        PdfPCell emptyCell = new PdfPCell();
        emptyCell.setBorder(Rectangle.NO_BORDER);

        final Image signatureImage = Image.getInstance(getClass().getResource(_imagePath + "/Unterschrift150.jpg"));
        final Image stampImage = Image.getInstance(getClass().getResource(_imagePath + "/stamp.jpg"));
        PdfPTable signatureAndStamp = new PdfPTable(2);
        float[] rowss = { 80f, 167.5f };
        signatureAndStamp.setTotalWidth(rowss);
        signatureAndStamp.getDefaultCell()
             .setBorder(Rectangle.NO_BORDER);
        signatureAndStamp.addCell(signatureImage);
        signatureAndStamp.addCell(stampImage);

        PdfPCell underSignatureCell = new PdfPCell();
        underSignatureCell.setBorder(Rectangle.NO_BORDER);
        underSignatureCell.setPadding(0f);

        Phrase underSignaturePhrase = new Phrase(10f);
        underSignaturePhrase.add(new Chunk(pdfTexts.get("certificate.founder"), textFontSmall));

        underSignatureCell.addElement(underSignaturePhrase);
        underSignatureCell.setVerticalAlignment(Element.ALIGN_TOP);

        table.addCell(leftPhrase);
        table.addCell(rightCell);

        table.addCell(dateCell);
        table.addCell(signatureAndStamp);

        table.addCell(emptyCell);
        table.addCell(underSignatureCell);

        table.writeSelectedRows(0, 4, 50, 305, cb);
    }

}
