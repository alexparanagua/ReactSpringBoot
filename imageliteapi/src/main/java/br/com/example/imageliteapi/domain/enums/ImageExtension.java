package br.com.example.imageliteapi.domain.enums;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;

import java.lang.reflect.Array;
import java.util.Arrays;

@RequiredArgsConstructor
public enum ImageExtension {
    PNG(MediaType.IMAGE_PNG),
    GIF(MediaType.IMAGE_GIF),
    JPEG(MediaType.IMAGE_JPEG);

    @Getter
    private final MediaType mediaType;

    public static ImageExtension valueOf(MediaType mediaType) {
        return Arrays.stream(values()).filter(ie -> ie.mediaType.equals(mediaType)).findFirst()
                .orElse(null);
    }

    public static ImageExtension ofName(String extension) {
        return Arrays.stream(values()).filter(ie -> ie.name().equalsIgnoreCase(extension)).findFirst()
                .orElse(null);
    }
}

