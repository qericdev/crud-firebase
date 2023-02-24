# CrudFirebase

Este proyecto ha sido generado con [Angular CLI] (https://github.com/angular/angular-cli) version 15.1.6.
El proyecto consiste en 2 vistas principales:

- Dashboard: Muestra una tabla de personas 
- Log: Muestra las modificaciones a la base de datos, indicando modificaciones, borrados o agregados. Muestra además el tiempo en el cual se llevó a cabo dicha operación y el documento involucrado. Tener en cuenta que la información que se muestra en esta vista, es temporal, cada vez que se actualiza la ventana del navegador, la información vuelve al inicio para mostrar solo las operaciones que ocurren mientras la vista está activa.

Las tecnologías principales usadas para su elaboración son:
- Angular 15.1.6.
- Firebase RealTime Database.

## Estructura

La estructura de componentes del proyecto es la siguiente:
- app
    - navbar
    - router (dashboard || log)

Dentro del componente dashboard se tiene la siguiente estructura:
- dashboard
    - list
    - user

Dentro del componente log se tiene la siguiente estructura:
- log
    -user

## Elementos Principales

Dentro de la aplicación se definieron 2 elementos principales:
- modelo -> app/models/persona.model.ts : El cual proporciona la estructura de la data que se va a guardar en la base de datos.
- servicios -> app/services/persona.service.ts: En el cual se definen los principales métodos para modificar la base de datos.

## Licencia

MIT License

## Contacto

qericrm@gmail.com
