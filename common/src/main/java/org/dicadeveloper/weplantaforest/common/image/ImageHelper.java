package org.dicadeveloper.weplantaforest.common.image;

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

    public enum ImageFolder {
        PROJECTS("projects/"), ARTICLES("articles/"), DEFAULT("");

        private final String text;

        private ImageFolder(final String text) {
            this.text = text;
        }

        @Override
        public String toString() {
            return text;
        }
    };

    public final static String IMAGE_FOLDER_RELATIVE = "../../../../../static/images/";

    public final static String UPLOAD_IMAGE_FOLDER_EXTENDED_FROM_CURRENT = "src/main/resources/static/images/";

    public byte[] getByteArrayForImageName(String imageName, ImageFolder mainFolder, String subFolder) {
        subFolder = subFolder + "/";
        InputStream imageInputStream = getImageInputStream(imageName, mainFolder.toString(), subFolder);
        byte[] imageBytes = getByteArray(imageInputStream, imageName);
        return imageBytes;
    }

    public byte[] getByteArrayForImageName(String imageName, ImageFolder mainFolder, String subFolder, int width, int height) {
        subFolder = subFolder + "/";
        InputStream imageInputStream = getImageInputStream(imageName, mainFolder.toString(), subFolder);
        byte[] imageBytes = getByteArray(imageInputStream, imageName, width, height);
        return imageBytes;
    }

    public void storeImage(MultipartFile file, String folder, String imageName) throws IOException {
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

    private InputStream getImageInputStream(String imageName, String mainFolder, String subFolder) {
        String filePath = IMAGE_FOLDER_RELATIVE + mainFolder + subFolder + imageName;
        InputStream imageInputStream = this.getClass().getResourceAsStream(filePath);
        return imageInputStream;
    }

    private byte[] getByteArray(InputStream imageInputStream, String imageName, int width, int height) {
        String imageType = StringHelper.getDataTypeFromFileName(imageName);
        ByteArrayOutputStream bao = new ByteArrayOutputStream(0);
        try {
            BufferedImage img = Thumbnails.of(imageInputStream).size(width, height).asBufferedImage();
            ImageIO.write(img, imageType, bao);
            imageInputStream.close();
            bao.close();
        } catch (IOException e) {
            return bao.toByteArray();
        }
        return bao.toByteArray();
    }

    private byte[] getByteArray(InputStream imageInputStream, String imageName) {
        String imageType = StringHelper.getDataTypeFromFileName(imageName);
        ByteArrayOutputStream bao = new ByteArrayOutputStream(0);
        try {
            BufferedImage img = ImageIO.read(imageInputStream);
            ImageIO.write(img, imageType, bao);
            imageInputStream.close();
            bao.close();
        } catch (IOException e) {
            return bao.toByteArray();
        }
        return bao.toByteArray();
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
