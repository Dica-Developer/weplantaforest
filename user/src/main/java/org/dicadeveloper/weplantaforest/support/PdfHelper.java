package org.dicadeveloper.weplantaforest.support;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Image;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPTable;

public class PdfHelper {

    public static void createHeaderBlock(PdfContentByte cb) throws DocumentException, IOException {
        cb.saveState();
        cb.setColorFill(BaseColor.BLACK);
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
        table.addCell(new Phrase(new Chunk(" ", textFont)));
        table.writeSelectedRows(0, 1, 0, 842, cb);
    }

    public static void createCircleAndText(PdfContentByte cb, String text, float xCoord, float yCoord, float radius, Font textFont, int circleColorRed, int circleColorGreen, int circleColorBlue)
            throws DocumentException, IOException {
        cb.saveState();
        cb.setRGBColorFill(circleColorRed, circleColorGreen, circleColorBlue);
        cb.circle(xCoord, yCoord, radius);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        PdfPTable table = new PdfPTable(1);
        float[] rows = { 595f };
        table.setTotalWidth(rows);
        table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
        table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.getDefaultCell().setFixedHeight(radius * 2);
        table.addCell(new Phrase(new Chunk(text, textFont)));
        table.writeSelectedRows(0, 1, 0, yCoord + radius, cb);
    }

    public void addLogo(PdfContentByte cb, String imagePath, float xPos, float yPos) throws MalformedURLException, IOException, DocumentException {
        URL imageUrl = getClass().getResource(imagePath + "/IPAT_logo_Relaunch2016_RZ_RGB.jpg");
        final Image logoImage = Image.getInstance(imageUrl);
        logoImage.setAbsolutePosition(xPos, yPos);
        logoImage.scalePercent(3f, 3f);
        cb.addImage(logoImage);
    }

    public static void createAdress(PdfContentByte cb, float xCoord, float yCoord) throws DocumentException {
        Font textFontForAdress = new Font(FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);

        PdfPTable table = new PdfPTable(1);
        float[] rows = { 200f };
        table.setTotalWidth(rows);
        table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell().setFixedHeight(14f);

        table.addCell(new Phrase(new Chunk("Wald 1.1 gemeinnützige GmbH", textFontForAdress)));
        table.addCell(new Phrase(new Chunk("Gabelsbergerstraße 4", textFontForAdress)));
        table.addCell(new Phrase(new Chunk("D-06114 Halle", textFontForAdress)));

        table.writeSelectedRows(0, 3, xCoord, yCoord, cb);
    }
}
