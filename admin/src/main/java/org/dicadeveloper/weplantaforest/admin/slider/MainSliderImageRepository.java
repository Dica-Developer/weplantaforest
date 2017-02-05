package org.dicadeveloper.weplantaforest.admin.slider;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainSliderImageRepository  extends PagingAndSortingRepository<MainSliderImage, Long>{

}
