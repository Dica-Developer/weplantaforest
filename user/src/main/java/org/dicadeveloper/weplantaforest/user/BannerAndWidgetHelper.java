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

import org.dicadeveloper.weplantaforest.reports.co2.Co2Data;
import org.springframework.stereotype.Component;

@Component
public class BannerAndWidgetHelper {

    public String generateBannerHtmlCode(String host, String type, int width, int height) {
        StringBuffer buffer = new StringBuffer();
        String hostWithoutPort = host;
        int indexOf = host.indexOf(":", 5);
        if (indexOf > 5) {
            hostWithoutPort = host.substring(0, indexOf + 1);
        } else {
            hostWithoutPort = hostWithoutPort + ":";
        }
        buffer.append("<a href=\"");
        buffer.append(host);
        buffer.append("\">");
        buffer.append("<img src=\"");
        buffer.append(hostWithoutPort);
        buffer.append("8081/banner?type=");
        buffer.append(type);
        buffer.append("&width=");
        buffer.append(width);
        buffer.append("&height=");
        buffer.append(height);
        buffer.append("\" />");
        buffer.append("</a>");
        return buffer.toString();
    }

    public String generateWidgetHtmlCode(String host, String userName, String type, int width, int height) {
        StringBuffer buffer = new StringBuffer();
        String hostWithoutPort = host;
        int indexOf = host.indexOf(":", 5);
        if (indexOf > 5) {
            hostWithoutPort = host.substring(0, indexOf + 1);
        } else {
            hostWithoutPort = hostWithoutPort + ":";
        }
        buffer.append("<a href=\"");
        buffer.append(host);
        buffer.append("\">");
        buffer.append("<img src=\"");
        buffer.append(hostWithoutPort);
        buffer.append("8081/widget?userName=");
        buffer.append(userName);
        buffer.append("&type=");
        buffer.append(type);
        buffer.append("&width=");
        buffer.append(width);
        buffer.append("&height=");
        buffer.append(height);
        buffer.append("\" />");
        buffer.append("</a>");
        return buffer.toString();
    }

    public BufferedImage createWidget(String imagePath, String type, int width, int height, Co2Data co2DataForUser) throws IOException {
        BufferedImage bufferedImg = ImageIO.read(getClass().getResourceAsStream(imagePath));

        Double co2Rounded = (double) Math.round(co2DataForUser.getCo2() * 100) / 100;
        String co2RoundedAsString = co2Rounded.toString().replace(".", ",");
        Graphics2D graphics = bufferedImg.createGraphics();
        graphics.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

        if (width == 100 && height == 100) {
            if ("green".equals(type)) {
                graphics.setColor(Color.WHITE);
            } else {
                graphics.setColor(new Color(130, 171, 31));
            }
            graphics.setFont(new Font("Georgia", Font.PLAIN, 10));
            graphics.drawString("Bäume : ", 8, 82);
            graphics.drawString("CO2 : ", 22, 95);
            graphics.setFont(new Font("Arial", Font.PLAIN, 10));
            graphics.drawString(co2DataForUser.getTreesCount().toString(), 52, 82);
            graphics.drawString(co2RoundedAsString + " t", 52, 95);
        } else if (width == 100 && height == 200) {
            drawTextsOnImage(graphics, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 105, 125, 165, 185);
        } else if (width == 100 && height == 300) {
            drawTextsOnImage(graphics, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 130, 150, 230, 250);
        } else if (width == 100 && height == 400) {
            drawTextsOnImage(graphics, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 160, 180, 290, 310);
        } else if (width == 200 && height == 100) {
            drawTextsOnCrossedImage(graphics, 100, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 17, 37, 67, 87, 1);
        } else if (width == 300 && height == 100) {
            drawTextsOnCrossedImage(graphics, 100, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 45, 65, 45, 65, 2);
        } else if (width == 400 && height == 100) {
            drawTextsOnCrossedImage(graphics, 133, type, co2DataForUser.getTreesCount().toString(), co2RoundedAsString, 45, 65, 45, 65, 2);
        }
        return bufferedImg;
    }

    private void drawTextsOnImage(Graphics2D graphics, String type, String treeCount, String co2, int textTreePos, int amountTreePos, int textCo2Pos, int amountCo2Pos) {
        if ("green".equals(type)) {
            graphics.setColor(Color.WHITE);
        } else {
            graphics.setColor(new Color(130, 171, 31));
        }
        drawCenteredString(graphics, "gepflanzte Bäume", 100, new Font("Georgia", Font.PLAIN, 9), textTreePos);
        drawCenteredString(graphics, treeCount, 100, new Font("Arial", Font.BOLD, 16), amountTreePos);

        if ("white".equals(type)) {
            graphics.setColor(Color.WHITE);
        }
        drawCenteredString(graphics, "C02 gebunden in t", 100, new Font("Georgia", Font.PLAIN, 9), textCo2Pos);
        drawCenteredString(graphics, co2, 100, new Font("Arial", Font.BOLD, 16), amountCo2Pos);
    }

    private void drawTextsOnCrossedImage(Graphics2D graphics, int sectionWidth, String type, String treeCount, String co2, int textTreePos, int amountTreePos, int textCo2Pos, int amountCo2Pos,
            int co2Section) {
        if ("green".equals(type)) {
            graphics.setColor(Color.WHITE);
        } else {
            graphics.setColor(new Color(130, 171, 31));
        }
        drawSectionCenteredString(graphics, "gepflanzte Bäume", sectionWidth, new Font("Georgia", Font.PLAIN, 9), textTreePos, 1);
        drawSectionCenteredString(graphics, treeCount, sectionWidth, new Font("Arial", Font.BOLD, 16), amountTreePos, 1);

        if ("white".equals(type)) {
            graphics.setColor(Color.WHITE);
        }
        drawSectionCenteredString(graphics, "C02 gebunden in t", sectionWidth, new Font("Georgia", Font.PLAIN, 9), textCo2Pos, co2Section);
        drawSectionCenteredString(graphics, co2, sectionWidth, new Font("Arial", Font.BOLD, 16), amountCo2Pos, co2Section);
    }

    private void drawSectionCenteredString(Graphics g, String text, int imageWidth, Font font, int yCoord, int section) {
        FontMetrics metrics = g.getFontMetrics(font);
        int x = (imageWidth - metrics.stringWidth(text)) / 2;
        g.setFont(font);
        g.drawString(text, x + (section * imageWidth), yCoord);
    }

    private void drawCenteredString(Graphics g, String text, int imageWidth, Font font, int yCoord) {
        FontMetrics metrics = g.getFontMetrics(font);
        int x = (imageWidth - metrics.stringWidth(text)) / 2;
        g.setFont(font);
        g.drawString(text, x, yCoord);
    }
}
