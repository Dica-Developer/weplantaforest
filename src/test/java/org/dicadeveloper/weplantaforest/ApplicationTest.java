package org.dicadeveloper.weplantaforest;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

public class ApplicationTest {

    @Test
    public void test() throws Exception {
        assertThat(new Application()).isNotNull();
    }
}
