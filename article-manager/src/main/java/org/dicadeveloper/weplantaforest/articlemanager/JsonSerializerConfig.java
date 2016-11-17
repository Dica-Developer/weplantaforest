package org.dicadeveloper.weplantaforest.articlemanager;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;

@Configuration
public class JsonSerializerConfig {

    @SuppressWarnings("rawtypes")
    @Bean
    public Module springDataPageModule() {
        return new SimpleModule().addSerializer(Page.class, new JsonSerializer<Page>() {
            @Override
            public void serialize(Page value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
                gen.writeStartObject();
                gen.writeNumberField("totalElements", value.getTotalElements());
                gen.writeNumberField("totalPages", value.getTotalPages());
                gen.writeNumberField("numberOfElements", value.getNumberOfElements());
                gen.writeObjectField("sort", value.getSort());
                gen.writeBooleanField("last", value.isLast());
                gen.writeBooleanField("first", value.isFirst());
                gen.writeFieldName("content");
                serializers.defaultSerializeValue(value.getContent(), gen);
                gen.writeEndObject();
            }
        });
    }

}
