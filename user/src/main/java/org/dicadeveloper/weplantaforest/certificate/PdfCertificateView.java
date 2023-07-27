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
import com.itextpdf.text.Paragraph;
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

  public void writePdfDataToOutputStream(OutputStream toWrite, Map<String, String> pdfTexts, String imagePath,
      String languageShortname, String fontPath) throws Exception {

    // create pdf
    final Document doc = new Document();
    final PdfWriter pdfWriter = PdfWriter.getInstance(doc, toWrite);
    pdfHelper.registerFonts(fontPath);
    pdfWriter.setEncryption(null, null, ~(PdfWriter.ALLOW_MODIFY_CONTENTS), PdfWriter.STANDARD_ENCRYPTION_128);

    final Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT+2"), Locale.GERMAN);
    cal.setTimeInMillis(System.currentTimeMillis());
    final String date = cal.get(Calendar.DAY_OF_MONTH) + "." + (cal.get(Calendar.MONTH) + 1) + "."
        + cal.get(Calendar.YEAR);

    _imagePath = imagePath;

    doc.open();

    PdfContentByte cb = pdfWriter.getDirectContent();
    pdfHelper.createBackground(cb);
    pdfHelper.addLogo2023(cb, imagePath, 50f, 730f);
    pdfHelper.addTreeImage(cb, imagePath+ "/Speierling_color.jpg", 290f, 520f);
    pdfHelper.createDividerLine(cb, 0, 690, 335);
    pdfHelper.createDividerLine(cb, 560, 690, 40);
    pdfHelper.createBrownRectangle(cb, 0, 320, 595, 190);
    pdfHelper.addHeader(cb, fontPath, pdfTexts.get("certificate.header_text"));
    addCertificateHeader(cb, fontPath, pdfTexts);
    createTreeCountAndCustomTextBlock(cb, pdfTexts, fontPath);
    createLawTextDateAndSignatureBlock(cb, pdfTexts, date, fontPath);
    pdfHelper.addFooter(cb, fontPath, pdfTexts);
    // pdfHelper.createCertificateImage(cb, imagePath, languageShortname, 165f,
    // 550f);
    // pdfHelper.addLogo(cb, imagePath, 262f, 20f);

    doc.close();
  }


  private void addCertificateHeader(PdfContentByte cb, String fontPath, Map<String, String> pdfTexts)
      throws DocumentException {
    BaseColor brown = new BaseColor(101, 89, 78);
    Font customFont = FontFactory.getFont("nbArchitect", BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 52, Font.NORMAL,
        brown);

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

  private void createTreeCountAndCustomTextBlock(PdfContentByte cb, Map<String, String> pdfTexts, String fontPath)
      throws DocumentException, IOException {
    BaseColor background = new BaseColor(220, 220, 214);
    BaseColor brown = new BaseColor(101, 89, 78);
    BaseFont bull = BaseFont.createFont(fontPath + "/Bull-5-Regular.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
    
    Font textFont = new Font(bull, 18, Font.NORMAL, background);
    Font textFontTreeCount = new Font(bull, 35, Font.NORMAL, background);
    Font customTextFont = new Font(bull, 12, Font.NORMAL, brown);

    PdfPTable table = new PdfPTable(1);
    float[] rows = { 595f };
    table.setTotalWidth(rows);
    table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
    table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
    table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);

    PdfPCell aboutCell = new PdfPCell(new Phrase(new Chunk(pdfTexts.get("certificate.about"), textFont)));
    aboutCell.setBorder(0);
    aboutCell.setMinimumHeight(22);
    aboutCell.setHorizontalAlignment(Element.ALIGN_CENTER);
    aboutCell.setVerticalAlignment(Element.ALIGN_MIDDLE);


    PdfPCell treeCountCell = new PdfPCell(new Phrase(new Chunk(pdfTexts.get("treeCount"), textFontTreeCount)));
    treeCountCell.setBorder(0);
    treeCountCell.setMinimumHeight(40);
    treeCountCell.setHorizontalAlignment(Element.ALIGN_CENTER);
    treeCountCell.setVerticalAlignment(Element.ALIGN_MIDDLE);


    PdfPCell treeCell = null;
    if (pdfTexts.get("treeCount").equals("1")) {
      treeCell = new PdfPCell(new Phrase(new Chunk(pdfTexts.get("certificate.tree"), textFont)));
    } else {
      treeCell = new PdfPCell(new Phrase(new Chunk(pdfTexts.get("certificate.trees"), textFont)));
    }
    treeCell.setMinimumHeight(22);
    treeCell.setBorder(0);
    treeCell.setHorizontalAlignment(Element.ALIGN_CENTER);
    treeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);

    table.addCell(aboutCell);
    table.addCell(treeCountCell);
    table.addCell(treeCell);
    table.writeSelectedRows(0, 3, 0, 510, cb);

    cb.saveState();
    cb.setRGBColorFill(0xDC, 0xDC, 0xD6);
    cb.rectangle(50.0f, 345.0f, 495.0f, 60.0f);
    cb.fill();
    cb.stroke();
    cb.restoreState();

    PdfPTable textTable = new PdfPTable(1);
    float[] textRows = { 475f };
    textTable.setTotalWidth(textRows);
    textTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
    textTable.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
    textTable.getDefaultCell().setMinimumHeight(14);
    textTable.addCell(new Phrase(new Chunk(pdfTexts.get("certificateText"), customTextFont)));
    textTable.writeSelectedRows(0, 1, 55, 400, cb);
  }

  private void createLawTextDateAndSignatureBlock(PdfContentByte cb, Map<String, String> pdfTexts, String date, String fontPath)
      throws DocumentException, MalformedURLException, IOException {
    BaseFont bull = BaseFont.createFont(fontPath + "/Bull-5-Regular.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
    
    
    Font textFont = new Font(bull, 12, Font.NORMAL, BaseColor.BLACK);
    Font textFontSmall = new Font(bull, 9, Font.NORMAL, BaseColor.BLACK);

    PdfPTable table = new PdfPTable(1);
    float[] rows = { 485f };
    table.setTotalWidth(rows);
    table.getDefaultCell().setBorder(Rectangle.BOTTOM);
    table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
    table.getDefaultCell().setVerticalAlignment(Element.ALIGN_TOP);

    table.getDefaultCell().setFixedHeight(75);

    Phrase certifyTextPhrase = new Phrase();
    certifyTextPhrase.add(new Chunk(pdfTexts.get("certificate.planted_from"), textFont));
    certifyTextPhrase.add(new Chunk("#" + pdfTexts.get("certificateNumber") + " ", textFont));
    certifyTextPhrase.add(new Chunk(pdfTexts.get("certificate.certify_text_1"), textFont));
    certifyTextPhrase.add(new Chunk(Chunk.NEWLINE));
    certifyTextPhrase.add(new Chunk(pdfTexts.get("certificate.certify_text_2"), textFont));

    PdfPCell certifyTextCell = new PdfPCell(certifyTextPhrase);
    certifyTextCell.setBorder(0);

    table.addCell(certifyTextCell);
    table.writeSelectedRows(0, 1, 50, 305, cb);

    pdfHelper.createDividerLine(cb, 50, 230, 485);


    PdfPTable locationDateTable = new PdfPTable(1);
    float[] locationDateRows = { 200f };
    locationDateTable.setTotalWidth(locationDateRows);

    PdfPCell locationDateCell = new PdfPCell();
    locationDateCell.setBorder(Rectangle.NO_BORDER);
    locationDateCell.addElement(new Phrase(new Chunk(pdfTexts.get("certificate.halle") + " " + date, textFont)));
    locationDateCell.setBorder(0);

    locationDateTable.addCell(locationDateCell);
    locationDateTable.writeSelectedRows(0, 1, 50, 230, cb);

    final Image stampImage = Image.getInstance(getClass().getResource(_imagePath + "/signature_and_stamp.jpg"));

    PdfPTable signatureAndStamp = new PdfPTable(1);
    float[] rowss = { 250f };
    signatureAndStamp.setTotalWidth(rowss);
    signatureAndStamp.getDefaultCell().setVerticalAlignment(Element.ALIGN_BOTTOM);
    signatureAndStamp.getDefaultCell().setBorder(Rectangle.NO_BORDER);
    signatureAndStamp.addCell(stampImage);
    signatureAndStamp.writeSelectedRows(0, 1, 250, 210, cb);

    pdfHelper.createDividerLine(cb, 250, 140, 285);

    PdfPTable underSignatureTable = new PdfPTable(1);
    float[] underSignatureRows = { 250f };
    underSignatureTable.setTotalWidth(underSignatureRows);


    Phrase underSignaturePhrase = new Phrase(10f);
    underSignaturePhrase.add(new Chunk(pdfTexts.get("certificate.founder"), textFont));

    PdfPCell underSignatureCell = new PdfPCell(underSignaturePhrase);
    underSignatureCell.setBorder(Rectangle.NO_BORDER);
    underSignatureCell.setPadding(0f);
    underSignatureCell.setVerticalAlignment(Element.ALIGN_TOP);
    underSignatureTable.addCell(underSignatureCell);
    underSignatureTable.writeSelectedRows(0, 1, 250, 140, cb);

  }

}
