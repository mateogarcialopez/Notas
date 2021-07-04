
NOTA: id, titulo, subtitulo, descripción, foto, idUser.
USUARIO: identificación, nombre, apellido, correo, contraseña, estado.

CREATE TABLE usuarios (
    identificacion INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(500) NOT NULL,
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    CONSTRAINT pk_usuarios PRIMARY KEY(identificacion)
)ENGINE=innoDB;


CREATE TABLE notas(
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    subtitulo VARCHAR(200),
    descripcion TEXT,
    foto TEXT,
    id_usuario INT NOT NULL,
    CONSTRAINT pk_notas PRIMARY kEY(id),
    CONSTRAINT fk_usuario FOREIGN KEY(id_usuario) REFERENCES usuarios(identificacion)
)ENGINE=innoDB;