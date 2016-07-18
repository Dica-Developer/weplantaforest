package org.dicadeveloper.weplantaforest.articlemanager.articles;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

}
