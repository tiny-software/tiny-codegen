---
to: examples/TypeORMEntity/generated/<%-h.changeCase.title(entityName)%>.ts
force: true
---
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('<%-h.changeCase.lower(entityName)%>')
export class <%-h.changeCase.title(entityName)%> {

<%-campos%>

}
