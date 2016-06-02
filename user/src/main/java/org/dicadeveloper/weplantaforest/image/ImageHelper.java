package org.dicadeveloper.weplantaforest.image;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.dicadeveloper.weplantaforest.common.support.StringHelper;
import org.springframework.stereotype.Component;

import net.coobird.thumbnailator.Thumbnails;

@Component
public class ImageHelper {

    public final static String IMAGE_FOLDER = "../../../../static/images/";

    public byte[] getByteArrayForImageName(String imageName, int width, int height) throws Exception {
        InputStream imageInputStream = getImageInputStream(imageName);

        BufferedImage img = Thumbnails.of(imageInputStream)
                                      .size(width, height)
                                      .asBufferedImage();
        ByteArrayOutputStream bao = getByteArrayOutputStream(imageInputStream, img, imageName);
        return bao.toByteArray();
    }

    public byte[] getByteArrayForImageName(String imageName) throws Exception {
        InputStream imageInputStream = getImageInputStream(imageName);
        BufferedImage img = ImageIO.read(imageInputStream);

        ByteArrayOutputStream bao = getByteArrayOutputStream(imageInputStream, img, imageName);
        return bao.toByteArray();
    }

    private InputStream getImageInputStream(String imageName) throws NullPointerException{
        InputStream imageInputStream = this.getClass()
                                           .getResourceAsStream(IMAGE_FOLDER + imageName);
        if (null == imageInputStream) {
            throw new NullPointerException("No image found for imageName: " + imageName + "!");
        }
        return this.getClass()
                   .getResourceAsStream(IMAGE_FOLDER + imageName);
    }

    private ByteArrayOutputStream getByteArrayOutputStream(InputStream imageInputStream, BufferedImage img, String imageName) throws IOException {
        String imageType = StringHelper.getDataTypeFromFileName(imageName);
        ByteArrayOutputStream bao = new ByteArrayOutputStream();

        ImageIO.write(img, imageType, bao);
        imageInputStream.close();
        bao.close();
        return bao;
    }

}
