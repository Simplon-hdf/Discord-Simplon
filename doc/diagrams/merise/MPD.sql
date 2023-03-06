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
-- Table: users
------------------------------------------------------------
CREATE TABLE public.users(
                             id           SERIAL NOT NULL ,
                             username     VARCHAR (255) NOT NULL ,
                             mail         VARCHAR (255) NOT NULL ,
                             user_uuid    INT  NOT NULL ,
                             created_at   TIMESTAMP  NOT NULL ,
                             updated_at   TIMESTAMP  NOT NULL ,
                             id_roles     INT  NOT NULL  ,
                             CONSTRAINT users_PK PRIMARY KEY (id)

    ,CONSTRAINT users_roles_FK FOREIGN KEY (id_roles) REFERENCES public.roles(id)
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

    ,CONSTRAINT courses_guilds_FK FOREIGN KEY (id_guilds) REFERENCES public.guilds(id)
    ,CONSTRAINT courses_roles0_FK FOREIGN KEY (id_roles) REFERENCES public.roles(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: template
------------------------------------------------------------
CREATE TABLE public.template(
                                id   SERIAL NOT NULL  ,
                                CONSTRAINT template_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: category
------------------------------------------------------------
CREATE TABLE public.category(
                                id              SERIAL NOT NULL ,
                                category_uuid   VARCHAR (255) NOT NULL ,
                                category_name   VARCHAR (255) NOT NULL ,
                                id_guilds       INT  NOT NULL  ,
                                CONSTRAINT category_PK PRIMARY KEY (id)

    ,CONSTRAINT category_guilds_FK FOREIGN KEY (id_guilds) REFERENCES public.guilds(id)
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

    ,CONSTRAINT channels_guilds_FK FOREIGN KEY (id_guilds) REFERENCES public.guilds(id)
    ,CONSTRAINT channels_category0_FK FOREIGN KEY (id_category) REFERENCES public.category(id)
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

    ,CONSTRAINT messages_users_FK FOREIGN KEY (id_users) REFERENCES public.users(id)
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

    ,CONSTRAINT ticket_messages_FK FOREIGN KEY (id_messages) REFERENCES public.messages(id)
    ,CONSTRAINT ticket_roles0_FK FOREIGN KEY (id_roles) REFERENCES public.roles(id)
    ,CONSTRAINT ticket_users1_FK FOREIGN KEY (id_users) REFERENCES public.users(id)
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

    ,CONSTRAINT resources_sharing_channels_FK FOREIGN KEY (id_channels) REFERENCES public.channels(id)
    ,CONSTRAINT resources_sharing_users0_FK FOREIGN KEY (id_users) REFERENCES public.users(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: signature
------------------------------------------------------------
CREATE TABLE public.signature(
                                 id                SERIAL NOT NULL ,
                                 id_users          INT  NOT NULL ,
                                 id_users_notify   INT  NOT NULL  ,
                                 CONSTRAINT signature_PK PRIMARY KEY (id)

    ,CONSTRAINT signature_users_FK FOREIGN KEY (id_users) REFERENCES public.users(id)
    ,CONSTRAINT signature_users0_FK FOREIGN KEY (id_users_notify) REFERENCES public.users(id)
    ,CONSTRAINT signature_users_AK UNIQUE (id_users_notify)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: promo
------------------------------------------------------------
CREATE TABLE public.promo(
                             id             SERIAL NOT NULL ,
                             promo_state    BOOL  NOT NULL ,
                             code_request   BOOL  NOT NULL ,
                             id_signature   INT  NOT NULL ,
                             id_courses     INT  NOT NULL  ,
                             CONSTRAINT promo_PK PRIMARY KEY (id)

    ,CONSTRAINT promo_signature_FK FOREIGN KEY (id_signature) REFERENCES public.signature(id)
    ,CONSTRAINT promo_courses0_FK FOREIGN KEY (id_courses) REFERENCES public.courses(id)
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
                              id       SERIAL NOT NULL ,
                              config   VARCHAR (2000)  NOT NULL  ,
                              CONSTRAINT Config_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: channelsStock
------------------------------------------------------------
CREATE TABLE public.channelsStock(
                                     id   SERIAL NOT NULL  ,
                                     CONSTRAINT channelsStock_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: belong
------------------------------------------------------------
CREATE TABLE public.belong(
                              id          INT  NOT NULL ,
                              id_guilds   INT  NOT NULL  ,
                              CONSTRAINT belong_PK PRIMARY KEY (id,id_guilds)

    ,CONSTRAINT belong_users_FK FOREIGN KEY (id) REFERENCES public.users(id)
    ,CONSTRAINT belong_guilds0_FK FOREIGN KEY (id_guilds) REFERENCES public.guilds(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: include
------------------------------------------------------------
CREATE TABLE public.include(
                               id            INT  NOT NULL ,
                               id_channels   INT  NOT NULL  ,
                               CONSTRAINT include_PK PRIMARY KEY (id,id_channels)

    ,CONSTRAINT include_messages_FK FOREIGN KEY (id) REFERENCES public.messages(id)
    ,CONSTRAINT include_channels0_FK FOREIGN KEY (id_channels) REFERENCES public.channels(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: participate
------------------------------------------------------------
CREATE TABLE public.participate(
                                   id         INT  NOT NULL ,
                                   id_promo   INT  NOT NULL  ,
                                   CONSTRAINT participate_PK PRIMARY KEY (id,id_promo)

    ,CONSTRAINT participate_users_FK FOREIGN KEY (id) REFERENCES public.users(id)
    ,CONSTRAINT participate_promo0_FK FOREIGN KEY (id_promo) REFERENCES public.promo(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: associate
------------------------------------------------------------
CREATE TABLE public.associate(
                                 id            INT  NOT NULL ,
                                 id_channels   INT  NOT NULL  ,
                                 CONSTRAINT associate_PK PRIMARY KEY (id,id_channels)

    ,CONSTRAINT associate_template_FK FOREIGN KEY (id) REFERENCES public.template(id)
    ,CONSTRAINT associate_channels0_FK FOREIGN KEY (id_channels) REFERENCES public.channels(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: stock
------------------------------------------------------------
CREATE TABLE public.stock(
                             id          INT  NOT NULL ,
                             id_guilds   INT  NOT NULL  ,
                             CONSTRAINT stock_PK PRIMARY KEY (id,id_guilds)

    ,CONSTRAINT stock_roles_FK FOREIGN KEY (id) REFERENCES public.roles(id)
    ,CONSTRAINT stock_guilds0_FK FOREIGN KEY (id_guilds) REFERENCES public.guilds(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: define
------------------------------------------------------------
CREATE TABLE public.define(
                              id                 INT  NOT NULL ,
                              id_channelsStock   INT  NOT NULL  ,
                              CONSTRAINT define_PK PRIMARY KEY (id,id_channelsStock)

    ,CONSTRAINT define_channels_FK FOREIGN KEY (id) REFERENCES public.channels(id)
    ,CONSTRAINT define_channelsStock0_FK FOREIGN KEY (id_channelsStock) REFERENCES public.channelsStock(id)
)WITHOUT OIDS;



