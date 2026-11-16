package br.com.example.imageliteapi.application.images;

import br.com.example.imageliteapi.domain.entity.Image;
import br.com.example.imageliteapi.domain.enums.ImageExtension;
import br.com.example.imageliteapi.domain.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/v1/images")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
public class ImageController {

    private final ImageService service;
    private final ImageMapper mapper;

    @PostMapping
    public ResponseEntity save(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("tags") List<String> tags
            ) throws IOException {
        log.info("Imagem recebida: name: {} size: {} ",file.getOriginalFilename(), file.getSize());
        log.info("Content-type: {}", file.getContentType()+" "+ MediaType.valueOf(file.getContentType()).getSubtype());
        Image image = mapper.mapToImage(file, name, tags);
        Image savedImage = service.saveImage(image);
        URI imageUri = buildImageURL(savedImage);
        return ResponseEntity.created(imageUri).build();
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageId) {
        var possibleImage = service.getImageById(imageId);
        if (possibleImage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var image = possibleImage.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(image.getExtension().getMediaType());
        headers.setContentLength(image.getSize());
        headers.setContentDispositionFormData("inline; filename=\""+image.getFileName()+"\"", image.getFileName());
        return new ResponseEntity<>(image.getFile(), headers, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ImageDTO>> search(
            @RequestParam(value = "extension", required = false, defaultValue = "") String extension,
            @RequestParam(value = "query", required = false) String query
    ) {
        ImageExtension imageExtension = ImageExtension.ofName(extension.toUpperCase());
        var result = service.search(imageExtension, query);
        var images = result.stream()
                .map(image -> mapper.imageToDTO(image, buildImageURL(image).toString()))
                .toList();
        return ResponseEntity.ok(images);
    }

    private URI buildImageURL(Image image) {
        String imagePath = "/" + image.getId();
        return ServletUriComponentsBuilder.fromCurrentRequestUri().path(imagePath).build().toUri();
    }
}
