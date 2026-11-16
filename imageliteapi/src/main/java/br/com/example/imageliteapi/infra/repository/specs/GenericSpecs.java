package br.com.example.imageliteapi.infra.repository.specs;

import br.com.example.imageliteapi.domain.entity.Image;
import org.springframework.data.jpa.domain.Specification;

public class GenericSpecs {
    private GenericSpecs(){}

    public static <T> Specification<T> conjunction() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();
    }
}
