package org.dicadeveloper.weplantaforest.support;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.Set;


import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;

public class PdfHelper {

  public void registerFonts(String fontPath) {
    Set<String> fonts = FontFactory.getRegisteredFonts();
    boolean hasBull = false;
    boolean hasArchitect = false;
    for (String font : fonts) {
      if(font.equals("Bull")) {
        hasBull = true;
      }
      if(font.equals("nbArchitect")) {
        hasArchitect = true;
      }
    }
    if(!hasBull) {
      FontFactory.register(fontPath + "/Bull-5-Mono.ttf", "Bull");
    }
    if(!hasArchitect) {
    FontFactory.register(fontPath + "/NB-Architekt-Pro-Regular.otf", "nbArchitect");
    }
  }

    public void createHeaderBlock(PdfContentByte cb, Map<String, String> pdfTexts) throws DocumentException, IOException {
        cb.saveState();
        cb.setColorFill(new BaseColor(79, 58, 44));
        cb.rectangle(0.0f, 822.0f, 595.0f, 20.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        Font textFont = new Font(FontFamily.HELVETICA, 7, Font.NORMAL, BaseColor.WHITE);

        PdfPTable table = new PdfPTable(4);
        float[] rows = { 100f, 100f, 100f, 295f };
        table.setTotalWidth(rows);
        table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.getDefaultCell().setFixedHeight(20);
        table.addCell(new Phrase(new Chunk(pdfTexts.get("certificate.header_company"), textFont)));
        table.addCell(new Phrase(new Chunk(pdfTexts.get("certificate.header_account"), textFont)));
        table.addCell(new Phrase(new Chunk(pdfTexts.get("certificate.header_homepage"), textFont)));
        table.addCell(new Phrase(new Chunk("", textFont)));

        table.writeSelectedRows(0, 1, 0, 842, cb);
    }

    public static void createHeaderBlock(PdfContentByte cb, int pageNumber, int pageSize) throws DocumentException, IOException {
        cb.saveState();
        cb.setColorFill(new BaseColor(79, 58, 44));
        cb.rectangle(0.0f, 822.0f, 595.0f, 20.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        Font textFont = new Font(FontFamily.HELVETICA, 7, Font.NORMAL, BaseColor.WHITE);

        PdfPTable table = new PdfPTable(4);
        float[] rows = { 100f, 100f, 100f, 295f };
        table.setTotalWidth(rows);
        table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.getDefaultCell().setFixedHeight(20);
        table.addCell(new Phrase(new Chunk("WALD 1.1 gGmbH", textFont)));
        table.addCell(new Phrase(new Chunk("[ Spendenkonto 222 888 ]", textFont)));
        table.addCell(new Phrase(new Chunk("www.iplantatree.org", textFont)));

        PdfPCell pageCell = new PdfPCell(new Phrase(new Chunk("Seite " + pageNumber + " von " + pageSize, textFont)));
        pageCell.setHorizontalAlignment(PdfPCell.ALIGN_RIGHT);
        pageCell.setBorder(PdfPCell.NO_BORDER);
        table.addCell(pageCell);
        table.writeSelectedRows(0, 1, 0, 842, cb);
    }

    public void createCertificateImage(PdfContentByte cb, String imagePath, String language, float xpos, float ypos) throws DocumentException, IOException {
        URL imageUrl = getClass().getResource(imagePath + "/IPAT_Zertifikat_" + language + ".jpg");
        final Image logoImage = Image.getInstance(imageUrl);
        logoImage.setAbsolutePosition(xpos, ypos);
        logoImage.scalePercent(70f, 70f);
        cb.addImage(logoImage);
    }

    public void addLogo(PdfContentByte cb, String imagePath, float xpos, float ypos) throws MalformedURLException, IOException, DocumentException {
        URL imageUrl = getClass().getResource(imagePath + "/IPAT_logo_Relaunch2016_RZ_RGB.png");
        final Image logoImage = Image.getInstance(imageUrl);
        logoImage.setAbsolutePosition(xpos, ypos);
        logoImage.scalePercent(8f, 8f);
        cb.addImage(logoImage);
    }

    public static void createAdress(PdfContentByte cb, float xcoord, float ycoord) throws DocumentException {
        Font textFontForAdress = new Font(FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);

        PdfPTable table = new PdfPTable(1);
        float[] rows = { 200f };
        table.setTotalWidth(rows);
        table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell().setFixedHeight(14f);

        table.addCell(new Phrase(new Chunk("Wald 1.1 gemeinnützige GmbH", textFontForAdress)));
        table.addCell(new Phrase(new Chunk("Gabelsbergerstraße 4", textFontForAdress)));
        table.addCell(new Phrase(new Chunk("D-06114 Halle", textFontForAdress)));

        table.writeSelectedRows(0, 3, xcoord, ycoord, cb);
    }

    public void addLogo2023(PdfContentByte cb, String imagePath, float xpos, float ypos) throws MalformedURLException, IOException, DocumentException {
      URL imageUrl = getClass().getResource(imagePath + "/IPAT_logo_Relaunch2023_RZ_RGB.png");
      final Image logoImage = Image.getInstance(imageUrl);
      logoImage.setAbsolutePosition(xpos, ypos);
      logoImage.scalePercent(8f, 8f);
      cb.addImage(logoImage);
    }

    public void addTreeImage(PdfContentByte cb, String imagePath, float xpos, float ypos, float scaling) throws MalformedURLException, IOException, DocumentException {
      URL imageUrl = getClass().getResource(imagePath);
      final Image logoImage = Image.getInstance(imageUrl);
      logoImage.setAbsolutePosition(xpos, ypos);
      logoImage.scalePercent(scaling, scaling);
      cb.addImage(logoImage);
    }

    public void createBackground(PdfContentByte cb) {
      cb.saveState();
      cb.setRGBColorFill(0xFD, 0xFE, 0xFB);
      cb.rectangle(0.0f, 0.0f, 595.0f, 1165.0f);
      cb.fill();
      cb.stroke();
      cb.restoreState();
    }
  
    public void createDividerLine(PdfContentByte cb, float x, float y, float width) {
      cb.saveState();
      cb.setRGBColorFill(0x65, 0x59, 0x4E);
      cb.rectangle(x, y, width, 0.9125f);
      cb.fill();
      cb.stroke();
      cb.restoreState();
    }
  
    public void createBrownRectangle(PdfContentByte cb, float x, float y, float width, float height) {
      cb.saveState();
      cb.setRGBColorFill(0x65, 0x59, 0x4E);
      cb.rectangle(x, y, width, height);
      cb.fill();
      cb.stroke();
      cb.restoreState();
    }

    public void addHeader(PdfContentByte cb, String fontPath, String headerText)
    throws DocumentException {
  BaseColor brown = new BaseColor(101, 89, 78);
  Font customFont = FontFactory.getFont("nbArchitect", BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 52, Font.NORMAL,
      brown);

  PdfPTable table = new PdfPTable(1);
  float[] rows = { 380f };
  table.setTotalWidth(rows);
  table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
  table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
  table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
  table.getDefaultCell().setFixedHeight(75);
  table.addCell(new Phrase(new Chunk(headerText, customFont)));
  table.writeSelectedRows(0, 1, 0, 645, cb);
}

public void addFooter(PdfContentByte cb, String fontPath, Map<String, String> pdfTexts)
    throws DocumentException, IOException {
      BaseFont bull = BaseFont.createFont(fontPath + "/Bull-5-Regular.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
      Font textFontSmall = new Font(bull, 8, Font.NORMAL, BaseColor.BLACK);
  
      createDividerLine(cb, 0, 75, 595);

      PdfPTable footerTable = new PdfPTable(2);
      float[] footerRows = { 163f, 250f };
      
      footerTable.setTotalWidth(footerRows);
      footerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
  
      Phrase addressPhrase = new Phrase();
      Chunk newLineChunk = new Chunk(Chunk.NEWLINE);
      newLineChunk.setLineHeight(15f);
  
      Chunk address1Chunk = new Chunk(pdfTexts.get("adress_1"), textFontSmall);
      address1Chunk.setLineHeight(14f);
      addressPhrase.add(address1Chunk);
      addressPhrase.add(newLineChunk);
  
      Chunk address2Chunk = new Chunk(pdfTexts.get("adress_2"), textFontSmall);
      address2Chunk.setLineHeight(14f);
      addressPhrase.add(address2Chunk);
      addressPhrase.add(newLineChunk);
      Chunk homepageChunk = new Chunk(pdfTexts.get("header_homepage"), textFontSmall);
      homepageChunk.setLineHeight(14f);
      addressPhrase.add(homepageChunk);
  
      PdfPCell addressCell = new PdfPCell(addressPhrase);
      addressCell.setBorder(Rectangle.NO_BORDER);
  
      footerTable.addCell(addressCell);
  
      Phrase bankPhrase = new Phrase();
      Chunk bankChunk = new Chunk(pdfTexts.get("bank_adress_1"), textFontSmall);
      bankChunk.setLineHeight(14f);
      bankPhrase.add(bankChunk);
      bankPhrase.add(newLineChunk);
  
      Chunk bankChunk2 = new Chunk(pdfTexts.get("bank_adress_2"), textFontSmall);
      bankChunk2.setLineHeight(14f);
      bankPhrase.add(bankChunk2);
      bankPhrase.add(newLineChunk);
      Chunk bankChunk3 = new Chunk(pdfTexts.get("bank_adress_3"), textFontSmall);
      bankChunk3.setLineHeight(14f);
      bankPhrase.add(bankChunk3);
      bankPhrase.add(newLineChunk);
  
      PdfPCell bankCell = new PdfPCell(bankPhrase);
      bankCell.setBorder(Rectangle.NO_BORDER);
  
      footerTable.addCell(bankCell);
  
      footerTable.writeSelectedRows(0, 1, 70, 73, cb);
  
}

}