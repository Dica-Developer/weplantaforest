package org.dicadeveloper.weplantaforest.reports.articles;

import java.util.List;

import org.dicadeveloper.weplantaforest.articles.Article.ArticleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ArticleDataController {

    private @NonNull ArticleDataRepository _articleDataRepository;

    @RequestMapping(value = "/reports/articles/{articleType}", method = RequestMethod.GET)
    public List<ArticleData> getArticlesByType(@PathVariable int articleType) {
        return _articleDataRepository.getArticlesByType(ArticleType.values()[articleType]);
    }

    @RequestMapping(value = "/reports/article/{articleTitle}", method = RequestMethod.GET)
    public List<ArticleContentData> getParagraphsByArticleTitle(@PathVariable String articleTitle) {
        return _articleDataRepository.getParagraphsByArticleTitle(articleTitle);
    }

}
