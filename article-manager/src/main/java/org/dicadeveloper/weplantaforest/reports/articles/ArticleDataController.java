package org.dicadeveloper.weplantaforest.reports.articles;

import java.util.List;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class ArticleDataController {

    private @NonNull ArticleDataRepository _articleDataRepository;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = "/articles/{articleType}", method = RequestMethod.GET)
    public Page<ArticleData> getArticlesByType(@PathVariable ArticleType articleType, @Param(value = "page") int page, @Param(value = "size") int size) {
        return _articleDataRepository.getArticlesByType(articleType, new PageRequest(page, size));
    }

    @RequestMapping(value = "/reports/article/{articleId}", method = RequestMethod.GET)
    public List<ArticleContentData> getParagraphsByArticleTitle(@PathVariable long articleId) {
        return _articleDataRepository.getParagraphsByArticleId(articleId);
    }

    @RequestMapping(value = "/article/image/{articleId}/{imageName:.+}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getArticleImage(@PathVariable(value = "articleId") String articleId, @PathVariable(value = "imageName") String imageName) {
        String articleFolder = FileSystemInjector.getImageUploadFolder() + "/" + articleId;
        byte[] imageBytes = _imageHelper.getByteArrayForImageName(imageName, articleFolder);

        if (imageBytes.length > 0) {
            return new ResponseEntity<>(imageBytes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/article/image/{articleId}/{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getArticleImage(@PathVariable(value = "articleId") String articleId, @PathVariable(value = "imageName") String imageName, @PathVariable int width,
            @PathVariable int height) {
        String articleFolder = FileSystemInjector.getImageUploadFolder() + "/" + articleId;
        byte[] imageBytes = _imageHelper.getByteArrayForImageName(imageName, articleFolder, width, height);

        if (imageBytes.length > 0) {
            return new ResponseEntity<>(imageBytes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
