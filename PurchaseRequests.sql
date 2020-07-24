CREATE TABLE `teste`.`pedidos` (
  `id` INT NOT NULL,
  `numero` INT NULL,
  `nome` VARCHAR(200) NOT NULL,
  `endereco` VARCHAR(200) NULL,
  `preco` FLOAT NOT NULL,
  `valor_troco` FLOAT NULL,
  PRIMARY KEY (`id`));
