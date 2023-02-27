------------------------------------------------------------
--        Script Postgre 
------------------------------------------------------------



------------------------------------------------------------
-- Table: guilds
------------------------------------------------------------
CREATE TABLE public.guilds(
                              id            SERIAL NOT NULL ,
                              guild_uuid    INT  NOT NULL ,
                              guild_name    VARCHAR (50) NOT NULL ,
                              member_size   INT  NOT NULL  ,
                              CONSTRAINT guilds_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: roles
------------------------------------------------------------
CREATE TABLE public.roles(
                             id           SERIAL NOT NULL ,
                             role_uuid    INT  NOT NULL ,
                             role_name    VARCHAR (255) NOT NULL ,
                             role_color   VARCHAR (20) NOT NULL  ,
                             CONSTRAINT roles_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: courses
------------------------------------------------------------
CREATE TABLE public.courses(
                               id            SERIAL NOT NULL ,
                               course_name   VARCHAR (255) NOT NULL ,
                               id_guilds     INT  NOT NULL ,
                               id_roles      INT  NOT NULL  ,
                               CONSTRAINT courses_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: category
------------------------------------------------------------
CREATE TABLE public.category(
                                id              SERIAL NOT NULL ,
                                category_uuid   VARCHAR (255) NOT NULL ,
                                category_name   VARCHAR (255) NOT NULL  ,
                                CONSTRAINT category_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: template
------------------------------------------------------------
CREATE TABLE public.template(
                                id            SERIAL NOT NULL ,
                                id_category   INT    ,
                                CONSTRAINT template_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: channels
------------------------------------------------------------
CREATE TABLE public.channels(
                                id             SERIAL NOT NULL ,
                                channel_name   VARCHAR (255) NOT NULL ,
                                channel_uuid   INT  NOT NULL ,
                                id_guilds      INT  NOT NULL ,
                                id_category    INT  NOT NULL  ,
                                CONSTRAINT channels_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: link
------------------------------------------------------------
CREATE TABLE public.link(
                            id     SERIAL NOT NULL ,
                            link   VARCHAR (50) NOT NULL  ,
                            CONSTRAINT link_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Config
------------------------------------------------------------
CREATE TABLE public.Config(
                              id           SERIAL NOT NULL ,
                              config       VARCHAR (2000)  NOT NULL ,
                              id_courses   INT  NOT NULL  ,
                              CONSTRAINT Config_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Associer
------------------------------------------------------------
CREATE TABLE public.Associer(
                                id            INT  NOT NULL ,
                                id_channels   INT  NOT NULL  ,
                                CONSTRAINT Associer_PK PRIMARY KEY (id,id_channels)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: users
------------------------------------------------------------
CREATE TABLE public.users(
                             id           SERIAL NOT NULL ,
                             username     VARCHAR (255) NOT NULL ,
                             mail         VARCHAR (255) NOT NULL ,
                             user_uuid    INT  NOT NULL ,
                             created_at   TIMESTAMP  NOT NULL ,
                             updated_at   TIMESTAMP  NOT NULL ,
                             id_roles     INT  NOT NULL ,
                             id_promo     INT    ,
                             CONSTRAINT users_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: ticket
------------------------------------------------------------
CREATE TABLE public.ticket(
                              id             SERIAL NOT NULL ,
                              ticket_tag     VARCHAR (255) NOT NULL ,
                              ticket_state   BOOL  NOT NULL ,
                              id_messages    INT  NOT NULL ,
                              id_roles       INT  NOT NULL ,
                              id_users       INT  NOT NULL  ,
                              CONSTRAINT ticket_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: messages
------------------------------------------------------------
CREATE TABLE public.messages(
                                id                SERIAL NOT NULL ,
                                message_uuid      INT  NOT NULL ,
                                message_content   VARCHAR (255) NOT NULL ,
                                id_users          INT  NOT NULL  ,
                                CONSTRAINT messages_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: resources_sharing
------------------------------------------------------------
CREATE TABLE public.resources_sharing(
                                         id            SERIAL NOT NULL ,
                                         up_vote       INT  NOT NULL ,
                                         down_vote     INT  NOT NULL ,
                                         id_channels   INT  NOT NULL ,
                                         id_users      INT  NOT NULL  ,
                                         CONSTRAINT resources_sharing_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: promo
------------------------------------------------------------
CREATE TABLE public.promo(
                             id             SERIAL NOT NULL ,
                             promo_state    BOOL  NOT NULL ,
                             code_request   BOOL  NOT NULL ,
                             id_signature   INT  NOT NULL ,
                             id_courses     INT  NOT NULL ,
                             id_roles       INT  NOT NULL  ,
                             CONSTRAINT promo_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: signature
------------------------------------------------------------
CREATE TABLE public.signature(
                                 id                  SERIAL NOT NULL ,
                                 id_users            INT  NOT NULL ,
                                 id_users_Notifier   INT  NOT NULL  ,
                                 CONSTRAINT signature_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Appartenir
------------------------------------------------------------
CREATE TABLE public.Appartenir(
                                  id          INT  NOT NULL ,
                                  id_guilds   INT  NOT NULL  ,
                                  CONSTRAINT Appartenir_PK PRIMARY KEY (id,id_guilds)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Inclure
------------------------------------------------------------
CREATE TABLE public.Inclure(
                               id            INT  NOT NULL ,
                               id_channels   INT  NOT NULL  ,
                               CONSTRAINT Inclure_PK PRIMARY KEY (id,id_channels)
)WITHOUT OIDS;




ALTER TABLE public.courses
    ADD CONSTRAINT courses_guilds0_FK
        FOREIGN KEY (id_guilds)
            REFERENCES public.guilds(id);

ALTER TABLE public.courses
    ADD CONSTRAINT courses_roles1_FK
        FOREIGN KEY (id_roles)
            REFERENCES public.roles(id);

ALTER TABLE public.template
    ADD CONSTRAINT template_category0_FK
        FOREIGN KEY (id_category)
            REFERENCES public.category(id);

ALTER TABLE public.channels
    ADD CONSTRAINT channels_guilds0_FK
        FOREIGN KEY (id_guilds)
            REFERENCES public.guilds(id);

ALTER TABLE public.channels
    ADD CONSTRAINT channels_category1_FK
        FOREIGN KEY (id_category)
            REFERENCES public.category(id);

ALTER TABLE public.Config
    ADD CONSTRAINT Config_courses0_FK
        FOREIGN KEY (id_courses)
            REFERENCES public.courses(id);

ALTER TABLE public.Associer
    ADD CONSTRAINT Associer_template0_FK
        FOREIGN KEY (id)
            REFERENCES public.template(id);

ALTER TABLE public.Associer
    ADD CONSTRAINT Associer_channels1_FK
        FOREIGN KEY (id_channels)
            REFERENCES public.channels(id);

ALTER TABLE public.users
    ADD CONSTRAINT users_roles0_FK
        FOREIGN KEY (id_roles)
            REFERENCES public.roles(id);

ALTER TABLE public.users
    ADD CONSTRAINT users_promo1_FK
        FOREIGN KEY (id_promo)
            REFERENCES public.promo(id);

ALTER TABLE public.ticket
    ADD CONSTRAINT ticket_messages0_FK
        FOREIGN KEY (id_messages)
            REFERENCES public.messages(id);

ALTER TABLE public.ticket
    ADD CONSTRAINT ticket_roles1_FK
        FOREIGN KEY (id_roles)
            REFERENCES public.roles(id);

ALTER TABLE public.ticket
    ADD CONSTRAINT ticket_users2_FK
        FOREIGN KEY (id_users)
            REFERENCES public.users(id);

ALTER TABLE public.messages
    ADD CONSTRAINT messages_users0_FK
        FOREIGN KEY (id_users)
            REFERENCES public.users(id);

ALTER TABLE public.resources_sharing
    ADD CONSTRAINT resources_sharing_channels0_FK
        FOREIGN KEY (id_channels)
            REFERENCES public.channels(id);

ALTER TABLE public.resources_sharing
    ADD CONSTRAINT resources_sharing_users1_FK
        FOREIGN KEY (id_users)
            REFERENCES public.users(id);

ALTER TABLE public.promo
    ADD CONSTRAINT promo_signature0_FK
        FOREIGN KEY (id_signature)
            REFERENCES public.signature(id);

ALTER TABLE public.promo
    ADD CONSTRAINT promo_courses1_FK
        FOREIGN KEY (id_courses)
            REFERENCES public.courses(id);

ALTER TABLE public.promo
    ADD CONSTRAINT promo_roles2_FK
        FOREIGN KEY (id_roles)
            REFERENCES public.roles(id);

ALTER TABLE public.signature
    ADD CONSTRAINT signature_users0_FK
        FOREIGN KEY (id_users)
            REFERENCES public.users(id);

ALTER TABLE public.signature
    ADD CONSTRAINT signature_users1_FK
        FOREIGN KEY (id_users_Notifier)
            REFERENCES public.users(id);

ALTER TABLE public.signature
    ADD CONSTRAINT signature_users0_AK
        UNIQUE (id_users_Notifier);

ALTER TABLE public.Appartenir
    ADD CONSTRAINT Appartenir_users0_FK
        FOREIGN KEY (id)
            REFERENCES public.users(id);

ALTER TABLE public.Appartenir
    ADD CONSTRAINT Appartenir_guilds1_FK
        FOREIGN KEY (id_guilds)
            REFERENCES public.guilds(id);

ALTER TABLE public.Inclure
    ADD CONSTRAINT Inclure_messages0_FK
        FOREIGN KEY (id)
            REFERENCES public.messages(id);

ALTER TABLE public.Inclure
    ADD CONSTRAINT Inclure_channels1_FK
        FOREIGN KEY (id_channels)
            REFERENCES public.channels(id);
