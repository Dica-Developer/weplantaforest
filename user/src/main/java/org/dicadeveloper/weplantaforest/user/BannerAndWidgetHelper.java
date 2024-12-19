package org.dicadeveloper.weplantaforest.user;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Data;
import org.springframework.stereotype.Component;

import com.google.common.net.UrlEscapers;

import lombok.SneakyThrows;
import lombok.val;

@Component
public class BannerAndWidgetHelper {

    public String generateBannerHtmlCode(String host, String type, int width, int height) {
        val buffer = new StringBuffer();
        var hostWithPath = host;
        if (host.contains(":8080")) {
            hostWithPath = host.replaceAll(":8080", ":8081");
        } else {
            hostWithPath = host + "/p/u";
        }
        buffer.append("<a href=\"");
        buffer.append(host);
        buffer.append("\">");
        buffer.append("<img src=\"");
        buffer.append(hostWithPath);
        buffer.append("/banner?type=");
        buffer.append(type);
        buffer.append("&width=");
        buffer.append(width);
        buffer.append("&height=");
        buffer.append(height);
        buffer.append("\" />");
        buffer.append("</a>");
        return buffer.toString();
    }

    @SneakyThrows
    public String generateWidgetHtmlCode(String host, String userName, String type, int width, int height, Language language) {
        StringBuffer buffer = new StringBuffer();
        String hostWithPath = host;
        if (host.contains(":8080")) {
            hostWithPath = host.replaceAll(":8080", ":8081");
        } else {
            hostWithPath = host + "/p/u";
        }
        val urlEncodedUsername = UrlEscapers.urlPathSegmentEscaper().escape(userName);
        buffer.append("<a href=\"");
        buffer.append(host);
        buffer.append("/user/");
        buffer.append(urlEncodedUsername);
        buffer.append("\">");
        buffer.append("<img src=\"");
        buffer.append(hostWithPath);
        buffer.append("/widget?userName=");
        buffer.append(urlEncodedUsername);
        buffer.append("&type=");
        buffer.append(type);
        buffer.append("&width=");
        buffer.append(width);
        buffer.append("&height=");
        buffer.append(height);
        buffer.append("&language=");
        buffer.append(language.name());
        buffer.append("\" />");
        buffer.append("</a>");
        return buffer.toString();
    }

    public BufferedImage createWidget(String imagePath, String type, int width, int height, Co2Data co2DataForUser, Language language) throws IOException {
        val bufferedImg = ImageIO.read(getClass().getResourceAsStream(imagePath));

        Double co2Rounded = Math.round(co2DataForUser.getCo2() * 100) / 100.0;
        var co2RoundedAsString = co2Rounded.toString();
        if (Language.DEUTSCH.equals(language)) {
            co2RoundedAsString = co2Rounded.toString().replace(".", ",");
        }
        Graphics2D graphics = bufferedImg.createGraphics();
        graphics.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

        if (width == 100 && height == 100) {
            if ("green".equals(type)) {
                graphics.setColor(Color.WHITE);
            } else {
                graphics.setColor(new Color(130, 170, 30));
            }
            graphics.setFont(new Font("Georgia", Font.PLAIN, 10));
            if (Language.DEUTSCH.equals(language)) {
                graphics.drawString("Bäume : ", 8, 82);
                graphics.drawString("CO2 : ", 22, 95);
            } else {
                graphics.drawString("Trees : ", 18, 82);
                graphics.drawString("CO2 : ", 22, 95);
            }
            graphics.setFont(new Font("Arial", Font.PLAIN, 10));
            graphics.drawString(co2DataForUser.getTreesCount().toString(), 52, 82);
            graphics.drawString(co2RoundedAsString + " t", 52, 95);
        } else if (width == 100 && height == 200) {
            drawTextsOnImage(graphics, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 105, 125, 165, 185, language);
        } else if (width == 100 && height == 300) {
            drawTextsOnImage(graphics, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 130, 150, 230, 250, language);
        } else if (width == 100 && height == 400) {
            drawTextsOnImage(graphics, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 160, 180, 290, 310, language);
        } else if (width == 200 && height == 100) {
            drawTextsOnCrossedImage(graphics, 100, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 17, 37, 67, 87, 1, language);
        } else if (width == 300 && height == 100) {
            drawTextsOnCrossedImage(graphics, 100, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 45, 65, 45, 65, 2, language);
        } else if (width == 400 && height == 100) {
            drawTextsOnCrossedImage(graphics, 133, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 45, 65, 45, 65, 2, language);
        }
        return bufferedImg;
    }

    private void drawTextsOnImage(Graphics2D graphics, String type, String treeCount, String co2, int textTreePos, int amountTreePos, int textCo2Pos, int amountCo2Pos, Language language) {
        if ("green".equals(type)) {
            graphics.setColor(Color.WHITE);
        } else {
            graphics.setColor(new Color(130, 170, 30));
        }
        if (Language.DEUTSCH.equals(language)) {
            drawCenteredString(graphics, "gepflanzte Bäume", 100, new Font("Georgia", Font.PLAIN, 9), textTreePos);
        } else {
            drawCenteredString(graphics, "planted trees", 100, new Font("Georgia", Font.PLAIN, 9), textTreePos);
        }
        drawCenteredString(graphics, treeCount, 100, new Font("Arial", Font.BOLD, 16), amountTreePos);

        if ("white".equals(type)) {
            graphics.setColor(Color.WHITE);
        }
        if (Language.DEUTSCH.equals(language)) {
            drawCenteredString(graphics, "CO2 gebunden in t", 100, new Font("Georgia", Font.PLAIN, 9), textCo2Pos);
        } else {
            drawCenteredString(graphics, "CO2 bound in t", 100, new Font("Georgia", Font.PLAIN, 9), textCo2Pos);
        }
        drawCenteredString(graphics, co2, 100, new Font("Arial", Font.BOLD, 16), amountCo2Pos);
    }

    private void drawTextsOnCrossedImage(Graphics2D graphics, int sectionWidth, String type, String treeCount, String co2, int textTreePos, int amountTreePos, int textCo2Pos, int amountCo2Pos,
            int co2Section, Language language) {
        if ("green".equals(type)) {
            graphics.setColor(Color.WHITE);
        } else {
            graphics.setColor(new Color(130, 170, 30));
        }
        if (Language.DEUTSCH.equals(language)) {
            drawSectionCenteredString(graphics, "gepflanzte Bäume", sectionWidth, new Font("Georgia", Font.PLAIN, 9), textTreePos, 1);
        } else {
            drawSectionCenteredString(graphics, "planted trees", sectionWidth, new Font("Georgia", Font.PLAIN, 9), textTreePos, 1);
        }
        drawSectionCenteredString(graphics, treeCount, sectionWidth, new Font("Arial", Font.BOLD, 16), amountTreePos, 1);

        if ("white".equals(type)) {
            graphics.setColor(Color.WHITE);
        }
        if (Language.DEUTSCH.equals(language)) {
            drawSectionCenteredString(graphics, "CO2 gebunden in t", sectionWidth, new Font("Georgia", Font.PLAIN, 9), textCo2Pos, co2Section);
        } else {
            drawSectionCenteredString(graphics, "CO2 bound in t", sectionWidth, new Font("Georgia", Font.PLAIN, 9), textCo2Pos, co2Section);
        }
        drawSectionCenteredString(graphics, co2, sectionWidth, new Font("Arial", Font.BOLD, 16), amountCo2Pos, co2Section);
    }

    public BufferedImage createWidget2022(String imagePath, int width, int height, Co2Data co2DataForUser, Language language) throws IOException {
        val bufferedImg = ImageIO.read(getClass().getResourceAsStream(imagePath));

        var plantedTreesText = "";
        var co2BoundText = "";
        if (Language.DEUTSCH.equals(language)) {
            plantedTreesText = "gepflanzte Bäume";
            co2BoundText = "CO2 gebunden in t";
        } else {
            plantedTreesText = "Trees planted";
            co2BoundText = "CO2 bound in t";
        }


        Double co2Rounded = Math.round(co2DataForUser.getCo2() * 100) / 100.0;
        var co2RoundedAsString = co2Rounded.toString();
        if (Language.DEUTSCH.equals(language)) {
            co2RoundedAsString = co2Rounded.toString().replace(".", ",");
        }
        Graphics2D graphics = bufferedImg.createGraphics();
        graphics.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

        graphics.setColor(new Color(130, 170, 30));
        if (width == 200 && height == 200) {
            graphics.setColor(new Color(0, 0, 0));
            graphics.setFont(new Font("Arial", Font.PLAIN, 15));
            graphics.drawString(plantedTreesText, 10, 220);
            graphics.drawString(co2BoundText, 10, 263);
            graphics.setFont(new Font("Arial", Font.PLAIN, 20));
            graphics.setColor(new Color(130, 170, 30));
            graphics.drawString(co2DataForUser.getTreesCount().toString(), 190, 220);
            graphics.drawString(co2RoundedAsString, 190, 263);
        } else if (width == 200 && height == 600) {
            graphics.setColor(new Color(0, 0, 0));
            graphics.setFont(new Font("Arial", Font.PLAIN, 15));
            drawCenteredString(graphics, plantedTreesText, 200, new Font("Arial", Font.PLAIN, 15), 255);
            drawCenteredString(graphics, co2BoundText, 200, new Font("Arial", Font.PLAIN, 15), 460);

            graphics.setFont(new Font("Arial", Font.PLAIN, 24));
            graphics.setColor(new Color(130, 170, 30));
            drawCenteredString(graphics, co2DataForUser.getTreesCount().toString(), 200, new Font("Arial", Font.PLAIN, 24), 340);
            drawCenteredString(graphics, co2RoundedAsString, 200, new Font("Arial", Font.PLAIN, 24), 550);
            // graphics.drawString(co2DataForUser.getTreesCount().toString(), 75, 340);
            // graphics.drawString(co2RoundedAsString, 75, 550);
        } else if (width == 600 && height == 200) {
            graphics.setColor(new Color(0, 0, 0));
            graphics.setFont(new Font("Arial", Font.PLAIN, 15));
            graphics.drawString(plantedTreesText, 245, 60);
            graphics.drawString(co2BoundText, 450, 60);

            graphics.setFont(new Font("Arial", Font.PLAIN, 24));
            graphics.setColor(new Color(130, 170, 30));
            graphics.drawString(co2DataForUser.getTreesCount().toString(), 280, 160);
            graphics.drawString(co2RoundedAsString, 480, 160);
        }


        return bufferedImg;
    }

    private void drawSectionCenteredString(Graphics g, String text, int imageWidth, Font font, int ycoord, int section) {
        FontMetrics metrics = g.getFontMetrics(font);
        int x = (imageWidth - metrics.stringWidth(text)) / 2;
        g.setFont(font);
        g.drawString(text, x + (section * imageWidth), ycoord);
    }

    private void drawCenteredString(Graphics g, String text, int imageWidth, Font font, int ycoord) {
        FontMetrics metrics = g.getFontMetrics(font);
        int x = (imageWidth - metrics.stringWidth(text)) / 2;
        g.setFont(font);
        g.drawString(text, x, ycoord);
    }

}
