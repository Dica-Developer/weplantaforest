package org.dicadeveloper.weplantaforest.testSupport;

import org.dicadeveloper.weplantaforest.articles.Article;
import org.dicadeveloper.weplantaforest.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.articles.ArticleRepository;
import org.dicadeveloper.weplantaforest.articles.Paragraph;
import org.dicadeveloper.weplantaforest.articles.ParagraphRepository;
import org.dicadeveloper.weplantaforest.user.UserAM;
import org.dicadeveloper.weplantaforest.user.UserRepositoryAM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("dbInjecter")
public class DbInjecter {

    @Autowired
    private UserRepositoryAM _userRepository;

    @Autowired
    private ArticleRepository _articleRepository;

    @Autowired
    private ParagraphRepository _paragraphRepository;

    public void injectUser(String userName) {
        UserAM userDto = new UserAM();
        userDto.setName(userName);
        _userRepository.save(userDto);
    }

    public void injectUser(String userName, Long regDate) {
        UserAM userDto = new UserAM();
        userDto.setName(userName);
        userDto.setRegDate(regDate);
        _userRepository.save(userDto);
    }

    public void injectUser(String userName, Long regDate, int organizationType) {
        UserAM userDto = new UserAM();
        userDto.setName(userName);
        userDto.setRegDate(regDate);
        userDto.setOrganizationType(organizationType);
        _userRepository.save(userDto);
    }

    public DbInjecter injectArticle(String title, String intro, ArticleType articleType, String ownerName,
            long createdOn) {
        Article article = new Article();
        article.setTitle(title);
        article.setIntro(intro);
        article.setArticleType(articleType);
        article.setOwner(_userRepository.findByName(ownerName));
        article.setCreatedOn(createdOn);
        _articleRepository.save(article);

        return this;
    }

    public DbInjecter injectParagraphToArticle(String articleTitle, String paragraphTitle, String paragraphText) {
        Paragraph paragraph = new Paragraph();

        paragraph.setArticle(_articleRepository.findByTitle(articleTitle));
        paragraph.setTitle(paragraphTitle);
        paragraph.setText(paragraphText);
        _paragraphRepository.save(paragraph);

        return this;
    }

}
