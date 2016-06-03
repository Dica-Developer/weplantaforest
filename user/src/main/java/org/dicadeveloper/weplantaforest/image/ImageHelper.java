package org.dicadeveloper.weplantaforest.image;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.dicadeveloper.weplantaforest.common.support.StringHelper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

@Component
public class ImageHelper {

    public final static String IMAGE_FOLDER_RELATIVE = "../../../../static/images/";

    public final static String UPLOAD_IMAGE_FOLDER_EXTENDED_FROM_CURRENT = "src/main/resources/static/images/";

    protected byte[] getByteArrayForImageName(String imageName, int width, int height) throws Exception {
        InputStream imageInputStream = getImageInputStream(imageName);

        BufferedImage img = Thumbnails.of(imageInputStream)
                                      .size(width, height)
                                      .asBufferedImage();
        ByteArrayOutputStream bao = getByteArrayOutputStream(imageInputStream, img, imageName);
        return bao.toByteArray();
    }

    protected byte[] getByteArrayForImageName(String imageName) throws Exception {
        InputStream imageInputStream = getImageInputStream(imageName);
        BufferedImage img = ImageIO.read(imageInputStream);

        ByteArrayOutputStream bao = getByteArrayOutputStream(imageInputStream, img, imageName);
        return bao.toByteArray();
    }

    protected void storeImage(MultipartFile file, String folder, String imageName) throws IOException {
        if (!folderExists(folder)) {
            createNewFolder(folder);
        }
        if (imageNameExists(folder, imageName)) {
            imageName = createNonExistingImageName(folder, imageName);
        }

        byte[] bytes = file.getBytes();

        File fileToSave = new File(ImageHelper.UPLOAD_IMAGE_FOLDER_EXTENDED_FROM_CURRENT + folder, imageName);

        BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(fileToSave));
        stream.write(bytes);
        stream.close();
    }

    private InputStream getImageInputStream(String imageName) throws NullPointerException {
        InputStream imageInputStream = this.getClass()
                                           .getResourceAsStream(IMAGE_FOLDER_RELATIVE + imageName);
        if (null == imageInputStream) {
            throw new NullPointerException("No image found for imageName: " + imageName + "!");
        }
        return this.getClass()
                   .getResourceAsStream(IMAGE_FOLDER_RELATIVE + imageName);
    }

    private ByteArrayOutputStream getByteArrayOutputStream(InputStream imageInputStream, BufferedImage img, String imageName) throws IOException {
        String imageType = StringHelper.getDataTypeFromFileName(imageName);
        ByteArrayOutputStream bao = new ByteArrayOutputStream();

        ImageIO.write(img, imageType, bao);
        imageInputStream.close();
        bao.close();
        return bao;
    }

    private boolean imageNameExists(String folder, String imageName) {
        return new File(ImageHelper.UPLOAD_IMAGE_FOLDER_EXTENDED_FROM_CURRENT + folder + "/" + imageName).exists();
    }

    private boolean folderExists(String folder) {
        return new File(ImageHelper.UPLOAD_IMAGE_FOLDER_EXTENDED_FROM_CURRENT + folder).exists();
    }

    private void createNewFolder(String folder) {
            new File(ImageHelper.UPLOAD_IMAGE_FOLDER_EXTENDED_FROM_CURRENT + folder).mkdir();
    }

    private String createNonExistingImageName(String folder, String imageName) {
        int imageNumber = 2;
        String newImageName = imageName;
        while (imageNameExists(folder, newImageName)) {
            newImageName = StringHelper.addNumberToFileName(imageName, imageNumber);
            imageNumber++;
        }
        return newImageName;
    }

}
