package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "friend_relationship")
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FriendRelationship {

    @Id
    @Column(name = "friend_info_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "to_id", referencedColumnName = "id")
    private UserPersonalInfo toId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "from_id", referencedColumnName = "id")
    private UserPersonalInfo fromId;

    @Column(name = "is_friend")
    private boolean isFriend;

    @Builder
    public FriendRelationship(UserPersonalInfo toId, UserPersonalInfo fromId, boolean isFriend) {
        this.toId = toId;
        this.fromId = fromId;
        this.isFriend = isFriend;
    }

    public void changeIsFriend(boolean isFriend) {
        this.isFriend = isFriend;
    }
}

