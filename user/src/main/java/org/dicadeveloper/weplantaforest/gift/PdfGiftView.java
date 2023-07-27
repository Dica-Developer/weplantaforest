package org.dicadeveloper.weplantaforest.gift;

import java.io.OutputStream;
import java.util.Map;
import java.io.IOException;

import org.dicadeveloper.weplantaforest.support.PdfHelper;
import org.dicadeveloper.weplantaforest.support.Uris;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.BaseFont;

public class PdfGiftView {
    private String _imagePath;

    private final String ENTER_CODE_URL = Uris.HOST + Uris.GIFT_REDEEM;

    PdfHelper pdfHelper = new PdfHelper();

    public void buildPdfDocument(OutputStream toWrite, Map<String, String> pdfTexts, String[] codeFragments, String imagePath, String fontPath) throws Exception {
        // create pdf
        final Document doc = new Document();
        final PdfWriter pdfWriter = PdfWriter.getInstance(doc, toWrite);
        pdfHelper.registerFonts(fontPath);

        pdfWriter.setEncryption(null, null, ~(PdfWriter.ALLOW_MODIFY_CONTENTS), PdfWriter.STANDARD_ENCRYPTION_128);
        _imagePath = imagePath;

        doc.open();

        PdfContentByte cb = pdfWriter.getDirectContent();

        pdfHelper.createBackground(cb);
        pdfHelper.addLogo2023(cb, imagePath, 50f, 730f);
        pdfHelper.addTreeImage(cb, imagePath+ "/Robinie_color.jpg", 290f, 520f);
        pdfHelper.createDividerLine(cb, 0, 690, 335);
        pdfHelper.createDividerLine(cb, 560, 690, 40);
        pdfHelper.createBrownRectangle(cb, 0, 320, 595, 190);
        pdfHelper.addHeader(cb, fontPath, pdfTexts.get("gift.gift"));
        createTreeCountAndPlantedByBlock(cb, pdfTexts, fontPath);
        createInstructions(cb, pdfTexts, fontPath);
    
        pdfHelper.addFooter(cb, fontPath, pdfTexts);

        doc.close();
    }

    private void createTreeCountAndPlantedByBlock(PdfContentByte cb, Map<String, String> pdfTexts, String fontPath)
    throws DocumentException, IOException {
  BaseColor background = new BaseColor(220, 220, 214);
  BaseFont bull = BaseFont.createFont(fontPath + "/Bull-5-Regular.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
  
  Font textFont = new Font(bull, 18, Font.NORMAL, background);
  Font textFontTreeCount = new Font(bull, 35, Font.NORMAL, background);
  Font customTextFont = new Font(bull, 12, Font.NORMAL, background);

  PdfPTable table = new PdfPTable(1);
  float[] rows = { 595f };
  table.setTotalWidth(rows);
  table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
  table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
  table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);

  PdfPCell aboutCell = new PdfPCell(new Phrase(new Chunk(pdfTexts.get("gift.about"), textFont)));
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
    treeCell = new PdfPCell(new Phrase(new Chunk(pdfTexts.get("gift.tree"), textFont)));
  } else {
    treeCell = new PdfPCell(new Phrase(new Chunk(pdfTexts.get("gift.trees"), textFont)));
  }
  treeCell.setMinimumHeight(22);
  treeCell.setBorder(0);
  treeCell.setHorizontalAlignment(Element.ALIGN_CENTER);
  treeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);

  table.addCell(aboutCell);
  table.addCell(treeCountCell);
  table.addCell(treeCell);
  table.writeSelectedRows(0, 3, 0, 495, cb);

  PdfPTable bottomTextTable = new PdfPTable(1);
  bottomTextTable.setTotalWidth(rows);
  bottomTextTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
  bottomTextTable.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
  bottomTextTable.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);

  PdfPCell plantedByCell = new PdfPCell(new Phrase(new Chunk(pdfTexts.get("gift.planted_from"), customTextFont)));
  plantedByCell.setBorder(0);
  plantedByCell.setMinimumHeight(22);
  plantedByCell.setHorizontalAlignment(Element.ALIGN_CENTER);
  plantedByCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
  bottomTextTable.addCell(plantedByCell);
  bottomTextTable.writeSelectedRows(0, 1, 0, 360, cb);

  //grey divider line
  cb.saveState();
  cb.setRGBColorFill(0xDC, 0xDC, 0xD6);
  cb.rectangle(40, 365, 515, 0.91f);
  cb.fill();
  cb.stroke();
  cb.restoreState();

    }

    private void createInstructions(PdfContentByte cb, Map<String, String> pdfTexts, String fontPath) throws DocumentException, IOException{
      BaseFont bull = BaseFont.createFont(fontPath + "/Bull-5-Regular.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);    

      Font textFontBig = new Font(bull, 18, Font.NORMAL, BaseColor.BLACK);

      Font textFont = new Font(bull, 12, Font.NORMAL, BaseColor.BLACK);

      PdfPTable headerTable = new PdfPTable(1);
      float[] headerRows = { 595f };
      headerTable.setTotalWidth(headerRows);
      Phrase headerPhrase = new Phrase();
      headerPhrase.add(new Chunk(pdfTexts.get("gift.redeem"), textFontBig));
      
      PdfPCell headerCell = new PdfPCell(headerPhrase);
      headerCell.setBorder(0);
      headerCell.setMinimumHeight(22);
      headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
      headerCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
      
  
      headerTable.addCell(headerCell);
      headerTable.writeSelectedRows(0, 1, 0, 310, cb);

      
      pdfHelper.createDividerLine(cb, 40, 270, 515);
      
      PdfPTable table = new PdfPTable(1);
      float[] rows = { 485f };
      table.setTotalWidth(rows);
      table.getDefaultCell().setBorder(Rectangle.BOTTOM);
      table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
      table.getDefaultCell().setVerticalAlignment(Element.ALIGN_TOP);
  
      table.getDefaultCell().setFixedHeight(150);
  
      Phrase certifyTextPhrase = new Phrase();
      certifyTextPhrase.add(new Chunk(pdfTexts.get("gift.redeem_1"), textFont));
      certifyTextPhrase.add(new Chunk(Chunk.NEWLINE));
      certifyTextPhrase.add(new Chunk(pdfTexts.get("gift.redeem_2"), textFont));
      certifyTextPhrase.add(new Chunk(Chunk.NEWLINE));
      certifyTextPhrase.add(new Chunk(pdfTexts.get("gift.redeem_3"), textFont));
      certifyTextPhrase.add(new Chunk(Chunk.NEWLINE));
      certifyTextPhrase.add(new Chunk(Chunk.NEWLINE));
      certifyTextPhrase.add(new Chunk(pdfTexts.get("gift.redeem_4"), textFont));
      certifyTextPhrase.add(new Chunk(Chunk.NEWLINE));
      certifyTextPhrase.add(new Chunk(pdfTexts.get("gift.redeem_5"), textFont));
  
      PdfPCell certifyTextCell = new PdfPCell(certifyTextPhrase);
      certifyTextCell.setBorder(0);
  
      table.addCell(certifyTextCell);
      table.writeSelectedRows(0, 1, 40, 265, cb);
  
      pdfHelper.createDividerLine(cb, 40, 160, 515);
  
    }

  }
