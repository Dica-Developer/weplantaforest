package org.dicadeveloper.weplantaforest.articlemanager.articles;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.articlemanager.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class ArticleController {

    protected final Log LOG = LogFactory.getLog(ArticleController.class.getName());

    private @NonNull ArticleRepository _articleRepository;

    private @NonNull ParagraphRepository _paragraphRepository;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = "/article/create", method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> createArticle(@RequestBody Article article) {
        try {

            List<Paragraph> paragraphs = article.getParagraphs();

            article.setParagraphs(new ArrayList<>());
            for (Paragraph paragraph : paragraphs) {
                article = article.addParagraph(paragraph);
            }
            _articleRepository.save(article);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Error occured while saving article!", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/article/upload/image", method = RequestMethod.POST)
    public ResponseEntity<?> uploadArticleImage(@RequestParam Long articleId, @RequestParam String imgType, @RequestParam("file") MultipartFile file) {
        String folder = FileSystemInjector.getArticleFolder() + "/" + articleId;
        String imageName = "main" + "." + imgType;
        try {
            imageName = _imageHelper.storeImage(file, folder, imageName);
            Article articleForImage = _articleRepository.findOne(articleId);
            articleForImage.setImageFileName(imageName);
            _articleRepository.save(articleForImage);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while saving article!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/paragraph/upload/image", method = RequestMethod.POST)
    public ResponseEntity<?> uploadParagraphImage(@RequestParam Long articleId, @RequestParam Long paragraphId, @RequestParam String imgType, @RequestParam("file") MultipartFile file) {
        String folder = FileSystemInjector.getArticleFolder() + "/" + articleId;
        String imageName = "paragraph_"+ paragraphId + "." + imgType;
        try {
            imageName = _imageHelper.storeImage(file, folder, imageName);
            Paragraph paragraphForImage = _paragraphRepository.findOne(paragraphId);
            paragraphForImage.setImageFileName(imageName);
            _paragraphRepository.save(paragraphForImage);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while saving article!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
