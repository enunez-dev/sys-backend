# SYS-BACKEND
API RESTful con Express, Node.js y TypeScript
## Descripción

Esta es una API RESTful para un sistema de ventas, creada con Express en Node.js y TypeScript, diseñada para proporcionar servicios backend escalables. El proyecto sigue una arquitectura modular y utiliza TypeScript para asegurar un código más limpio y seguro.

## Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- Postgres SQL
- Jenkins (para CI/CD)

## Prerrequisitos

- [Node.js](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) (versión 20 latest)

## Instalación
1. Clonar el repositorio:
```bash
   git clone https://github.com/enunez-dev/sys-backend.git
   cd <NOMBRE_DEL_PROYECTO>
```
2. Ejecutar el archivo script.sql para la creacion de las tablas
3. Instalar dependencias:
```bash
    npm install
    # o si prefieres Yarn
    yarn install
```
4. Ejecutar el proyecto en modo desarrollo:
```bash
    npm run dev
    # o con Yarn
    yarn dev
```
## Despliegue con Jenkins (WINDOWS)
**Prerequisitos**:
- [Node.js](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) (versión 20 latest)

#### Para configurar el despliegue automatizado con Jenkins, sigue los pasos a continuación:
- **Instalar Jenkins y los plugins necesarios**: Asegúrate de que Jenkins esté instalado y que los plugins para Node.js y Git estén instalados.
- **Configurar NodeJS (plugin)**: En jenkins ir a:
    ```markdown
    Dashboard > Manage Jenkins > Tools 
    ```
    y adicionar una instalacion de NodeJS
    - **Name**: NodeJS 20
    - **Installation directory**: Ruta donde esta instalado node ejm: C:\Program Files\nodejs
    - **Install automatically**: (uncheck)
    >Asi quedaria configurado NodeJS [Click aqui](https://drive.google.com/file/d/1MRMhUC3FWB-ikVZ1-TILXyuAQL6zBdHf/view?usp=sharing)


- **Configurar un nuevo pipeline**:
    - New Item
        - Name: **sys-backend**
        - Type: Pipeline
    - Pipeline
        - Definition: Pipeline script from SCM
            - SCM: Git
                - Repository URL: https://github.com/enunez-dev/sys-backend.git
                - Branch Specifier: */master
            - Script Path: Jenkinsfile
    - (Save)
    - Build Now
    >Asi quedaria el pipeline [Click aqui](https://drive.google.com/file/d/1s43UYRiMsZ1nh83sj29F3ffuMRrZh3Dg/view?usp=sharing)
    

## Uso
Una vez en funcionamiento, la API estará disponible en http://localhost:3050 (o el puerto configurado). A continuación, se encuentran ejemplos de las rutas:

- GET localhost:3050/api/cliente/770641264 : Obtener datos del cliente por ci.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.