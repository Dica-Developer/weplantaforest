package org.dicadeveloper.weplantaforest.articlemanager.articles;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.articlemanager.FileSystemInjector;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.articlemanager.views.Views;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;

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
    public ResponseEntity<?> createArticle(@RequestBody Article article) {
        try {

            if (article.getParagraphs() != null) {
                for (Paragraph paragraph : article.getParagraphs()) {
                    paragraph.setArticle(article);
                }
            }

            _articleRepository.save(article);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Error occured while saving article!", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/article/delete", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteeArticle(@RequestParam Long articleId) {
        try {
            List<Paragraph> paragraphs = _paragraphRepository.getParagraphsByArticleId(articleId);
            _paragraphRepository.delete(paragraphs);
            _articleRepository.delete(articleId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Error occured while deleting article!", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/article/upload/image", method = RequestMethod.POST)
    public ResponseEntity<?> uploadArticleImage(@RequestParam Long articleId, @RequestParam String imgType, @RequestParam("file") MultipartFile file) {
        String folder = FileSystemInjector.getArticleFolder() + "/" + articleId;
        String imageName = "main" + "." + imgType;
        try {
            imageName = _imageHelper.storeImage(file, folder, imageName, false);
            Article articleForImage = _articleRepository.findOne(articleId);
            articleForImage.setImageFileName(imageName);
            _articleRepository.save(articleForImage);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while uploading article image!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/paragraph/upload/image", method = RequestMethod.POST)
    public ResponseEntity<?> uploadParagraphImage(@RequestParam Long articleId, @RequestParam Long paragraphId, @RequestParam String imgType, @RequestParam("file") MultipartFile file) {
        String folder = FileSystemInjector.getArticleFolder() + "/" + articleId;
        String imageName = "paragraph_" + paragraphId + "." + imgType;
        try {
            imageName = _imageHelper.storeImage(file, folder, imageName, false);
            Paragraph paragraphForImage = _paragraphRepository.findOne(paragraphId);
            paragraphForImage.setImageFileName(imageName);
            _paragraphRepository.save(paragraphForImage);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while uploading paragraph image for article!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/articles", method = RequestMethod.GET)
    @JsonView(Views.UserArticleShortView.class)
    public ResponseEntity<?> getArticlesByType(@RequestParam ArticleType articleType, @RequestParam String language) {
        List<Article> articles = _articleRepository.getArticlesByType(articleType, Language.valueOf(language));
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @RequestMapping(value = "/articlesPaged", method = RequestMethod.GET)
    @JsonView({ Views.UserArticleShortView.class })
    public ResponseEntity<?> getArticlesByType(@RequestParam ArticleType articleType, @RequestParam String language, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
        Page<Article> articles =  _articleRepository.getArticlesByType(articleType, Language.valueOf(language), new PageRequest(page, size));
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @RequestMapping(value = "/reports/article/{articleId}", method = RequestMethod.GET)
    @JsonView({ Views.UserArticleView.class })
    public Article getArticle(@PathVariable long articleId) {
        return _articleRepository.findOne(articleId);
    }
    
    @RequestMapping(value = "/article/image/{articleId}/{imageName:.+}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getArticleImage(HttpServletResponse response, @PathVariable(value = "articleId") String articleId, @PathVariable(value = "imageName") String imageName) {
        String filePath = FileSystemInjector.getArticleFolder() + "/" + imageName;
        try {
            _imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/article/image/{articleId}/{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getArticleImage(HttpServletResponse response, @PathVariable(value = "articleId") String articleId, @PathVariable(value = "imageName") String imageName,
            @PathVariable int width, @PathVariable int height) {
        String filePath = FileSystemInjector.getArticleFolder() + "/" + imageName;
        try {
            _imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
