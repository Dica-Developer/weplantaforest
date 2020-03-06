package org.dicadeveloper.weplantaforest.articlemanager.testSupport;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.articlemanager.articles.Article;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.articlemanager.articles.ArticleRepository;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Paragraph;
import org.dicadeveloper.weplantaforest.articlemanager.articles.ParagraphRepository;
import org.dicadeveloper.weplantaforest.articlemanager.user.User;
import org.dicadeveloper.weplantaforest.articlemanager.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("dbInjecter")
public class DbInjecter {

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private ArticleRepository _articleRepository;

    @Autowired
    private ParagraphRepository _paragraphRepository;

    public void injectUser(String userName) {
        User userDto = new User();
        userDto.setName(userName);
        _userRepository.save(userDto);
    }

    public void injectUser(String userName, Long regDate) {
        User userDto = new User();
        userDto.setName(userName);
        userDto.setRegDate(regDate);
        _userRepository.save(userDto);
    }

    public void injectUser(String userName, Long regDate, int organizationType) {
        User userDto = new User();
        userDto.setName(userName);
        userDto.setRegDate(regDate);
        userDto.setOrganizationType(organizationType);
        _userRepository.save(userDto);
    }

    public Article injectArticle(String title, String intro, ArticleType articleType, String ownerName, long createdOn) {
        Article article = new Article();
        article.setTitle(title);
        article.setIntro(intro);
        article.setArticleType(articleType);
        article.setOwner(_userRepository.findByName(ownerName));
        article.setCreatedOn(createdOn);
        _articleRepository.save(article);

        return article;
    }

    @Transactional
    public DbInjecter injectParagraphToArticle(Article article, String paragraphTitle, String paragraphText) {
        Paragraph paragraph = new Paragraph();

        paragraph.setArticle(article);
        paragraph.setTitle(paragraphTitle);
        paragraph.setText(paragraphText);

        _paragraphRepository.save(paragraph);

        return this;
    }

}
