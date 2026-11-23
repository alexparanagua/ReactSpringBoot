package br.com.example.imageliteapi.domain.service;

import br.com.example.imageliteapi.domain.AccessToken;
import br.com.example.imageliteapi.domain.entity.User;

public interface UserService {
    User getByEmail(String email);
    User save(User user);
    AccessToken authenticate(String email, String password);
}
