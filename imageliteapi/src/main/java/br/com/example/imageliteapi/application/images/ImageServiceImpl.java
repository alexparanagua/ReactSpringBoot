package br.com.example.imageliteapi.application.images;

import br.com.example.imageliteapi.domain.entity.Image;
import br.com.example.imageliteapi.domain.enums.ImageExtension;
import br.com.example.imageliteapi.domain.service.ImageService;
import br.com.example.imageliteapi.infra.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;

    @Override
    @Transactional
    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public Optional<Image> getImageById(String imageId) {
        return imageRepository.findById(imageId);
    }

    @Override
    public List<Image> search(ImageExtension extension, String query) {
        return imageRepository.findByExtensionAndNameOrTagsLike(extension, query);
    }
}
