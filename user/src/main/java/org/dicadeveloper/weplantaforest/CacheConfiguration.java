package org.dicadeveloper.weplantaforest;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.guava.GuavaCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.cache.CacheBuilder;

@Configuration
public class CacheConfiguration {

    public final static String TEN_MINUTE_CACHE = "ten_minute_cache";

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();

        cacheManager.setCaches(Arrays.asList(buildTenMinuteCache()));
        return cacheManager;
    }

    private GuavaCache buildTenMinuteCache() {
        return new GuavaCache(TEN_MINUTE_CACHE, CacheBuilder.newBuilder()
                                                           .expireAfterWrite(10, TimeUnit.MINUTES)
                                                           .build());
    }

}
