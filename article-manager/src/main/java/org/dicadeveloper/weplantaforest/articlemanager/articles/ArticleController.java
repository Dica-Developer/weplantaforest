package org.dicadeveloper.weplantaforest.articlemanager.articles;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.articlemanager.FileSystemInjector;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.articlemanager.user.UserRepository;
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

    private @NonNull UserRepository _userRepository;

    private @NonNull ParagraphRepository _paragraphRepository;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = "/backOffice/article/create", method = RequestMethod.POST)
    @JsonView(Views.BackofficeArticleView.class)
    public ResponseEntity<?> createArticle(@RequestParam String userName, @RequestBody Article article) {
        try {
            article.setOwner(_userRepository.findByName(userName));
            _articleRepository.save(article);

            if (article.getParagraphs() != null) {
                for (Paragraph paragraph : article.getParagraphs()) {
                    paragraph.setArticle(article);
                    _paragraphRepository.save(paragraph);
                }
            }
            return new ResponseEntity<>(article, HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Error occured while saving article!", e);
            return new ResponseEntity<>(-1, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/backOffice/article/edit", method = RequestMethod.POST)
    @JsonView(Views.BackofficeArticleView.class)
    public ResponseEntity<?> editArticle(@RequestParam String userName, @RequestBody Article article) {
        try {
            article.setLastEditedOn(System.currentTimeMillis());
            article.setOwner(_userRepository.findByName(article.getOwner()
                                                               .getName()));
            _articleRepository.save(article);

            if (article.getParagraphs() != null) {
                for (Paragraph paragraph : article.getParagraphs()) {
                    paragraph.setArticle(article);
                    _paragraphRepository.save(paragraph);
                }
            }
            return new ResponseEntity<>(article, HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Error occured while saving article!", e);
            return new ResponseEntity<>(-1, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/backOffice/article", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteeArticle(@RequestParam Long articleId) {
        try {
            List<Paragraph> paragraphs = _paragraphRepository.getParagraphsByArticleId(articleId);
            _paragraphRepository.deleteAll(paragraphs);
            _articleRepository.deleteById(articleId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Error occured while deleting article!", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/article/upload/image", method = RequestMethod.POST)
    public ResponseEntity<?> uploadArticleImage(@RequestParam Long articleId, @RequestParam("file") MultipartFile file) {
        String folder = FileSystemInjector.getArticleFolder();
        String imageName = "article_" + articleId + "_main" + file.getOriginalFilename()
                                                                  .substring(file.getOriginalFilename()
                                                                                 .indexOf("."));
        try {
            imageName = _imageHelper.storeImage(file, folder, imageName, false);
            Article articleForImage = _articleRepository.findById(articleId).orElse(null);
            articleForImage.setImageFileName(imageName);
            _articleRepository.save(articleForImage);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while uploading article image!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/paragraph/upload/image", method = RequestMethod.POST)
    public ResponseEntity<?> uploadParagraphImage(@RequestParam Long articleId, @RequestParam Long paragraphId, @RequestParam("file") MultipartFile file) {
        String folder = FileSystemInjector.getArticleFolder();
        String imageName = "article_" + articleId + "_paragraph_" + paragraphId + file.getOriginalFilename()
                                                                                      .substring(file.getOriginalFilename()
                                                                                                     .indexOf("."));
        try {
            imageName = _imageHelper.storeImage(file, folder, imageName, true);
            Paragraph paragraphForImage = _paragraphRepository.findById(paragraphId).orElse(null);
            paragraphForImage.setImageFileName(imageName);
            _paragraphRepository.save(paragraphForImage);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while uploading paragraph image for article!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/backOffice/articles", method = RequestMethod.GET)
    @JsonView(Views.BackofficeArticleOverview.class)
    public ResponseEntity<?> getAllArticles() {
        Iterable<Article> allArticles = _articleRepository.findAllByOrderByCreatedOnDesc();
        return new ResponseEntity<>(allArticles, HttpStatus.OK);
    }

    @RequestMapping(value = "/backOffice/article", method = RequestMethod.GET)
    @JsonView(Views.BackofficeArticleView.class)
    public ResponseEntity<?> getArticleForBackoffice(@RequestParam long articleId) {
        Article article = _articleRepository.findById(articleId).orElse(null);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @RequestMapping(value = "/articles", method = RequestMethod.GET)
    @JsonView(Views.UserArticleView.class)
    public ResponseEntity<?> getArticlesByType(@RequestParam ArticleType articleType, @RequestParam String language) {
        List<Article> articles = _articleRepository.getArticlesByType(articleType, Language.valueOf(language));
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @RequestMapping(value = "/articlesPaged", method = RequestMethod.GET)
    @JsonView({ Views.UserArticleShortView.class })
    public ResponseEntity<?> getArticlesByType(@RequestParam ArticleType articleType, @RequestParam String language, @RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
        Page<Article> articles = _articleRepository.getArticlesByType(articleType, Language.valueOf(language), PageRequest.of(page, size));
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @RequestMapping(value = "/reports/article/{articleId}", method = RequestMethod.GET)
    @JsonView({ Views.UserArticleView.class })
    public Article getArticle(@PathVariable long articleId) {
        return _articleRepository.findById(articleId).orElse(null);
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

    @RequestMapping(value = "/articleTypes", method = RequestMethod.GET)
    public ResponseEntity<?> getArticleTypes() {
        List<String> articleTypes = new ArrayList<>();
        for (ArticleType articleType : ArticleType.values()) {
            if(articleType.isUsed()) {
                articleTypes.add(articleType.getDescription());                
            }
        }
        return new ResponseEntity<>(articleTypes, HttpStatus.OK);
    }

}
