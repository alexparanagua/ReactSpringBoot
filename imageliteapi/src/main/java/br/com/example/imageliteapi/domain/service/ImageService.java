package br.com.example.imageliteapi.domain.service;

import br.com.example.imageliteapi.domain.entity.Image;
import br.com.example.imageliteapi.domain.enums.ImageExtension;

import java.util.List;
import java.util.Optional;

public interface ImageService {
    Image saveImage(Image image);

    Optional<Image> getImageById(String imageId);

    List<Image> search(ImageExtension extension, String query);
}
