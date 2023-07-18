package org.dicadeveloper.weplantaforest.certificate;

import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import java.util.Set;

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
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.pdf.BaseFont;

public class PdfCertificateView {

    private String _imagePath;

    PdfHelper pdfHelper = new PdfHelper();

    public void writePdfDataToOutputStream(OutputStream toWrite, Map<String, String> pdfTexts, String imagePath, String languageShortname, String fontPath) throws Exception {

        // create pdf
        final Document doc = new Document();
        final PdfWriter pdfWriter = PdfWriter.getInstance(doc, toWrite);
        pdfHelper.registerFonts(fontPath);
        pdfWriter.setEncryption(null, null, ~(PdfWriter.ALLOW_MODIFY_CONTENTS), PdfWriter.STANDARD_ENCRYPTION_128);

        final Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT+2"), Locale.GERMAN);
        cal.setTimeInMillis(System.currentTimeMillis());
        final String date = cal.get(Calendar.DAY_OF_MONTH) + "." + (cal.get(Calendar.MONTH) + 1) + "." + cal.get(Calendar.YEAR);

        _imagePath = imagePath;

        doc.open();

        PdfContentByte cb = pdfWriter.getDirectContent();
        createBackground(cb);
        pdfHelper.addLogo2023(cb, imagePath, 50f, 730f);
        pdfHelper.addTreeImage(cb, imagePath, 290f, 520f);
        createDividerLine(cb, 0, 690, 335);
        createDividerLine(cb, 560, 690, 40);
        createBrownRectangle(cb, 0, 320, 595, 190);
        addCertificateHeader(cb, fontPath, pdfTexts);
        createTreeCountAndCustomTextBlock(cb, pdfTexts, fontPath);
        // createLawTextDateAndSignatureBlock(cb, pdfTexts, date);
        // pdfHelper.createCertificateImage(cb, imagePath, languageShortname, 165f, 550f);
        // pdfHelper.addLogo(cb, imagePath, 262f, 20f);

        doc.close();
    }

    private void createBackground(PdfContentByte cb) {
      cb.saveState();
      cb.setRGBColorFill(0xDC, 0xDC, 0xD6);
      cb.rectangle(0.0f, 0.0f, 595.0f, 1165.0f);
      cb.fill();
      cb.stroke();
      cb.restoreState();
    }

    private void createDividerLine(PdfContentByte cb, float x, float y, float width) {
        cb.saveState();
        cb.setRGBColorFill(0x65, 0x59, 0x4E);
        cb.rectangle(x, y, width, 0.91f);
        cb.fill();
        cb.stroke();
        cb.restoreState();
    }

    private void createBrownRectangle(PdfContentByte cb, float x, float y, float width, float height) {
        cb.saveState();
        cb.setRGBColorFill(0x65, 0x59, 0x4E);
        cb.rectangle(x, y, width, height);
        cb.fill();
        cb.stroke();
        cb.restoreState();
    }

    private void addCertificateHeader(PdfContentByte cb, String fontPath, Map<String, String> pdfTexts) throws DocumentException {
      BaseColor brown = new BaseColor(101, 89, 78);
      Font customFont = FontFactory.getFont("nbArchitect", BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 52, Font.NORMAL, brown);

      PdfPTable table = new PdfPTable(1);
      float[] rows = { 400f };
      table.setTotalWidth(rows);
      table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
      table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
      table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
      table.getDefaultCell().setFixedHeight(75);
      table.addCell(new Phrase(new Chunk(pdfTexts.get("certificate.header_text"), customFont)));
      table.writeSelectedRows(0, 1, 0, 645, cb);
    }

    private void createTreeCountAndCustomTextBlock(PdfContentByte cb, Map<String, String> pdfTexts, String fontPath) throws DocumentException, IOException {
        BaseColor background = new BaseColor(220, 220, 214);
        BaseFont bull = BaseFont.createFont(fontPath + "/Bull-5-Mono.ttf",BaseFont.IDENTITY_H , BaseFont.EMBEDDED);
        // FontFactory.getFont("Bull", "UTF-8", BaseFont.EMBEDDED, 16, Font.NORMAL, background);
        Font textFont = new Font(bull, 18, Font.NORMAL, background);
        Font textFontTreeCount = new Font(bull, 35, Font.NORMAL, background);
        // FontFactory.getFont("Bull", "UTF-8", BaseFont.EMBEDDED, 35, Font.NORMAL, background);
        // Font customTextFont = new Font(FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);

        PdfPTable table = new PdfPTable(1);
        float[] rows = { 595f };
        table.setTotalWidth(rows);
        table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.getDefaultCell().setFixedHeight(40);
        System.out.println(pdfTexts.get("certificate.about"));

        table.addCell(new Phrase(new Chunk(pdfTexts.get("certificate.about"), textFont)));
        table.addCell(new Phrase(new Chunk(pdfTexts.get("treeCount"), textFontTreeCount)));
        if(pdfTexts.get("treeCount").equals("1")) {
          table.addCell(new Phrase(new Chunk(pdfTexts.get("certificate.tree"), textFont)));
        } else {
          table.addCell(new Phrase(new Chunk(pdfTexts.get("certificate.trees"), textFont)));
        }
        table.writeSelectedRows(0, 3, 0, 510, cb);

        cb.saveState();
        cb.setRGBColorFill(0xDC, 0xDC, 0xD6);
        cb.rectangle(50.0f, 345.0f, 495.0f, 60.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        // PdfPTable textTable = new PdfPTable(1);
        // float[] textRows = { 475f };
        // textTable.setTotalWidth(textRows);
        // textTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        // textTable.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        // textTable.getDefaultCell().setFixedHeight(40);
        // textTable.addCell(new Phrase(new Chunk(pdfTexts.get("certificateText"), customTextFont)));
        // textTable.writeSelectedRows(0, 1, 60, 395, cb);
    }

    private void createLawTextDateAndSignatureBlock(PdfContentByte cb, Map<String, String> pdfTexts, String date) throws DocumentException, MalformedURLException, IOException {
        Font textFont = new Font(FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
        Font textFontBold = new Font(FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.BLACK);
        Font textFontSmall = new Font(FontFamily.HELVETICA, 8, Font.NORMAL, BaseColor.BLACK);

        PdfPTable table = new PdfPTable(2);
        float[] rows = { 247.5f, 247.5f };
        table.setTotalWidth(rows);
        table.getDefaultCell().setBorder(Rectangle.BOTTOM);
        table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
        table.getDefaultCell().setVerticalAlignment(Element.ALIGN_TOP);

        table.getDefaultCell().setFixedHeight(75);

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
        signatureAndStamp.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
