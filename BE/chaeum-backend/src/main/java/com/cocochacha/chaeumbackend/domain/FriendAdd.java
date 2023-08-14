package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "friend_add")
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FriendAdd {

    @Id
    @Column(name = "friend_add_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "to_id", referencedColumnName = "id")
    private UserPersonalInfo toId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "from_id", referencedColumnName = "id")
    private UserPersonalInfo fromId;

    @Column(name = "is_add", columnDefinition = "Boolean default true")
    private boolean isAdd; // true면 현재 친구 신청 중, false면 현재 친구 신청중이 아님

    @Builder
    public FriendAdd(UserPersonalInfo toId, UserPersonalInfo fromId, boolean isAdd) {
        this.toId = toId;
        this.fromId = fromId;
        this.isAdd = isAdd;
    }

    public void changeIsAdd(boolean isAdd) {
        this.isAdd = isAdd;
    }

}

