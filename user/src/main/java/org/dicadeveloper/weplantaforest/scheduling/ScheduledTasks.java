package org.dicadeveloper.weplantaforest.scheduling;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.dev.inject.DataInjector;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private static final Log LOG = LogFactory.getLog(DataInjector.class.getName());

    private final static long DAY_IN_MILLISECONDS = 86400000;
//        
//    @Scheduled(fixedRate = DAY_IN_MILLISECONDS)
//    public void checkAbos() {
//        
//    }
}
