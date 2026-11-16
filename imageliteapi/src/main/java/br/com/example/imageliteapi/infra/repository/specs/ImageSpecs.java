package br.com.example.imageliteapi.infra.repository.specs;

import br.com.example.imageliteapi.domain.entity.Image;
import org.springframework.data.jpa.domain.Specification;

public class ImageSpecs {
    private ImageSpecs(){}

    public static Specification<Image> extensionEqual(String extension) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("extension"), extension);
    }

    public static Specification<Image> nameLike(String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.upper(root.get("name")), "%" + name.toUpperCase() + "%");
    }

    public static Specification<Image> tagsLike(String tags) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.upper(root.get("tags")), "%" + tags.toUpperCase() + "%");
    }
}
