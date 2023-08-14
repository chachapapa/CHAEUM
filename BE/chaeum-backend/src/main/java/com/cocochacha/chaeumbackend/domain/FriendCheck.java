package com.cocochacha.chaeumbackend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "friend_check")
@Getter
@ToString
@NoArgsConstructor
public class FriendCheck {

    @Id
    private String friendRelationship;
    private boolean check;

    @Builder
    public FriendCheck(String friendRelationship, boolean check) {
        this.friendRelationship = friendRelationship;
        this.check = check;
    }
}
