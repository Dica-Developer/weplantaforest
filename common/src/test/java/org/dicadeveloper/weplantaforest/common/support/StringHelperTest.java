package org.dicadeveloper.weplantaforest.common.support;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

public class StringHelperTest {

    @Test
    public void testGetDataTypeFromFileName() {
        String fileName = "abcd.file";

        String fileType = StringHelper.getDataTypeFromFileName(fileName);

        assertThat(fileType).isEqualTo("file");
    }

    @Test
    public void testGetDataTypeFromFileNameWithoutPoint() {
        String fileName = "abcdfile";

        String fileType = StringHelper.getDataTypeFromFileName(fileName);

        assertThat(fileType).isEqualTo(StringHelper.UNKNOWN_DATATYPE);
    }

    @Test
    public void testGetDataTypeFromFileNameWithTwoPointsInIt() {
        String fileName = "ab.cd.file";

        String fileType = StringHelper.getDataTypeFromFileName(fileName);

        assertThat(fileType).isEqualTo("file");
    }
    
    @Test
    public void testAddNumberToFileName() {
        String fileName = "abc.file";

        String newFileName = StringHelper.addNumberToFileName(fileName, 2);

        assertThat(newFileName).isEqualTo("abc2.file");
    }
    
    @Test
    public void testAddNumberToFileNameWithoutPoint() {
        String fileName = "abcfile";

        String newFileName = StringHelper.addNumberToFileName(fileName, 2);

        assertThat(newFileName).isEqualTo(StringHelper.UNKNOWN_DATATYPE);
    }
}
