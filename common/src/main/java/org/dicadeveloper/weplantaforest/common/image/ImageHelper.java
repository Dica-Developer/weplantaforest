package org.dicadeveloper.weplantaforest.common.image;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.common.support.StringHelper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

@Component
public class ImageHelper {

    protected final Log LOG = LogFactory.getLog(ImageHelper.class.getName());

    public byte[] getByteArrayForImageName(String imageName, String folder) {
        folder = folder + "/";
        File imageFile = getImageAsFile(imageName, folder);
        byte[] imageBytes = getByteArray(imageFile, imageName);
        return imageBytes;
    }

    public byte[] getByteArrayForImageName(String imageName, String folder, int width, int height) {
        folder = folder + "/";
        File imageFile = getImageAsFile(imageName, folder);
        byte[] imageBytes = getByteArray(imageFile, imageName, width, height);
        return imageBytes;
    }

    public boolean storeImage(MultipartFile file, String folder, String imageName) {
        if (!folderExists(folder)) {
            createNewFolder(folder);
        }
        if (imageNameExists(folder, imageName)) {
            imageName = createNonExistingImageName(folder, imageName);
        }

        byte[] bytes = null;
        try {
            bytes = file.getBytes();
        } catch (IOException e1) {
            LOG.error("Error occured while applying bytes from imageFile: " + file.getName() + "!");
            return false;
        }

        File fileToSave = new File(folder, imageName);
        FileOutputStream fileOutPutStreamfromFileToSave = null;
       
        try {
            fileOutPutStreamfromFileToSave = new FileOutputStream(fileToSave);
        } catch (FileNotFoundException e) {
           LOG.error("File not found for " + fileToSave.getPath() + "!");
           return false;
        }

        BufferedOutputStream stream = new BufferedOutputStream(fileOutPutStreamfromFileToSave);
        try {
            stream.write(bytes);
            stream.close();
            fileOutPutStreamfromFileToSave.close();
        } catch (IOException e) {
            LOG.error("Error occured while writing stream for " + file.getName() + "!");
            return false;
        }
        return true;
    }

    private File getImageAsFile(String imageName, String folder) {
        String filePath = folder + imageName;            
        return new File(filePath);
    }

    private byte[] getByteArray(File file, String imageName, int width, int height) {
        String imageType = StringHelper.getDataTypeFromFileName(imageName);
        ByteArrayOutputStream bao = new ByteArrayOutputStream(0);
        try {
            BufferedImage img = Thumbnails.of(file).size(width, height).asBufferedImage();
            ImageIO.write(img, imageType, bao);
            bao.close();
        } catch (IOException e) {
           LOG.error("Problem occured while creatinig image bytes for image " + imageName + "!");
        }
        
        return bao.toByteArray();
    }

    private byte[] getByteArray(File file, String imageName) {
        String imageType = StringHelper.getDataTypeFromFileName(imageName);
        ByteArrayOutputStream bao = new ByteArrayOutputStream(0);
        try {
            BufferedImage img = ImageIO.read(file);
            ImageIO.write(img, imageType, bao);
            bao.close();
        } catch (IOException e) {
            return bao.toByteArray();
        }
        return bao.toByteArray();
    }

    private boolean imageNameExists(String folder, String imageName) {
        return new File(folder + "/" + imageName).exists();
    }

    private boolean folderExists(String folder) {
        return new File(folder).exists();
    }

    private void createNewFolder(String folder) {
        new File(folder).mkdir();
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
