package org.dicadeveloper.weplantaforest.receipt;

import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

import org.dicadeveloper.weplantaforest.cart.Cart;
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

public class PdfReceiptView {

    private String _imagePath;

    private final static Font textFontForReceiptHeader = new Font(FontFamily.TIMES_ROMAN, 22, Font.ITALIC, BaseColor.BLACK);

    private final static Font textFont = new Font(FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);

    private final static Font textFontLawText = new Font(FontFamily.HELVETICA, 9, Font.NORMAL, BaseColor.BLACK);

    private final static Font textFontUserData = new Font(FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);

    private final static Font textFontHint = new Font(FontFamily.HELVETICA, 6.8f, Font.NORMAL, BaseColor.BLACK);
    private final static Font textFontHintBold = new Font(FontFamily.HELVETICA, 7, Font.BOLD, BaseColor.BLACK);

    private final static DecimalFormat priceFormat = new DecimalFormat("#0.00");

    private PdfHelper pdfHelper = new PdfHelper();

    public void writePdfDataToOutputStream(OutputStream toWrite, String imagePath, Receipt receipt) throws Exception {
        // create pdf
        final Document doc = new Document();
        final PdfWriter pdfWriter = PdfWriter.getInstance(doc, toWrite);
        pdfWriter.setEncryption(null, null, PdfWriter.ALLOW_DEGRADED_PRINTING | PdfWriter.ALLOW_PRINTING, PdfWriter.STANDARD_ENCRYPTION_128);

        final Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT+2"), Locale.GERMAN);
        cal.setTimeInMillis(receipt.getCreatedOn());
        final String date = cal.get(Calendar.DAY_OF_MONTH) + "." + (cal.get(Calendar.MONTH) + 1) + "." + cal.get(Calendar.YEAR);
        
        _imagePath = imagePath;

        doc.open();

        int amountOfCarts = receipt.getCarts()
                                   .size();
        PdfContentByte cb = pdfWriter.getDirectContent();
        
        pdfHelper.addLogo(cb, _imagePath, 262f, 720f);
        createGeometricObjects(cb, amountOfCarts, doc);
        PdfHelper.createAdress(cb, 75f, 710f);
        createReceiptHeaderAndTextBelow(cb);
        createUserFields(cb, receipt, doc);

        PdfPTable priceTable = createPriceTable(cb, receipt);
        PdfPTable dateTable = createDateTable(cb, receipt);
        PdfPTable hintTable = createHintTable(cb);
        PdfPTable lawTable = createLawTable(cb);
        PdfPTable signatureTable = createSignatureTable(cb, date);

        // hint block
        if (amountOfCarts < 3) {
            PdfHelper.createHeaderBlock(cb, 1, 1);
            priceTable.writeSelectedRows(0, 3 + amountOfCarts, 85f, 390f, cb);
            dateTable.writeSelectedRows(0, 3 + amountOfCarts, 395f, 390f, cb);
            lawTable.writeSelectedRows(0, 6, 75f, 310f - (amountOfCarts + 1) * 16f, cb);
            signatureTable.writeSelectedRows(0, 2, 75f, 225f - (amountOfCarts + 1) * 16f, cb);
            cb.saveState();
            cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
            cb.rectangle(0.0f, 0.0f, 595.0f, 100.0f);
            cb.fill();
            cb.stroke();
            cb.restoreState();
            hintTable.writeSelectedRows(0, 7, 75f, 90f, cb);
        } else if (amountOfCarts >= 3 && amountOfCarts < 9) {
            PdfHelper.createHeaderBlock(cb, 1, 2);
            priceTable.writeSelectedRows(0, 3 + amountOfCarts, 85f, 390f, cb);
            dateTable.writeSelectedRows(0, 3 + amountOfCarts, 395f, 390f, cb);
            lawTable.writeSelectedRows(0, 6, 75f, 310f - (amountOfCarts + 1) * 16f, cb);
            signatureTable.writeSelectedRows(0, 2, 75f, 225f - (amountOfCarts + 1) * 16f, cb);
            doc.newPage();
            PdfHelper.createHeaderBlock(cb, 2, 2);
            cb.saveState();
            cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
            cb.rectangle(0.0f, 722.0f, 595.0f, 100.0f);
            cb.fill();
            cb.stroke();
            cb.restoreState();
            hintTable.writeSelectedRows(0, 7, 75f, 812f, cb);
        } else if (amountOfCarts >= 9 && amountOfCarts < 14) {
            PdfHelper.createHeaderBlock(cb, 1, 2);
            priceTable.writeSelectedRows(0, 3 + amountOfCarts, 85f, 390f, cb);
            dateTable.writeSelectedRows(0, 3 + amountOfCarts, 395f, 390f, cb);
            lawTable.writeSelectedRows(0, 6, 75f, 310f - (amountOfCarts + 1) * 16f, cb);
            doc.newPage();
            PdfHelper.createHeaderBlock(cb, 2, 2);

            signatureTable.writeSelectedRows(0, 2, 75f, 812f, cb);

            cb.saveState();
            cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
            cb.rectangle(0.0f, 625.0f, 595.0f, 100.0f);
            cb.fill();
            cb.stroke();
            cb.restoreState();
            hintTable.writeSelectedRows(0, 7, 75f, 725f, cb);
        } else if (amountOfCarts >= 14 && amountOfCarts < 20) {
            PdfHelper.createHeaderBlock(cb, 1, 2);
            priceTable.writeSelectedRows(0, 3 + amountOfCarts, 85f, 390f, cb);
            dateTable.writeSelectedRows(0, 3 + amountOfCarts, 395f, 390f, cb);
            doc.newPage();
            
            PdfHelper.createHeaderBlock(cb, 2, 2);
            lawTable.writeSelectedRows(0, 6, 75f, 812, cb);
            signatureTable.writeSelectedRows(0, 2, 75f, 717, cb);

            cb.saveState();
            cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
            cb.rectangle(0.0f, 525.0f, 595.0f, 100.0f);
            cb.fill();
            cb.stroke();
            cb.restoreState();
            hintTable.writeSelectedRows(0, 7, 75f, 625f, cb);
        } else if (amountOfCarts >= 20) {
            PdfHelper.createHeaderBlock(cb, 1, 2);
            priceTable.writeSelectedRows(0, 21, 85f, 390f, cb);
            dateTable.writeSelectedRows(0, 21, 395f, 390f, cb);
            doc.newPage();
            
            PdfHelper.createHeaderBlock(cb, 2, 2);

            // grey block
            cb.saveState();
            cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
            cb.rectangle(0.0f, 822f - (amountOfCarts - 18 + 1) * 16f - 8f, 595.0f, (amountOfCarts - 18 + 1) * 16f + 8f);
            cb.fill();
            cb.stroke();
            cb.restoreState();

            // price block
            cb.saveState();
            cb.setRGBColorFill(0xFC, 0xFC, 0xFC);
            cb.rectangle(75.0f, 812f - (amountOfCarts - 18 + 1) * 16f + 12f, 295f, (amountOfCarts - 18 + 1) * 16f - 12f);
            cb.fill();
            cb.stroke();
            cb.restoreState();

            // date block
            cb.saveState();
            cb.setRGBColorFill(0xFC, 0xFC, 0xFC);
            cb.rectangle(385.0f, 812f - (amountOfCarts - 18 + 1) * 16f + 12f, 135f, (amountOfCarts - 18 + 1) * 16f - 12f);
            cb.fill();
            cb.stroke();
            cb.restoreState();

            priceTable.writeSelectedRows(21, 22 + (amountOfCarts - 19), 85f, 812f, cb);
            dateTable.writeSelectedRows(21, 22 + (amountOfCarts - 19), 395f, 812f, cb);

            lawTable.writeSelectedRows(0, 6, 75f, 812 - (amountOfCarts - 18 + 1) * 16f, cb);
            signatureTable.writeSelectedRows(0, 2, 75f, 727 - (amountOfCarts - 18 + 1) * 16f, cb);

            cb.saveState();
            cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
            cb.rectangle(0.0f, 550.0f - (amountOfCarts - 18 + 1) * 16f, 595.0f, 100.0f);
            cb.fill();
            cb.stroke();
            cb.restoreState();
            hintTable.writeSelectedRows(0, 7, 75f, 630f - (amountOfCarts - 18 + 1) * 16f, cb);
        }

        doc.close();
    }

    private void createGeometricObjects(PdfContentByte cb, long amountOfCarts, Document doc) {
        // first big grey block
        // float y 310 h 325
        cb.saveState();
        cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
        cb.rectangle(0.0f, 325f - (amountOfCarts + 1) * 16f, 595.0f, 310 + (amountOfCarts + 1) * 16f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        // name and address block
        cb.saveState();
        cb.setRGBColorFill(0xFC, 0xFC, 0xFC);
        cb.rectangle(75.0f, 410.0f, 445.0f, 120.0f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        // price block
        cb.saveState();
        cb.setRGBColorFill(0xFC, 0xFC, 0xFC);
        cb.rectangle(75.0f, 350f - (amountOfCarts + 1) * 16f, 295f, 45f + (amountOfCarts + 1) * 16f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        // date block
        cb.saveState();
        cb.setRGBColorFill(0xFC, 0xFC, 0xFC);
        cb.rectangle(385.0f, 350f - (amountOfCarts + 1) * 16f, 135f, 45f + (amountOfCarts + 1) * 16f);
        cb.fill();
        cb.stroke();
        cb.restoreState();

        // small triangle in address block
        cb.saveState();
        cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
        cb.moveTo(74f, 455f);
        cb.lineTo(74f, 485f);
        cb.lineTo(82f, 470f);
        cb.lineTo(74f, 455f);
        cb.fill();
        cb.closePathStroke();
        cb.restoreState();

        // small triangle in price block
        cb.saveState();
        cb.setRGBColorFill(0xE0, 0xDE, 0xDF);
        cb.moveTo(74f, 350f);
        cb.lineTo(74f, 380f);
        cb.lineTo(82f, 365f);
        cb.lineTo(74f, 350f);
        cb.fill();
        cb.closePathStroke();
        cb.restoreState();

    }

    private void createReceiptHeaderAndTextBelow(PdfContentByte cb) throws DocumentException {
        PdfPTable headerTable = new PdfPTable(1);
        float[] rows = { 450f };
        headerTable.setTotalWidth(rows);
        headerTable.getDefaultCell()
                   .setBorder(Rectangle.NO_BORDER);

        headerTable.addCell(new Phrase(new Chunk("Bestätigung über Geldzuwendungen", textFontForReceiptHeader)));

        headerTable.writeSelectedRows(0, 1, 75f, 625, cb);

        PdfPTable table = new PdfPTable(1);
        table.setTotalWidth(rows);
        table.getDefaultCell()
             .setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell()
             .setLeading(8f, 0);

        table.addCell(new Phrase(new Chunk("im Sinne des §10b des Einkommensteuergesetzes", textFont)));
        table.addCell(new Phrase(new Chunk("an eine der in §5 Abs. 1 Nr. 9 des Körperschaftsteuergesetzes bezeichneten", textFont)));
        table.addCell(new Phrase(new Chunk("Körperschaften, Personenvereinigungen oder Vermögensmassen", textFont)));

        table.writeSelectedRows(0, 3, 75f, 590, cb);
    }

    private void createUserFields(PdfContentByte cb, Receipt receipt, Document doc) throws DocumentException {
        // get latest cart and sum of total prices
        Cart latest = receipt.getCarts()
                             .get(0);

        // create Strings
        String name = (latest.getCallBackNachname() == null ? "" : latest.getCallBackNachname() + ", ") + (latest.getCallBackVorname() == null ? "" : latest.getCallBackVorname());
        String company = latest.getCallBackFirma() == null ? "" : latest.getCallBackFirma();
        String street = latest.getCallBackStrasse() == null ? "" : latest.getCallBackStrasse();
        String city = (latest.getCallBackPlz() == null ? "" : latest.getCallBackPlz() + " ") + (latest.getCallBackOrt() == null ? "" : latest.getCallBackOrt());

        PdfPTable tableForNameAndAdress = new PdfPTable(1);
        float[] rows = { 450f };
        tableForNameAndAdress.setTotalWidth(rows);
        tableForNameAndAdress.getDefaultCell()
                             .setBorder(Rectangle.NO_BORDER);

        tableForNameAndAdress.addCell(new Phrase(new Chunk("Name und Anschrift des Zuwendenden:", textFont)));
        tableForNameAndAdress.addCell(new Phrase(new Chunk(" ", textFont)));
        tableForNameAndAdress.addCell(new Phrase(new Chunk(company, textFontUserData)));
        tableForNameAndAdress.addCell(new Phrase(new Chunk(name, textFontUserData)));
        tableForNameAndAdress.addCell(new Phrase(new Chunk(street, textFontUserData)));
        tableForNameAndAdress.addCell(new Phrase(new Chunk(city, textFontUserData)));

        tableForNameAndAdress.writeSelectedRows(0, 6, 85f, 525f, cb);

    }

    private PdfPTable createPriceTable(PdfContentByte cb, Receipt receipt) throws DocumentException {
        PdfPTable tableForPrices = new PdfPTable(1);
        float[] rowForTotalPrice = { 250f };
        tableForPrices.setTotalWidth(rowForTotalPrice);
        tableForPrices.getDefaultCell()
                      .setBorder(Rectangle.NO_BORDER);

        tableForPrices.addCell(new Phrase(new Chunk("Betrag der Zuwendung in Ziffern:", textFont)));
        tableForPrices.addCell(new Phrase(new Chunk(" ", textFont)));
        Double totalPrice = 0.0;
        for (final Cart cart : receipt.getCarts()) {
            tableForPrices.addCell(new Phrase(new Chunk(cart.getTotalPrice()
                                                            .toString()
                    + " €", textFontUserData)));
            totalPrice += cart.getTotalPrice()
                              .doubleValue();
        }
        String formattedPrice = priceFormat.format(totalPrice)
                                           .toString();
        tableForPrices.addCell(new Phrase(new Chunk("Gesamt: " + formattedPrice + " €", textFontUserData)));
        return tableForPrices;
    }

    private PdfPTable createDateTable(PdfContentByte cb, Receipt receipt) throws DocumentException {
        PdfPTable tableForDate = new PdfPTable(1);
        float[] rowForDate = { 110f };
        tableForDate.setTotalWidth(rowForDate);
        tableForDate.getDefaultCell()
                    .setBorder(Rectangle.NO_BORDER);

        tableForDate.addCell(new Phrase(new Chunk("Datum der Zuwendung:", textFont)));
        tableForDate.addCell(new Phrase(new Chunk(" ", textFont)));
        final Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT+2"), Locale.GERMAN);
        for (final Cart cart : receipt.getCarts()) {
            cal.setTimeInMillis(cart.getTimeStamp());
            final String date = cal.get(Calendar.DAY_OF_MONTH) + "." + (cal.get(Calendar.MONTH) + 1) + "." + cal.get(Calendar.YEAR);
            PdfPCell cell = new PdfPCell(new Phrase(new Chunk(date, textFontUserData)));
            cell.setHorizontalAlignment(PdfPCell.ALIGN_RIGHT);
            cell.setBorder(PdfPCell.NO_BORDER);
            tableForDate.addCell(cell);
        }
        return tableForDate;
    }

    private PdfPTable createLawTable(PdfContentByte cb) throws DocumentException {
        PdfPTable table = new PdfPTable(1);
        float[] rows = { 445f };
        table.setTotalWidth(rows);
        table.getDefaultCell()
             .setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell()
             .setLeading(8f, 0);

        table.addCell(new Phrase(new Chunk("Es handelt sich nicht um den Verzicht auf Erstattung von Aufwendungen.", textFontLawText)));
        table.addCell(new Phrase(new Chunk("Die Gesellschaft ist wegen Förderung (begünstigter Zweck: Umweltschutz (§52 (2) S. 1 Nr.(n) 8 AO)) durch", textFontLawText)));
        table.addCell(new Phrase(new Chunk("Bescheinigung des Finanzamt Halle (Saale)-Nord, StNr. 110/108/91169, vom 19.11.2008 ab 01.01.2009", textFontLawText)));
        table.addCell(new Phrase(new Chunk("als gemeinnützig anerkannt. Letzter Freistellungsbescheid datiert auf den 24.10.2016.", textFontLawText)));
        table.addCell(new Phrase(new Chunk("Es wird bestätigt, dass die Zuwendung nur zur Förderung des Umweltschutzes verwendet wird.", textFontLawText)));

        PdfPCell emptyCell = new PdfPCell();
        emptyCell.setBorder(Rectangle.BOTTOM);
        emptyCell.setFixedHeight(15f);
        table.addCell(emptyCell);

        return table;
    }

    private PdfPTable createSignatureTable(PdfContentByte cb, String date) throws DocumentException, MalformedURLException, IOException {
        PdfPTable table = new PdfPTable(5);
        float[] rows = { 95f, 10f, 35f, 10f, 110f };
        table.setTotalWidth(rows);
        table.getDefaultCell()
             .setBorder(Rectangle.NO_BORDER);

        final Image signatureImage = Image.getInstance(getClass().getResource(_imagePath + "/Unterschrift150.jpg"));
        final Image stampImage = Image.getInstance(getClass().getResource(_imagePath + "/stamp.jpg"));

        PdfPCell placeDateCell = new PdfPCell();
        placeDateCell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        placeDateCell.setBorder(Rectangle.NO_BORDER);
        placeDateCell.addElement(new Phrase(new Chunk("Halle, " + date, textFontUserData)));

        PdfPCell signatureCell = new PdfPCell();
        signatureCell.setBorder(Rectangle.NO_BORDER);
        signatureCell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        signatureCell.setImage(signatureImage);

        PdfPCell stampCell = new PdfPCell();
        stampCell.setBorder(Rectangle.NO_BORDER);
        stampCell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        stampCell.setImage(stampImage);

        table.addCell(placeDateCell);
        table.addCell(new Phrase(new Chunk(" ", textFontUserData)));
        table.addCell(signatureCell);
        table.addCell(new Phrase(new Chunk(" ", textFontUserData)));
        table.addCell(stampCell);

        PdfPCell underSignatureCell = new PdfPCell();
        underSignatureCell.setColspan(5);
        underSignatureCell.setBorder(Rectangle.TOP);
        underSignatureCell.addElement(new Phrase(new Chunk("Ort, Datum, Unterschrift des Zuwendungsempfängers", textFont)));
        table.addCell(underSignatureCell);

        return table;
    }

    private PdfPTable createHintTable(PdfContentByte cb) throws DocumentException {
        PdfPTable table = new PdfPTable(3);
        float[] rows = { 215f, 15f, 215f };
        table.setTotalWidth(rows);
        table.getDefaultCell()
             .setBorder(Rectangle.NO_BORDER);
        table.getDefaultCell()
             .setHorizontalAlignment(Element.ALIGN_JUSTIFIED_ALL);
        table.getDefaultCell()
             .setLeading(5f, 0f);

        PdfPCell hintCell = new PdfPCell();
        hintCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        hintCell.setBorder(Rectangle.NO_BORDER);
        hintCell.addElement(new Phrase(new Chunk("Hinweis:", textFontHintBold)));

        table.addCell(hintCell);
        table.addCell(new Phrase(new Chunk(" ", textFontHintBold)));
        table.addCell(new Phrase(new Chunk(" ", textFontHintBold)));

        table.addCell(new Paragraph(new Chunk("Wer vorsätzlich oder grob fahrlässig eine unrichtige Zuwendungsbe-", textFontHint)));
        table.addCell(new Phrase(new Chunk(" ", textFontHintBold)));
        table.addCell(new Paragraph(new Chunk("Diese Bestätigung wird nicht als Nachweis für die steuerliche Berück-", textFontHint)));

        table.addCell(new Phrase(new Chunk("stätigung erstellt oder wer veranlasst, dass Zuwendungen nicht zu", textFontHint)));
        table.addCell(new Phrase(new Chunk(" ", textFontHintBold)));
        table.addCell(new Phrase(new Chunk("sichtigung der Zuwendung anerkannt, wenn das Datum des Freistel-", textFontHint)));

        table.addCell(new Phrase(new Chunk("den in der Zuwendungsbestätigung angegebenen steuerbegünstig-", textFontHint)));
        table.addCell(new Phrase(new Chunk(" ", textFontHintBold)));
        table.addCell(new Phrase(new Chunk("lungsbesscheides länger als 5 Jahre bzw. das Datum der vorläufigen", textFontHint)));

        table.addCell(new Phrase(new Chunk("ten Zwecken verwendet werden, haftet für die Steuer, die dem Fiskus", textFontHint)));
        table.addCell(new Phrase(new Chunk(" ", textFontHintBold)));
        table.addCell(new Phrase(new Chunk("Bescheinigung länger als 3 Jahre seit Ausstellung der Bestätigung zu-", textFontHint)));

        PdfPCell lastCellRight = new PdfPCell();
        lastCellRight.setHorizontalAlignment(Element.ALIGN_LEFT);
        lastCellRight.setBorder(Rectangle.NO_BORDER);
        lastCellRight.addElement(new Phrase(5f, new Chunk("rückliegt (BMF vom 15.12.1994 - BStBl I S. 884).", textFontHint)));

        table.addCell(new Phrase(new Chunk("durch einen etwaigen Abzug der Zuwendungen beim Zuwendenden", textFontHint)));
        table.addCell(new Phrase(new Chunk(" ", textFontHintBold)));
        table.addCell(lastCellRight);

        PdfPCell lastCellLeft = new PdfPCell();
        lastCellLeft.setHorizontalAlignment(Element.ALIGN_LEFT);
        lastCellLeft.setBorder(Rectangle.NO_BORDER);
        lastCellLeft.addElement(new Phrase(5f, new Chunk("entgeht(§10b Abs. 4 EStG, §9 Abs. 3 KStG, §9 Nr.5 GewStG).", textFontHint)));

        table.addCell(lastCellLeft);
        table.addCell(new Phrase(new Chunk(" ", textFontHintBold)));
        table.addCell(new Phrase(new Chunk(" ", textFontHint)));
        return table;
    }

}
