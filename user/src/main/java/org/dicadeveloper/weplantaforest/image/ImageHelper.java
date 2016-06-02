package org.dicadeveloper.weplantaforest.image;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.dicadeveloper.weplantaforest.common.support.StringHelper;

import net.coobird.thumbnailator.Thumbnails;

public class ImageHelper {

    public static byte[] getByteArrayForImageName(String imageName, InputStream imageInputStream, int width, int height) throws IOException {
        BufferedImage img = Thumbnails.of(imageInputStream)
                                      .size(width, height)
                                      .asBufferedImage();
        String imageType = StringHelper.getDataTypeFromFileName(imageName);
        ByteArrayOutputStream bao = new ByteArrayOutputStream();

        ImageIO.write(img, imageType, bao);
        imageInputStream.close();
        bao.close();

        return bao.toByteArray();
    }

    public static byte[] getByteArrayForImageName(String imageName, InputStream imageInputStream) throws IOException {
        String imageType = StringHelper.getDataTypeFromFileName(imageName);
        BufferedImage img = ImageIO.read(imageInputStream);
        ByteArrayOutputStream bao = new ByteArrayOutputStream();

        ImageIO.write(img, imageType, bao);
        imageInputStream.close();
        bao.close();

        return bao.toByteArray();
    }

}
