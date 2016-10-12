package org.dicadeveloper.weplantaforest.gift;

import java.io.OutputStream;

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

    public void buildPdfDocument(OutputStream toWrite, final String name, final int treeCount, String[] codeFragments, String imagePath) throws Exception {
        // create pdf
        final Document doc = new Document();
        final PdfWriter pdfWriter = PdfWriter.getInstance(doc, toWrite);
        pdfWriter.setEncryption(null, null, PdfWriter.ALLOW_DEGRADED_PRINTING | PdfWriter.ALLOW_PRINTING, PdfWriter.STANDARD_ENCRYPTION_128);
        _imagePath = imagePath;

        doc.open();

        PdfContentByte cb = pdfWriter.getDirectContent();

        PdfHelper.createHeaderBlock(cb);
        PdfHelper.createCircleAndText(cb, "Gutschein", 298f, 705f, 75, textFontForCircle, 0x7F, 0xAD, 0x09);

        createBlueBlock(cb, treeCount);
        createGreyBlock(cb, codeFragments);

        pdfHelper.addLogo(cb, _imagePath, 262f, 35f);
        doc.close();
    }

    private void createBlueBlock(PdfContentByte cb, int treeCount) throws DocumentException {
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

        Integer treeCountAsObject = treeCount;
        tableForTreeCount.addCell(new Phrase(new Chunk(treeCountAsObject.toString(), textFontTreeCount)));

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
        if (treeCount == 1) {
            phraseForTreesPlantForYou.add(new Chunk("Baum wurde für Sie gepflanzt!", textFont));
        } else {
            phraseForTreesPlantForYou.add(new Chunk("Bäume wurden für Sie gepflanzt!", textFont));
        }

        PdfPCell longTextCell = new PdfPCell();
        longTextCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        longTextCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        longTextCell.setBorder(Rectangle.BOTTOM);
        longTextCell.setBorderWidth(1f);
        longTextCell.setBorderColor(BaseColor.WHITE);
        longTextCell.setFixedHeight(65);

        Paragraph longText = new Paragraph(new Chunk(
                "Mit diesem Gutschein können sie Ihre Pflanzung in Augenschein nehmen und mehr über die naturnahen Aufforstungsprojekte bei \"I Plant A Tree\" erfahren. Ihre Bäume wachsen auf ehemals brachliegenden Flächen und sind Teil neu entstehender Wälder.",
                textFont));
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

        tableForHowItWorks.addCell(new Phrase(new Chunk("Und so einfach funktioniert's:", textBlack)));

        tableForHowItWorks.writeSelectedRows(0, 2, 50f, 425f, cb);
    }

    private void createGreyBlock(PdfContentByte cb, String[] codeFragments) throws DocumentException {
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
        instructionOne.add(new Chunk("Rufen Sie mit Ihrem Internetnrowser folgende Webadresse auf:\n", textFont));
        instructionOne.add(new Chunk(ENTER_CODE_URL, textFontBold));
        instructionCell.addElement(instructionOne);

        PdfPCell instructionCell2 = createInstructionCell();
        Phrase instruction2 = new Phrase();
        instruction2.add(new Chunk("Geben Sie den angefügten Benutzercode ein:\n", textFont));
        instruction2.add(new Chunk(codeFragments[0] + " " + codeFragments[1] + " " + codeFragments[2] + " " + codeFragments[3], textFontBold));
        instructionCell2.addElement(instruction2);

        PdfPCell instructionCell3 = createInstructionCell();
        Paragraph instruction3 = new Paragraph();
        instruction3.add(new Chunk(
                "Jetzt nur noch anmelden und Ihre Bäume werden Ihnen automatisch gutgeschrieben. Sie können sich von nun an jederzeit bei \"I Plant A Tree\" einloggen, um das Gedeihen Ihrer Setzlinge und die Entwicklung der Projektflächen mitzuverfolgen. Selbstverständlich können Sie auch noch weitere Bäume in einer Vielzahl von Projekten pflanzen und das ganz einfach per Mausklick.",
                textFont));
        instruction3.setLeading(12f);
        instructionCell3.addElement(instruction3);

        PdfPCell emptyCell = new PdfPCell();
        emptyCell.setBorder(Rectangle.NO_BORDER);

        PdfPCell greetingCell = new PdfPCell();
        greetingCell.setBorder(Rectangle.NO_BORDER);

        Phrase greeting = new Phrase();
        greeting.add(new Chunk("Wir wünschen Ihnen viel Spaß mit Ihren Bäumen und freuen uns auf Ihren Besuch.", textFont));
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
