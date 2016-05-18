package org.dicadeveloper.weplantaforest.dev.inject;

import java.util.List;
import java.util.Random;

import org.dicadeveloper.weplantaforest.articles.Article;
import org.dicadeveloper.weplantaforest.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.articles.ArticleRepository;
import org.dicadeveloper.weplantaforest.articles.Paragraph;
import org.dicadeveloper.weplantaforest.articles.ParagraphRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.ImmutableList;

/**
 * Provides the functionality to easily populate the database with test data.
 */
@Service
public class DatabasePopulator {

    private final static List<String> DEFAULT_USERS = ImmutableList.of("articleManager", "blogManager", "newsManager",
            "knowledgeManager");

    private UserRepository _userRepository;

    private ArticleRepository _articleRepository;

    private ParagraphRepository _parapgraphRepository;

    @Autowired
    public DatabasePopulator(ArticleRepository articleRepository, ParagraphRepository paragraphRepository,
            UserRepository userRepository) {
        _articleRepository = articleRepository;
        _userRepository = userRepository;
        _parapgraphRepository = paragraphRepository;
    }

    public DatabasePopulator insertUsers() {
        DEFAULT_USERS.forEach((userName) -> {
            User user = new User();
            user.setName(userName);
            user.setEnabled(true);
            _userRepository.save(user);
        });
        return this;
    }

    public DatabasePopulator insertArticles() {
        Random random = new Random();

        for (ArticleType articleType : ArticleType.values()) {
            int pickOne = random.nextInt(4);

            Article article = new Article();
            article.setOwner(_userRepository.findByName(DEFAULT_USERS.get(pickOne)));
            article.setArticleType(articleType);
            article.setLang(Language.GERMAN);
            article.setShowFull(true);
            article.setCreatedOn((long) random.nextInt(1000000000));
            article.setTitle("our first " + articleType.toString() + " article");
            article.setIntro("this is an article about " + articleType.toString());
            _articleRepository.save(article);
        }
        return this;
    }

    public DatabasePopulator insertParagraphsToArticles() {
        for (Article article : _articleRepository.findAll()) {
            for (int i = 0; i < 3; i++) {
                Paragraph paragraph = new Paragraph();
                paragraph.setArticle(article);
                paragraph.setTitle("this is the paragraph nr " + (i + 1));
                paragraph.setText("this is a paragraph about a lot of blabla(" + (i + 1) + ")");
                _parapgraphRepository.save(paragraph);
            }
        }

        return this;
    }

}
