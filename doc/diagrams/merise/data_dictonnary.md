| Name                     | Type          | Description                                                         |
| ------------------------ | ------------- | ------------------------------------------------------------------- |
| guild_id                 | INTEGER(11)   | This is unique server id                                            |
| guild_name               | VARCHAR(255)  | This is server name                                                 |
| member_size              | INTEGER(11)   | This is number of people in guild                                   |
| user_id                  | INTEGER(11)   | This is unique user id for identification of user                   |
| username                 | VARCHAR(255)  | This is user name when he logged                                    |
| channel_id               | INTEGER(11)   | This is id for one channel                                          |
| channel_name             | VARCHAR(255)  | This is name for one channel                                        |
| category_id              | INTEGER(11)   | This is id for one category                                         |
| category_name            | VARCHAR(255)  | This is name for one category                                       |
| role_id                  | INTEGER(11)   | This is id for role discord                                         |
| role_name                | VARCHAR(255)  | This is name for role discord                                       |
| role_color               | VARCHAR(255)  | This is hexadecimal color for role discord                          |
| permission_flag          | VARCHAR(255)  | This is name for flag for permission of role                        |
| message_id               | INTEGER(11)   | This is id for message                                              |
| message_content          | TEXT          | This is content for message                                         |
| channel_message_id       | INTEGER(11)   | This is the identifier of the channel in which the message was sent |
| vote_count               | INTEGER(11)   | This is number of vote for post                                     |
| vote_post_message_id     | INTEGER(11)   | This is id for message post in resource channels                    |
| config_id                | INTEGER(11)   | This is id for config interface                                     |
| config                   | JSON          | This is configuration of discord bot                                |
| course_id                | INTEGER(11)   | This is id for one course                                           |
| course_name              | VARACHAR(255) | This is name of course                                              |
| course_role_id           | INTEGER(11)   | This is course role id linked                                       |
| promo_id                 | INTEGER(11)   | This is id for promotion                                            |
| promo_name               | VARACHAR(50)  | This is name for promotion                                          |
| promo_category_id        | INTEGER(11)   | This is id for category of promo                                    |
| promo_state              | BOOLEAN       | This is state for promo is finish or in progress                    |
| ticket_id                | INTEGER(11)   | This is id for ticket                                               |
| ticket_topic             | VARCHAR(50)   | This is title for ticket                                            |
| ticket_message_id        | INTEGER(11)   | This is id of message for ticket                                    |
| ticket_state             | BOOLEAN       | This is state of ticket if is open or archived                      |
| feedback_id              | INTEGER(11)   | This is id for feedback message                                     |
| feedback_message_id      | INTEGER(11)   | This is id of message for feedback                                  |
| template_id              | INTEGER(11)   | This is id for template of course                                   |