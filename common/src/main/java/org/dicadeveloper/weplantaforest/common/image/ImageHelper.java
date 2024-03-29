package org.dicadeveloper.weplantaforest.common.image;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.common.support.StringHelper;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import net.coobird.thumbnailator.Thumbnails;

@Component
public class ImageHelper {

    protected static final Log LOG = LogFactory.getLog(ImageHelper.class.getName());

    private static final int MAX_SIZE = 1500;

    public void writeImageToOutputStream(OutputStream toWrite, String filePath, int width, int height) throws FileNotFoundException, IOException {
        // all imageNames before the relaunch are saved without file-ending and
        // are jpegs
        if (!filePath.contains(".")) {
            filePath = filePath + ".jpg";
        }

        int[] sizes = { width, height };
        if (sizes[0] > MAX_SIZE || sizes[1] > MAX_SIZE) {
            sizes = scaleSize(sizes);
        }

        FileInputStream inputStream = new FileInputStream(filePath);

        Thumbnails.of(inputStream).size(sizes[0], sizes[1])
        .imageType(BufferedImage.TYPE_INT_ARGB).toOutputStream(toWrite);
        inputStream.close();
    }

    public void writeImageToOutputStream(OutputStream toWrite, String filePath) throws FileNotFoundException, IOException {
        FileCopyUtils.copy(new FileInputStream(filePath), toWrite);
    }

    public String storeImage(MultipartFile file, String folder, String imageName, boolean overwriteExistingImage) throws IOException {
        if (!folderExists(folder)) {
            createNewFolder(folder);
        }
        if (!overwriteExistingImage) {
            if (imageNameExists(folder, imageName)) {
                imageName = createNonExistingImageName(folder, imageName);
            }
        }

        byte[] bytes = null;
        bytes = file.getBytes();

        File fileToSave = new File(folder, imageName);
        FileOutputStream fileOutPutStreamfromFileToSave = null;

        fileOutPutStreamfromFileToSave = new FileOutputStream(fileToSave);

        BufferedOutputStream stream = new BufferedOutputStream(fileOutPutStreamfromFileToSave);

        stream.write(bytes);
        stream.close();
        fileOutPutStreamfromFileToSave.close();

        return imageName;

    }

    public boolean deleteImage(String imageFolder, String fileName) {
        if (folderExists(imageFolder)) {
            File file = new File(imageFolder + "/" + fileName);
            LOG.info(String.format("Deleting image [%s] in folder [%s]", fileName, imageFolder));
            if (file.delete()) {
                return true;
            } else {
                LOG.error("Image couldn't be deleted");
                return false;
            }
        } else {
            LOG.error(String.format("Image couldn't be deleted, cause the folder (%s) does not exist.", imageFolder));
            return false;
        }
    }

    private int[] scaleSize(int[] sizes) {
        if (sizes[0] >= sizes[1]) {
            double scaledPercent = MAX_SIZE * 1.0 / (sizes[0] * 1.0);
            sizes[0] = MAX_SIZE;
            double newHeight = scaledPercent * sizes[1] * 1.0;
            sizes[1] = (int) newHeight;
        } else {
            double scaledPercent = MAX_SIZE * 1.0 / (sizes[1] * 1.0);
            sizes[1] = MAX_SIZE;
            double newWidth = scaledPercent * sizes[0] * 1.0;
            sizes[0] = (int) newWidth;
        }
        return sizes;
    }

    private boolean imageNameExists(String folder, String imageName) {
        return new File(folder + "/" + imageName).exists();
    }

    private boolean folderExists(String folder) {
        return new File(folder).exists();
    }

    private void createNewFolder(String folder) {
        if (folder.contains("/")) {
            StringBuffer folderToCreate = new StringBuffer();
            while (folder.contains("/")) {
                String topFolder = folder.substring(0, folder.indexOf("/"));
                folderToCreate.append(topFolder);
                new File(folderToCreate.toString()).mkdir();

                folderToCreate.append("/");
                folder = folder.substring(folder.indexOf("/") + 1);
            }
            folderToCreate.append(folder);
            new File(folderToCreate.toString()).mkdir();
        } else {
            new File(folder).mkdir();
        }
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
