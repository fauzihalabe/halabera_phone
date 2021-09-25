# halabera_phone
## Phone for FiveM 

![](https://cdn.discordapp.com/attachments/845876205415956490/891339855559266354/unknown.png)
![](https://cdn.discordapp.com/attachments/845876205415956490/891339968205688852/unknown.png)

### Update your database (SQL File): 
>CREATE DATABASE IF NOT EXISTS `yourdatabase` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `yourdatabase`;

>CREATE TABLE IF NOT EXISTS `halaberaphone_comentarios_instagram` (
  `user_id` int(11) DEFAULT NULL,
  `comentario` longtext DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `publicacao` longtext DEFAULT NULL
>) ENGINE=InnoDB DEFAULT CHARSET=latin1;


>CREATE TABLE IF NOT EXISTS `halaberaphone_contatos` (
  `id` int(11) DEFAULT NULL,
  `nome` text DEFAULT NULL,
  `numero` text DEFAULT NULL
>) ENGINE=InnoDB DEFAULT CHARSET=latin1;


>CREATE TABLE IF NOT EXISTS `halaberaphone_curtidas_instagram` (
  `user_id` int(11) DEFAULT NULL,
  `publicacao` longtext DEFAULT NULL,
  `data` text DEFAULT NULL
>) ENGINE=InnoDB DEFAULT CHARSET=latin1;


>CREATE TABLE IF NOT EXISTS `halaberaphone_feed_instagram` (
  `user_id` int(11) DEFAULT NULL,
  `data` text DEFAULT NULL,
  `usuario` text DEFAULT NULL,
  `usuariodata` text DEFAULT NULL,
  `imagem` text DEFAULT NULL,
  `uuid` text DEFAULT NULL,
  `legenda` longtext DEFAULT NULL,
  `filtro` text DEFAULT NULL
>) ENGINE=InnoDB DEFAULT CHARSET=latin1;


>CREATE TABLE IF NOT EXISTS `halaberaphone_galeria` (
  `user_id` int(11) DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `data` text DEFAULT NULL,
  `uuid` longtext DEFAULT NULL
>) ENGINE=InnoDB DEFAULT CHARSET=latin1;


>CREATE TABLE IF NOT EXISTS `halaberaphone_mensagens` (
  `de` text DEFAULT NULL,
  `para` text DEFAULT NULL,
  `mensagem` longtext DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `lida` text DEFAULT NULL
>) ENGINE=InnoDB DEFAULT CHARSET=latin1;


>CREATE TABLE IF NOT EXISTS `halaberaphone_notas` (
  `user_id` int(11) DEFAULT NULL,
  `titulo` text DEFAULT NULL,
  `nota` longtext DEFAULT NULL,
  `uuid` longtext DEFAULT NULL,
  `data` longtext DEFAULT NULL
>) ENGINE=InnoDB DEFAULT CHARSET=latin1;


>CREATE TABLE IF NOT EXISTS `halaberaphone_usuarios_instagram` (
  `user_id` int(11) DEFAULT NULL,
  `usuario` text DEFAULT NULL,
  `verificado` int(11) DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `bio` text DEFAULT NULL
>) ENGINE=InnoDB DEFAULT CHARSET=latin1;


>CREATE TABLE IF NOT EXISTS `halabera_seguidores` (
  `seguidor` varchar(50) DEFAULT NULL,
  `seguindo` varchar(50) DEFAULT NULL
>) ENGINE=InnoDB DEFAULT CHARSET=latin1;

### Change discord webhook:
>function/server.lua line 133 


![](https://media.giphy.com/media/l0amJzVHIAfl7jMDos/giphy.gif?cid=ecf05e47b690yt44utur1mtctup5iixr3nfq3khcp4aendrn&rid=giphy.gif&ct=g)

### Important:
Use with [screenshot-basic](https://github.com/citizenfx/screenshot-basic)

# Download here
https://github.com/fauzihalabe/halabera_phone/releases/tag/0.0.1
