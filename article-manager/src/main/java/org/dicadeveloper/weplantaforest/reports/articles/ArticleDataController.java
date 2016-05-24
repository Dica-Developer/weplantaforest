package org.dicadeveloper.weplantaforest.reports.articles;

import java.util.List;

import org.dicadeveloper.weplantaforest.articles.Article.ArticleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
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

    @RequestMapping(value = "/articles/{articleType}", method = RequestMethod.GET)
    public Page<ArticleData> getArticlesByType(@PathVariable ArticleType articleType, @Param(value = "page") int page,
            @Param(value = "size") int size) {
        return _articleDataRepository.getArticlesByType(articleType, new PageRequest(page, size));
    }

    @RequestMapping(value = "/reports/article/{articleTitle}", method = RequestMethod.GET)
    public List<ArticleContentData> getParagraphsByArticleTitle(@PathVariable String articleTitle) {
        return _articleDataRepository.getParagraphsByArticleTitle(articleTitle);
    }

}
