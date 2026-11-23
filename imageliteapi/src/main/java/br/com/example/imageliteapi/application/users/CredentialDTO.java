package br.com.example.imageliteapi.application.users;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CredentialDTO {
    private String email;
    private String password;
}
