package org.dicadeveloper.weplantaforest.gift;

import java.io.OutputStream;
import java.util.Map;

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

public class PdfGiftView {
    private String _imagePath;

    private final String ENTER_CODE_URL = Uris.HOST + Uris.GIFT_REDEEM;

    private final static Font textFontForCircle = new Font(FontFamily.TIMES_ROMAN, 26, Font.ITALIC, BaseColor.WHITE);

    PdfHelper pdfHelper = new PdfHelper();

    public void buildPdfDocument(OutputStream toWrite, Map<String, String> pdfTexts, String[] codeFragments, String imagePath) throws Exception {
        // create pdf
        final Document doc = new Document();
        final PdfWriter pdfWriter = PdfWriter.getInstance(doc, toWrite);
        pdfWriter.setEncryption(null, null, PdfWriter.ALLOW_COPY, PdfWriter.STANDARD_ENCRYPTION_128);
        _imagePath = imagePath;

        doc.open();

        PdfContentByte cb = pdfWriter.getDirectContent();

        PdfHelper.createHeaderBlock(cb, 1, 1);

        createHeaderCircle(cb, pdfTexts);        
        createBlueBlock(cb, pdfTexts);
        createGreyBlock(cb, pdfTexts, codeFragments);

        pdfHelper.addLogo(cb, _imagePath, 266f, 35f);
        doc.close();
    }
    
    private void createHeaderCircle(PdfContentByte cb, Map<String, String> pdfTexts) throws DocumentException {
        cb.saveState();
        cb.setRGBColorFill(0x82, 0xAB, 0x1f);
        cb.circle(297.5, 700, 80);
        cb.fill();
        cb.stroke();
        cb.restoreState();
        
        Font textFont = new Font(FontFamily.TIMES_ROMAN, 22, Font.ITALIC, BaseColor.WHITE);
        PdfPTable tableForHeaderCircleText = new PdfPTable(1);
        float[] rows = { 160f };
        tableForHeaderCircleText.setTotalWidth(rows);
        tableForHeaderCircleText.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        tableForHeaderCircleText.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        tableForHeaderCircleText.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        tableForHeaderCircleText.getDefaultCell().setFixedHeight(40);
        
        tableForHeaderCircleText.addCell(new Phrase(new Chunk(pdfTexts.get("gift.gift"), textFont)));
        tableForHeaderCircleText.writeSelectedRows(0, 1, 217.5f, 725f, cb);
    }

    private void createBlueBlock(PdfContentByte cb, Map<String, String> pdfTexts) throws DocumentException {
        cb.saveState();
        cb.setRGBColorFill(0x64, 0xA7, 0xBD);
        cb.rectangle(0.0f, 375.0f, 595.0f, 200.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        Font textFont = new Font(FontFamily.TIMES_ROMAN, 14, Font.ITALIC, BaseColor.WHITE);
        Font textBlack = new Font(FontFamily.TIMES_ROMAN, 14, Font.ITALIC, BaseColor.BLACK);
        Font textFontTreeCount = new Font(FontFamily.HELVETICA, 30, Font.BOLD, BaseColor.BLACK);
        PdfPTable tableForTreeCount = new PdfPTable(1);
        float[] rows = { 495f };
        tableForTreeCount.setTotalWidth(rows);
        tableForTreeCount.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        tableForTreeCount.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        tableForTreeCount.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        tableForTreeCount.getDefaultCell().setFixedHeight(40);

        tableForTreeCount.addCell(new Phrase(new Chunk(pdfTexts.get("treeCount"), textFontTreeCount)));

        tableForTreeCount.writeSelectedRows(0, 1, 50f, 575f, cb);

        PdfPTable tableForWhiteText = new PdfPTable(1);
        tableForWhiteText.setTotalWidth(rows);
        tableForWhiteText.getDefaultCell().setBorder(Rectangle.BOTTOM);
        tableForWhiteText.getDefaultCell().setBorderWidth(1f);
        tableForWhiteText.getDefaultCell().setBorderColor(BaseColor.WHITE);
        tableForWhiteText.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        tableForWhiteText.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        tableForWhiteText.getDefaultCell().setFixedHeight(40);

        Phrase phraseForTreesPlantForYou = new Phrase();
        if (Integer.valueOf(pdfTexts.get("treeCount")) == 1) {
            phraseForTreesPlantForYou.add(new Chunk(pdfTexts.get("gift.planted_tree"), textFont));
        } else {
            phraseForTreesPlantForYou.add(new Chunk(pdfTexts.get("gift.planted_trees"), textFont));
        }

        PdfPCell longTextCell = new PdfPCell();
        longTextCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        longTextCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        longTextCell.setBorder(Rectangle.BOTTOM);
        longTextCell.setBorderWidth(1f);
        longTextCell.setBorderColor(BaseColor.WHITE);
        longTextCell.setFixedHeight(65);

        Paragraph longText = new Paragraph(new Chunk(pdfTexts.get("gift.main_text"), textFont));
        longText.setLeading(15f);

        longTextCell.addElement(longText);

        tableForWhiteText.addCell(phraseForTreesPlantForYou);
        tableForWhiteText.addCell(longTextCell);
        tableForWhiteText.writeSelectedRows(0, 2, 50f, 535f, cb);

        PdfPTable tableForHowItWorks = new PdfPTable(1);
        tableForHowItWorks.setTotalWidth(rows);
        tableForHowItWorks.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        tableForHowItWorks.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        tableForHowItWorks.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        tableForHowItWorks.getDefaultCell().setFixedHeight(40);

        tableForHowItWorks.addCell(new Phrase(new Chunk(pdfTexts.get("gift.how_it_works"), textBlack)));

        tableForHowItWorks.writeSelectedRows(0, 2, 50f, 425f, cb);
    }

    private void createGreyBlock(PdfContentByte cb, Map<String, String> pdfTexts, String[] codeFragments) throws DocumentException {
        cb.saveState();
        cb.setRGBColorFill(0x73, 0x73, 0x75);
        cb.rectangle(0.0f, 125.0f, 595.0f, 250.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        cb.saveState();
        cb.setRGBColorFill(0x64, 0xA7, 0xBD);
        cb.moveTo(275f, 376f);
        cb.lineTo(321f, 376f);
        cb.lineTo(298f, 365f);
        cb.lineTo(275f, 376f);
        cb.fill();
        cb.closePathStroke();
        cb.restoreState();

        Font textFontNumber = new Font(FontFamily.HELVETICA, 30, Font.BOLD, BaseColor.WHITE);
        Font textFont = new Font(FontFamily.HELVETICA, 11, Font.NORMAL, BaseColor.WHITE);
        Font textFontBold = new Font(FontFamily.HELVETICA, 11, Font.BOLD, BaseColor.WHITE);

        PdfPTable table = new PdfPTable(2);
        float[] rows = { 100f, 345f };
        table.setTotalWidth(rows);

        PdfPCell numberCell = createNumberCell();
        Paragraph numberOne = new Paragraph();
        numberOne.setIndentationLeft(60f);
        numberOne.add(new Chunk("1.", textFontNumber));
        numberCell.addElement(numberOne);

        PdfPCell numberCell2 = createNumberCell();
        Paragraph number2 = new Paragraph();
        number2.setIndentationLeft(60f);
        number2.add(new Chunk("2.", textFontNumber));
        numberCell2.addElement(number2);

        PdfPCell numberCell3 = createNumberCell();
        Paragraph number3 = new Paragraph();
        number3.setIndentationLeft(60f);
        number3.add(new Chunk("3.", textFontNumber));
        numberCell3.addElement(number3);

        PdfPCell instructionCell = createInstructionCell();
        Phrase instructionOne = new Phrase();
        instructionOne.add(new Chunk(pdfTexts.get("gift.call_url") + "\n", textFont));
        instructionOne.add(new Chunk(ENTER_CODE_URL, textFontBold));
        instructionCell.addElement(instructionOne);

        PdfPCell instructionCell2 = createInstructionCell();
        Phrase instruction2 = new Phrase();
        instruction2.add(new Chunk(pdfTexts.get("gift.insert_code") + "\n", textFont));
        instruction2.add(new Chunk(codeFragments[0] + " " + codeFragments[1] + " " + codeFragments[2] + " " + codeFragments[3], textFontBold));
        instructionCell2.addElement(instruction2);

        PdfPCell instructionCell3 = createInstructionCell();
        Paragraph instruction3 = new Paragraph();
        instruction3.add(new Chunk(pdfTexts.get("gift.now_login"), textFont));
        instruction3.setLeading(12f);
        instructionCell3.addElement(instruction3);

        PdfPCell emptyCell = new PdfPCell();
        emptyCell.setBorder(Rectangle.NO_BORDER);

        PdfPCell greetingCell = new PdfPCell();
        greetingCell.setBorder(Rectangle.NO_BORDER);

        Phrase greeting = new Phrase();
        greeting.add(new Chunk(pdfTexts.get("gift.have_fun"), textFont));
        greetingCell.addElement(greeting);

        table.addCell(numberCell);
        table.addCell(instructionCell);
        table.addCell(numberCell2);
        table.addCell(instructionCell2);
        table.addCell(numberCell3);
        table.addCell(instructionCell3);
        table.addCell(emptyCell);
        table.addCell(greetingCell);

        table.writeSelectedRows(0, 4, 75f, 355f, cb);
    }

    private PdfPCell createNumberCell() {
        PdfPCell numberCell = new PdfPCell();
        numberCell.setVerticalAlignment(Element.ALIGN_TOP);
        numberCell.setBorder(Rectangle.NO_BORDER);
        numberCell.setPaddingTop(15f);
        return numberCell;
    }

    private PdfPCell createInstructionCell() {
        PdfPCell instructionCell = new PdfPCell();
        instructionCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        instructionCell.setBorder(Rectangle.BOTTOM);
        instructionCell.setBorderWidth(1f);
        instructionCell.setBorderColor(BaseColor.WHITE);
        instructionCell.setPaddingBottom(10f);
        return instructionCell;
    }
}
