import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class MyUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    email: string;

    @Column("text", {nullable: true})
    stripeId : string;

    @Column("text", {default: 'free-trail'})
    type: string;

    @Column("text", { nullable: true })
    ccLast4: string;
    
    @Column("text")
    password: string;

    @Column("text", { nullable: true })
    default_source: string

}

// When we create our customer and the stripe it's going to give us an ID and we want to that in our own database

//type going to represent is whethere the user has paid or not for our service or our website 