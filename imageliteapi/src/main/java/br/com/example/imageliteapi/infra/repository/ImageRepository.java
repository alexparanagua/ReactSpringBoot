package br.com.example.imageliteapi.infra.repository;

import br.com.example.imageliteapi.domain.entity.Image;
import br.com.example.imageliteapi.domain.enums.ImageExtension;
import br.com.example.imageliteapi.infra.repository.specs.ImageSpecs;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

import static br.com.example.imageliteapi.infra.repository.specs.GenericSpecs.conjunction;
import static br.com.example.imageliteapi.infra.repository.specs.ImageSpecs.*;

public interface ImageRepository extends JpaRepository<Image, String> , JpaSpecificationExecutor<Image> {
    /**
     *
     * @param extension
     * @param query
     * @return
     *
     * SELECT * FROM IMAGE WHERE 1=1 AND EXTENSION = 'PNG' AND (NAME LIKE '%query%' OR TAGS LIKE '%query%')
     */
    default List<Image> findByExtensionAndNameOrTagsLike(ImageExtension extension, String query) {
        Specification<Image> spec = Specification.where(conjunction());
        if(extension != null) {
            spec = spec.and(extensionEqual(extension.name()));
        }
        if(StringUtils.hasText(query)) {
            spec = spec.and(Specification.anyOf(nameLike(query), tagsLike(query)));
        }
        return findAll(spec);
    }
}
